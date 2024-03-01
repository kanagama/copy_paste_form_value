/**
 * フォーム存在チェッククラス
 */
export default class HasForm
{
  /**
   * 画面上にフォームが1件のみである
   *
   * @returns {boolean}
   */
  checkFormCount()
  {
    return (
      this.getFormCount() == 1
    );
  }

  /**
   * Form 要素を取得する
   *
   * @returns {HTMLCollectionOf<HTMLFormElement>}
   */
  element()
  {
    return document.getElementsByTagName('form');
  }

  /**
   * 画面上のフォーム数を取得
   *
   * @returns {Number}
   */
  getFormCount()
  {
    return this.element().length;
  }
}
