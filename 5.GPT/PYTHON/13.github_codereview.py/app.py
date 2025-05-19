from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
from langchain_openai import OpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
import requests

load_dotenv()

app = Flask(
    __name__,
    static_folder='static',
    template_folder='templates'  # templates 폴더 명시적으로 지정
)
llm = OpenAI(temperature=0.7, max_tokens=1000)

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant that helps with code review."),
    ("user", """
     다음 소스코드를 보고 분석해줘.
     그리고 개선해야 할 부분이 있다면 어디를 어떻게 수정해야 하는지 알려줘.
     한국말로 대답해줘.

    소스코드:
    {code}
    """),
])

chain = prompt | llm | StrOutputParser()  # LLM과 StrOutputParser를 연결하여 체인 생성

@app.route('/')
def index():
    return render_template('index2.html')

@app.route('/api/check', methods=['POST'])
def check_code():
    data = request.get_json()
    github_url = data.get('github_url', '')

    # 미션1. github_url에서 소스코드 가져오기
    # 1. github의 blob URL이면 raw URL로 변환
    if github_url.startswith("https://github.com/"):
        parts = github_url.replace("https://github.com/", "").split("/")
        if len(parts) >= 5 and parts[2] == "blob":
            user = parts[0]
            repo = parts[1]
            branch = parts[3]
            path = "/".join(parts[4:])
            raw_url = f"https://raw.githubusercontent.com/{user}/{repo}/{branch}/{path}"
        else:
            return jsonify({'result': '지원하지 않는 github URL 형식입니다.'})
    elif github_url.startswith("https://raw.githubusercontent.com/"):
        raw_url = github_url
    else:
        return jsonify({'result': '지원하지 않는 URL입니다.'})

    # 2. raw_url에서 소스코드 가져오기
    try:
        resp = requests.get(raw_url)
        resp.raise_for_status()
        code = resp.text
    except Exception as e:
        return jsonify({'result': f'코드 다운로드 실패: {e}'})

    # 미션2. 가져온 소스코드를 분석하기
    analysis = chain.invoke({"code": code})

    return jsonify({'result': analysis})

if __name__ == '__main__':
    app.run(debug=True)