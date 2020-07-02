var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "path", "fs"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.run = exports.config = void 0;
    // const path = require('path');
    const path_1 = __importDefault(require("path"));
    const fs_1 = __importDefault(require("fs"));
    let dJSON = require("dirty-json");
    const colors = require("colors");
    console.log("●".blue + " Reading config");
    let executable;
    const walkSync = (dir, filelist = []) => {
        fs_1.default.readdirSync(dir).forEach((file) => {
            filelist = fs_1.default.statSync(path_1.default.join(dir, file)).isDirectory()
                ? walkSync(path_1.default.join(dir, file), filelist)
                : filelist.concat(path_1.default.join(dir, file));
        });
        return filelist;
    };
    let dir = walkSync(".");
    let supported = [];
    for (let i = 0; i < dir.length; i++) {
        let file = dir[i];
        if (file.includes("videfile")) {
            supported.push(file);
        }
        else {
            let undefined = true;
        }
    }
    if (supported.length > 1) {
        throw "Two videfiles detected expected one.";
    }
    let Config;
    const unproper = fs_1.default.readFileSync("./" + supported[0], "utf-8");
    if (unproper.includes("use non-standard")) {
        let lex = unproper.split("\n");
        lex.shift();
        let tokens = [];
        lex.forEach((tok, num) => {
            if (tok.includes("//")) {
                // let comment = tok.indexOf('//');
                lex.splice(num, num);
            }
            else if (tok.includes("run {")) {
                const multi = [];
                const endLine = lex.filter((i) => {
                    return i == "}";
                });
                const end = lex.indexOf(endLine[0]);
                const firstLine = lex.filter((i) => {
                    return i == "run {";
                })[0];
                const innerTokens = lex.slice(lex.indexOf(firstLine), end);
                innerTokens.splice(0, 1);
                const final = innerTokens.map((item) => item.trim());
                const render = final.join("\n");
                executable = new Function(render);
            }
            else {
                let func = tok.split(" ");
                if (func[0] == "") {
                    return;
                }
                else {
                    const build = {
                        func: func[0],
                        args: func[1],
                        line: num,
                    };
                    tokens.push(build);
                }
            }
        });
        let blank = {};
        for (let i = 0; i < tokens.length; i++) {
            let pointer = tokens[i];
            if (pointer.func == "}") {
                continue;
            }
            else {
                blank[pointer.func] = pointer.args;
            }
            // let truearg = pointer.args.replace(/"/g, '')
        }
        Config = blank;
    }
    else {
        let proper = `{\n${unproper}\n}`;
        try {
            Config = dJSON.parse(proper);
        }
        catch (err) {
            throw "Using non standard library in standard module.";
        }
    }
    exports.config = Config;
    exports.run = executable;
});
