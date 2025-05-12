from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain.agents import load_tools, initialize_agent, AgentType

load_dotenv()

llm = ChatOpenAI(temperature=0.3, model="gpt-4o-mini") # 일반적으로 0.7 그래서 0.2~1.0 사이로 설정

tools = load_tools(["arxiv"]) # 많은 외부 서비스는 대부분 API 키가 필요함. (위키피디아, arXiv는 키없이 가능)

agent = initialize_agent(
    tools,
    llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True # 운영할 때 끄는 건데, 상세내역을 보기 위해서 켜놓음.
)

result = agent.invoke({"input": "최근 프롬프트 엔지니어링 관련 논문을 찾아서 요약해줘."}) # 입력값은 input이라는걸로
print(result["output"])