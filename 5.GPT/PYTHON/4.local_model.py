from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
from dotenv import load_dotenv
import os

# .env 파일 로드
load_dotenv(dotenv_path='../.env')

# 환경변수에서 Hugging Face 토큰 불러오기
token = os.getenv("HUGGINGFACE_TOKEN")

# 모델 이름
model_name = "mistralai/Mistral-7B-Instruct-v0.3"

# Hugging Face 모델 다운로드 및 파이프라인 설정
tokenizer = AutoTokenizer.from_pretrained(model_name, use_auth_token=token)
model = AutoModelForCausalLM.from_pretrained(model_name, torch_dtype="auto", use_auth_token=token)

# 텍스트 생성 파이프라인
generator = pipeline("text-generation", model=model, tokenizer=tokenizer)

# 프롬프트 설정
prompt = "What are good fitness tips?"

# 출력 생성
outputs = generator(prompt)

# 출력 결과
print(outputs[0]['generated_text'])
