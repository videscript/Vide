// @ts-ignore: Unreachable code error
import { JSHINT } from 'jshint';
import { exit } from 'process';
import fs from 'fs';
import { scripts } from './html';
import { config } from './config';
const chalk = require('chalk');
scripts.forEach((js) => {
  JSHINT(js.js, { esnext: true });
  const res: {
    functions: Array<string>;
    errors: Array<object>;
  } = JSHINT.data();
  if (res.errors) {
    res.errors.forEach((err: any) => {
      console.log(`${chalk.red('       ●')} ERROR: ${err.line + 1}:${err.character} - ${err.raw}`);
    });
    exit();
  }
  if (config.outDir != undefined) {
    if (fs.existsSync(`${config.outDir}/${js.from.split('.vide')[0]}-js.js`)) {
      fs.unlinkSync(`${config.outDir}/${js.from.split('.vide')[0]}-js.js`);
    }

    fs.writeFileSync(
      `${config.outDir}/${js.from.split('.vide')[0]}-js.js`,
      `import videEvent from 'vide-ts'\n\n${js.js.join('\n')}`
    );
  } else {
    if (fs.existsSync(`./${js.from.split('.vide')[0]}-js.js`))
      fs.unlinkSync(`./${js.from.split('.vide')[0]}-js.js`);
    fs.writeFileSync(
      `./${js.from.split('.vide')[0]}-js.js`,
      `import videEvent from 'vide-ts'\n\n${js.js.join('\n')}`
    );
  }
});
