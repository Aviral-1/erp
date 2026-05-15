"use client";

import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  AreaChart,
  Area,
} from 'recharts';
import { motion } from 'framer-motion';
import { 
  GlassCard, 
  SectionHeader, 
  AIInsightCard, 
  AnimatedBadge,
  MetricCard
} from '@/components/ui/premium';
import { 
  BarChart3, 
  TrendingUp, 
  Zap, 
  Activity, 
  Target,
  BrainCircuit,
  ArrowUpRight
} from 'lucide-react';

const WASTE_TYPE_DATA = [
  { name: 'Solid Waste', value: 450, color: '#3b82f6' },
  { name: 'E-Waste', value: 300, color: '#10b981' },
  { name: 'Bio-Medical', value: 180, color: '#ef4444' },
  { name: 'Organic', value: 210, color: '#f59e0b' },
];

const DAILY_PICKUPS_DATA = [
  { day: 'Mon', count: 320, predicted: 310 },
  { day: 'Tue', count: 380, predicted: 375 },
  { day: 'Wed', count: 340, predicted: 350 },
  { day: 'Thu', count: 410, predicted: 400 },
  { day: 'Fri', count: 390, predicted: 385 },
  { day: 'Sat', count: 280, predicted: 290 },
  { day: 'Sun', count: 220, predicted: 210 },
];

const PERFORMANCE_DATA = [
  { month: 'Jan', efficiency: 82, route: 78 },
  { month: 'Feb', efficiency: 85, route: 80 },
  { month: 'Mar', efficiency: 88, route: 85 },
  { month: 'Apr', efficiency: 92, route: 88 },
  { month: 'May', efficiency: 94, route: 92 },
];

export default function AnalyticsPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-10 pb-12"
    >
      <SectionHeader 
        title="Intelligence Engine" 
        subtitle="Advanced data analytics and predictive modeling for operational excellence."
        action={
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-xl glass border-white/10 text-xs font-bold hover:bg-white/5 transition-all">EXPORTS</button>
            <button className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-lg shadow-primary/20">RECALCULATE</button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         <MetricCard title="Operational Uptime" value="99.9%" change={0.2} icon={Activity} trend="up" />
         <MetricCard title="AI Accuracy" value="94.2%" change={1.5} icon={BrainCircuit} trend="up" />
         <MetricCard title="Resource Savings" value="$12.4k" change={8.4} icon={Zap} trend="up" />
         <MetricCard title="Net Sustainability" value="88.4" change={2.1} icon={Target} trend="up" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Waste Composition Chart */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
          <GlassCard className="h-full">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Waste Stream Composition
              </h3>
              <AnimatedBadge>Live Data</AnimatedBadge>
            </div>
            <div className="h-[320px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={WASTE_TYPE_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                  >
                    {WASTE_TYPE_DATA.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color} 
                        className="hover:opacity-80 transition-opacity cursor-pointer focus:outline-none"
                        style={{ filter: `drop-shadow(0 0 8px ${entry.color}40)` }}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(2, 6, 23, 0.9)', 
                      backdropFilter: 'blur(12px)',
                      borderRadius: '16px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#fff'
                    }}
                    itemStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Total Volume</span>
                <span className="text-3xl font-black text-white italic">1.2k t</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-6 mt-6">
              {WASTE_TYPE_DATA.map((entry) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color, boxShadow: `0 0 10px ${entry.color}` }} />
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">{entry.name}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Predictive Performance Chart */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
          <GlassCard className="h-full">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                Performance Forecasting
              </h3>
              <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                AI Active
              </div>
            </div>
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={DAILY_PICKUPS_DATA}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(2, 6, 23, 0.9)', 
                      backdropFilter: 'blur(12px)',
                      borderRadius: '16px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#fff'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#3b82f6" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorCount)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="predicted" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    fillOpacity={1} 
                    fill="url(#colorPredicted)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-6 mt-6 ml-10">
               <div className="flex items-center gap-2">
                 <div className="w-8 h-1 bg-primary rounded-full" />
                 <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Actual Vol.</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-8 h-1 bg-emerald-500 border-dashed border-2 bg-transparent rounded-full" />
                 <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">AI Forecast</span>
               </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Prediction Insights */}
        <div className="lg:col-span-2 space-y-6">
           <GlassCard>
              <div className="flex items-center justify-between mb-6">
                 <h3 className="font-bold text-sm uppercase tracking-widest flex items-center gap-3">
                   <BrainCircuit className="w-5 h-5 text-primary" />
                   Neural Network Insights
                 </h3>
                 <span className="text-[10px] font-bold text-primary">SCAN COMPLETE: 0.02s</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <AIInsightCard insight="Predicted 14% increase in organic waste volume for Sector 4 next week due to regional festival. Pre-deploying TRUCK #088." />
                 <AIInsightCard insight="Fuel consumption is trending 4.2% lower than forecasted due to high-efficiency route adherence by Driver Rahul." />
              </div>
           </GlassCard>

           <div className="grid grid-cols-2 gap-6">
             <GlassCard className="border-l-4 border-l-primary">
                <p className="text-[10px] font-bold text-muted-foreground uppercase mb-2">Efficiency Gain</p>
                <div className="flex items-end gap-2">
                   <h2 className="text-4xl font-black text-white">+24%</h2>
                   <ArrowUpRight className="text-primary mb-1" />
                </div>
                <p className="text-[9px] text-primary/80 font-bold mt-2 uppercase">VS PREVIOUS QUARTER</p>
             </GlassCard>
             <GlassCard className="border-l-4 border-l-emerald-500">
                <p className="text-[10px] font-bold text-muted-foreground uppercase mb-2">CO2 Offset</p>
                <div className="flex items-end gap-2">
                   <h2 className="text-4xl font-black text-white">12.8t</h2>
                   <ArrowUpRight className="text-emerald-500 mb-1" />
                </div>
                <p className="text-[9px] text-emerald-500/80 font-bold mt-2 uppercase">PLANET IMPACT SCORE</p>
             </GlassCard>
           </div>
        </div>

        {/* Route Efficiency Metric */}
        <GlassCard className="flex flex-col">
           <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-8">Resource Allocation Efficiency</h3>
           <div className="flex-1 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-primary/10 blur-[60px] rounded-full" />
              <div className="relative z-10 text-center">
                 <svg className="w-48 h-48 -rotate-90">
                    <circle 
                      cx="96" cy="96" r="88" 
                      fill="transparent" 
                      stroke="rgba(255,255,255,0.05)" 
                      strokeWidth="12" 
                    />
                    <motion.circle 
                      cx="96" cy="96" r="88" 
                      fill="transparent" 
                      stroke="#3b82f6" 
                      strokeWidth="12" 
                      strokeDasharray={552.92}
                      initial={{ strokeDashoffset: 552.92 }}
                      animate={{ strokeDashoffset: 552.92 * (1 - 0.94) }}
                      transition={{ duration: 2, ease: "easeOut" }}
                      strokeLinecap="round"
                    />
                 </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-black text-white italic">94%</span>
                    <span className="text-[9px] font-bold text-primary uppercase mt-1 tracking-tighter">Peak Optimal</span>
                 </div>
              </div>
           </div>
           <div className="pt-6 border-t border-white/5 mt-6">
              <div className="flex justify-between items-center">
                 <span className="text-[10px] font-bold text-muted-foreground uppercase">Next Eval</span>
                 <span className="text-[10px] font-black text-white">IN 4h 12m</span>
              </div>
           </div>
        </GlassCard>
      </div>
    </motion.div>
  );
}

