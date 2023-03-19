import requests
from bs4 import BeautifulSoup
import pandas as pd

def left(s, amount):
    return s[:amount]

def right(s, amount):
    return s[-amount:]

def mid(s, offset, amount):
    return s[offset:offset+amount]

def gettopbills():
    base_url = "https://www.govtrack.us"
    search_url = f"{base_url}/congress/bills/#docket"
    response = requests.get(search_url)
    soup = BeautifulSoup(response.content, "html.parser")
    topbills = soup.find("div",{'id':'top_tracked_bills'}).find_all("a")
    url_list = [result['href'] for result in topbills]

    congress_nums = [mid(url,16,3) for url in url_list if "cres" not in url and "sres" not in url and "hres" not in url]

    results = []
    for url in url_list:
        x = 0
        temp = ""
        while '/' not in temp:
            x += 1
            temp = right(url, x)
            if '/' not in temp:
                result = temp
        results.append(result)

    filtered_results = [result for result in results if 'res' not in result]

    query_list = []
    for x in range(len(filtered_results)):
        temp_dict = {"congress_num":congress_nums[x],"bill_id":filtered_results[x]}
        query_list.append(temp_dict)
    
    return query_list

def getcurrentbills():
    df = pd.read_csv('../../Resources/search_results_2023-03-18_1238pm.csv', index_col=False)
    df.rename(columns={'Congress':'congress_num'}, inplace=True)
    s1 = df['bill_id'].str.replace('. ', '').str.replace('.','').str.lower()
    s2 = df['congress_num'].str[:3]
    output_df = pd.concat([s1, s2], axis=1)
    output_dict = output_df.to_dict()
    output = []
    for index,value in output_df.iterrows():
        temp_dict = {
            "bill_id":value['bill_id'],
            "congress_num":value['congress_num']
        }
        output.append(temp_dict)
    return output

if __name__ == "__main__":
    print(getcurrentbills())