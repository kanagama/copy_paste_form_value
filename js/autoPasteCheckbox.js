import Constants from "./const.js";
import Checkbox from "./checkbox.js";

/**
 * 自動ペーストチェックボックスクラス
 */
export class AutoPasteCheckbox extends Checkbox
{
  static instance;
  static value;

  /**
   * キー名称を取得
   */
  key()
  {
    return Constants.AutoPasteCheckboxId;
  }

  /**
   * @returns {string}
   */
  command()
  {
    return 'copy-paste-form-value-autopaste';
  }

  /**
   * checkbox を利用不可にする
   *
   * @returns {boolean}
   */
  disabled()
  {
    if (!this.element()) {
      return false;
    }

    this.element().disabled = true;
    return true;
  }

  /**
   * checkbox を利用可にする
   *
   * @returns {boolean}
   */
  enabled()
  {
    if (!this.element()) {
      return false;
    }

    this.element().disabled = false;
    return true;
  }
}
