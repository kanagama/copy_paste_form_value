const i18n = chrome.i18n;

/**
 * popup.html の翻訳テキストを取得する
 */
document.addEventListener('DOMContentLoaded', () => {
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

  // storage のタイトルと説明文を表示する
  document.getElementById("storageOption").textContent = i18n.getMessage("storageOption");
  document.getElementById("storageOptionLabel").title = i18n.getMessage("storageOptionLabel");

  // autopaste のタイトルと説明文を表示する
  document.getElementById("autoPasteOption").textContent = i18n.getMessage("autoPasteOption");
  document.getElementById("autoPasteOptionLabel").title = i18n.getMessage("autoPasteOptionLabel");
});
