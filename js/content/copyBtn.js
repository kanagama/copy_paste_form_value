import Constants from "../const.js";
import { Form } from "./form.js";
import HasForm from "./hasForm.js";
import { StorageName } from "./storageName.js";

/**
 * コピーボタン
 */
export class CopyBtn
{
  #form;
  #hasForm;
  #storageName;

  /**
   *
   */
  constructor()
  {
    this.#form = new Form();
    this.#hasForm = new HasForm();
    this.#storageName = new StorageName();

    this.load();
    this.toggle();
  }

  /**
   * キー名称を取得
   *
   * @returns {string}
   */
  key()
  {
    return Constants.CopyBtnId;
  }

  /**
   * ストレージのキーを取得
   *
   * @returns {string}
   */
  storageKey()
  {
    return Constants.CopyPasteCheckboxId;
  }

  /**
   * 対象ボタン要素を取得
   *
   * @returns {HTMLElement}
   */
  element()
  {
    return document.getElementById(this.key())
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

    // クリックイベントを追加
    this.element().addEventListener('click', () => {
      this.clickEvent();
    });
  }

  /**
   * ボタンの表示・非表示を切り替える
   */
  toggle()
  {
    chrome.storage.local.get([this.storageKey()], (result) => {
      this.hide();
      if (!!result[this.storageKey()]) {
        this.show();
      }

      console.log('loaded this ' + this.key() + '.');
    });
  }

  /**
   * 表示
   */
  show()
  {
    if (!this.element()) {
      return;
    }

    this.element().style.display = 'flex';
  }

  /**
   * 非表示
   */
  hide()
  {
    if (!this.element()) {
      return;
    }

    this.element().style.display = 'none';
  }

  /**
   * コピーボタンHTMLを取得
   */
  html()
  {
    return '<a'
      + ' title="Alt + i"'
      + ' id="' + this.key() + '"'
      + ' onMouseOver="this.style.border=\'solid 2px #3293e7\';this.style.color=\'#3293e7\';"'
      + ' onMouseOut="this.style.border=\'solid 2px #000\';this.style.color=\'#000\';"'
      + ' style="display:none;border:solid 2px #000;font-weight:bold;transition: none!important;height: 50px;width: 50px;position: fixed;right: 30px;bottom: 90px;border: solid 2px #000;border-radius: 50%;justify-content: center;align-items: center;z-index: calc(infinity);box-shadow: 0 4px 6px rgb(0 0 0 / 30%);">'
      + '<div>Copy</div>'
    + '</a>';
  }

  /**
   * コピー処理
   */
  clickEvent()
  {
    if (!this.#hasForm.checkFormCount()) {
      console.log('form not exists. clickEvent');
      return false;
    }

    const value = { [this.#storageName.get()] : this.#form.serializeArray() };
    chrome.storage.local.set(value, () => {
      console.log('saved this form. clickEvent');
    });

    return true;
  }
}
