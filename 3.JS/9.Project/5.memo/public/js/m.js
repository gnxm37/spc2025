document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('saveBtn').addEventListener('click', (e) => {
        e.preventDefault();
        memoSave();
    });
});

async function memoSave() {
    const title = document.getElementById('title').value;
    const textarea = document.getElementById('textarea').value;

    const write = document.querySelector('.memo-list');
    const memo = document.createElement('div');
    memo.classList.add('memo');

    let h5 = document.createElement('h5');
    h5.textContent = title;

    let h6 = document.createElement('h6');
    h6.textContent = textarea;

    const btnGroup = document.createElement('div');
    btnGroup.className = 'btn-group';

    let editBtn = createEditButton();
    let delBtn = createDeleteButton();

    btnGroup.appendChild(editBtn);
    btnGroup.appendChild(delBtn);

    memo.appendChild(h5);
    memo.appendChild(h6);
    memo.appendChild(btnGroup);
    write.appendChild(memo);

    document.getElementById('title').value = "";
    document.getElementById('textarea').value = "";

    function createEditButton() {
        const btn = document.createElement('button');
        btn.textContent = '수정';
        btn.className = 'btn btn-info';
        btn.style.borderRadius = '5px';

        btn.addEventListener('click', (e) => {
            e.preventDefault();

            // 기존 내용 제거
            memo.innerHTML = '';

            const editTitle = document.createElement('input');
            editTitle.type = 'text';
            editTitle.value = h5.textContent;

            const editText = document.createElement('textarea');
            editText.value = h6.textContent;

            const saveBtn = document.createElement('button');
            saveBtn.textContent = '저장';
            saveBtn.className = 'btn btn-primary';
            saveBtn.style.borderRadius = '5px';

            memo.appendChild(editTitle);
            memo.appendChild(editText);
            memo.appendChild(saveBtn);

            saveBtn.addEventListener('click', (e) => {
                e.preventDefault();

                h5 = document.createElement('h5');
                h5.textContent = editTitle.value;

                h6 = document.createElement('h6');
                h6.textContent = editText.value;

                editBtn = createEditButton(); // 재바인딩
                delBtn = createDeleteButton();

                btnGroup.innerHTML = '';
                btnGroup.appendChild(editBtn);
                btnGroup.appendChild(delBtn);

                memo.innerHTML = '';
                memo.appendChild(h5);
                memo.appendChild(h6);
                memo.appendChild(btnGroup);

                alert('수정 완료');
            });
        });

        return btn;
    }

    function createDeleteButton() {
        const btn = document.createElement('button');
        btn.textContent = '삭제';
        btn.className = 'btn btn-warning';
        btn.style.borderRadius = '5px';

        btn.addEventListener('click', () => {
            memo.remove();
            alert('삭제 완료');
        });

        return btn;
    }

    alert('저장 완료');
}
