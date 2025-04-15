import chalk from 'chalk';

console.log(chalk.green('성공메시지 색상은 초록색으로 ...'));
console.log(chalk.red('에러메시지 색상은 빨간색으로 ...'));
console.log(chalk.red.bold('에러메시지 색상은 빨간색 볼드체로 ...'));
console.log(chalk.bgBlue.white('정보메시지 파란바탕에 글자색상은 흰색으로 ...'));
console.log(chalk.yellow.underline('경고메시지는 노란색, 밑줄도으로 ...'));

