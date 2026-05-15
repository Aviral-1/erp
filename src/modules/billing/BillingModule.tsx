"use client";

import React from 'react';
import { DataTable } from '@/components/shared/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { 
  CreditCard, DollarSign, Wallet, TrendingUp, Clock, MoreHorizontal, Receipt, Plus,
  ArrowUpRight, PlusCircle, Activity, ShieldCheck, Download, ExternalLink,
  ChevronRight, BarChart3, PieChart
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

interface Transaction {
  id: string;
  customer: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue' | 'Refunded';
  date: string;
  method: string;
  plan: string;
}

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: "INV-2026-001", customer: "Royal Heights Apt.", amount: 4500.00, status: "Paid", date: "May 12, 2026", method: "Bank Transfer", plan: "Enterprise" },
  { id: "INV-2026-002", customer: "Green Park Society", amount: 2800.50, status: "Pending", date: "May 14, 2026", method: "Credit Card", plan: "Premium" },
  { id: "INV-2026-003", customer: "Tech Park IT", amount: 12400.00, status: "Overdue", date: "May 01, 2026", method: "Direct Debit", plan: "Custom" },
  { id: "INV-2026-004", customer: "Sunrise Villa", amount: 1200.00, status: "Paid", date: "May 10, 2026", method: "UPI", plan: "Standard" },
];

export function BillingModule() {
  const columns: ColumnDef<Transaction>[] = [
    {
      accessorKey: "id",
      header: "Invoice Reference",
      cell: ({ row }) => (
        <span className="font-mono text-[10px] font-black text-primary bg-primary/10 px-2.5 py-1 rounded-lg border border-primary/20 tracking-wider">
          {row.getValue("id")}
        </span>
      ),
    },
    {
      accessorKey: "customer",
      header: "Billing Entity",
      cell: ({ row }) => (
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-white shrink-0 shadow-lg group">
             <Receipt size={18} className="text-slate-500 group-hover:text-primary transition-colors" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-sm text-white tracking-tight leading-none mb-1">{row.getValue("customer")}</span>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <ShieldCheck size={10} />
              {row.original.plan} Plan
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "amount",
      header: "Net Amount",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-black text-sm text-white tracking-tight leading-none mb-1">
            ${(row.getValue("amount") as number).toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{row.original.method}</span>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Payment Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge className={cn(
            "rounded-xl px-3 py-1 text-[9px] font-black uppercase tracking-[0.15em] border-none shadow-sm",
            status === 'Paid' ? "bg-emerald-500/20 text-emerald-400" :
            status === 'Pending' ? "bg-amber-500/20 text-amber-400" :
            status === 'Overdue' ? "bg-red-500/20 text-red-400" :
            "bg-slate-500/20 text-slate-400"
          )}>
            <div className="w-1.5 h-1.5 rounded-full bg-current mr-2 animate-pulse" />
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "date",
      header: "Issue Date",
      cell: ({ row }) => (
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{row.getValue("date")}</span>
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
              <Download size={16} /> Download Invoice PDF
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-3 text-[11px] font-black uppercase tracking-widest p-3 rounded-lg focus:bg-primary focus:text-white cursor-pointer">
              <CreditCard size={16} /> Process Payment
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-3 text-[11px] font-black uppercase tracking-widest p-3 rounded-lg focus:bg-primary focus:text-white cursor-pointer">
              <ExternalLink size={16} /> View Portal
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/5" />
            <DropdownMenuItem className="gap-3 text-[11px] font-black uppercase tracking-widest p-3 rounded-lg focus:bg-red-500 focus:text-white text-red-500 cursor-pointer">
              <Activity size={16} /> Void Transaction
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
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Financial Ledger Engine</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-white lg:text-6xl">
            Revenue <span className="text-primary text-glow-primary">Stream</span>
          </h1>
        </motion.div>
        
        <div className="flex items-center gap-4">
          <Button variant="outline" className="rounded-2xl glass border-white/10 text-white font-black text-[10px] uppercase tracking-widest h-14 px-8 hover:bg-white/5">
            Revenue Analytics
          </Button>
          <Button size="lg" className="rounded-2xl bg-primary text-white shadow-2xl shadow-primary/30 text-[10px] font-black uppercase tracking-widest h-14 px-8 hover:scale-105 transition-all">
            <PlusCircle size={20} className="mr-3" /> New Invoice Entity
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: '$124.5K', sub: '↑ 18.4% MRR Growth', icon: DollarSign, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'Pending Payments', value: '$12.8K', sub: '08 Overdue Invoices', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { label: 'Projected MRR', value: '$148.2K', sub: 'Forecast for Q3 2026', icon: BarChart3, color: 'text-purple-500', bg: 'bg-purple-500/10' },
          { label: 'Collection Rate', value: '98.4%', sub: 'Target: 99.0%', icon: PieChart, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
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
        <DataTable columns={columns} data={MOCK_TRANSACTIONS} searchKey="customer" />
      </div>
    </div>
  );
}
