import requests
from config import key, mongo_password, mongo_username
from govtrack import gettopbills, getcurrentbills
import json
from datetime import datetime as dt
import pandas as pd
import pymongo

def propublica_data_call(congress_num, bill_slug):
    url = f"https://api.propublica.org/congress/v1/{congress_num}/bills/{bill_slug}.json"
    response = requests.get(url, headers={'X-API-Key':key})
    print(response)
    json_data = json.loads(response.text)
    return json_data

def gettopbilldata():
    current_bills = gettopbills()
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
        bill_id = data['bill_slug']
        title = data['title']
        short_title = data['short_title']
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
            "meta_data":{
                "bill_id":bill_id,
                "title":short_title,
                "summary":title
            },
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

def getcurrentbilldata():
    current_bills = getcurrentbills()
    conn = f"mongodb+srv://{mongo_username}:{mongo_password}@cluster0.khzagou.mongodb.net/?retryWrites=true&w=majority"
    client = pymongo.MongoClient(conn)
    usbillsapp_db = client.usbillsapp
    currentbills_coll = usbillsapp_db.currentbills
    try: 
            # clear out collection if it already exists
            usbillsapp_db.drop_collection("currentbills")
    except:
        pass

    for bill in current_bills:
        data = propublica_data_call(bill['congress_num'], bill['bill_id'])['results'][0]
        bill_type = data['bill_type']
        congress_num = data['congress']
        sponsor_party = data['sponsor_party']
        sponsor_state = data['sponsor_state']
        cosponsors_total = data['cosponsors']
        month_introduced = dt.strptime(data['introduced_date'], "%Y-%m-%d").month
        committees = data['committee_codes']
        bill_id = data['bill_slug']
        title = data['title']
        short_title = data['short_title']
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
            "meta_data":{
                "bill_id":bill_id,
                "title":short_title,
                "summary":title
            },
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
        # current_bill_data.append(temp_dict)
        currentbills_coll.insert_one(temp_dict) 
        print(f"Inserted {temp_dict['meta_data']['bill_id']}")
        
    return None

if __name__ == '__main__':
    # propublica_data = gettopbilldata()
    # pprint(propublica_data[0])
    getcurrentbilldata()