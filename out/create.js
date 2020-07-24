const ncp = require('ncp').ncp;
const path = require('path').dirname(require.main.filename);
const colors = require('colors');
const main = args => {
    const indexOf = args.indexOf('-create');
    const arg = args[indexOf + 1];
    if (arg.trim().toLowerCase() == 'init') {
        ncp(path + '/bin/lib/templates/config', '.', err => {
            if (err) {
                console.log(err);
            }
            console.log('●'.blue + ' created config');
        });
    } else if (arg.trim().toLowerCase() == 'example') {
        ncp(path + '/bin/lib/templates/default', '.', err => {
            if (err) {
                console.log(err);
            }
            console.log('●'.blue + ' created example project');
        });
    } else {
        console.log('●'.red + ' invalid template name');
    }
};
module.exports = main;
