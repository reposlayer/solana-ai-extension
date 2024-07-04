/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/content/dataExtraction.js":
/*!***************************************!*\
  !*** ./src/content/dataExtraction.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   extractBlockchainData: () => (/* binding */ extractBlockchainData)
/* harmony export */ });
function extractBlockchainData() {
  var data = {};
  if (window.location.hostname.includes('solana.com')) {
    data = extractSolanaExplorerData();
  } else if (window.location.hostname.includes('solscan.io')) {
    data = extractSolscanData();
  } else if (window.location.hostname.includes('solanabeach.io')) {
    data = extractSolanaBeachData();
  }
  return data;
}
function extractSolanaExplorerData() {
  var data = {};
  if (window.location.pathname.includes('/address/')) {
    var _document$querySelect;
    data.type = 'account';
    data.address = (_document$querySelect = document.querySelector('.address-value')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.textContent.trim();
  } else if (window.location.pathname.includes('/tx/')) {
    var _document$querySelect2;
    data.type = 'transaction';
    data.signature = (_document$querySelect2 = document.querySelector('.signature-value')) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.textContent.trim();
  }
  return data;
}
function extractSolscanData() {
  var data = {};
  if (window.location.pathname.includes('/account/')) {
    var _document$querySelect3;
    data.type = 'account';
    data.address = (_document$querySelect3 = document.querySelector('.address-content')) === null || _document$querySelect3 === void 0 ? void 0 : _document$querySelect3.textContent.trim();
  } else if (window.location.pathname.includes('/tx/')) {
    var _document$querySelect4;
    data.type = 'transaction';
    data.signature = (_document$querySelect4 = document.querySelector('.transaction-hash')) === null || _document$querySelect4 === void 0 ? void 0 : _document$querySelect4.textContent.trim();
  }
  return data;
}
function extractSolanaBeachData() {
  var data = {};
  if (window.location.pathname.includes('/address/')) {
    var _document$querySelect5;
    data.type = 'account';
    data.address = (_document$querySelect5 = document.querySelector('.address-header__address')) === null || _document$querySelect5 === void 0 ? void 0 : _document$querySelect5.textContent.trim();
  } else if (window.location.pathname.includes('/transaction/')) {
    var _document$querySelect6;
    data.type = 'transaction';
    data.signature = (_document$querySelect6 = document.querySelector('.transaction__signature')) === null || _document$querySelect6 === void 0 ? void 0 : _document$querySelect6.textContent.trim();
  }
  return data;
}

/***/ }),

/***/ "./src/content/insightInjection.js":
/*!*****************************************!*\
  !*** ./src/content/insightInjection.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   insertAIInsights: () => (/* binding */ insertAIInsights)
/* harmony export */ });
function insertAIInsights(insights) {
  var existingInsightDiv = document.getElementById('ai-explorer-insights');
  if (existingInsightDiv) {
    existingInsightDiv.remove();
  }
  var insightDiv = document.createElement('div');
  insightDiv.id = 'ai-explorer-insights';
  insightDiv.style.cssText = "\n      position: fixed;\n      top: 20px;\n      right: 20px;\n      width: 300px;\n      padding: 15px;\n      background-color: #f0f0f0;\n      border-radius: 8px;\n      box-shadow: 0 2px 10px rgba(0,0,0,0.1);\n      z-index: 1000;\n      max-height: 80vh;\n      overflow-y: auto;\n    ";
  var content = "<h3 style=\"margin-top: 0; color: #333;\">AI Insights</h3>";
  content += "<p style=\"color: #666;\">".concat(insights, "</p>");

  // Add buttons for additional actions
  content += "\n      <button id=\"ai-explorer-more-details\" style=\"margin-right: 10px;\">More Details</button>\n      <button id=\"ai-explorer-scam-detection\">Detect Potential Scam</button>\n    ";
  insightDiv.innerHTML = content;
  document.body.appendChild(insightDiv);

  // Add event listeners for buttons
  document.getElementById('ai-explorer-more-details').addEventListener('click', getMoreDetails);
  document.getElementById('ai-explorer-scam-detection').addEventListener('click', detectPotentialScam);
}
function getMoreDetails() {
  chrome.runtime.sendMessage({
    action: "getMoreDetails",
    data: extractCurrentPageData()
  }, function (response) {
    if (response && response.details) {
      alert(response.details);
    }
  });
}
function detectPotentialScam() {
  chrome.runtime.sendMessage({
    action: "detectPotentialScam",
    data: extractCurrentPageData()
  }, function (response) {
    if (response) {
      if (response.isScam) {
        alert("Potential scam detected! Reason: ".concat(response.reason));
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
  return {
    type: 'account',
    address: 'current-page-address'
  };
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!******************************!*\
  !*** ./src/content/index.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dataExtraction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dataExtraction */ "./src/content/dataExtraction.js");
/* harmony import */ var _insightInjection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./insightInjection */ "./src/content/insightInjection.js");
console.log('Solana AI Explorer content script loaded');


function main() {
  console.log('Main function called');
  var data = (0,_dataExtraction__WEBPACK_IMPORTED_MODULE_0__.extractBlockchainData)();
  console.log('Extracted data:', data);
  if (Object.keys(data).length > 0) {
    chrome.runtime.sendMessage({
      action: "getAIInsights",
      data: data
    }, function (response) {
      console.log('Received response from background script:', response);
      if (chrome.runtime.lastError) {
        console.error("Error communicating with AI model:", chrome.runtime.lastError);
      } else if (response && response.insights) {
        (0,_insightInjection__WEBPACK_IMPORTED_MODULE_1__.insertAIInsights)(response.insights);
      }
    });
  } else {
    console.log('No data extracted');
  }
}

// Run the main function when the page is fully loaded
window.addEventListener('load', main);

// Re-run main function when URL changes (for single-page applications)
var lastUrl = location.href;
new MutationObserver(function () {
  var url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    console.log('URL changed, re-running main function');
    main();
  }
}).observe(document, {
  subtree: true,
  childList: true
});
/******/ })()
;
//# sourceMappingURL=content.js.map