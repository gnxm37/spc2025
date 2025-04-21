from flask import Flask
from flask import request

app = Flask(__name__) # 내가 직접 이름 문자열로 써도 무방함

@app.route('/')
def home():
    return "Hello, Flask!"

@app.route('/user/<int:user_id>') # 가변인자 (파라미터)
def user_home(user_id): # 가변인자를 함수인자(argument)로 받음
    return f"<h1>사용자 페이지! 숫자ID:{user_id}</h1>"

@app.route('/admin')

@app.route('/admin/<username>')
def admin_home(username="Admin"):
    return f"<h1>관리자 페이지! {username}</h1>"

@app.route('/search')
def search():
    query = request.args.get('q')
    page = request.args.get('page', default=1)

    return f"검색중...키워드 {query}, 페이지{page}"

if __name__ == "__main__":  # 파이썬의 메인함수.. 내 파일을 실행했을 때 호출.. 다른 파일에서 나를 import할 때 호출할때는 호출되지 않음
    app.run()