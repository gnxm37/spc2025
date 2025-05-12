from dotenv import load_dotenv
from langchain_openai import OpenAI
from langchain_community.agent_toolkits.load_tools import load_tools
from langchain.agents import initialize_agent, AgentType

load_dotenv()

llm = OpenAI(temperature=0.0) # agent 선택과 연동을 해야 하는데? 창의적으로.. 하면 안됨. 명확하게 deterministic하게 해야 함.

tools = load_tools(["wikipedia"])

# 에이전트 초기화
agent = initialize_agent(
    tools,
    llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True # 운영할 때 끄는 건데, 상세내역을 보기 위해서 켜놓음.
)

# 에이전트 실행
result = agent.invoke({"input": "인공지능의 의미에 대해 2줄로 요약해서 한국말로 알려줘."})
print(result["output"])