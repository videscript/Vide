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
    const toK = (str) => str &&
        str
            .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
            .map((x) => x.toLowerCase())
            .join('-');
    const selectors = Object.keys(index_1.Css);
    const state = config_1.config.outDir + '/css.css' || '.' + '/css.css';
    try {
        fs_1.default.unlinkSync(state);
    }
    catch (err) {
        let non = null;
    }
    selectors.forEach(data => {
        const body = index_1.Css[data];
        const bodyKeys = Object.keys(index_1.Css[data]);
        let ruling = '';
        bodyKeys.forEach((rule) => {
            let temp = `\t${rule}:${body[rule]};\n`;
            ruling = ruling.concat(temp);
        });
        let fullTemp = `\n${data} {\n${ruling}}\n`;
        if (config_1.config.outDir + '/' == 'undefined/') {
            fs_1.default.appendFileSync('./css.css', fullTemp);
        }
        else {
            try {
                fs_1.default.appendFileSync(config_1.config.outDir + '/css.css', fullTemp);
            }
            catch (err) {
                console.log(`${config_1.config.outDir}/ does not exist.`);
            }
        }
    });
});
