var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./index", "fs", "./config"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const index_1 = require("./index");
    const fs_1 = __importDefault(require("fs"));
    const config_1 = require("./config");
    let pointer;
    const colors = require('colors');
    console.log('●'.blue + ' building css');
    const toK = (str) => str &&
        str
            .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
            .map((x) => x.toLowerCase())
            .join('-');
    index_1.Css.forEach((css) => {
        const CSS = css.css;
        const fname = css.name.split('.vide')[0];
        //checks for duplicate files & deletes them
        const state = config_1.config.outDir + '/css-' + fname + '.css' || '.' + '/css-' + fname + '.css';
        if (fs_1.default.existsSync(config_1.config.outDir + '/css-' + fname + '.css') ||
            fs_1.default.existsSync('.' + '/css-' + fname + '.css')) {
            fs_1.default.unlinkSync(state);
        }
        //builds css
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
            if (config_1.config.outDir + '/' === 'undefined/') {
                fs_1.default.appendFileSync('./css-' + fname + '.css', fullTemp);
            }
            else {
                try {
                    fs_1.default.appendFileSync(config_1.config.outDir + '/css-' + fname + '.css', fullTemp);
                }
                catch (err) {
                    console.log('●'.red + `${config_1.config.outDir}/ does not exist.`);
                }
            }
        });
    });
});
