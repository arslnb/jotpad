from flask import Flask
from flask import render_template
from flask import request
from flask import jsonify
from firebase_admin import initialize_app
from firebase_admin import db
from firebase_admin import credentials
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
    return render_template("note.html")