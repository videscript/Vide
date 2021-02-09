var __importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};!function(e){if("object"==typeof module&&"object"==typeof module.exports){var t=e(require,exports);void 0!==t&&(module.exports=t)}else"function"==typeof define&&define.amd&&define(["require","exports","./route","../../config"],e)}(function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=__importDefault(e("./route")),i=e("../../config"),n=e("http"),d=e("fs"),r=e("chalk"),l={};Object.keys(o.default).forEach(e=>{const t=o.default[e],n=new Function(t.callback)();if(null==n){const o=d.readFileSync(`${i.config.outDir}/${t.dest.split(".vide")[0]}.html`||`./${t.dest.split(".vide")[0]}.html`,"utf-8");"404"==t.type?l[404]={body:o,type:"text/html",file:t.dest,full:t}:l[e]={body:o,type:"text/html",file:t.dest,full:t}}else"404"==t.type?l[404]={body:n.content,type:n.type,full:t}:l[e]={body:n.content,type:n.type,full:t}});let s=0;n.createServer(async(e,t)=>{const o=e.url;t.writeHead(202,{"Transfer-Encoding":""}),o.includes(".css")&&t.write(d.readFileSync(i.config.outDir+o||`.${o}`,"utf-8")),o.includes(".js")&&t.write(d.readFileSync(i.config.outDir+o||`.${o}`,"utf-8")),o.includes(".png")&&t.write(d.readFileSync(i.config.outDir+o||`.${o}`,"utf-8")),o.includes(".jpeg")&&t.write(d.readFileSync(i.config.outDir+o||`.${o}`,"utf-8")),o.includes(".ttf")&&t.write(d.readFileSync(i.config.outDir+o||`.${o}`,"utf-8")),void 0!==l[o]&&(t.writeHead(202,{"Content-Type":l[o].type}),"text/json"===l[o].type?t.write(JSON.stringify(l[o].body)):t.write(l[o].body)),void 0===l[o]&&(void 0===l[404]?(t.writeHead(202,{"Content-Type":"text/html"}),t.write(`<h1>404</h1><h3>Vide page not found...</h3><p>Requested page: ${o} does not exist.</p>`)):(t.writeHead(202,{"Content-Type":l[404].type}),"text/json"===l[404].type?t.write(JSON.stringify(l[404].body)):t.write(l[404].body)),t.statusCode=404),t.end(),console.log(`\n\nid: ${s} \nstatus:${t.statusCode}\nLoaded path: ${o}\nfrom: ${e.headers.host}\nwith data: ${e.headers["user-agent"]}`),s++}).listen(3e3),console.log(`${r.blue("●")} Web link: http://localhost:3000`)});