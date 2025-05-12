import os
from dotenv import load_dotenv

from langchain.agents import initialize_agent, AgentType
from langchain_community.utilities import GoogleSerperAPIWrapper, GoogleSearchAPIWrapper, WikipediaAPIWrapper
from langchain_openai import ChatOpenAI
from langchain.chains import LLMMathChain
from langchain.tools import Tool

load_dotenv()

# 모델 생성
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.5)

# 각종 도구 설정
llm_math_chain = LLMMathChain.from_llm(
    llm,
    verbose=True,
)

# 사용할 도구 정의
search = GoogleSearchAPIWrapper()
wikipedia = WikipediaAPIWrapper()

tools = [
    Tool(
        name="Search",
        func=search.run,
        description="Useful for answering questions using Google Search.",
    ),
    Tool(
        name="Wikipedia",
        func=wikipedia.run,
        description="Useful for looking up facts and statistics."
    ),
    Tool(
        name="Calculator",
        func=llm_math_chain.run,
        description="Useful for answering math-related questions or calculations."
    ),
]

# 에이전트 초기화
agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True,
)

# 프롬프트 실행
prompt = """
   지금은 2025년도야, 다음 하계 올림픽을 개최할 나라는? 
"""

result = agent.run(prompt)
print(result)