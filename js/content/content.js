import { CopyBtn } from './copyBtn.js';
import { PasteBtn } from './pasteBtn.js';
import { FlashMessage } from './flashMessage.js';
import HasForm from './hasForm.js';
import { Toggle } from "./toggle.js";
import { HiddenClass } from "./hiddenClass.js";
import { MessageClass } from "./messageClass.js";
import { StorageClass } from './storageClass.js';
import { AutoPasteClass } from './autoPasteClass.js';
import { StorageName } from './storageName.js';
import { CopyPasteCheckbox } from '../copyPasteCheckbox.js';
import { HiddenCheckbox } from '../hiddenCheckbox.js';
import { FlashMessageCheckbox } from '../flashMessageCheckbox.js';
import { StorageCheckbox } from '../storageCheckbox.js';
import { AutoPasteCheckbox } from '../autoPasteCheckbox.js';
import { Remove } from './remove.js';

const hasForm = new HasForm();

const copyBtnClass = new CopyBtn();
const pasteBtnClass = new PasteBtn();
const flashMessageClass = new FlashMessage();
const toggleClass = new Toggle();
const hiddenClass = new HiddenClass();
const messageClass = new MessageClass();
const storageClass = new StorageClass();
const autoPasteClass = new AutoPasteClass();

const hiddenCheckbox = new HiddenCheckbox();
const copyPasteCheckbox = new CopyPasteCheckbox();
const flashMessageCheckbox = new FlashMessageCheckbox();
const storageCheckbox = new StorageCheckbox();
const autoPasteCheckbox = new AutoPasteCheckbox();
const remove = new Remove();

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
      case hiddenCheckbox.command():
        hiddenClass.toggle();
        break;
      case copyPasteCheckbox.command():
        toggleClass.toggle();
        break;
      case flashMessageCheckbox.command():
        messageClass.toggle();
        break;
      case storageCheckbox.command():
        storageClass.toggle();
        break;
      case autoPasteCheckbox.command():
        autoPasteClass.toggle();
        break;
    }

    // ここから先の処理は Form が必要
    if (!hasForm.checkFormCount()) {
      console.log('form not exists. onMessage.addListener');
      flashMessageClass.show();
      return false;
    }

    switch (command) {
      case 'copy-paste-form-value-copy':
        copyBtnClass.clickEvent();
        break;
      case 'copy-paste-form-value-paste':
        pasteBtnClass.clickEvent();
        break;
      case 'copy-paste-form-value-remove':
        remove.clickEvent();
        break;
    }
  }, 100);

  return true;
});

// 1秒後に自動ペースト処理を実行
setTimeout(() => {
  if (!storageCheckbox.has() || !autoPasteCheckbox.has()) {
    return false;
  }

  pasteBtnClass.clickEvent();
  return true;
}, 1000);
