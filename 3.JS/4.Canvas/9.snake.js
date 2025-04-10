
const GAME_SPEED = 200; // ms (화면 갱신 주기)
const BLOCK_SIZE = 20; // 블록 크기
let redBox; // 랜덤한 빨간상자값

let snake = {
    x: 0,
    y: 0,
    directionX: 0,  // 처음엔 멈춘 상태
    directionY: 0,
    blocksize: BLOCK_SIZE
} // 뱀의 시작 위치

// DOM 과 각종 필요한 여러 컴포넌트 로딩이 끝난 이후 이거 실행해라...
window.onload = initialize;

function initialize() {
    canvas = document.getElementById('snakeCanvas');
    context = canvas.getContext('2d');
    // 키 이벤트 리스너 추가
    setupEventListeners();

    // 빨간 상자 위치 초기화
    redBox = getRandomPosition();

    // 게임 시작 루프 호출
    setInterval(gameLoop, GAME_SPEED);
}

function gameLoop() {
    // 화면 렌더링
    draw();

    // 뱀 이동
    moveSnake();

}

// 화면에 뱀과 빨간 상자 그리기
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = 'pink';
    context.fillRect(snake.x, snake.y, snake.blocksize, snake.blocksize);

    context.fillStyle = 'red';
    context.fillRect(redBox.x, redBox.y, BLOCK_SIZE, BLOCK_SIZE);

    if(snake.x == redBox.x && snake.y == redBox.y){
        redBox = getRandomPosition();
    }
}

// 뱀의 위치를 이동
function moveSnake() {

    // 화면을 벗어나지 않게.. 오른쪽 끝 -> 왼쪽 끝에서 나오기 (vice versa)
    //                       위로 -> 아래로 나오기... (vice versa)
    snake.x += BLOCK_SIZE * snake.directionX;
    snake.y += BLOCK_SIZE * snake.directionY;

    // 화면을 벗어나면 반대편으로 이동
    if (snake.x >= canvas.width) {
        snake.x = 0;
    } else if (snake.x < 0) {
        snake.x = canvas.width - BLOCK_SIZE;
    }

    if (snake.y >= canvas.height) {
        snake.y = 0;
    } else if (snake.y < 0) {
        snake.y = canvas.height - BLOCK_SIZE;
    }
}

// 여기는 키보드 인터럽트(이벤트) 핸들러
function setupEventListeners() {

    document.addEventListener('keydown', function (event) {
        switch (event.key) {
            case 'ArrowUp':
                snake.directionX = 0;
                snake.directionY = -1;
                break;
            case 'ArrowDown':
                snake.directionX = 0;
                snake.directionY = 1;
                break;
            case 'ArrowLeft':
                snake.directionX = -1;
                snake.directionY = 0;
                break;
            case 'ArrowRight':
                snake.directionX = 1;
                snake.directionY = 0;
                break;
        }
    });
}

// 빨간 상자 값 뽑아내기
function getRandomPosition() {
    const xBlocks = Math.floor(canvas.width / BLOCK_SIZE);
    const yBlocks = Math.floor(canvas.height / BLOCK_SIZE);

    const x = Math.floor(Math.random() * xBlocks) * BLOCK_SIZE;
    const y = Math.floor(Math.random() * yBlocks) * BLOCK_SIZE;

    return { x, y };
}