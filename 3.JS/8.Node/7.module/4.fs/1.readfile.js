// 별다른 말이 없으면, 우리는 commonJS 방식을 쓸것
const fs = require('fs');

// function myCallbackFunction(err, data){
//     if(err){
//         console.error('에러가 있음. 에러는:' + err);
//     }else{
//         console.log('에러가 없음' + data);
//     }
// }

// fs.readFile('example.txt', 'UTF8', myCallbackFunction);
// fs.readFile('example.txt', 'UTF8', function(err, data){
//     if(err){
//         console.error('에러가 있음. 에러는:' + err);
//     }else{
//         console.log('에러가 없음' + data);
//     }
// });

console.log("파일 읽기전");
fs.readFile('example.txt', 'UTF8', (err, data) => {
    if(err){
        console.error('에러가 있음. 에러는:' + err);
    }else{
        console.log('에러가 없음' + data);
    }
});
console.log("파일 읽기후");
