import React from 'react';
import { observer } from 'mobx-react-lite';
import ChatWindow from '../components/ChatWindow';
import { Bot } from 'lucide-react';

const ChatPage: React.FC = observer(() => {
  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      <header className="bg-white border-b border-gray-200 py-3 px-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-teal-100 rounded-full">
            <Bot size={18} className="text-teal-600" />
          </div>
          <h1 className="text-lg font-medium">Spotmies AI Assistant</h1>
        </div>
        <p className="text-sm text-gray-500 ml-8">Ask me anything about Spotmies products and services</p>
      </header>
      
      <div className="flex-1 overflow-hidden">
        <ChatWindow />
      </div>
    </div>
  );
});

export default ChatPage;