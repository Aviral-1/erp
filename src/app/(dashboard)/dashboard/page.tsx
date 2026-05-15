"use client";

import React from 'react';
import { 
  Users, 
  Truck, 
  Recycle, 
  CalendarCheck, 
  Car, 
  Clock 
} from 'lucide-react';
import { DASHBOARD_STATS } from '@/lib/dummy-data';
import { motion } from 'framer-motion';

const STAT_CARDS = [
  { 
    label: 'Total Customers', 
    value: DASHBOARD_STATS.totalCustomers, 
    icon: Users, 
    color: 'bg-blue-500',
    trend: '+12% from last month' 
  },
  { 
    label: 'Active Drivers', 
    value: DASHBOARD_STATS.activeDrivers, 
    icon: Truck, 
    color: 'bg-emerald-500',
    trend: '98% on duty' 
  },
  { 
    label: 'Active Collections', 
    value: DASHBOARD_STATS.activeCollections, 
    icon: Recycle, 
    color: 'bg-purple-500',
    trend: 'In progress' 
  },
  { 
    label: 'Daily Pickups', 
    value: DASHBOARD_STATS.dailyPickups, 
    icon: CalendarCheck, 
    color: 'bg-amber-500',
    trend: 'Today' 
  },
  { 
    label: 'Assigned Vehicles', 
    value: DASHBOARD_STATS.assignedVehicles, 
    icon: Car, 
    color: 'bg-indigo-500',
    trend: 'Fully optimized' 
  },
  { 
    label: 'Pending Assignments', 
    value: DASHBOARD_STATS.pendingAssignments, 
    icon: Clock, 
    color: 'bg-rose-500',
    trend: 'Needs attention' 
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Command Center</h1>
        <p className="text-slate-500 mt-1">Overview of waste management operations.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {STAT_CARDS.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
                <h3 className="text-3xl font-bold text-slate-900">{stat.value.toLocaleString()}</h3>
                <p className="text-xs text-slate-400 mt-2 flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-200 mr-2 group-hover:bg-blue-400 transition-colors" />
                  {stat.trend}
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-2xl text-white shadow-lg shadow-${stat.color.split('-')[1]}-500/20`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            
            {/* Subtle Hover Decoration */}
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-transparent to-slate-50/50 rounded-br-[2rem] -z-10 transition-opacity opacity-0 group-hover:opacity-100" />
          </motion.div>
        ))}
      </div>

      {/* Activity Section Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Recent Activity</h2>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">Pickup completed at Green Valley</p>
                  <p className="text-xs text-slate-500">24 mins ago • Driver Robert Smith</p>
                </div>
                <div className="px-2 py-1 bg-green-50 text-green-600 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                  Success
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm flex flex-col justify-center items-center text-center">
          <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-4">
            <Recycle className="w-10 h-10 text-blue-500" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Optimization Tip</h2>
          <p className="text-slate-500 mt-2 max-w-xs text-sm">
            Routing efficiency can be improved by 12% by reassigning Driver Michael Brown to Sector 15.
          </p>
          <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-colors">
            View Analytics
          </button>
        </div>
      </div>
    </div>
  );
}
