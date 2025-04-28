document.addEventListener('DOMContentLoaded', () => {
    profile();
});

async function profile() {
    let name = document.getElementById('name');
    let email = document.getElementById('email');

    const response = await fetch('/tweet/checkLogin', {
        method: 'GET'
    });
    
    const data = await response.json();
    if (response.ok) {
        name.innerHTML = `<strong>사용자 이름: </strong>${data.name}`;
        email.innerHTML = `<strong>이메일: </strong>${data.email}`;
    } else {
        console.log('로그인된 세션 정보가 없습니다.')
    }
}
