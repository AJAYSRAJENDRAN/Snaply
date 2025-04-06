import React, { useState } from 'react';
import { Send, User, ArrowLeft } from 'lucide-react';

function Messages() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: 'Jane Smith',
      avatar: 'https://picsum.photos/seed/1/40/40',
      lastMessage: 'Hey, how are you?',
      time: '2h ago',
      messages: [] // Add message history for each chat
    },
    {
      id: 2,
      user: 'Mike Johnson',
      avatar: 'https://picsum.photos/seed/2/40/40',
      lastMessage: 'Sure, let\'s meet up!',
      time: '5h ago',
      messages: []
    }
  ]);

  const [activeChat, setActiveChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

  // Responsive handling
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() && activeChat) {
      const updatedMessages = messages.map(chat => {
        if (chat.id === activeChat.id) {
          return {
            ...chat,
            lastMessage: newMessage,
            messages: [
              ...(chat.messages || []),
              {
                id: Date.now(),
                text: newMessage,
                sender: 'me',
                timestamp: new Date().toLocaleTimeString()
              }
            ]
          };
        }
        return chat;
      });

      setMessages(updatedMessages);
      setNewMessage('');
    }
  };

  const ChatList = () => (
    <div className="w-full md:w-1/3 bg-gray-800 h-screen overflow-y-auto">
      <div className="p-4 text-white text-xl font-bold border-b border-gray-700">
        Chats
      </div>
      {messages.map(chat => (
        <div 
          key={chat.id}
          onClick={() => setActiveChat(chat)}
          className={`flex items-center p-4 border-b border-gray-700 hover:bg-gray-700 cursor-pointer ${
            activeChat?.id === chat.id ? 'bg-gray-700' : ''
          }`}
        >
          <img 
            src={chat.avatar} 
            alt={chat.user} 
            className="w-10 h-10 rounded-full mr-4"
          />
          <div className="flex-grow">
            <div className="font-semibold">{chat.user}</div>
            <div className="text-sm text-gray-400 truncate">
              {chat.lastMessage}
            </div>
          </div>
          <div className="text-xs text-gray-400">{chat.time}</div>
        </div>
      ))}
    </div>
  );

  const ChatWindow = () => (
    <div className="w-full md:w-2/3 bg-gray-900 h-screen flex flex-col">
      {/* Mobile Back Button */}
      {isMobileView && activeChat && (
        <div 
          className="p-4 flex items-center bg-gray-800 text-white"
          onClick={() => setActiveChat(null)}
        >
          <ArrowLeft className="mr-4" />
          {activeChat.user}
        </div>
      )}

      {/* Chat Header for Desktop */}
      {!isMobileView && activeChat && (
        <div className="p-4 bg-gray-800 text-white flex items-center">
          <img 
            src={activeChat.avatar} 
            alt={activeChat.user} 
            className="w-10 h-10 rounded-full mr-4"
          />
          <div className="font-semibold">{activeChat.user}</div>
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-grow overflow-y-auto p-4">
        {activeChat?.messages?.map(msg => (
          <div 
            key={msg.id} 
            className={`mb-4 ${
              msg.sender === 'me' ? 'text-right' : 'text-left'
            }`}
          >
            <div 
              className={`inline-block p-2 rounded-lg ${
                msg.sender === 'me' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-white'
              }`}
            >
              {msg.text}
              <div className="text-xs text-gray-300 mt-1">
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}
        {!activeChat?.messages?.length && (
          <div className="text-center text-gray-400 mt-10">
            No messages yet. Start a conversation!
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="p-4 bg-gray-800 flex items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type a message..."
          className="flex-grow bg-gray-700 text-white p-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          onClick={handleSendMessage}
          className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );

  // Mobile and Desktop View Logic
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {(!isMobileView || !activeChat) && <ChatList />}
      {(!isMobileView || activeChat) && <ChatWindow />}
    </div>
  );
}

export default Messages;