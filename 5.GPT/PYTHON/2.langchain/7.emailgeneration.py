from langchain_core.prompts import PromptTemplate
from langchain_openai import OpenAI
from dotenv import load_dotenv
from langchain_core.runnables import RunnableLambda

load_dotenv()

template = """
    회사의 공식 이메일을 작성하고자 합니다. 수신자 {recipient} 에게 
    다음 주제 {topic} 에 대한 미팅 요청을 하는 이메일입니다.
    한글로 작성해주세요.
"""

prompt = PromptTemplate(
    input_variables=["recipient", "topic"],
    template=template,
)

llm = OpenAI(temperature=0.6, max_tokens=1024)  # SQL 쿼리문을 작성할거니 최대한 정확하게 창의력을 최소화

chain = prompt | llm | RunnableLambda(lambda x: {"email": x.strip()})

example_input = {
    "recipient": "개발팀",
    "topic": "신규 서비스 런칭"
}

result = chain.invoke(example_input)
print("이메일 결과")
print('-' * 50)
print(result["email"])
print('=' * 50)

recipients = [
    "마케팅팀", 
    "개발팀",
    "디자인팀",
    "인사팀",
    "재무팀"
]

topics = [
    "2024년 마케팅 전략",
    "버그로 줄어드는 사용자를 다시 붙잡기 위한 전략",
    "UI/UX 개선안",
    "인사 정책 변경",
    "예산 편성 회의",
]

for recipient, topic in zip(recipients, topics):
    print(f"To: {recipient} | Topic: {topic}")
    result = chain.invoke({"recipient": recipient, "topic": topic})
    print(result["email"])
    print('-' * 50)
