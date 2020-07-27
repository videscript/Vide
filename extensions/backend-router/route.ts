import { exit } from 'process';
import { Clean } from '../../index';

const routes: any = {};
let index;
const colors = require('colors');

console.log(`${'●'.blue} compiling routes`);
Clean.forEach((r: any, num: number) => {
  const file: string = r('Router').html();
  if (file == null) {

  } else {
    index = num;
  }
});

const router: any = Clean[index];
if (router == undefined) {
  console.log('Router enabled but no router found');
  exit();
}
const { children } = router('Router').get()[0];

children.forEach((element: Record<string, any>) => {
  const route: Record<string, any> = element.children;
  if (route == undefined) {

  } else if (route[0] === undefined) {
    if (element.attribs.path === '*') {
      console.log(`${'●'.blue}    built route: ${element.attribs.type}`);
    } else {
      console.log(`${'●'.blue}    built route: ${element.attribs.path}`);
    }
    routes[element.attribs.path] = {
      path: element.attribs.path,
      dest: element.attribs.dest,
      type: element.attribs.type,
    };
  } else {
    if (element.attribs.path == '*') {
      console.log(`${'●'.blue}    built route: ${element.attribs.type}`);
    } else {
      console.log(`${'●'.blue}    built route: ${element.attribs.path}`);
    }
    routes[element.attribs.path] = {
      callback: route[0].data,
      path: element.attribs.path,
      dest: element.attribs.dest,
      type: element.attribs.type,
    };
  }
});

export default routes;
