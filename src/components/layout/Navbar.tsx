"use client";

import React from 'react';
import { 
  Bell, 
  Moon, 
  Sun, 
  Settings2,
  Cpu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLayoutStore } from '@/store/useLayoutStore';
import { cn } from '@/lib/utils';
import { CommandPalette } from '@/components/ui/command-palette';
import { LiveStatusIndicator } from '@/components/ui/premium';

export function Navbar() {
  const { 
    theme, 
    setTheme, 
  } = useLayoutStore();

  const isDark = theme === 'glass-dark' || theme === 'cyber-neon';

  return (
    <header className="h-20 px-8 flex items-center justify-between z-40 transition-all duration-300">
      {/* Search & Command Palette */}
      <div className="flex items-center gap-6 flex-1">
        <CommandPalette />
        
        <div className="hidden lg:flex items-center gap-6 pl-6 border-l border-white/10">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Active Fleet</span>
            <span className="text-sm font-black text-white">42 Trucks</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Efficiency</span>
            <span className="text-sm font-black text-emerald-400">98.2%</span>
          </div>
        </div>
      </div>

      {/* Tools & Settings */}
      <div className="flex items-center gap-4">
        <LiveStatusIndicator label="Operational" />

        <div className="w-px h-6 bg-white/10 mx-2" />

        <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-primary rounded-xl hover:bg-primary/10">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-slate-950 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
        </Button>

        <Button 
          variant="ghost" 
          size="icon" 
          className="text-slate-400 hover:text-primary rounded-xl hover:bg-primary/10"
          onClick={() => setTheme(isDark ? 'clean-light' : 'glass-dark')}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </Button>

        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary rounded-xl hover:bg-primary/10">
          <Settings2 size={20} />
        </Button>

        <div className="w-px h-8 bg-white/10 mx-2" />

        <div className="flex items-center gap-3 pl-2 group cursor-pointer">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-xs font-black text-white group-hover:text-primary transition-colors">Global Ops</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-tighter">Instance: #4209</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-indigo-600 p-[1px]">
            <div className="w-full h-full rounded-[11px] bg-slate-950 flex items-center justify-center text-primary">
              <Cpu size={18} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

