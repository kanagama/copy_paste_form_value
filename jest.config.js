module.exports = {
    // 設定ファイル
    setupFiles: ['./setupFile.js'],
    // テストディレクトリ設定
    testMatch: [
        "**/tests/*.+(ts|tsx|js)",
        "**/?(*.)+(spec|test).+(ts|tsx|js)",
    ],
};