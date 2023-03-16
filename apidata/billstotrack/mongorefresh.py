import pymongo
from config import mongo_password, mongo_username
from getdata import getdata

def topbills_refresh():
    # establishing pymongo connection
    conn = f"mongodb+srv://{mongo_username}:{mongo_password}@cluster0.khzagou.mongodb.net/?retryWrites=true&w=majority"
    client = pymongo.MongoClient(conn)
    usbillsapp_db = client.usbillsapp
    try: 
        # clear out collection if it already exists
        usbillsapp_db.drop_collection("topbills")
    except:
        pass

    # create the collection again for new refreshed data
    topbills_coll = usbillsapp_db.topbills

    # generate updated data
    bills = getdata()

    # load data into mongo usbillsapp db, topbills collection
    for bill in bills:
        topbills_coll.insert_one(bill)

    return None

if __name__ == '__main__':
    # establishing pymongo connection
    conn = f"mongodb+srv://{mongo_username}:{mongo_password}@cluster0.khzagou.mongodb.net/?retryWrites=true&w=majority"
    client = pymongo.MongoClient(conn)
    usbillsapp_db = client.usbillsapp
    topbills_coll = usbillsapp_db.topbills

    # generate updated data
    bills = getdata()

    # load data into mongo usbillsapp db, topbills collection
    for bill in bills:
        topbills_coll.insert_one(bill)
