// 미션1. 저 영역을 클릭해서 창이 나오게 한다
// 미션2. x박스를 눌러서 다시 창이 닫히게 한다.
// 미션3. send버튼을 통해서 BE로 사용자가 입력한 대화 내용을 전송.
// 미션4. 받아온 응답을 대화창에 출력
const chatbotIcon = document.getElementById('chatbotIcon');
const chatbotWindow = document.getElementById('chatbotWindow');
const closeChatbot = document.getElementById('closeChatbot');
const sendMessage = document.getElementById('sendMessage');
const chatbotInput = document. getElementById('chatbotInput');
const chatbotMessage = document.getElementById('chatbotMessage');

chatbotIcon.addEventListener('click', () => {
    chatbotWindow.style.display = 'block';
});

closeChatbot.addEventListener('click', () => {
    chatbotWindow.style.display = 'none';
});

async function sendMessageToServer(){
    const question = chatbotInput.value;
    const myMessage = document.createElement('div');
    myMessage.classList.add('myMessage');
    myMessage.innerHTML = `<i class="bi bi-person"></i>` + "나:" + question;
    chatbotMessage.appendChild(myMessage);


    const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({"question":question})
    })

    const result = await resp.json();
    const answer = document.createElement('div');
    answer.innerHTML = `<i class="bi bi-robot"></i>`+"Echo:" + result.question;
    answer.classList.add('answer');
    chatbotMessage.appendChild(answer);
    chatbotMessage.scrollTop = chatbotMessage.scrollHeight;
    chatbotInput.value = "";
}

sendMessage.addEventListener('click', () => {
   sendMessageToServer();
});

chatbotInput.addEventListener('keypress', (event) => {
    if(event.key == 'Enter'){
        sendMessageToServer();
    }
});
