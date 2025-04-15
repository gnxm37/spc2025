document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const usernicknameInput = document.getElementById('usernicknameInput');
    const usernameInput = document.getElementById('usernameInput');
    const ageInput = document.getElementById('ageInput');
    const userTable = document.getElementById('userTable');

    updateTable();
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const usernickname = usernicknameInput.value;
        const username = usernameInput.value;
        const age = ageInput.value;

        fetch('/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({usernickname, username, age})
        })

        usernicknameInput.value='';
        usernameInput.value='';
        ageInput.value='';

        updateTable();
    });

    function createButton(text, clickHandler){
        const button = document.createElement('button');
        button.textContent = text;
        button.addEventListener('click', clickHandler);
        return button;
    }

    function updateTable(){
        userTable.innerHTML = "";

        fetch('/users')
            .then(res => res.json())
            .then(users => {
                for (const key in users) {
                    const row = document.createElement('div');
                    row.innerHTML = `
                        <strong>ID:</strong> ${key},
                        <strong>닉네임:</strong> ${users[key].usernickname}
                        <strong>이름:</strong> ${users[key].username}
                        <strong>나이:</strong> ${users[key].age}
                    `

                    // 버튼 만들기 함수 호출
                    row.appendChild(createButton('수정', () => editUser(key)));
                    row.appendChild(createButton('삭제', () => deleteUser(key)));

                    userTable.appendChild(row);
                }
            })
    }

    function editUser(userId) {
        const newName = prompt('수정할 이름을 입력하세요.');
        // 코드를 구현해볼것... PUT 을 어떻게 부를것인가??
        fetch(`/users/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                username: newName
            })
        })
            .then(res => { // 나머지 모든 부분에서도 이런식으로 에러처리를 해야 좋음.
                if (!res.ok) throw new Error('수정 실패');
                alert('수정 성공');
                updateTable();
            })
            .catch(error => {
                alert('수정 중 오류 발생');
            });
    }

    function deleteUser(userId) {
        const confirmDelete = confirm('정말로 삭제하시겠습니까?');
        if (confirmDelete) {
            fetch(`/users/${userId}`, {
                method: 'DELETE'
            })
                .then(res => {
                    if (!res.ok) throw new Error('삭제 실패');
                    updateTable();
                    alert('삭제 성공');
                })
                .catch(error => {
                    console.error('삭제 중 오류 발생: ', error);
                    alert('삭제 중 오류 발생');
                })

        } else {
            alert('장난치지 마시오...');
        }
    }

});