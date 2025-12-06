import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, Phone, Mail, User, Clock, Eye, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { ChatMessage, ChatSession } from '../../types/chat';

const ChatManagement: React.FC = () => {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [selectedChat, setSelectedChat] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchChatSessions();
  }, []);

  useEffect(() => {
    if (selectedChat) {
      fetchMessages(selectedChat.id);
      markAsRead(selectedChat.id);
    }
  }, [selectedChat]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    // Subscribe to new chat sessions
    const sessionSubscription = supabase
      .channel('chat_sessions')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'chat_sessions'
      }, () => {
        fetchChatSessions();
      })
      .subscribe();

    // Subscribe to new messages
    const messageSubscription = supabase
      .channel('chat_messages')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages'
      }, (payload) => {
        const newMsg = payload.new as ChatMessage;
        if (selectedChat && newMsg.chat_id === selectedChat.id) {
          setMessages(prev => [...prev, newMsg]);
        }
        fetchChatSessions(); // Update session list
      })
      .subscribe();

    return () => {
      sessionSubscription.unsubscribe();
      messageSubscription.unsubscribe();
    };
  }, [selectedChat]);

  const fetchChatSessions = async () => {
    try {
      const { data, error } = await supabase
        .from('chat_sessions')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setChatSessions(data || []);
    } catch (error) {
      console.error('Error fetching chat sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (chatId: string) => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('chat_id', chatId)
        .order('timestamp', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const markAsRead = async (chatId: string) => {
    try {
      await supabase
        .from('chat_sessions')
        .update({ unread_count: 0 })
        .eq('id', chatId);

      await supabase
        .from('chat_messages')
        .update({ is_read: true })
        .eq('chat_id', chatId)
        .eq('sender_type', 'customer');

      setChatSessions(prev => 
        prev.map(session => 
          session.id === chatId ? { ...session, unread_count: 0 } : session
        )
      );
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return;

    const message: ChatMessage = {
      id: crypto.randomUUID(),
      chat_id: selectedChat.id,
      sender_type: 'admin',
      sender_name: 'Support Team',
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
        .eq('id', selectedChat.id);

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const updateChatStatus = async (chatId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('chat_sessions')
        .update({ status })
        .eq('id', chatId);

      if (error) throw error;
      
      setChatSessions(prev => 
        prev.map(session => 
          session.id === chatId ? { ...session, status: status as any } : session
        )
      );
      
      if (selectedChat && selectedChat.id === chatId) {
        setSelectedChat({ ...selectedChat, status: status as any });
      }
    } catch (error) {
      console.error('Error updating chat status:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'waiting': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'closed': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading chats...</div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-200px)]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Live Chat Management</h2>
        <div className="flex items-center space-x-4">
          <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm border border-green-500/30">
            {chatSessions.filter(s => s.status === 'active').length} Active Chats
          </div>
          <div className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm border border-yellow-500/30">
            {chatSessions.filter(s => s.unread_count > 0).length} Unread
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 h-full">
        {/* Chat Sessions List */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
          <div className="p-4 border-b border-white/20">
            <h3 className="text-lg font-semibold text-white">Chat Sessions</h3>
          </div>
          <div className="overflow-y-auto h-full">
            {chatSessions.map((session) => (
              <div
                key={session.id}
                onClick={() => setSelectedChat(session)}
                className={`p-4 border-b border-white/10 cursor-pointer transition-all duration-300 hover:bg-white/5 ${
                  selectedChat?.id === session.id ? 'bg-orange-500/20 border-l-4 border-l-orange-500' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <div className="bg-orange-500/20 text-orange-500 p-2 rounded-lg mr-3">
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{session.customer_name}</h4>
                      <p className="text-gray-400 text-xs">
                        {session.customer_phone && (
                          <span className="flex items-center">
                            <Phone className="h-3 w-3 mr-1" />
                            {session.customer_phone}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(session.status)}`}>
                      {session.status}
                    </span>
                    {session.unread_count > 0 && (
                      <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 mt-1">
                        {session.unread_count}
                      </span>
                    )}
                  </div>
                </div>
                
                {session.last_message && (
                  <p className="text-gray-400 text-sm truncate mb-1">
                    {session.last_message}
                  </p>
                )}
                
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  {session.last_message_time 
                    ? new Date(session.last_message_time).toLocaleString()
                    : new Date(session.created_at).toLocaleString()
                  }
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Messages */}
        <div className="lg:col-span-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-white/20 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-orange-500/20 text-orange-500 p-2 rounded-lg mr-3">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{selectedChat.customer_name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      {selectedChat.customer_phone && (
                        <span className="flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {selectedChat.customer_phone}
                        </span>
                      )}
                      {selectedChat.customer_email && (
                        <span className="flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {selectedChat.customer_email}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <select
                    value={selectedChat.status}
                    onChange={(e) => updateChatStatus(selectedChat.id, e.target.value)}
                    className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="active">Active</option>
                    <option value="waiting">Waiting</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender_type === 'admin' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        message.sender_type === 'admin'
                          ? 'bg-orange-500 text-white'
                          : 'bg-white/10 backdrop-blur-sm text-white border border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs opacity-70">{message.sender_name}</span>
                        <span className="text-xs opacity-70">
                          {new Date(message.timestamp).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                      <p className="text-sm">{message.message}</p>
                    </div>
                  </div>
                ))}
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
                    placeholder="Type your response..."
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
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Select a chat to start</h3>
                <p className="text-gray-400">Choose a chat session from the left to view messages</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatManagement;