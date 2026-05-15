"use strict";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Map as MapIcon, 
  BarChart3, 
  Settings,
  Trash2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

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
    <aside className="fixed left-4 top-4 bottom-4 w-20 lg:w-64 z-50">
      <div className="h-full bg-slate-950/90 backdrop-blur-xl border border-white/10 rounded-3xl flex flex-col p-4 shadow-2xl overflow-hidden relative">
        {/* Decorative Gradient */}
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none" />
        
        {/* Logo Section */}
        <div className="mb-8 flex items-center justify-center lg:justify-start lg:px-4 pt-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Trash2 className="text-white w-6 h-6" />
          </div>
          <span className="hidden lg:block ml-3 text-white font-bold text-lg tracking-tight">
            WasteWise
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 relative">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className="block relative group"
              >
                <div className={cn(
                  "flex items-center justify-center lg:justify-start px-3 py-3 rounded-2xl transition-all duration-300 relative overflow-hidden",
                  isActive 
                    ? "bg-white/10 text-white shadow-inner" 
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}>
                  {isActive && (
                    <motion.div 
                      layoutId="sidebar-active"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  <item.icon className={cn(
                    "w-6 h-6 transition-transform duration-300 group-hover:scale-110",
                    isActive ? "text-blue-400" : ""
                  )} />
                  
                  <span className={cn(
                    "hidden lg:block ml-3 font-medium text-sm transition-opacity duration-300",
                    isActive ? "opacity-100" : "opacity-80 group-hover:opacity-100"
                  )}>
                    {item.label}
                  </span>

                  {isActive && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute right-3 hidden lg:block w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                    />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer / User Profile Placeholder */}
        <div className="mt-auto pt-4 border-t border-white/5">
          <div className="flex items-center justify-center lg:justify-start lg:px-2 py-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 border border-white/20 p-0.5">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                  alt="User" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="hidden lg:block ml-3">
              <p className="text-white text-xs font-semibold">Aviral Srivastava</p>
              <p className="text-slate-500 text-[10px]">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
