import React, { useState, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-center gap-2 p-4 border-t border-gray-200 bg-white">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message here..."
        disabled={disabled}
        className="flex-1 py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
      />
      <button
        onClick={handleSend}
        disabled={!message.trim() || disabled}
        className={`p-2 rounded-full bg-blue-500 text-white transition-all duration-200 ${
          !message.trim() || disabled
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-blue-600'
        }`}
      >
        <Send size={20} />
      </button>
    </div>
  );
};

export default ChatInput;