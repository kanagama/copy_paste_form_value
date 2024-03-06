import Constants from "./const.js";
import Checkbox from "./checkbox.js";
import { AutoPasteCheckbox } from "./autoPasteCheckbox.js";

/**
 * コピーペーストチェックボックスクラス
 */
export class StorageCheckbox extends Checkbox
{
  static instance;
  static value;

  static autoPasteCheckbox;

  /**
   * @returns {StorageCheckbox}
   */
  constructor()
  {
    super();

    if (!this.autoPasteCheckbox) {
      this.autoPasteCheckbox = new AutoPasteCheckbox();
    }

    return this.instance;
  }

  /**
   * キー名称を取得
   *
   * @returns {string}
   */
  key()
  {
    return Constants.StorageCheckboxId;
  }

  /**
   * コマンド名
   *
   * @returns {storage}
   */
  command()
  {
    return 'copy-paste-form-value-storage';
  }

  /**
   * チェックOFFにする
   *
   * @returns {boolean}
   */
  unchecked()
  {
    if (!super.unchecked()) {
      return false;
    }

    this.autoPasteCheckbox.unchecked();
    this.autoPasteCheckbox.disabled();

    return true;
  }

  /**
   * チェックONにする
   *
   * @returns {boolean}
   */
  checked()
  {
    if (!super.checked()) {
      return false;
    }

    const autoPasteCheckbox = new AutoPasteCheckbox();
    // 自動でチェックは入れない
    // this.autoPasteCheckbox.checked();
    this.autoPasteCheckbox.enabled();
    return true;
  }
}
