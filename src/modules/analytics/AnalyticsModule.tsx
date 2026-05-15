"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { 
  Download, Calendar, TrendingUp, ArrowUpRight, Target, Zap, Globe, Activity, BarChart3, Sparkles,
  PieChart, LayoutDashboard, Share2, Layers, Cpu, Maximize2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export function AnalyticsModule() {
  const chartOptions: ApexOptions = {
    chart: { 
      toolbar: { show: false }, 
      background: 'transparent',
      dropShadow: {
        enabled: true,
        top: 0,
        left: 0,
        blur: 10,
        color: '#3b82f6',
        opacity: 0.15
      }
    },
    stroke: { curve: 'smooth', width: 4 },
    colors: ['#3b82f6', '#8b5cf6'],
    fill: { 
      type: 'gradient', 
      gradient: { 
        shadeIntensity: 1, 
        opacityFrom: 0.6, 
        opacityTo: 0.05, 
        stops: [0, 100] 
      } 
    },
    grid: { 
      borderColor: 'rgba(255,255,255,0.03)', 
      strokeDashArray: 8,
      padding: { top: 20, bottom: 20, left: 20, right: 20 }
    },
    xaxis: { 
      categories: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'], 
      labels: { style: { colors: '#475569', fontSize: '10px', fontWeight: 800 } },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: { 
      labels: { style: { colors: '#475569', fontSize: '10px', fontWeight: 800 } } 
    },
    tooltip: { 
      theme: 'dark',
      style: { fontSize: '10px' }
    }
  };

  return (
    <div className="space-y-12 pb-24 p-6 bg-dots">
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1.5 h-6 bg-primary rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Neural Analytics Core</span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter text-white lg:text-7xl">
            Strategic <span className="text-primary text-glow-primary">Intel</span>
          </h1>
        </motion.div>
        
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="outline" className="rounded-2xl glass border-white/10 text-white font-black text-[10px] uppercase tracking-widest h-14 px-8 hover:bg-white/5">
            <Calendar size={18} className="mr-3 text-primary" /> Fiscal Q3-26
          </Button>
          <Button size="lg" className="rounded-2xl bg-primary text-white shadow-2xl shadow-primary/30 text-[10px] font-black uppercase tracking-widest h-14 px-10 hover:scale-105 transition-all">
             <Share2 size={20} className="mr-3" /> Export Insight
          </Button>
        </div>
      </div>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'System Efficiency', value: '94.2%', sub: '↑ 2.4% Optimal', icon: Activity, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'CO2 Offset (Metric)', value: '45.8T', sub: 'Carbon Positive', icon: Globe, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'Throughput', value: '1.2M', sub: 'Units Processed', icon: Cpu, color: 'text-purple-500', bg: 'bg-purple-500/10' },
          { label: 'Operational Cost', value: '$12.4K', sub: '↓ 4.8% Reduction', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 cyber-card group relative"
          >
            <div className="flex items-start justify-between mb-8">
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110 duration-500", stat.bg, stat.color)}>
                <stat.icon size={28} />
              </div>
              <ArrowUpRight size={20} className="text-slate-700 group-hover:text-primary transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1.5">{stat.label}</p>
              <p className="text-4xl font-black text-white tracking-tight leading-none">{stat.value}</p>
              <p className="text-[10px] font-bold text-slate-600 mt-4 uppercase tracking-widest flex items-center gap-2">
                <TrendingUp size={12} className={cn(stat.color)} />
                {stat.sub}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* MAIN DATA SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Large Chart Area */}
        <div className="lg:col-span-2 cyber-card rounded-[48px] p-10">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-2xl font-black text-white tracking-tight flex items-center gap-4">
                <BarChart3 size={24} className="text-primary" />
                Fleet Real-time Velocity
              </h3>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">Active telemetry stream from 48 nodes</p>
            </div>
            <Button size="icon" variant="ghost" className="rounded-full hover:bg-white/5 text-slate-500">
              <Maximize2 size={18} />
            </Button>
          </div>
          <div className="h-[450px]">
            <Chart options={chartOptions} series={[{ name: 'Volume Output', data: [31, 40, 28, 51, 42, 109, 100] }, { name: 'Energy Consumption', data: [20, 32, 45, 32, 34, 52, 41] }]} type="area" height="100%" />
          </div>
        </div>

        {/* Intelligence Sidebars */}
        <div className="space-y-8">
          <div className="cyber-card rounded-[40px] p-8">
            <h4 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
              <Layers size={16} className="text-primary" />
              Category Mix
            </h4>
            <div className="space-y-6">
              {[
                { label: 'Organic Waste', val: 65, color: 'bg-primary' },
                { label: 'Recyclables', val: 42, color: 'bg-emerald-500' },
                { label: 'Hazardous', val: 18, color: 'bg-red-500' },
                { label: 'General', val: 24, color: 'bg-amber-500' },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-slate-300">{item.label}</span>
                    <span className="text-white">{item.val}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.val}%` }}
                      className={cn("h-full", item.color)} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="cyber-card rounded-[40px] p-8 bg-gradient-to-br from-primary/10 to-purple-600/10 border-primary/20">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/40">
                <Sparkles size={24} />
              </div>
              <div>
                <h4 className="text-sm font-black text-white">Neural Suggestion</h4>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">AI Ops Optimization</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Based on historical throughput, rerouting <span className="text-primary font-bold">Zone Delta</span> trucks through <span className="text-white font-bold">Western Corridor</span> could save 12% fuel and reduce pickup delay by 14 minutes today.
            </p>
            <Button size="sm" className="w-full mt-6 rounded-xl bg-white text-black font-black text-[10px] uppercase tracking-widest h-10 hover:bg-white/90">
              Apply Optimization
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
