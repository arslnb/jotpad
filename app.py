from flask import Flask
from flask import render_template
from flask import request
from flask import jsonify

app = Flask(__name__)

@app.route('/', methods=["GET", "POST"])
def home():
    if request.method == "GET":
        return render_template("home.html")
    else:
        Id = "some Id here"
        return jsonify({"Message": "Success", "Identifier": Id})

@app.route('/jot/<Id>', methods=["GET", "POST"])
def notepad(Id):
    return Id