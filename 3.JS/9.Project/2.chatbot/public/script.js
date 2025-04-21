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

const API_SERVER = 'http://127.0.0.1:5000'

chatbotIcon.addEventListener('click', () => {
    chatbotIcon.style.display = 'none';
    chatbotWindow.style.display = 'flex';
});

closeChatbot.addEventListener('click', () => {
    chatbotIcon.style.display = 'flex';
    chatbotWindow.style.display = 'none';
});

function addMessage(message, sender='user') {
    // 화면에 내 메세지 추가한다.
    const myMessage = document.createElement('div');
    myMessage.innerHTML = sender + ": " + message;

    if (sender=="나"){
        myMessage.classList.add('myMessage');
        myMessage.innerHTML = `<i class="bi bi-person"></i>` + sender + ":" + message;
    }else{
        myMessage.classList.add('answer');
        myMessage.innerHTML = `<i class="bi bi-robot"></i>` + sender + ":" + message;
    }
    chatbotMessage.appendChild(myMessage);

    // 스크롤 내린다.
    chatbotMessage.scrollTop = chatbotMessage.scrollHeight;
}

async function sendMessageToServer(){
    const question = chatbotInput.value;
    
    chatbotInput.value = "";
    addMessage(question, '나');

    const resp = await fetch(`${API_SERVER}/api/chat`, {
        method: 'POST',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({question})
    })

    const result = await resp.json();

    addMessage(result.question, '챗봇');
}


sendMessage.addEventListener('click', () => {
   sendMessageToServer();
});

chatbotInput.addEventListener('keypress', (event) => {
    if(event.key == 'Enter'){
        sendMessageToServer();
    }
});
