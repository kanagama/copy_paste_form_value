const i18n = chrome.i18n;

/**
 * popup.html の翻訳テキストを取得する
 */
document.addEventListener('DOMContentLoaded', function() {
  // 拡張子名を設定
  document.getElementById("extensionName").textContent = i18n.getMessage("extensionName");

  // hidden 要素のタイトルと説明文を表示する
  document.getElementById("hiddenOption").textContent = i18n.getMessage("hiddenOption");
  document.getElementById("hiddenOptionLabel").title = i18n.getMessage("hiddenOptionLabel");

  // copyPasteBtn のタイトルと説明文を表示する
  document.getElementById("copyPasteBtn").textContent = i18n.getMessage("copyPasteBtn");
  document.getElementById("copyPasteBtnLabel").title = i18n.getMessage("copyPasteBtnLabel");

  // flashMessage のタイトルと説明文を表示する
  document.getElementById("flashMessage").textContent = i18n.getMessage("flashMessage");
  document.getElementById("flashMessageLabel").title = i18n.getMessage("flashMessageLabel");
});
