// chrome.storage.local をモック
global.chrome = {
    storage: {
      local: {
        get: jest.fn(() => {
          return { key: 'mocked value' };
        }),
        set: jest.fn(() => {
        })
      }
    },
    runtime: {
      getManifest: jest.fn(() => {
        return { version: '2.1.0' };
      })
    },
    i18n: {
      getMessage: jest.fn(() => {
        return 'mocked value';
      })
    },
};
