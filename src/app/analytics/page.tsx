"use client";

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import dynamic from 'next/dynamic';
import { 
  Download, 
  Calendar, 
  TrendingUp, 
  ArrowUpRight, 
  Target,
  Zap,
  Globe,
  Activity,
  Layers,
  PieChart as PieChartIcon,
  BarChart3,
  MousePointer2,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Dynamic import for ApexCharts
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function AnalyticsPage() {
  const chartOptions: any = {
    chart: {
      toolbar: { show: false },
      background: 'transparent',
      dropShadow: { enabled: true, top: 10, left: 0, blur: 10, opacity: 0.1 }
    },
    stroke: { curve: 'smooth', width: 3 },
    colors: ['#3b82f6', '#8b5cf6'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [20, 100]
      }
    },
    grid: { borderColor: 'rgba(255,255,255,0.05)', strokeDashArray: 5 },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: '#64748b', fontWeight: 600 } }
    },
    yaxis: { labels: { style: { colors: '#64748b', fontWeight: 600 } } },
    tooltip: { theme: 'dark', x: { show: false } }
  };

  const donutOptions: any = {
    chart: { background: 'transparent' },
    colors: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'],
    labels: ['Zone A', 'Zone B', 'Zone C', 'Zone D'],
    stroke: { show: false },
    legend: { show: false },
    dataLabels: { enabled: false },
    plotOptions: {
      pie: {
        donut: {
          size: '85%',
          background: 'transparent',
          labels: {
            show: true,
            name: { show: true, color: '#94a3b8', fontSize: '12px' },
            value: { show: true, color: '#fff', fontSize: '24px', fontWeight: 900 },
            total: { show: true, color: '#94a3b8', label: 'Total Tonnage' }
          }
        }
      }
    },
    tooltip: { theme: 'dark' }
  };

  return (
    <DashboardLayout>
      <div className="space-y-10 pb-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Strategic Intelligence</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight lg:text-6xl">Analytics Engine</h1>
            <p className="text-muted-foreground mt-3 max-w-xl text-sm font-medium leading-relaxed">
              Proprietary data visualization layer for real-time operational transparency and predictive waste cycle insights.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-3">
            <Button variant="outline" className="rounded-2xl glass border-white/10 text-xs font-bold h-12 px-6">
              <Calendar size={16} className="mr-2" />
              Q3 2026
            </Button>
            <Button className="rounded-2xl bg-primary text-white shadow-2xl shadow-primary/40 text-xs font-bold h-12 px-8 group overflow-hidden relative">
              <span className="relative z-10 flex items-center gap-2">
                <Download size={16} />
                Generate Deep Report
              </span>
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
            </Button>
          </motion.div>
        </div>

        {/* High Impact Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: 'System Efficiency', value: '94.2%', icon: Activity, trend: '+2.4%', color: 'from-blue-600 to-indigo-600' },
            { label: 'CO2 Offset (T)', value: '45.8', icon: Globe, trend: '+15.2%', color: 'from-emerald-600 to-teal-600' },
            { label: 'Operational Cost', value: '$12,480', icon: Zap, trend: '-4.8%', color: 'from-purple-600 to-pink-600' },
          ].map((card, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative p-8 rounded-[32px] overflow-hidden group cursor-pointer"
            >
              <div className={cn("absolute inset-0 bg-gradient-to-br opacity-90 transition-opacity group-hover:opacity-100", card.color)} />
              <div className="relative z-10 text-white">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <card.icon size={24} />
                  </div>
                  <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-black flex items-center gap-1">
                    {card.trend.startsWith('+') ? <ArrowUpRight size={12} /> : <TrendingUp size={12} className="rotate-180" />}
                    {card.trend}
                  </div>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-70 mb-1">{card.label}</p>
                <h3 className="text-4xl font-black tracking-tighter">{card.value}</h3>
              </div>
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
            </motion.div>
          ))}
        </div>

        {/* Detailed Chart Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2 glass-dark border-white/5 p-8 rounded-[40px] shadow-2xl relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div>
                <h3 className="text-lg font-black flex items-center gap-2">
                  <BarChart3 size={18} className="text-primary" />
                  Fleet Performance Matrix
                </h3>
                <p className="text-xs text-muted-foreground mt-1">Pickup volume vs Efficiency trend</p>
              </div>
              <div className="flex gap-2">
                <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-[10px] font-bold text-white uppercase">Volume</span>
                </div>
              </div>
            </div>
            
            <div className="h-[400px] relative z-10">
              <Chart 
                options={chartOptions}
                series={[
                  { name: 'Volume', data: [31, 40, 28, 51, 42, 109, 100] },
                  { name: 'Efficiency', data: [11, 32, 45, 32, 34, 52, 41] }
                ]}
                type="area"
                height="100%"
              />
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-dark border-white/5 p-8 rounded-[40px] shadow-2xl relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div>
                <h3 className="text-lg font-black flex items-center gap-2">
                  <PieChartIcon size={18} className="text-purple-500" />
                  Zone Density
                </h3>
                <p className="text-xs text-muted-foreground mt-1">Geo-spatial distribution</p>
              </div>
              <MousePointer2 size={16} className="text-muted-foreground opacity-50" />
            </div>

            <div className="h-[350px] relative z-10">
              <Chart 
                options={donutOptions}
                series={[44, 55, 13, 33]}
                type="donut"
                height="100%"
              />
            </div>

            <div className="mt-8 space-y-3 relative z-10">
              {['Zone A', 'Zone B', 'Zone C', 'Zone D'].map((zone, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-default">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-2 h-2 rounded-full", i === 0 ? 'bg-blue-500' : i === 1 ? 'bg-purple-500' : i === 2 ? 'bg-emerald-500' : 'bg-amber-500')} />
                    <span className="text-xs font-bold text-slate-300">{zone}</span>
                  </div>
                  <span className="text-xs font-black text-white">{(Math.random() * 1000).toFixed(0)} Tons</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Prediction Layer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="p-10 rounded-[48px] bg-gradient-to-br from-primary/10 via-purple-500/10 to-transparent border border-white/5 relative overflow-hidden"
        >
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary border border-primary/20 mb-6">
                <Zap size={16} />
                <span className="text-xs font-black uppercase tracking-widest">Fleet AI Prediction</span>
              </div>
              <h2 className="text-3xl font-black text-white mb-4">Optimized Routing for Next Cycle</h2>
              <p className="text-muted-foreground text-sm font-medium leading-relaxed max-w-xl">
                Our AI model predicts a **12% increase** in organic waste volume for **Zone B** tomorrow. 
                System recommends rerouting 3 heavy compactors from Zone D to maintain 95% efficiency.
              </p>
              <div className="flex gap-4 mt-8 justify-center md:justify-start">
                <Button className="rounded-2xl bg-white text-black hover:bg-white/90 text-xs font-bold px-8 h-12 shadow-xl">
                  Approve Reroute
                </Button>
                <Button variant="ghost" className="rounded-2xl text-white hover:bg-white/5 text-xs font-bold px-8 h-12 border border-white/10">
                  Analyze Scenarios
                </Button>
              </div>
            </div>
            <div className="w-64 h-64 relative shrink-0">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-[80px] animate-pulse" />
              <div className="relative z-10 w-full h-full rounded-full border-4 border-dashed border-primary/30 flex items-center justify-center animate-[spin_20s_linear_infinite]">
                <Layers size={64} className="text-primary opacity-50" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Target size={40} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
