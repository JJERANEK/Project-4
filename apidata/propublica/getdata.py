import requests
from flask import jsonify
from config import key

def getdata(query):
    url = f"https://api.propublica.org/congress/v1/bills/search.json?query={query}"
    response = requests.get(url, headers={'X-API-Key':key})
    return jsonify(response.text)

if __name__ == '__main__':
    print(getdata("megahertz"))
