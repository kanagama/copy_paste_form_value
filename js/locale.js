document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("extensionName").textContent = chrome.i18n.getMessage("extensionName");
  document.getElementById("hiddenOption").textContent = chrome.i18n.getMessage("hiddenOption");
  document.getElementById("copyPasteBtn").textContent = chrome.i18n.getMessage("copyPasteBtn");
});
