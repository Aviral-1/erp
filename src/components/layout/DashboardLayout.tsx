"use client";

import React from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { BottomDock } from './BottomDock';
import { RightPanel } from './RightPanel';
import { TabBar } from './TabBar';
import { ModuleHost } from './ModuleHost';
import { useLayoutStore } from '@/store/useLayoutStore';
import { useTabsStore } from '@/store/useTabsStore';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function DashboardLayout({ children }: { children?: React.ReactNode }) {
  const { 
    theme, 
    showBottomDock, 
  } = useLayoutStore();

  const { activeTabId, secondaryTabId, splitMode } = useTabsStore();

  const isDark = theme === 'glass-dark' || theme === 'cyber-neon';

  return (
    <div className={cn(
      "min-h-screen w-full flex overflow-hidden selection:bg-primary/30",
      theme === 'cyber-neon' ? "bg-black" : isDark ? "bg-[#020617]" : "bg-slate-50"
    )}>
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 bg-dots">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(59,130,246,0.15),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(147,51,234,0.1),transparent_50%)]" />
        {theme === 'cyber-neon' && (
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0.8)_2px,transparent_2px),linear-gradient(90deg,rgba(18,18,18,0.8)_2px,transparent_2px)] bg-[size:64px_64px] opacity-10" />
        )}
      </div>

      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 relative h-full z-10">
        <Navbar />
        <TabBar />
        
        <main className={cn(
          "flex-1 overflow-hidden relative p-4 transition-all duration-500 flex gap-4",
          showBottomDock && "pb-24"
        )}>
          {children ? (
            <div className="flex-1 h-full overflow-y-auto no-scrollbar rounded-3xl">
              {children}
            </div>
          ) : (
            <>
              {/* Multi-Tab / Split View Host */}
              <div className={cn(
                "flex-1 h-full overflow-y-auto no-scrollbar rounded-3xl transition-all duration-500",
                splitMode && "max-w-[50%]"
              )}>
                <ModuleHost moduleId={activeTabId} />
              </div>

              <AnimatePresence>
                {splitMode && (
                  <motion.div 
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    className="flex-1 h-full overflow-y-auto no-scrollbar rounded-3xl glass-dark border-white/5"
                  >
                    <ModuleHost moduleId={secondaryTabId || 'analytics'} />
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </main>
        
        <BottomDock />
      </div>

      <RightPanel />
    </div>
  );
}
