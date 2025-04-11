class Person{
    constructor (name, age, sex, job){ // 초기화 함수
        this.name = name;
        this.age = age;
        this.sex = sex;
        this.job = job;
    }
    getInCar(random){
        console.log(random);
        console.log(`${this.name}이(가) ${random.brand}에 탑승했습니다.`);
    }
}

module.exports = Person;