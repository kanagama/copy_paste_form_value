import { CopyBtn } from './copyBtn.js';
import { PasteBtn } from './pasteBtn.js';
import { FlashMessage } from './flashMessage.js';
import HasForm from './hasForm.js';
import { Toggle } from "./toggle.js";
import { HiddenClass } from "./hiddenClass.js";
import { MessageClass } from "./messageClass.js";
import { StorageClass } from './storageClass.js';
import { StorageName } from './storageName.js';

const hasForm = new HasForm();

const copyBtnClass = new CopyBtn();
const pasteBtnClass = new PasteBtn();
const flashMessageClass = new FlashMessage();
const toggleClass = new Toggle();
const hiddenClass = new HiddenClass();
const messageClass = new MessageClass();
const storageClass = new StorageClass();

/**
 * メッセージ（キーイベント）受信
 *
 * @return {bool}
 */
chrome.runtime.onMessage.addListener((command) => {
  new StorageName();

  // 0.2秒待ってから実行する
  setTimeout(() => {
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
      case 'storage':
        storageClass.toggle();
        break;
    }

    // ここから先の処理は Form が必要
    if (!hasForm.checkFormCount()) {
      console.log('form not exists. onMessage.addListener');
      flashMessageClass.show();
      return false;
    }

    switch (command) {
      case 'copy':
        copyBtnClass.clickEvent();
        break;
      case 'paste':
        pasteBtnClass.clickEvent();
        break;
    }
  }, 100);

  return true;
});
