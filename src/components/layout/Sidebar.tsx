"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Map as MapIcon, 
  BarChart3, 
  Settings,
  Trash2,
  ChevronRight,
  LogOut,
  Command as CommandIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Users, label: 'Customers', href: '/customers' },
  { icon: MapIcon, label: 'Live Map', href: '/map' },
  { icon: BarChart3, label: 'Analytics', href: '/analytics' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-6 top-6 bottom-6 w-20 lg:w-72 z-50">
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="h-full glass-panel rounded-[32px] flex flex-col p-5 shadow-2xl relative group/sidebar"
      >
        {/* Animated Accent Glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/20 blur-[80px] rounded-full pointer-events-none opacity-50 group-hover/sidebar:opacity-100 transition-opacity duration-1000" />
        
        {/* Logo Section */}
        <div className="mb-10 flex items-center justify-center lg:justify-start lg:px-4 pt-2">
          <div className="relative group/logo">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-emerald-500 rounded-xl blur opacity-25 group-hover/logo:opacity-75 transition duration-1000 group-hover:duration-200" />
            <div className="relative w-11 h-11 bg-slate-950 rounded-xl flex items-center justify-center border border-white/10">
              <Trash2 className="text-primary w-6 h-6" />
            </div>
          </div>
          <div className="hidden lg:block ml-4">
            <span className="text-white font-black text-xl tracking-tighter uppercase italic">
              Waste<span className="text-primary">Wise</span>
            </span>
            <div className="h-px w-full bg-gradient-to-r from-primary/50 to-transparent" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-3 relative">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className="block relative group/nav"
              >
                <div className={cn(
                  "flex items-center justify-center lg:justify-start px-4 py-3.5 rounded-[20px] transition-all duration-500 relative overflow-hidden",
                  isActive 
                    ? "bg-primary/10 text-white" 
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}>
                  <AnimatePresence>
                    {isActive && (
                      <motion.div 
                        layoutId="sidebar-active-bg"
                        className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-[20px]"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </AnimatePresence>
                  
                  <item.icon className={cn(
                    "w-5 h-5 transition-all duration-500 relative z-10",
                    isActive ? "text-primary scale-110 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" : "group-hover/nav:text-white group-hover/nav:scale-110"
                  )} />
                  
                  <span className={cn(
                    "hidden lg:block ml-4 font-bold text-sm tracking-wide transition-all duration-500 relative z-10",
                    isActive ? "opacity-100 translate-x-1" : "opacity-60 group-hover/nav:opacity-100 group-hover/nav:translate-x-1"
                  )}>
                    {item.label}
                  </span>

                  {isActive && (
                    <motion.div 
                      layoutId="sidebar-indicator"
                      className="absolute right-4 hidden lg:block"
                    >
                      <ChevronRight size={14} className="text-primary animate-pulse" />
                    </motion.div>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Quick Actions / Status */}
        <div className="mt-auto space-y-4">
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hidden lg:block">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Efficiency</span>
              <span className="text-[10px] font-bold text-emerald-400">94%</span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "94%" }}
                className="h-full bg-gradient-to-r from-primary to-emerald-500" 
              />
            </div>
          </div>

          {/* User Profile */}
          <div className="pt-4 border-t border-white/5">
            <div className="flex items-center justify-center lg:justify-between lg:px-2 py-2">
              <div className="flex items-center">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-full blur-[2px] opacity-50" />
                  <div className="relative w-10 h-10 rounded-full bg-slate-900 border border-white/20 overflow-hidden">
                    <img 
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                      alt="User" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-950 rounded-full" />
                </div>
                <div className="hidden lg:block ml-4">
                  <p className="text-white text-xs font-black tracking-tight">Aviral Srivastava</p>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-tighter">Fleet Commander</p>
                </div>
              </div>
              <button className="hidden lg:flex p-2 text-slate-500 hover:text-white transition-colors">
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </aside>
  );
}

