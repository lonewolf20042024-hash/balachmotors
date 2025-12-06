export interface ChatMessage {
  id: string;
  chat_id: string;
  sender_type: 'customer' | 'admin';
  sender_name: string;
  message: string;
  timestamp: string;
  is_read: boolean;
}

export interface ChatSession {
  id: string;
  customer_name: string;
  customer_email?: string;
  customer_phone?: string;
  status: 'active' | 'closed' | 'waiting';
  last_message?: string;
  last_message_time?: string;
  unread_count: number;
  created_at: string;
  updated_at: string;
}

export interface ChatUser {
  name: string;
  email?: string;
  phone?: string;
}</parameter>