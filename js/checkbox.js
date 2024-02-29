/**
 * コピーペーストチェックボックスクラス
 */
export default class CopyPasteCheckbox
{
  static instance;
  static value;

  /**
   *
   */
  constructor()
  {
    if (this.instance) {
      console.log(this.key());
      return this.instance;
    }

    // 初回ロード時
    this.instance = this;
    chrome.storage.local.get(this.key(), (result) => {
      this.value = !!result[this.key()];
      this.load();
    });
  }

  /**
   * @throws {Error}
   */
  key()
  {
    throw new Error('Checkbox クラスの key() を呼び出してはいけません');
  }

  /**
   * @throws {Error}
   */
  command()
  {
    throw new Error('Checkbox クラスの command() を呼び出してはいけません');
  }

  /**
   * 対象チェックボックス要素を取得
   *
   * @returns {HTMLElement}
   */
  element()
  {
    return document.getElementById(this.key())
  }

  /**
   * 初回ロード
   */
  load()
  {
    // 要素が無い場合（content.js など）は終了
    if (!this.element()) {
      return;
    }

    this.unchecked();
    if (this.get()) {
      this.checked();
    }

    console.log('loaded this ' + this.key() + '.');
  }

  /**
   * チェックONにする
   *
   * @returns {boolean}
   */
  checked()
  {
    if (!this.element()) {
      return false;
    }

    this.element().checked = true;
    return true;
  }

  /**
   * チェックOFFにする
   *
   * @returns {boolean}
   */
  unchecked()
  {
    if (!this.element()) {
      return false;
    }

    this.element().checked = false;
    return true;
  }

  /**
   * 要素そのものの checkbox の状態を取得する
   *
   * @returns {boolean}
   */
  has()
  {
    // 要素が見つからない場合(content.jsなど)
    if (!this.element()) {
      return this.get();
    }

    return this.element().checked;
  }

  /**
   * 要素のチェック状態を取得
   *
   * @returns {boolean}
   */
  get()
  {
    return this.value;
  }

  /**
   * 要素のチェック状態を保存
   */
  set()
  {
    this.value = this.has();

    const value = { [this.key()] : this.get() };
    chrome.storage.local.set(value, () => {
      console.log('saved this ' + this.key() + '.');
    });
  }

  /**
   * popup.js で利用する配列を作成
   *
   * @returns {{key: string, command: string}}
   */
  popup()
  {
    return {
      key: this.key(),
      command: this.command(),
    };
  }
}
