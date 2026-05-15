"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isUp: boolean;
  };
  color: string;
  delay?: number;
}

export function KPICard({ title, value, icon: Icon, trend, color, delay = 0 }: KPICardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card className="overflow-hidden border-none shadow-md bg-white dark:bg-slate-900 group hover:shadow-xl transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{title}</p>
              <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                {value}
              </h3>
              {trend && (
                <div className="flex items-center gap-1.5 mt-2">
                  <span className={cn(
                    "text-xs font-semibold px-2 py-0.5 rounded-full",
                    trend.isUp ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/30" : "bg-red-100 text-red-600 dark:bg-red-950/30"
                  )}>
                    {trend.isUp ? "+" : "-"}{trend.value}%
                  </span>
                  <span className="text-xs text-slate-400">vs last month</span>
                </div>
              )}
            </div>
            <div className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110 duration-300",
              color
            )}>
              <Icon size={28} />
            </div>
          </div>
        </CardContent>
        <div className={cn("h-1.5 w-full", color.replace('bg-', 'bg-opacity-20 bg-'))}>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1, delay: delay + 0.5 }}
            className={cn("h-full", color)}
          />
        </div>
      </Card>
    </motion.div>
  );
}
