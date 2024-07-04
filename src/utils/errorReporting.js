export function initErrorReporting() {
  // No-op for now
}

export function reportError(error, context) {
  console.error(`Error in ${context}:`, error);
}