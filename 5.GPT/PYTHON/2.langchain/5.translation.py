from langchain_core.prompts import PromptTemplate
from langchain_openai import OpenAI
from dotenv import load_dotenv
from langchain_core.runnables import RunnableLambda

load_dotenv()

template = """
    다음 문장을 통해 지금 의견들을 요약해서 현재 이 게임의 상황에 대해 확률로 말해봐:\n\n{sentence}
"""

prompt = PromptTemplate(
    input_variables=["sentence"],
    template=template,
)

llm = OpenAI(temperature=0.5, max_tokens=1024) # 번역할거니 최대한 정확하게 창의력을 최소화
chain = prompt | llm | RunnableLambda(lambda x: {"translated": x.strip()})
result = chain.invoke(
    {"sentence": 
    """
부정적인 의견
운영진에 대한 불만
"진짜 무능한 운영진"이라는 제목의 글에서는 운영진의 대응 부족에 대한 비판이 제기되었습니다.
유저 간담회 요청
"디렉터는 유저간담회를 열어서 소통하고 다시 잡아라!"라는 제목의 글에서는 개발진과의 소통 부족에 대한 아쉬움이 표현되었습니다.
골드 시세에 대한 불안
"골드너프 보석시세 해줘도 난리 안해주면 안해준다고 난리"라는 제목의 글에서는 골드 시세 변화에 대한 우려가 나타났습니다.
확률 공개 요구
"확률공개 요망"이라는 제목의 글에서는 게임 내 확률 시스템에 대한 투명성 요구가 제기되었습니다.
이벤트에 대한 불만
"이 시국에 꿀벌 모코코 처 팔고있네 ㅋㅋ"라는 제목의 글에서는 특정 이벤트에 대한 비판이 있었습니다.
긍정적인 의견
디스코드 서버 홍보
"꾸준히 로스트아크 즐겁게 하실 분들을 위한 디스코드 서버에요 ^-^"라는 제목의 글에서는 함께 게임을 즐길 유저들을 위한 커뮤니티가 소개되었습니다.
골드 시세 정보 공유
"골드오른다 안심해라 쫄지말고 절대로"라는 제목의 글에서는 골드 시세에 대한 정보를 공유하며 유저들을 안심시키는 내용이 담겼습니다.
직업 변경권 제안
"직변권 진지하게 이번 한정적으로 뿌려야 합니다."라는 제목의 글에서는 직업 변경권에 대한 제안이 이루어졌습니다.
아이템 시세 정보 공유
"방금 확인한 어빌스톤 가격"이라는 제목의 글에서는 아이템 시세에 대한 정보가 공유되었습니다.
게임 내 정보 공유
"기본적인 인장 관련 설정 세팅"이라는 제목의 글에서는 게임 내 인장 설정에 대한 정보가 공유되었습니다.
"""
    })
print("댓글 번역 결과")
print('-' * 50)
print(result["translated"])