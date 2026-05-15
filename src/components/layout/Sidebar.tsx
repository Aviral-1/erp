"use client";

import React, { useState } from 'react';
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
  Wallet,
  Calendar,
  MapPin,
  Layers,
  Recycle,
  Building2,
  Activity,
  Receipt,
  CreditCard,
  TrendingUp,
  AlertTriangle,
  Link as LinkIcon,
  ShieldCheck,
  User,
  ArrowUpRight,
  PlusCircle,
  HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useLayoutStore } from '@/store/useLayoutStore';
import { useTabsStore } from '@/store/useTabsStore';
import { motion, AnimatePresence } from 'framer-motion';

// --- CONFIGURATION ---

const menuGroups = [
  { 
    group: 'Overview', 
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard', id: 'dashboard', color: 'text-blue-400' },
      { icon: MapIcon, label: 'Live Map', href: '/map', id: 'map', badge: 'Live', color: 'text-primary' },
      { icon: BarChart3, label: 'Smart Analytics', href: '/analytics', id: 'analytics', color: 'text-purple-400' },
      { icon: FileText, label: 'Reports', href: '/reports', id: 'reports', color: 'text-slate-400' },
      { icon: Sparkles, label: 'AI Insights', href: '/ai-insights', id: 'ai-insights', color: 'text-pink-400' },
    ]
  },
  { 
    group: 'Operations', 
    items: [
      { icon: Users, label: 'Customers', href: '/customers', id: 'customers', color: 'text-blue-400' },
      { icon: User, label: 'Drivers', href: '/drivers', id: 'drivers', color: 'text-emerald-400' },
      { icon: Truck, label: 'Vehicles', href: '/vehicles', id: 'vehicles', color: 'text-orange-400' },
      { icon: Calendar, label: 'Smart Scheduling', href: '/scheduling', id: 'scheduling', color: 'text-indigo-400' },
      { icon: Bell, label: 'Collection Requests', href: '/requests', id: 'requests', badge: '12', color: 'text-amber-400' },
      { icon: Zap, label: 'Route Optimization', href: '/routing', id: 'routing', color: 'text-cyan-400' },
      { icon: MapPin, label: 'Geo Fencing', href: '/geofencing', id: 'geofencing', color: 'text-red-400' },
      { icon: Trash2, label: 'Bin Monitoring', href: '/bins', id: 'bins', color: 'text-emerald-500' },
    ]
  },
  { 
    group: 'Waste Management', 
    items: [
      { icon: Layers, label: 'Waste Categories', href: '/categories', id: 'categories', color: 'text-slate-300' },
      { icon: Recycle, label: 'Recycling Centers', href: '/recycling', id: 'recycling', color: 'text-emerald-400' },
      { icon: Building2, label: 'Dump Yards', href: '/dump-yards', id: 'dump-yards', color: 'text-amber-600' },
      { icon: Activity, label: 'Waste Processing', href: '/processing', id: 'processing', color: 'text-blue-500' },
    ]
  },
  { 
    group: 'Finance', 
    items: [
      { icon: Wallet, label: 'Billing', href: '/billing', id: 'billing', color: 'text-cyan-400' },
      { icon: Receipt, label: 'Invoices', href: '/invoices', id: 'invoices', color: 'text-slate-400' },
      { icon: CreditCard, label: 'Expenses', href: '/expenses', id: 'expenses', color: 'text-red-400' },
      { icon: TrendingUp, label: 'Revenue Analytics', href: '/revenue', id: 'revenue', color: 'text-emerald-400' },
    ]
  },
  { 
    group: 'System', 
    items: [
      { icon: AlertTriangle, label: 'Alerts', href: '/alerts', id: 'alerts', badge: 'Critical', color: 'text-red-500' },
      { icon: LinkIcon, label: 'Integrations', href: '/integrations', id: 'integrations', color: 'text-blue-400' },
      { icon: ShieldCheck, label: 'User Management', href: '/users', id: 'users', color: 'text-purple-400' },
      { icon: Settings, label: 'Settings', href: '/settings', id: 'settings', color: 'text-slate-400' },
    ]
  }
];

export function Sidebar() {
  const pathname = usePathname();
  const { 
    sidebarCollapsed, 
    setSidebarCollapsed, 
    sidebarPosition, 
    theme 
  } = useLayoutStore();

  const { addTab } = useTabsStore();
  const isDark = theme === 'glass-dark' || theme === 'cyber-neon';

  return (
    <motion.aside
      initial={false}
      animate={{ 
        width: sidebarCollapsed ? 84 : 320,
        x: 0,
      }}
      className={cn(
        "relative h-screen flex flex-col transition-all duration-500 ease-in-out z-50",
        "border-r border-white/5",
        sidebarPosition === 'right' ? "order-last border-l border-r-0" : "border-r",
        isDark ? "glass-dark text-white" : "glass text-slate-900"
      )}
    >
      {/* 1. LOGO SECTION */}
      <div className="p-6 flex items-center justify-between overflow-hidden shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="absolute -inset-2 bg-primary/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20">
              <Trash2 size={24} className="group-hover:rotate-12 transition-transform duration-500" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-950 animate-pulse" />
          </div>
          
          <AnimatePresence mode="wait">
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex flex-col"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black tracking-tight leading-none">WasteWise</span>
                  <Badge className="bg-primary/10 text-primary border-none text-[8px] font-black h-4 px-1.5 rounded-md">PRO</Badge>
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mt-1">Enterprise Fleet</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 2. GLOBAL OPERATIONS CARD */}
      <AnimatePresence>
        {!sidebarCollapsed && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="px-6 mb-6 shrink-0"
          >
            <div className="relative group">
              <div className="absolute -inset-px bg-gradient-to-r from-primary/50 to-purple-500/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
              <div className="relative p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/[0.08] transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span className="text-xs font-black text-white tracking-wide">Global Operations</span>
                  </div>
                  <MoreVertical size={14} className="text-slate-500" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Active Routes</p>
                    <p className="text-lg font-black text-white tracking-tight">42 / 48</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Zap size={20} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. NAVIGATION GROUPS */}
      <nav className="flex-1 px-4 space-y-8 overflow-y-auto no-scrollbar pb-10">
        {menuGroups.map((group) => (
          <div key={group.group} className="space-y-1">
            {!sidebarCollapsed && (
              <h3 className="px-4 text-[10px] font-black uppercase tracking-[0.25em] text-slate-500/80 mb-3 flex items-center gap-2">
                {group.group}
                <div className="flex-1 h-px bg-white/5" />
              </h3>
            )}
            <div className="space-y-0.5">
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
                      icon: item.id 
                    })}
                  >
                    <div className={cn(
                      "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group relative overflow-hidden",
                      isActive 
                        ? "bg-primary text-white shadow-xl shadow-primary/20 glow-cyan" 
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    )}>
                      {isActive && (
                        <motion.div 
                          layoutId="active-nav-glow"
                          className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent pointer-events-none"
                        />
                      )}
                      
                      <item.icon size={18} className={cn(
                        "shrink-0 transition-all duration-500",
                        isActive ? "scale-110" : cn("group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]", item.color)
                      )} />
                      
                      <AnimatePresence>
                        {!sidebarCollapsed && (
                          <motion.span 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="font-bold text-sm tracking-tight flex-1 whitespace-nowrap"
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>

                      {!sidebarCollapsed && item.badge && (
                        <Badge className={cn(
                          "px-1.5 py-0.5 rounded-md text-[9px] font-black tracking-tight",
                          item.badge === 'Live' ? "bg-red-500 animate-pulse" : "bg-primary/20 text-primary border-none"
                        )}>
                          {item.badge}
                        </Badge>
                      )}

                      {sidebarCollapsed && (
                        <div className={cn(
                          "absolute left-full ml-4 px-3 py-2 rounded-xl text-xs font-black opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 translate-x-4 group-hover:translate-x-0 whitespace-nowrap z-[100] shadow-2xl backdrop-blur-xl border border-white/10",
                          isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"
                        )}>
                          {item.label}
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        {/* 5. CUSTOMER MODULE WIDGET (Expanded Only) */}
        {!sidebarCollapsed && (
          <div className="px-2 pt-4">
            <div className="p-5 rounded-[28px] bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Customer Intel</h4>
                  <TrendingUp size={14} className="text-emerald-500" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[18px] font-black text-white leading-none">1,120</p>
                    <p className="text-[8px] font-bold text-slate-500 uppercase mt-1">Total</p>
                  </div>
                  <div>
                    <p className="text-[18px] font-black text-white leading-none">980</p>
                    <p className="text-[8px] font-bold text-slate-500 uppercase mt-1">Active</p>
                  </div>
                  <div className="pt-2">
                    <p className="text-[18px] font-black text-white leading-none">85</p>
                    <p className="text-[8px] font-bold text-slate-500 uppercase mt-1">Pending KYC</p>
                  </div>
                  <div className="pt-2">
                    <p className="text-[18px] font-black text-emerald-400 leading-none">+24</p>
                    <p className="text-[8px] font-bold text-slate-500 uppercase mt-1">New</p>
                  </div>
                </div>
              </div>
              <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-blue-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            </div>
          </div>
        )}
      </nav>

      {/* 6. LIVE OPERATIONS WIDGET (Collapsed Friendly) */}
      <div className="px-4 py-4 shrink-0">
        {!sidebarCollapsed ? (
          <div className="p-4 rounded-3xl bg-slate-900/50 border border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Operational Health</span>
              <div className="flex gap-1">
                {[1,2,3,4,5].map(i => <div key={i} className={cn("w-1 h-3 rounded-full bg-emerald-500/30", i < 4 && "bg-emerald-500")} />)}
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] font-bold text-white uppercase">Efficiency</span>
                </div>
                <span className="text-[10px] font-black text-primary">94.2%</span>
              </div>
              <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: '94%' }} className="bg-primary h-full shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
              <Activity size={20} />
            </div>
          </div>
        )}
      </div>

      {/* 7. QUICK ACTIONS & PROFILE */}
      <div className="p-4 shrink-0 space-y-4">
        {!sidebarCollapsed && (
          <div className="grid grid-cols-2 gap-2">
            <Button size="sm" variant="outline" className="rounded-xl border-white/5 bg-white/5 text-[10px] font-bold uppercase h-10 hover:bg-white/10 text-white">
              <Plus size={14} className="mr-2" /> Add Task
            </Button>
            <Button size="sm" className="rounded-xl bg-primary text-white text-[10px] font-bold uppercase h-10 shadow-lg shadow-primary/20">
              <Sparkles size={14} className="mr-2" /> Ask AI
            </Button>
          </div>
        )}

        <div className={cn(
          "flex items-center gap-3 p-2 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-md relative group overflow-hidden",
          sidebarCollapsed && "justify-center p-3"
        )}>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-700 to-slate-900 border border-white/10 flex items-center justify-center text-white shrink-0 shadow-lg group-hover:scale-105 transition-transform">
              <User size={20} />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-950" />
          </div>
          
          {!sidebarCollapsed && (
            <div className="flex-1 overflow-hidden relative z-10">
              <p className="text-sm font-black text-white truncate tracking-tight">Alex Rivera</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mt-1">Systems Admin</p>
            </div>
          )}
          
          {!sidebarCollapsed && (
            <button className="relative z-10 text-slate-500 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5">
              <Settings size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        className={cn(
          "absolute top-8 w-6 h-6 flex items-center justify-center bg-slate-900 border border-white/10 text-white rounded-full shadow-2xl transition-all duration-500 hover:scale-110 hover:border-primary/50 group z-[1001]",
          sidebarCollapsed ? "left-[71px]" : "left-[307px]",
          sidebarPosition === 'right' && "left-auto -right-3 rotate-180"
        )}
      >
        <ChevronLeft size={14} className={cn("transition-transform duration-500", sidebarCollapsed && "rotate-180")} />
      </button>

      <style jsx global>{`
        .glow-cyan {
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.2);
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </motion.aside>
  );
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium border", className)}>
      {children}
    </span>
  );
}

