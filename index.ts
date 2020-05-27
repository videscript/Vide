import fs from 'fs'
import { config } from './config';
let cheerio = require('cheerio');
let cParse = require('transform-css-to-js');
let hello: Array<string>;
try {
    hello = fs.readdirSync(config.rootDir || './', 'utf-8');
} catch (err) {
    throw 'Root directory stated in config not found.'
}
const files: Array<string> = [];

hello.forEach(file => {
    if (file.includes('.vide')) {
        files.push(file)
    } else {
        return;
    }
});
if(files.length == 0) {
    throw 'No files for compiling.'
}
let CSS;
let dom;
let raw;
for (let i = 0; i < files.length; i++) {
    let point: string = files[i]
    let file: string;
    if (config.rootDir != undefined) {
        file = fs.readFileSync(config.rootDir+'/' + point, 'utf-8').trim()
    } else {
        file = fs.readFileSync('./' + point, 'utf-8').trim()
    }
    const $ = cheerio.load(file);
    dom = $('Vide *');
    raw = $;
    let Css = $('Vide').clone().children().remove().end().text().trim();
    let str = cParse(Css);
    CSS = JSON.parse(str);
}
export let Css = CSS;

export let Dom = dom;

export let $ = raw;