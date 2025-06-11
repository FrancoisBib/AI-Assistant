import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ErrorBannerProps {
  message: string;
  onDismiss: () => void;
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({ message, onDismiss }) => {
  return (
    <div className="bg-red-50 border-l-4 border-red-400 p-4 mx-4 rounded-r-lg animate-in slide-in-from-top-2 duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle size={16} className="text-red-500" />
          <p className="text-sm text-red-700">{message}</p>
        </div>
        <button
          onClick={onDismiss}
          className="text-red-400 hover:text-red-600 transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};