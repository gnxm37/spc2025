// function gugudan(){
//     for(let i=1;i<=9;i++){
//         console.log(`2 x ${i} = ${2*i}`);
//     }
// }

gugudan();

function gugudan(){
    for(let i=2;i<=9;i++){
        console.log(`=======${i}단=======`);
        for(let j=1; j<=9; j++){
            console.log(`${i} x ${j} = ${i*j}`);
        }
    }
}