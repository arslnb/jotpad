from flask import Flask
from flask import render_template
from flask import request
from flask import jsonify
from firebase_admin import db
import config

app = Flask(__name__)

cred = credentials.Certificate(config.firebase['serviceAccount'])
firebase_admin.initialize_app(cred, config.firebase)

@app.route('/', methods=["GET", "POST"])
def home():
    if request.method == "GET":
        return render_template("home.html")
    else:
        Id = db.reference('/jots').push()
        return jsonify({"Message": "Success", "Identifier": Id})

@app.route('/jot/<Id>', methods=["GET", "POST"])
def notepad(Id):
    return render_template("note.html")