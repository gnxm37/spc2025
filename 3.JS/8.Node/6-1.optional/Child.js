const Person = require('./Person');

class Child extends Person {
    constructor(name, age, sex, job) {
        super(name, age, sex, job);
    }
    
    playInCar(){
        return console.log(`${this.name}이(가) 차 안에서 장난을 치고 있습니다.`);
    }
}
module.exports = Child;