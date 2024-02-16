const toggleBtnName = 'toggle-checkbox';

/**
 * コピーペーストボタンクラス
 */
export class CopyPasteBtn
{
  constructor()
  {
    chrome.storage.local.get([toggleBtnName], (result) => {
      if (result[toggleBtnName]) {
        this.check();
      }
      console.log('loaded this ' + toggleBtnName + '.');
    });
  }

  key()
  {
    return toggleBtnName;
  }

  /**
   * コピーペーストボタンHTMLを取得
   */
  html()
  {
    const html =
      '<a title="Alt + i" id="copy_button_a" onMouseOver="this.style.border=\'solid 2px #3293e7\';this.style.color=\'#3293e7\';" onMouseOut="this.style.border=\'solid 2px #000\';this.style.color=\'#000\';" style="display:none;border:solid 2px #000;font-weight:bold;transition: none!important;height: 50px;width: 50px;position: fixed;right: 30px;bottom: 90px;border: solid 2px #000;border-radius: 50%;justify-content: center;align-items: center;z-index: calc(infinity);box-shadow: 0 4px 6px rgb(0 0 0 / 30%);"><div>Copy</div></a>'
      +
      '<a title="Alt + o" id="paste_button_a" onMouseOver="this.style.border=\'solid 2px #3293e7\';this.style.color=\'#3293e7\';" onMouseOut="this.style.border=\'solid 2px #000\';this.style.color=\'#000\';" style="display:none;border:solid 2px #000;font-weight:bold;transition: none!important;height: 50px;width: 50px;position: fixed;right: 30px;bottom: 30px;border: solid 2px #000;border-radius: 50%;justify-content: center;align-items: center;z-index: calc(infinity);box-shadow: 0 4px 6px rgb(0 0 0 / 30%);"><div>Paste</div></a>';

    return html;
  }

  /**
   * 表示切り替え
   */
  toggle()
  {
    const copyBtnElement = document.getElementById('copy_button_a');
    const pasteBtnElement = document.getElementById('paste_button_a');

    if (copyBtnElement.style.display === 'flex') {
      copyBtnElement.style.display = 'none';
      pasteBtnElement.style.display = 'none';
      this.save(false);
    } else {
      copyBtnElement.style.display = 'flex';
      pasteBtnElement.style.display = 'flex';
      this.save(true);
    }
  }

  /**
   * popup.html のtoggle にチェックを入れる
   */
  check()
  {
    if (document.getElementById(toggleBtnName)) {
      document.getElementById(toggleBtnName).checked = true;
    }
  }

  /**
   * style.display 情報を取得
   */
  load()
  {
    chrome.storage.local.get([toggleBtnName], (result) => {
      if (result[toggleBtnName]) {
        this.toggle();
        this.check();
      }
      console.log('loaded this ' + toggleBtnName + '.');
    });
  }

  /**
   * style.display 情報を保存
   */
  save(bool)
  {
    const value = { [toggleBtnName] : bool };
    chrome.storage.local.set(value, () => {
      console.log('saved this ' + toggleBtnName + '.');
    });
  }
}