/*

REGULAR EXPRESSION FOR MATCHING TEMPLATES: \$(\s*\w+\s*)\$
TEMPLATE SYNTAX: $javascript variable$

*/
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    import { timeStamp } from 'console';
    
    const parser = (s: string) => s.match(new RegExp(/\$(\s*\w+\s*)\$/g));
    
    let string: string = "my name is $name$ and I'm doing $f$";
    
    const found: any = parser(string);
    let parsed: string;
    found.forEach((point: string) => {
        parsed = string.replace(point, 'hi');
    });
    const importString = '<import name="hello"></import>';
    */
    const tokens = [];
    let fulltemp = '';
    class videEvent {
        // main!: Function;
        constructor() {
            this.event = this.main();
            const element = this.event.target;
            const { event } = this.event;
            const callString = this.event.callback.toString();
            const tempString = `
        document.querySelector(${element}).addEventListener(${event}, ${callString})
        `;
            tokens.push(tempString);
            this.build();
        }
        build() {
            tokens.forEach((item) => {
                if (fulltemp.includes(item)) {
                }
                else {
                    fulltemp += item;
                }
            });
            console.log(fulltemp);
        }
    }
    exports.default = videEvent;
});
