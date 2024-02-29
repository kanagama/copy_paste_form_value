import { FlashMessageCheckbox } from '../js/flashMessageCheckbox.js';

const fs = require('fs')
const bodyHtml = fs.readFileSync('./popup.html', {encoding: "utf-8"});

document.body.innerHTML = bodyHtml;

const flashMessageCheckbox = new FlashMessageCheckbox();

test('key()で正常に値が取得できる', () => {
    expect(flashMessageCheckbox.key()).toBe('message-checkbox');
});

test('element()でcheckbox要素が取得できる', () => {
    expect(flashMessageCheckbox.element()).toBeInstanceOf(HTMLElement);
    expect(flashMessageCheckbox.element().id).toBe('message-checkbox');
});

test('has()でチェック状態を取得できる', () => {
    expect(flashMessageCheckbox.has()).toBe(false);
});

test('loaded()でtrueを渡すとチェックが入る', () => {
    flashMessageCheckbox.loaded(true);
    expect(flashMessageCheckbox.has()).toBe(true);
});

test('checked() で要素にチェックできる', () => {
    flashMessageCheckbox.checked();
    expect(flashMessageCheckbox.has()).toBe(true);
});

test('unchecked() で要素のチェックを外せる', () => {
    flashMessageCheckbox.checked();
    expect(flashMessageCheckbox.has()).toBe(true);

    flashMessageCheckbox.unchecked();
    expect(flashMessageCheckbox.has()).toBe(false);
});
