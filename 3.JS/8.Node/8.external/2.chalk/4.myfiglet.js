// 라이브러리를 안쓰고 내손으로 만들기
// pirntAsciiArt('hello');
const asciiFont = {
    H: [
        '   ',
        '|_|',
        '| |',
    ],
    E:[
        ' __',
        '|__',
        '|__'
    ],
    L:[
        '   ',
        '|  ',
        '|__',
    ],
    O:[
        ' _ ',
        '| |',
        '|_|',
    ],
}

function pirntAsciiArt(text){
    const chars = text.toUpperCase().split('');

    for(let line=0; line<3; line++){
        let output ='';
        for(const ch of chars){
            output+=(asciiFont[ch]? asciiFont[ch][line]: "  ") + " ";
        }
        console.log(output);
    }
}

pirntAsciiArt('Hello');