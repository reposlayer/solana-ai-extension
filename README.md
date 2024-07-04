### SOLANA AI EXPLORER CHROME EXTENSION  ###


## PROOF OF CONCEP ##


AI-Powered Insights:

We use a pre-trained BERT model (bert-base-uncased) from Hugging Face, loaded via the @xenova/transformers library.
.
When a user visits a supported Solana explorer page, our content script (src/content/dataExtraction.js) extracts relevant blockchain data.
This data is sent to our background script (src/background/aiModel.js), which uses the AI model to generate insights.
The insights are then injected back into the webpage by our content script (src/content/insightInjection.js).


Scam Detection:

We use a combination of AI analysis and a database of known scams.
The scam detection logic is in src/background/scamDetection.js.
It first checks against a database of known scams (implemented using IndexedDB via the idb library).
If not a known scam, it uses the AI model to analyze the data for suspicious patterns.
The results are scored based on the presence of certain keywords and patterns in the AI-generated insights.


User Interface:

The main interface is injected directly into Solana explorer pages using our content script.
We also have a popup interface built with React (src/popup/App.js), which users can access by clicking the extension icon.


Customizable Settings:

User settings are stored using IndexedDB (src/background/settings.js).
The popup interface allows users to modify these settings.


Community Contribution:

The scam reporting feature is implemented in src/background/database.js.
User feedback is collected through the popup interface and stored locally (src/utils/feedback.js).


Educational Resources:

Static educational content is included in the extension and can be accessed through the popup interface.


Privacy and Security:

Input sanitization and validation are implemented in src/utils/security.js.
Rate limiting is implemented in src/utils/rateLimiter.js.

### WHAT WE SHOULD DO ###


Actually fine-tuning the BERT model on Solana-specific data.
Setting up a proper backend service for the known scams database and user reports.
Configuring Sentry (or another error reporting service) with actual credentials.
Implementing a more sophisticated scam detection algorithm.




