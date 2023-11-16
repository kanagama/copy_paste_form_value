import { TestEnvironment } from 'jest-environment-jsdom';
import { HiddenCheckbox } from '../js/hiddenCheckbox.js';

const fs = require('fs')
const bodyHtml = fs.readFileSync('./html/index.html', {encoding: "utf-8"});

document.body.innerHTML = bodyHtml;

const hiddenCheckbox = new HiddenCheckbox();

test('key()で正常に値が取得できる', () => {
    expect(hiddenCheckbox.key()).toBe('hidden-checkbox');
});

test('has()でチェック状態を取得できる', () => {
    expect(hiddenCheckbox.has()).toBe(true);
});