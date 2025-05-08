from dotenv import load_dotenv
from openai import OpenAI
from langchain_openai import OpenAI

# load_dotenv() # 현재 폴더의 .env 읽어오기 
load_dotenv(dotenv_path='../.env')
# 2024.01월부터 기본값이 gpt-3.5-turbo로 바뀜, 그 전까지는 text-davinci-003이 기본값
llm = OpenAI()

prompt = "회사 이름을 작명하고 싶어. 나의 회사는 아케이드 게임을 만드는 회사야."
response = llm(prompt*5)
print(response)