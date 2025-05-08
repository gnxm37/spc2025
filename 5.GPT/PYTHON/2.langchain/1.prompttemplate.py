from langchain_core.prompts import PromptTemplate

# "회사 이름을 작명하고 싶어. 나의 회사는 아케이드 게임을 만드는 회사야."

template = "회사 이름을 작명하고 싶어. 나의 회사는 {product} 만드는 회사야."
prompt = PromptTemplate(
    template=template, 
    input_variables=["product"]
)

final_prompt = prompt.format(product="아케이드 게임")
print("최종 프롬프트 결과 :", final_prompt) # 회사 이름을 작명하고 싶어. 나의 회사는 아케이드 게임 만드는 회사야.

print('-' * 50)

test_products = [
    "모바일 게임", 
    "로봇 장난감", 
    "인터넷 전자상거래",
    "수능 학습집"
]

for product in test_products:
    result = prompt.format(product=product)
    print(f"[{product}] {result}\n") 
