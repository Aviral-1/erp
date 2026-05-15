"use client";

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import CustomerForm from '@/components/forms/CustomerForm';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NewCustomerPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/customers">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ChevronLeft size={20} />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Add New Customer</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Register a new client for waste collection services.</p>
          </div>
        </div>

        <CustomerForm />
      </div>
    </DashboardLayout>
  );
}
