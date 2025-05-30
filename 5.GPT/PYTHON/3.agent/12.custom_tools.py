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
def add(query: str) -> int:
    """ 두 숫자를 더합니다. 형식: '숫자1 숫자2'"""
    # 따옴표 제거
    query = query.replace("'","").replace('"','').strip()
    # 숫자 추출해서 더하기
    nums = [int(x) for x in query.split()]
    return nums[0] + nums[1]

@tool
def multiply(query: str) -> int:
    """ 두 숫자를 곱합니다. 형식: '숫자1 숫자2'"""
    # 따옴표 제거
    query = query.replace("'","").replace('"','').strip()
    # 숫자 추출해서 곱하기
    nums = [int(x) for x in query.split()]
    return nums[0] * nums[1]

@tool
def divide(query: str) -> int:
    """ 두 숫자를 나눕니다. 형식: '숫자1 숫자2'"""
    # 따옴표 제거
    query = query.replace("'","").replace('"','').strip()
    # 숫자 추출해서 나누기
    nums = [int(x) for x in query.split()]
    return nums[0] / nums[1]

@tool
def subtract(query: str) -> int:
    """ 두 숫자를 뺍니다. 형식: '숫자1 숫자2'"""
    # 따옴표 제거
    query = query.replace("'","").replace('"','').strip()
    # 숫자 추출해서 빼기
    nums = [int(x) for x in query.split()]
    return nums[0] - nums[1]
# 도구 일단 담아주기..
tools = [add, multiply, divide, subtract]

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0) # agent 와 연동할 때는 가능한 한 창의력을 낮게 해서 예측 가능한 문장이 되도록!

# 에이전트 초기화
agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True,
)

result = agent.invoke({'input': "3과 7의 뺄셈을 구하고 2를 곱하시오."})
print(result['output'])