import React from 'react';
import { Message } from '../types';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div
      className={`flex gap-3 ${
        isUser ? 'justify-end' : 'justify-start'
      } mb-4`}
    >
      {!isUser && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center">
          <Bot size={18} className="text-teal-600" />
        </div>
      )}
      
      <div
        className={`max-w-[80%] md:max-w-[70%] px-4 py-2 rounded-2xl ${
          isUser
            ? 'bg-blue-500 text-white rounded-tr-none'
            : 'bg-gray-100 text-gray-800 rounded-tl-none'
        }`}
      >
        <p className="text-sm md:text-base">{message.text}</p>
        <span className="text-xs opacity-75 block mt-1">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
          <User size={18} className="text-blue-600" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;