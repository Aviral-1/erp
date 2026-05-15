"use client";

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import dynamic from 'next/dynamic';

const LiveMap = dynamic(() => import('@/modules/map/LiveMap'), { 
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-100 dark:bg-slate-900 animate-pulse flex items-center justify-center">Initializing Smart Tracking System...</div>
});

export default function MapPage() {
  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-140px)] w-full rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl relative">
        <LiveMap />
      </div>
    </DashboardLayout>
  );
}
