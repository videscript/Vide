import routes from './route';
import {config} from '../../config';
const http = require('http');
const fs = require('fs');
const colors = require('colors');
const paths: Record<string, any> = {};
Object.keys(routes).forEach((key: string) => {
  const route: object = routes[key];
  const callback = new Function(route.callback);
  const func: any = callback();
  if (func == undefined) {
    const html = fs.readFileSync(
      config.outDir + '/' + route.dest.split('.vide')[0] + '.html' ||
        './' + route.dest.split('.vide')[0] + '.html',
      'utf-8'
    );
    if (route.type == '404') {
      paths['404'] = {
        body: html,
        type: 'text/html',
        file: route.dest,
        full: route,
      };
    } else {
      paths[key] = {
        body: html,
        type: 'text/html',
        file: route.dest,
        full: route,
      };
    }
    // return "Bad";
  } else {
    if (route.type == '404') {
      paths['404'] = {
        body: func.content,
        type: func['content-type'],
        full: route,
      };
    } else {
      paths[key] = {
        body: func.content,
        type: func['content-type'],
        full: route,
      };
    }
  }
});
let count: number = 0;
http
  .createServer(async (req: object, res: any) => {
    const path: string = req.url;
    res.writeHead(202, {'Transfer-Encoding': ''});
    if (path.includes('.css')) {
      res.write(fs.readFileSync(config.outDir + path || '.' + path, 'utf-8'));
    }

    if (path.includes('.js')) {
      res.write(fs.readFileSync(config.outDir + path || '.' + path, 'utf-8'));
    }

    if (path.includes('.png' || '.PNG')) {
      res.write(fs.readFileSync(config.outDir + path || '.' + path, 'utf-8'));
    }

    if (path.includes('.jpeg' || '.jpg')) {
      res.write(fs.readFileSync(config.outDir + path || '.' + path, 'utf-8'));
    }

    if (paths[path] !== undefined) {
      res.writeHead(202, {'Content-Type': paths[path].type});

      if (paths[path].type === 'text/json') {
        res.write(JSON.stringify(paths[path].body));
      } else {
        res.write(paths[path].body);
      }
    }
    if (paths[path] === undefined) {
      if (paths['404'] === undefined) {
        res.writeHead(202, {'Content-Type': 'text/html'});
        res.write(
          `<h1>404</h1><h3>Vide page not found...</h3><p>Requested page: ${path} does not exist.</p>`
        );
      } else {
        res.writeHead(202, {'Content-Type': paths['404'].type});
        if (paths['404'].type === 'text/json') {
          res.write(JSON.stringify(paths['404'].body));
        } else {
          res.write(paths['404'].body);
        }
      }
      res.statusCode = 404;
    }
    res.end();
    console.log(
      `\n\nid: ${count} \nstatus:${res.statusCode}\nLoaded path: ${path}\nfrom: ${req.headers.host}\nwith data: ${req.headers['user-agent']}`
    );
    count++;
  })
  .listen(3000);
console.log('●'.blue + ' Web link: http://localhost:3000');
