import { HiddenCheckbox } from '../js/hiddenCheckbox.js';

const fs = require('fs')
const bodyHtml = fs.readFileSync('./popup.html', {encoding: "utf-8"});

document.body.innerHTML = bodyHtml;

const hiddenCheckbox = new HiddenCheckbox();

test('key()で正常に値が取得できる', () => {
    expect(hiddenCheckbox.key()).toBe('hidden-checkbox');
});

test('element()でcheckbox要素が取得できる', () => {
    expect(hiddenCheckbox.element()).toBeInstanceOf(HTMLElement);
    expect(hiddenCheckbox.element().id).toBe('hidden-checkbox');
});

test('has()でチェック状態を取得できる', () => {
    expect(hiddenCheckbox.has()).toBe(false);
});

test('checked() で要素にチェックできる', () => {
    hiddenCheckbox.checked();
    expect(hiddenCheckbox.has()).toBe(true);
});

test('unchecked() で要素のチェックを外せる', () => {
    hiddenCheckbox.checked();
    expect(hiddenCheckbox.has()).toBe(true);

    hiddenCheckbox.unchecked();
    expect(hiddenCheckbox.has()).toBe(false);
});
