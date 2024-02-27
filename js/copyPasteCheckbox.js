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
   * toggle の値を localStorage に保存する
   */
  save()
  {
    const value = { [this.key()] : this.has() };
    chrome.storage.local.set(value, () => {
      console.log('saved this ' + this.key() + '.');
    });
  }

  /**
   * チェックONにする
   */
  checked()
  {
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
