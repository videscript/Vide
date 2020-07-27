var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "fs", "process", "./config", "./index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.scripts = exports.Components = exports.headers = void 0;
    const fs_1 = __importDefault(require("fs"));
    const process_1 = require("process");
    const config_1 = require("./config");
    const index_1 = require("./index");
    const chalk = require('chalk');
    console.log(`${chalk.blue('●')} building html`);
    const domCollection = [];
    let col;
    const components = {};
    const fullHead = [];
    const js = [];
    const written = [];
    index_1.Dom.forEach((Dom) => {
        const Headers = {};
        index_1.$.forEach(($) => {
            if (Object.keys($('Vide').get()[0].attribs).includes('script')) {
                if (js.includes({
                    js: $('Vide').text().trim().split('\n'),
                    from: $.prototype.name
                })) {
                }
                else {
                    console.log(`${chalk.blue('   ●')} compiling JS script: ${$.prototype.name}`);
                    js.push({
                        js: $('Vide').text().trim().split('\n'),
                        from: $.prototype.name
                    });
                    // written.push()
                }
            }
            else {
                Dom.get().forEach((element, num) => {
                    const attr = JSON.parse(JSON.stringify(element.attribs));
                    const params = Object.keys(element.attribs);
                    if (element.children[0] === undefined) {
                        col = {
                            attribs: element.attribs,
                            type: element.type,
                            'tag-name': element.name,
                            length: element.children.length
                        };
                    }
                    else {
                        col = {
                            attribs: element.attribs,
                            type: element.type,
                            'tag-name': element.name,
                            innerText: element.children[0].data,
                            fullText: index_1.Clean.filter((r) => r(`component[name=${element.attribs.name}]`).html() != null)[0],
                            length: element.children.length
                        };
                    }
                    domCollection.push(col);
                    if (col['tag-name'] === 'component') {
                        if (col.attribs.name === undefined) {
                            console.log(`${chalk.red('   ● ')}Expected name attribute instead got undefined`);
                            process_1.exit();
                        }
                        if (col.attribs.type === undefined) {
                            console.log(`${chalk.red('   ● ')}Expected type attribute instead got undefined`);
                            process_1.exit();
                        }
                        components[col.attribs.name] = col;
                    }
                });
                const videAttr = $('Vide').get()[0].attribs;
                if (videAttr.name !== undefined) {
                    Headers.name = $('Vide').get()[0].attribs.name;
                }
                else {
                    Headers.name = 'Vide app';
                }
                if (config_1.config.outDir === undefined) {
                    if (fs_1.default.existsSync(`./${$.prototype.name.split('.vide')[0] || 'html'}.html`)) {
                        fs_1.default.unlinkSync(`./${$.prototype.name.split('.vide')[0] || 'html'}.html`);
                    }
                }
                else if (fs_1.default.existsSync(`${config_1.config.outDir}/${$.prototype.name.split('.vide')[0] || 'html'}.html`)) {
                    fs_1.default.unlinkSync(`${config_1.config.outDir}/${$.prototype.name.split('.vide')[0]}.html`);
                }
                if (Object.keys(videAttr).includes('router')) {
                    if (written.includes($.prototype.name)) {
                        console.log(`${chalk.blue('   ●')} skipping ${$.prototype.name} due to type being router`);
                        written.push($.prototype.name);
                    }
                }
                else {
                    $('Vide')
                        .get()[0]
                        .children.forEach((element) => {
                        element.data = '';
                    });
                    $('Router').remove();
                    const render = $('Vide component').remove().end().children().html().trim();
                    const fullTemp = `
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
                    if (`${config_1.config.outDir}/` === 'undefined/') {
                        fs_1.default.appendFileSync(`./${$.prototype.name.split('.vide')[0] || 'html'}.html`, fullTemp);
                    }
                    else {
                        try {
                            fs_1.default.appendFileSync(`${config_1.config.outDir}/${$.prototype.name.split('.vide')[0] || 'html'}.html`, fullTemp);
                        }
                        catch (err) {
                            console.log(`${chalk.red('●')} ${config_1.config.outDir}/ does not exist.`);
                        }
                    }
                }
            }
        });
    });
    exports.headers = fullHead;
    exports.Components = components;
    exports.scripts = js;
    const jsParser = require('./script-parser');
});
