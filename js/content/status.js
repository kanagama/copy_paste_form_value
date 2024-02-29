import Constants from "../const.js";

/**
 * ステータスを保存するためのdiv要素クラス
 */
export class Status
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
    // 既に要素が存在している
    if (this.element()) {
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

    chrome.storage.local.get([Constants.StorageCheckboxId], (result) => {
      if (result[Constants.StorageCheckboxId]) {
        this.addStorage();
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
   * hidden class が存在するかチェック
   *
   * @returns {boolean}
   */
  hasHidden()
  {
    if (!this.element()) {
      return false;
    }

    return !!this.element().classList.contains(Constants.HiddenClass);
  }

  /**
   * hidden class を追加
   */
  addHidden()
  {
    if (!this.element()) {
      return false;
    }

    this.element().classList.add(Constants.HiddenClass);
  }

  /**
   * hidden class を削除
   */
  removeHidden()
  {
    if (!this.element()) {
      return false;
    }

    this.element().classList.remove(Constants.HiddenClass);
  }

  /**
   * フラッシュメッセージ class を追加
   *
   * @returns {boolean}
   */
  hasMessage()
  {
    if (!this.element()) {
      return false;
    }

    return !!this.element().classList.contains(Constants.FlashMessageClass);
  }

  /**
   * フラッシュメッセージ class を追加
   */
  addMessage()
  {
    if (!this.element()) {
      return false;
    }

    this.element().classList.add(Constants.FlashMessageClass);
  }

  /**
   * フラッシュメッセージ class を削除
   */
  removeMessage()
  {
    if (!this.element()) {
      return false;
    }

    this.element().classList.remove(Constants.FlashMessageClass);
  }

  /**
   * ストレージ class が存在するかチェック
   *
   * @returns {boolean}
   */
  hasStorage()
  {
    if (!this.element()) {
      return false;
    }

    return !!this.element().classList.contains(Constants.StorageClass);
  }

  /**
   * ストレージ class を追加
   */
  addStorage()
  {
    if (!this.element()) {
      return;
    }

    this.element().classList.add(Constants.StorageClass);
  }

  /**
   * ストレージ class を削除
   */
  removeStorage()
  {
    if (!this.element()) {
      return;
    }

    this.element().classList.remove(Constants.StorageClass);
  }
}
