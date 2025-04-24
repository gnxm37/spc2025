document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('saveBtn').addEventListener('click', (e) => {
        e.preventDefault();
        memoSave();
    });
});

async function memoSave() {
    const title = document.getElementById('title').value;
    const textarea = document.getElementById('textarea').value;
    const fileInput = document.getElementById('fileInput');

    const file = fileInput.files[0];
    console.log(file.name);

    const write = document.querySelector('.memo-list');
    const memo = document.createElement('div');
    memo.classList.add('memo');

    // 제목과 내용
    const h5 = document.createElement('h5');
    h5.textContent = title;

    const h6 = document.createElement('h6');
    h6.textContent = textarea;

    const img = document.createElement('img');

    if (file) {
        const reader = new FileReader();

        reader.onload = function (event) {
            img.src = event.target.result;
            img.alt = `${file.name}`;
        };
        reader.readAsDataURL(file);
    } else {
        img.src = '';
    }

    // 버튼 그룹
    const btnGroup = document.createElement('div');
    btnGroup.className = 'btn-group';

    const editBtn = document.createElement('button');
    editBtn.textContent = '수정';
    editBtn.className = 'btn btn-info';
    editBtn.style.borderRadius = '5px';

    const delBtn = document.createElement('button');
    delBtn.textContent = '삭제';
    delBtn.className = 'btn btn-warning';
    delBtn.style.borderRadius = '5px';

    // 구성
    btnGroup.appendChild(editBtn);
    btnGroup.appendChild(delBtn);
    memo.appendChild(img);
    memo.appendChild(h5);
    memo.appendChild(h6);
    memo.appendChild(btnGroup);
    write.appendChild(memo);

    document.getElementById('title').value = "";
    document.getElementById('textarea').value = "";

    // 수정 이벤트
    editBtn.addEventListener('click', (e) => {
        e.preventDefault();

        btnGroup.removeChild(editBtn);
        btnGroup.removeChild(delBtn);
        memo.removeChild(img);
        memo.removeChild(h5);
        memo.removeChild(h6);
        memo.removeChild(btnGroup);

        const editTitle = document.createElement('input');
        editTitle.type = 'text';
        editTitle.placeholder = `${title}`;

        const editText = document.createElement('textarea');
        editText.placeholder = `${textarea}`;

        const fileInput = document.createElement('input');
        fileInput.type = "file";
        fileInput.placeholder = " 선택된 파일 없음";
        fileInput.id = "fileInput";
        fileInput.accept = "image/*";

        const label = document.createElement('label');
        label.className = 'form-check-label';
        label.style.marginBottom = '10px';

        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.className = 'form-check-input';
        checkBox.style.marginRight = '5px';

        label.appendChild(checkBox);
        label.appendChild(document.createTextNode('이미지 삭제'));

        const editSaveBtn = document.createElement('button');
        editSaveBtn.type = 'submit';
        editSaveBtn.textContent = '저장';
        editSaveBtn.className = 'btn btn-primary';
        editSaveBtn.style.borderRadius = '5px';

        memo.appendChild(editTitle);
        memo.appendChild(editText);
        memo.appendChild(fileInput);
        memo.appendChild(label);
        memo.appendChild(editSaveBtn);

        // 수정 이벤트 -> 저장 이벤트
        editSaveBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('저장버튼');

            memo.removeChild(editTitle);
            memo.removeChild(editText);
            memo.removeChild(fileInput);
            memo.removeChild(label);
            memo.removeChild(editSaveBtn);

            const h5 = document.createElement('h5');
            h5.textContent = editTitle.value;

            const h6 = document.createElement('h6');
            h6.textContent = editText.value;

            if(file) {
                const reader = new FileReader();

                reader.onload = function (event) {
                    img.src = event.target.result;
                    img.alt = `${file.name}`;
                };
                reader.readAsDataURL(file);
            } else {
                img.src = '';
            }

            const btnGroup = document.createElement('div');
            btnGroup.className = "btn-group";

            const editBtn = document.createElement('button');
            editBtn.textContent = '수정';
            editBtn.className = 'btn btn-info';
            editBtn.style.borderRadius = '5px';

            const delBtn = document.createElement('button');
            delBtn.textContent = '삭제';
            delBtn.className = 'btn btn-warning';
            delBtn.style.borderRadius = '5px';

            btnGroup.appendChild(editBtn);
            btnGroup.appendChild(delBtn);
            memo.appendChild(img);
            memo.appendChild(h5);
            memo.appendChild(h6);
            memo.appendChild(btnGroup);
            write.replaceChild(memo);

            alert('수정 완료')
        })
        console.log('에디트 버튼');
    });

    // 삭제 이벤트
    delBtn.addEventListener('click', () => {
        memo.remove();
        console.log('딜리트 버튼');
        alert('삭제 완료')
    });

    alert('저장 완료')
}