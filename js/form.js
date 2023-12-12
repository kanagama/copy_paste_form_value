/**
 * 画面上のFormに関するクラス
 */
export class Form
{
  /**
   * 無視する name 属性を取得
   *
   * @returns {Array}
   */
  getDisabledName()
  {
    return [
      '_method',
      '_csrfToken',
      '_token',
    ];
  }

  /**
   * 配列の中に指定した値が存在するかチェックする
   *
   * @param {String} value
   * @returns
   */
  inArray(value)
  {
    return [].indexOf.call(this.getDisabledName(), value);
  }

  /**
   * 画面上にフォームが1件のみである
   *
   * @returns {Boolean}
   */
  checkFormCount()
  {
    return (
      this.getFormCount() == 1
    );
  }

  /**
   * 画面上のフォーム数を取得
   *
   * @returns {Number}
   */
  getFormCount()
  {
    return document.getElementsByTagName('form').length;
  }
}