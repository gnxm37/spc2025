const Person = require('./Person');

class Employee extends Person{
    constructor(name, rank){
        super(name);
        this.rank = rank;
    }

    greet(){
        return `이름은 ${this.name}이고 직급은 ${this.rank}입니다.`;
    }
}

module.exports = Employee;