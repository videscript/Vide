var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "jshint", "process", "fs", "./html", "./config"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // @ts-ignore: Unreachable code error
    const jshint_1 = require("jshint");
    const process_1 = require("process");
    const fs_1 = __importDefault(require("fs"));
    const html_1 = require("./html");
    const config_1 = require("./config");
    const chalk = require('chalk');
    html_1.scripts.forEach((js) => {
        jshint_1.JSHINT(js.js, { esnext: true });
        const res = jshint_1.JSHINT.data();
        if (res.errors) {
            res.errors.forEach((err) => {
                console.log(`${chalk.red('       ●')} ERROR: ${err.line + 1}:${err.character} - ${err.raw}`);
            });
            process_1.exit();
        }
        if (config_1.config.outDir != undefined) {
            if (fs_1.default.existsSync(`${config_1.config.outDir}/${js.from.split('.vide')[0]}-js.js`)) {
                fs_1.default.unlinkSync(`${config_1.config.outDir}/${js.from.split('.vide')[0]}-js.js`);
            }
            fs_1.default.writeFileSync(`${config_1.config.outDir}/${js.from.split('.vide')[0]}-js.js`, `import videEvent from 'vide-ts'\n\n${js.js.join('\n')}`);
        }
        else {
            if (fs_1.default.existsSync(`./${js.from.split('.vide')[0]}-js.js`))
                fs_1.default.unlinkSync(`./${js.from.split('.vide')[0]}-js.js`);
            fs_1.default.writeFileSync(`./${js.from.split('.vide')[0]}-js.js`, `import videEvent from 'vide-ts'\n\n${js.js.join('\n')}`);
        }
    });
});
