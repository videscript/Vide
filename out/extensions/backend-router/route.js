(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "process", "../../index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const process_1 = require("process");
    const index_1 = require("../../index");
    const routes = {};
    let index;
    const chalk = require('chalk');
    console.log(`${chalk.blue('●')} compiling routes`);
    index_1.Clean.forEach((r, num) => {
        const file = r('Router').html();
        if (file == null) {
        }
        else {
            index = num;
        }
    });
    const router = index_1.Clean[index];
    if (router == undefined) {
        console.log(`${chalk.red('   ●')} Router enabled but no router found`);
        process_1.exit();
    }
    const { children } = router('Router').get()[0];
    children.forEach((element) => {
        const route = element.children;
        if (route == undefined) {
        }
        else if (route[0] === undefined) {
            if (element.attribs.path === '*') {
                console.log(`${chalk.blue('●')}    built route: ${element.attribs.type}`);
            }
            else {
                console.log(`${chalk.blue('●')}    built route: ${element.attribs.path}`);
            }
            routes[element.attribs.path] = {
                path: element.attribs.path,
                dest: element.attribs.dest,
                type: element.attribs.type
            };
        }
        else {
            if (element.attribs.path == '*') {
                console.log(`${chalk.blue('●')}    built route: ${element.attribs.type}`);
            }
            else {
                console.log(`${chalk.blue('●')}    built route: ${element.attribs.path}`);
            }
            routes[element.attribs.path] = {
                callback: route[0].data,
                path: element.attribs.path,
                dest: element.attribs.dest,
                type: element.attribs.type
            };
        }
    });
    exports.default = routes;
});
