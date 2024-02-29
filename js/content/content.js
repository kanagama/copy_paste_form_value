import { CopyBtn } from './copyBtn.js';
import { PasteBtn } from './pasteBtn.js';
import { FlashMessage } from './flashMessage.js';
import HasForm from './hasForm.js';
import { Toggle } from "./toggle.js";
import { HiddenClass } from "./hiddenClass.js";
import { MessageClass } from "./messageClass.js";

const hasForm = new HasForm();

const copyBtnClass = new CopyBtn();
const pasteBtnClass = new PasteBtn();
const flashMessageClass = new FlashMessage();
const toggleClass = new Toggle();
const hiddenClass = new HiddenClass();
const messageClass = new MessageClass();

/**
 * メッセージ（キーイベント）受信
 *
 * @return {bool}
 */
chrome.runtime.onMessage.addListener((command) => {
  console.log(command);

  // form がなくても動作させる
  switch (command) {
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

  if (!hasForm.checkFormCount()) {
    console.log('form not exists. onMessage.addListener');
    flashMessageClass.show();
    return false;
  }

  // form があれば動作する
  switch (command) {
    case 'copy':
      copyBtnClass.clickEvent();
      break;
    case 'paste':
      pasteBtnClass.clickEvent();
      break;
  }

  return true;
});
