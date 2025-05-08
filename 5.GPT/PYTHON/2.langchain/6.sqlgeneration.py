from langchain_core.prompts import PromptTemplate
from langchain_openai import OpenAI
from dotenv import load_dotenv
from langchain_core.runnables import RunnableLambda

load_dotenv()

template = "다음 요청에 대한 SQL 쿼리문을 작성하세요. 설명 없이 오직 SQL 쿼리문만 작성하세요.\n\n{query}"
prompt = PromptTemplate(
    input_variables=["query"],
    template=template,
)

llm = OpenAI(temperature=0.3)  # SQL 쿼리문을 작성할거니 최대한 정확하게 창의력을 최소화

chain = prompt | llm | RunnableLambda(lambda x: {"sql": x.strip()})

example_input = {
    "query": "List the name and email of users who signed up after Jan, 1, 2024."
}

result = chain.invoke(example_input)
print("SQL 쿼리문 결과")
print('-' * 50)
print(result["sql"])