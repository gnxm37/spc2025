import os
from dotenv import load_dotenv

from langchain.agents import initialize_agent, AgentType
from langchain_community.utilities import GoogleSerperAPIWrapper, GoogleSearchAPIWrapper, WikipediaAPIWrapper
from langchain_openai import ChatOpenAI
from langchain.chains import LLMMathChain
from langchain.tools import Tool

load_dotenv()

# 필요한 키들이 다 있는지 확인
google_api_key = os.getenv("GOOGLE_API_KEY")
google_cse_id = os.getenv("GOOGLE_CSE_ID")

if not google_api_key or not google_cse_id:
    raise ValueError("필요한 구글 API 키들이 설정되어 있지 않습니다.")

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
   지난 1988 올림픽에서, 서울이 획득한 금메달, 은메달, 동메달의 합산 개수의 곱하기 2를 알려줘.
"""

result = agent.run(prompt)
print(result)