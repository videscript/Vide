const { ncp } = require('ncp');
const chalk = require('chalk');
const path: string = require('path').dirname(require?.main?.filename);

const main = (args: Array<string>) => {
  const indexOf: number = args.indexOf('-create');
  const arg: string = args[indexOf + 1];
  if (arg.trim().toLowerCase() == 'init') {
    ncp(`${path}/bin/lib/templates/config`, '.', (err: string) => {
      if (err) {
        console.log(err);
      }
      console.log(`${chalk.blue('●')} created config`);
    });
  } else if (arg.trim().toLowerCase() == 'example') {
    ncp(`${path}/bin/lib/templates/default`, '.', (err: string) => {
      if (err) {
        console.log(chalk.red('● ') + err);
      }
      console.log(`${chalk.blue('●')} created example project`);
    });
  } else {
    console.log(`${chalk.red('●')} invalid template name`);
  }
};
module.exports = main;
