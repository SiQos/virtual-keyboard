import createElement from "./generator.js";

class Output {
  constructor(container, specialSymbols) {
    this.textArea = createElement('textarea', 'textarea');
    this.specialSymbols = specialSymbols;
    container.append(this.textArea);
  }

  textValue(text, code, start, end) {

    if (this.specialSymbols.includes(code)) {
      return;
    }

    if (start == end) {
      this.textArea.value = this.textArea.value.substring(0, start) + text + this.textArea.value.substring(end);
      this.textArea.setSelectionRange(start + 1, end + 1);
    }

  }

  backspaceValue(start, end) {

    if (start == end) {
      this.textArea.value = this.textArea.value.substring(0, start - 1) + this.textArea.value.slice(end);
      this.textArea.setSelectionRange(start - 1, start - 1);
    } else {
      this.textArea.value = this.textArea.value.substring(0, start) + this.textArea.value.slice(end);
      this.textArea.setSelectionRange(start, start);
    }

  }

  tabValue(start, end) {
    this.textArea.value = `${this.textArea.value.substring(0, start)}\t${this.textArea.value.substring(end)}`;
    this.textArea.setSelectionRange(start + 1, start + 1);
  }

  enterValue(start, end) {
    this.textArea.value = `${this.textArea.value.substring(0, start)}\n${this.textArea.value.substring(end)}`;
    this.textArea.setSelectionRange(start + 1, start + 1);
  }

  delValue() {
    this.textArea.value = "";
  }

}

export default Output;