import Constants from "./const.js";

/**
 * コピーペーストチェックボックスクラス
 */
export class CopyPasteCheckbox
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
   */
  key()
  {
    return Constants.CopyPasteCheckboxId;
  }

  /**
   * 対象チェックボックス要素を取得
   *
   * @returns {HTMLElement}
   */
  element()
  {
    return document.getElementById(this.key())
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
   * style.display 情報を取得
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
    if (!this.element()) {
      return;
    }

    this.element().checked = false;
  }
}
