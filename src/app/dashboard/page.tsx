"use client";

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardGrid } from '@/components/dashboard/DashboardGrid';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  Layout, 
  Save, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useLayoutStore } from '@/store/useLayoutStore';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const { resetLayout, theme } = useLayoutStore();

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                Operational Intelligence
              </div>
              <Sparkles size={14} className="text-amber-500 animate-pulse" />
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white lg:text-5xl">
              Command Center
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-xl text-sm leading-relaxed">
              Real-time monitoring and analytics for your global waste management operations. 
              Drag, resize, and personalize your workspace.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-xl bg-white/5 border-white/10 hover:bg-white/10 text-xs font-bold"
              onClick={resetLayout}
            >
              <RotateCcw size={14} className="mr-2" />
              Reset Layout
            </Button>
            <Button 
              size="sm" 
              className="rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 text-xs font-bold px-4"
            >
              <Save size={14} className="mr-2" />
              Save Workspace
            </Button>
            <Button 
              size="icon" 
              className="rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white"
            >
              <Plus size={20} />
            </Button>
          </motion.div>
        </div>

        {/* Dynamic Grid */}
        <div className="relative">
          <DashboardGrid />
        </div>
      </div>
    </DashboardLayout>
  );
}
