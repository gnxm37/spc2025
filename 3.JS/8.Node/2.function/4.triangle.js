const ROWS = 7; 

function leftTriangle() {
    let currentRow = 1;
    while (currentRow <= ROWS) {
        let stars = "";
        let starCount = 1;
        while (starCount <= currentRow) {
            stars += "*";
            starCount++;
        }
        console.log(stars);
        currentRow++;
    }
}


function rightTriangle() {
    let currentRow = 1;
    while (currentRow <= ROWS) {
        let stars = "";
        let starCount = ROWS;
        while (starCount >= currentRow) {
            stars += "*";
            starCount--;
        }
        console.log(stars);
        currentRow++;
    }
}

function leftTriangle3(rows = ROWS){
    for(let i=1; i<=rows; i++){
        console.log(" ".repeat(rows-i)+"*".repeat(i));
    }
}

function leftTriangle4(rows = ROWS){
    for(let i=1; i<=rows; i++){
        console.log("*".repeat(i));
    }
}


leftTriangle();
console.log("=============");
rightTriangle();
console.log("=============");
leftTriangle3(5);
console.log("=============");
leftTriangle4(5);