import { config } from "./config";
import { Dom, $ } from "./index";
import fs from "fs";
const colors = require("colors");

console.log("●".blue + " building html");

const domCollection: Array<any> = [];
let col: any;
let components: any = {};
let fullHead: Array<any> = [];

Dom.forEach((Dom: any) => {
    let Headers: any = {};

    $.forEach(($) => {
        Dom.get().forEach((element: any) => {
            let attr = JSON.parse(JSON.stringify(element.attribs));
            let params = Object.keys(element.attribs);
            if (element.children[0] == undefined) {
                col = {
                    attribs: element.attribs,
                    type: element.type,
                    "tag-name": element.name,
                    length: element.children.length,
                };
            } else {
                col = {
                    attribs: element.attribs,
                    type: element.type,
                    "tag-name": element.name,
                    innerText: element.children[0].data,
                    length: element.children.length,
                };
            }
            domCollection.push(col);
            if (col["tag-name"] == "component") {
                if (col.attribs.name == undefined) {
                    throw "Expected name attribute instead got undefined";
                }
                if (col.attribs.type == undefined) {
                    throw "Expected type attribute instead got undefined";
                }
                components[col.attribs.name] = col;
            }
        });

        if ($("Vide").get()[0].attribs.name != undefined) {
            Headers.name = $("Vide").get()[0].attribs.name;
        } else {
            Headers.name = "Vide app";
        }

        const state: string =
            config.outDir +
                `/${
                    $.prototype.name.split(".vide")[0].split(".vide")[0] ||
                    "html"
                }.html` ||
            "." + `/${$.prototype.name.split(".vide")[0] || "html"}.html`;
        try {
            fs.unlinkSync(state);
        } catch (err) {
            let non: null = null;
        }
        $("Vide")
            .get()[0]
            .children.forEach((element) => {
                element.data = "";
            });
        $("Router").remove();
        let render: string = $("Vide component")
            .remove()
            .end()
            .children()
            .html()
            .trim();
        let fullTemp = `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${Headers.name || "Vide app"}</title>
    <link rel="stylesheet" href="css-${$.prototype.name.split(".vide")[0]}.css">
</head>
<body>
${render}
</body>
</html>
`;
        if (config.outDir + "/" == "undefined/") {
            fs.appendFileSync(
                `./${$.prototype.name.split(".vide")[0] || "html"}.html`,
                fullTemp
            );
        } else {
            try {
                fs.appendFileSync(
                    config.outDir +
                        `/${$.prototype.name.split(".vide")[0] || "html"}.html`,
                    fullTemp
                );
            } catch (err) {
                console.log("●".red + `${config.outDir}/ does not exist.`);
            }
        }
    });
});
export const headers = fullHead;

export let Components = components;
