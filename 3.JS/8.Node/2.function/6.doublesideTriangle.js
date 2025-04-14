const ROWS = 17;

function doublesideTriangle() {
    let startPoint = Math.ceil(ROWS / 2);
    for (let i = 0; i < startPoint; i++) {
        let stars = "";

        // 공백: 피라미드 중심 맞추기
        for (let space = 0; space < startPoint - i - 1; space++) {
            stars += " ";
        }

        // 별: 2 * i + 1 개
        for (let star = 0; star < 2 * i + 1; star++) {
            stars += "*";
        }

        console.log(stars);
    }
}

function doublesideinvertTriangle() {
    let startPoint = Math.ceil(ROWS / 2);
    for (let i = 0; i < startPoint; i++) {
        let stars = "";

        // 공백: 피라미드 중심 맞추기
        for (let space = 0; space < i; space++) {
            stars += " ";
        }

        // 별: 2 * i + 1 개
        for (let star = ROWS; star >= 2 * i + 1; star--) {
            stars += "*";
        }

        console.log(stars);
    }
}

function etcTriangle() {
    for (let i = 0; i < ROWS/2; i++) {
        let stars = "";

        // 공백: 피라미드 중심 맞추기
        for (let space = 0; space < ROWS/2 - i - 1; space++) {
            stars += " ";
        }

        // 별: 2 * i + 1 개
        for (let star = 0; star < 2 * i + 1; star++) {
            stars += "*";
        }

        console.log(stars);
    }
}

doublesideTriangle();
console.log("");
doublesideinvertTriangle();
console.log("");
etcTriangle();