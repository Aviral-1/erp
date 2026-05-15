"use client";

import React from 'react';
import dynamic from 'next/dynamic';

const LiveMap = dynamic(() => import('@/modules/map/LiveMap'), { 
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-100 dark:bg-slate-900 animate-pulse flex items-center justify-center">Initializing Smart Tracking System...</div>
});

export function MapModule() {
  return (
    <div className="h-[calc(100vh-180px)] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
      <LiveMap />
    </div>
  );
}
