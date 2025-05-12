from dotenv import load_dotenv
from langchain_core.prompts import PromptTemplate
from langchain_openai import ChatOpenAI
from langchain_core.runnables import RunnableLambda


load_dotenv()
# 입력값: "주제"
# -> 이 주제를 갖는 회사명을 만들고
# -> 이 회사의 슬로건(캐치 프레이즈)을 만들거임

# 1. 기본 질의 응답 패턴
chat_prompt1 = PromptTemplate(
    input_variables=["product"],
    # template="You are a professional naming consultant. What is a good name for a company that makes {product}?"
    template="너는 회사 이름을 만드는 전문가야. 다음 상품/서비스를 갖는 회사명을 한국어로 3개 지어줘. [상품명] : {product}"
)

chat_prompt2 = PromptTemplate(
    input_variables=["company_name"],
    # template="Write a slogan (catch-phrase) for the following company name: {company_name}"
    template="이 회사를 잘 소개할 수 있는 슬로건 (또는 catch-phrase)를 만들어줘. [회사명] : {company_name}"
)

llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=1.0)

chain1 = chat_prompt1 | llm | RunnableLambda(lambda x: {"response": x.content})
response1 = chain1.invoke({"product": "김치"})["response"]
chain2 = chat_prompt2 | llm | RunnableLambda(lambda x: {"response": x.content})
response2 = chain2.invoke({"company_name": response1})["response"]

print(response1)
print('-' * 50)
print(response2)