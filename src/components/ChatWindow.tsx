import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { chatStore } from '../stores/ChatStore';
import { Message } from '../types';
import { Loader2 } from 'lucide-react';

const ChatWindow: React.FC = observer(() => {
  const { currentSession, isLoading, sendMessage } = chatStore;
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [currentSession.messages]);
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {currentSession.messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
            <div className="p-6 bg-blue-50 rounded-full mb-4">
              <Bot size={32} className="text-blue-500" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Welcome to Spotmies Support</h2>
            <p className="text-gray-600 max-w-md">
              I'm your AI assistant. Ask me anything about Spotmies products and services!
            </p>
          </div>
        ) : (
          currentSession.messages.map((message: Message) => (
            <ChatMessage key={message.id} message={message} />
          ))
        )}
        
        {isLoading && (
          <div className="flex items-center gap-2 text-gray-500">
            <Loader2 size={16} className="animate-spin" />
            <span>AI assistant is typing...</span>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <ChatInput onSendMessage={sendMessage} disabled={isLoading} />
    </div>
  );
});

export default ChatWindow;