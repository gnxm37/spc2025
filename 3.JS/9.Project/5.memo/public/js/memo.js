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

    const write = document.querySelector('.memo-list');
    const memo = document.createElement('div');
    memo.classList.add('memo');

    const h5 = document.createElement('h5');
    h5.textContent = title;

    const h6 = document.createElement('h6');
    h6.textContent = textarea;

    const img = document.createElement('img');
    let imgSrc = '';

    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            img.src = event.target.result;
            img.alt = `${file.name}`;
            imgSrc = img.src;
            img.dataset.filename = file.name; // 이미지 파일명을 저장
        };
        reader.readAsDataURL(file);
    }

    memo.appendChild(img);
    memo.appendChild(h5);
    memo.appendChild(h6);

    attachEditAndDeleteEvents(memo, title, textarea, imgSrc);
    write.appendChild(memo);

    document.getElementById('title').value = "";
    document.getElementById('textarea').value = "";
    document.getElementById('fileInput').value = "";

    alert('저장 완료');
}

function attachEditAndDeleteEvents(memo, originalTitle, originalText, originalImgSrc) {
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

    btnGroup.appendChild(editBtn);
    btnGroup.appendChild(delBtn);
    memo.appendChild(btnGroup);

    editBtn.addEventListener('click', () => {
        const currentTitle = memo.querySelector('h5')?.textContent || originalTitle;
        const currentText = memo.querySelector('h6')?.textContent || originalText;
        const currentImg = memo.querySelector('img')?.src || originalImgSrc;
        const imageFilename = memo.querySelector('img')?.dataset.filename || ''; // 이미지 파일명 가져오기

        memo.innerHTML = '';

        const editTitle = document.createElement('input');
        editTitle.type = 'text';
        editTitle.value = currentTitle;

        const editText = document.createElement('textarea');
        editText.value = currentText;

        const editfileInput = document.createElement('input');
        editfileInput.type = "file";
        editfileInput.accept = "image/*";

        const label = document.createElement('label');
        label.className = 'form-check-label';
        label.style.marginBottom = '10px';

        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.className = 'form-check-input';
        checkBox.style.marginRight = '5px';

        label.appendChild(checkBox);
        label.appendChild(document.createTextNode('이미지 삭제'));

        const saveBtn = document.createElement('button');
        saveBtn.textContent = '저장';
        saveBtn.className = 'btn btn-primary';
        saveBtn.style.borderRadius = '5px';

        memo.appendChild(editTitle);
        memo.appendChild(editText);
        memo.appendChild(editfileInput);
        memo.appendChild(label);
        memo.appendChild(saveBtn);

        saveBtn.addEventListener('click', async() => {
            const newTitle = editTitle.value;
            const newText = editText.value;
            const newFile = editfileInput.files[0];
            const isDeleteImage = checkBox.checked;

            memo.innerHTML = '';

            const h5 = document.createElement('h5');
            h5.textContent = newTitle;

            const h6 = document.createElement('h6');
            h6.textContent = newText;

            const newImg = document.createElement('img');
            let finalImgSrc = '';

            if (newFile && !isDeleteImage) {
                const reader = new FileReader();
                reader.onload = function (event) {
                    newImg.src = event.target.result;
                    finalImgSrc = newImg.src;
                    memo.insertBefore(newImg, memo.firstChild);
                };
                reader.readAsDataURL(newFile);
            } else if (!isDeleteImage && currentImg) {
                newImg.src = currentImg;
                finalImgSrc = currentImg;
                memo.insertBefore(newImg, memo.firstChild);
            } else if (isDeleteImage && currentImg) {
                const imageFilename = memo.querySelector('img')?.dataset.filename;

                if (imageFilename) {
                    const response = await fetch(`/image/${imageFilename}`, {
                        method: 'DELETE'
                    });

                    if (response.ok) {
                        console.log('서버 이미지 삭제 성공');
                    } else {
                        console.error('서버에서 이미지 삭제 실패');
                    }
                }

                memo.querySelector('img')?.remove(); // 클라이언트에서 이미지 제거
                finalImgSrc = ''; // 이미지 경로 초기화
            }

            memo.appendChild(h5);
            memo.appendChild(h6);

            attachEditAndDeleteEvents(memo, newTitle, newText, finalImgSrc);
            alert('수정 완료');
        });
    });

    delBtn.addEventListener('click', async () => {
        // 삭제 버튼 클릭 시, 이미지 파일을 서버에서 삭제
        const imageFilename = memo.querySelector('img')?.dataset.filename;
        if (imageFilename) {
            const response = await fetch(`/image/${imageFilename}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                console.log('서버 이미지 삭제 성공');
            } else {
                console.error('서버에서 이미지 삭제 실패');
            }
        }

        memo.remove();
        alert('삭제 완료');
    });
}
