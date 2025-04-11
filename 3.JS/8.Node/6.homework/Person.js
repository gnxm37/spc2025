class Person {
    constructor(name){
        this.name = name;
    }
    greet(){
        return `${this.name}(은/는) 인사를 할 줄 알아요.`;
    }
}

module.exports = Person;