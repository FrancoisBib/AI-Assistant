import { useState, useCallback } from 'react';
import { Message, ChatState } from '../types/chat';
import { sendMessageToWebhook } from '../services/chatService';

export const useChat = () => {
  const [state, setState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null
  });

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: 'user',
      timestamp: new Date(),
      status: 'sending'
    };

    // Add user message
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      error: null
    }));

    try {
      // Update message status to sent
      setState(prev => ({
        ...prev,
        messages: prev.messages.map(msg => 
          msg.id === userMessage.id ? { ...msg, status: 'sent' } : msg
        )
      }));

      // Send to webhook and get AI response
      const aiResponse = await sendMessageToWebhook(content);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
        status: 'sent'
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, aiMessage],
        isLoading: false
      }));

    } catch (error) {
      setState(prev => ({
        ...prev,
        messages: prev.messages.map(msg => 
          msg.id === userMessage.id ? { ...msg, status: 'error' } : msg
        ),
        isLoading: false,
        error: 'Failed to send message. Please try again.'
      }));
    }
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  const retryMessage = useCallback(async (messageId: string) => {
    const message = state.messages.find(msg => msg.id === messageId);
    if (message && message.sender === 'user') {
      await sendMessage(message.content);
    }
  }, [state.messages, sendMessage]);

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    error: state.error,
    sendMessage,
    clearError,
    retryMessage
  };
};