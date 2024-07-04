export function extractBlockchainData() {
    let data = {};
    
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
    let data = {};
    
    if (window.location.pathname.includes('/address/')) {
      data.type = 'account';
      data.address = document.querySelector('.address-value')?.textContent.trim();
    } else if (window.location.pathname.includes('/tx/')) {
      data.type = 'transaction';
      data.signature = document.querySelector('.signature-value')?.textContent.trim();
    }
    
    return data;
  }
  
  function extractSolscanData() {
    let data = {};
    
    if (window.location.pathname.includes('/account/')) {
      data.type = 'account';
      data.address = document.querySelector('.address-content')?.textContent.trim();
    } else if (window.location.pathname.includes('/tx/')) {
      data.type = 'transaction';
      data.signature = document.querySelector('.transaction-hash')?.textContent.trim();
    }
    
    return data;
  }
  
  function extractSolanaBeachData() {
    let data = {};
    
    if (window.location.pathname.includes('/address/')) {
      data.type = 'account';
      data.address = document.querySelector('.address-header__address')?.textContent.trim();
    } else if (window.location.pathname.includes('/transaction/')) {
      data.type = 'transaction';
      data.signature = document.querySelector('.transaction__signature')?.textContent.trim();
    }
    
    return data;
  }