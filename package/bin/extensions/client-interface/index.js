var __importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};!function(e){if("object"==typeof module&&"object"==typeof module.exports){var t=e(require,exports);void 0!==t&&(module.exports=t)}else"function"==typeof define&&define.amd&&define(["require","exports","../../component","process"],e)}(function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=__importDefault(e("../../component")),i=e("process");class s{constructor(){this.component=this.main().target,this.exist=o.default,this.hook=this.main().hook,this.check=this.exist.filter(e=>e.attribs.name===this.component)[0],void 0===this.check&&(console.error(`Vide Error: selected component ${this.component} does not exist`),i.exit()),1==this.hook()&&console.log("hi")}}(new class extends s{main(){return{target:"the",hook:(e=!1)=>!0}}}).main(),t.default=s});