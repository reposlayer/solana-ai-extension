const messages = {
    en: {
      insightTitle: 'AI Insights',
      scamDetectionButton: 'Detect Potential Scam',
      settingsTitle: 'Settings',
      feedbackTitle: 'Feedback',
      submitFeedback: 'Submit Feedback',
      thankYouFeedback: 'Thank you for your feedback!',
    },
    es: {
      insightTitle: 'Perspectivas de IA',
      scamDetectionButton: 'Detectar Posible Estafa',
      settingsTitle: 'Configuración',
      feedbackTitle: 'Comentarios',
      submitFeedback: 'Enviar Comentarios',
      thankYouFeedback: '¡Gracias por tus comentarios!',
    },
  };
  
  export function getMessage(key, language = 'en') {
    return messages[language]?.[key] || messages['en'][key] || key;
  }