console.log('Solana AI Explorer content script loaded');

import { extractBlockchainData } from './dataExtraction';
import { insertAIInsights } from './insightInjection';

function main() {
  console.log('Main function called');
  const data = extractBlockchainData();
  console.log('Extracted data:', data);
  if (Object.keys(data).length > 0) {
    chrome.runtime.sendMessage({action: "getAIInsights", data: data}, (response) => {
      console.log('Received response from background script:', response);
      if (chrome.runtime.lastError) {
        console.error("Error communicating with AI model:", chrome.runtime.lastError);
      } else if (response && response.insights) {
        insertAIInsights(response.insights);
      }
    });
  } else {
    console.log('No data extracted');
  }
}

// Run the main function when the page is fully loaded
window.addEventListener('load', main);

// Re-run main function when URL changes (for single-page applications)
let lastUrl = location.href; 
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    console.log('URL changed, re-running main function');
    main();
  }
}).observe(document, {subtree: true, childList: true});