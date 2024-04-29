import createElement from './generator.js';

class Keyboard {
  constructor(container, keys, keysArray, specialSymbols, keyConfig, language) {
    this.container = container;
    this.keys = keys;
    this.keysArray = keysArray;
    this.specialSymbols = specialSymbols;
    this.keyConfig = keyConfig;
    this.language = language;

    this.render();
  }

  render() {
    this.keyboard = createElement('div', 'keyboard');
    this.keyboardContainer = createElement('div', 'keyboard__container');

    this.container.append(this.keyboard)
    this.keyboard.append(this.keyboardContainer);

    this.fillKey();
  }

  fillKey() {
    this.keysArray.forEach(el => {
      let key = createElement('div', 'key');
      let keyChar = createElement('span', 'keyChar');

      this.keyboardContainer.append(key);

      key.append(keyChar);
      key.dataset.keyCode = el.key;

      if (el.value.input == false) {
        key.classList.add('special-key');
      }

      if (this.keyConfig[el.key]) {
        key.classList.add(this.keyConfig[el.key]);
      }

      keyChar.textContent = el.value[this.language.slice(0, 2)];
    });
  }

  refillKey(isCaps) {

    document.querySelectorAll('.key').forEach(el => {
      const keyCode = el.dataset.keyCode;
      const keyChar = el.querySelector('.keyChar');

      if (isCaps) {
        keyChar.textContent = this.keys[keyCode][`${this.language.slice(0, 2)}Caps`];
      } else {
        keyChar.textContent = this.keys[keyCode][this.language.slice(0, 2)];
      }

    })

  }
}

export default Keyboard;
