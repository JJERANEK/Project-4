from dash import Dash, dash_table, dcc, html
from dash.dependencies import Input, Output
import pandas as pd
from flask import Flask, render_template, jsonify
from flask_cors import CORS, cross_origin
from werkzeug.middleware import dispatcher
from werkzeug.serving import run_simple
# import dash_html_components as html
import pymongo
import os

mongo_username = os.getenv('mongo_username')
mongo_password = os.getenv('mongo_password')
### when running on your personal machine, not render, use:
# export 'mongo_username'='project4app'
# export 'mongo_password'='dfh16515d681ds'
### these are read only credentials

uri = f"mongodb+srv://{mongo_username}:{mongo_password}@cluster0.khzagou.mongodb.net/?retryWrites=true&w=majority"

with pymongo.MongoClient(uri) as client:
    db = client.usbillsapp
    topbills_coll = db.topbills
    currentbills_coll = db.currentbills

# Create an instance of our Flask app.
flask_app = Flask(__name__)

# Set route
@flask_app.route('/')
@flask_app.route('/index.html')
def index():
    return render_template("index.html")

@flask_app.route('/usmap.html')
def usmap():
    return render_template("usmap.html")

@flask_app.route('/about.html')
def about():
    return render_template("about.html")

@flask_app.route('/api/v1/topbilldata')
def topbilldata():
    topbills = topbills_coll.find()
    return_list = []
    for result in topbills:
        del result['_id']
        return_list.append(result)
    return return_list

@flask_app.route('/api/v1/currentbilldata')
def currentbilldata():
    currentbills = currentbills_coll.find()
    return_list = []
    for result in currentbills:
        del result['_id']
        return_list.append(result)
    return return_list

if __name__ == '__main__':
    flask_app.run(debug=True)