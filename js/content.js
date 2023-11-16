import { CopyPasteBtn } from './copyPasteBtn.js';

const copyPasteBtn = new CopyPasteBtn();

const storage = 'form_value';

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
chrome.runtime.onMessage.addListener(function (command, sender, response)
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
  }

  return true
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

    let object = JSON.parse(result[storage]);

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
  const value = { [copyPasteBtn.key()] : bool };
  chrome.storage.local.set(value, () => {
    console.log('saved this ' + copyPasteBtn.key() + '.');
  });
}

/**
 * trueであればボタン呼び出し
 */
function loadToggleParam()
{
  chrome.storage.local.get([copyPasteBtn.key()], (result) => {
    if (result[copyPasteBtn.key()]) {
      toggle();
      console.log('loaded this ' + copyPasteBtn.key() + '.');
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
      // hidden 不要（かも）
      (element.getAttribute('type') === 'hidden' && !hasHiddenClass())
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
  return (
    input(name, value)
    ||
    select(name, value)
    ||
    textarea(name, value)
  );
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
 * @return {bool}
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
 * @return {bool}
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
  elem.dispatchEvent(new Event('click'));
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
  document.body.insertAdjacentHTML("beforeend", copyPasteBtn.html());

  // クリックイベントを追加
  document.getElementById(`copy_button_a`).addEventListener('click', function(){
    copy();
  });
  document.getElementById(`paste_button_a`).addEventListener('click', function(){
    paste();
  });
}
