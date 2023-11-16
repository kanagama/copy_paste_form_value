const hiddenName = 'hidden-checkbox';

/**
 * hidden 対応チェックボックスクラス
 */
export class HiddenCheckbox
{
  /**
   *
   */
  constructor()
  {
    this.load();
  }

  /**
   * キー名称を返却
   */
  key()
  {
    return hiddenName;
  }

  /**
   * checkbox の状態を取得する
   */
  has()
  {
    return document.getElementById(hiddenName).checked;
  }

  /**
   * toggle の値を localStorage から呼び出す
   */
  load()
  {
    chrome.storage.local.get([hiddenName], (result) => {
      if (result[hiddenName]) {
        document.getElementById(hiddenName).checked = true;
      }
    });
  }

  /**
   * toggle の値を localStorage に保存する
   */
  save()
  {
    const value = { [hiddenName] : this.has() };
    chrome.storage.local.set(value, () => {
      console.log('Stored ' + hiddenName + ' name: ' + this.has());
    });
  }
}