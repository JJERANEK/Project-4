import requests
from config import key
from govtrack import get_current_bills
import json
from pprint import pprint
from datetime import datetime as dt
from bs4 import BeautifulSoup
from splinter import Browser
import selenium
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.keys import Keys
import time

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

def getallintroducedbills():
    # Set up Splinter
    executable_path = {'executable_path': ChromeDriverManager().install()}
    browser = Browser('chrome', **executable_path, headless=False)
    browser.visit(url)
    url = "https://www.govtrack.us/congress/bills/browse?sort=-current_status_date&status=1,3#current_status[]=1,3&bill_type[]=3,2,7,8&sort=-introduced_date"

    body = browser.find_element_by_css_selector('body')
    for x in range(60):
        time.sleep(1)
        body.send_keys(Keys.PAGE_DOWN)
    
    site_contents = browser.html
    soup = BeautifulSoup(site_contents, "html.parser")

    return soup

if __name__ == '__main__':
    # propublica_data = getdata()
    # pprint(propublica_data[0])

    print(getallintroducedbills())

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