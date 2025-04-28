let user = null;
let count = 0;
document.addEventListener('DOMContentLoaded', async () => {
    const userinfoDiv = document.getElementById('userinfoDiv');

    const response = await fetch('/api/edit', {
        method: 'GET'
    });
    user = await response.json();

    if (count == 0){
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
    buttons();
});

function showFlash(message, type = 'success') {
    const flashDiv = document.getElementById('flash-message');
    flashDiv.innerHTML = `
        <li class="${type}">${message}</li>
    `;
};

async function logout() {
    const res = await fetch('/api/logout', { method: 'POST' });
    const data = await res.json();

    if (res.ok) {
        alert(data.message);
    } else {
        alert(data.error);
    }
    window.location.href = '/index.html';
};


async function edit() {
    const userinfoDiv = document.getElementById('userinfoDiv');
    userinfoDiv.innerHTML = '';

    const response = await fetch('/api/edit', {
        method: 'GET'
    });
    user = await response.json();

    if(response.ok) {
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
    } else {
        alert('로그인을 하세요');
        window.location.href = '/index.html';
    }

};

async function save(event) {
    count = 1;
    event.preventDefault();
    const res = await fetch('/api/edit', {
        method: 'GET'
    });
    const originaluser = await res.json();
    
    const userinfoDiv = document.getElementById('userinfoDiv');
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    userinfoDiv.innerHTML = "";
    
    const response = await fetch('/api/editDB', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ 
            username : username, 
            email : email,
            originaluser : originaluser
        })
    });
    
    user = await response.json();

    if (response.ok) {
        // 프로필 갱신 후 바로 업데이트
        userinfoDiv.innerHTML = `
            <h2>프로필</h2>
            <p id="userinfoEdit">
                <strong>사용자 이름 : </strong>${user.username}
                <br><br>
                <strong>이메일 : </strong>${user.email}
            </p>
            <a href="#" onclick="edit()">프로필 수정</a>
        `;
    } else {
        alert('프로필 수정 실패');
    }

};

async function buttons() {
    const login = document.getElementById('login');
    const logout = document.getElementById('logout');
    const profile = document.getElementById('profile');
    const tweet = document.getElementById('tweet');
    const register = document.getElementById('register');
    
    if (user && user.username) {
        logout.style.display = 'inline-block';  // 'inline-block'으로 설정하여 가로 정렬
        profile.style.display = 'inline-block';
        tweet.style.display = 'inline-block';
        login.style.display = 'none';
        register.style.display = 'none';
    } else {
        login.style.display = 'inline-block';
        register.style.display = 'inline-block';
        logout.style.display = 'none';
        profile.style.display = 'none';
        tweet.style.display = 'none';
    }
}