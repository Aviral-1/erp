"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Users, 
  Truck, 
  Recycle, 
  CalendarCheck, 
  Car, 
  Clock,
  TrendingUp,
  Activity,
  Zap,
  Target,
  Leaf
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  MetricCard, 
  SectionHeader, 
  AIInsightCard, 
  GlassCard, 
  AnimatedBadge,
  LiveStatusIndicator 
} from '@/components/ui/premium';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function DashboardPage() {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-10"
    >
      {/* Header Section */}
      <SectionHeader 
        title="Command Center" 
        subtitle="Real-time operational intelligence and fleet monitoring."
        action={
          <div className="flex items-center gap-3">
            <LiveStatusIndicator label="Active Engine" />
            <div className="h-4 w-px bg-white/10" />
            <span className="text-xs font-bold text-muted-foreground">MAY 15, 2026</span>
          </div>
        }
      />

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div variants={item}>
          <MetricCard 
            title="Total Customers" 
            value="1,284" 
            change={12.5} 
            icon={Users} 
            trend="up" 
          />
        </motion.div>
        <motion.div variants={item}>
          <MetricCard 
            title="Operational Fleet" 
            value="42" 
            change={98} 
            icon={Truck} 
            trend="neutral" 
          />
        </motion.div>
        <motion.div variants={item}>
          <MetricCard 
            title="Waste Volume" 
            value="142.5t" 
            change={4.2} 
            icon={Recycle} 
            trend="up" 
          />
        </motion.div>
        <motion.div variants={item}>
          <MetricCard 
            title="Efficiency Score" 
            value="94%" 
            change={2.1} 
            icon={Activity} 
            trend="up" 
          />
        </motion.div>
      </div>

      {/* Middle Section: AI & Operations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Fleet Status Card */}
        <motion.div variants={item} className="lg:col-span-2">
          <GlassCard className="h-full">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-xl">
                  <Activity className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold">Fleet Activity Feed</h3>
              </div>
              <AnimatedBadge>Live Updates</AnimatedBadge>
            </div>
            
            <div className="space-y-6">
              {[
                { label: "TRUCK #042", status: "In Transit", location: "Sector 14 - Industrial", time: "2m ago", type: "success" },
                { label: "TRUCK #019", status: "Active Pickup", location: "Green Valley Residents", time: "8m ago", type: "primary" },
                { label: "TRUCK #088", status: "Heading to Facility", location: "Main Highway", time: "12m ago", type: "neutral" },
                { label: "TRUCK #023", status: "Idle - Battery Low", location: "Hub Alpha", time: "24m ago", type: "warning" },
              ].map((activity, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-center group-hover:border-primary/50 transition-colors">
                      <Truck className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-white">{activity.label}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{activity.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={cn(
                      "text-xs font-bold",
                      activity.type === "success" ? "text-emerald-400" :
                      activity.type === "primary" ? "text-primary" :
                      activity.type === "warning" ? "text-amber-400" : "text-muted-foreground"
                    )}>{activity.status}</p>
                    <p className="text-[10px] text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Intelligence Side Panel */}
        <motion.div variants={item} className="space-y-6">
          {/* AI Optimizer Card */}
          <GlassCard className="bg-gradient-to-br from-primary/10 via-transparent to-transparent">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-primary fill-primary" />
              <h3 className="font-bold text-sm uppercase tracking-tighter">Operational Intelligence</h3>
            </div>
            <AIInsightCard insight="Route #14 is experiencing heavy traffic. Re-routing TRUCK #042 through 5th Ave will save 12L of fuel and 14 mins." />
            <button className="w-full mt-4 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/80 transition-colors">
              APPROVE RE-ROUTE
            </button>
          </GlassCard>

          {/* Sustainability Score */}
          <GlassCard>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Sustainability Index</h3>
              <Leaf className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-center justify-center py-4 relative">
               <div className="absolute inset-0 bg-emerald-500/10 blur-[40px] rounded-full" />
               <div className="text-center relative z-10">
                 <h2 className="text-5xl font-black text-white italic">88.4</h2>
                 <p className="text-[10px] font-bold text-emerald-400 mt-1 uppercase tracking-tighter">Carbon Offset: 12.4t</p>
               </div>
            </div>
          </GlassCard>

          {/* Target Progress */}
          <GlassCard className="border-l-4 border-l-amber-500/50">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-5 h-5 text-amber-500" />
              <h3 className="text-sm font-bold uppercase tracking-widest">Daily Goal</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground font-bold">Pickups Completed</span>
                <span className="text-white font-black">28 / 32</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "88%" }}
                  className="h-full bg-amber-500" 
                />
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Bottom Section: Fleet Visualization / Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: Car, label: "Optimize Fleet", desc: "Manage vehicle assignments", color: "text-blue-400" },
          { icon: CalendarCheck, label: "Dispatch Board", desc: "View today's collection tasks", color: "text-purple-400" },
          { icon: TrendingUp, label: "Revenue Stream", desc: "Track collection billing", color: "text-emerald-400" },
        ].map((action, idx) => (
          <motion.div key={idx} variants={item}>
            <GlassCard className="flex items-center gap-4 py-4 px-6 hover:translate-y-[-4px] transition-transform cursor-pointer border border-white/5">
              <div className={cn("p-2 rounded-xl bg-white/5", action.color)}>
                <action.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">{action.label}</p>
                <p className="text-[10px] text-muted-foreground uppercase">{action.desc}</p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}


