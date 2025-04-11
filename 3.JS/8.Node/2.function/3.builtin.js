const stringNumber = "42";

console.log(stringNumber + 2);

const number = parseInt(stringNumber);

console.log(number + 2);

console.log(typeof(stringNumber));
console.log(typeof(number));

const number2 = Number(stringNumber);
console.log(Number(number2));

const User = {
    name: 'John',
    age: 30
}

console.log(typeof User);

setTimeout(()=>{
    console.log("1초후에 생성됨")
}, 1000);

console.log('END');

setTimeout(()=>{
    console.log("3초후에 생성됨")
}, 3000);

console.log('REAL END');