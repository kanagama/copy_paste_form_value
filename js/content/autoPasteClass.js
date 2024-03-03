import Constants from "../const.js";
import { Status } from "./status.js";

/**
 * 自動ペースト切り替えクラス
 */
export class AutoPasteClass
{
  #status;

  /**
   *
   */
  constructor()
  {
    this.#status = new Status();
  }

  /**
   * ストレージのキーを取得
   *
   * @returns {string}
   */
  storageKey()
  {
    return Constants.AutoPasteCheckboxId;
  }

  /**
   * storage 要素のON/OFFを切り替える
   *
   * @returns {boolean}
   */
  toggle()
  {
    chrome.storage.local.get([this.storageKey()], (result) => {
      // 値を反転させる
      const toggle = !result[this.storageKey()];
      const value = { [this.storageKey()] : toggle };
      chrome.storage.local.set(value, () => {
        console.log('saved this ' + this.storageKey() + '.');
      });

      this.#status.removeAutoPaste();
      if (toggle) {
        this.#status.addAutoPaste();
      }
    });

    return true;
  }
}
