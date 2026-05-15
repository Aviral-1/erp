"use client";

import React from 'react';
import { DataTable } from '@/components/shared/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { 
  Truck, Star, ShieldCheck, MoreHorizontal, Plus, Zap, MapPin as MapPinIcon
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
}

const MOCK_DRIVERS: Driver[] = [
  { id: "DRV-101", name: "Rahul Sharma", vehicle: "TATA Ultra 1518", status: "On Trip", rating: 4.8, tripsToday: 12, lastLocation: "Sector 62, Noida", phone: "+91 98765 43210" },
  { id: "DRV-102", name: "Amit Kumar", vehicle: "Eicher Pro 3015", status: "Online", rating: 4.5, tripsToday: 8, lastLocation: "MG Road, Gurgaon", phone: "+91 98765 43211" },
  { id: "DRV-103", name: "Vikram Singh", vehicle: "Mahindra Blazo X", status: "Break", rating: 4.9, tripsToday: 15, lastLocation: "Indiranagar, Bangalore", phone: "+91 98765 43212" },
  { id: "DRV-104", name: "Suresh Raina", vehicle: "BharatBenz 2823R", status: "Offline", rating: 4.2, tripsToday: 0, lastLocation: "Powai, Mumbai", phone: "+91 98765 43213" },
];

export function DriversModule() {
  const columns: ColumnDef<Driver>[] = [
    {
      accessorKey: "id",
      header: "Driver ID",
      cell: ({ row }) => (
        <span className="font-mono text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg border border-primary/20">
          {row.getValue("id")}
        </span>
      ),
    },
    {
      accessorKey: "name",
      header: "Driver Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center text-white text-[10px] font-bold">
            {row.original.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm">{row.getValue("name")}</span>
            <span className="text-[10px] text-muted-foreground">{row.original.phone}</span>
          </div>
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
            status === 'Online' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
            status === 'On Trip' ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
            status === 'Break' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
            "bg-slate-500/10 text-slate-500 border-slate-500/20"
          )}>
            {status}
          </Badge>
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
            <DropdownMenuItem className="gap-2 text-xs font-medium"><MapPinIcon size={14} /> Track Live</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/5" />
            <DropdownMenuItem className="gap-2 text-xs font-medium text-red-500">Suspend Driver</DropdownMenuItem>
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
            <ShieldCheck size={16} className="text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Fleet Operations</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight lg:text-5xl">Driver Fleet</h1>
        </motion.div>
        <Button size="sm" className="rounded-xl bg-primary text-white shadow-xl shadow-primary/30 text-xs font-bold px-4">
          <Plus size={16} className="mr-2" /> Add Driver
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Active Drivers', value: '142', icon: Zap, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Avg Rating', value: '4.7', icon: Star, color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { label: 'Trips/Day', value: '18.4', icon: Truck, color: 'text-purple-500', bg: 'bg-purple-500/10' },
          { label: 'Efficiency', value: '94%', icon: ShieldCheck, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
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

      <DataTable columns={columns} data={MOCK_DRIVERS} searchKey="name" />
    </div>
  );
}
