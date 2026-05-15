"use client";

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DataTable } from '@/components/shared/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { 
  CreditCard, 
  DollarSign, 
  FileText, 
  ArrowUpRight, 
  ArrowDownRight,
  Plus,
  Filter,
  Download,
  Calendar,
  Wallet,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  MoreHorizontal,
  Banknote,
  Receipt
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
import { buttonVariants } from '@/components/ui/button';

interface Transaction {
  id: string;
  customer: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue' | 'Refunded';
  date: string;
  method: string;
}

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: "INV-2026-001", customer: "Royal Heights Apt.", amount: 4500.00, status: "Paid", date: "May 12, 2026", method: "Bank Transfer" },
  { id: "INV-2026-002", customer: "Green Park Society", amount: 2800.50, status: "Pending", date: "May 14, 2026", method: "Credit Card" },
  { id: "INV-2026-003", customer: "Tech Park IT", amount: 12400.00, status: "Overdue", date: "May 01, 2026", method: "Direct Debit" },
  { id: "INV-2026-004", customer: "Sunrise Villa", amount: 1200.00, status: "Paid", date: "May 10, 2026", method: "UPI" },
];

export default function BillingPage() {
  const columns: ColumnDef<Transaction>[] = [
    {
      accessorKey: "id",
      header: "Invoice ID",
      cell: ({ row }) => (
        <span className="font-mono text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg border border-primary/20">
          {row.getValue("id")}
        </span>
      ),
    },
    {
      accessorKey: "customer",
      header: "Customer",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-bold text-sm">{row.getValue("customer")}</span>
          <span className="text-[10px] text-muted-foreground uppercase">{row.original.method}</span>
        </div>
      ),
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"));
        return (
          <span className="font-black text-sm">
            ${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge className={cn(
            "rounded-lg px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border",
            status === 'Paid' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
            status === 'Pending' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
            status === 'Overdue' ? "bg-red-500/10 text-red-500 border-red-500/20" :
            "bg-slate-500/10 text-slate-500 border-slate-500/20"
          )}>
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <Calendar size={12} />
          {row.getValue("date")}
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
            <DropdownMenuItem className="gap-2 text-xs font-medium"><Receipt size={14} /> Download PDF</DropdownMenuItem>
            <DropdownMenuItem className="gap-2 text-xs font-medium"><CreditCard size={14} /> Mark as Paid</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/5" />
            <DropdownMenuItem className="gap-2 text-xs font-medium text-red-500"><AlertCircle size={14} /> Void Invoice</DropdownMenuItem>
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
              <Wallet size={16} className="text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Financial Suite</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight lg:text-5xl">Billing & Revenue</h1>
            <p className="text-muted-foreground mt-2 max-w-xl text-sm font-medium">
              Enterprise invoice management, automated payment reconciliation, and revenue analytics.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="rounded-xl glass border-white/10 text-xs font-bold h-11 px-5"><Download size={14} className="mr-2" /> Export CSV</Button>
            <Button size="sm" className="rounded-xl bg-primary text-white shadow-xl shadow-primary/30 text-xs font-bold h-11 px-6">
              <Plus size={16} className="mr-2" /> Create Invoice
            </Button>
          </motion.div>
        </div>

        {/* Finance Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 glass-dark border-primary/20 rounded-[40px] relative overflow-hidden group shadow-2xl"
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                  <DollarSign size={24} />
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-black flex items-center gap-1">
                  <TrendingUp size={12} />
                  +18.4%
                </div>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Monthly Recurring Revenue</p>
              <h3 className="text-4xl font-black text-white">$124,500.00</h3>
              <div className="mt-8 flex gap-4">
                <div className="flex-1">
                  <p className="text-[9px] font-bold text-slate-500 uppercase mb-1">Net Volume</p>
                  <p className="text-sm font-bold text-white">$98,240</p>
                </div>
                <div className="flex-1">
                  <p className="text-[9px] font-bold text-slate-500 uppercase mb-1">Growth</p>
                  <p className="text-sm font-bold text-white">$26,260</p>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-8 glass border-white/5 rounded-[40px] shadow-xl"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                <Clock size={24} />
              </div>
              <Badge className="bg-amber-500/20 text-amber-500 border-none">12 OVERDUE</Badge>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Pending Receivables</p>
            <h3 className="text-4xl font-black">$12,840.50</h3>
            <div className="mt-8 space-y-3">
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full w-[65%]" />
              </div>
              <p className="text-[10px] font-medium text-muted-foreground text-center">65% of invoices paid on time this month</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-8 glass border-white/5 rounded-[40px] shadow-xl"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                <Banknote size={24} />
              </div>
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground">
                <ArrowUpRight size={16} />
              </div>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Successful Payouts</p>
            <h3 className="text-4xl font-black">$84,200.00</h3>
            <p className="text-xs text-muted-foreground mt-8 flex items-center gap-2">
              <CheckCircle2 size={14} className="text-emerald-500" />
              Next payout scheduled for May 18, 2026
            </p>
          </motion.div>
        </div>

        {/* Transactions Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass border-white/10 rounded-[40px] overflow-hidden p-4 shadow-2xl"
        >
          <div className="px-6 py-4 flex items-center justify-between border-b border-white/5 mb-6">
            <h3 className="text-lg font-black flex items-center gap-2">
              <Receipt size={18} className="text-primary" />
              Recent Invoices
            </h3>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase tracking-wider h-8">All Time</Button>
              <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase tracking-wider h-8 text-primary bg-primary/10">This Month</Button>
            </div>
          </div>
          <DataTable columns={columns} data={MOCK_TRANSACTIONS} searchKey="customer" />
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
