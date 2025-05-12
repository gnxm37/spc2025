from dotenv import load_dotenv
from langchain_openai import OpenAI
from langchain_community.agent_toolkits.load_tools import load_tools
from langchain.agents import initialize_agent, AgentType

load_dotenv()

llm = OpenAI(temperature=0.2)

tools = load_tools(['human'])

agent = initialize_agent(
    tools,
    llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True # 운영할 때 끄는 건데, 상세내역을 보기 위해서 켜놓음.
)

result = agent.invoke({"input": "How old are you?"})
print(result)