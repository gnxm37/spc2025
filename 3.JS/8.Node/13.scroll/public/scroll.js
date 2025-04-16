const NUM_OF_ITEMS_PER_PAGE = 5;
let start = 0;
let end = start + NUM_OF_ITEMS_PER_PAGE;
let isLoading = false;

// 미션1. 백엔드에 요청해서 데이터를 받아와서, 화면에 랜더링한다.
async function loading() {
    if (isLoading) {
        return; // 이미 로딩 중이면 아무것도 안 함
    } else {
        isLoading = true;
    }

    // 미션1-1. 백엔드에 요청한다. fetch
    const res = await fetch(`/get-items?start=${start}&end=${end}`);
    // 미션1-2. 데이터를 받아온다.
    const data = await res.json();
    // 미션1-3. 화면에 렌더링한다. dom..
    const myContainer = document.getElementById('scroll-container');

    // 미션1-4. data를 각 항목(item)별로 개별 div로 만들기...
    data.forEach((d) => {
        const item = document.createElement('div');
        item.textContent = d;
        item.classList.add('item'); // 디자인 속성 추가
        myContainer.appendChild(item);
    });

    // 오래된 돔을 찾아서 위에 지우기...
    while (myContainer.children.length > 100) {
        myContainer.removeChild(myContainer.firstChild);
    }

    // 다음 로딩 준비...
    isLoading = false;
}

function loadNext() {
    start = end;
    end = start + NUM_OF_ITEMS_PER_PAGE;
    loading();
}

document.addEventListener('DOMContentLoaded', () => {
    loading();
});

window.addEventListener('scroll', () => {
    const endOfScroll = (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1);

    console.log("화면끝? ", endOfScroll);
    if (endOfScroll && !isLoading) {
        loadNext(); // 화면 끝에 도달하면 다음 페이지 로딩
    } 
});
