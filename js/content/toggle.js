import Constants from "../const.js";
import { CopyBtn } from "./copyBtn.js";
import { PasteBtn } from "./pasteBtn.js";
import HasForm from "./hasForm.js";

/**
 *
 */
export class Toggle
{
  #copyBtn;
  #pasteBtn;
  #hasForm;

  /**
   *
   */
  constructor()
  {
    this.#copyBtn = new CopyBtn();
    this.#pasteBtn = new PasteBtn();
    this.#hasForm = new HasForm();
  }

  /**
   * ボタンの表示・非表示を切り替える
   *
   * @returns {boolean}
   */
  toggle()
  {
    if (!this.#hasForm.checkFormCount()) {
      console.log('form not exists.');
      return false;
    }

    chrome.storage.local.get([Constants.CopyPasteCheckboxId], (result) => {
      // 値を反転させる
      const toggle = !result[Constants.CopyPasteCheckboxId];

      this.hide();
      if (toggle) {
        this.show();
      }

      const value = { [Constants.CopyPasteCheckboxId] : toggle };
      chrome.storage.local.set(value, () => {
        console.log('saved this ' + Constants.CopyPasteCheckboxId + '.');
      });
    });

    return true;
  }

  /**
   * ボタンを表示
   */
  show()
  {
    this.#copyBtn.show();
    this.#pasteBtn.show();
  }

  /**
   * コピー・ペーストボタンを非表示
   */
  hide()
  {
    this.#copyBtn.hide();
    this.#pasteBtn.hide();
  }
}