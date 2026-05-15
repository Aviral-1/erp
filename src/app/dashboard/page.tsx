"use client";

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { KPICard } from '@/components/shared/KPICard';
import { 
  Users, 
  Truck, 
  Trash2, 
  IndianRupee, 
  TrendingUp, 
  Clock, 
  AlertCircle,
  MapPin
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MOCK_STATS } from '@/services/mockData';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const revenueData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
];

const wasteData = [
  { name: 'Solid', value: 45, color: '#3b82f6' },
  { name: 'Organic', value: 30, color: '#10b981' },
  { name: 'Hazardous', value: 15, color: '#f59e0b' },
  { name: 'Recyclable', value: 10, color: '#8b5cf6' },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8 pb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Dashboard Overview</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Welcome back, Ashish. Here's what's happening today.</p>
        </div>

        {/* KPI Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard 
            title="Total Customers" 
            value={MOCK_STATS.totalCustomers.toLocaleString()} 
            icon={Users} 
            trend={{ value: 12, isUp: true }}
            color="bg-blue-500"
            delay={0.1}
          />
          <KPICard 
            title="Active Drivers" 
            value={MOCK_STATS.activeDrivers} 
            icon={Truck} 
            trend={{ value: 4, isUp: true }}
            color="bg-emerald-500"
            delay={0.2}
          />
          <KPICard 
            title="Collection Status" 
            value={`${MOCK_STATS.wasteCollectionStatus}%`} 
            icon={Trash2} 
            trend={{ value: 2, isUp: false }}
            color="bg-amber-500"
            delay={0.3}
          />
          <KPICard 
            title="Total Revenue" 
            value={`₹${(MOCK_STATS.revenue / 1000).toFixed(1)}k`} 
            icon={IndianRupee} 
            trend={{ value: 8, isUp: true }}
            color="bg-violet-500"
            delay={0.4}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-none shadow-md bg-white dark:bg-slate-900">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Revenue Analytics</CardTitle>
              <CardDescription>Monthly collection revenue growth</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md bg-white dark:bg-slate-900">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Waste Category Breakdown</CardTitle>
              <CardDescription>Distribution of waste collected by type</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row items-center justify-between">
              <div className="h-[250px] w-full md:w-1/2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={wasteData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {wasteData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                {wasteData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{item.name}</span>
                    </div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity and Pickup Requests */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 border-none shadow-md bg-white dark:bg-slate-900 overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Live Pickup Requests</CardTitle>
                <CardDescription>Real-time updates from collection points</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="rounded-xl">View All</Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-y border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                      <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {[1, 2, 3, 4].map((i) => (
                      <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                        <td className="px-6 py-4">
                          <div className="font-medium text-slate-900 dark:text-white">Royal Heights Apt.</div>
                          <div className="text-xs text-slate-400">#JOB-12{i}4</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-slate-600 dark:text-slate-400">Solid Waste</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
                            <MapPin size={14} className="text-slate-400" />
                            <span>Shastri Nagar</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-600 dark:bg-emerald-950/30">Active</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">12:30 PM</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md bg-white dark:bg-slate-900">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {MOCK_STATS.recentActivities.map((activity, index) => (
                  <div key={activity.id} className="flex gap-4 relative">
                    {index !== MOCK_STATS.recentActivities.length - 1 && (
                      <div className="absolute left-[19px] top-8 bottom-0 w-px bg-slate-200 dark:bg-slate-800"></div>
                    )}
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10",
                      activity.type === 'pickup' ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30" : "bg-purple-100 text-purple-600 dark:bg-purple-900/30"
                    )}>
                      {activity.type === 'pickup' ? <Truck size={18} /> : <Users size={18} />}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{activity.title}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{activity.description}</p>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400">
                        <Clock size={10} />
                        <span>{activity.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-6 text-primary hover:bg-primary/5 text-sm font-medium">
                View Full Timeline
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
