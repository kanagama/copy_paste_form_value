/**
 * キークリックイベントを取得
 */
chrome.commands.onCommand.addListener((command) => {
  const p1 = new Promise((resolve, reject) => {
    // アクティブタブの id を取得
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, tabs => {
      console.log(tabs[0].id);
      resolve(tabs[0].id);
    })
  });

  // アクティブタブに command を送信する
  Promise.all([p1]).then(tab_id => {
    console.log(tab_id[0]);
    chrome.tabs.sendMessage(tab_id[0], command);

    return true;
  });

  return true;
});
