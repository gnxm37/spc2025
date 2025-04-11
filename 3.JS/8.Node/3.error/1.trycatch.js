
try {
    const result = someVariableName * 2;
} catch (error) {
    console.error('오류가 발생했음: ', error.message);
}

try {
    const result = someVariableName * 2;
} catch (error) {
    if (error instanceof ReferenceError) {
        console.log('참조 오류 발생: ', error.message);
    } else {
        console.log('그 외 다른 오류 발생', error.message);
    }
}


// 문법 오류 예시
try {
    eval("alert('hello");
} catch (error) {
    if (error instanceof SyntaxError) {
        console.log('문법 오류 발생: ', error.message);
    } else {
        console.log('그 외 다른 오류 발생', error.message);
    }
}


// 문법 오류 예시
try {
    let arr = new Array(-1);
} catch (error) {
    if (error instanceof RangeError) {
        console.log('범위 오류 발생: ', error.message);
    } else {
        console.log('그 외 다른 오류 발생', error.message);
    }
}

function divide(a, b) {
    // 입력한 값이 무조건 숫자인지 확인하는 예시시
    if (typeof a !== 'number' || typeof b != 'number') {
        throw new TypeError("숫자를 입력하세요");
    }

    // 입력한 숫자가 2자리까지만 입력을 원하는 예시
    if(a.toString().length <= 2 || b.toString().length <= 2){
        throw new RangeError('2자리 숫자만 입력하세요.')
    }

    if (b === 0) {
        throw new Error('0으로 나눌 수 없습니다.');
    }
    
    return a / b;
}

try {
    result = divide('a', 'b');
} catch (error) {
    console.log("오류 발생: ", error.message);
}