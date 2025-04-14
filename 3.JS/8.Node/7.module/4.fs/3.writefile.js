// 별다른 말이 없으면, 우리는 commonJS 방식을 쓸것
const fs = require('fs');

const data = "내가 파일에 쓰고 싶은 내용 ";

console.log("파일 읽기전");
fs.writeFile('example.txt', data, {encoding: 'UTF8' , flag:'a'}, (err, data) => {
    if(err){
        console.error('에러가 있음. 에러는:' + err);
    }else{
        console.log('에러가 없음, 쓰기 완료');
    }
});
console.log("파일 읽기후");
