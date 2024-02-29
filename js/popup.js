import { HiddenCheckbox } from './hiddenCheckbox.js';
import { CopyPasteCheckbox } from './copyPasteCheckbox.js';
import { FlashMessageCheckbox } from './flashMessageCheckbox.js';
import { Version } from './version.js';

document.addEventListener('DOMContentLoaded', function() {

  const hiddenCheckbox = new HiddenCheckbox();
  const copyPasteCheckbox = new CopyPasteCheckbox();
  const flashMessageCheckbox = new FlashMessageCheckbox();

  // constractor で version を設定している
  new Version();

  // hidden-checkbox のイベント
  document.getElementById(hiddenCheckbox.key()).addEventListener('change', function () {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, 'hidden');
    });
  });

  // toggle-checkbox のイベント
  document.getElementById(copyPasteCheckbox.key()).addEventListener('change', function () {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, 'toggle');
    });
  });

  // message-checkbox のイベント
  document.getElementById(flashMessageCheckbox.key()).addEventListener('change', function () {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, 'message');
    });
  });
});
