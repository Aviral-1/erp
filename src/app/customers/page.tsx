"use client";

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DataTable } from '@/components/shared/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { Customer } from '@/types';
import { MOCK_CUSTOMERS } from '@/services/mockData';
import { 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2, 
  Plus, 
  Truck, 
  Calendar, 
  MapPin,
  CheckCircle2,
  Clock,
  XCircle,
  Filter,
  Download,
  Share2
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
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function CustomersPage() {
  const columns: ColumnDef<Customer>[] = [
    {
      accessorKey: "customer_id",
      header: "ID",
      cell: ({ row }) => (
        <span className="font-mono text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg border border-primary/20">
          {row.getValue("customer_id")}
        </span>
      ),
    },
    {
      accessorKey: "client_name",
      header: "Client Name",
      cell: ({ row }) => (
        <Link href={`/customers/${row.original.customer_id}`} className="flex flex-col group">
          <span className="font-bold text-sm group-hover:text-primary transition-colors">{row.getValue("client_name")}</span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{row.original.contact_person_name}</span>
        </Link>
      ),
    },
    {
      accessorKey: "waste_collection_type",
      header: "Waste Type",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
          <span className="text-xs font-medium">{row.getValue("waste_collection_type")}</span>
        </div>
      ),
    },
    {
      accessorKey: "assigned_driver_name",
      header: "Driver",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
            <Truck size={12} className="text-muted-foreground" />
          </div>
          <span className="text-xs font-medium">{row.getValue("assigned_driver_name")}</span>
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
            status === 'Pending' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
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
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 rounded-lg hover:bg-white/5">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 glass border-white/10">
            <DropdownMenuLabel className="text-[10px] font-bold uppercase tracking-widest opacity-50">Management</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/5" />
            <DropdownMenuItem className="cursor-pointer gap-2 text-xs font-medium hover:bg-white/5">
              <Eye size={14} className="text-primary" /> View Details
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer gap-2 text-xs font-medium hover:bg-white/5">
              <Edit size={14} className="text-amber-500" /> Edit Customer
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer gap-2 text-xs font-medium hover:bg-white/5">
              <Share2 size={14} className="text-blue-500" /> Share Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/5" />
            <DropdownMenuItem className="cursor-pointer gap-2 text-xs font-medium text-red-500 focus:text-red-500 hover:bg-red-500/10">
              <Trash2 size={14} /> Remove Client
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Users size={16} className="text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Core CRM</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight lg:text-5xl">Customers</h1>
            <p className="text-muted-foreground mt-2 max-w-xl text-sm font-medium">
              A comprehensive directory of your enterprise clients and their collection schedules.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <Button variant="outline" size="sm" className="rounded-xl glass border-white/10 hover:bg-white/5 text-xs font-bold">
              <Filter size={14} className="mr-2" />
              Advanced Filters
            </Button>
            <Button variant="outline" size="sm" className="rounded-xl glass border-white/10 hover:bg-white/5 text-xs font-bold">
              <Download size={14} className="mr-2" />
              Export
            </Button>
            <Link href="/customers/new">
              <Button size="sm" className="rounded-xl bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/30 text-xs font-bold px-4">
                <Plus size={16} className="mr-2" />
                Add Client
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Active Clients', value: '1,120', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
            { label: 'KYC Verification', value: '85', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
            { label: 'Churn Rate', value: '1.2%', icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/10' },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 glass border-white/10 rounded-3xl flex items-center gap-6 group hover:border-primary/20 transition-all duration-300"
            >
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300", stat.bg, stat.color)}>
                <stat.icon size={28} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-3xl font-black">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Table Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass border-white/10 rounded-3xl overflow-hidden p-2"
        >
          <DataTable columns={columns} data={MOCK_CUSTOMERS} searchKey="client_name" />
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
