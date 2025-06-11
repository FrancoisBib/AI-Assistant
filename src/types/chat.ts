export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  status?: 'sending' | 'sent' | 'error';
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}