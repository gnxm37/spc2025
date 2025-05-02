const express = require('express');
const morgan = require('morgan');
const { OpenAI } = require('openai');
const port = 3000;

require('dotenv').config({ path: '../../.env' });

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const app = express();

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());

app.post('/api/chat', async (req, res) => {
    const question = req.body.question;
    console.log(question);

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "you are a cook." },
            { role: "user", content: question }
        ],
        temperature: 0.7
    });
    console.log(response.choices[0].message.content);
    return res.json(response.choices[0].message.content);
});

app.get('/api/sendQuestionStream', async (req, res) => {
    const question = req.body.question;

    res.setHeader('Content-Type', 'text/event-stream');

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "you are a cook." },
                { role: "user", content: question}
            ],
            temperature: 0.7,
            stream: true
        });
        for await (const chunk of response) {
            const content = chunk.choices[0].delta.content || '';
            if (content) {
                res.write(`data: ${content}`);
            }
        }
        res.write('data: [DONE]');
        res.end();
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }

});

app.listen(port, () => {
    console.log(`${port} 포트가 레디`);
})