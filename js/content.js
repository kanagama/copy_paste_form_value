const strage = 'form_value';

const error_message = 'form does not exist.';

const disabled = [
  '_method',
  '_csrfToken',
  '_token',
];

// フォームが存在した場合
if (isExistForm()) {
  console.log('exists form.');
}

/**
 * メッセージ（キーイベント）受信
 * Alt + i, Alt + o を押したとき
 * 設定は manifest.js の command に書いてあるよ
 *
 * @return {bool}
 */
chrome.runtime.onMessage.addListener(function (command, sender, response)
{
  switch (command) {
    case 'copy':
      copy();
      break;
    case 'paste':
      paste();
      break;
  }

  return true
});

/**
 * form が存在するかチェックする
 *
 * @returns {bool}
 */
function isExistForm()
{
  if (document.getElementsByTagName('form').length <= 0) {
    alert(error_message);
    return false;
  }

  return true;
}

/**
 * 配列の中に指定した値が存在するかチェックする
 *
 * @param {*} value
 * @returns
 */
function inArray(value)
{
  return [].indexOf.call(disabled, value);
}

/**
 * コピー
 *
 * @returns {bool}
 */
function copy()
{
  if (!isExistForm()) {
    return false;
  }

  const value = { [strage] : serializeArray() };
  chrome.storage.local.set(value, () => {
    console.log('saved this form.');
  });

  return true;
}

/**
 * ペースト
 *
 * @return {bool}
 */
function paste()
{
  if (!isExistForm()) {
    return false;
  }

  chrome.storage.local.get([strage], (result) => {
    if (typeof result.form_value === "undefined") {
      return;
    }

    const objects = JSON.parse(result.form_value);

    Object.keys(objects).forEach(function (name) {
      // 特定の名称でない
      if (inArray(name)) {
        setForm(selectorEscape(name), objects[name]);
      }
    });

    console.log('paste this form.');
  });

  return true;
}

/**
 * フォームの値をすべて取得する
 *
 * @return {JSON}
 */
function serializeArray()
{
  if (!isExistForm()) {
    return {};
  }

  let elements = {};
  document.querySelector(`form`).querySelectorAll(`input, select, textarea`).forEach(function(element) {
    if (
      // hidden 不要（かも）
      (element.getAttribute('type') === 'hidden')
      ||
      // submit は不要
      (element.getAttribute('type') === 'submit')
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
 * @return {bool}
 */
function setForm(name, value)
{
  return (input(name, value) || select(name, value) || textarea(name, value));
}

/**
 * @param {string} name
 * @param {string} value
 * @return {bool}
 */
function input(name, value)
{
  let elem = document.querySelectorAll('input[name=' + name + ']');

  if (elem.length <= 0) {
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
        return false;
      }
    });
    return true;
  }

  // hidden は格納しない
  elem.forEach(function(element) {
    type = element.getAttribute('type');
    if (type === 'hidden') {
      return;
    }

    // hiden でなければ値を貼り付け
    element.value = value;
  });
  return true;
}

/**
 * @param {string} name
 * @param {string} value
 * @return {bool}
 */
 function select(name, value)
{
  if (document.querySelector('select[name=' + name + ']').length <= 0) {
    return false;
  }

  document.querySelector('select[name=' + name + ']').value = value;
  return true;
}

/**
 * @param {string} name
 * @param {string} value
 * @return {bool}
 */
function textarea(name, value)
{
  if (document.querySelector('textarea[name=' + name + ']').length <= 0) {
    return false;
  }

  document.querySelector('textarea[name=' + name + ']').value = value;
  return true;
}

/**
 * 対象文字をエスケープする
 *
 * @param {string} name
 * @return {string}
 */
function selectorEscape(name)
{
  return name.replace(/[ !"#$%&'()*+,.\/:;<=>?@\[\\\]^`{|}~]/g, '\\$&');
}
