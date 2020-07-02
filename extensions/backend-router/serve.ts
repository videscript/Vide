import routes from "./route";
import { config } from "../../config";
var http = require("http");
var fs = require("fs");

const paths: Object = {};
Object.keys(routes).forEach((key: string) => {
    const route: object = routes[key];
    let callback = new Function(route.callback);
    const func: any = callback();
    if (func == undefined) {
        const html = fs.readFileSync(
            config.outDir + "/" + route.dest.split(".vide")[0] + ".html" ||
                "./" + route.dest.split(".vide")[0] + ".html",
            "utf-8"
        );
        if (route.type == "404") {
            paths["404"] = {
                body: html,
                type: "text/html",
                file: route.dest,
                full: route,
            };
        } else {
            paths[key] = {
                body: html,
                type: "text/html",
                file: route.dest,
                full: route,
            };
        }
        // return "Bad";
    } else {
        if (route.type == "404") {
            paths["404"] = {
                body: func.content,
                type: func["content-type"],
                full: route,
            };
        } else {
            paths[key] = {
                body: func.content,
                type: func["content-type"],
                full: route,
            };
        }
    }
});
http.createServer(async function (req: any, res: any) {
    let path: string = req.url;
    res.writeHead(202, { "Transfer-Encoding": "" });
    if (path.includes(".css")) {
        res.write(fs.readFileSync(config.outDir + path || "." + path, "utf-8"));
    }

    if (path.includes(".js")) {
        res.write(fs.readFileSync(config.outDir + path || "." + path, "utf-8"));
    }

    if (path.includes(".png" || ".PNG")) {
        res.write(fs.readFileSync(config.outDir + path || "." + path, "utf-8"));
    }

    if (path.includes(".jpeg" || ".jpg")) {
        res.write(fs.readFileSync(config.outDir + path || "." + path, "utf-8"));
    }

    if (paths[path] != undefined) {
        res.writeHead(202, { "Content-Type": paths[path].type });
        if (paths[path].type == "text/json") {
            res.write(JSON.stringify(paths[path].body));
        } else {
            res.write(paths[path].body);
        }
    }
    if (paths[path] == undefined) {
        console.log(paths["404"]);
        if (paths["404"] == undefined) {
            res.writeHead(202, { "Content-Type": "text/html" });
            res.write(
                `<h1>404</h1><h3>Vide page not found...</h3><p>Requested page: ${path} does not exist.</p>`
            );
        } else {
            res.writeHead(202, { "Content-Type": paths["404"].type });
            if (paths["404"].type == "text/json") {
                res.write(JSON.stringify(paths["404"].body));
            } else {
                res.write(paths["404"].body);
            }
        }
    }
    res.end();
}).listen(3000);
