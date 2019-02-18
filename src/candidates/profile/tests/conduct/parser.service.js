const codeRexExp = /(<xmp>[\s\S]*?<\/xmp>)|(<ul>[\s\S]*?<\/ul>)|(<table>[\s\S]*?<\/table>)/gm;

export class Parser {
  constructor (text) {
    this.text = text;
  }

  parse () {
    let codeMatch;
    let codes = [];
    let splited = [];

    // eslint-disable-next-line
    while (codeMatch = codeRexExp.exec(this.text)) {
      codes.push(codeMatch[1]);
    }

    splited = this.text.split(codeRexExp);

    return splited.filter(string => string !== undefined && string !== ' ');
  }
}
