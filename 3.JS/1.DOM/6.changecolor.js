var colors = ["red", "blue", "green", "pink"]
var currentIndex = 0;

function changeColor(){
    document.body.style.backgroundColor = colors[currentIndex];
    currentIndex =(currentIndex + 1) % colors.length;
}   // 정해진 색상 변경

function MyColor(){
    const R = Math.floor(Math.random()*255);
    const G = Math.floor(Math.random()*255);
    const B = Math.floor(Math.random()*255);
    const A = (Math.random()*1).toFixed(4);
    console.log(R,G,B,A);

    document.body.style.backgroundColor = "RGBA("+R+","+G+","+B+","+A+")";
    R,G,B,A = 0;
}   // 랜덤 색상 변경

function randomColor(){
    const RGB = Math.floor(Math.random()*16777215).toString(16);
    document.body.style.backgroundColor = "#"+RGB;
}