var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./config", "./index", "fs"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Components = exports.headers = void 0;
    const config_1 = require("./config");
    const index_1 = require("./index");
    const fs_1 = __importDefault(require("fs"));
    console.log('● building html');
    const domCollection = [];
    let col;
    let components = {};
    let fullHead = [];
    index_1.Dom.forEach((Dom) => {
        let Headers = {};
        index_1.$.forEach(($) => {
            Dom
                .get()
                .forEach((element) => {
                let attr = JSON.parse(JSON.stringify(element.attribs));
                let params = Object.keys(element.attribs);
                col = {
                    attribs: element.attribs,
                    type: element.type,
                    'tag-name': element.name,
                    innerText: element.children[0].data.trim(),
                    length: element.children.length,
                };
                domCollection.push(col);
                if (col['tag-name'] == 'component') {
                    if (col.attribs.name == undefined) {
                        throw 'Expected name attribute instead got undefined';
                    }
                    if (col.attribs.type == undefined) {
                        throw 'Expected type attribute instead got undefined';
                    }
                    components[col.attribs.name] = col;
                }
            });
            if ($('Vide').get()[0].attribs.name != undefined) {
                Headers.name = $('Vide').get()[0].attribs.name;
            }
            else {
                Headers.name = 'Vide app';
            }
            const state = config_1.config.outDir + `/${$.prototype.name.split('.vide')[0].split('.vide')[0] || 'html'}.html` || '.' + `/${$.prototype.name.split('.vide')[0] || 'html'}.html`;
            try {
                fs_1.default.unlinkSync(state);
            }
            catch (err) {
                let non = null;
            }
            $('Vide').get()[0].children.forEach(element => {
                element.data = '';
            });
            let render = $('Vide component').remove().end().children().html().trim();
            let fullTemp = `
        <!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${Headers.name || 'Vide app'}</title>
    <link rel="stylesheet" href="css-${$.prototype.name.split('.vide')[0]}.css">
</head>
<body>
${render}
</body>
</html>
`;
            if (config_1.config.outDir + '/' == 'undefined/') {
                fs_1.default.appendFileSync(`./${$.prototype.name.split('.vide')[0] || 'html'}.html`, fullTemp);
            }
            else {
                try {
                    fs_1.default.appendFileSync(config_1.config.outDir + `/${$.prototype.name.split('.vide')[0] || 'html'}.html`, fullTemp);
                }
                catch (err) {
                    console.log(`${config_1.config.outDir}/ does not exist.`);
                }
            }
        });
    });
    exports.headers = fullHead;
    exports.Components = components;
});
