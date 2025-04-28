let user = null;

document.addEventListener('DOMContentLoaded', async() => {
    const response = await fetch('/api/edit', {
        method: 'GET'
    });
    user = await response.json();

    buttons();

    document.getElementById('registerForm').addEventListener('submit', (event) => {
        event.preventDefault();
        register();
    })
})

async function register() {
    const name = document.getElementById('nameInput').value;
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
        },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        });
        const data = await response.json();
        
        if (response.ok) {
            alert('회원가입 완료');
            window.location.href = data.redirectUrl;
        }
    } catch (error) {
        console.error('회원가입 실패:', error);
    }
}

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