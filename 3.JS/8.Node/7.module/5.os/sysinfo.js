const os = require('os');

console.log("호스트 이름 : " + os.hostname());
console.log("임시 폴더 경로 : " + os.tmpdir());
console.log("CPU 정보 : " + os.cpus);

const mum_in_gb = os.totalmem() / 1024 / 1024 /1024;
console.log(`메모리양 : ${mum_in_gb}`);

console.log(os.platform());
console.log(os.version());
console.log(os.release());