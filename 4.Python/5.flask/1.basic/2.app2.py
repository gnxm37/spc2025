from flask import Flask, request, make_response, jsonify

app = Flask(__name__)

users = [
    {"id":1,"name":"alice","age":25,"phone":"010-1234-5678"},
    {"id":2,"name":"bob","age":30,"phone":"011-1222-5222"},
    {"id":3,"name":"charlie","age":35,"phone":"070-4212-5678"},
    {"id":4,"name":"alice","age":35,"phone":"043-9092-5218"}
]

@app.route('/')
def main():
    return "메인"

@app.route('/users')
def get_users():
    return jsonify(users)

@app.route('/users/<int:user_id>')
def get_user_by_id(user_id):
    user = None
    for u in users:
        if u['id'] == user_id:
            user = u
            break # 찾았으면 중단
    # 모던 파이썬 스타일 참고용
    # user = next((user for user in users if user['id'] == user_id), None)

    if user is not None:
        return jsonify(user)
    else:
        return jsonify({"error": "User not found"}), 404

@app.route('/search')   # /search?name=Alice
def search_user():
    query = request.args.get("name")
    if not query:
        response = make_response(jsonify(data))
        data = {"error": "Name is required. 한글 테스트"}
        response.headers["Content-Type"] = "application/json; charset=utf-8"
        return response
    result = [user for user in users if query.lower() in user['name'].lower()]
    return jsonify(result)    
    
if __name__ == "__main__":
    app.run()