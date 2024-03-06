const fs = require('fs')
const bodyHtml = fs.readFileSync('./popup.html', {encoding: "utf-8"});

document.body.innerHTML = bodyHtml;

test('extensionName が設定されている', () => {
    expect(document.getElementById('extensionName').innerHTML).not.toBe('');
});

test('hiddenOption が設定されている', () => {
    expect(document.getElementById('hiddenOption').innerHTML).not.toBe('');
});
test('hiddenOptionLabel が設定されている', () => {
    expect(document.getElementById('hiddenOptionLabel').title).not.toBe('');
});

test('copyPasteBtn が設定されている', () => {
    expect(document.getElementById('copyPasteBtn').innerHTML).not.toBe('');
});
test('copyPasteBtnLabel が設定されている', () => {
    expect(document.getElementById('copyPasteBtnLabel').title).not.toBe('');
});

test('flashMessage が設定されている', () => {
    expect(document.getElementById('flashMessage').innerHTML).not.toBe('');
});
test('flashMessageLabel が設定されている', () => {
    expect(document.getElementById('flashMessageLabel').title).not.toBe('');
});

test('storageOption が設定されている', () => {
    expect(document.getElementById('storageOption').innerHTML).not.toBe('');
});
test('storageOptionLabel が設定されている', () => {
    expect(document.getElementById('storageOptionLabel').title).not.toBe('');
});

