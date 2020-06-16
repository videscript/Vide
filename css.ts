import { Css, $ } from './index';
import fs from 'fs';
import { config } from './config';
let pointer: string;
const colors = require('colors');
console.log('●'.blue + ' building css')

const toK = (str: any) =>
    str &&
    str
        .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .map((x: any) => x.toLowerCase())
        .join('-');
Css.forEach((css) => {
    let CSS = css.css;
    let fname = css.name.split('.vide')[0];
    //checks for duplicate files & deletes them
    const state: string = config.outDir + '/css-' + fname + '.css' || '.' + '/css-' + fname + '.css'
    if (fs.existsSync(config.outDir + '/css-' + fname + '.css') || fs.existsSync('.' + '/css-' + fname + '.css')) {
        fs.unlinkSync(state)
    }
    //builds css
    let fullTemp: string
    const selectors: Array<string> = Object.keys(CSS);
    selectors.forEach((data, num) => {
        const body: any = CSS[data]
        const bodyKeys: Array<string> = Object.keys(CSS[data])
        let ruling = '';
        bodyKeys.forEach((rule: string) => {
            let temp: string = `\t${toK(rule)}:${body[rule]};\n`;
            ruling = ruling.concat(temp);
        });
        fullTemp = `\n${data} {\n${ruling}}\n`
        if (config.outDir + '/' == 'undefined/') {
            fs.appendFileSync('./css-' + fname + '.css', fullTemp)
        } else {
            try {
                fs.appendFileSync(config.outDir + '/css-' + fname + '.css', fullTemp)
            } catch (err) {
                console.log('●'.red + `${config.outDir}/ does not exist.`)
            }
        }
    })

})
