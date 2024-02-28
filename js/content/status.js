import Constants from "../const.js";
import HasForm from "./hasForm.js";

/**
 * ステータスを保存するためのdiv要素クラス
 */
export class Status
{
  #hasForm;

  /**
   *
   */
  constructor()
  {
    this.#hasForm = new HasForm();

    this.load();
  }

  /**
   * キー名称を取得
   */
  key()
  {
    return Constants.StatusId;
  }

  /**
   * 該当要素を取得
   *
   * @returns {HTMLElement}
   */
  element()
  {
    return document.getElementById(this.key());
  }

  /**
   * 要素を挿入する
   */
  load()
  {
    // 既に要素が存在している、もしくはフォームが1件でなければ終了
    if (this.element() || !this.#hasForm.checkFormCount()) {
      return;
    }

    document.body.insertAdjacentHTML("beforeend", this.html());

    chrome.storage.local.get([Constants.HiddenCheckboxId], (result) => {
      if (result[Constants.HiddenCheckboxId]) {
        this.addHidden();
      }
    });

    chrome.storage.local.get([Constants.FlashMessageCheckboxId], (result) => {
      if (result[Constants.FlashMessageCheckboxId]) {
        this.addMessage();
      }
    });
  }

  /**
   * @returns {string}
   */
  html()
  {
    return '<div '
        + ' id="' + this.key() + '"'
        + ' class=""'
        + ' style="'
          + ' display: none !important;'
        + '"'
      + '></div>';
  }

  /**
   * hidden class を追加
   */
  addHidden()
  {
    this.element().classList.add(Constants.HiddenClass);
  }

  /**
   * hidden class を削除
   */
  removeHidden()
  {
    this.element().classList.remove(Constants.HiddenClass);
  }

  /**
   * フラッシュメッセージ class を追加
   */
  addMessage()
  {
    this.element().classList.add(Constants.FlashMessageClass);
  }

  /**
   * フラッシュメッセージ class を削除
   */
  removeMessage()
  {
    this.element().classList.remove(Constants.FlashMessageClass);
  }
}
