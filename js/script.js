import Keyboard from "./modules/keyboard.js";
import { keys, keysArray, specialSymbols } from './modules/keys.js';
import keyStyleConfig from "./modules/key-config.js";
import App from "./modules/app.js";
import Output from "./modules/output.js";

const DEFAULT_LANGUAGE = 'en';

const language = DEFAULT_LANGUAGE;
const APP_SYSTEM = navigator.userAgentData.platform;

const app = new App(document.body, Keyboard, keys, keysArray, keyStyleConfig, specialSymbols, Output, language);

app.addListeners();