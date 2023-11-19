import { HiddenCheckbox } from './hiddenCheckbox.js';
import { CopyPasteBtn } from './copyPasteBtn.js';
import { Version } from './version.js';


document.addEventListener('DOMContentLoaded', function() {

  const hiddenCheckbox = new HiddenCheckbox();
  const copyPasteBtn = new CopyPasteBtn();
  const version = new Version();

  // hidden-checkbox のイベント
  document.getElementById(hiddenCheckbox.key()).addEventListener('change', function () {
    hiddenCheckbox.save();

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, 'hidden');
    });
  });

  // toggle-checkbox のイベント
  document.getElementById(copyPasteBtn.key()).addEventListener('change', function () {
    copyPasteBtn.save();

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, 'toggle');
    });
  });
});
