const express = require('express');
const axios = require('axios');
const router = express.Router();
const database = require('../models/database'); // 투두리스트 데이터베이스 연결
require('dotenv').config();

// OpenAI API 설정
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

// Routes
router.post('/', async (req, res) => {
    const { question } = req.body;

    // 요청 데이터 검증
    if (!question) {
        return res.status(400).json({ error: 'Question is required' });
    }

    try {
        // 투두리스트 데이터 가져오기
        const todos = await database.getAllTodos();
        const todoList = todos.map((todo, index) => `${index + 1}. ${todo.title} (${todo.completed ? '완료' : '미완료'})`).join('\n');

        // "1번을 삭제해줘"와 같은 명령 처리
        const deleteMatch = question.match(/(\d+)번.*지워/) || question.match(/(\d+)번.*삭제/) || question.match(/(\d+)번.*없/) || question.match(/(\d+)번.*제거/) || question.match(/(\d+)번.*빼/) || question.match(/(\d+)번.*없애/) || question.match(/(\d+)번.*삭제해/) || question.match(/(\d+)번.*지워줘/) || question.match(/(\d+)번.*제거해/) || question.match(/(\d+)번.*빼줘/) || question.match(/(\d+)번.*없애줘/) || question.match(/(\d+)번.*삭제해주세요/) || question.match(/(\d+)번.*지워주세요/) || question.match(/(\d+)번.*제거해주세요/) || question.match(/(\d+)번.*빼주세요/) || question.match(/(\d+)번.*없애주세요/);
        if (deleteMatch) {
            const indexToDelete = parseInt(deleteMatch[1], 10) - 1; // 1번 기반 인덱스를 0번 기반으로 변환
            if (indexToDelete >= 0 && indexToDelete < todos.length) {
                const todoToDelete = todos[indexToDelete];
                await database.deleteTodo(todoToDelete.id); // 데이터베이스에서 삭제
                return res.json({ answer: `${deleteMatch[1]}번 항목이 삭제되었습니다.` });
            } else {
                return res.json({ answer: '해당 번호의 항목이 존재하지 않습니다.' });
            }
        }

        // "청소하기를 삭제해줘"와 같은 명령 처리
        const removeMatch = question.match(/(.+?)를 삭제/) || question.match(/(.+?)을 삭제/) || question.match(/(.+?)을 지워/) || question.match(/(.+?)를 지워/) || question.match(/(.+?)을 제거/) || question.match(/(.+?)를 제거/) || question.match(/(.+?)을 빼/) || question.match(/(.+?)를 빼/) || question.match(/(.+?)을 없애/) || question.match(/(.+?)를 없애/) || question.match(/(.+?)을 삭제해/) || question.match(/(.+?)를 삭제해/) || question.match(/(.+?)을 지워줘/) || question.match(/(.+?)를 지워줘/) || question.match(/(.+?)을 제거해/) || question.match(/(.+?)를 제거해/) || question.match(/(.+?)을 빼줘/) || question.match(/(.+?)를 빼줘/) || question.match(/(.+?)을 없애줘/) || question.match(/(.+?)를 없애줘/) || question.match(/(.+?)을 삭제해주세요/) || question.match(/(.+?)를 삭제해주세요/);
        if (removeMatch) {
            const todoToRemove = removeMatch[1].trim(); // 삭제할 항목의 제목 추출
            const todoToDelete = todos.find(todo => todo.title === todoToRemove);
            if (todoToDelete) {
                await database.deleteTodo(todoToDelete.id); // 데이터베이스에서 삭제
                return res.json({ answer: `"${todoToRemove}" 항목이 삭제되었습니다.` });
            } else {
                return res.json({ answer: '해당 항목이 존재하지 않습니다.' });
            }
        }

        // "청소하기를 추가해줘"와 같은 명령 처리
        const addMatch = question.match(/(.+?)를 추가/) || question.match(/(.+?)을 추가/);
        if (addMatch) {
            const newTodoTitle = addMatch[1].trim(); // 추가할 항목의 제목 추출
            await database.createTodo(newTodoTitle); // 데이터베이스에 새 항목 추가
            return res.json({ answer: `"${newTodoTitle}" 항목이 추가되었습니다.` });
        }

        // "청소하기를 빨래널기로 수정해줘"와 같은 명령 처리
        const editMatch = question.match(/(.+?)를 수정/) || question.match(/(.+?)을 수정/) || question.match(/(.+?) 수정/) || question.match(/(.+?)을 바꿔/) || question.match(/(.+?)를 바꿔/) || question.match(/(.+?)을 변경/) || question.match(/(.+?)를 변경/) || question.match(/(.+?)을 고쳐/) || question.match(/(.+?)를 고쳐/) || question.match(/(.+?)을 수정해/) || question.match(/(.+?)를 수정해/) || question.match(/(.+?)을 바꿔줘/) || question.match(/(.+?)를 바꿔줘/) || question.match(/(.+?)을 변경해/) || question.match(/(.+?)를 변경해/) || question.match(/(.+?)을 고쳐줘/) || question.match(/(.+?)를 고쳐줘/) || question.match(/(.+?)을 수정해주세요/) || question.match(/(.+?)를 수정해주세요/);
        if (editMatch) {
            const todoToEdit = editMatch[1].trim(); // 수정할 항목의 제목 추출
            const todoToUpdate = todos.find(todo => todo.title === todoToEdit);
            if (todoToUpdate) {
                const newTodoTitle = question.replace(/(.+?)을 수정해|(.+?)를 수정해|(.+?)을 바꿔|(.+?)를 바꿔|(.+?)을 변경해|(.+?)를 변경해|(.+?)을 고쳐|(.+?)를 고쳐/, '').trim(); // 새 제목 추출
                await database.updateTodo(todoToUpdate.id, newTodoTitle); // 데이터베이스에서 수정
                return res.json({ answer: `"${todoToEdit}" 항목이 "${newTodoTitle}"로 수정되었습니다.` });
            } else {
                return res.json({ answer: '해당 항목이 존재하지 않습니다.' });
            }
        }
        // "청소하기를 완료로 수정해줘"와 같은 명령 처리
        const completeMatch = question.match(/(.+?)를 완료/) || question.match(/(.+?)을 완료/) || question.match(/(.+?) 완료/) || question.match(/(.+?)을 끝내/) || question.match(/(.+?)를 끝내/) || question.match(/(.+?)을 마무리/) || question.match(/(.+?)를 마무리/) || question.match(/(.+?)을 완료해/) || question.match(/(.+?)를 완료해/) || question.match(/(.+?)을 끝내줘/) || question.match(/(.+?)를 끝내줘/) || question.match(/(.+?)을 마무리해/) || question.match(/(.+?)를 마무리해/) || question.match(/(.+?)을 완료해주세요/) || question.match(/(.+?)를 완료해주세요/);
        if (completeMatch) {
            const todoToComplete = completeMatch[1].trim(); // 완료할 항목의 제목 추출
            const todoToUpdate = todos.find(todo => todo.title === todoToComplete);
            if (todoToUpdate) {
                await database.updateTodo(todoToUpdate.id, true); // 데이터베이스에서 완료로 수정
                return res.json({ answer: `"${todoToComplete}" 항목이 완료되었습니다.` });
            } else {
                return res.json({ answer: '해당 항목이 존재하지 않습니다.' });
            }
        }

        // "청소하기를 미완료로 수정해줘"와 같은 명령 처리
        const incompleteMatch = question.match(/(.+?)를 미완료/) || question.match(/(.+?)을 미완료/) || question.match(/(.+?) 미완료/) || question.match(/(.+?)을 끝내지/) || question.match(/(.+?)를 끝내지/) || question.match(/(.+?)을 마무리하지/) || question.match(/(.+?)를 마무리하지/) || question.match(/(.+?)을 미완료해/) || question.match(/(.+?)를 미완료해/) || question.match(/(.+?)을 끝내지 않아/) || question.match(/(.+?)를 끝내지 않아/) || question.match(/(.+?)을 마무리하지 않아/) || question.match(/(.+?)를 마무리하지 않아/) || question.match(/(.+?)을 미완료해주세요/) || question.match(/(.+?)를 미완료해주세요/);
        if (incompleteMatch) {
            const todoToIncomplete = incompleteMatch[1].trim(); // 미완료할 항목의 제목 추출
            const todoToUpdate = todos.find(todo => todo.title === todoToIncomplete);
            if (todoToUpdate) {
                await database.updateTodo(todoToUpdate.id, false); // 데이터베이스에서 미완료로 수정
                return res.json({ answer: `"${todoToIncomplete}" 항목이 미완료되었습니다.` });
            } else {
                return res.json({ answer: '해당 항목이 존재하지 않습니다.' });
            }
        }

        // "1번 완료로 해줘"와 같은 명령 처리
        const numberCompleteMatch = question.match(/(\d+)번.*완료/) || question.match(/(\d+)번.*끝내/) || question.match(/(\d+)번.*마무리/) || question.match(/(\d+)번.*완료해/) || question.match(/(\d+)번.*끝내줘/) || question.match(/(\d+)번.*마무리해/) || question.match(/(\d+)번.*완료해주세요/) || question.match(/(\d+)번.*끝내주세요/) || question.match(/(\d+)번.*마무리해주세요/);
        if (numberCompleteMatch) {
            const indexToComplete = parseInt(numberCompleteMatch[1], 10) - 1; // 1번 기반 인덱스를 0번 기반으로 변환
            if (indexToComplete >= 0 && indexToComplete < todos.length) {
                const todoToUpdate = todos[indexToComplete];
                await database.updateTodo(todoToUpdate.id, true); // 데이터베이스에서 완료로 수정
                return res.json({ answer: `${numberCompleteMatch[1]}번 항목이 완료되었습니다.` });
            } else {
                return res.json({ answer: '해당 번호의 항목이 존재하지 않습니다.' });
            }
        }

        if (question.match(/^완료한 항목 보여줘$/) ||
            question.match(/^완료된 항목 보여줘$/)) {
            const completedTodos = todos.filter(todo => todo.completed);
            if (completedTodos.length > 0) {
                const list = completedTodos.map((todo, idx) => `${idx + 1}. ${todo.title}`).join('\n');
                return res.json({ answer: `완료한 항목입니다:\n\n${list}\n\n` });
            } else {
                return res.json({ answer: '완료한 항목이 없습니다.' });
            }
        }

        // "미완료한 항목 보여줘"와 같은 명령 처리
        if (question.match(/^미완료한 항목 보여줘$/) ||
            question.match(/^미완료된 항목 보여줘$/)) {
            const incompleteTodos = todos.filter(todo => !todo.completed);
            if (incompleteTodos.length > 0) {
                const list = incompleteTodos.map((todo, idx) => `${idx + 1}. ${todo.title}`).join('\n');
                return res.json({ answer: `미완료한 항목입니다:\n\n${list}\n\n` });
            } else {
                return res.json({ answer: '미완료한 항목이 없습니다.' });
            }
        }

        // OpenAI API 호출
        const response = await axios.post(
            OPENAI_API_URL,
            {
                model: 'gpt-4',
                messages: [
                    { role: 'system', content: '너는 투두리스트에 대응하는 챗봇입니다. 아래는 현재 투두리스트입니다:\n' + todoList },
                    { role: 'user', content: question }
                ],
                temperature: 0.2,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                },
            }
        );

        // 응답 처리
        if (response.data && response.data.choices && response.data.choices.length > 0) {
            const reply = response.data.choices[0].message.content.trim();
            return res.json({ answer: reply });
        } else {
            return res.status(500).json({ error: 'No response from ChatGPT' });
        }
    } catch (error) {
        console.error('Error communicating with OpenAI:', error.message || error);
        return res.status(500).json({ error: 'Failed to get response from ChatGPT' });
    }
});

module.exports = router;
