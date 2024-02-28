import { CopyBtn } from './copyBtn.js';
import { PasteBtn } from './pasteBtn.js';
import { FlashMessage } from './flashMessage.js';
import HasForm from './hasForm.js';
import { Status } from "./status.js";
import { Toggle } from "./toggle.js";
import { HiddenClass } from "./hiddenClass.js";
import { MessageClass } from "./messageClass.js";

const hasForm = new HasForm();

const copyBtnClass = new CopyBtn();
const pasteBtnClass = new PasteBtn();
const flashMessageClass = new FlashMessage();
const statusClass = new Status();
const toggleClass = new Toggle();
const hiddenClass = new HiddenClass();
const messageClass = new MessageClass();

/**
 * メッセージ（キーイベント）受信
 *
 * @return {bool}
 */
chrome.runtime.onMessage.addListener((command) => {
  if (!hasForm.checkFormCount()) {
    console.log('form not exists.');
    return false;
  }

  console.log(command);
  switch (command) {
    case 'copy':
      copyBtnClass.clickEvent();
      break;
    case 'paste':
      pasteBtnClass.clickEvent();
      break;
    case 'hidden':
      hiddenClass.toggle();
      break;
    case 'toggle':
      toggleClass.toggle();
      break;
    case 'message':
      messageClass.toggle();
      break;
  }

  console.log(command);
  return true;
});
