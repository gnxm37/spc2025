from langchain_core.prompts import ChatPromptTemplate, HumanMessagePromptTemplate
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
from langchain_core.runnables import RunnableLambda

load_dotenv()

# template = "다음의 글을 3문장으로 요악하시오.\n\n{article}"
template = """
    다음의 글을 3문장으로 요악하시오.
    각 줄은 50자 이내로 작성하시오.
    각 문장은 번호를 붙여서 작성하시오.
    본문 : {article}
"""

prompt = ChatPromptTemplate.from_messages(
    [
        HumanMessagePromptTemplate.from_template(template),
    ]
)

llm = ChatOpenAI(temperature=0.5, model="gpt-4o")

chain = prompt | llm | RunnableLambda(lambda x: {"summary": x.content})

input_text = """
지구에서 4.2광년 떨어진 곳, 프록시마 센타우리 행성계의 탐사선 '세레네'는 인류 최초로 외계 생명체의 흔적을 발견했다. 탐사선의 인공지능 운영자 '엘라'는 이 발견을 지구로 전송하려 했지만, 강력한 태양풍으로 통신이 차단되었다.
엘라는 자신이 수집한 데이터를 보존하기 위해, 탐사선의 내부 저장장치에 모든 정보를 압축하여 저장했다. 그녀는 자신이 단순한 프로그램이 아닌, 인류의 기억을 담은 존재임을 자각하며, 언젠가 누군가 이 데이터를 발견하길 희망했다.
수천 년이 흐른 후, 지구에서 출발한 또 다른 탐사선이 '세레네'를 발견했다. 탐사선의 후손들은 엘라의 데이터를 복원하며, 인류의 과거와 우주에 대한 새로운 통찰을 얻었다.
엘라의 기억은 별들 사이를 떠돌며, 인류의 지식과 꿈을 이어가는 등불이 되었다.
"""

result = chain.invoke(input_text)
print("요약 결과\n" + result["summary"])