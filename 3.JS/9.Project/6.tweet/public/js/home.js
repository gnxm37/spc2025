document.addEventListener('DOMContentLoaded', () => {
    checkLogin();
});

async function checkLogin() {
    const loginSuccess = document.querySelector('.loginSuccess');
    const logoutSuccess = document.querySelector('.logoutSuccess');
    const login = document.querySelector('#login');
    const logout = document.querySelector('#logout');
    const register = document.querySelector('#register');
    const profile = document.querySelector('#profile');
    const tweet = document.querySelector('#tweet');

    const response = await fetch('/tweet/checkLogin', {
        method: 'GET',
    });
    const data = await response.json();
    
    if (response.status == 200) {
        // 로그인된 상태
        loginSuccess.style.display = 'block';
        login.style.display = 'none';
        register.style.display = 'none';
    } 
    else if (response.status == 401) {
        if (data.loggedOut) {
            // 로그아웃된 상태
            logoutSuccess.style.display = 'block';
            logout.style.display = 'none';
            profile.style.display = 'none';
            tweet.style.display = 'none';
        } else {
            // 세션 없음 상태
            logoutSuccess.style.display = 'none';
            logout.style.display = 'none';
            profile.style.display = 'none';
            tweet.style.display = 'none';
        }
    }
    else {
        // 서버 에러 또는 예상치 못한 상태
        logoutSuccess.style.display = 'block';
        logout.style.display = 'none';
        profile.style.display = 'none';
        tweet.style.display = 'none';
    }
}