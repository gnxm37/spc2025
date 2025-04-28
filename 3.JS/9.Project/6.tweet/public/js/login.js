document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginForm').addEventListener('submit', (event) =>{
        event.preventDefault();
        login();
    })
})

async function login() {
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;

    try {
        const response = await fetch('/loginSubmit', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({ 
                email : email,
                password : password
            })
        });
        const data = await response.json();

        if(response.ok){
            window.location.href = data.redirectUrl;
        }
    } catch (error) {
        console.error('로그인 실패:', error);
    }
}