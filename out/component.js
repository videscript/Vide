const __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
(function (factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    const v = factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === 'function' && define.amd) {
    define([
      'require',
      'exports',
      './index',
      './html',
      './config',
      'fs',
    ], factory);
  }
})((require, exports) => {
  'use strict';
  Object.defineProperty(exports, '__esModule', {value: true});
  const index_1 = require('./index');
  const html_1 = require('./html');
  const config_1 = require('./config');
  const colors = require('colors');
  const fs_1 = __importDefault(require('fs'));
  const comps = html_1.Components;
  const keys = Object.keys(comps);
  const valid = [];
  console.log('●'.blue + ' Compiling components');
  index_1.Clean.forEach($ => {
    const comps = $('component');
    Object.keys(comps).forEach(compKey => {
      const attrs = comps[compKey].attribs;
      if (attrs == undefined) {
        return;
      } else {
        attrs.from = $.prototype.name;
        valid.push(attrs);
      }
    });
  });
  valid.forEach(attr => {
    const comp = comps[attr.name];
    comp.from = attr.from;
    console.log('   ●'.blue + ` Built component named: ${attr.name}`);
  });
  //import
  index_1.Clean.forEach(($, Num) => {
    $('import')
      .get()
      .forEach(el => {
        const req = el.attribs.name;
        const data = comps[req];
        if (data.attribs.type == 'css') {
          const fullTemp = `
/* From ${data.attribs.name} in file ${data.from}*/
${data.innerText}`;
          $.prototype.name = $.prototype.name.split('.vide')[0];
          if (config_1.config.outDir == undefined) {
            let origin = '';
            if (fs_1.default.existsSync(`./css-${$.prototype.name}.css`)) {
              origin = fs_1.default.readFileSync(
                `./css-${$.prototype.name}.css`,
                'utf-8'
              );
              fs_1.default.unlinkSync(`./css-${$.prototype.name}.css`);
            }
            fs_1.default.writeFileSync(
              `./css-${$.prototype.name}.css`,
              origin + '\n' + fullTemp
            );
          } else {
            let origin = '';
            if (
              fs_1.default.existsSync(
                config_1.config.outDir + `/css-${$.prototype.name}.css`
              )
            ) {
              origin = fs_1.default.readFileSync(
                config_1.config.outDir + `/css-${$.prototype.name}.css`,
                'utf-8'
              );
              fs_1.default.unlinkSync(
                config_1.config.outDir + `/css-${$.prototype.name}.css`
              );
            }
            fs_1.default.writeFileSync(
              config_1.config.outDir + `/css-${$.prototype.name}.css`,
              origin + '\n' + fullTemp
            );
          }
        }
        if (data.attribs.type == 'html') {
          const inner = data
            .fullText(`component[name=${data.attribs.name}]`)
            .html();
          const Import = $(`import[name=${data.attribs.name}]`);
          const renderString =
            $.html(Import).trim().split('</import>')[0] + '</import>';
          $.prototype.name = $.prototype.name.split('.vide')[0];
          let origin;
          let path;
          if (config_1.config.outDir == undefined) {
            path = './' + $.prototype.name + '.html';
            origin = fs_1.default.readFileSync(path, 'utf-8');
          } else {
            path = config_1.config.outDir + '/' + $.prototype.name + '.html';
            origin = fs_1.default.readFileSync(path, 'utf-8');
          }
          const render = origin.replace(new RegExp(renderString, 'g'), inner);
          fs_1.default.writeFileSync(path, render);
        }
      });
  });
  console.log('   ●'.blue + ' Rendered imports');
});
