// const path = require('path');
import path from "path";
import fs from "fs";
let dJSON = require("dirty-json");
const colors = require("colors");

console.log("●".blue + " Reading config");
let executable: Function;
const walkSync = (dir: any, filelist: Array<any> = []) => {
    fs.readdirSync(dir).forEach((file: string) => {
        filelist = fs.statSync(path.join(dir, file)).isDirectory()
            ? walkSync(path.join(dir, file), filelist)
            : filelist.concat(path.join(dir, file));
    });
    return filelist;
};
let dir = walkSync(".");
let supported: Array<string> = [];
for (let i: number = 0; i < dir.length; i++) {
    let file: string = dir[i];
    if (file.includes("videfile")) {
        supported.push(file);
    } else {
        let undefined = true;
    }
}

if (supported.length > 1) {
    throw "Two videfiles detected expected one.";
}
let Config;
const unproper: string = fs.readFileSync("./" + supported[0], "utf-8");
if (unproper.includes("use non-standard")) {
    let lex: Array<string> = unproper.split("\n");
    lex.shift();
    let tokens: Array<Object> = [];
    lex.forEach((tok, num) => {
        if (tok.includes("//")) {
            // let comment = tok.indexOf('//');
            lex.splice(num, num);
        } else if (tok.includes("run {")) {
            const multi: Array<string> = [];
            const endLine: Array<any> = lex.filter((i: any) => {
                return i == "}";
            });
            const end = lex.indexOf(endLine[0]);
            const firstLine: Array<string> = lex.filter((i: any) => {
                return i == "run {";
            })[0];
            const innerTokens = lex.slice(lex.indexOf(firstLine), end);
            innerTokens.splice(0, 1);
            const final: Array<string> = innerTokens.map((item) => item.trim());
            const render: string = final.join("\n");
            executable = new Function(render);
        } else {
            let func: Array<string> = tok.split(" ");
            if (func[0] == "") {
                return;
            } else {
                const build: Object = {
                    func: func[0],
                    args: func[1],
                    line: num,
                };
                tokens.push(build);
            }
        }
    });
    let blank: any = {};
    for (let i = 0; i < tokens.length; i++) {
        let pointer: any = tokens[i];
        if (pointer.func == "}") {
            continue;
        } else {
            blank[pointer.func] = pointer.args;
        }
        // let truearg = pointer.args.replace(/"/g, '')
    }
    Config = blank;
} else {
    let proper: string = `{\n${unproper}\n}`;
    try {
        Config = dJSON.parse(proper);
    } catch (err) {
        throw "Using non standard library in standard module.";
    }
}
export const config = Config;
export const run = executable;
