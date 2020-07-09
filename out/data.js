"use strict";
/*

REGULAR EXPRESSION FOR MATCHING TEMPLATES: \$(\s*\w+\s*)\$
TEMPLATE SYNTAX: $javascript variable$

*/
const parser = (s) => s.match(new RegExp(/\$(\s*\w+\s*)\$/g));
let string = "my name is $name$ and I'm doing $f$";
const found = parser(string);
let parsed;
found.forEach((point) => {
    parsed = string.replace(point, 'hi');
});
console.log(parsed);
