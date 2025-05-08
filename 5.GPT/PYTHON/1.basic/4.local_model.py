from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
from dotenv import load_dotenv
import os

# .env 파일 로드
load_dotenv(dotenv_path='../.env')

# 환경변수에서 Hugging Face 토큰 불러오기
token = os.getenv("HUGGINGFACE_TOKEN")

# 모델 이름
model_name = "gpt2"

# Hugging Face 모델 다운로드 및 파이프라인 설정
tokenizer = AutoTokenizer.from_pretrained(model_name, use_auth_token=token)
model = AutoModelForCausalLM.from_pretrained(model_name, torch_dtype="auto", use_auth_token=token)

# 텍스트 생성 파이프라인
generator = pipeline(
    "text-generation", 
    model=model, 
    tokenizer=tokenizer,
    temperature=0.7, # 답변의 창의성 (확률 분포로 좀 더 넓은 범위)
    max_new_tokens=128, # 출력 토큰의 길이
    pad_token_id=tokenizer.eos_token_id, # 패딩 토큰 ID 설정
    do_sample=True, # 샘플링 여부
    top_k=50, # 상위 k개 단어 중에서 샘플링
    top_p=0.95, # 누적 확률이 p 이하인 단어들 중에서 샘플링
    repetition_penalty=1.2, # 반복 단어에 대한 패널티
    no_repeat_ngram_size=3, # n-그램 반복 방지
)

# 프롬프트 설정
prompt = "What are good fitness tips?"

# 출력 생성
outputs = generator(prompt)

# 출력 결과
print(outputs[0]['generated_text'])
