import requests
from config import key
from govtrack import get_current_bills
import json
from pprint import pprint
from datetime import datetime as dt

def propublica_data_call(congress_num, bill_slug):
    url = f"https://api.propublica.org/congress/v1/{congress_num}/bills/{bill_slug}.json"
    response = requests.get(url, headers={'X-API-Key':key})
    json_data = json.loads(response.text)
    return json_data

def getdata():

    current_bills = get_current_bills()
    propublica_data = []
    for bill in current_bills:

        data = propublica_data_call(bill['congress_num'], bill['bill_id'])['results'][0]
        bill_type = data['bill_type']
        congress_num = data['congress']
        sponsor_party = data['sponsor_party']
        sponsor_state = data['sponsor_state']
        cosponsors_total = data['cosponsors']
        month_introduced = dt.strptime(data['introduced_date'], "%Y-%m-%d").month
        committees = data['committee_codes']
        try:
            cosponsors_dem = data['cosponsors_by_party']['D']
        except:
            cosponsors_dem = 0
        try:
            cosponsors_rep = data['cosponsors_by_party']['R']
        except:
            cosponsors_rep = 0
        try:
            cosponsors_ind = data['cosponsors_by_party']['I']
        except:
            cosponsors_ind = 0

        temp_dict = {
            "bill_type":bill_type,
            "congress_num":congress_num,
            "sponsor_party":sponsor_party,
            "sponsor_state":sponsor_state,
            "cosponsors_total":cosponsors_total,
            "cosponsors_dem":cosponsors_dem,
            "cosponsors_rep":cosponsors_rep,
            "cosponsors_ind":cosponsors_ind,
            "month_introduced":month_introduced,
            "committees":committees,

        }
        propublica_data.append(temp_dict)
    return propublica_data

if __name__ == '__main__':
    propublica_data = getdata()
    pprint(propublica_data[0])

    """
    useful keys for ML algorithm:

    bill_type

    sponsor_party
    sponsor_state
    total cosponsors
    cosponsor party count

    month of the year introduced
    committee
    subject

    congress no.?

    for later:
    state and party relationships
        count of states represented
    sponsor_title
    time between introduced date and last major action
        data cleaning option: drop if no last major action
    date congress ends
    length of the bill
    """