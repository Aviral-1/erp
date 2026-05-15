"use client";

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DataTable } from '@/components/shared/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { 
  Truck, 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  MoreHorizontal,
  Plus,
  Filter,
  Download,
  AlertCircle,
  Zap,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

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

export default function DriversPage() {
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
      accessorKey: "vehicle",
      header: "Assigned Vehicle",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Truck size={14} className="text-muted-foreground" />
          <span className="text-xs font-medium">{row.getValue("vehicle")}</span>
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
            <div className={cn(
              "w-1.5 h-1.5 rounded-full mr-1.5 animate-pulse",
              status === 'Online' || status === 'On Trip' ? "bg-current" : "bg-transparent"
            )} />
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "rating",
      header: "Rating",
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5">
          <Star size={12} className="text-amber-500 fill-amber-500" />
          <span className="text-xs font-bold">{row.getValue("rating")}</span>
        </div>
      ),
    },
    {
      accessorKey: "lastLocation",
      header: "Last Location",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <MapPin size={12} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground truncate max-w-[150px]">{row.getValue("lastLocation")}</span>
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger className={cn(buttonVariants({ variant: "ghost" }), "h-8 w-8 p-0 rounded-lg hover:bg-white/5")}>
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 glass border-white/10">
            <DropdownMenuItem className="gap-2 text-xs font-medium"><MapPin size={14} /> Track Live</DropdownMenuItem>
            <DropdownMenuItem className="gap-2 text-xs font-medium"><Clock size={14} /> View Logs</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/5" />
            <DropdownMenuItem className="gap-2 text-xs font-medium text-red-500"><AlertCircle size={14} /> Suspend Driver</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck size={16} className="text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Fleet Operations</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight lg:text-5xl">Driver Fleet</h1>
            <p className="text-muted-foreground mt-2 max-w-xl text-sm font-medium">
              Monitor driver performance, live location, and mission status across your fleet.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="rounded-xl glass border-white/10 text-xs font-bold"><Filter size={14} className="mr-2" /> Filter</Button>
            <Button size="sm" className="rounded-xl bg-primary text-white shadow-xl shadow-primary/30 text-xs font-bold px-4">
              <Plus size={16} className="mr-2" /> Add Driver
            </Button>
          </motion.div>
        </div>

        {/* Fleet KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Active Drivers', value: '142', icon: Zap, color: 'text-blue-500', bg: 'bg-blue-500/10' },
            { label: 'Average Rating', value: '4.7', icon: Star, color: 'text-amber-500', bg: 'bg-amber-500/10' },
            { label: 'Avg Trips/Day', value: '18.4', icon: Truck, color: 'text-purple-500', bg: 'bg-purple-500/10' },
            { label: 'Efficiency', value: '94%', icon: ShieldCheck, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-5 glass border-white/10 rounded-3xl group hover:border-primary/20 transition-all duration-300"
            >
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", stat.bg, stat.color)}>
                <stat.icon size={20} />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-2xl font-black">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass border-white/10 rounded-3xl overflow-hidden p-2"
        >
          <DataTable columns={columns} data={MOCK_DRIVERS} searchKey="name" />
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
