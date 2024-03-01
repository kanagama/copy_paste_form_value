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
  }

  /**
   * キー名称を取得
   *
   * @returns {string}
   */
  key()
  {
    return Constants.FlashMessageId;
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
   *
   * @returns {boolean}
   */
  load()
  {
    // 既に要素が存在しているまたはフォームが存在している
    if (this.element() || this.#hasForm.checkFormCount()) {
      return false;
    }

    // 表示ONであれば表示する
    chrome.storage.local.get([this.storageKey()], (result) => {
      if (!!result[this.storageKey()]) {
        document.body.insertAdjacentHTML("beforeend", this.html());
        this.hide();
      }
    });

    return true;
  }

  /**
   * フラッシュメッセージの状態を取得する
   *
   * @returns {boolean}
   */
  has()
  {
    return (
      this.element()
    );
  }

  /**
   * 表示
   */
  show()
  {
    // 既に表示されていたら何もしない
    if (this.has()) {
      return false;
    }

    this.load();

    return true;
  }

  /**
   * 2秒後から徐々に非表示
   */
  hide()
  {
    if (!this.element()) {
      return false;
    }

    setTimeout(() => {
      // 2秒後に既にない場合は実行しない
      if (!this.element()) {
        return;
      }

      const duration = 1000;
      const interval = 100;

      let op = this.element().style.opacity;
      let decrement = op / (duration / interval);

      let fade = setInterval(() => {
        if (!this.element()) {
          clearInterval(fade);
          return;
        }

        this.element().style.opacity = op;
        op -= decrement;

        if (op <= 0) {
          clearInterval(fade);
          this.element().parentNode.removeChild(this.element());
        }
      }, interval);
    }, 2000);

    return true;
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
          + ' bottom: 0%;'
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
          + ' display: flex;'
          + ' opacity: 0.8;'
          + ' font-weight: bold;'
        + '"'
      + '>Copy Paste Form Value - Error</div>';
  }
}
