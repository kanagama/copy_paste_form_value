import { Constants } from "../const.js";
import { Form } from "./form.js";

/**
 * ステータスを保存するためのdiv要素クラス
 */
export class Status
{
  #form;

  /**
   *
   */
  constructor()
  {
    this.#form = new Form();

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
    if (this.element() || !this.#form.checkFormCount()) {
      return;
    }

    document.body.insertAdjacentHTML("beforeend", this.html());
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
   * hidden class 存在チェック
   *
   * @returns {boolean}
   */
  hasHidden()
  {
    return this.element().classList.contains('hidden');
  }

  /**
   * hidden class を追加
   */
  addHidden()
  {
    this.element().classList.add('hidden');
  }

  /**
   * hidden class を削除
   */
  removeHidden()
  {
    this.element().classList.remove('hidden');
  }

  /**
   * フラッシュメッセージ class 存在チェック
   *
   * @returns {boolean}
   */
  hasMessage()
  {
    return this.element().classList.contains('message');
  }

  /**
   * フラッシュメッセージ class を追加
   */
  addMessage()
  {
    this.element().classList.add('message');
  }

  /**
   * フラッシュメッセージ class を削除
   */
  removeMessage()
  {
    this.element().classList.remove('message');
  }
}