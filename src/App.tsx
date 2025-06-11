import React from 'react';
import { ChatHeader } from './components/ChatHeader';
import { ChatContainer } from './components/ChatContainer';
import { ChatInput } from './components/ChatInput';
import { ErrorBanner } from './components/ErrorBanner';
import { useChat } from './hooks/useChat';

function App() {
  const { messages, isLoading, error, sendMessage, clearError, retryMessage } = useChat();

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <ChatHeader />
      
      {error && (
        <ErrorBanner message={error} onDismiss={clearError} />
      )}
      
      <ChatContainer 
        messages={messages}
        isLoading={isLoading}
        onRetryMessage={retryMessage}
      />
      
      <ChatInput 
        onSendMessage={sendMessage}
        isLoading={isLoading}
        disabled={!!error}
      />
    </div>
  );
}

export default App;