import requests

resp = requests.get("http://www.naver.com")
print("웹 페이지 내용:", resp) # 객체인것을 확인, 객체 타입은 RESPONSE
print("헤더정보:", resp.headers)
print('바디데이터:', resp.text)