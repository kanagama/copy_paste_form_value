import { CopyPasteCheckbox } from '../js/copyPasteCheckbox.js';

const fs = require('fs')
const bodyHtml = fs.readFileSync('./popup.html', {encoding: "utf-8"});

document.body.innerHTML = bodyHtml;

const copyPasteCheckbox = new CopyPasteCheckbox();

test('key()で正常に値が取得できる', () => {
    expect(copyPasteCheckbox.key()).toBe('toggle-checkbox');
});

test('element()でcheckbox要素が取得できる', () => {
    expect(copyPasteCheckbox.element()).toBeInstanceOf(HTMLElement);
    expect(copyPasteCheckbox.element().id).toBe('toggle-checkbox');
});

test('has()でチェック状態を取得できる', () => {
    expect(copyPasteCheckbox.has()).toBe(false);
});

test('loaded()でtrueを渡すとチェックが入る', () => {
    copyPasteCheckbox.loaded(true);
    expect(copyPasteCheckbox.has()).toBe(true);
});

test('checked() で要素にチェックできる', () => {
    copyPasteCheckbox.checked();
    expect(copyPasteCheckbox.has()).toBe(true);
});

test('unchecked() で要素のチェックを外せる', () => {
    copyPasteCheckbox.checked();
    expect(copyPasteCheckbox.has()).toBe(true);

    copyPasteCheckbox.unchecked();
    expect(copyPasteCheckbox.has()).toBe(false);
});
