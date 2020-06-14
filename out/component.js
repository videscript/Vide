var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./index", "./html", "./config", "fs"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const index_1 = require("./index");
    const html_1 = require("./html");
    const config_1 = require("./config");
    const fs_1 = __importDefault(require("fs"));
    const comps = html_1.Components;
    const keys = Object.keys(comps);
    const valid = [];
    console.log('● Compiling components');
    index_1.Clean.forEach(($) => {
        let comps = $('component');
        Object.keys(comps).forEach(compKey => {
            let attrs = comps[compKey].attribs;
            if (attrs == undefined) {
                return;
            }
            else {
                attrs.from = $.prototype.name;
                valid.push(attrs);
            }
        });
    });
    valid.forEach((attr) => {
        const comp = comps[attr.name];
        comp.from = attr.from;
        console.log(`   ● Built component named: ${attr.name}`);
    });
    //import 
    index_1.Clean.forEach(($) => {
        $('import').get().forEach((el) => {
            const req = el.attribs.name;
            const data = comps[req];
            if (data.attribs.type == 'css') {
                const fullTemp = `
/* From ${data.attribs.name} in file ${data.from}*/
${data.innerText}`;
                $.prototype.name = $.prototype.name.split('.vide')[0];
                if (config_1.config.outDir == undefined) {
                    const origin = fs_1.default.readFileSync(`./css-${$.prototype.name}.css`, 'utf-8');
                    if (fs_1.default.existsSync(`./css-${$.prototype.name}.css`)) {
                        fs_1.default.unlinkSync(`./css-${$.prototype.name}.css`);
                    }
                    fs_1.default.writeFileSync(`./css-${$.prototype.name}.css`, origin + '\n' + fullTemp);
                }
                else {
                    const origin = fs_1.default.readFileSync(config_1.config.outDir + `/css-${$.prototype.name}.css`, 'utf-8');
                    if (fs_1.default.existsSync(config_1.config.outDir + `/css-${$.prototype.name}.css`)) {
                        fs_1.default.unlinkSync(config_1.config.outDir + `/css-${$.prototype.name}.css`);
                    }
                    fs_1.default.writeFileSync(config_1.config.outDir + `/css-${$.prototype.name}.css`, origin + '\n' + fullTemp);
                }
            }
        });
    });
    console.log(`   ● Rendered imports`);
});
