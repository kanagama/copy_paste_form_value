const i18n = chrome.i18n;

/**
 * popup.html の翻訳テキストを取得する
 */
document.addEventListener('DOMContentLoaded', function() {
  // 拡張子名を設定
  document.getElementById("extensionName").textContent = i18n.getMessage("extensionName");
  // hidden 要素をコピーする
  document.getElementById("hiddenOption").textContent = i18n.getMessage("hiddenOption");
  // copyPasteBtn を表示する
  document.getElementById("copyPasteBtn").textContent = i18n.getMessage("copyPasteBtn");
});
