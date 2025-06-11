import React, { useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';
import { Message } from '../types/chat';

interface ChatContainerProps {
  messages: Message[];
  isLoading: boolean;
  onRetryMessage: (messageId: string) => void;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({ 
  messages, 
  isLoading, 
  onRetryMessage 
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            onRetry={onRetryMessage}
          />
        ))}
        
        {isLoading && <TypingIndicator />}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};