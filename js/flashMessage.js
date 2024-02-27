import { flashMessageCheckbox } from './flashMessageCheckbox.js';


/**
 * Flashメッセージクラス（エラー通知）
 */
export class FlashMessage
{
  #flashMessageCheckbox;

  /**
   *
   */
  constructor()
  {
    this.#flashMessageCheckbox = new flashMessageCheckbox();

    this.load();
  }

  /**
   * キー名称を取得
   */
  key()
  {
    return 'copy-paste-form-value-error-message';
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
    return '<div '
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
        + '"'
      + '></div>';
  }
}