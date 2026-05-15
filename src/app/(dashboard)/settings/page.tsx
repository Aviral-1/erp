"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Bell, 
  Shield, 
  User, 
  Globe, 
  CreditCard,
  Zap,
  Settings as SettingsIcon,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Cpu,
  Fingerprint,
  Database,
  Truck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { 
  GlassCard, 
  SectionHeader, 
  AnimatedBadge 
} from '@/components/ui/premium';

const SETTINGS_GROUPS = [
  {
    title: 'Core Identity',
    items: [
      { icon: User, label: 'Commander Profile', desc: 'Manage your operational credentials and bio', color: 'text-blue-400' },
      { icon: Fingerprint, label: 'Biometric Access', desc: 'Configure multi-factor and hardware keys', color: 'text-purple-400' },
    ]
  },
  {
    title: 'Operational Parameters',
    items: [
      { icon: Truck, label: 'Fleet Logic', desc: 'Set dispatch thresholds and route priorities', color: 'text-emerald-400' },
      { icon: Database, label: 'Data Retention', desc: 'Configure cloud sync and archival frequency', color: 'text-amber-400' },
    ]
  },
  {
    title: 'Interface Control',
    items: [
      { icon: Bell, label: 'Signal Center', desc: 'Manage mission-critical alert protocols', color: 'text-rose-400' },
      { icon: Globe, label: 'Regional Sync', desc: 'Time-zone and localized unit parameters', color: 'text-cyan-400' },
    ]
  }
];

export default function SettingsPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl space-y-10 pb-12"
    >
      <SectionHeader 
        title="System Configuration" 
        subtitle="Manage command center protocols, operational logic, and account security."
        action={
          <AnimatedBadge>Version 4.2.0-Alpha</AnimatedBadge>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Sidebar */}
        <div className="space-y-6">
           <GlassCard className="relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 flex flex-col items-center text-center py-6">
                 <div className="relative mb-6">
                    <div className="w-24 h-24 rounded-[32px] bg-slate-900 border border-white/10 flex items-center justify-center p-1">
                       <div className="w-full h-full rounded-[28px] overflow-hidden bg-primary/20 flex items-center justify-center">
                          <User size={40} className="text-primary" />
                       </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-emerald-500 border-4 border-slate-950 flex items-center justify-center">
                       <ShieldCheck size={14} className="text-white" />
                    </div>
                 </div>
                 <h3 className="text-xl font-black text-white italic tracking-tight uppercase">Aviral Sharma</h3>
                 <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mt-1">Fleet Commander</p>
                 
                 <div className="w-full mt-8 pt-8 border-t border-white/5 grid grid-cols-2 gap-4">
                    <div className="text-left">
                       <p className="text-[9px] font-bold text-muted-foreground uppercase">Access Level</p>
                       <p className="text-sm font-black text-white">L4 ALPHA</p>
                    </div>
                    <div className="text-left">
                       <p className="text-[9px] font-bold text-muted-foreground uppercase">Security Rank</p>
                       <p className="text-sm font-black text-emerald-400">OPTIMAL</p>
                    </div>
                 </div>
              </div>
           </GlassCard>

           <GlassCard className="bg-gradient-to-br from-rose-500/10 to-transparent border-rose-500/20">
              <div className="flex items-center gap-3 mb-4">
                 <Shield className="w-5 h-5 text-rose-500" />
                 <h4 className="text-xs font-black text-white uppercase tracking-widest">Critical Actions</h4>
              </div>
              <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-rose-500/10 hover:border-rose-500/30 transition-all group">
                 <span className="text-xs font-bold text-rose-500">TERMINATE SESSION</span>
                 <LogOut size={16} className="text-rose-500 group-hover:translate-x-1 transition-transform" />
              </button>
           </GlassCard>
        </div>

        {/* Settings Groups */}
        <div className="lg:col-span-2 space-y-10">
          {SETTINGS_GROUPS.map((group, groupIdx) => (
            <div key={group.title} className="space-y-4">
              <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] flex items-center gap-3">
                <div className="w-6 h-[1px] bg-primary/30" />
                {group.title}
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {group.items.map((item, idx) => (
                  <motion.div 
                    key={item.label}
                    whileHover={{ x: 6 }}
                    className="group"
                  >
                    <GlassCard className="p-6 flex items-center justify-between cursor-pointer border-white/5 hover:border-primary/30 transition-all">
                      <div className="flex items-center gap-5">
                        <div className={cn("w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center transition-colors group-hover:bg-white/[0.06]", item.color)}>
                          <item.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-black text-white tracking-tight">{item.label}</p>
                          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                      <ChevronRight size={20} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}

          {/* System Health */}
          <GlassCard className="border-dashed border-white/10 bg-transparent">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="p-3 bg-emerald-500/10 rounded-xl">
                      <Cpu size={20} className="text-emerald-500" />
                   </div>
                   <div>
                      <p className="text-xs font-black text-white uppercase tracking-widest">System Health: Nominal</p>
                      <p className="text-[10px] text-muted-foreground">All operational modules are performing within parameters.</p>
                   </div>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                   <span className="text-[10px] font-black text-emerald-500 uppercase tracking-tighter">99.9% UPTIME</span>
                </div>
             </div>
          </GlassCard>
        </div>
      </div>
    </motion.div>
  );
}


