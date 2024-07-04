export function sanitizeInput(input) {
    return input.replace(/[&<>"']/g, function(m) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      }[m];
    });
  }
  
  export function validateAddress(address) {
    return typeof address === 'string' && address.length > 0;
  }
  
  export function validateTransaction(signature) {
    return typeof signature === 'string' && signature.length > 0;
  }