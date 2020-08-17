"use strict";
const { ncp } = require('ncp');
const chalk = require('chalk');
//@ts-ignore
const path = require('path').dirname(require.main.filename);
const main = (args) => {
    const indexOf = args.indexOf('-create');
    const arg = args[indexOf + 1];
    if (arg.trim().toLowerCase() == 'init') {
        ncp(`${path}/bin/lib/templates/config`, '.', (err) => {
            if (err) {
                console.log(err);
            }
            console.log(`${chalk.blue('●')} created config`);
        });
    }
    else if (arg.trim().toLowerCase() == 'example') {
        ncp(`${path}/bin/lib/templates/default`, '.', (err) => {
            if (err) {
                console.log(chalk.red('● ') + err);
            }
            console.log(`${chalk.blue('●')} created example project`);
        });
    }
    else {
        console.log(`${chalk.red('●')} invalid template name`);
    }
};
module.exports = main;
