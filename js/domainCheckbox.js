const domainName = 'domain-checkbox';

class DomainCheckbox
{
  /**
   *
   */
  constructor()
  {
    this.load();
  }

  /**
   * キーを取得する
   */
  key()
  {
    return domainName;
  }

  /**
   * checkbox の状態を取得する
   *
   * @returns {Boolean}
   */
  has()
  {
    return document.getElementById(domainName).checked;
  }

  /**
   * toggle の値を localStorage から呼び出す
   */
  load()
  {
    chrome.storage.local.get([domainName], (result) => {
      if (result[domainName]) {
        document.getElementById(domainName).checked = true;
      }
    });
  }

  /**
   * toggle の値を localStorage に保存する
   */
  save()
  {
    const value = { [domainName] : this.has() };
    chrome.storage.local.set(value, () => {
      console.log('Stored ' + domainName + ' name: ' + this.has());
    });
  }
}