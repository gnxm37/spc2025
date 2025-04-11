const Person = require('./Person');

class Parent extends Person {
    constructor(name, age, sex, job) {
        super(name, age, sex, job);
    }

    driveCar(random){
        return console.log(`${this.name}이(가) ${random.brand} ${random.model}를 운전하고 있습니다.`);
    }
}
module.exports = Parent;