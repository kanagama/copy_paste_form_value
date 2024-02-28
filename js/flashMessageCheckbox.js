import Constants from "./const.js";

/**
 * フラッシュメッセージチェックボックスクラス（エラー通知）
 */
export class FlashMessageCheckbox
{
  /**
   *
   */
  constructor()
  {
    this.load();
  }

  /**
   * キー名称を取得
   *
   * @returns {string}
   */
  key()
  {
    return Constants.FlashMessageCheckboxId;
  }

  /**
   * 対象チェックボックス要素を取得
   *
   * @returns {HTMLElement}
   */
  element()
  {
    return document.getElementById(this.key());
  }

  /**
   * checkbox の状態を取得する
   *
   * @returns {boolean}
   */
  has()
  {
    if (!this.element()) {
      return false;
    }

    return this.element().checked;
  }

  /**
   * toggle の値を localStorage から呼び出す
   */
  load()
  {
    this.unchecked();

    chrome.storage.local.get([this.key()], (result) => {
      if (result[this.key()]) {
        this.checked();
      }
      console.log('loaded this ' + this.key() + '.');
    });
  }

  /**
   * チェックONにする
   */
  checked()
  {
    if (!this.element()) {
      return;
    }

    this.element().checked = true;
  }

  /**
   * チェックOFFにする
   */
  unchecked()
  {
    this.element().checked = false;
  }
}
