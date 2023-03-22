from dash import Dash, dash_table, html
from dash.dependencies import Input, Output
import pandas as pd
import pymongo
import os


def left(s, amount):
    return s[:amount]

def right(s, amount):
    return s[-amount:]

def mid(s, offset, amount):
    return s[offset:offset+amount]


### when running on your personal machine, not render, use:
# export 'mongo_username'='project4app'
# export 'mongo_password'='dfh16515d681ds'
### these are read only credentials
mongo_username = os.getenv('mongo_username')
mongo_password = os.getenv('mongo_password')

uri = f"mongodb+srv://{mongo_username}:{mongo_password}@cluster0.khzagou.mongodb.net/?retryWrites=true&w=majority"

with pymongo.MongoClient(uri) as client:
    db = client.usbillsapp
    topbills_coll = db.topbills
    currentbills_coll = db.currentbills
    currentbills = list(currentbills_coll.find())

# Create an instance of our dash app.
app = Dash(
    __name__,
    requests_pathname_prefix='/currentbillsdashboard/'
)

params = [
    'Bill ID', 'Title', 'sponsor_party', 'sponsor_state', 'cosponsors_total',
    'cosponsors_dem', 'cosponsors_rep', 'prediction', 'probability %'
]

currentbilldata = [{'Bill ID':bill['meta_data']['bill_id'], 'Title':left(bill['meta_data']['title'], 30), 
                    'sponsor_party':bill['sponsor_party'], 'sponsor_state':bill['sponsor_state'], 
                    'cosponsors_total':bill['cosponsors_total'],'cosponsors_dem':bill['cosponsors_dem'], 
                    'cosponsors_rep':bill['cosponsors_rep'], 'prediction':bill['prediction'], 
                    'probability %':round((float(bill['probability'].replace('%',''))),2)} for bill in currentbills]

app.layout = html.Div([
    dash_table.DataTable(
        id='table-editing-simple',
        columns=([{'id': p, 'name': p} for p in params]),
        data = currentbilldata,
        editable=True,
        filter_action="native",
        sort_action="native",
        sort_mode="multi",
        column_selectable="single",
        row_selectable="multi"
    )
])

@app.callback(
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