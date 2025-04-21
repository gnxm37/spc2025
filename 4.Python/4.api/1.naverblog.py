import os
import sys
import json
import urllib.request
client_id = "DFwvgecSrHTIpDDcNEnn"
client_secret = open('secret.txt', 'r').read()
encText = urllib.parse.quote("로스트아크")

url = "https://openapi.naver.com/v1/search/blog?query=" + encText + "&display=10&start=2" # JSON 결과
# url = "https://openapi.naver.com/v1/search/blog.xml?query=" + encText # XML 결과
request = urllib.request.Request(url)
request.add_header("X-Naver-Client-Id",client_id)
request.add_header("X-Naver-Client-Secret",client_secret)
response = urllib.request.urlopen(request)
rescode = response.getcode()
# restext = rescode.json()

if(rescode==200):
    response_body = response.read()
    # print(response_body.decode('utf-8'))
else:
    print("Error Code:" + rescode)

items = response_body.decode("utf-8")

item_json = json.loads(items)
for item in item_json["items"]:
    print(item['title'], "-"*10,item['link'])