import Constants from "../const.js";
import HasForm from "./hasForm.js";

/**
 * Flashメッセージクラス（エラー通知）
 */
export class FlashMessage
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
    return Constants.FlashMessageId;
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
  }

  /**
   * フラッシュメッセージの状態を取得する
   *
   * @returns {boolean}
   */
  has()
  {
    return this.element().style.display === 'flex';
  }

  /**
   * 表示
   */
  show()
  {
    this.element().style.display = 'flex';
  }

  /**
   * 非表示
   */
  hide()
  {
    this.element().style.display = 'hide';
  }

  /**
   * style を取得
   *
   * @returns {string}
   */
  html()
  {
    return ''
      + '<div '
        + ' id="' + this.key() + '"'
        + ' style="'
          + ' position: fixed;'
          + ' top: 0;'
          + ' left: 50%;'
          + ' transform: translateX(-50%);'
          + ' z-index: calc(infinity);'
          + ' background-color: #f44336;'
          + ' color: white;'
          + ' padding: 10px 20px;'
          + ' margin: 10px 0;'
          + ' border-radius: 5px;'
          + ' box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);'
          + ' text-align: center;'
          + ' font-size: 16px;'
          + ' display: none;'
          + ' opacity: 0.8;'
          + ' font-weight: bold;'
        + '"'
      + '>copy paste form value - Error</div>';
  }
}
