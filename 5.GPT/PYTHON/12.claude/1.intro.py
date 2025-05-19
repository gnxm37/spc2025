import os 
import anthropic
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("ANTHROPIC_API_KEY")

# client = openai 등등 했던 것 처럼..
client = anthropic.Anthropic(api_key=api_key)

message = client.messages.create(
    model="claude-3-7-sonnet-20250219",
    max_tokens=1000,
    temperature=1.0,
    messages=[
        {
            "role": "user",
            "content": "나는 웹툰작가야. 아무 스토리나 만들어줘."
        }
    ]
)

print(message.content[0].text)