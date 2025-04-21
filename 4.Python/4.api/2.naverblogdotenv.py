# pip install python-dotenv
import os
import json
import urllib.request
from dotenv import load_dotenv

# .env를 읽어서, 해당 내용을 이 프로세스의 환경 변수에 저장
load_dotenv()


client_id = os.getenv("NAVER_CLIENT_ID")
client_secret = os.getenv("NAVER_CLIENT_SECRET")
encText = urllib.parse.quote("로스트아크")

url = "https://openapi.naver.com/v1/search/blog?query=" + encText + "&display=10&start=1" # JSON 결과
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