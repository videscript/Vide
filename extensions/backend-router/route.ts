import { Clean } from "../../index";

let routes: object = {};
let index;
Clean.forEach((r: any, num: Number) => {
    const file: string = r("Router").html();
    if (file == null) {
        return;
    } else {
        index = num;
    }
});

let router: any = Clean[index];

let children = router("Router").get()[0].children;

children.forEach((element: Object) => {
    const route: Object = element.children;
    if (route == undefined) {
        return;
    } else {
        if (route[0] == undefined) {
            routes[element.attribs.path] = {
                path: element.attribs.path,
                dest: element.attribs.dest,
                type: element.attribs.type,
            };
        } else {
            routes[element.attribs.path] = {
                callback: route[0].data,
                path: element.attribs.path,
                dest: element.attribs.dest,
                type: element.attribs.type,
            };
        }
    }
});

export default routes;
