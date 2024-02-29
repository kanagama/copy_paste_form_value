import { HiddenCheckbox } from './hiddenCheckbox.js';
import { CopyPasteCheckbox } from './copyPasteCheckbox.js';
import { FlashMessageCheckbox } from './flashMessageCheckbox.js';
import { StorageCheckbox } from './storageCheckbox.js';
import { Version } from './version.js';

document.addEventListener('DOMContentLoaded', function() {

  const hiddenCheckbox = new HiddenCheckbox();
  const copyPasteCheckbox = new CopyPasteCheckbox();
  const flashMessageCheckbox = new FlashMessageCheckbox();
  const storageCheckbox = new StorageCheckbox();

  // constractor で version を設定している
  new Version();

  const checkboxs = [
    hiddenCheckbox.popup(),
    copyPasteCheckbox.popup(),
    flashMessageCheckbox.popup(),
    storageCheckbox.popup(),
  ];

  checkboxs.forEach((checkbox) => {
    document.getElementById(checkbox.key).addEventListener('change', function () {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, checkbox.command);
      });
    });
  });
});
