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
    define(['require', 'exports', 'fs', './config'], factory);
  }
})((require, exports) => {
  'use strict';
  Object.defineProperty(exports, '__esModule', {value: true});
  exports.Clean = exports.$ = exports.Dom = exports.Css = void 0;
  const fs_1 = __importDefault(require('fs'));
  const config_1 = require('./config');
  const colors = require('colors');
  const cheerio = require('cheerio');
  const htmlparser2 = require('htmlparser2');
  console.log('●'.blue + ' parsing files');
  const cParse = require('transform-css-to-js');
  let hello;
  try {
    hello = fs_1.default.readdirSync(config_1.config.rootDir || './', 'utf-8');
  } catch (err) {
    throw 'Root directory stated in config not found.';
  }
  const files = [];
  hello.forEach(file => {
    if (file.includes('.vide')) {
      files.push(file);
    } else {
      return;
    }
  });
  if (files.length === 0) {
    throw 'No files for compiling.';
  }
  const CSS = [];
  const dom = [];
  const raw = [];
  const $$ = [];
  for (let i = 0; i < files.length; i++) {
    const point = files[i];
    let file;
    if (config_1.config.rootDir !== undefined) {
      file = fs_1.default
        .readFileSync(config_1.config.rootDir + '/' + point, 'utf-8')
        .trim();
    } else {
      file = fs_1.default.readFileSync('./' + point, 'utf-8').trim();
    }
    const DOM = htmlparser2.parseDOM(file);
    const $ = cheerio.load(DOM);
    dom.push($('Vide *'));
    $.prototype.name = point;
    raw.push($);
    const Css = $('Vide').clone().children().remove().end().text().trim();
    const str = cParse(Css);
    CSS.push({name: point, css: JSON.parse(str)});
    const clean = htmlparser2.parseDOM(file);
    const compE = cheerio.load(clean);
    compE.prototype.name = point;
    $$.push(compE);
  }
  exports.Css = CSS;
  exports.Dom = dom;
  exports.$ = raw;
  exports.Clean = $$;
});
