import { Constants } from "../const.js";
import { Form } from "./form.js";
import { Status } from "./status.js";

/**
 *
 */
export class MessageClass
{
  #form;
  #status;

  /**
   *
   */
  constructor()
  {
    this.#form = new Form();
    this.#status = new Status();
  }

  /**
   * hidden 要素のコピー・ペースト可否を切り替える
   *
   * @returns {boolean}
   */
  toggle()
  {
    if (!this.#form.checkFormCount()) {
      console.log('form not exists.');
      return false;
    }

    chrome.storage.local.get([Constants.FlashMessageId], (result) => {
      // 値を反転させる
      const toggle = !result[Constants.FlashMessageId];

      this.#status.removeMessage();
      if (toggle) {
        this.#status.addMessage();
      }

      const value = { [Constants.FlashMessageId] : toggle };
      chrome.storage.local.set(value, () => {
        console.log('saved this ' + Constants.FlashMessageId + '.');
      });
    });

    return true;
  }
}