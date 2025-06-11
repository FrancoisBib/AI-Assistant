import React from 'react';
import { Message } from '../types/chat';
import { User, Bot, AlertCircle, Clock } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
  onRetry?: (messageId: string) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onRetry }) => {
  const isUser = message.sender === 'user';
  const isError = message.status === 'error';
  const isSending = message.status === 'sending';

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <div className={`flex gap-3 p-4 animate-in slide-in-from-bottom-2 duration-300 ${
      isUser ? 'flex-row-reverse' : 'flex-row'
    }`}>
      {/* Avatar */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser 
          ? 'bg-blue-500 text-white' 
          : 'bg-gray-200 text-gray-600'
      }`}>
        {isUser ? <User size={16} /> : <Bot size={16} />}
      </div>

      {/* Message Content */}
      <div className={`flex flex-col max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`relative px-4 py-2 rounded-2xl shadow-sm ${
          isUser 
            ? 'bg-blue-500 text-white rounded-br-md' 
            : 'bg-white text-gray-800 rounded-bl-md border border-gray-200'
        } ${isError ? 'border-red-300 bg-red-50 text-red-800' : ''}`}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {message.content}
          </p>
          
          {/* Status indicators */}
          {isSending && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
              <Clock size={12} className="text-white animate-pulse" />
            </div>
          )}
          
          {isError && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <AlertCircle size={12} className="text-white" />
            </div>
          )}
        </div>

        {/* Timestamp and actions */}
        <div className={`flex items-center gap-2 mt-1 px-1 ${
          isUser ? 'flex-row-reverse' : 'flex-row'
        }`}>
          <span className="text-xs text-gray-500">
            {formatTime(message.timestamp)}
          </span>
          
          {isError && onRetry && (
            <button
              onClick={() => onRetry(message.id)}
              className="text-xs text-red-500 hover:text-red-700 underline cursor-pointer transition-colors"
            >
              Retry
            </button>
          )}
        </div>
      </div>
    </div>
  );
};