import { Css, Dom } from './index';
import fs from 'fs';
import { config } from './config';
const toK = (str: any) =>
    str &&
    str
        .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .map((x: string) => x.toLowerCase())
        .join('-');
const selectors: Array<string> = Object.keys(Css);
const state: string = config.outDir + '/css.css' || '.' + '/css.css'
try {
fs.unlinkSync(state)
}catch(err) {
    let non:null = null;
}
selectors.forEach(data => {
    const body: any = Css[data]
    const bodyKeys: Array<string> = Object.keys(Css[data])
    let ruling: string = '';
    bodyKeys.forEach((rule: string) => {
        let temp: string = `\t${rule}:${body[rule]};\n`;
        ruling = ruling.concat(temp);
    });
    let fullTemp: string = `\n${data} {\n${ruling}}\n`
    if (config.outDir + '/' == 'undefined/') {
        fs.appendFileSync('./css.css', fullTemp)
    } else {
        try {
        fs.appendFileSync(config.outDir + '/css.css', fullTemp)
        }catch(err) {
            console.log(`${config.outDir}/ does not exist.`)
        }
    }
})