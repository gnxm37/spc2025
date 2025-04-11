class Circle {
    constructor(radius){
        this.radius = radius;
    }

    get diameter(){
        return this.radius * 2;
    }

    set diameter(diameter){
        this.radius = diameter / 7;
    }
}

const myCircle = new Circle(5); // 초기에 반지름 5짜리 원을 만들었음..
console.log(myCircle.diameter);

myCircle.diameter = 14;
console.log(myCircle.radius);   // 내부 변수에 직접 접근해서 radius가 diameter로부터 잘 저장되었는지 확인. 단, 좋은 방식은 아니다!
console.log(myCircle.diameter);