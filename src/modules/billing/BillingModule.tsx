"use client";

import React from 'react';
import { DataTable } from '@/components/shared/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { 
  CreditCard, DollarSign, Wallet, TrendingUp, Clock, CheckCircle2, MoreHorizontal, Banknote, Receipt, Plus
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
}

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: "INV-2026-001", customer: "Royal Heights Apt.", amount: 4500.00, status: "Paid", date: "May 12, 2026", method: "Bank Transfer" },
  { id: "INV-2026-002", customer: "Green Park Society", amount: 2800.50, status: "Pending", date: "May 14, 2026", method: "Credit Card" },
  { id: "INV-2026-003", customer: "Tech Park IT", amount: 12400.00, status: "Overdue", date: "May 01, 2026", method: "Direct Debit" },
  { id: "INV-2026-004", customer: "Sunrise Villa", amount: 1200.00, status: "Paid", date: "May 10, 2026", method: "UPI" },
];

export function BillingModule() {
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
      cell: ({ row }) => <span className="font-black text-sm">${row.getValue("amount")}</span>,
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
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 rounded-lg hover:bg-white/5">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 glass border-white/10">
            <DropdownMenuItem className="gap-2 text-xs font-medium"><Receipt size={14} /> Download PDF</DropdownMenuItem>
            <DropdownMenuItem className="gap-2 text-xs font-medium"><CreditCard size={14} /> Mark Paid</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/5" />
            <DropdownMenuItem className="gap-2 text-xs font-medium text-red-500">Void Invoice</DropdownMenuItem>
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
            <Wallet size={16} className="text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Financial Suite</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight lg:text-5xl">Billing & Revenue</h1>
        </motion.div>
        <Button size="sm" className="rounded-xl bg-primary text-white shadow-xl shadow-primary/30 text-xs font-bold px-4">
          <Plus size={16} className="mr-2" /> Create Invoice
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'MRR', value: '$124.5K', icon: DollarSign, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Pending', value: '$12.8K', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { label: 'Growth', value: '+18.4%', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 glass border-white/10 rounded-3xl"
          >
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4", stat.bg, stat.color)}>
              <stat.icon size={24} />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">{stat.label}</p>
            <p className="text-3xl font-black">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <DataTable columns={columns} data={MOCK_TRANSACTIONS} searchKey="customer" />
    </div>
  );
}
