(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const index_1 = require("../../index");
    let routes = {};
    let index;
    index_1.Clean.forEach((r, num) => {
        const file = r("Router").html();
        if (file == null) {
            return;
        }
        else {
            index = num;
        }
    });
    let router = index_1.Clean[index];
    let children = router("Router").get()[0].children;
    children.forEach((element) => {
        const route = element.children;
        if (route == undefined) {
            return;
        }
        else {
            if (route[0] == undefined) {
                routes[element.attribs.path] = {
                    path: element.attribs.path,
                    dest: element.attribs.dest,
                    type: element.attribs.type,
                };
            }
            else {
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
