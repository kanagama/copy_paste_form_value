import Constants from "./const.js";
import Checkbox from "./checkbox.js";

/**
 * hidden 対応チェックボックスクラス
 */
export class HiddenCheckbox extends Checkbox
{
  static instance;
  static value;

  /**
   * キー名称を取得
   *
   * @returns {string}
   */
  key()
  {
    return Constants.HiddenCheckboxId;
  }

  /**
   * @returns {string}
   */
  command()
  {
    return 'hidden';
  }
}
