import { CopyBtn } from "./copyBtn.js";
import { PasteBtn } from "./pasteBtn.js";
import { FlashMessage } from "./flashMessage.js";
import { Form } from "./form.js";
import { Status } from "./status.js";
import { Toggle } from "./toggle.js";
import { HiddenClass } from "./hiddenClass.js";
import { MessageClass } from "./messageClass.js";

const formClass = new Form();

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
  if (!formClass.checkFormCount()) {
    console.log('form not exists.');
    return false;
  }

  switch (command) {
    case 'copy':
      copyBtnClass.clickEvent();
      break;
    case 'paste':
      pasteBtnClass.clickEvent();
      break;
    case 'toggle':
      toggleClass.toggle();
      break;
    case 'hidden':
      hiddenClass.toggle();
      break;
    case 'message':
      messageClass.toggle();
      break;
  }

  return true;
});
