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
  Bell,
  Search,
  Sparkles,
  Zap,
  MoreVertical,
  Star,
  Plus,
  Wallet
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useLayoutStore } from '@/store/useLayoutStore';
import { useTabsStore } from '@/store/useTabsStore';
import { motion, AnimatePresence } from 'framer-motion';

const menuItems = [
  { group: 'Overview', items: [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard', id: 'dashboard', iconKey: 'LayoutDashboard' },
    { icon: MapIcon, label: 'Live Map', href: '/map', badge: 'Live', id: 'map', iconKey: 'MapIcon' },
  ]},
  { group: 'Operations', items: [
    { icon: Users, label: 'Customers', href: '/customers', id: 'customers', iconKey: 'Users' },
    { icon: Truck, label: 'Vehicles', href: '/vehicles', id: 'vehicles', iconKey: 'Truck' },
    { icon: Zap, label: 'Drivers', href: '/drivers', id: 'drivers', iconKey: 'Truck' },
  ]},
  { group: 'Finance', items: [
    { icon: Wallet, label: 'Billing', href: '/billing', id: 'billing', iconKey: 'Wallet' },
    { icon: BarChart3, label: 'Analytics', href: '/analytics', id: 'analytics', iconKey: 'BarChart3' },
  ]},
];

export function Sidebar() {
  const pathname = usePathname();
  const { 
    sidebarCollapsed, 
    setSidebarCollapsed, 
    sidebarPosition, 
    sidebarMode,
    theme 
  } = useLayoutStore();

  const { addTab } = useTabsStore();

  const isDark = theme === 'glass-dark' || theme === 'cyber-neon';

  return (
    <motion.aside
      initial={false}
      animate={{ 
        width: sidebarCollapsed ? 80 : 280,
        x: 0,
      }}
      className={cn(
        "relative h-screen flex flex-col transition-all duration-500 ease-in-out z-50",
        sidebarMode === 'floating' ? "m-4 rounded-3xl overflow-hidden shadow-2xl" : "border-r",
        sidebarPosition === 'right' ? "order-last border-l border-r-0" : "border-r border-white/10",
        isDark ? "glass-dark text-white" : "glass text-slate-900"
      )}
    >
      {/* Header / Logo */}
      <div className="p-6 flex items-center justify-between overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20">
            <Trash2 size={22} />
          </div>
          <AnimatePresence mode="wait">
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex flex-col"
              >
                <span className="text-lg font-bold tracking-tight leading-none">WasteWise</span>
                <span className="text-[10px] uppercase tracking-widest text-primary font-semibold">Enterprise</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Workspace Switcher Placeholder */}
      {!sidebarCollapsed && (
        <div className="px-4 mb-4">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 text-left group">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0">
              <Sparkles size={16} />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">Global Operations</p>
              <p className="text-[10px] text-muted-foreground">Premium Plan</p>
            </div>
            <MoreVertical size={14} className="text-muted-foreground group-hover:text-white transition-colors" />
          </button>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-6 overflow-y-auto no-scrollbar">
        {menuItems.map((group) => (
          <div key={group.group} className="space-y-1">
            {!sidebarCollapsed && (
              <h3 className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-2">
                {group.group}
              </h3>
            )}
            {group.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  onClick={() => addTab({ 
                    id: item.id, 
                    label: item.label, 
                    href: item.href, 
                    icon: item.iconKey 
                  })}
                >
                  <div className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group relative",
                    isActive 
                      ? "bg-primary text-white shadow-xl shadow-primary/30 glow-cyan" 
                      : "text-muted-foreground hover:bg-white/5 hover:text-white"
                  )}>
                    <item.icon size={20} className={cn(
                      "shrink-0 transition-transform duration-300",
                      isActive ? "scale-110" : "group-hover:scale-110"
                    )} />
                    
                    <AnimatePresence>
                      {!sidebarCollapsed && (
                        <motion.span 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className="font-medium text-sm flex-1"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {!sidebarCollapsed && item.badge && (
                      <span className="px-1.5 py-0.5 rounded-md bg-red-500 text-[10px] font-bold text-white uppercase animate-pulse">
                        {item.badge}
                      </span>
                    )}

                    {sidebarCollapsed && (
                      <div className={cn(
                        "absolute left-full ml-4 px-3 py-1.5 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 translate-x-2 group-hover:translate-x-0 whitespace-nowrap z-[100] shadow-2xl",
                        isDark ? "bg-slate-900 text-white border border-white/10" : "bg-white text-slate-900 border"
                      )}>
                        {item.label}
                      </div>
                    )}

                    {isActive && (
                      <motion.div 
                        layoutId="active-pill"
                        className="absolute -left-1 w-1 h-6 bg-white rounded-full"
                      />
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        ))}

        {/* Favorites Section */}
        {!sidebarCollapsed && (
          <div className="pt-4 border-t border-white/5">
            <div className="flex items-center justify-between px-3 mb-2">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
                Favorites
              </h3>
              <Plus size={14} className="text-muted-foreground hover:text-white cursor-pointer" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-3 px-3 py-2 rounded-xl text-muted-foreground hover:bg-white/5 hover:text-white cursor-pointer group">
                <Star size={16} className="text-amber-500" />
                <span className="text-sm font-medium">Daily Revenue</span>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Footer */}
      <div className="p-4 space-y-4">
        {!sidebarCollapsed && (
          <div className="p-3 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 border border-primary/20 relative overflow-hidden group">
            <div className="relative z-10">
              <p className="text-xs font-bold text-white mb-1">AI Assistant</p>
              <p className="text-[10px] text-white/60 mb-2">Ask me anything about your waste operations.</p>
              <Button size="sm" variant="secondary" className="h-7 text-[10px] w-full bg-white/10 hover:bg-white/20 border-white/10 text-white">
                Launch AI
              </Button>
            </div>
            <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-primary/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
          </div>
        )}

        <div className={cn(
          "flex items-center gap-3 p-2 rounded-2xl border border-white/5 bg-white/5",
          sidebarCollapsed && "justify-center"
        )}>
          <div className="w-8 h-8 rounded-full bg-slate-500 flex-shrink-0" />
          {!sidebarCollapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-bold truncate">Alex Rivera</p>
              <p className="text-[10px] text-muted-foreground truncate">Admin</p>
            </div>
          )}
          {!sidebarCollapsed && (
            <button className="text-muted-foreground hover:text-red-500 transition-colors">
              <LogOut size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        className={cn(
          "absolute top-1/2 -translate-y-1/2 w-6 h-12 flex items-center justify-center bg-primary text-white shadow-xl glow-cyan transition-all duration-300 hover:scale-110",
          sidebarPosition === 'right' ? "-left-3 rounded-l-xl" : "-right-3 rounded-r-xl"
        )}
      >
        {sidebarCollapsed 
          ? (sidebarPosition === 'right' ? <ChevronLeft size={16} /> : <ChevronRight size={16} />)
          : (sidebarPosition === 'right' ? <ChevronRight size={16} /> : <ChevronLeft size={16} />)
        }
      </button>
    </motion.aside>
  );
}

