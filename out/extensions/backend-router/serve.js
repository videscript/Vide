var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./route", "../../config"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const route_1 = __importDefault(require("./route"));
    const config_1 = require("../../config");
    const http = require("http");
    const fs = require("fs");
    const colors = require("colors");
    const paths = {};
    Object.keys(route_1.default).forEach((key) => {
        const route = route_1.default[key];
        let callback = new Function(route.callback);
        const func = callback();
        if (func == undefined) {
            const html = fs.readFileSync(config_1.config.outDir + "/" + route.dest.split(".vide")[0] + ".html" ||
                "./" + route.dest.split(".vide")[0] + ".html", "utf-8");
            if (route.type == "404") {
                paths["404"] = {
                    body: html,
                    type: "text/html",
                    file: route.dest,
                    full: route,
                };
            }
            else {
                paths[key] = {
                    body: html,
                    type: "text/html",
                    file: route.dest,
                    full: route,
                };
            }
            // return "Bad";
        }
        else {
            if (route.type == "404") {
                paths["404"] = {
                    body: func.content,
                    type: func["content-type"],
                    full: route,
                };
            }
            else {
                paths[key] = {
                    body: func.content,
                    type: func["content-type"],
                    full: route,
                };
            }
        }
    });
    http.createServer(async function (req, res) {
        let path = req.url;
        res.writeHead(202, { "Transfer-Encoding": "" });
        if (path.includes(".css")) {
            res.write(fs.readFileSync(config_1.config.outDir + path || "." + path, "utf-8"));
        }
        if (path.includes(".js")) {
            res.write(fs.readFileSync(config_1.config.outDir + path || "." + path, "utf-8"));
        }
        if (path.includes(".png" || ".PNG")) {
            res.write(fs.readFileSync(config_1.config.outDir + path || "." + path, "utf-8"));
        }
        if (path.includes(".jpeg" || ".jpg")) {
            res.write(fs.readFileSync(config_1.config.outDir + path || "." + path, "utf-8"));
        }
        if (paths[path] != undefined) {
            res.writeHead(202, { "Content-Type": paths[path].type });
            console.log(`Loaded path: ${path} - with data: ${JSON.stringify(paths[path])}`);
            if (paths[path].type == "text/json") {
                res.write(JSON.stringify(paths[path].body));
            }
            else {
                res.write(paths[path].body);
            }
        }
        if (paths[path] == undefined) {
            if (paths["404"] == undefined) {
                res.writeHead(202, { "Content-Type": "text/html" });
                res.write(`<h1>404</h1><h3>Vide page not found...</h3><p>Requested page: ${path} does not exist.</p>`);
            }
            else {
                res.writeHead(202, { "Content-Type": paths["404"].type });
                if (paths["404"].type == "text/json") {
                    res.write(JSON.stringify(paths["404"].body));
                }
                else {
                    res.write(paths["404"].body);
                }
            }
        }
        res.end();
    }).listen(3000);
    console.log("●".blue + " Web link: http://localhost:3000");
});
