import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Phone, Mail, User, Minimize2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { ChatMessage, ChatSession, ChatUser } from '../../types/chat';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatSession, setChatSession] = useState<ChatSession | null>(null);
  const [userInfo, setUserInfo] = useState<ChatUser>({ name: '', email: '', phone: '' });
  const [showUserForm, setShowUserForm] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (chatSession) {
      // Subscribe to new messages
      const subscription = supabase
        .channel(`chat_${chatSession.id}`)
        .on('postgres_changes', {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `chat_id=eq.${chatSession.id}`
        }, (payload) => {
          const newMsg = payload.new as ChatMessage;
          setMessages(prev => [...prev, newMsg]);
          
          // Show typing indicator for admin messages
          if (newMsg.sender_type === 'admin') {
            setIsTyping(true);
            setTimeout(() => setIsTyping(false), 1000);
          }
        })
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [chatSession]);

  const startChat = async () => {
    if (!userInfo.name.trim()) return;

    try {
      // Create new chat session
      const sessionId = crypto.randomUUID();
      const { error: sessionError } = await supabase
        .from('chat_sessions')
        .insert([{
          id: sessionId,
          customer_name: userInfo.name,
          customer_email: userInfo.email || null,
          customer_phone: userInfo.phone || null,
          status: 'active',
          unread_count: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }]);

      if (sessionError) throw sessionError;

      // Send welcome message
      const welcomeMessage = {
        id: crypto.randomUUID(),
        chat_id: sessionId,
        sender_type: 'admin' as const,
        sender_name: 'Balach Motors Support',
        message: `Hello ${userInfo.name}! Welcome to Balach Motors. How can we help you today? 🚗`,
        timestamp: new Date().toISOString(),
        is_read: false
      };

      const { error: messageError } = await supabase
        .from('chat_messages')
        .insert([welcomeMessage]);

      if (messageError) throw messageError;

      setChatSession({
        id: sessionId,
        customer_name: userInfo.name,
        customer_email: userInfo.email,
        customer_phone: userInfo.phone,
        status: 'active',
        unread_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

      setMessages([welcomeMessage]);
      setShowUserForm(false);
      setIsConnected(true);
    } catch (error) {
      console.error('Error starting chat:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !chatSession) return;

    const message: ChatMessage = {
      id: crypto.randomUUID(),
      chat_id: chatSession.id,
      sender_type: 'customer',
      sender_name: userInfo.name,
      message: newMessage.trim(),
      timestamp: new Date().toISOString(),
      is_read: false
    };

    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert([message]);

      if (error) throw error;

      // Update session
      await supabase
        .from('chat_sessions')
        .update({
          last_message: newMessage.trim(),
          last_message_time: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', chatSession.id);

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 z-50 animate-pulse"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-80 h-96'
    }`}>
      <div className="bg-black/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-orange-500/90 backdrop-blur-sm p-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-white/20 p-2 rounded-lg mr-3">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Balach Motors</h3>
              <p className="text-white/80 text-xs">
                {isConnected ? 'Online Support' : 'Customer Support'}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white/80 hover:text-white transition-colors p-1"
            >
              <Minimize2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors p-1"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* User Info Form */}
            {showUserForm && (
              <div className="p-4 flex-1 flex flex-col justify-center">
                <h4 className="text-white font-semibold mb-4 text-center">Start a conversation</h4>
                <div className="space-y-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Your name *"
                      value={userInfo.name}
                      onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                      className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Phone number"
                      value={userInfo.phone}
                      onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                      className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email address"
                      value={userInfo.email}
                      onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                      className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <button
                    onClick={startChat}
                    disabled={!userInfo.name.trim()}
                    className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-500 text-white py-3 rounded-xl transition-all duration-300 transform hover:scale-105 font-semibold"
                  >
                    Start Chat
                  </button>
                </div>
              </div>
            )}

            {/* Messages */}
            {!showUserForm && (
              <>
                <div className="flex-1 p-4 overflow-y-auto space-y-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender_type === 'customer' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-2xl ${
                          message.sender_type === 'customer'
                            ? 'bg-orange-500 text-white'
                            : 'bg-white/10 backdrop-blur-sm text-white border border-white/20'
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {new Date(message.timestamp).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white/10 backdrop-blur-sm text-white border border-white/20 p-3 rounded-2xl">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-white/20">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1 p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!newMessage.trim()}
                      className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-500 text-white p-3 rounded-xl transition-all duration-300 transform hover:scale-105"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ChatWidget;