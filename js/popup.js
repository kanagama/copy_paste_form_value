const copyPasteBtn = new CopyPasteBtn();
const hiddenCheckbox = new HiddenCheckbox();
const domainCheckbox = new DomainCheckbox();

document.addEventListener('DOMContentLoaded', function() {
  // hidden-checkbox のイベント
  document.getElementById(hiddenCheckbox.key()).addEventListener('change', function () {
    hiddenCheckbox.save();

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, 'hidden');
    });
  });

  // domain-checkbox のイベント
  document.getElementById(domainCheckbox.key()).addEventListener('change', function () {
    domainCheckbox.save();

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, 'domain');
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
