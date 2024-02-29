import Constants from "./const.js";
import Checkbox from "./checkbox.js";

/**
 * コピーペーストチェックボックスクラス
 */
export class CopyPasteCheckbox extends Checkbox
{
  static instance;
  static value;

  /**
   * キー名称を取得
   */
  key()
  {
    return Constants.CopyPasteCheckboxId;
  }

  /**
   * @returns {string}
   */
  command()
  {
    return 'toggle';
  }
}
