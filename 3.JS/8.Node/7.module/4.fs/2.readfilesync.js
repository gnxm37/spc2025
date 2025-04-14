const fs = require('fs');

console.log("파일 읽기전");
const data = fs.readFileSync('example.txt', 'UTF8');
console.log("데이터는 : " + data);
console.log("파일 읽기후");
