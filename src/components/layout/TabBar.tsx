"use client";

import React from 'react';
import { useTabsStore, Tab } from '@/store/useTabsStore';
import { cn } from '@/lib/utils';
import { LucideIcon, X, LayoutDashboard, Users, Map as MapIcon, Truck, BarChart3, Wallet, Zap, Calendar, Columns2, MoreVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  Users,
  MapIcon,
  Truck,
  BarChart3,
  Wallet,
  Zap,
  Calendar
};

export function TabBar() {
  const { tabs, activeTabId, removeTab, setActiveTab, splitMode, toggleSplitMode } = useTabsStore();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 px-4 h-10 bg-black/5 border-b border-white/5 overflow-x-auto no-scrollbar">
      <AnimatePresence initial={false}>
        {tabs.map((tab) => {
          const Icon = iconMap[tab.icon] || LayoutDashboard;
          const isActive = tab.href === pathname;

          return (
            <motion.div
              key={tab.id}
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={cn(
                "group flex items-center gap-2 px-4 h-full min-w-[120px] max-w-[200px] cursor-pointer transition-all relative border-x border-white/5",
                isActive 
                  ? "bg-white/5 text-primary" 
                  : "text-muted-foreground hover:bg-white/[0.02] hover:text-white"
              )}
              onClick={() => setActiveTab(tab.id)}
            >
              <Link href={tab.href} className="flex items-center gap-2 flex-1">
                <Icon size={14} className={isActive ? "text-primary" : "text-muted-foreground"} />
                <span className="text-[11px] font-bold truncate tracking-tight">{tab.label}</span>
              </Link>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  removeTab(tab.id);
                }}
                className={cn(
                  "p-0.5 rounded hover:bg-white/10 transition-opacity",
                  isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                )}
              >
                <X size={10} />
              </button>

              {isActive && (
                <motion.div 
                  layoutId="tab-active-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary shadow-[0_0_10px_rgba(59,130,246,0.8)]" 
                />
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>

      <div className="ml-auto flex items-center gap-2 pr-4 border-l border-white/5 pl-4">
        <button 
          onClick={toggleSplitMode}
          className={cn(
            "p-2 rounded-xl transition-all",
            splitMode ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-muted-foreground hover:bg-white/5 hover:text-white"
          )}
          title="Toggle Split View"
        >
          <Columns2 size={16} />
        </button>
      </div>
    </div>
  );
}
