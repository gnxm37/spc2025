from dotenv import load_dotenv
from langchain_openai import OpenAI
from langchain_community.agent_toolkits.load_tools import load_tools
from langchain.agents import initialize_agent, AgentType

load_dotenv()

llm = OpenAI(temperature=0.2) # agent 선택과 연동을 해야 하는데? 창의적으로.. 하면 안됨. 명확하게 deterministic하게 해야 함.

tools = load_tools(["wikipedia", "llm-math"])

# 에이전트 초기화
agent = initialize_agent(
    tools,
    llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True # 운영할 때 끄는 건데, 상세내역을 보기 위해서 켜놓음.
)

prompt = """
    1. Find the list of public holidays in South Korea with their specific dates (month and day)
    2. For each holiday, add the month number and day number, For example, January 1st, add 1 + 1 = 2
    3. Tell me the sum of these numbers.
    Please list each calculation step by step clearly.
"""

# 에이전트 실행
result = agent.invoke({"input": prompt})
print(result["output"])