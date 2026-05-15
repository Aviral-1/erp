"use client";

import React from 'react';
import { DataTable } from '@/components/shared/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { 
  Activity, Fuel, MoreHorizontal, Plus, Zap, Thermometer, Truck,
  AlertTriangle, ArrowUpRight, PlusCircle, Gauge, Settings, ShieldCheck,
  MapPin
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

interface Vehicle {
  id: string;
  plate: string;
  model: string;
  type: string;
  status: 'Active' | 'Maintenance' | 'Idle' | 'Issue';
  fuel: number;
  efficiency: string;
  nextService: string;
  telemetry: {
    temp: number;
    load: number;
    speed: number;
  };
}

const MOCK_VEHICLES: Vehicle[] = [
  { id: "VEH-201", plate: "UP16-BT-4209", model: "TATA Ultra 1518", type: "Compactor", status: "Active", fuel: 82, efficiency: "8.2 km/l", nextService: "15 Jun 2026", telemetry: { temp: 88, load: 65, speed: 42 } },
  { id: "VEH-202", plate: "DL01-CS-5512", model: "Eicher Pro 3015", type: "Dumper", status: "Maintenance", fuel: 45, efficiency: "7.5 km/l", nextService: "In Progress", telemetry: { temp: 92, load: 0, speed: 0 } },
  { id: "VEH-203", plate: "MH12-TY-8890", model: "Mahindra Blazo", type: "Skip Loader", status: "Active", fuel: 68, efficiency: "9.1 km/l", nextService: "22 Jun 2026", telemetry: { temp: 85, load: 45, speed: 38 } },
  { id: "VEH-204", plate: "KA05-MN-1122", model: "BharatBenz 2823R", type: "Compactor", status: "Issue", fuel: 12, efficiency: "6.8 km/l", nextService: "Urgent", telemetry: { temp: 98, load: 85, speed: 12 } },
];

export function VehiclesModule() {
  const columns: ColumnDef<Vehicle>[] = [
    {
      accessorKey: "id",
      header: "Asset ID",
      cell: ({ row }) => (
        <span className="font-mono text-[10px] font-black text-primary bg-primary/10 px-2.5 py-1 rounded-lg border border-primary/20 tracking-wider">
          {row.getValue("id")}
        </span>
      ),
    },
    {
      accessorKey: "plate",
      header: "Registry Plate",
      cell: ({ row }) => (
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center text-white shrink-0 shadow-xl group">
             <Truck size={24} className="text-slate-400 group-hover:text-primary transition-colors" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-sm text-white tracking-tight leading-none mb-1">{row.getValue("plate")}</span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{row.original.model}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Mission Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge className={cn(
            "rounded-xl px-3 py-1 text-[9px] font-black uppercase tracking-[0.15em] border-none shadow-sm",
            status === 'Active' ? "bg-emerald-500/20 text-emerald-400" :
            status === 'Maintenance' ? "bg-blue-500/20 text-blue-400" :
            status === 'Issue' ? "bg-red-500/20 text-red-400" :
            "bg-slate-500/20 text-slate-400"
          )}>
            <div className="w-1.5 h-1.5 rounded-full bg-current mr-2 animate-pulse" />
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "fuel",
      header: "Fuel & Energy",
      cell: ({ row }) => {
        const level = row.getValue("fuel") as number;
        return (
          <div className="flex items-center gap-3 min-w-[120px]">
            <div className="flex-1 bg-white/5 h-1.5 rounded-full overflow-hidden border border-white/5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${level}%` }}
                className={cn(
                  "h-full rounded-full",
                  level < 20 ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]" : "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                )}
              />
            </div>
            <span className="text-[10px] font-black text-white">{level}%</span>
          </div>
        );
      },
    },
    {
      accessorKey: "efficiency",
      header: "Logistics Metrics",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="text-xs font-black text-white">{row.getValue("efficiency")}</span>
          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">Consumption Matrix</span>
        </div>
      ),
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
              <Activity size={16} /> Live Telemetry
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-3 text-[11px] font-black uppercase tracking-widest p-3 rounded-lg focus:bg-primary focus:text-white cursor-pointer">
              <MapPin size={16} /> Locate Asset
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-3 text-[11px] font-black uppercase tracking-widest p-3 rounded-lg focus:bg-primary focus:text-white cursor-pointer">
              <Settings size={16} /> Diagnostics
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/5" />
            <DropdownMenuItem className="gap-3 text-[11px] font-black uppercase tracking-widest p-3 rounded-lg focus:bg-red-500 focus:text-white text-red-500 cursor-pointer">
              <AlertTriangle size={16} /> Flag Critical Issue
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
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Asset Lifecycle Intelligence</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-white lg:text-6xl">
            Fleet <span className="text-primary text-glow-primary">Assets</span>
          </h1>
        </motion.div>
        
        <div className="flex items-center gap-4">
          <Button variant="outline" className="rounded-2xl glass border-white/10 text-white font-black text-[10px] uppercase tracking-widest h-14 px-8 hover:bg-white/5">
            Fleet Diagnostics
          </Button>
          <Button size="lg" className="rounded-2xl bg-primary text-white shadow-2xl shadow-primary/30 text-[10px] font-black uppercase tracking-widest h-14 px-8 hover:scale-105 transition-all">
            <PlusCircle size={20} className="mr-3" /> Register Asset
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Fleet Health', value: '92.4%', sub: '2 Assets in Service', icon: ShieldCheck, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'Critical Issues', value: '03', sub: 'Urgent attention required', icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-500/10' },
          { label: 'Fuel Reserved', value: '4,280L', sub: 'Est. 12 days supply', icon: Fuel, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Avg Engine Temp', value: '88.2°C', sub: 'Nominal Range', icon: Thermometer, color: 'text-amber-500', bg: 'bg-amber-500/10' },
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
        <DataTable columns={columns} data={MOCK_VEHICLES} searchKey="plate" />
      </div>
    </div>
  );
}
