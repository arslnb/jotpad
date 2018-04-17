from flask import Flask
from flask import render_template
from flask import request
from flask import jsonify
from firebase_admin import initialize_app
from firebase_admin import db
from firebase_admin import credentials
from richtextpy import Delta
from flask_socketio import SocketIO, emit
import config

app = Flask(__name__)
sio = SocketIO(app)

cred = credentials.Certificate(config.firebase['serviceAccount'])
initialize_app(cred, config.firebase)

@app.route('/', methods=["GET", "POST"])
def home():
    if request.method == "GET":
        return render_template("home.html")
    else:
        Id = db.reference('/jots').push().key
        return jsonify({"Message": "Success", "Identifier": Id})

@app.route('/jot/<Id>', methods=["GET"])
def notepad(Id):
    document = db.reference('/jots/' + Id).get()
    return render_template("note.html", Id = Id, document = document)

@app.route('/doc/<Id>', methods=["GET"])
def getNote(Id):
    document = db.reference('/jots/' + Id).get()
    if document:
        return jsonify({"document": document})
    else:
        return jsonify({"document": False})

@sio.on('modify')
def modify_notepad(data):
    Id = data['Id']
    payload = data['delta']
    document = db.reference('/jots/' + Id).get()
    if document:
        oldDoc = Delta(document['ops'])
        change = Delta(payload['ops'])
        composed = oldDoc.compose(change)
        newDoc = {
            "ops": composed.get_ops()
        }
        db.reference('/jots/' + Id).set(newDoc)
        emit('update', {'data': payload['ops'], 'author': request.sid}, 
            include_self = False, broadcast=True)
    else:
        db.reference('/jots/' + Id).set(payload)
        emit('update', {'data': payload['ops'], 'author': request.sid}, 
            include_self = False, broadcast=True)

if __name__ == '__main__':
    app = socketio.Middleware(sio, app)
    socketio.run(app)