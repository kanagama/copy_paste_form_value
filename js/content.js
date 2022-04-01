const strage = 'form_value';

const error_message = 'form does not exist.';

const disabled = [
  '_method',
  '_csrfToken',
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
 * コピー
 *
 * @return {bool}
 */
function copy()
{
  if ($('form').length <= 0) {
    alert(error_message);
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
  if ($('form').length <= 0) {
    alert(error_message);
    return false;
  }

  chrome.storage.local.get([strage], (result) => {
    result.form_value.forEach(function(elem) {
      // 特定の名称でない
      if ($.inArray(elem.name, disabled) < 0) {
        setForm(selectorEscape(elem.name), elem.value);
      }
    });
  });

  return true;
}

/**
 * フォームの値をすべて取得する
 *
 * @return {array}
 */
function serializeArray()
{
  console.log($('form').serializeArray());
  return $('form').serializeArray();
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
  var elem = $('input[name=' + name + ']');

  if ($(elem).length <= 0) {
    return false;
  }

  // 同じ名称の name が存在している
  if ($(elem).length > 1) {
    var type = '';
    $(elem).each(function() {
      type = $(this).attr('type');
      // continue
      if (type !== 'checkbox' && type !== 'radio') {
        return true;
      }

      // value が同じ場合 check
      if ($(this).attr('value') === value) {
        $(this).prop('checked', true);
        return false;
      }
    });
    return true;
  }

  $(elem).val(value);
  return true;
}

/**
 * @param {string} name
 * @param {string} value
 * @return {bool}
 */
 function select(name, value)
{
  if ($('select[name=' + name + ']').length <= 0) {
    return false;
  }

  $('select[name=' + name + ']').val(value);
  return true;
}

/**
 * @param {string} name
 * @param {string} value
 * @return {bool}
 */
function textarea(name, value)
{
  if ($('textarea[name=' + name + ']').length <= 0) {
    return false;
  }

  $('textarea[name=' + name + ']').val(value);
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
