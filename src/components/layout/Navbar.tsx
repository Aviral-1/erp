"use client";

import React from 'react';
import { 
  Search, 
  Bell, 
  Moon, 
  Sun, 
  Command, 
  Layout, 
  Maximize2, 
  Plus, 
  Settings2,
  Cpu,
  Globe,
  Monitor
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLayoutStore } from '@/store/useLayoutStore';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function Navbar() {
  const { 
    theme, 
    setTheme, 
    sidebarPosition, 
    setSidebarPosition,
    sidebarMode,
    setSidebarMode,
    showBottomDock,
    setShowBottomDock,
    showRightPanel,
    setShowRightPanel
  } = useLayoutStore();

  const isDark = theme === 'glass-dark' || theme === 'cyber-neon';

  return (
    <header className={cn(
      "h-16 px-6 flex items-center justify-between z-40 transition-all duration-300",
      isDark ? "bg-black/20 backdrop-blur-md border-b border-white/5" : "bg-white/40 backdrop-blur-md border-b border-slate-200"
    )}>
      {/* Search & Command Palette */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative group flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search anything... (Cmd + K)"
            className={cn(
              "w-full h-10 pl-10 pr-4 rounded-xl text-sm transition-all duration-300 border focus:outline-none focus:ring-2",
              isDark 
                ? "bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:ring-primary/40 focus:border-primary/40" 
                : "bg-slate-100/50 border-slate-200 focus:ring-primary/20 focus:border-primary"
            )}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-[10px] font-bold text-muted-foreground pointer-events-none">
            <Command size={10} />
            <span>K</span>
          </div>
        </div>
        
        <Button variant="outline" size="sm" className="hidden md:flex items-center gap-2 rounded-xl bg-primary/5 border-primary/20 hover:bg-primary/10 text-primary">
          <Plus size={16} />
          <span>Quick Create</span>
        </Button>
      </div>

      {/* Tools & Settings */}
      <div className="flex items-center gap-2">
        {/* Layout Customizer Trigger */}
        <div className="flex items-center gap-1 mr-4 bg-white/5 p-1 rounded-xl border border-white/5">
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn("w-8 h-8 rounded-lg", sidebarPosition === 'left' ? "bg-primary/20 text-primary" : "text-muted-foreground")}
            onClick={() => setSidebarPosition('left')}
          >
            <Layout size={16} className="rotate-0" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn("w-8 h-8 rounded-lg", sidebarPosition === 'right' ? "bg-primary/20 text-primary" : "text-muted-foreground")}
            onClick={() => setSidebarPosition('right')}
          >
            <Layout size={16} className="rotate-180" />
          </Button>
          <div className="w-px h-4 bg-white/10 mx-1" />
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn("w-8 h-8 rounded-lg", showRightPanel ? "bg-purple-500/20 text-purple-400" : "text-muted-foreground")}
            onClick={() => setShowRightPanel(!showRightPanel)}
          >
            <Settings2 size={16} />
          </Button>
        </div>

        {/* Sync Status */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-bold uppercase tracking-wider mr-4">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Live Sync
        </div>

        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-primary rounded-xl">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-background" />
        </Button>

        <Button 
          variant="ghost" 
          size="icon" 
          className="text-muted-foreground hover:text-primary rounded-xl"
          onClick={() => setTheme(isDark ? 'clean-light' : 'glass-dark')}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </Button>

        <div className="w-px h-8 bg-white/10 mx-2" />

        <div className="flex items-center gap-3 pl-2">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-xs font-bold leading-none">Global Ops</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-tighter">Instance: #4209</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 cursor-pointer hover:scale-105 transition-transform">
            <Cpu size={18} />
          </div>
        </div>
      </div>
    </header>
  );
}
