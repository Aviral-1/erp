"use client";

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area, ComposedChart, Scatter, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Download, 
  Calendar, 
  Filter, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Target,
  Zap,
  Globe
} from 'lucide-react';

const performanceData = [
  { day: 'Mon', pickups: 400, efficiency: 85 },
  { day: 'Tue', pickups: 300, efficiency: 88 },
  { day: 'Wed', pickups: 500, efficiency: 92 },
  { day: 'Thu', pickups: 280, efficiency: 78 },
  { day: 'Fri', pickups: 590, efficiency: 95 },
  { day: 'Sat', pickups: 320, efficiency: 90 },
  { day: 'Sun', pickups: 200, efficiency: 82 },
];

const zoneData = [
  { name: 'Zone A', value: 400 },
  { name: 'Zone B', value: 300 },
  { name: 'Zone C', value: 300 },
  { name: 'Zone D', value: 200 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8 pb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Advanced Analytics</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Detailed performance metrics and collection insights.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-xl gap-2">
              <Calendar size={18} />
              Last 30 Days
            </Button>
            <Button className="rounded-xl gap-2 shadow-lg shadow-primary/20">
              <Download size={18} />
              Export Report
            </Button>
          </div>
        </div>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-primary text-white border-none shadow-xl overflow-hidden relative group">
            <CardContent className="p-6">
              <div className="relative z-10">
                <p className="text-primary-foreground/80 text-sm font-medium uppercase tracking-wider">Average Efficiency</p>
                <div className="flex items-end gap-3 mt-2">
                  <h3 className="text-4xl font-bold">94.2%</h3>
                  <span className="flex items-center text-xs font-bold bg-white/20 px-2 py-0.5 rounded-full mb-1">
                    <ArrowUpRight size={14} />
                    +2.4%
                  </span>
                </div>
                <p className="text-primary-foreground/60 text-xs mt-4 flex items-center gap-1">
                  <Target size={12} />
                  Target: 95.0%
                </p>
              </div>
              <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <Zap size={160} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-slate-900 border-none shadow-md overflow-hidden">
            <CardContent className="p-6">
              <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Total Tonnage</p>
              <div className="flex items-end gap-3 mt-2">
                <h3 className="text-4xl font-bold text-slate-900 dark:text-white">1,240</h3>
                <span className="text-slate-400 text-sm mb-1 font-medium">Metric Tons</span>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[75%]"></div>
                </div>
                <span className="text-xs font-bold text-slate-500">75%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-slate-900 border-none shadow-md overflow-hidden">
            <CardContent className="p-6">
              <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">CO2 Offset</p>
              <div className="flex items-end gap-3 mt-2">
                <h3 className="text-4xl font-bold text-slate-900 dark:text-white">45.8</h3>
                <span className="text-slate-400 text-sm mb-1 font-medium">Tons CO2e</span>
              </div>
              <p className="text-emerald-500 text-xs mt-4 font-bold flex items-center gap-1">
                <Globe size={12} />
                Equivalent to 2,100 trees planted
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-none shadow-md bg-white dark:bg-slate-900">
            <CardHeader>
              <CardTitle>Fleet Performance</CardTitle>
              <CardDescription>Daily pickup volume vs collection efficiency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="pickups" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Total Pickups" />
                    <Line type="monotone" dataKey="efficiency" stroke="#10b981" strokeWidth={3} name="Efficiency %" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md bg-white dark:bg-slate-900">
            <CardHeader>
              <CardTitle>Regional Distribution</CardTitle>
              <CardDescription>Collection density by geographic zones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={zoneData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {zoneData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
