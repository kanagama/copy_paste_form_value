import Constants from "../const.js";
import { Form } from "./form.js";
import { Status } from "./status.js";

/**
 *
 */
export class HiddenClass
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

    chrome.storage.local.get([Constants.StatusId], (result) => {
      // 値を反転させる
      const toggle = !result[Constants.StatusId];

      this.#status.removeHidden();
      if (toggle) {
        this.#status.addHidden();
      }

      const value = { [Constants.StatusId] : toggle };
      chrome.storage.local.set(value, () => {
        console.log('saved this ' + Constants.StatusId + '.');
      });
    });

    return true;
  }
}
