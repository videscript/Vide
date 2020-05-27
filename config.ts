// const path = require('path');
import path from "path";
import fs from "fs";
let dJSON = require('dirty-json');
const walkSync = (dir: any, filelist: Array<any> = []) => {
    fs.readdirSync(dir).forEach((file: string) => {

        filelist = fs.statSync(path.join(dir, file)).isDirectory()
            ? walkSync(path.join(dir, file), filelist)
            : filelist.concat(path.join(dir, file));

    });
    return filelist;
}
let dir = walkSync('.');
let supported: Array<string> = []
for (let i: number = 0; i < dir.length; i++) {
    let file: string = dir[i]
    if (file.includes('videfile')) {
        supported.push(file)
    } else {
        let undefined = true;
    }
}

if (supported.length > 1) {
    throw 'Two videfiles detected expected one.'
}
let Config;
const unproper: string = fs.readFileSync(supported[0], 'utf-8');
if (unproper.includes('use non-standard')) {
    let lex: Array<string> = unproper.split('\n');
    lex.shift();
    let tokens: Array<Object> = []
    lex.forEach((tok, num) => {
        if (tok.includes('//')) {
            // let comment = tok.indexOf('//');
            lex.splice(num, num)
        } else {
            let func: Array<string> = tok.split(' ')
            if (func[0] == '') {
                return;
            } else {
                let build: object = {
                    func: func[0],
                    args: func[1],
                    line: num
                }
                tokens.push(build)
            }
        }
    })
    let blank: any = {}
    for (let i = 0; i < tokens.length; i++) {
        let pointer: any = tokens[i]
        let truearg = pointer.args.replace(/"/g, '')
        blank[pointer.func] = truearg;
    }
    Config = blank;
} else {
    let proper: string = `{\n${unproper}\n}`
    try {
        Config = dJSON.parse(proper);
    } catch (err) {
        throw 'Using non standard library in standard module.'
    }
}
export const config = Config;
