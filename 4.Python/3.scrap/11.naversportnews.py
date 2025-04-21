from bs4 import BeautifulSoup
import requests

url = "https://sports.news.naver.com/index"
response = requests.get(url)

data = response.text
print(data)

soup = BeautifulSoup(data,'html.parser')
today = soup.select('ul.today_list > li > a')
print("-"*50)

news = []
for title in today:
    news.append(title['href'])
    print(title['href'])
    print(title['title'])
