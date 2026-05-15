"use client";

import React from 'react';
import { 
  Clock, Plus, ChevronLeft, ChevronRight, MoreVertical, Zap
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
];

export function ScheduleModule() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="flex items-center gap-2 mb-2">
            <Zap size={16} className="text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Operational Logic</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight lg:text-5xl">Smart Scheduling</h1>
        </motion.div>
        <div className="flex items-center gap-3">
          <div className="flex items-center glass border-white/10 rounded-2xl p-1 px-2 gap-1 h-12">
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg hover:bg-white/10"><ChevronLeft size={16} /></Button>
            <span className="text-xs font-bold px-3">May 15 - 21, 2026</span>
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg hover:bg-white/10"><ChevronRight size={16} /></Button>
          </div>
          <Button size="sm" className="rounded-xl bg-primary text-white shadow-xl shadow-primary/30 text-xs font-bold h-12 px-6"><Plus size={16} className="mr-2" /> New Task</Button>
        </div>
      </div>

      <div className="glass border-white/10 rounded-[40px] overflow-hidden shadow-2xl relative">
        <div className="grid grid-cols-8 border-b border-white/5">
          <div className="p-6 border-r border-white/5 flex items-center justify-center"><Clock size={20} className="text-muted-foreground" /></div>
          {DAYS.map((day) => (
            <div key={day} className="p-6 text-center border-r border-white/5 last:border-r-0">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{day}</p>
              <p className="text-lg font-black">{15 + DAYS.indexOf(day)}</p>
            </div>
          ))}
        </div>
        <div className="max-h-[500px] overflow-y-auto no-scrollbar">
          {TIME_SLOTS.map((time) => (
            <div key={time} className="grid grid-cols-8 border-b border-white/5 last:border-b-0 min-h-[100px]">
              <div className="p-4 border-r border-white/5 flex items-start justify-center"><span className="text-xs font-bold text-muted-foreground">{time}</span></div>
              {DAYS.map((day) => {
                const items = SCHEDULE_ITEMS.filter(i => i.day === day && i.time === time);
                return (
                  <div key={`${day}-${time}`} className="p-2 border-r border-white/5 last:border-r-0 relative group">
                    {items.map(item => (
                      <div key={item.id} className={cn("p-2 rounded-xl border mb-1 cursor-pointer text-[10px] font-bold", item.status === 'Completed' ? "bg-emerald-500/10 border-emerald-500/20" : "bg-primary/10 border-primary/20")}>
                        <div className="flex justify-between mb-1"><span>{item.zone}</span><MoreVertical size={10} /></div>
                        <p className="truncate">{item.driver}</p>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
