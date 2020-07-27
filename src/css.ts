import fs from 'fs';
import { Css, $ } from './index';
import { config } from './config';

let pointer: string;
const colors = require('colors');

console.log(`${'●'.blue} building css`);
const toK = (str: any) =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x: any) => x.toLowerCase())
    .join('-');

const routerType: Array<string> = [];
$.forEach((parsed: any) => {
  const attr: object = parsed('Vide').get()[0].attribs;
  const attrTitles: Array<string> = Object.keys(attr);
  if (attrTitles.includes('router')) {
    routerType.push(parsed.prototype.name);
  }
});
Css.forEach((css: any) => {
  const CSS = css.css;
  const fname = css.name.split('.vide')[0];
  // checks for duplicate files & deletes them
  if (`${config.outDir}/` === 'undefined/') {
    if (fs.existsSync(`./css-${fname}.css`)) fs.unlinkSync(`./css-${fname}.css`);
  } else if (fs.existsSync(`${config.outDir}/css-${fname}.css`))
    fs.unlinkSync(`${config.outDir}/css-${fname}.css`);
  // builds css
  let fullTemp: string;
  const selectors: Array<string> = Object.keys(CSS);
  selectors.forEach((data, num: number) => {
    const body: any = CSS[data];
    const bodyKeys: Array<string> = Object.keys(CSS[data]);
    let ruling = '';
    bodyKeys.forEach((rule: string) => {
      const temp = `\t${toK(rule)}:${body[rule]};\n`;
      ruling = ruling.concat(temp);
    });
    fullTemp = `\n${data} {\n${ruling}}\n`;
    if (routerType.includes(`${fname}.vide`)) {
    } else if (`${config.outDir}/` === 'undefined/') {
      fs.appendFileSync(`./css-${fname}.css`, fullTemp);
    } else {
      try {
        fs.appendFileSync(`${config.outDir}/css-${fname}.css`, fullTemp);
      } catch (err) {
        console.log(`${'●'.red} ${config.outDir}/ does not exist.`);
      }
    }
  });
});
