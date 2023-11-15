const copyPasteBtn = new CopyPasteBtn();
const hiddenCheckbox = new HiddenCheckbox();

document.addEventListener('DOMContentLoaded', function() {
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
