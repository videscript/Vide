/*

REGULAR EXPRESSION FOR MATCHING TEMPLATES: \$(\s*\w+\s*)\$
TEMPLATE SYNTAX: $javascript variable$

*/

/*
import { timeStamp } from 'console';

const parser = (s: string) => s.match(new RegExp(/\$(\s*\w+\s*)\$/g));

let string: string = "my name is $name$ and I'm doing $f$";

const found: any = parser(string);
let parsed: string;
found.forEach((point: string) => {
    parsed = string.replace(point, 'hi');
});
const importString = '<import name="hello"></import>';
*/

const tokens: Array<string> = [];
let fulltemp = '';

class videEvent {
  event: any;
  main: any;
  // main!: Function;
  constructor() {
    this.event = this.main();
    const element: string = this.event.target;
    const { event } = this.event;
    const callString: string = this.event.callback.toString();
    const tempString: string = `
        document.querySelector(${element}).addEventListener(${event}, ${callString})
        `;
    tokens.push(tempString);
    this.build();
  }

  build() {
    tokens.forEach((item) => {
      if (fulltemp.includes(item)) {
      } else {
        fulltemp += item;
      }
    });
    console.log(fulltemp);
  }
}
export default videEvent;
