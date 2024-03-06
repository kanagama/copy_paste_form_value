import Constants from "./const.js";
import Checkbox from "./checkbox.js";

/**
 * フラッシュメッセージチェックボックスクラス（エラー通知）
 */
export class FlashMessageCheckbox extends Checkbox
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
    return Constants.FlashMessageCheckboxId;
  }

  /**
   * コマンド名
   *
   * @returns {string}
   */
  command()
  {
    return 'copy-paste-form-value-message';
  }
}
