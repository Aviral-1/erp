"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Truck, 
  Map as MapIcon, 
  BarChart3, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Trash2,
  FileText,
  Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/useAppStore';
import { motion } from 'framer-motion';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Users, label: 'Customers', href: '/customers' },
  { icon: MapIcon, label: 'Live Map', href: '/map' },
  { icon: Truck, label: 'Vehicles', href: '/vehicles' },
  { icon: BarChart3, label: 'Analytics', href: '/analytics' },
  { icon: FileText, label: 'Reports', href: '/reports' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useAppStore();

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarCollapsed ? 80 : 280 }}
      className={cn(
        "relative h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-all duration-300 ease-in-out z-50",
        sidebarCollapsed ? "w-20" : "w-[280px]"
      )}
    >
      <div className="p-6 flex items-center gap-3 overflow-hidden whitespace-nowrap">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shrink-0">
          <Trash2 size={24} />
        </div>
        {!sidebarCollapsed && (
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            WasteWise
          </motion.span>
        )}
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative",
                isActive 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
              )}>
                <item.icon size={22} className={cn("shrink-0", isActive ? "text-white" : "group-hover:scale-110 transition-transform")} />
                {!sidebarCollapsed && (
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-medium"
                  >
                    {item.label}
                  </motion.span>
                )}
                {sidebarCollapsed && (
                  <div className="absolute left-full ml-6 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[100]">
                    {item.label}
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <Button 
          variant="ghost" 
          className={cn("w-full justify-start gap-3 text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30", sidebarCollapsed && "justify-center px-0")}
        >
          <LogOut size={22} />
          {!sidebarCollapsed && <span>Logout</span>}
        </Button>
      </div>

      <Button
        onClick={toggleSidebar}
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm z-[60] hover:bg-primary hover:text-white"
      >
        {sidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </Button>
    </motion.aside>
  );
}
