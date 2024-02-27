import { CopyPasteCheckbox } from "./copyPasteCheckbox";
import { Form } from "./form.js";

/**
 * ペーストボタン
 */
export class PasteBtn
{
  #copyPasteCheckbox;

  #form;

  /**
   *
   */
  constructor()
  {
    this.#copyPasteCheckbox = new CopyPasteCheckbox();
    this.#form = new Form();

    this.load();
    this.toggle();
  }

  /**
   * キー名称を取得
   */
  key()
  {
    return 'paste_button_a';
  }

  /**
   * @returns {HTMLElement}
   */
  element()
  {
    return document.getElementById(this.key())
  }

  /**
   * style.display 情報を取得
   */
  load()
  {
    document.body.insertAdjacentHTML("beforeend", this.html());

    // クリックイベントを追加
    this.element().addEventListener('click', () => {
      this.clickEvent();
    });
  }

  toggle()
  {
    chrome.storage.local.get([this.#copyPasteCheckbox.key()], (result) => {
      this.hide();
      if (result[this.#copyPasteCheckbox.key()]) {
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
    this.element().style.display = 'flex';
  }

  /**
   * 非表示
   */
  hide()
  {
    this.element().style.display = 'none';
  }

  /**
   * コピーボタンHTMLを取得
   *
   * @returns {string}
   */
  html()
  {
    return '<a'
        + ' title="Alt + o"'
        + ' id="paste_button_a"'
        + ' onMouseOver="this.style.border=\'solid 2px #3293e7\';this.style.color=\'#3293e7\';"'
        + ' onMouseOut="this.style.border=\'solid 2px #000\';this.style.color=\'#000\';"'
        + ' style="display:none;border:solid 2px #000;font-weight:bold;transition: none!important;height: 50px;width: 50px;position: fixed;right: 30px;bottom: 30px;border: solid 2px #000;border-radius: 50%;justify-content: center;align-items: center;z-index: calc(infinity);box-shadow: 0 4px 6px rgb(0 0 0 / 30%);">'
        + '<div>Paste</div>'
      + '</a>';
  }

  /**
   * ペースト処理
   */
  clickEvent()
  {
    if (!this.#form.checkFormCount()) {
      console.log('form not exists.');
      return false;
    }

    chrome.storage.local.get([this.#form.storageName()], (result) => {
      if (!result.hasOwnProperty(this.#form.storageName())) {
        console.log('copy data not exists.');
        return false;
      }

      let object = JSON.parse(result[this.#form.storageName()]);

      Object.keys(object).forEach((key) => {
        // 特定の名称でない
        if (this.#form.inArray(key)) {
          this.#form.setForm(this.#form.selectorEscape(key), object[key]);
        }
      });
    });

    console.log('loaded this form.');
    return true;
  }
}