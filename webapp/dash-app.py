from dash import Dash, dash_table, dcc, html
from dash.dependencies import Input, Output
import pandas as pd
from flask import Flask, render_template, jsonify
from flask_cors import CORS, cross_origin
# from werkzeug.middleware import dispatcher
# from werkzeug.serving import run_simple
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
server = Flask(__name__)
# cors = CORS(app_flask)

# Create an instance of our dash app.
app_dash = Dash(__name__, server=server)

print('starting topbills load')
topbills = list(topbills_coll.find())
print('completed topbills load')
print('starting currentbills load')
currentbills = list(currentbills_coll.find())
print('completed currentbills load')


params = [
    'bill_type', 'sponsor_party', 'sponsor_state', 'cosponsors_total',
    'cosponsors_dem', 'cosponsors_rep', 'prediction', 'probability'
]

topbilldata = [{'ID':topbills.index(bill), 'bill_type':bill['bill_type'], 'sponsor_party':bill['sponsor_party'], 'sponsor_state':bill['sponsor_state'], 'cosponsors_total':bill['cosponsors_total'],
            'cosponsors_dem':bill['cosponsors_dem'], 'cosponsors_rep':bill['cosponsors_rep'], 'prediction':bill['prediction'], 
            'probability':bill['probability']} for bill in topbills]

currentbilldata = [{'ID':currentbills.index(bill), 'bill_type':bill['bill_type'], 'sponsor_party':bill['sponsor_party'], 'sponsor_state':bill['sponsor_state'], 'cosponsors_total':bill['cosponsors_total'],
            'cosponsors_dem':bill['cosponsors_dem'], 'cosponsors_rep':bill['cosponsors_rep'], 'prediction':bill['prediction'], 
            'probability':bill['probability']} for bill in currentbills]

app_dash.layout = html.Div([
    dash_table.DataTable(
        id='table-editing-simple',
        columns=(
            [{'id': 'ID', 'name': 'ID'}] +
            [{'id': p, 'name': p} for p in params]
        ),
        # data=[
        #     dict(Model=i, **{param: 0 for param in params})
        #     for i in range(1, 5)
        # ],
        data = currentbilldata,
        editable=True,
        filter_action="native",
        sort_action="native",
        sort_mode="multi",
        column_selectable="single",
        row_selectable="multi"
    )
])

@app_dash.callback(
    Output('table-editing-simple-output', 'figure'),
    Input('table-editing-simple', 'data'),
    Input('table-editing-simple', 'columns'))
def display_output(rows, columns):
    df = pd.DataFrame(rows, columns=[c['name'] for c in columns])
    return {
        'data': [{
            'type': 'parcoords',
            'dimensions': [{
                'label': col['name'],
                'values': df[col['id']]
            } for col in columns]
        }]
    }

# Set route
@server.route('/')
@server.route('/index.html')
def index():
    return render_template("index.html")

@server.route('/usmap.html')
def usmap():
    return render_template("usmap.html")

@server.route('/about.html')
def about():
    return render_template("about.html")

@server.route('/api/v1/topbilldata')
def topbilldata():
    topbills = topbills_coll.find()
    return_list = []
    for result in topbills:
        del result['_id']
        return_list.append(result)
    return return_list

@server.route('/api/v1/currentbilldata')
def currentbilldata():
    currentbills = currentbills_coll.find()
    return_list = []
    for result in currentbills:
        del result['_id']
        return_list.append(result)
    return return_list

@server.route('/dashboard')
def render_dashboard():
    return app_dash

if __name__ == '__main__':
    app_dash.run_server(debug=True)