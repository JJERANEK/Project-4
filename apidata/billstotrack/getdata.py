import requests
from flask import jsonify
from config import key
from govtrack import get_current_bills
import json
from pprint import pprint

def propublica_data_call(congress_num, bill_slug):
    url = f"https://api.propublica.org/congress/v1/{congress_num}/bills/{bill_slug}.json"
    response = requests.get(url, headers={'X-API-Key':key})
    json_data = json.loads(response.text)
    return json_data

def getdata():
    current_bills = get_current_bills()
    propublica_data = []
    for bill in current_bills:
        propublica_data.append(propublica_data_call(bill['congress_num'], bill['bill_id'])['results'][0])
    return propublica_data

if __name__ == '__main__':
    current_bills = get_current_bills()
    propublica_data = []
    for bill in current_bills:
        propublica_data.append(propublica_data_call(bill['congress_num'], bill['bill_id'])['results'])
    pprint(propublica_data[0][0])

    """
    useful keys for ML algorithm:
    bill_type
    sponsor_party
    sponsor_state

    sponsor
    introduced_date
    """