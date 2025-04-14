const fs = require('fs');

const data = "내가 쓴 내용 \n 두번째줄 \n 세번째줄";

console.log("파일 읽기전");
fs.writeFileSync('example.txt', data, {encoding:'UTF8', flag: 'a'});
console.log("데이터는 : " + data);
console.log("파일 읽기후");
