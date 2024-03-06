# copy_paste_form_value
フォームの値を Alt + i でコピー、Alt + o で同じフォームに貼り付けします。

Press Alt + i to copy the values from a form and Alt + o to paste them into the same form.

クリップボードを全ページで共通で１つ、もしくは getパラメータを除いた URL 毎に保持できます。（※設定で切り替えます）

You can keep one clipboard for all pages in common or for each URL excluding the get parameter. (*Switch by setting)

<br><br>

# 使用方法 how to use

## フォームの値のコピー Copying form values

Alt + i

## フォームの値の貼り付け Paste form values

Alt + o

## 画面右下に copy ボタンと paste ボタンを表示・非表示  Show/hide the copy and paste buttons

Alt + p

## エラーメッセージを表示する Display error messages

Alt + m

<br>,br>

# 注意事項

hidden 要素はコピー・ペーストを行えません（※設定から変更できます）

hidden does not allow copy/paste (*can be changed from settings)

ajax が動作するフォームの場合、正常に動作しない場合があります。

If the form is ajax-enabled, it may not work properly.

複数の form が存在する場合、正常に動作しない場合があります。

If multiple forms exist, it may not work properly.


<br><br>

# 開発用

## js/content.js が content_script で動作するよう js/content/content.js をトランパイルビルド

```bash
npm run build
```

## Chrome ウェブストア公開用 zip 作成

```bash
npm run zip
```

## ユニットテスト

```bash
npm run test
```