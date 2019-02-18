export class ConductTestFactory {
  constructor (text, isAnswerText) {
    this.text = text;
    this.isAnswerText = isAnswerText;
  }

  parseItalicAndBold (text) {
    const boldText = text.replace(/(\*\*)([^(**)]*)(\*\*)/g, '<b>$2</b>');
    const italicText = boldText.replace(/(\*)([^(**)]*)(\*)/g, '<i>$2</i>');
    return italicText;
  }

  renderTextBlock () {
    let elementText = document.createElement('p');

    elementText.innerHTML = this.parseItalicAndBold(this.text);
    elementText.setAttribute('class', 'hljs-text-custom');

    return elementText;
  }

  renderTitleBlock () {
    let elementText = document.createElement('h3');

    elementText.innerHTML = this.parseItalicAndBold(this.text);
    elementText.setAttribute('class', 'hljs-title-custom');

    return elementText;
  }

  renderCodeBlock () {
    let elementPre = document.createElement('pre');
    let elementCode = document.createElement('code');
    elementPre.setAttribute('class', 'hljs-pre-custom');

    elementCode.setAttribute('class', 'hljs-code-snippet-custom');
    elementCode.innerText = this.text.replace(/<xmp>|<\/xmp>/g, '');
    elementPre.appendChild(elementCode);

    return elementPre;
  }

  renderListBlock () {
    let elementList = document.createElement('div');

    elementList.setAttribute('class', 'hljs-list-custom');
    elementList.innerHTML = this.text;

    return elementList;
  }

  renderTableBlock () {
    let elementList = document.createElement('div');

    elementList.setAttribute('class', 'hljs-table-custom');
    elementList.innerHTML = this.text;

    return elementList;
  }

  applyMethod () {
    switch (true) {
      case /<xmp>/.test(this.text):
        return this.renderCodeBlock();

      case /<ul>/.test(this.text):
        return this.renderListBlock();

      case /<table>/.test(this.text):
        return this.renderTableBlock();

      default:
        if (this.isAnswerText) {
          return this.renderTextBlock();
        } else {
          return this.renderTitleBlock();
        }
    }
  }
}
