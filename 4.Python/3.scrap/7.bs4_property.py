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
link_tag = soup.a
link_tags = soup.find_all('a')
print(link_tag)
print(link_tags)
print(link_tag['href'])

for link in link_tags:
    print(link['href'])

print("-"*40)
img_tag = soup.img
img_tags = soup.find_all('img')
img_tag2 = img_tags[1]
img_tag2 = img_tags[1] if len(img_tags) > 1 else None

print(img_tag2)

print(f"Src: {img_tag['src']}, Alt: {img_tag['alt']}, width: {img_tag.get('width', 'No width')}, height: {img_tag.get('height', ' No height')}")
print(f"Src: {img_tag2['src']}, Alt: {img_tag2['alt']}, width: {img_tag2.get('width', "No width")}, height: {img_tag2.get('height')}")

