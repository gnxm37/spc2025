from dotenv import load_dotenv

from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_core.output_parsers import StrOutputParser

load_dotenv()

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.1)

# 우리의 대화를 저장할 공간
memory = ChatMessageHistory()

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant."),
    MessagesPlaceholder(variable_name="history"), # 대화 기록 전달을 위한 공간
    ("human", "{input}")
])

chain = prompt | llm | StrOutputParser()

chain_with_memory = RunnableWithMessageHistory(
    chain,
    lambda _: memory, # get_session_history_func가 들어가는 곳인데 일단 세션을 구분 안할 것임.
    input_messages_key = "input",
    history_messages_key = "history"
)

print(chain_with_memory.invoke({"input": "안녕"}, config={"configurable": {"session_id": "user1"}}))
print(chain_with_memory.invoke({"input": "우리 무슨 이야기를 할까?"}, config={"configurable": {"session_id": "user2"}}))
print(chain_with_memory.invoke({"input": "방금 내가 이야기한 말은 뭐였지?"}, config={"configurable": {"session_id": "user1"}}))
