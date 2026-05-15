"use client";

import React from 'react';
import dynamic from 'next/dynamic';

const LiveMap = dynamic(() => import('@/components/map/LiveMap'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-[calc(100vh-180px)] bg-slate-100 animate-pulse rounded-[2rem] flex items-center justify-center">
      <div className="text-slate-400 font-medium">Loading Geospatial Modules...</div>
    </div>
  )
});

export default function MapPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Live Operations</h1>
          <p className="text-slate-500 mt-1">Real-time tracking of collection points and fleet.</p>
        </div>
      </div>

      <LiveMap />
    </div>
  );
}
