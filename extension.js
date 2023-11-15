/**
 * 公開する場合はこの js で zip 化する
 *
 * npm run zip
 * node extension.js
 */
const fs = require('fs');
const archiver = require('archiver');

// 出力ファイルのパス
const output = fs.createWriteStream(__dirname + '/copy-paste-form-value.zip');
// archiverインスタンスの作成
const archive = archiver('zip', {
  zlib: { level: 9 } // 圧縮レベル
});

// アーカイブの出力先を設定
archive.pipe(output);

// 必要なファイルやディレクトリを追加
archive.directory('css/', 'css');
archive.directory('img/', 'img');
archive.directory('js/', 'js');
archive.file('background.js', { name: 'background.js' });
archive.file('LICENSE', { name: 'LICENSE' });
archive.file('manifest.json', { name: 'manifest.json' });
archive.file('popup.html', { name: 'popup.html' });

// アーカイブを完了
archive.finalize();
