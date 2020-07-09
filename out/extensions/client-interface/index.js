/*

This is the client interface for interacting with vide components
and such from the browser and not in the compiler.

Ideas:

- Making template components
- Components state driven (Using events to show components)
-

*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../component", "process"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const component_1 = __importDefault(require("../../component"));
    const process_1 = require("process");
    class vide {
        constructor() {
            this.component = this.main().target;
            this.exist = component_1.default;
            this.hook = this.main().hook;
            this.check = this.exist.filter((r) => {
                return r.attribs.name === this.component;
            })[0];
            if (this.check === undefined) {
                console.error(`Vide Error: selected component ${this.component} does not exist`);
                process_1.exit();
            }
            if (this.hook() == true) {
                console.log('hi');
            }
        }
    }
    class Idk extends vide {
        main() {
            return ({
                target: 'the',
                hook: (status = false) => {
                    if ('hi' == 'hi') {
                        status = true;
                    }
                    return status;
                },
            });
        }
    }
    new Idk().main();
    exports.default = vide;
});
