import requests
from bs4 import BeautifulSoup

def left(s, amount):
    return s[:amount]

def right(s, amount):
    return s[-amount:]

def mid(s, offset, amount):
    return s[offset:offset+amount]

def get_current_bills():
    base_url = "https://www.govtrack.us"
    search_url = f"{base_url}/congress/bills/#docket"
    response = requests.get(search_url)
    soup = BeautifulSoup(response.content, "html.parser")
    topbills = soup.find("div",{'id':'top_tracked_bills'}).find_all("a")
    url_list = [result['href'] for result in topbills]

    congress_nums = [mid(url,16,3) for url in url_list if "jres" not in url and "cres" not in url and "sres" not in url and "hres" not in url]

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

if __name__ == "__main__":
    print(get_current_bills())