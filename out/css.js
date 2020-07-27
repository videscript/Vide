var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "fs", "./index", "./config"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const fs_1 = __importDefault(require("fs"));
    const index_1 = require("./index");
    const config_1 = require("./config");
    const chalk = require('chalk');
    let pointer;
    console.log(`${chalk.blue('●')} building css`);
    const toK = (str) => str &&
        str
            .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
            .map((x) => x.toLowerCase())
            .join('-');
    const routerType = [];
    index_1.$.forEach((parsed) => {
        const attr = parsed('Vide').get()[0].attribs;
        const attrTitles = Object.keys(attr);
        if (attrTitles.includes('router')) {
            routerType.push(parsed.prototype.name);
        }
    });
    index_1.Css.forEach((css) => {
        const CSS = css.css;
        const fname = css.name.split('.vide')[0];
        // checks for duplicate files & deletes them
        if (`${config_1.config.outDir}/` === 'undefined/') {
            if (fs_1.default.existsSync(`./css-${fname}.css`))
                fs_1.default.unlinkSync(`./css-${fname}.css`);
        }
        else if (fs_1.default.existsSync(`${config_1.config.outDir}/css-${fname}.css`))
            fs_1.default.unlinkSync(`${config_1.config.outDir}/css-${fname}.css`);
        // builds css
        let fullTemp;
        const selectors = Object.keys(CSS);
        selectors.forEach((data, num) => {
            const body = CSS[data];
            const bodyKeys = Object.keys(CSS[data]);
            let ruling = '';
            bodyKeys.forEach((rule) => {
                const temp = `\t${toK(rule)}:${body[rule]};\n`;
                ruling = ruling.concat(temp);
            });
            fullTemp = `\n${data} {\n${ruling}}\n`;
            if (routerType.includes(`${fname}.vide`)) {
            }
            else if (`${config_1.config.outDir}/` === 'undefined/') {
                fs_1.default.appendFileSync(`./css-${fname}.css`, fullTemp);
            }
            else {
                try {
                    fs_1.default.appendFileSync(`${config_1.config.outDir}/css-${fname}.css`, fullTemp);
                }
                catch (err) {
                    console.log(`${chalk.red('●')} ${config_1.config.outDir}/ does not exist.`);
                }
            }
        });
    });
});
