import Constants from "../const.js";
import HasForm from "./hasForm.js";
import { Status } from "./status.js";

/**
 *
 */
export class HiddenClass
{
  #hasForm;
  #status;

  /**
   *
   */
  constructor()
  {
    this.#hasForm = new HasForm();
    this.#status = new Status();
  }

  /**
   * hidden 要素のコピー・ペースト可否を切り替える
   *
   * @returns {boolean}
   */
  toggle()
  {
    if (!this.#hasForm.checkFormCount()) {
      console.log('form not exists.');
      return false;
    }

    chrome.storage.local.get([Constants.HiddenCheckboxId], (result) => {
      // 値を反転させる
      const toggle = !result[Constants.HiddenCheckboxId];

      this.#status.removeHidden();
      if (toggle) {
        this.#status.addHidden();
      }

      const value = { [Constants.HiddenCheckboxId] : toggle };
      chrome.storage.local.set(value, () => {
        console.log('saved this ' + Constants.HiddenCheckboxId + '.');
      });
    });

    return true;
  }
}
