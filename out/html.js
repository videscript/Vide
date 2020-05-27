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
    const config_1 = require("./config");
    const index_1 = require("./index");
    const fs_1 = __importDefault(require("fs"));
    const domCollection = [];
    let col;
    let components;
    index_1.Dom
        .get()
        .forEach((element) => {
        let attr = JSON.parse(JSON.stringify(element.attribs));
        let params = Object.keys(element.attribs);
        params.forEach((data) => {
            if (element.children.length > 2) {
                col = {
                    attribs: element.attribs,
                    type: element.type,
                    'tag-name': element.name,
                    innerText: element.children[0].data.trim(),
                    length: element.children.length,
                };
            }
            else {
                col = {
                    attribs: element.attribs,
                    type: element.type,
                    'tag-name': element.name,
                    innerText: index_1.$(`Vide component[name=${element.attribs.name}]`).children().html(),
                    length: element.children.length,
                    fullParse: element.children
                };
            }
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
    });
    let render = index_1.$('Vide component').remove().end().html();
    let fullTemp = `
<!DOCTYPE html>
<html>
<head>
<title>hello</title>
<link rel="stylesheet" href="css.css">
</head>
<body>
	${render}
</body>
</html>
`;
    if (config_1.config.outDir + '/' == 'undefined/') {
        fs_1.default.appendFileSync('./html.html', fullTemp);
    }
    else {
        try {
            fs_1.default.appendFileSync(config_1.config.outDir + '/html.html', fullTemp);
        }
        catch (err) {
            console.log(`${config_1.config.outDir}/ does not exist.`);
        }
    }
});
