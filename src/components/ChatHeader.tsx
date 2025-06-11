import React from 'react';
import { MessageSquare, Zap, Building2 } from 'lucide-react';

export const ChatHeader: React.FC = () => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
          <MessageSquare size={20} className="text-white" />
        </div>
        
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-gray-900">AI Assistant</h1>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Online</span>
            <Zap size={12} className="ml-1 text-yellow-500" />
            <span className="text-xs">Powered by LangChain</span>
            <Building2 size={12} className="ml-2 text-blue-500" />
            <span className="text-xs">working on Yamify</span>
          </div>
        </div>
      </div>
    </div>
  );
};