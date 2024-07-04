import { analyzeAccount, analyzeTransaction } from './blockchainAnalysis';
import { detectPotentialScam } from './scamDetection';
import { reportScam, getScamReports } from './database';
import { getSettings, updateSettings } from './settings';
import { getMessage } from '../utils/i18n';
import { reportError, initErrorReporting } from '../utils/errorReporting';
import { sanitizeInput, validateAddress, validateTransaction } from '../utils/security';
import { rateLimit } from '../utils/rateLimiter';

let aiModel = null;

async function loadAIModel() {
  if (!aiModel) {
    const { initModel } = await import('./aiModel');
    aiModel = await initModel();
  }
  return aiModel;
}

chrome.runtime.onInstalled.addListener(() => {
  initErrorReporting();
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  (async () => {
    try {
      await rateLimit();
      const settings = await getSettings();
      
      switch (request.action) {
        case 'getAIInsights':
          if (!validateAddress(request.data.address) && !validateTransaction(request.data.signature)) {
            throw new Error('Invalid input');
          }
          let data;
          if (request.data.type === 'account') {
            data = await analyzeAccount(sanitizeInput(request.data.address));
          } else if (request.data.type === 'transaction') {
            data = await analyzeTransaction(sanitizeInput(request.data.signature));
          }
          const model = await loadAIModel();
          const insights = await model.generateInsights(data);
          sendResponse({insights: getMessage('insightTitle', settings.language) + ': ' + insights});
          break;
        // ... rest of the cases remain the same
      }
    } catch (error) {
      reportError(error, request.action);
      sendResponse({error: error.message});
    }
  })();
  return true;  // Indicates that the response is sent asynchronously
});