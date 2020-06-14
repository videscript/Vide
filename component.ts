import { Clean } from "./index";
import { Components } from "./html";
import { config } from "./config";

import fs from 'fs'
const comps: Array<any> = Components;
const keys = Object.keys(comps);
const valid: Array<any> = [];
console.log('● Compiling components')
Clean.forEach(($) => {
    let comps = $('component');
    Object.keys(comps).forEach(compKey => {
        let attrs: any = comps[compKey].attribs;
        if (attrs == undefined) {
            return
        } else {
            attrs.from = $.prototype.name;
            valid.push(attrs)
        }
    })

})

valid.forEach((attr: any) => {
    const comp = comps[attr.name];
    comp.from = attr.from;
    console.log(`   ● Built component named: ${attr.name}`)
});

//import 
Clean.forEach(($) => {
    $('import').get().forEach((el: any) => {
        const req: string = el.attribs.name;
        const data = comps[req];
        if (data.attribs.type == 'css') {
            const fullTemp = `
/* From ${data.attribs.name} in file ${data.from}*/
${data.innerText}`
            $.prototype.name = $.prototype.name.split('.vide')[0]
            if (config.outDir == undefined) {
                const origin: string = fs.readFileSync(`./css-${$.prototype.name}.css`, 'utf-8')
                if (fs.existsSync(`./css-${$.prototype.name}.css`)) {
                    fs.unlinkSync(`./css-${$.prototype.name}.css`)
                }
                fs.writeFileSync(`./css-${$.prototype.name}.css`, origin + '\n' + fullTemp)
            } else {
                const origin: string = fs.readFileSync(config.outDir + `/css-${$.prototype.name}.css`, 'utf-8')
                if (fs.existsSync(config.outDir + `/css-${$.prototype.name}.css`)) {
                    fs.unlinkSync(config.outDir + `/css-${$.prototype.name}.css`)
                }
                fs.writeFileSync(config.outDir + `/css-${$.prototype.name}.css`, origin + '\n' + fullTemp)
            }
        }

    });
})
console.log(`   ● Rendered imports`)
