from flask import Flask, render_template, jsonify
import pymongo
import os

# Create an instance of our Flask app.
app = Flask(__name__)
mongo_username = os.getenv('mongo_username')
mongo_password = os.getenv('mongo_password')
### when running on your personal machine, not render, use:
# export 'mongo_username'='project4app'
# export 'mongo_password'='dfh16515d681ds'
### these are read only credentials

uri = f"mongodb+srv://{mongo_username}:{mongo_password}@cluster0.khzagou.mongodb.net/?retryWrites=true&w=majority"

with pymongo.MongoClient(uri) as client:
    db = client.usbillsapp
    billmetadata = db.billmetadata

# Set route
@app.route('/')
def index():
    billdata = billmetadata.find()
    return_list = []
    for result in billdata:
        return_list.append(result)
    return render_template("index.html", return_list=return_list)

if __name__ == "__main__":
    # change True to False when ready for deployment
    app.run(debug=True)