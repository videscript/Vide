const { ncp } = require('ncp');
const path: string = require('path').dirname(require.main.filename);
const colors = require('colors');

const main = (args: Array<string>) => {
  const indexOf: number = args.indexOf('-create');
  const arg: string = args[indexOf + 1];
  if (arg.trim().toLowerCase() == 'init') {
    ncp(`${path}/bin/lib/templates/config`, '.', (err: string) => {
      if (err) {
        console.log(err);
      }
      console.log(`${'●'.blue} created config`);
    });
  } else if (arg.trim().toLowerCase() == 'example') {
    ncp(`${path}/bin/lib/templates/default`, '.', (err) => {
      if (err) {
        console.log(err);
      }
      console.log(`${'●'.blue} created example project`);
    });
  } else {
    console.log(`${'●'.red} invalid template name`);
  }
};
module.exports = main;
