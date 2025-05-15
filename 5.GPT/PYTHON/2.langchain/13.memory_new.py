from dotenv import load_dotenv

from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_community.chat_message_histories import ChatMessageHistory

load_dotenv()

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.1)

# 우리의 대화를 저장할 공간
memory = ChatMessageHistory()

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant."),
    MessagesPlaceholder(variable_name="history"), # 대화 기록 전달을 위한 공간
    ("human", "{input}")
])

chain = prompt | llm

def chat(message):
    response = chain.invoke({"input": message, "history": memory.messages})
    memory.add_user_message(message) # 사용자의 메시지를 대화 기록에 추가
    memory.add_ai_message(response.content) # AI의 응답을 대화 기록에 추가
    return response.content

print(chat("안녕"))
print(chat("우리 무슨 이야기를 할까?"))
print(chat("난 스포츠에 대한 이야기를 하고 싶어"))
