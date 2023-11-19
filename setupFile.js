// chrome.storage.local をモック
global.chrome = {
    storage: {
      local: {
        get: jest.fn((key, callback) => {
          callback({ key: 'mocked value' });
        }),
        set: jest.fn((obj, callback) => {
          callback();
        })
      }
    },
    runtime: {
      getManifest: jest.fn((key, callback) => {
        return { version: '1.3.0' };
      })
    }
};
