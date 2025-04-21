import requests

url = "https://example.com"

response = requests.get(url)
data = response.text

# 이 결과는 무슨 포맷인가? 자료 구조로 볼때
# html이 아니고 문자열 string임
print(data)
