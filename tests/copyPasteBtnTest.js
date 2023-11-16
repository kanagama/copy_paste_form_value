import { CopyPasteBtn } from '../js/copyPasteBtn.js';

const fs = require('fs')
const bodyHtml = fs.readFileSync('./html/index.html', {encoding: "utf-8"});

document.body.innerHTML = bodyHtml;

const copyPasteBtn = new CopyPasteBtn();

test('key()で正常に値が取得できる', () => {
  expect(copyPasteBtn.key()).toBe('toggle-checkbox');
});

test('html()で正常に値が取得できる', () => {
  expect(copyPasteBtn.html()).not.toBeNaN();
});

test('toggle()でボタンのdisplay設定が変わる', () => {
  const CopyBtn = document.getElementById('copy_button_a');
  const PasteBtn = document.getElementById('paste_button_a');

  expect(CopyBtn.style.display).toBe('none');
  expect(PasteBtn.style.display).toBe('none');

  copyPasteBtn.toggle();

  expect(CopyBtn.style.display).toBe('flex');
  expect(PasteBtn.style.display).toBe('flex');
});

test('check()でtoggle-checkboxにチェックが入る', () => {
  const Checkbox = document.getElementById('toggle-checkbox');

  expect(Checkbox.checked).toBe(false);

  copyPasteBtn.check();

  expect(Checkbox.checked).toBe(true);
});
