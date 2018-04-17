from flask import Flask
from flask import render_template
from flask import request
from flask import jsonify
from firebase_admin import initialize_app
from firebase_admin import db
from firebase_admin import credentials
from richtextpy import Delta
import config

app = Flask(__name__)

cred = credentials.Certificate(config.firebase['serviceAccount'])
initialize_app(cred, config.firebase)

@app.route('/', methods=["GET", "POST"])
def home():
    if request.method == "GET":
        return render_template("home.html")
    else:
        Id = db.reference('/jots').push().key
        return jsonify({"Message": "Success", "Identifier": Id})

@app.route('/jot/<Id>', methods=["GET", "POST"])
def notepad(Id):
    if request.method == "GET":
        document = db.reference('/jots/' + Id).get()
        return render_template("note.html", Id = Id, document = document)
    else:
        payload = request.get_json(force=True)
        document = db.reference('/jots/' + Id).get()
        if document:
            oldDoc = Delta(document['ops'])
            change = Delta(payload['ops'])
            print oldDoc.get_ops()
            print change.get_ops()
            composed = oldDoc.compose(change)
            print composed.get_ops()
            newDoc = {
                "ops": composed.get_ops()
            }
            db.reference('/jots/' + Id).set(newDoc)
            return jsonify({"Message": "Success"})
        else:
            db.reference('/jots/' + Id).set(payload)
            return jsonify({"Message": "Success"})

@app.route('/doc/<Id>', methods=["GET"])
def getNote(Id):
    document = db.reference('/jots/' + Id).get()
    if document:
        return jsonify({"document": document})
    else:
        return jsonify({"document": False})
