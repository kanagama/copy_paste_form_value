const strage = 'form_value';

const error_message = 'form does not exist.';

const disabled = [
  '_method',
  '_csrfToken',
  '_token',
];

/**
 * メッセージ（キーイベント）受信
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

    let object = JSON.parse(result.form_value);

    Object.keys(object).forEach(function (key) {
      // 特定の名称でない
      if (inArray(key)) {
        setForm(selectorEscape(key), object[key]);
      }
    });
  });

  console.log('loaded this form.');
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

  elem.forEach(function(element) {
    let type = element.getAttribute('type');
    if (type === 'hidden') {
      return true;
    }

    element.value = value;
    return false;
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
  let elem = document.querySelector('select[name=' + name + ']');
  if (elem == null || elem.length <= 0) {
    return false;
  }

  elem.value = value;
  return true;
}

/**
 * @param {string} name
 * @param {string} value
 * @return {bool}
 */
function textarea(name, value)
{
  let elem = document.querySelector('textarea[name=' + name + ']');
  if (elem == null || elem.length <= 0) {
    return false;
  }

  elem.value = value;
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
