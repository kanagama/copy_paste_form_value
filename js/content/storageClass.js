import Constants from "../const.js";
import { Status } from "./status.js";

/**
 * ストレージ切り替えクラス
 */
export class StorageClass
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
    return Constants.StorageCheckboxId;
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

      this.#status.removeStorage();
      if (toggle) {
        this.#status.addStorage();
      }
    });

    return true;
  }
}
