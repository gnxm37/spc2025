class Person{
    constructor (name, age, sex, job){ // 초기화 함수
        this.name = name;
        this.age = age;
        this.sex = sex;
        this.job = job;
    }

    playInCar(){
        return console.log(`${this.name}이(가) 차 안에서 장난을 치고 있습니다.`);
    }
}

module.exports = Person;