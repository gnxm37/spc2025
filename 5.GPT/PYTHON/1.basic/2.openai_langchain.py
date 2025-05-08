from dotenv import load_dotenv
from langchain_openai import OpenAI
from flask import Flask, request, jsonify # flask 웹서비스 (express.js와 비슷한 개념)

# load_dotenv() # 현재 폴더의 .env 읽어오기 
load_dotenv(dotenv_path='../.env')
# 2024.01월부터 기본값이 gpt-3.5-turbo로 바뀜, 그 전까지는 text-davinci-003이 기본값
llm = OpenAI(temperature=0.9)
app = Flask(__name__) 

prompt_template = "회사 이름을 영어로 작명하고 싶어. 나의 회사는"

@app.route('/generate', methods=['POST'])
@app.route('/api/company_name', methods=['POST'])
def generate():
    prompt = request.json.get('prompt', '')

    final_prompt = prompt_template + prompt
    
    result = llm.generate([final_prompt]*5)
    results = []
    for data in result.generations:
        print(data[0].text)
        results.append(data[0].text.strip())
    
    return jsonify({'response': results})
    
if __name__ == '__main__':
    app.run(port=5000)  # Flask 앱 실행