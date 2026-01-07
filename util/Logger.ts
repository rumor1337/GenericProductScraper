import chalk from 'chalk';

class Logger {

    public info(text: any) {
        console.log(chalk.bold(text));
    }

    public warn(text: any) {
        console.warn(chalk.bgYellow(text));
    }

    public error(text: any) {
        console.error(chalk.red.bold(text));
    }

}

export default Logger;