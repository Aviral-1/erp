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
  XCircle
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

export default function CustomersPage() {
  const columns: ColumnDef<Customer>[] = [
    {
      accessorKey: "customer_id",
      header: "ID",
      cell: ({ row }) => (
        <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded dark:bg-slate-800 dark:text-slate-400">
          {row.getValue("customer_id")}
        </span>
      ),
    },
    {
      accessorKey: "client_name",
      header: "Client Name",
      cell: ({ row }) => (
        <Link href={`/customers/${row.original.customer_id}`} className="flex flex-col group">
          <span className="font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{row.getValue("client_name")}</span>
          <span className="text-xs text-slate-400">{row.original.contact_person_name}</span>
        </Link>
      ),
    },
    {
      accessorKey: "waste_collection_type",
      header: "Waste Type",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <span className="text-sm">{row.getValue("waste_collection_type")}</span>
        </div>
      ),
    },
    {
      accessorKey: "assigned_driver_name",
      header: "Driver",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Truck size={14} className="text-slate-400" />
          <span className="text-sm">{row.getValue("assigned_driver_name")}</span>
        </div>
      ),
    },
    {
      accessorKey: "pickup_request_frequency",
      header: "Frequency",
      cell: ({ row }) => (
        <Badge variant="outline" className="rounded-full font-medium border-slate-200">
          {row.getValue("pickup_request_frequency")}
        </Badge>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge className={
            status === 'Active' ? "bg-emerald-500/10 text-emerald-600 border-emerald-200 hover:bg-emerald-500/20" :
            status === 'Pending' ? "bg-amber-500/10 text-amber-600 border-amber-200 hover:bg-amber-500/20" :
            "bg-slate-100 text-slate-500 border-slate-200"
          }>
            {status}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer gap-2">
                <Eye size={14} />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer gap-2">
                <Edit size={14} />
                Edit Customer
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer gap-2 text-red-500 focus:text-red-500">
                <Trash2 size={14} />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Customer Management</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Manage and track all your waste collection clients.</p>
          </div>
          <Link href="/customers/new">
            <Button className="rounded-xl gap-2 shadow-lg shadow-primary/20 transition-transform hover:scale-105">
              <Plus size={18} />
              Add New Customer
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Active Customers</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">1,120</p>
            </div>
          </div>
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Pending KYC</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">85</p>
            </div>
          </div>
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
              <XCircle size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Inactive</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">45</p>
            </div>
          </div>
        </div>

        <DataTable columns={columns} data={MOCK_CUSTOMERS} searchKey="client_name" />
      </div>
    </DashboardLayout>
  );
}
