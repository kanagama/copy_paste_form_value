import { HiddenCheckbox } from './hiddenCheckbox.js';
import { CopyPasteCheckbox } from './copyPasteCheckbox.js';
import { FlashMessageCheckbox } from './flashMessageCheckbox.js';
import { StorageCheckbox } from './storageCheckbox.js';
import { AutoPasteCheckbox } from './autoPasteCheckbox.js';
import { Version } from './version.js';

document.addEventListener('DOMContentLoaded', () => {

  const autoPasteCheckbox = new AutoPasteCheckbox();
  const storageCheckbox = new StorageCheckbox();
  const hiddenCheckbox = new HiddenCheckbox();
  const copyPasteCheckbox = new CopyPasteCheckbox();
  const flashMessageCheckbox = new FlashMessageCheckbox();

  // constractor で version を設定している
  new Version();

  const checkboxs = [
    hiddenCheckbox,
    copyPasteCheckbox,
    flashMessageCheckbox,
    storageCheckbox,
    autoPasteCheckbox,
  ];

  checkboxs.forEach((checkbox) => {
    document.getElementById(checkbox.key()).addEventListener('change',  () => {
      // コマンドを content script に送信
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, checkbox.command());
      });
    });
  });

  document.getElementById(storageCheckbox.key()).addEventListener('change', () => {
    storageCheckbox.change();
  });
});
