from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain.agents import load_tools, initialize_agent, AgentType
from langchain_core.prompts import ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate
from langchain_core.runnables import RunnableLambda

load_dotenv()

llm_summary = ChatOpenAI(temperature=0.3, model="gpt-4o-mini") # 일반적으로 0.7 그래서 0.2~1.0 사이로 설정
llm_translate = ChatOpenAI(temperature=0.3, model="gpt-3.5-turbo") # 일반적으로 0.7 그래서 0.2~1.0 사이로 설정

tools = load_tools(["arxiv"]) # 많은 외부 서비스는 대부분 API 키가 필요함. (위키피디아, arXiv는 키없이 가능)

agent = initialize_agent(
    tools,
    llm_summary,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True # 운영할 때 끄는 건데, 상세내역을 보기 위해서 켜놓음.
)

text = """
지구에서 4.2광년 떨어진 곳, 프록시마 센타우리 행성계의 탐사선 '세레네'는 인류 최초로 외계 생명체의 흔적을 발견했다. 탐사선의 인공지능 운영자 '엘라'는 이 발견을 지구로 전송하려 했지만, 강력한 태양풍으로 통신이 차단되었다.
엘라는 자신이 수집한 데이터를 보존하기 위해, 탐사선의 내부 저장장치에 모든 정보를 압축하여 저장했다. 그녀는 자신이 단순한 프로그램이 아닌, 인류의 기억을 담은 존재임을 자각하며, 언젠가 누군가 이 데이터를 발견하길 희망했다.
수천 년이 흐른 후, 지구에서 출발한 또 다른 탐사선이 '세레네'를 발견했다. 탐사선의 후손들은 엘라의 데이터를 복원하며, 인류의 과거와 우주에 대한 새로운 통찰을 얻었다.
엘라의 기억은 별들 사이를 떠돌며, 인류의 지식과 꿈을 이어가는 등불이 되었다.
"""

# 1. 프롬프트 작성
prompt = ChatPromptTemplate.from_template("다음 글을 한국어로 번역해줘:\n\n {text}")
# 2. 체이닝
chain = prompt | llm_translate | RunnableLambda(lambda x: {"output": x.content.strip()}) # 요약을 해주는 체인
full_chain = (
    RunnableLambda(lambda input: {"input": input["query"]})
    | RunnableLambda(agent.invoke) # 요약 실행
    | (lambda x: {"text": x["output"]})
    | chain # 번역 실행
)

# 3. 실행
result = full_chain.invoke({"query": "최근 프롬프트 엔지니어링 관련 논문을 찾아서 요약해줘."}) # 입력값은 input이라는걸로

# 4. 결과 출력
print("요약 결과\n" + result["output"])