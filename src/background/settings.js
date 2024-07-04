const DEFAULT_SETTINGS = {
  insightDisplayMode: 'auto',
  scamDetectionThreshold: 0.7,
  language: 'en',
};

export async function getSettings() {
  return new Promise((resolve) => {
    chrome.storage.local.get('userSettings', (result) => {
      resolve(result.userSettings || DEFAULT_SETTINGS);
    });
  });
}

export async function updateSettings(newSettings) {
  return new Promise((resolve) => {
    chrome.storage.local.get('userSettings', (result) => {
      const currentSettings = result.userSettings || DEFAULT_SETTINGS;
      const updatedSettings = { ...currentSettings, ...newSettings };
      chrome.storage.local.set({ userSettings: updatedSettings }, () => {
        resolve(updatedSettings);
      });
    });
  });
}