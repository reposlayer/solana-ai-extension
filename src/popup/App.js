import React, { useState, useEffect } from 'react';
import { getSettings, updateSettings } from '../background/settings';
import { submitFeedback } from '../utils/feedback';

const App = () => {
  const [settings, setSettings] = useState(null);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    chrome.runtime.sendMessage({action: "getSettings"}, (response) => {
      setSettings(response);
    });
  }, []);

  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    chrome.runtime.sendMessage({action: "updateSettings", settings: newSettings}, (response) => {
      setSettings(response);
    });
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    submitFeedback(feedback);
    setFeedback('');
    alert('Thank you for your feedback!');
  };

  if (!settings) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Solana AI Explorer</h1>
      
      <h2 className="text-xl font-semibold mb-2">Settings</h2>
      <div className="mb-4">
        <label className="block mb-2">
          Insight Display Mode:
          <select 
            value={settings.insightDisplayMode} 
            onChange={(e) => handleSettingChange('insightDisplayMode', e.target.value)}
            className="ml-2 border rounded"
          >
            <option value="auto">Auto</option>
            <option value="always">Always</option>
            <option value="never">Never</option>
          </select>
        </label>
        <label className="block mb-2">
          Scam Detection Threshold:
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.1"
            value={settings.scamDetectionThreshold}
            onChange={(e) => handleSettingChange('scamDetectionThreshold', parseFloat(e.target.value))}
            className="ml-2"
          />
          {settings.scamDetectionThreshold}
        </label>
        <label className="block mb-2">
          Language:
          <select 
            value={settings.language} 
            onChange={(e) => handleSettingChange('language', e.target.value)}
            className="ml-2 border rounded"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </label>
      </div>

      <h2 className="text-xl font-semibold mb-2">Feedback</h2>
      <form onSubmit={handleFeedbackSubmit} className="mb-4">
        <textarea 
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          placeholder="Enter your feedback here"
          rows="4"
        ></textarea>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit Feedback</button>
      </form>
    </div>
  );
};

export default App;