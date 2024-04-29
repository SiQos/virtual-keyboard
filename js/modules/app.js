import createElement from './generator.js';

class App {
  constructor(container, Keyboard, keys, keysArray, keyStyleConfig, specialSymbols, Output, language) {
    this.app = createElement('div', 'app');
    this.keys = keys;
    this.keysArray = keysArray;
    this.keyConfig = keyStyleConfig;
    this.specialSymbols = specialSymbols;
    this.language = language
    this.isCaps = false;
    this.currentElem = null;
    this.output = new Output(this.app, this.specialSymbols);
    this.keyboard = new Keyboard(this.app, this.keys, this.keysArray, this.specialSymbols, this.keyConfig, this.language);
    this.posStart = null;
    this.posEnd = null;

    container.append(this.app);
  }

  addListeners() {

    document.addEventListener('keydown', (e) => {
      e.preventDefault();

      let pressedKey = document.querySelector(`[data-key-code="${e.code}"]`);

      if (e.altKey && e.ctrlKey) {
        this.changeLanguage();
        this.keyboard.refillKey();
      }

      if (pressedKey) {
        pressedKey.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }))
      }

    })

    document.addEventListener('keyup', (e) => {
      let pressedKey = document.querySelector(`[data-key-code="${e.code}"]`);

      if (pressedKey.dataset.keyCode == 'ShiftLeft') {
        this.isCaps = false;
        this.keyboard.refillKey(this.isCaps);
      }

      if (pressedKey) {

        pressedKey.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true }));
      }
    })

    this.keyboard.keyboardContainer.addEventListener('mousedown', (e) => {
      this.onMouseDown(e);
    })

    this.keyboard.keyboardContainer.addEventListener('mouseup', (e) => {
      let target = e.target.closest('.key');

      if (target) {
        target.classList.remove('active');
        this.currentElem = null;
      }
    })

    this.keyboard.keyboardContainer.addEventListener('mouseout', (e) => {
      if (!this.currentElem) return;

      let relatedTarget = e.relatedTarget.closest('.key');

      if (this.currentElem.dataset.keyCode.includes("Shift")) {
        this.isCaps = false;
        this.keyboard.refillKey(this.isCaps);
      }


      this.currentElem.classList.remove('active');
      this.currentElem = null;
    })
  }

  changeLanguage() {
    this.language = (this.language == 'en') ? 'ru' : 'en';
    this.keyboard.language = this.language;
    this.keyboard.refillKey(this.isCaps)
  }

  onMouseDown(e) {
    let start = this.output.textArea.selectionStart;
    let end = this.output.textArea.selectionEnd;

    e.preventDefault();

    let target = e.target.closest('.key');

    if (!target) return;

    this.currentElem = target;

    target.classList.add('active');

    switch (target.dataset.keyCode) {
      case 'Enter':
        this.output.enterValue(start, end);
        break;
      case 'Tab':
        this.output.tabValue(start, end);
        break;
      case 'Backspace':
        this.output.backspaceValue(start, end);
        break;
      case 'ShiftLeft':
        this.isCaps = true;
        this.keyboard.refillKey(this.isCaps);
        break;
      case 'CapsLock':
        this.isCaps = !this.isCaps;
        this.keyboard.refillKey(this.isCaps);
        break;
      case 'Delete':
        this.output.delValue();
        break;
    }

    this.output.textValue(target.textContent, target.dataset.keyCode, start, end);
    this.output.textArea.focus();
  }
}



export default App;
