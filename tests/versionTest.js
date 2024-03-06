import { Version } from '../js/version.js';

const fs = require('fs')
const bodyHtml = fs.readFileSync('./popup.html', {encoding: "utf-8"});

document.body.innerHTML = bodyHtml;

new Version();

test('version番号が正常に設定される', () => {
    // mock で固定している
    expect(document.getElementById('version').textContent).toBe('2.0.0');
});

