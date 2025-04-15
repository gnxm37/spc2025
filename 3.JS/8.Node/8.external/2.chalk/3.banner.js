import figlet from 'figlet';
import chalk from 'chalk';

figlet("Hello World!", (err, data) => {
    if (err){
        console.error("에러 : " + err);
        return;
    }
    console.log(chalk.cyan(data));
    console.log();
    console.log(chalk.bgCyan.white(data));
});