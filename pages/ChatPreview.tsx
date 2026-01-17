
import React, { useState, useEffect, useRef } from 'react';
import { MOCK_CHATS } from '../constants';
import { SalesAgent } from '../services/salesAgent';
import * as db from '../services/database';

interface ChatPreviewProps {
  onBack: () => void;
}

export const ChatPreview: React.FC<ChatPreviewProps> = ({ onBack }) => {
  const [selectedChatId, setSelectedChatId] = useState(MOCK_CHATS[0].id);
  const [messages, setMessages] = useState<any[]>(MOCK_CHATS[0].messages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const agentRef = useRef<SalesAgent | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const selectedChat = MOCK_CHATS.find(c => c.id === selectedChatId) || MOCK_CHATS[0];

  useEffect(() => {
    // Initialize agent for the selected chat
    agentRef.current = new SalesAgent(selectedChat.userName);
    setMessages(selectedChat.messages);
  }, [selectedChatId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || !agentRef.current) return;

    const userMsg = {
      id: `m-${Date.now()}`,
      sender: 'user',
      text: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking and processing
    setTimeout(async () => {
      const response = await agentRef.current!.processMessage(userMsg.text);
      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000);
  };

  // Helper to render markdown images and property cards
  const renderMessageContent = (text: string) => {
    return text.split('\n').map((line, i) => {
      // 1. Image Markdown: ![alt](url)
      const imgMatch = line.match(/!\[([^\]]*)\]\(([^)]+)\)/);
      if (imgMatch) {
        return (
          <div key={i} className="my-3 rounded-xl overflow-hidden shadow-md border border-slate-200 bg-white">
            <div className="h-48 overflow-hidden bg-slate-100 relative">
              <img src={imgMatch[2]} alt={imgMatch[1]} className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" />
            </div>
            {imgMatch[1] && <div className="px-3 py-2 text-[10px] text-slate-500 font-medium border-t border-slate-100">{imgMatch[1]}</div>}
          </div>
        );
      }

      // 2. Property Card Tag: [PROPERTY:ID]
      const propMatch = line.match(/\[PROPERTY:([^\]]+)\]/);
      if (propMatch) {
        const p = db.db_get_property_by_id(propMatch[1]);
        if (p) return (
          <div key={i} className="my-3 bg-white rounded-xl overflow-hidden shadow-lg border border-slate-200 max-w-[280px] hover:shadow-xl transition-shadow cursor-pointer group">
            <div className="h-32 relative overflow-hidden">
              <img src={p.images?.[0] || p.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.title} />
              <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase">
                {p.type || p.for_sale_or_rent}
              </div>
            </div>
            <div className="p-3">
              <div className="font-bold text-slate-800 text-xs leading-tight mb-1">{p.title}</div>
              <div className="text-emerald-600 font-bold text-sm mb-2">KES {(p.price || p.price_kes)?.toLocaleString()}</div>
              <div className="flex items-center gap-2 text-[10px] text-slate-500 mb-3">
                <span>📍 {p.location}</span>
                <span>🛏️ {p.bedrooms} BR</span>
              </div>
              <button className="w-full bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold py-2 rounded-lg transition-colors">
                View Full Details
              </button>
            </div>
          </div>
        );
      }

      return <div key={i} className="min-h-[1.5em]">{line}</div>;
    });
  };

  return (
    <div className="h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Sidebar - Chat List */}
      <div className="w-full md:w-80 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <button onClick={onBack} className="text-slate-400 hover:text-emerald-600 transition-colors">
            ← Back
          </button>
          <h2 className="font-bold text-slate-800">Messages</h2>
          <div className="w-6"></div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {MOCK_CHATS.map(chat => (
            <button
              key={chat.id}
              onClick={() => setSelectedChatId(chat.id)}
              className={`w-full p-4 flex gap-3 text-left border-b border-slate-50 transition-colors ${selectedChatId === chat.id ? 'bg-emerald-50 border-emerald-100' : 'hover:bg-slate-50'
                }`}
            >
              <div className="w-12 h-12 rounded-full bg-slate-200 flex-shrink-0 flex items-center justify-center text-slate-500 font-bold">
                {chat.userName.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-slate-800 truncate">{chat.userName}</span>
                  <span className="text-[10px] text-slate-400">{chat.time}</span>
                </div>
                <p className="text-xs text-slate-500 truncate">{chat.lastMessage}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Agent Debug Info */}
        <div className="p-3 bg-slate-900 text-[10px] font-mono text-emerald-400 truncate">
          {agentRef.current?.getStatus() || 'Agent standby...'}
        </div>
      </div>

      {/* Main - Chat Bubbles */}
      <div className="flex-1 flex flex-col bg-[#e6eee6] relative overflow-hidden">
        {/* Chat Header */}
        <div className="bg-white/80 backdrop-blur-md p-4 flex items-center gap-4 border-b border-slate-200 z-10">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
            {selectedChat.userName.charAt(0)}
          </div>
          <div>
            <div className="font-bold text-slate-800 text-sm">{selectedChat.userName}</div>
            <div className="text-[10px] text-emerald-600 font-medium uppercase tracking-widest">Active via Nyumba AI Sales Agent</div>
          </div>
        </div>

        {/* Message area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4" ref={scrollRef}>
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${msg.sender === 'user'
                ? 'bg-[#effdde] text-slate-800 rounded-tr-none'
                : 'bg-white text-slate-800 rounded-tl-none'
                }`}>
                <p className="text-sm border-l-2 border-emerald-100 pl-2 py-1 mb-1 font-bold text-emerald-800" style={{ display: msg.sender === 'ai' ? 'block' : 'none' }}>KE Real Estate Agent</p>
                <div className="text-sm whitespace-pre-wrap leading-relaxed">{renderMessageContent(msg.text)}</div>
                <div className="text-[10px] text-slate-400 text-right mt-1">{msg.timestamp}</div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl px-4 py-3 shadow-sm flex gap-1 items-center">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 bg-white/50 backdrop-blur-md border-t border-slate-200">
          <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about properties, rentals or plots..."
              className="flex-1 bg-white border border-slate-200 rounded-full px-5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
            <button
              type="submit"
              className="bg-emerald-600 text-white p-2.5 rounded-full hover:bg-emerald-700 disabled:opacity-50 transition-all shadow-lg shadow-emerald-600/20"
              disabled={isTyping}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
