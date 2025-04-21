import requests
from bs4 import BeautifulSoup
import csv
import json
from urllib.parse import urlparse, urljoin
import os

BASE_URL = 'https://www.moviechart.co.kr'
MOVIERANK_URL = urljoin(BASE_URL, "/rank/realtime/index/image")
HEADERS = {
    'User-Agent':"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36"
}

os.makedirs("thumbnails", exist_ok=True)

# HTML 요청하기
response = requests.get(MOVIERANK_URL, headers=HEADERS)
if(response.status_code == 200):
    print("랭킹 가져오기 성공")

response.raise_for_status() # 오류 발생시 예외 발생
soup = BeautifulSoup(response.text, "html.parser")

# 미션, 영화 랭킹을 가져오세요
# 제목, 이미지 URL, 상세페이지 링크

link_tags = soup.select('ul.movieBox-list > li.movieBox-item > a')
movies = [] 
movies_json = [] 

def sanitize_filename(name):
    import re
    return re.sub(r'[\\/*?:"<>| ]','_',name)

for link in link_tags:
    href = link['href']
    img = link.select_one('img')
    p = link.select_one('p').text
    # print(p, img['alt'], "\n" "이미지 URL :", "https://www.moviechart.co.kr" + img['src'], "\n" "상세페이지 URL :", "https://www.moviechart.co.kr"+href)
    movies.append([p, img['alt'], img['src'], href])
    movies_json.append({
        "rank": p,
        "title": img['alt'],
        "img URL": "https://www.moviechart.co.kr" + img['src'],
        "href": href
    })
    
    thumbnail_url = urljoin(BASE_URL, img['src'])
    image_data = requests.get(thumbnail_url, headers=HEADERS).content

    if len(image_data) > 0:
        safe_filename = sanitize_filename(img['alt'])
        filename = f"thumbnails/{safe_filename}.jpg"
        with open(filename,'wb')as f:
            f.write(image_data)

# 결과를 저장할 리스트

# print("-"*30)
# print(movies)

csv_filename = 'movie_chart.csv'
with open(csv_filename, "w", newline='', encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(['순위', "제목", '이미지URL','상세 페이지 URL'])
    writer.writerows(movies)

# print(f"CSV 저장 완료 : {csv_filename}")

json_filename = "movie_chart.json"
with open(json_filename, "w", newline='', encoding="utf-8") as f:
    json.dump(movies_json, f, ensure_ascii=False, indent=4)

# print(f"JSON 저장 완료 : {json_filename}")



