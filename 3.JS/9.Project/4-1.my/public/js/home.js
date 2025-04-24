// HTML만 로드 되면 실행
document.addEventListener('DOMContentLoaded', () => {
    // 로그인 한 적이 있는지
    checkLoginStatus();
    document.getElementById('login').addEventListener('click', (e) => {
        e.preventDefault();
        login();
    })

    document.getElementById('logout').addEventListener('click', (e) => {
        e.preventDefault();
        logout();
    })
})

async function checkLoginStatus() {
    const response = await fetch('/api/check-login');
    if (response.status === 200) {
        const data = await response.json();
        showProfile(data.username);
    } else {
        const data = await response.json();
        console.log(data);
        showLoginForm();
    }
}

async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })

    if (response.status == 200) {
        const data = await response.json();
        showProfile(data.username);
    } else {
        console.log('response 받아오기 실패')
    }
}

async function logout() {
    const response = await fetch('/api/logout');
    if (response.status === 200) {
        showLoginForm(); // 로그아웃 후 로그인 폼 보여주기
        document.getElementById('username').value = "";
        document.getElementById('password').value = "";
    }
}

function showProfile(username) {
    document.getElementById('name').textContent = username;
    document.getElementById('usernameSpan').textContent = username;
    document.getElementById('profile').style.display = 'block';
    document.getElementById('loginFormContainer').style.display = 'none';
    document.getElementById('user-info').style.display = 'flex';
}

function showLoginForm() {
    document.getElementById('profile').style.display = 'none';
    document.getElementById('loginFormContainer').style.display = 'block';
    document.getElementById('user-info').style.display = 'none';
}