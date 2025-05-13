import os
from dotenv import load_dotenv

from langchain.agents import initialize_agent, AgentType
from langchain_experimental.plan_and_execute import PlanAndExecute, load_agent_executor, load_chat_planner
from langchain_openai import ChatOpenAI
from langchain.tools import tool

load_dotenv()

# 나만의 도구 정의하기
# flask에서 라우터 정의하던거... @app... 데코레이터
# 나만의 틀도.. @tool이라는 데코레이터로 정의함.. 함수 안의 주석도 의미 있는 주석임. 이 함수의 역할을 자연어로 정의한 것

@tool
def get_current_weather(location: str) -> str:
    """ 특정 위치의 현재 날짜 정보를 가져옵니다."""
    weather_data = {
        "서울": "맑음, 기온 22도",
        "부산": "비, 기온 20도",
        "대구": "흐림, 기온 18도",
        "인천": "눈, 기온 00도",
    }
    return weather_data.get(location, f"{location}의 날씨 정보는 없습니다.")

@tool
def get_population(city: str) -> str:
    """ 특정 도시의 인구 정보를 가져옵니다."""
    population_data = {
        "서울": "9,733,509명",
        "부산": "3,448,000명",
        "인천": "2,900,000명",
        "대구": "2,466,000명",
    }
    return population_data.get(city, f"{city}의 인구 정보는 없습니다.")

# 도구 일단 담아주기..
tools = [get_current_weather, get_population]

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0) # agent 와 연동할 때는 가능한 한 창의력을 낮게 해서 예측 가능한 문장이 되도록!

# 에이전트 초기화
agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True,
)

result = agent.invoke({'input': "제주의 날씨는 어때? 그리고 인구는 몇명이야?"})
print(result['output'])