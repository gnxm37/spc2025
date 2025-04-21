# https://www.pythonscraping.com/pages/page3.html

# 미션1. 해당페이지에 요청한다
# 미션2. 해당페이지를 파싱해서 상품명과 가격 출력

from bs4 import BeautifulSoup
import requests

url = "https://www.pythonscraping.com/pages/page3.html"
response = requests.get(url)
data = response.text
soup = BeautifulSoup(data, 'html.parser')

tds = soup.select('td')
cost = []
item_title = []

for td in tds[::4]:
    item_title.append(td.text.replace("\n",""))

for td in tds[2::4]:
    cost.append(td.text.replace('\n',""))

total = dict(zip(item_title, cost))
print(total)
