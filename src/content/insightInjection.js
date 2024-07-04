export function insertAIInsights(insights) {
    const existingInsightDiv = document.getElementById('ai-explorer-insights');
    if (existingInsightDiv) {
      existingInsightDiv.remove();
    }
  
    const insightDiv = document.createElement('div');
    insightDiv.id = 'ai-explorer-insights';
    insightDiv.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      width: 300px;
      padding: 15px;
      background-color: #f0f0f0;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      z-index: 1000;
      max-height: 80vh;
      overflow-y: auto;
    `;
    
    let content = `<h3 style="margin-top: 0; color: #333;">AI Insights</h3>`;
    content += `<p style="color: #666;">${insights}</p>`;
    
    // Add buttons for additional actions
    content += `
      <button id="ai-explorer-more-details" style="margin-right: 10px;">More Details</button>
      <button id="ai-explorer-scam-detection">Detect Potential Scam</button>
    `;
    
    insightDiv.innerHTML = content;
    document.body.appendChild(insightDiv);
    
    // Add event listeners for buttons
    document.getElementById('ai-explorer-more-details').addEventListener('click', getMoreDetails);
    document.getElementById('ai-explorer-scam-detection').addEventListener('click', detectPotentialScam);
  }
  
  function getMoreDetails() {
    chrome.runtime.sendMessage({action: "getMoreDetails", data: extractCurrentPageData()}, (response) => {
      if (response && response.details) {
        alert(response.details);
      }
    });
  }
  
  function detectPotentialScam() {
    chrome.runtime.sendMessage({action: "detectPotentialScam", data: extractCurrentPageData()}, (response) => {
      if (response) {
        if (response.isScam) {
          alert(`Potential scam detected! Reason: ${response.reason}`);
        } else {
          alert('No immediate signs of scam detected. Always do your own research.');
        }
      }
    });
  }
  
  function extractCurrentPageData() {
    // This function should be implemented to extract the current page's data
    // It could reuse logic from dataExtraction.js
    // For now, we'll return a placeholder
    return { type: 'account', address: 'current-page-address' };
  }