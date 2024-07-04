import { generateInsights } from './aiModel';
import { checkKnownScam } from './database';

export async function detectPotentialScam(data) {
  // First, check if it's a known scam
  const knownScam = await checkKnownScam(data.address || data.signature);
  if (knownScam) {
    return {
      isScam: true,
      confidence: 1,
      reason: "This is a known scam address or transaction."
    };
  }

  // Use AI model to analyze the data
  const insights = await generateInsights(data);
  
  // Simple heuristic based on AI insights
  const lowercaseInsights = insights.toLowerCase();
  const scamKeywords = ['suspicious', 'unusual activity', 'high risk'];
  const scamScore = scamKeywords.reduce((score, keyword) => 
    lowercaseInsights.includes(keyword) ? score + 0.2 : score, 0);

  return {
    isScam: scamScore > 0.5,
    confidence: scamScore,
    reason: insights
  };
}