const eventSource = new EventSource('/events');
const messagesDiv = document.getElementById('messages');
const closeButton = document.getElementById('closeButton');

function logMessage(message) {
    const p = document.createElement('p');
    p.textContent = message;
    messagesDiv.appendChild(p);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

eventSource.onmessage = function(event) {
    const data = JSON.parse(event.data);
    logMessage(`메시지 수신: ${JSON.stringify(data)}`);
    console.log('서버로부터 받은 데이터:', data);
}

eventSource.onopen = function() {
    logMessage('SSE 연결이 열렸습니다.');
    console.log('SSE 연결이 열렸습니다.');
};

eventSource.onerror = function(error) {
    logMessage('SSE 연결 오류 발생. 콘솔을 확인하세요.');
    console.error('SSE 연결 오류:', error);
}   

function closeConnection() {
    if (eventSource.readyState !== EventSource.CLOSED) {
        eventSource.close();
        logMessage('SSE 연결이 수동으로 종료되었습니다.');
        console.log('SSE 연결이 수동으로 종료되었습니다.');
    } else {
        logMessage('SSE 연결은 이미 닫혀 있습니다.');
        console.log('SSE 연결은 이미 닫혀 있습니다.');
    }
}

closeButton.addEventListener('click', closeConnection);

window.addEventListener('beforeunload', function() {
    closeConnection();
});