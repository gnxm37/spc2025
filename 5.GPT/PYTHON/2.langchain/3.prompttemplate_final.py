from langchain_core.prompts import PromptTemplate
from langchain_openai import OpenAI
from dotenv import load_dotenv

from langchain_core.runnables import RunnableLambda

load_dotenv()

# 1. 프롬프트 템플릿 정의
templete = """
    You are a naming consultant form new companies.
    What is good name for a {company} that makes {product}?
    Give me three and only three answers.
"""

prompt = PromptTemplate(
    template=templete,
    input_variables=["company", "product"]
)

# 2. LLM 모델을 설정
llm = OpenAI(temperature=0.9)   # 이름을 작명하기 위해서 창의적으로 설정

# 3. 체인 구성 (입력 프롬프트 -> 모델 -> 후처리)
chain = prompt | llm | RunnableLambda(
    lambda x: {"response": x.strip()}
)

# 4. 체인 실행
inputs = {
    "company": "High Tech Company",
    "product": "Web Game"
}
result = chain.invoke(inputs)


# 5. 결과 출력
print(f"최종 프롬프트 결과")
print('-' * 20)
print(f"{result['response']}")
