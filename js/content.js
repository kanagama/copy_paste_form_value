const strage = 'form_value';

const error_message = 'form does not exist.';

const disabled = [
  '_method',
  '_csrfToken',
];

/**
 * メッセージ（キーイベント）受信
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

  // sendResponse();
  return true
});

/**
 * コピー
 */
function copy()
{
  if ($('form').length) {
    const value = { [strage] : serializeArray() };
    chrome.storage.local.set(value, () => {
      console.log('saved this form.');
    });
  } else {
    alert(error_message);
  }
}

/**
 * ペースト
 */
function paste()
{
  if ($('form').length) {
    chrome.storage.local.get([strage], (result) => {
      result.form_value.forEach(function(elem) {
        // 特定の名称でない
        if ($.inArray(elem.name, disabled) < 0) {
          setForm(elem.name, elem.value);
        }
      });
    });
  } else {
    alert(error_message);
  }
}

/**
 * フォームの値をすべて取得する
 */
function serializeArray()
{
  const form = $('form');
  const param = form.serializeArray();

  return param;
}

/**
 * フォームに戻す
 *
 * @param {string} name
 * @param {string} value
 */
function setForm(name, value)
{
  if ($('input[name=' + name + ']').length) {
    $('input[name=' + name + ']').val(value);
    return true;
  }
  if ($('select[name=' + name + ']').length) {
    $('select[name=' + name + ']').val(value);
    return true;
  }
  if ($('textarea[name=' + name + ']').length) {
    $('textarea[name=' + name + ']').val(value);
    return true;
  }
}
