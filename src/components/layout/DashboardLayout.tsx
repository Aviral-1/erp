"use client";

import React from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { BottomDock } from './BottomDock';
import { RightPanel } from './RightPanel';
import { useLayoutStore } from '@/store/useLayoutStore';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { 
    sidebarPosition, 
    theme, 
    showBottomDock, 
    sidebarCollapsed,
    sidebarMode
  } = useLayoutStore();

  const isDark = theme === 'glass-dark' || theme === 'cyber-neon';

  return (
    <div className={cn(
      "flex h-screen overflow-hidden transition-colors duration-500",
      isDark ? "bg-[#020617] text-slate-100" : "bg-slate-50 text-slate-900",
      theme === 'cyber-neon' && "selection:bg-cyan-500 selection:text-black"
    )}>
      {/* Dynamic Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 relative h-full">
        <Navbar />
        
        <main className={cn(
          "flex-1 overflow-y-auto no-scrollbar relative p-6 transition-all duration-500",
          showBottomDock && "pb-32"
        )}>
          {/* Futuristic background blobs */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse delay-700" />
            {theme === 'cyber-neon' && (
              <>
                <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse delay-300" />
                <div className="absolute bottom-[30%] left-[20%] w-[25%] h-[25%] bg-pink-500/10 rounded-full blur-[100px] animate-pulse delay-500" />
              </>
            )}
          </div>

          <div className="relative z-10 max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>

        <BottomDock />
      </div>

      <RightPanel />

      {/* Global AI Command Palette Trigger (Cmd+K) Placeholder */}
      <AnimatePresence>
        {/* Command palette component would go here */}
      </AnimatePresence>
    </div>
  );
}
