/**
 * 画面上のFormに関するクラス
 */
export class Form
{
  /**
   * @returns {string}
   */
  storageName()
  {
    return 'form_value';
  }

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
   * @param {string} value
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

  /**
   * フォームの値をすべて取得する
   *
   * @returns {string}
   */
  serializeArray()
  {
    if (!this.checkFormCount()) {
      return {};
    }

    let elements = {};
    document.querySelector(`form`).querySelectorAll(`input, select, textarea`).forEach((element) => {
      if (
        // hidden 不要（※設定次第では必要）
        (element.getAttribute('type') === 'hidden' && !hasHiddenClass())
        ||
        // submit ボタンは不要
        (element.getAttribute('type') === 'submit')
        ||
        // reset ボタンも不要
        (element.getAttribute('type') === 'reset')
        ||
        // radio でチェック入ってないのは読み込まない
        (element.getAttribute('type') === 'radio' && element.checked !== true)
      ) {
        // continue の意味
        return;
      }

      elements[element.getAttribute('name')] = element.value;
    });

    return JSON.stringify(elements);
  }

  /**
   * フォームに戻す
   *
   * @param {string} name
   * @param {string} value
   * @returns {boolean}
   */
  setForm(name, value)
  {
    return (
      this.input(name, value)
      ||
      this.select(name, value)
      ||
      this.textarea(name, value)
    );
  }

  /**
   * イベントを発火させる
   *
   * @param {object} elem
   */
  dispatch(elem)
  {
    elem.dispatchEvent(new Event('change'));
    elem.dispatchEvent(new Event('change'));
    setTimeout(()=>{}, 20);
  }

  /**
   * @param {string} name
   * @param {string} value
   * @returns {boolean}
   */
  input(name, value)
  {
    let elem = document.querySelectorAll('input[name=' + name + ']');
    if (elem.length <= 0) {
      console.log('input form not found.');
      return false;
    }

    // 同じ名称の name が存在している
    if (elem.length > 1) {
      let type = '';
      elem.forEach(function(element) {
        type = element.getAttribute('type');
        // continue
        if (type !== 'checkbox' && type !== 'radio') {
          return true;
        }

        // value が同じ場合 check
        if (element.value === value) {

          element.checked = true;
          this.dispatch(element);

          return false;
        }
      });
      return true;
    }

    elem.forEach((element) => {
      let type = element.getAttribute('type');
      if (type === 'hidden' && !hasHiddenClass()) {
        return true;
      }

      element.value = value;
      this.dispatch(element);

      return false;
    });

    return true;
  }

  /**
   * @param {string} name
   * @param {string} value
   * @returns {boolean}
   */
  select(name, value)
  {
    let elem = document.querySelector('select[name=' + name + ']');
    if (elem == null || elem.length <= 0) {
      return false;
    }

    elem.value = value;
    this.dispatch(elem);

    return true;
  }

  /**
   * @param {string} name
   * @param {string} value
   * @returns {boolean}
   */
  textarea(name, value)
  {
    let elem = document.querySelector('textarea[name=' + name + ']');
    if (elem == null || elem.length <= 0) {
      return false;
    }

    elem.value = value;

    this.dispatch(elem);

    return true;
  }

  /**
   * 対象文字をエスケープする
   *
   * @param {string} name
   * @return {string}
   */
  selectorEscape(name)
  {
    return name.replace(/[ !"#$%&'()*+,.\/:;<=>?@\[\\\]^`{|}~]/g, '\\$&');
  }
}
