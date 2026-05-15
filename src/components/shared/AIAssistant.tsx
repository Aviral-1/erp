"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Zap, 
  Brain, 
  MessageSquare,
  Cpu,
  RefreshCcw,
  Plus,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  type?: 'text' | 'action' | 'insight';
}

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      role: 'assistant', 
      content: 'Hello Alex, I have analyzed today\'s operations. Fleet efficiency is up by 12% in Zone B. How can I help you optimize further?', 
      type: 'insight' 
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: `I've processed your request regarding "${input}". I recommend rerouting VEH-204 to cover the surge in Zone C.`,
        type: 'action'
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-black/20 backdrop-blur-3xl rounded-[32px] border border-white/5 overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="p-6 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="font-black text-sm text-white">Fleet AI</h3>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Neural Sync Active</span>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
          <RefreshCcw size={16} />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={cn(
                "flex gap-4 max-w-[85%]",
                msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-lg",
                msg.role === 'assistant' ? "bg-primary/20 text-primary" : "bg-white/10 text-white"
              )}>
                {msg.role === 'assistant' ? <Bot size={16} /> : <User size={16} />}
              </div>
              <div className={cn(
                "p-4 rounded-2xl text-sm leading-relaxed",
                msg.role === 'assistant' 
                  ? "bg-white/5 border border-white/5 text-slate-200" 
                  : "bg-primary text-white shadow-xl shadow-primary/20"
              )}>
                {msg.content}
                {msg.type === 'action' && (
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" className="h-8 text-[10px] bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg">Execute Reroute</Button>
                    <Button size="sm" variant="outline" className="h-8 text-[10px] border-white/10 hover:bg-white/5 text-white rounded-lg">Analyze Impact</Button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Suggested Actions */}
      <div className="px-6 pb-2 overflow-x-auto no-scrollbar flex gap-2">
        {[
          { label: 'Optimize Routes', icon: Zap },
          { label: 'Predictive Demand', icon: Brain },
          { label: 'Fuel Report', icon: Cpu },
        ].map((action, i) => (
          <Button 
            key={i}
            variant="outline" 
            size="sm" 
            className="rounded-xl border-white/5 bg-white/5 hover:bg-white/10 text-[10px] font-bold text-muted-foreground hover:text-white h-8 whitespace-nowrap"
          >
            <action.icon size={12} className="mr-2" />
            {action.label}
          </Button>
        ))}
      </div>

      {/* Input */}
      <div className="p-6">
        <div className="relative group">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Fleet AI... (Cmd + J)"
            className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-6 pr-14 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all placeholder:text-muted-foreground/30"
          />
          <button 
            onClick={handleSend}
            className="absolute right-2 top-2 w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center hover:scale-105 transition-transform active:scale-95 shadow-lg shadow-primary/20"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-[10px] text-center text-muted-foreground mt-3">
          AI can make mistakes. Verify critical operations manually.
        </p>
      </div>
    </div>
  );
}
