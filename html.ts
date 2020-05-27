import { config } from "./config";
import { Dom, $ } from "./index";
import fs from "fs";
const domCollection: Array<any> = []
let col: any;
let components: any;
Dom
    .get()
    .forEach((element: any) => {
        let attr = JSON.parse(JSON.stringify(element.attribs));
        let params = Object.keys(element.attribs);
        params.forEach((data: any) => {
            if (element.children.length > 2) {
                col = {
                    attribs: element.attribs,
                    type: element.type,
                    'tag-name': element.name,
                    innerText: element.children[0].data.trim(),
                    length: element.children.length,
                };
            } else {
                col = {
                    attribs: element.attribs,
                    type: element.type,
                    'tag-name': element.name,
                    innerText: $(`Vide component[name=${element.attribs.name}]`).children().html(),
                    length: element.children.length,
                    fullParse: element.children
                }
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
    })

let render: string = $('Vide component').remove().end().html();

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
`

if (config.outDir + '/' == 'undefined/') {
    fs.appendFileSync('./html.html', fullTemp)
} else {
    try {
    fs.appendFileSync(config.outDir + '/html.html', fullTemp)
    }catch(err) {
        console.log(`${config.outDir}/ does not exist.`)
    }
}