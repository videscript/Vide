import {config} from './config';
import {Dom, $, Clean} from './index';
import fs from 'fs';
import {exit} from 'process';
const colors = require('colors');

console.log('●'.blue + ' building html');

const domCollection: Array<any> = [];
let col: any;
const components: any = {};
const fullHead: Array<any> = [];
interface jsArrray {
    js: Array<string>;
    from: string;
}
let js: Array<jsArrray> = [];
Dom.forEach((Dom: any) => {
    const Headers: any = {};

    $.forEach(($: any) => {
        if (Object.keys($('Vide').get()[0].attribs).includes('script')) {
            console.log(
                '   ●'.blue + ' compiling JS script: ' + $.prototype.name
            );
            js.push({
                js: $('Vide').text().trim().split('\n'),
                from: $.prototype.name,
            });
        } else {
            Dom.get().forEach((element: any, num: number) => {
                const attr = JSON.parse(JSON.stringify(element.attribs));
                const params = Object.keys(element.attribs);
                if (element.children[0] === undefined) {
                    col = {
                        attribs: element.attribs,
                        type: element.type,
                        'tag-name': element.name,
                        length: element.children.length,
                    };
                } else {
                    col = {
                        attribs: element.attribs,
                        type: element.type,
                        'tag-name': element.name,
                        innerText: element.children[0].data,
                        fullText: Clean.filter(
                            (r: any) =>
                                r(
                                    `component[name=${element.attribs.name}]`
                                ).html() != null
                        )[0],
                        length: element.children.length,
                    };
                }
                domCollection.push(col);
                if (col['tag-name'] === 'component') {
                    if (col.attribs.name === undefined) {
                        console.log(
                            '   ● '.red +
                                'Expected name attribute instead got undefined'
                        );
                        exit();
                    }
                    if (col.attribs.type === undefined) {
                        console.log(
                            '   ● '.red +
                                'Expected type attribute instead got undefined'
                        );
                        exit();
                    }
                    components[col.attribs.name] = col;
                }
            });
            const videAttr = $('Vide').get()[0].attribs;
            if (videAttr.name !== undefined) {
                Headers.name = $('Vide').get()[0].attribs.name;
            } else {
                Headers.name = 'Vide app';
            }
            if (config.outDir === undefined) {
                if (
                    fs.existsSync(
                        `./${$.prototype.name.split('.vide')[0] || 'html'}.html`
                    )
                ) {
                    fs.unlinkSync(
                        `./${$.prototype.name.split('.vide')[0] || 'html'}.html`
                    );
                }
            } else {
                if (
                    fs.existsSync(
                        `${config.outDir}/${
                            $.prototype.name.split('.vide')[0] || 'html'
                        }.html`
                    )
                ) {
                    fs.unlinkSync(
                        `${config.outDir}/${
                            $.prototype.name.split('.vide')[0]
                        }.html`
                    );
                }
            }
            if (Object.keys(videAttr).includes('router')) {
                console.log(
                    '   ●'.blue +
                        ' skipping ' +
                        $.prototype.name +
                        ' due to type being router'
                );
            } else {
                $('Vide')
                    .get()[0]
                    .children.forEach((element: Record<string, any>) => {
                        element.data = '';
                    });
                $('Router').remove();
                const render: string = $('Vide component')
                    .remove()
                    .end()
                    .children()
                    .html()
                    .trim();
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
                if (config.outDir + '/' === 'undefined/') {
                    fs.appendFileSync(
                        `./${
                            $.prototype.name.split('.vide')[0] || 'html'
                        }.html`,
                        fullTemp
                    );
                } else {
                    try {
                        fs.appendFileSync(
                            config.outDir +
                                `/${
                                    $.prototype.name.split('.vide')[0] || 'html'
                                }.html`,
                            fullTemp
                        );
                    } catch (err) {
                        console.log(
                            '●'.red + ` ${config.outDir}/ does not exist.`
                        );
                    }
                }
            }
        }
    });
});
export const headers = fullHead;

export const Components = components;
export const scripts = js;
const jsParser = require('./script-parser');
