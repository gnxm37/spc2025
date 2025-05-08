from dotenv import load_dotenv
from huggingface_hub import InferenceClient
import os

load_dotenv(dotenv_path='../.env')
hf_token = os.getenv("HUGGINGFACE_TOKEN")

client = InferenceClient(model="mistralai/Mistral-7B-Instruct-v0.3", token=hf_token)
prompt = '너 한국말 할 줄 알아?'
response = client.text_generation(prompt)
print(response)