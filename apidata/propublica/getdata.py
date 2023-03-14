import requests
from flask import jsonify
from config import key

def getdata(bill_slug, congress_num):
    url = f"https://api.propublica.org/congress/v1/{congress_num}/bills/{bill_slug}.json"
    response = requests.get(url, headers={'X-API-Key':key})
    return jsonify(response.text)

if __name__ == '__main__':
    print(getdata("megahertz"))
