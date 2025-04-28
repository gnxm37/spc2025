async function logout() {
    const res = await fetch('/api/logout', { method: 'POST'} );
    const data = await res.json();

    if (res.ok) {
        alert(data.message);
    } else {
        alert(data.error);
    }
    window.location.href = '/index.html';
}

function showFlash(message, type='success') {
    const flashDiv = document.getElementById('flash-message');
    flashDiv.innerHTML = `
        <li class="${type}">${message}</li>
    `;
}

document.addEventListener('DOMContentLoaded', async() => {
    const usernameEdit = document.getElementById('usernameEdit');
    const emailEdit = document.getElementById('emailEdit');

    const response = await fetch('/api/edit', {
        method: 'GET'
    });
    const user = await response.json();
    usernameEdit.innerHTML = `
        <strong>사용자 이름 : </strong>${user.username}
        <strong>이메일 : </strong>${user.email}
    `;

})