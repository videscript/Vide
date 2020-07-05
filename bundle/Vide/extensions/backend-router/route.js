(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../index", "process"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const index_1 = require("../../index");
    const process_1 = require("process");
    const routes = {};
    let index;
    const colors = require('colors');
    console.log('●'.blue + ' compiling routes');
    index_1.Clean.forEach((r, num) => {
        const file = r('Router').html();
        if (file == null) {
            return;
        }
        else {
            index = num;
        }
    });
    const router = index_1.Clean[index];
    if (router == undefined) {
        console.log('Router enabled but no router found');
        process_1.exit();
    }
    const children = router('Router').get()[0].children;
    children.forEach((element) => {
        const route = element.children;
        if (route == undefined) {
            return;
        }
        else {
            if (route[0] === undefined) {
                if (element.attribs.path === '*') {
                    console.log('●'.blue + '    built route: ' + element.attribs.type);
                }
                else {
                    console.log('●'.blue + '    built route: ' + element.attribs.path);
                }
                routes[element.attribs.path] = {
                    path: element.attribs.path,
                    dest: element.attribs.dest,
                    type: element.attribs.type,
                };
            }
            else {
                if (element.attribs.path == '*') {
                    console.log('●'.blue + '    built route: ' + element.attribs.type);
                }
                else {
                    console.log('●'.blue + '    built route: ' + element.attribs.path);
                }
                routes[element.attribs.path] = {
                    callback: route[0].data,
                    path: element.attribs.path,
                    dest: element.attribs.dest,
                    type: element.attribs.type,
                };
            }
        }
    });
    exports.default = routes;
});
