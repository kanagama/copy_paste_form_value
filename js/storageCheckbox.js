import Constants from "./const.js";
import Checkbox from "./checkbox.js";

/**
 * コピーペーストチェックボックスクラス
 */
export class StorageCheckbox extends Checkbox
{
  static instance;
  static value;

  /**
   * キー名称を取得
   */
  key()
  {
    return Constants.StorageCheckboxId;
  }

  /**
   * @returns {storage}
   */
  command()
  {
    return 'storage';
  }
}
