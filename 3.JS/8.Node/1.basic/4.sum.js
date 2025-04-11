function sum_to_num(number){
    let sum = 0;
    for(let i=0;i<=number;i++){
        sum += i;
    }
    console.log(`단순한 더하기로 합산한 값은: ${sum}`);
}

sum_to_num(10);
sum_to_num(100);
sum_to_num(1000);
sum_to_num(10000);
sum_to_num(100000);

function sum_gauss_num(number){
    return (number * (number+1))/2;
}

console.log('가우스 공식을 활용한 합산 값은:', sum_gauss_num(10));
console.log(`가우스 공식을 활용한 합산 값은: ${sum_gauss_num(100)}`);
console.log(`가우스 공식을 활용한 합산 값은: ${sum_gauss_num(1000)}`);
console.log(`가우스 공식을 활용한 합산 값은: ${sum_gauss_num(10000)}`);
console.log(`가우스 공식을 활용한 합산 값은: ${sum_gauss_num(100000)}`);