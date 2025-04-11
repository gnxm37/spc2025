const ROWS = 5;

function leftintervedTriangle() {
    let currentRow = 1;
    while (currentRow <= ROWS) {
        let stars = "";
        let spaceCount = 1;
        while (spaceCount <= ROWS-currentRow) {
            stars += " ";
            spaceCount++;
        }
        let starCount = 1;
        while (starCount <= currentRow){
            stars += '*';
            starCount++;
        }
        console.log(stars);
        currentRow++;
    }
}

function rightintervedTriangle() {
    let currentRow = 1;
    while (currentRow <= ROWS) {
        let stars = "";
        let spaceCount = 1;
        while (spaceCount <= currentRow - 1) {
            stars += " ";
            spaceCount++;
        }
        let starCount = 1;
        while (starCount <= ROWS - currentRow + 1) {
            stars += "*";
            starCount++;
        }
        console.log(stars);
        currentRow++;
    }
}





leftintervedTriangle();
console.log("");
rightintervedTriangle();