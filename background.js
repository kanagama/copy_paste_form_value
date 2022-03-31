let queryOptions = { 
  active: true, 
  currentWindow: true 
};

// キークリックイベントを取得
chrome.commands.onCommand.addListener((command) => {
  // アクティブタブの id を取得
  const p1 = new Promise((resolve, reject) => {
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
});
