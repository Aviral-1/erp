"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { 
  Download, Calendar, TrendingUp, ArrowUpRight, Target, Zap, Globe, Activity, BarChart3, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export function AnalyticsModule() {
  const chartOptions: any = {
    chart: { toolbar: { show: false }, background: 'transparent' },
    stroke: { curve: 'smooth', width: 3 },
    colors: ['#3b82f6', '#8b5cf6'],
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.45, opacityTo: 0.05, stops: [20, 100] } },
    grid: { borderColor: 'rgba(255,255,255,0.05)', strokeDashArray: 5 },
    xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], labels: { style: { colors: '#64748b' } } },
    yaxis: { labels: { style: { colors: '#64748b' } } },
    tooltip: { theme: 'dark' }
  };

  return (
    <div className="space-y-10 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={16} className="text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Strategic Intelligence</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight lg:text-6xl">Analytics Engine</h1>
        </motion.div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-2xl glass border-white/10 text-xs font-bold h-12 px-6"><Calendar size={16} className="mr-2" /> Q3 2026</Button>
          <Button className="rounded-2xl bg-primary text-white shadow-2xl shadow-primary/40 text-xs font-bold h-12 px-8">Generate Deep Report</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'System Efficiency', value: '94.2%', icon: Activity, trend: '+2.4%', color: 'from-blue-600 to-indigo-600' },
          { label: 'CO2 Offset (T)', value: '45.8', icon: Globe, trend: '+15.2%', color: 'from-emerald-600 to-teal-600' },
          { label: 'Operational Cost', value: '$12,480', icon: Zap, trend: '-4.8%', color: 'from-purple-600 to-pink-600' },
        ].map((card, i) => (
          <motion.div key={i} className="relative p-8 rounded-[32px] overflow-hidden group cursor-pointer">
            <div className={cn("absolute inset-0 bg-gradient-to-br opacity-90 transition-opacity", card.color)} />
            <div className="relative z-10 text-white">
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center"><card.icon size={24} /></div>
                <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-black">{card.trend}</div>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-70 mb-1">{card.label}</p>
              <h3 className="text-4xl font-black tracking-tighter">{card.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="glass-dark border-white/5 p-8 rounded-[40px] shadow-2xl">
        <h3 className="text-lg font-black flex items-center gap-2 mb-8"><BarChart3 size={18} className="text-primary" /> Fleet Performance Matrix</h3>
        <div className="h-[400px]">
          <Chart options={chartOptions} series={[{ name: 'Volume', data: [31, 40, 28, 51, 42, 109, 100] }]} type="area" height="100%" />
        </div>
      </div>
    </div>
  );
}
