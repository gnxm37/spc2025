async function logout() {
    const res = await fetch('/api/logout', { method: 'POST' });
    const data = await res.json();

    if (res.ok) {
        alert(data.message);
    } else {
        alert(data.error);
    }
    window.location.href = '/index.html';
}

function showFlash(message, type = 'success') {
    const flashDiv = document.getElementById('flash-message');
    flashDiv.innerHTML = `
        <li class="${type}">${message}</li>
    `;
}

document.addEventListener('DOMContentLoaded', async () => {
    const userinfoDiv = document.getElementById('userinfoDiv');

    const response = await fetch('/api/edit', {
        method: 'GET'
    });
    const user = await response.json();
    userinfoDiv.innerHTML = `
        <h2>프로필</h2>
        <p id="userinfoEdit">        
        <strong>사용자 이름 : </strong>${user.username}
        <br><br>
        <strong>이메일 : </strong>${user.email}
        </p>
        <a href="#" onclick="edit()">프로필 수정</a>
    `;
})

async function edit() {
    const userinfoDiv = document.getElementById('userinfoDiv');
    userinfoDiv.innerHTML = '';

    const response = await fetch('/api/edit', {
        method: 'GET'
    });
    const user = await response.json();

    userinfoDiv.innerHTML = `
        <h2>프로필 편집</h2>
        <form>
            <label class="form-label" for="username">사용자 이름</label>
            <input class="form-control" id="username" name="username" required="" type="text" value=${user.username}>
            <br>
            <label class="form-label" for="email">이메일</label>
            <input class="form-control" id="email" name="email" required="" type="text" value=${user.email}><br>
            <button type="submit" onclick="save(event)">저장</button>
        </form>
    `;
};

async function save(event) {
    event.preventDefault();

    const res = await fetch('/api/edit', {
        method: 'GET'
    });
    const originaluser = await res.json();

    const userinfoDiv = document.getElementById('userinfoDiv');
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;

    const response = await fetch('/api/editDB', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ 
            username : username, 
            email : email,
            originaluser : originaluser
        })
    });
    const user = await response.json();

    userinfoDiv.innerHTML = `
        <h2>프로필</h2>
        <p id="userinfoEdit">
        <strong>사용자 이름 : </strong>${user.username}
        <br><br>
        <strong>이메일 : </strong>${user.email}
        </p>
        <a href="#" onclick="edit()">프로필 수정</a>
    `;
}