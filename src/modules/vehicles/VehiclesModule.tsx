"use client";

import React from 'react';
import { DataTable } from '@/components/shared/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { 
  Activity, Fuel, MoreHorizontal, Plus, Zap, Thermometer
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
}

const MOCK_VEHICLES: Vehicle[] = [
  { id: "VEH-201", plate: "UP16-BT-4209", model: "TATA Ultra 1518", type: "Compactor", status: "Active", fuel: 82, efficiency: "8.2 km/l", nextService: "15 Jun 2026" },
  { id: "VEH-202", plate: "DL01-CS-5512", model: "Eicher Pro 3015", type: "Dumper", status: "Maintenance", fuel: 45, efficiency: "7.5 km/l", nextService: "In Progress" },
  { id: "VEH-203", plate: "MH12-TY-8890", model: "Mahindra Blazo", type: "Skip Loader", status: "Active", fuel: 68, efficiency: "9.1 km/l", nextService: "22 Jun 2026" },
  { id: "VEH-204", plate: "KA05-MN-1122", model: "BharatBenz 2823R", type: "Compactor", status: "Issue", fuel: 12, efficiency: "6.8 km/l", nextService: "Urgent" },
];

export function VehiclesModule() {
  const columns: ColumnDef<Vehicle>[] = [
    {
      accessorKey: "id",
      header: "Vehicle ID",
      cell: ({ row }) => (
        <span className="font-mono text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg border border-primary/20">
          {row.getValue("id")}
        </span>
      ),
    },
    {
      accessorKey: "plate",
      header: "Plate",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-bold text-sm">{row.getValue("plate")}</span>
          <span className="text-[10px] text-muted-foreground uppercase">{row.original.model}</span>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge className={cn(
            "rounded-lg px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border",
            status === 'Active' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
            status === 'Maintenance' ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
            status === 'Issue' ? "bg-red-500/10 text-red-500 border-red-500/20" :
            "bg-slate-500/10 text-slate-500 border-slate-500/20"
          )}>
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "fuel",
      header: "Fuel",
      cell: ({ row }) => {
        const level = row.getValue("fuel") as number;
        return (
          <div className="flex items-center gap-3 min-w-[80px]">
            <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${level}%` }} />
            </div>
            <span className="text-[10px] font-bold">{level}%</span>
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger className="h-8 w-8 p-0 rounded-lg hover:bg-white/5 flex items-center justify-center">
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 glass border-white/10">
            <DropdownMenuItem className="gap-2 text-xs font-medium"><Activity size={14} /> Telemetry</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/5" />
            <DropdownMenuItem className="gap-2 text-xs font-medium text-red-500">Flag Issue</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="flex items-center gap-2 mb-2">
            <Zap size={16} className="text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Asset Management</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight lg:text-5xl">Vehicle Fleet</h1>
        </motion.div>
        <Button size="sm" className="rounded-xl bg-primary text-white shadow-xl shadow-primary/30 text-xs font-bold px-4">
          <Plus size={16} className="mr-2" /> Add Vehicle
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Fleet Health', value: '92.4%', icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'Critical Issues', value: '3', icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-500/10' },
          { label: 'Fuel Usage', value: '420L', icon: Fuel, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Avg Temp', value: '88°C', icon: Thermometer, color: 'text-amber-500', bg: 'bg-amber-500/10' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-5 glass border-white/10 rounded-3xl"
          >
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4", stat.bg, stat.color)}>
              <stat.icon size={20} />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">{stat.label}</p>
            <p className="text-2xl font-black">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <DataTable columns={columns} data={MOCK_VEHICLES} searchKey="plate" />
    </div>
  );
}

const AlertTriangle = ({ className, size }: { className?: string; size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={className}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
);
