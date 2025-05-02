const { OpenAI } = require('openai');
require('dotenv').config({ path: '../.env' });

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function getChatGPTResponse(userInput) {
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "you are a highly skilled pianist." },
            // { role: "system", content: "you are a highly skilled software engineer." },
            { role: "user", content: userInput }
        ],
        temperature: 0.7
    });
    return response.choices[0].message.content;
}

async function chatWithUser() {
    const userInput = "안녕 챗봇. 나 이제 뭘 해볼까?";
    const response = await getChatGPTResponse(userInput);
    console.log("챗봇 응답 :", response); // ← 여기서 바로 처리
}

chatWithUser();