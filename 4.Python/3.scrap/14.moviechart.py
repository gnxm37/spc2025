import requests
from bs4 import BeautifulSoup
import csv
import json

URL = "https://www.moviechart.co.kr/rank/realtime/index/image"
headers = {
    'User-Agent':"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36"
}

# HTML 요청하기
response = requests.get(URL, headers=headers)
if(response.status_code == 200):
    print("랭킹 가져오기 성공")

response.raise_for_status() # 오류 발생시 예외 발생
soup = BeautifulSoup(response.text, "html.parser")

# 미션, 영화 랭킹을 가져오세요
# 제목, 이미지 URL, 상세페이지 링크

link_tags = soup.select('ul.movieBox-list > li.movieBox-item > a')

movies = [] 
movies_json = [] 

for link in link_tags:
    href = link['href']
    img = link.select_one('img')
    p = link.select_one('p').text
    print(p, img['alt'], "\n" "이미지 URL :", "https://www.moviechart.co.kr"+img['src'], "\n" "상세페이지 URL :", "https://www.moviechart.co.kr"+href)
    movies.append([p, img['alt'], img['src'], href])
    movies_json.append({
        "rank": p,
        "title": img['alt'],
        "img URL": img['src'],
        "href": href
    })

# 결과를 저장할 리스트

print("-"*30)
print(movies)

csv_filename = 'movie_chart.csv'
with open(csv_filename, "w", newline='', encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(['순위', "제목", '이미지URL','상세 페이지 URL'])
    writer.writerows(movies)

print(f"CSV 저장 완료 : {csv_filename}")

json_filename = "movie_chart.json"
with open(json_filename, "w", newline='', encoding="utf-8") as f:
    json.dump(movies_json, f, ensure_ascii=False, indent=4)

print(f"JSON 저장 완료 : {json_filename}")

