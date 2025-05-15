from dotenv import load_dotenv
import os
import pandas as pd

from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.document_loaders import PyMuPDFLoader
# from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.vectorstores import Chroma

from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough

load_dotenv()

pdf_filename = './PDF/Python_시큐어코딩_가이드(2023년_개정본).pdf'
PERSIST_DIR = "./chroma_db"
COLLECTION_NAME = "secure_coding_python"

def create_vector_db(file_path):
    loader = PyMuPDFLoader(file_path)
    pages = loader.load()

    # print(f"총 페이지 수:", len(pages))
    # print(f"첫 페이지 내용:", pages[8].page_content)
    
    # 우리 문서에 더하고 싶은 메타데이터 추가
    for doc in pages:
        doc.metadata["source"] = os.path.basename(file_path)
        if "page" not in doc.metadata:
            doc.metadata["page"] = doc.metadata.get("page", 0) + 1

    text_splitter = CharacterTextSplitter(
        separator="\n\n", # 문서 구분할 단위
        chunk_size=2000, # 청크 사이즈
        chunk_overlap=200 # 이전문서와 중복 허용
    )
    texts=text_splitter.split_documents(pages)

    embeddings = OpenAIEmbeddings()

    store = Chroma.from_documents(
        texts,
        embeddings,
        collection_name=COLLECTION_NAME,
        persist_directory="./chroma_db"
    )

    return store

def load_vector_db():
    embeddings = OpenAIEmbeddings()

    store = Chroma(
        collection_name=COLLECTION_NAME,
        embedding_function=embeddings,
        persist_directory=PERSIST_DIR,
    )
    return store

# DB가 없으면 생성할거고, 있으면 로딩...
def check_collection_exists(persist_dir, collection_name):
    embeddings = OpenAIEmbeddings()
    store = Chroma(
        collection_name=collection_name,
        embedding_function=embeddings,
        persist_directory=persist_dir,
    )
    results = store.get(include=[])
    return len(results["ids"]) > 0

if check_collection_exists(PERSIST_DIR, COLLECTION_NAME):
    print("DB가 존재합니다. 이전 내용 로딩중...")
    store = load_vector_db()
else:
    print("DB가 존재하지 않습니다. 새로 생성중...")
    store = create_vector_db(pdf_filename)

llm = ChatOpenAI(
    temperature=0,
    model="gpt-4o-mini",
)

retriever = store.as_retriever()

# 프롬프트 정의
template = """
다음 내용을 참고해서 사용자의 질문에 답변하시오:
{context}

만약, 정보가 없으면 모른다고 답변해줘. 정보가 있으면, 정보를 가져온 출처를 알려줘.
내용이 길 경우 리스트 형태로 번호를 매겨서 답변해줘.

질문: {question}

답변을 작성하고 마지막에 "출처: " 라고 해서 문서의 출처를 명시해줘.
"""

prompt = ChatPromptTemplate.from_template(template)

chain = (
    {"context": retriever, "question": RunnablePassthrough()}
    | prompt
    | llm
)

def answer_question(question):
    result = chain.invoke(question)
    if "출처:" in result.content:
        answer, sources = result.content.split("출처:", 1)
    else:
        answer = result.content.strip()
        sources = "출처 정보를 찾을 수 없습니다."
    return f"질문: {question}\n응답: {answer.strip()}\n출처: {sources}\n\n"

print(answer_question("싱가폴의 유명한 관광지를 알려주시오"))
print(answer_question("경복궁에 대해서 알려주시오"))
print(answer_question("파이썬 시큐어코딩 가이드라인이 뭐야?"))
print(answer_question("SQL 인젝션 공격에 대해서 설명해줘"))


