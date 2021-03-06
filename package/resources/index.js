/*
 * transform-css-to-js - v0.1.1
 * A utility to convert your CSS into JS or React Native compatible styles.
 * https://github.com/ritz078/transform-css-to-js
 *
 * Made by Ritesh Kumar
 * Under MIT License
 */

'use strict';

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}

const cssToReactNative = _interopDefault(require('css-to-react-native'));
const kebabCase = _interopDefault(require('lodash/kebabCase'));
const stringify = _interopDefault(require('stringify-object'));

const SPACE = '  ';
function toProperty(name) {
  if (name.charAt(0) === '-') name = name.slice(0);

  return name.replace(/[^a-z0-9]([a-z0-9])?/gi, (v, l) => {
    if (l) return l.toUpperCase();
    return '';
  });
}

function toSelectors(name) {
  const names = name.split(',');

  return names.map(name => {
    name = name.trim();
    return '"' + name + '"';
  });
}

function tokenizer(code) {
  const tokens = [];
  let token = '';
  const whitespc = ['\r\n', '\n\r', '\n', '\r'];
  let lastChar = '\0';
  let nextChar = '\0';
  let char = '\0';
  const specialChars = ['{', '}', ':', ';'];
  const specialCharsPB = ['{', '}', ';'];
  let sc = null;
  let inBrackets = false;

  for (let i = 0; i < code.length; i++) {
    if (i) lastChar = code.charAt(i - 1);
    char = code.charAt(i);
    if (i + 1 < code.length) nextChar = code.charAt(i + 1);

    if (~whitespc.indexOf(char) && ~whitespc.indexOf(lastChar)) {
      continue;
    }

    sc = inBrackets ? specialChars : specialCharsPB;

    if (~sc.indexOf(char)) {
      if (char === '{') inBrackets = true;
      if (char === '}') inBrackets = false;
      tokens.push(token);
      tokens.push(char);
      token = '';
      continue;
    }

    token += char;
  }

  if (token) tokens.push(token);

  return tokens
    .map(token => {
      return token.trim();
    })
    .filter(token => {
      return token;
    });
}

function convertoToJS(tokens) {
  const items = [];
  let actualItem = null;
  let actualProp = null;
  function readSelector(token) {
    const selectors = toSelectors(token);

    actualItem = {
      originalValue: token,
      selectors: selectors,
      values: {},
    };

    actualProp = null;
    items.push(actualItem);

    return readBracketO;
  }

  function readBracketO(token) {
    if (token !== '{') throw new Error("expected '{' ");

    return readProperty;
  }

  function readBracketC(token) {
    if (token !== '}') throw new Error("expected '}' ");
    return readSelector;
  }

  function readDefinition(token) {
    if (token !== ':') throw new Error("expected ':' ");

    return readValue;
  }

  function readProperty(token) {
    if (token === '}') return readBracketC(token);

    const property = toProperty(token);
    actualProp = property;

    if (!actualItem.values[property]) {
      actualItem.values[property] = [];
    }

    return readDefinition;
  }

  function readValue(token) {
    actualItem.values[actualProp].push(token);

    return readFinal;
  }

  function readFinal(token) {
    if (token === '}') return readBracketC(token);
    if (token !== ';') throw new Error("expected ';' ");
    return readProperty;
  }

  let nextAction = readSelector;
  let i = 0;
  tokens.forEach(token => {
    i++;
    nextAction = nextAction(token);
  });

  return renderJS(items);
}

function renderJS(items) {
  let objects = ['{'];
  objects = objects.concat(items.map(renderItem).join(','));
  objects.push('}');
  return objects.join('\n');
}

function renderItem(item) {
  const code = [];

  let properties = [];

  for (const prop in item.values) {
    if (item.values.hasOwnProperty(prop)) {
      const propitem = {
        name: prop,
        value: item.values[prop][item.values[prop].length - 1],
      };
      let markup = '"';
      if (~propitem.value.indexOf('"')) {
        markup = "'";
        propitem.value = propitem.value.replace(/'/gi, "\\'");
      }
      properties.push(
        SPACE +
          SPACE +
          '"' +
          propitem.name +
          '": ' +
          markup +
          propitem.value +
          markup
      );
    }
  }

  properties = properties.map(x => {
    return SPACE + x;
  });

  item.selectors.forEach(i => {
    code.push(SPACE + i + ': {');
    code.push(properties.join(',\n'));
    code.push(SPACE + '}');
  });

  return code.join('\n');
}

function getRnCode(css) {
  const styles = {};
  const code = eval('(' + convertoToJS(tokenizer(css)) + ')');
  Object.keys(code).forEach(key => {
    styles[key] = {};
    const arr = [];
    Object.keys(code[key]).forEach(key2 => {
      arr.push([kebabCase(key2), code[key][key2]]);
    });
    styles[key] = cssToReactNative(arr);
  });
  return stringify(styles, {
    indent: '  ',
  });
}

const index = function (code, reactNative = false) {
  return reactNative ? getRnCode(code) : convertoToJS(tokenizer(code));
};

module.exports = index;
