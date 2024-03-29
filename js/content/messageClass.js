import Constants from "../const.js";
import { Status } from "./status.js";

/**
 *
 */
export class MessageClass
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
    return Constants.FlashMessageCheckboxId;
  }

  /**
   * hidden 要素のコピー・ペースト可否を切り替える
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

      this.#status.removeMessage();
      if (toggle) {
        this.#status.addMessage();
      }
    });

    return true;
  }
}
