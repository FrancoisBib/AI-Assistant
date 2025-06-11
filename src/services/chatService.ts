const WEBHOOK_URL = 'https://n8n.srv791038.hstgr.cloud/webhook/5a4d3259-9051-4bc0-8271-be9b3bede317';

export const sendMessageToWebhook = async (message: string): Promise<string> => {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        timestamp: new Date().toISOString()
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract content from the "output" field specifically
    if (data.output) {
      return data.output;
    }
    
    // Fallback to other possible response formats
    if (typeof data === 'string') {
      return data;
    } else if (data.response) {
      return data.response;
    } else if (data.message) {
      return data.message;
    } else if (data.result) {
      return data.result;
    } else {
      return JSON.stringify(data);
    }
  } catch (error) {
    console.error('Error sending message to webhook:', error);
    throw new Error('Unable to connect to AI service. Please check your connection and try again.');
  }
};