from dotenv import load_dotenv

from langchain.agents import initialize_agent, AgentType
from langchain_openai import ChatOpenAI
from langchain_community.agent_toolkits.load_tools import load_tools
from langchain_core.runnables import RunnableLambda

# 1. 환경변수 로드
load_dotenv()

# 2. LLM 모델 로딩
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.3) 

# 3. 외부 툴 로드
tools = load_tools(["google-search"])

# 4. 에이전트 정의 (Zero-Shot + ReACT) 프롬프트 기법을 사용해서 Agent 실행
agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent_type=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True, # 디버깅용
)

# 5. 체인
def smart_old_router(input):
    user_input = input['input']

    keywords= ["날씨", "검색", "오늘", "실시간", "뉴스", "가격", "환율", "2025"]
    if any(k in user_input for k in keywords):
        print("[판단] Agent 사용 필요함")
        response = agent.invoke(input)
        return {"output": response}
    else:
        response = llm.invoke(user_input)
        return {"output": response.content.strip()}
    
def smart_new_router(input):
    user_input = input['input']

    judge_prompt = f"""
        너는 사용자의 질문에 대해서 LLM에게 질문할지, 외부 툴(에이전트)을 통해서 질문할지 판단하는 시스템이야.
        최신 정보를 요청하거나 니가 사전 학습된 내용에 없는 질문이 있을 경우 에이전트를 통해서 외부 실시간 검색을 할 수 있어.
        그래서 사용자 질문을 보고 에이전트 필요성을 "yes"또는 "no"로만 설명없이 답변해줘.
        
        사용자 질문: {user_input}
    """
    judge_response = llm.invoke(judge_prompt).content.strip().lower()
    print("[판단결과]", judge_response)
    if "yes" in judge_response:
        print("[판단] Agent 사용 필요함")
        response = agent.invoke(input)
        return {"output": response}
    else:
        response = llm.invoke(user_input)
        return {"output": response.content.strip()}

chain = RunnableLambda(smart_new_router)

# 6. 질문
inputs = [
    {"input": "서울의 오늘 날씨는 어때?"},
    {"input": "GPT-3.5 모델은 어떤 특징이 있어?"},
    {"input": "2025년도 미국 대통령은 누구야?"},
    {"input": "AI는 우리 삶에 어떤 영향을 줄까?"}
]
# 7. 답변 출력
for item in inputs:
    print(f"질문: {item['input']}")
    result = chain.invoke(item)
    print(f"답변: {result['output']}")