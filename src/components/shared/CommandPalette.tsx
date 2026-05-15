"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  User, 
  Truck, 
  Map as MapIcon, 
  BarChart3, 
  Settings,
  X,
  Command as CommandIcon,
  Plus,
  Zap,
  Globe,
  Cpu,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLayoutStore } from '@/store/useLayoutStore';
import { cn } from '@/lib/utils';

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const { theme } = useLayoutStore();

  const isDark = theme === 'glass-dark' || theme === 'cyber-neon';

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const items = [
    { icon: Globe, label: "Global Overview", href: "/dashboard", category: "Navigation", color: "text-blue-400" },
    { icon: User, label: "Customer Database", href: "/customers", category: "Navigation", color: "text-emerald-400" },
    { icon: Zap, label: "Instant Collection", href: "/requests/new", category: "Quick Action", color: "text-amber-400" },
    { icon: MapIcon, label: "Live Fleet Map", href: "/map", category: "Operational", color: "text-rose-400" },
    { icon: Cpu, label: "AI Insights", href: "/analytics", category: "Analytics", color: "text-purple-400" },
    { icon: Settings, label: "System Preferences", href: "/settings", category: "Admin", color: "text-slate-400" },
  ];

  const filteredItems = items.filter(item => 
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-start justify-center pt-[15vh] px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -20 }}
        className={cn(
          "relative w-full max-w-2xl rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border overflow-hidden",
          isDark ? "glass-dark border-white/10" : "glass border-slate-200"
        )}
      >
        <div className="p-6 border-b border-white/5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
            <Sparkles size={20} />
          </div>
          <input
            autoFocus
            placeholder="Search commands, pages, or AI actions..."
            className="flex-1 bg-transparent border-none outline-none text-xl font-medium placeholder:text-muted-foreground/50"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold text-muted-foreground">
            <span>ESC</span>
          </div>
        </div>

        <div className="max-h-[450px] overflow-y-auto no-scrollbar p-3">
          {filteredItems.length > 0 ? (
            <div className="space-y-6 p-2">
              <div>
                <p className="px-4 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-3">Suggested Commands</p>
                <div className="space-y-1">
                  {filteredItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        router.push(item.href);
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl hover:bg-white/5 transition-all group text-left"
                    >
                      <div className={cn("w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center transition-transform group-hover:scale-110", item.color)}>
                        <item.icon size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold">{item.label}</p>
                        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{item.category}</p>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                        <ChevronRight size={18} className="text-primary" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6 text-muted-foreground/30">
                <Search size={40} />
              </div>
              <h3 className="text-lg font-bold mb-2">No results found</h3>
              <p className="text-sm text-muted-foreground">Try searching for a different keyword or command.</p>
            </div>
          )}
        </div>

        <div className="p-4 bg-black/40 border-t border-white/5 flex items-center justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span className="bg-white/10 px-1.5 py-0.5 rounded border border-white/10 text-white">↑↓</span>
              Navigate
            </span>
            <span className="flex items-center gap-2">
              <span className="bg-white/10 px-1.5 py-0.5 rounded border border-white/10 text-white">ENTER</span>
              Execute
            </span>
          </div>
          <div className="flex items-center gap-2 text-primary/60">
            <CommandIcon size={14} />
            <span>AI Command System v2.0</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
