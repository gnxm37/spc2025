const axios = require('axios');
require('dotenv').config({ path: '../.env' });

const openaiApiKey = process.env.OPENAI_API_KEY;

const url = 'https://api.openai.com/v1/chat/completions';

async function getChatGPTResponse() {
    try {
        const response = await axios.post(url, {
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "you are a cook." },
                { role: "user", content: "요즘 날씨에 맞는 음식 추천해줘. 세문장으로 각각 1.2.3.으로 답변해줘" }
            ],
            temperature: 0.1,   // 상상력 
            top_p: 0.9,   // 확률 기반 토큰 선택 범위
            frequency_penalty: 0.5,  // 자주 등장하는 단어에 대한 패널티
            presence_penalty: 0.6,  // 새로운 단어 등장에 대한 패널티
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${openaiApiKey}`
            }
        });

        console.log(response.data.choices[0].message.content); // ← 여기서 바로 처리
    } catch (err) {
        console.error('에러 발생:', err.response?.data || err.message);
    }
}

getChatGPTResponse(); // 반환값을 굳이 안 받음
