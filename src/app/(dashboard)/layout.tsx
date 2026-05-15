"use client";

import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Navbar } from '@/components/layout/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-primary/30 overflow-hidden flex">
      {/* Premium Background Architecture */}
      <div className="fixed inset-0 z-0 mesh-gradient opacity-40" />
      <div className="fixed inset-0 z-0 noise-overlay" />
      
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen relative z-10 lg:ml-80 transition-all duration-500">
        <Navbar />
        
        <div className="flex-1 p-6 lg:p-8 overflow-hidden flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 20, scale: 0.98, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, scale: 0.98, filter: "blur(10px)" }}
              transition={{ 
                duration: 0.5, 
                ease: [0.22, 1, 0.36, 1],
                staggerChildren: 0.1
              }}
              className="flex-1 h-full overflow-y-auto no-scrollbar rounded-[32px] glass-panel p-1 relative"
            >
              <div className="h-full w-full p-6 lg:p-8">
                {children}
              </div>
              
              {/* Corner Accents */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/5 blur-3xl pointer-events-none" />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Global Decorative Orbs */}
      <div className="fixed top-1/4 -right-20 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none animate-pulse-slow" />
      <div className="fixed bottom-1/4 -left-20 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }} />
    </div>
  );
}

