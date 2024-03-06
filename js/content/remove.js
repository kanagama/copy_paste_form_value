import { StorageName } from "./storageName";

/**
 * ステータスを保存するためのdiv要素クラス
 */
export class Remove
{
  storageName;

  /**
   *
   */
  constructor()
  {
    this.storageName = new StorageName();
  }

  /**
   * 該当のキーを削除
   *
   * @returns {boolean}
   */
  clickEvent()
  {
    chrome.storage.local.remove(this.storageName.get(), () => {
      console.log('deleted this clipboard.');
    });

    return true;
  }
}
