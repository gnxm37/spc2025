document.addEventListener('DOMContentLoaded', () => {
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
        const response = await fetch('/registerSubmit', {
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
            window.location.href = data.redirectUrl;
        }
    } catch (error) {
        console.error('회원가입 실패:', error);
    }
}