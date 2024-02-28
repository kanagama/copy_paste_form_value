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
   * hidden 要素のコピー・ペースト可否を切り替える
   *
   * @returns {boolean}
   */
  toggle()
  {
    chrome.storage.local.get([Constants.FlashMessageCheckboxId], (result) => {
      // 値を反転させる
      const toggle = !result[Constants.FlashMessageCheckboxId];
      const value = { [Constants.FlashMessageCheckboxId] : toggle };
      chrome.storage.local.set(value, () => {
        console.log('saved this ' + Constants.FlashMessageCheckboxId + '.');
      });

      this.#status.removeMessage();
      if (toggle) {
        this.#status.addMessage();
      }
    });

    return true;
  }
}
