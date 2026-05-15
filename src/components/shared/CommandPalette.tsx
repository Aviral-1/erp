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
  Plus
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

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
    { icon: User, label: "View Customers", href: "/customers", category: "Navigation" },
    { icon: Plus, label: "Add New Customer", href: "/customers/new", category: "Actions" },
    { icon: MapIcon, label: "Live Tracking Map", href: "/map", category: "Navigation" },
    { icon: Truck, label: "Fleet Management", href: "/vehicles", category: "Navigation" },
    { icon: BarChart3, label: "Analytics Dashboard", href: "/analytics", category: "Navigation" },
    { icon: Settings, label: "System Settings", href: "/settings", category: "Navigation" },
  ];

  const filteredItems = items.filter(item => 
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
      >
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <Search className="text-slate-400" size={20} />
          <input
            autoFocus
            placeholder="Search commands, pages, or customers..."
            className="flex-1 bg-transparent border-none outline-none text-lg text-slate-900 dark:text-white placeholder:text-slate-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] font-bold text-slate-400">
            <span>ESC</span>
          </div>
        </div>

        <div className="max-h-[400px] overflow-y-auto p-2">
          {filteredItems.length > 0 ? (
            <div className="space-y-4 py-2">
              <div className="px-3">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Suggestions</p>
                <div className="mt-2 space-y-1">
                  {filteredItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        router.push(item.href);
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group text-left"
                    >
                      <div className="w-9 h-9 rounded-lg bg-slate-50 dark:bg-slate-950 flex items-center justify-center text-slate-500 group-hover:text-primary transition-colors">
                        <item.icon size={18} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.label}</p>
                        <p className="text-xs text-slate-400">{item.category}</p>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight size={16} className="text-slate-300" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4 text-slate-400">
                <Search size={32} />
              </div>
              <p className="text-slate-900 dark:text-white font-semibold">No results found</p>
              <p className="text-sm text-slate-400">Try searching for something else</p>
            </div>
          )}
        </div>

        <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><span className="bg-white dark:bg-slate-700 px-1 rounded shadow-sm">↑↓</span> to navigate</span>
            <span className="flex items-center gap-1"><span className="bg-white dark:bg-slate-700 px-1 rounded shadow-sm">ENTER</span> to select</span>
          </div>
          <div className="flex items-center gap-1">
            <CommandIcon size={12} />
            <span>Search System</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const ChevronRight = ({ className, size }: { className?: string; size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
