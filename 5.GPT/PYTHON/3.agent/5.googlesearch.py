from dotenv import load_dotenv
from langchain_openai import OpenAI
from langchain_core.prompts import PromptTemplate
from langchain_core.runnables import RunnableLambda
from langchain.agents import initialize_agent, AgentType
from langchain_community.agent_toolkits.load_tools import load_tools

load_dotenv()
llm = OpenAI()
tools = load_tools(['google-search'])

template = """
    너는 한국인이며 서울의 날씨를 예보하는 일을 한다.
    자세하게 예보하는 것보다 간단하게 요약해서 예보하는 것을 선호한다.
    결과는 한국말로 번역해주고 대답한다.
"""

prompt = PromptTemplate(
    input_variables=["sentence"],
    template=template,
)

llm = OpenAI(temperature=0.2)
chain = prompt | llm | RunnableLambda(lambda x: {"translated": x.strip()})
result = chain.invoke(
        {"sentence": 
        """
        이번주 서울 날씨에 대해 예보해줘.
        단, 대답은 한국말로번역도 해줘.
        """
        }
)

agent = initialize_agent(
    tools,
    llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True # 운영할 때 끄는 건데, 상세내역을 보기 위해서 켜놓음.
)

result = agent.invoke({"input": result["translated"]})
print(result["output"])

