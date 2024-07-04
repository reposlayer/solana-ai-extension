export async function submitFeedback(feedback) {
    // In a real implementation, this would send the feedback to your server
    console.log('Feedback submitted:', feedback);
    // For now, we'll just store it locally
    const storedFeedback = await chrome.storage.local.get('feedback') || [];
    storedFeedback.push({
      feedback,
      timestamp: new Date().toISOString()
    });
    await chrome.storage.local.set({ feedback: storedFeedback });
  }