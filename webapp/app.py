from flask import Flask, render_template, jsonify
from flask_cors import CORS, cross_origin
import pymongo
import os

# Create an instance of our Flask app.
app = Flask(__name__)
cors = CORS(app)
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

# Set route
@app.route('/')
def index():
    return render_template("index.html")

@app.route('/usmap')
def usmap():
    return render_template("usmap.html")

@app.route('/api/v1/topbilldata')
def topbilldata():
    topbills = topbills_coll.find()
    return_list = []
    for result in topbills:
        del result['_id']
        return_list.append(result)
    return return_list

@app.route('/api/v1/currentbilldata')
def currentbilldata():
    currentbills = currentbills_coll.find()
    return_list = []
    for result in currentbills:
        del result['_id']
        return_list.append(result)
    return return_list

if __name__ == "__main__":
    # change True to False when ready for deployment
    app.run(debug=True)