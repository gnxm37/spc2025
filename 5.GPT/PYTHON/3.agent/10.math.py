from langchain.agents import initialize_agent, load_tools, AgentType
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv

load_dotenv()

llm = ChatOpenAI(temperature=0.5, model="gpt-4o-mini")

tools = load_tools(["llm-math"], llm=llm) # math는 수학 계산을 위한 도구

agent = initialize_agent(
    tools,
    llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True # 운영할 때 끄는 건데, 상세내역을 보기 위해서 켜놓음.
)

# result = agent.invoke("123 * (4 + 5)는 얼마야?")
question = """
기차가 시속 80km로 2시간 반을 달렸고, 이후 100km로 한시간반을 달렸어.
이 기차가 이동한 총거리는 얼마이고 평균속도는 어떻게 될까?
"""
result = agent.invoke(question)
print(result["output"])