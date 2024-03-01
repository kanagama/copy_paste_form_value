import { StorageCheckbox } from '../js/storageCheckbox.js';

const fs = require('fs')
const bodyHtml = fs.readFileSync('./popup.html', {encoding: "utf-8"});

document.body.innerHTML = bodyHtml;

const storageCheckbox = new StorageCheckbox();

test('key()で正常に値が取得できる', () => {
    expect(storageCheckbox.key()).toBe('storage-checkbox');
});

test('element()でcheckbox要素が取得できる', () => {
    expect(storageCheckbox.element()).toBeInstanceOf(HTMLElement);
    expect(storageCheckbox.element().id).toBe('storage-checkbox');
});

test('has()でチェック状態を取得できる', () => {
    expect(storageCheckbox.has()).toBe(false);
});

test('checked() で要素にチェックできる', () => {
    storageCheckbox.checked();
    expect(storageCheckbox.has()).toBe(true);
});

test('unchecked() で要素のチェックを外せる', () => {
    storageCheckbox.checked();
    expect(storageCheckbox.has()).toBe(true);

    storageCheckbox.unchecked();
    expect(storageCheckbox.has()).toBe(false);
});
