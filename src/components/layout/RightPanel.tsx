"use client";

import React from 'react';
import { 
  X, 
  Activity, 
  Zap, 
  Clock, 
  MessageSquare, 
  ChevronRight,
  TrendingUp,
  MapPin,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLayoutStore } from '@/store/useLayoutStore';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { AIAssistant } from '@/components/shared/AIAssistant';

export function RightPanel() {
  const { showRightPanel, setShowRightPanel, theme } = useLayoutStore();
  const isDark = theme === 'glass-dark' || theme === 'cyber-neon';

  return (
    <AnimatePresence>
      {showRightPanel && (
        <motion.aside
          initial={{ x: 320, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 320, opacity: 0 }}
          className={cn(
            "w-80 h-screen border-l flex flex-col transition-all duration-300 z-40 overflow-hidden",
            isDark ? "glass-dark border-white/5" : "glass border-slate-200"
          )}
        >
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <h3 className="font-bold text-sm tracking-tight flex items-center gap-2">
              <Activity size={16} className="text-primary" />
              Live Insights
            </h3>
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg" onClick={() => setShowRightPanel(false)}>
              <X size={16} />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-8">
            {/* Live Activity Feed */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Recent Activity</h4>
                <span className="text-[10px] text-primary font-bold">See all</span>
              </div>
              <div className="space-y-4">
                {[
                  { icon: Zap, color: 'text-amber-500', title: 'Pickup Completed', time: '2m ago', desc: 'Driver #102 collected from Site A' },
                  { icon: MapPin, color: 'text-blue-500', title: 'Route Optimization', time: '15m ago', desc: 'AI optimized 12 routes for tomorrow' },
                  { icon: TrendingUp, color: 'text-emerald-500', title: 'Revenue Spike', time: '1h ago', desc: 'Daily revenue exceeded target by 12%' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className={cn("w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform", item.color)}>
                      <item.icon size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <p className="text-xs font-bold truncate">{item.title}</p>
                        <span className="text-[10px] text-muted-foreground">{item.time}</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground line-clamp-2">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Analytics */}
            <section className="space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Fleet Status</h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Active', value: '42', color: 'bg-emerald-500' },
                  { label: 'Standby', value: '8', color: 'bg-amber-500' },
                  { label: 'Repair', value: '3', color: 'bg-red-500' },
                  { label: 'Offline', value: '2', color: 'bg-slate-500' },
                ].map((stat, i) => (
                  <div key={i} className="p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <div className={cn("w-1.5 h-1.5 rounded-full", stat.color)} />
                      <span className="text-[10px] font-medium text-muted-foreground">{stat.label}</span>
                    </div>
                    <p className="text-lg font-bold">{stat.value}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* AI Assistant Context */}
            <div className="flex-1 min-h-[400px]">
              <AIAssistant />
            </div>

            {/* Calendar / Schedule */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Upcoming Schedule</h4>
                <Calendar size={14} className="text-muted-foreground" />
              </div>
              <div className="space-y-3">
                {[
                  { time: '09:00 AM', title: 'Site Inspection', type: 'High Priority' },
                  { time: '11:30 AM', title: 'Fleet Review', type: 'Medium' },
                  { time: '02:00 PM', title: 'Customer Meeting', type: 'Low' },
                ].map((task, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
                    <div className="text-[10px] font-bold text-primary whitespace-nowrap">{task.time}</div>
                    <div className="flex-1 border-l border-white/10 pl-3">
                      <p className="text-xs font-medium group-hover:text-primary transition-colors">{task.title}</p>
                      <p className="text-[9px] text-muted-foreground">{task.type}</p>
                    </div>
                    <ChevronRight size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-all" />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
