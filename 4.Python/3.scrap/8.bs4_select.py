from bs4 import BeautifulSoup
# 문자열을 parsing해서 html 돔형태로 만들어줌.

html_doc = """
<html>
<head>
    <title>간단한 HTML 예제</title>
</head>
<body>
    <div class="container">
        <h1>안녕하세요</h1>
        <p>이것은 간단한 HTML 예제입니다.</p>
        <a href="https://www.naver.com">네이버로 가기</a>
        <img src="example.jpg" alt="예제이미지">
        <img src="example2.jpg" alt="예제이미지2" width="500" height="600">
        <a href="https://www.daum.com">다음으로 가기</a>
    </div>
    <ul>
        <li>항목 1</li>
        <li>항목 2</li>
        <li>항목 3</li>
    <ul>
    <div class="footer">
        <p id="copyright"> 저작권 copyright 2025. 내꺼</p>
    </div>
</body>
</html>
"""

soup = BeautifulSoup(html_doc, 'html.parser')

# 클래스가 container인 div를 가져오고 싶음
link_tag = soup.select_one('a')
print(link_tag)
print(link_tag['href'])
print(link_tag.text)

link_tags = soup.select('a')
print(link_tags)
for link in link_tags:
    print(link['href'])

container_div = soup.select_one('div.container') # css 셀렉터 스타일로..
print("div_container:",container_div)

copyright = soup.select_one('#copyright')
print("copyright", copyright)

div_container_p = soup.select_one('div.container p')
print(div_container_p)