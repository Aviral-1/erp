"use client";

import React from 'react';
import { DataTable } from '@/components/shared/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { 
  Truck, Star, ShieldCheck, MoreHorizontal, Plus, Zap, MapPin as MapPinIcon,
  Phone, Mail, Calendar, ArrowUpRight, Activity, TrendingUp, PlusCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Driver {
  id: string;
  name: string;
  vehicle: string;
  status: 'Online' | 'Offline' | 'On Trip' | 'Break';
  rating: number;
  tripsToday: number;
  lastLocation: string;
  phone: string;
  avatar?: string;
  efficiency: number;
}

const MOCK_DRIVERS: Driver[] = [
  { id: "DRV-101", name: "Rahul Sharma", vehicle: "TATA Ultra 1518", status: "On Trip", rating: 4.8, tripsToday: 12, lastLocation: "Sector 62, Noida", phone: "+91 98765 43210", efficiency: 98 },
  { id: "DRV-102", name: "Amit Kumar", vehicle: "Eicher Pro 3015", status: "Online", rating: 4.5, tripsToday: 8, lastLocation: "MG Road, Gurgaon", phone: "+91 98765 43211", efficiency: 92 },
  { id: "DRV-103", name: "Vikram Singh", vehicle: "Mahindra Blazo X", status: "Break", rating: 4.9, tripsToday: 15, lastLocation: "Indiranagar, Bangalore", phone: "+91 98765 43212", efficiency: 95 },
  { id: "DRV-104", name: "Suresh Raina", vehicle: "BharatBenz 2823R", status: "Offline", rating: 4.2, tripsToday: 0, lastLocation: "Powai, Mumbai", phone: "+91 98765 43213", efficiency: 85 },
];

export function DriversModule() {
  const columns: ColumnDef<Driver>[] = [
    {
      accessorKey: "id",
      header: "Driver ID",
      cell: ({ row }) => (
        <span className="font-mono text-[10px] font-black text-primary bg-primary/10 px-2.5 py-1 rounded-lg border border-primary/20 tracking-wider">
          {row.getValue("id")}
        </span>
      ),
    },
    {
      accessorKey: "name",
      header: "Driver Entity",
      cell: ({ row }) => (
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center text-white text-xs font-black shadow-xl">
              {row.original.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className={cn(
              "absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-slate-950 shadow-lg",
              row.original.status === 'Online' || row.original.status === 'On Trip' ? "bg-emerald-500" : "bg-slate-500"
            )} />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-sm text-white tracking-tight leading-none mb-1">{row.getValue("name")}</span>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <Phone size={10} />
              {row.original.phone}
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "vehicle",
      header: "Assigned Asset",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-bold text-xs text-slate-300">{row.getValue("vehicle")}</span>
          <span className="text-[10px] font-black text-primary/80 uppercase mt-0.5 tracking-tighter">TRUCK-UNIT-A</span>
        </div>
      ),
    },
    {
      accessorKey: "efficiency",
      header: "Performance",
      cell: ({ row }) => (
        <div className="flex items-center gap-3 min-w-[120px]">
          <div className="flex-1 bg-white/5 h-1.5 rounded-full overflow-hidden border border-white/5">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${row.original.efficiency}%` }}
              className={cn(
                "h-full rounded-full",
                row.original.efficiency > 90 ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]" : "bg-primary shadow-[0_0_10px_rgba(59,130,246,0.3)]"
              )}
            />
          </div>
          <span className="text-[10px] font-black text-white">{row.original.efficiency}%</span>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Operational State",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge className={cn(
            "rounded-xl px-3 py-1 text-[9px] font-black uppercase tracking-[0.15em] border-none shadow-sm",
            status === 'Online' ? "bg-emerald-500/20 text-emerald-400" :
            status === 'On Trip' ? "bg-primary/20 text-primary" :
            status === 'Break' ? "bg-amber-500/20 text-amber-400" :
            "bg-slate-500/20 text-slate-400"
          )}>
            <div className="w-1.5 h-1.5 rounded-full bg-current mr-2 animate-pulse" />
            {status}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger className="h-9 w-9 p-0 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 flex items-center justify-center transition-all group">
            <MoreHorizontal className="h-4 w-4 text-slate-500 group-hover:text-white" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 glass-dark border-white/10 p-2">
            <DropdownMenuItem className="gap-3 text-[11px] font-black uppercase tracking-widest p-3 rounded-lg focus:bg-primary focus:text-white cursor-pointer">
              <MapPinIcon size={16} /> Track Live Position
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-3 text-[11px] font-black uppercase tracking-widest p-3 rounded-lg focus:bg-primary focus:text-white cursor-pointer">
              <Phone size={16} /> Contact Driver
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-3 text-[11px] font-black uppercase tracking-widest p-3 rounded-lg focus:bg-primary focus:text-white cursor-pointer">
              <Activity size={16} /> Performance Matrix
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/5" />
            <DropdownMenuItem className="gap-3 text-[11px] font-black uppercase tracking-widest p-3 rounded-lg focus:bg-red-500 focus:text-white text-red-500 cursor-pointer">
              <Zap size={16} /> Suspend Driver
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-10 pb-20 p-6 bg-dots">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1.5 h-6 bg-primary rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Fleet Operations Intel</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-white lg:text-6xl">
            Human <span className="text-primary text-glow-primary">Assets</span>
          </h1>
        </motion.div>
        
        <div className="flex items-center gap-4">
          <Button variant="outline" className="rounded-2xl glass border-white/10 text-white font-black text-[10px] uppercase tracking-widest h-14 px-8 hover:bg-white/5">
            Export Roster
          </Button>
          <Button size="lg" className="rounded-2xl bg-primary text-white shadow-2xl shadow-primary/30 text-[10px] font-black uppercase tracking-widest h-14 px-8 hover:scale-105 transition-all">
            <PlusCircle size={20} className="mr-3" /> New Driver Entity
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Active Drivers', value: '142', sub: '↑ 12% vs last month', icon: Zap, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'Avg Fleet Rating', value: '4.8', sub: '98.2% Satisfaction', icon: Star, color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { label: 'Avg Trips/Day', value: '18.4', sub: '652 Total Trips', icon: Activity, color: 'text-purple-500', bg: 'bg-purple-500/10' },
          { label: 'Fleet Efficiency', value: '94%', sub: 'Target: 95%', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 cyber-card group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500 shadow-lg", stat.bg, stat.color)}>
                <stat.icon size={24} />
              </div>
              <ArrowUpRight size={16} className="text-slate-700 group-hover:text-primary transition-colors" />
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">{stat.label}</p>
              <p className="text-3xl font-black text-white tracking-tight">{stat.value}</p>
              <p className="text-[9px] font-bold text-slate-600 mt-2 uppercase tracking-widest">{stat.sub}</p>
            </div>
            <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent w-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>

      <div className="cyber-card rounded-[32px] border-white/5 p-4">
        <DataTable columns={columns} data={MOCK_DRIVERS} searchKey="name" />
      </div>
    </div>
  );
}
