const storage = 'form_value';
const toggle_params = 'toggle-checkbox';

const disabled = [
  '_method',
  '_csrfToken',
  '_token',
];

// ボタンを表示する
if (isExistForm(false)) {
  displayCopyPasteBtn();
}

loadToggleParam();
loadHiddenParam();

/**
 * メッセージ（キーイベント）受信
 *
 * @return {bool}
 */
chrome.runtime.onMessage.addListener(function (command)
{
  switch (command) {
    case 'copy':
      copy();
      break;
    case 'paste':
      paste();
      break;
    case 'toggle':
      toggle();
      break;
    case 'hidden':
      toggleHidden();
      break;
    case 'message':
      break;
  }

  return true;
});

/**
 * form が存在するかチェックする
 *
 * @returns {bool}
 */
function isExistForm(showAlert)
{
  if (document.getElementsByTagName('form').length <= 0) {
    if (showAlert) {
      alert('form does not exist.');
    }
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
  if (!isExistForm(true)) {
    return false;
  }

  const value = { [storage] : serializeArray() };
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
  if (!isExistForm(true)) {
    return false;
  }

  chrome.storage.local.get([storage], (result) => {
    if (!result.hasOwnProperty(storage)) {
      // TODO エラーメッセージ
      console.log('copy data not exists.');
      return false;
    }

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
 * ボタンの表示可否
 */
function toggle()
{
  const copy_button_a = document.getElementById(`copy_button_a`);
  const paste_button_a = document.getElementById(`paste_button_a`);

  if (copy_button_a.style.display === 'flex') {
    copy_button_a.style.display = 'none';
    paste_button_a.style.display = 'none';
    saveToggleParam(false);
  } else {
    copy_button_a.style.display = 'flex';
    paste_button_a.style.display = 'flex';
    saveToggleParam(true);
  }
}

/**
 * ボタンの toggle 情報を保存
 *
 * @param {boolean} bool
 */
function saveToggleParam(bool)
{
  const value = { [toggle_params] : bool };
  chrome.storage.local.set(value, () => {
    console.log('saved this toggle_params.');
  });
}

/**
 * trueであればボタン呼び出し
 */
function loadToggleParam()
{
  chrome.storage.local.get([toggle_params], (result) => {
    if (result[toggle_params]) {
      toggle();
      console.log('loaded this toggle_params.');
    }
  });
}

function loadHiddenParam()
{
  chrome.storage.local.get(['hidden-checkbox'], (result) => {
    if (result['hidden-checkbox']) {
      addHiddenClass();
      console.log('loaded this hidden-checkbox.');
    }
  });
}

/**
 * フォームの値をすべて取得する
 *
 * @return {JSON}
 */
function serializeArray()
{
  if (!isExistForm(true)) {
    return {};
  }

  let elements = {};
  document.querySelector(`form`).querySelectorAll(`input, select, textarea`).forEach(function(element) {
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
 * @return {bool}
 */
function setForm(name, value)
{
  return (input(name, value) || select(name, value) || textarea(name, value));
}

/**
 * @param {string} name
 * @param {string} value
 * @returns {boolean}
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
        dispatch(element);

        return false;
      }
    });
    return true;
  }

  elem.forEach(function(element) {
    let type = element.getAttribute('type');
    if (type === 'hidden' && !hasHiddenClass()) {
      return true;
    }

    element.value = value;
    dispatch(element);

    return false;
  });

  return true;
}

/**
 * @param {string} name
 * @param {string} value
 * @returns {boolean}
 */
 function select(name, value)
{
  let elem = document.querySelector('select[name=' + name + ']');
  if (elem == null || elem.length <= 0) {
    return false;
  }

  elem.value = value;
  dispatch(elem);

  return true;
}

/**
 * @param {string} name
 * @param {string} value
 * @returns {boolean}
 */
function textarea(name, value)
{
  let elem = document.querySelector('textarea[name=' + name + ']');
  if (elem == null || elem.length <= 0) {
    return false;
  }

  elem.value = value;

  dispatch(elem);

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

/**
 * イベントを発火させる
 *
 * @param {object} elem
 */
function dispatch(elem)
{
  elem.dispatchEvent(new Event('change'));
  elem.dispatchEvent(new Event('change'));
  setTimeout(()=>{}, 20);
}

function toggleHidden()
{
  if (hasHiddenClass()) {
    removeHiddenClass();
  } else {
    addHiddenClass();
  }
}
function hasHiddenClass()
{
  return document.getElementById('paste_button_a').classList.contains('hidden');
}
function addHiddenClass()
{
  document.getElementById('paste_button_a').classList.add('hidden');
}
function removeHiddenClass()
{
  document.getElementById('paste_button_a').classList.remove('hidden');
}

/**
 * コピペボタンを表示する
 */
function displayCopyPasteBtn()
{
  const body = document.body;

  const html =
    '<a title="Alt + i" id="copy_button_a" onmousedown="this.style.width=\'46px\';this.style.height=\'46px\';" onmouseup="this.style.width=\'50px\';this.style.height=\'50px\';" onMouseOver="this.style.border=\'solid 2px #3293e7\';this.style.color=\'#3293e7\';" onMouseOut="this.style.border=\'solid 2px #000\';this.style.color=\'#000\';this.style.width=\'50px\';this.style.height=\'50px\';" style="display:none;border:solid 2px #000;font-weight:bold;transition: none!important;height: 50px;width: 50px;position: fixed;right: 30px;bottom: 90px;border: solid 2px #000;border-radius: 50%;justify-content: center;align-items: center;z-index: 2;box-shadow: 0 4px 6px rgb(0 0 0 / 30%);"><div>Copy</div></a>'
    +
    '<a title="Alt + o" id="paste_button_a" onmousedown="this.style.width=\'46px\';this.style.height=\'46px\';" onmouseup="this.style.width=\'50px\';this.style.height=\'50px\';" onMouseOver="this.style.border=\'solid 2px #3293e7\';this.style.color=\'#3293e7\';" onMouseOut="this.style.border=\'solid 2px #000\';this.style.color=\'#000\';this.style.width=\'50px\';this.style.height=\'50px\';" style="display:none;border:solid 2px #000;font-weight:bold;transition: none!important;height: 50px;width: 50px;position: fixed;right: 30px;bottom: 30px;border: solid 2px #000;border-radius: 50%;justify-content: center;align-items: center;z-index: 2;box-shadow: 0 4px 6px rgb(0 0 0 / 30%);"><div>Paste</div></a>';

  body.insertAdjacentHTML("beforeend", html);

  // クリックイベントを追加
  document.querySelector(`#copy_button_a`).addEventListener('click', function(){
    copy();
  });
  document.querySelector(`#paste_button_a`).addEventListener('click', function(){
    paste();
  });
}
