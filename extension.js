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
archive.directory('_locales/', '_locales');
archive.directory('css/', 'css');
archive.directory('img/', 'img');
archive.file('background.js', { name: 'background.js' });
archive.file('LICENSE', { name: 'LICENSE' });
archive.file('manifest.json', { name: 'manifest.json' });
archive.file('popup.html', { name: 'popup.html' });
archive.file('README.md', { name: 'README.md' });
// 'js/' ディレクトリから 'js/content/' を除外して追加
archive.glob('js/**', { ignore: ['js/content/**'] });

// アーカイブを完了
archive.finalize();
