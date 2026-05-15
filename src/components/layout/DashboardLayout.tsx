"use client";

import React, { useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';
import { Breadcrumbs } from './Breadcrumbs';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useAppStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto scroll-smooth">
          <div className="container mx-auto p-4 md:p-6 lg:p-8">
            <Breadcrumbs />
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
