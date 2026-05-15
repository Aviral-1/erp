"use client";

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Plus, 
  Filter, 
  ChevronLeft, 
  ChevronRight,
  MoreVertical,
  Truck,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const TIME_SLOTS = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'];

const SCHEDULE_ITEMS = [
  { id: 1, driver: 'Rahul S.', vehicle: 'VEH-201', zone: 'Zone A', time: '08:00', day: 'Mon', status: 'Completed', progress: 100 },
  { id: 2, driver: 'Amit K.', vehicle: 'VEH-202', zone: 'Zone B', time: '10:00', day: 'Mon', status: 'In Progress', progress: 65 },
  { id: 3, driver: 'Vikram S.', vehicle: 'VEH-203', zone: 'Zone C', time: '14:00', day: 'Mon', status: 'Scheduled', progress: 0 },
  { id: 4, driver: 'Suresh R.', vehicle: 'VEH-204', zone: 'Zone D', time: '16:00', day: 'Mon', status: 'Issue', progress: 10 },
];

export default function SchedulingPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8 pb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-2 mb-2">
              <Zap size={16} className="text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Operational Logic</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight lg:text-5xl">Smart Scheduling</h1>
            <p className="text-muted-foreground mt-2 max-w-xl text-sm font-medium">
              AI-driven route optimization and dynamic collection scheduling.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
            <div className="flex items-center glass border-white/10 rounded-2xl p-1 px-2 gap-1 h-12">
              <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg hover:bg-white/10"><ChevronLeft size={16} /></Button>
              <span className="text-xs font-bold px-3">May 15 - May 21, 2026</span>
              <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg hover:bg-white/10"><ChevronRight size={16} /></Button>
            </div>
            <Button size="sm" className="rounded-xl bg-primary text-white shadow-xl shadow-primary/30 text-xs font-bold h-12 px-6">
              <Plus size={16} className="mr-2" /> New Task
            </Button>
          </motion.div>
        </div>

        {/* Schedule Grid */}
        <div className="glass border-white/10 rounded-[40px] overflow-hidden shadow-2xl relative">
          {/* Calendar Header */}
          <div className="grid grid-cols-8 border-b border-white/5">
            <div className="p-6 border-r border-white/5 flex items-center justify-center">
              <Clock size={20} className="text-muted-foreground" />
            </div>
            {DAYS.map((day) => (
              <div key={day} className="p-6 text-center border-r border-white/5 last:border-r-0">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{day}</p>
                <p className="text-lg font-black">{15 + DAYS.indexOf(day)}</p>
              </div>
            ))}
          </div>

          {/* Calendar Body */}
          <div className="max-h-[600px] overflow-y-auto no-scrollbar">
            {TIME_SLOTS.map((time) => (
              <div key={time} className="grid grid-cols-8 border-b border-white/5 last:border-b-0 min-h-[120px]">
                <div className="p-4 border-r border-white/5 flex items-start justify-center">
                  <span className="text-xs font-bold text-muted-foreground">{time}</span>
                </div>
                {DAYS.map((day) => {
                  const items = SCHEDULE_ITEMS.filter(i => i.day === day && i.time === time);
                  return (
                    <div key={`${day}-${time}`} className="p-2 border-r border-white/5 last:border-r-0 relative group">
                      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {items.map(item => (
                        <motion.div 
                          key={item.id}
                          whileHover={{ scale: 1.02 }}
                          className={cn(
                            "p-3 rounded-2xl border mb-2 cursor-pointer shadow-lg relative z-10",
                            item.status === 'Completed' ? "bg-emerald-500/10 border-emerald-500/20" :
                            item.status === 'In Progress' ? "bg-primary/10 border-primary/20 shadow-primary/10" :
                            item.status === 'Issue' ? "bg-red-500/10 border-red-500/20" :
                            "bg-white/5 border-white/10"
                          )}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[9px] font-black uppercase tracking-wider opacity-60">{item.zone}</span>
                            <MoreVertical size={12} className="opacity-40" />
                          </div>
                          <p className="text-xs font-black truncate mb-1">{item.driver}</p>
                          <div className="flex items-center gap-2 text-[9px] font-bold text-muted-foreground">
                            <Truck size={10} />
                            {item.vehicle}
                          </div>
                          
                          {item.progress > 0 && item.progress < 100 && (
                            <div className="mt-3 h-1 bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-primary" style={{ width: `${item.progress}%` }} />
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* AI Optimizer Overlay Overlay */}
          <div className="absolute bottom-6 left-6 z-20">
            <Button className="rounded-2xl glass-dark border-primary/40 text-primary hover:bg-primary/10 px-6 h-12 shadow-[0_0_30px_rgba(59,130,246,0.4)]">
              <Zap size={18} className="mr-2" />
              Optimize Weekly Schedule
            </Button>
          </div>
        </div>

        {/* Performance Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-8 glass border-white/10 rounded-[40px]">
            <h3 className="text-lg font-black mb-6 flex items-center gap-2">
              <CheckCircle2 size={20} className="text-emerald-500" />
              Completion Rate
            </h3>
            <div className="flex items-end gap-6">
              <div className="text-6xl font-black text-white">98.2%</div>
              <div className="flex-1 pb-2">
                <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: '98.2%' }} />
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-6 leading-relaxed">
              System performed **420 total collections** this week with only **2 minor delays** reported.
            </p>
          </div>

          <div className="p-8 glass border-white/10 rounded-[40px]">
            <h3 className="text-lg font-black mb-6 flex items-center gap-2">
              <AlertCircle size={20} className="text-amber-500" />
              Operational Bottlenecks
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Zone D Congestion', impact: 'High', color: 'text-red-400' },
                { label: 'VEH-204 Maintenance', impact: 'Medium', color: 'text-amber-400' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                  <span className="text-xs font-bold">{item.label}</span>
                  <Badge variant="outline" className={cn("rounded-lg border-current text-[10px] font-black uppercase tracking-wider", item.color)}>
                    {item.impact} IMPACT
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
