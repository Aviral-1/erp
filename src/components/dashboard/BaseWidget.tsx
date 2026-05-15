"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { MoreHorizontal, Maximize2, GripVertical, Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BaseWidgetProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  loading?: boolean;
}

export function BaseWidget({ title, children, className, icon, actions, loading }: BaseWidgetProps) {
  return (
    <div className={cn(
      "group h-full flex flex-col rounded-3xl border bg-white/5 backdrop-blur-md border-white/5 shadow-xl hover:shadow-2xl hover:border-white/10 transition-all duration-300 relative overflow-hidden",
      className
    )}>
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-white/5 cursor-default">
        <div className="flex items-center gap-3">
          <div className="drag-handle cursor-grab active:cursor-grabbing p-1 rounded-lg hover:bg-white/5 text-muted-foreground transition-colors">
            <GripVertical size={16} />
          </div>
          {icon && <div className="text-primary">{icon}</div>}
          <h3 className="text-xs font-bold tracking-tight uppercase opacity-70">{title}</h3>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {actions}
          <Button variant="ghost" size="icon" className="w-7 h-7 rounded-lg text-muted-foreground hover:text-white">
            <Settings2 size={14} />
          </Button>
          <Button variant="ghost" size="icon" className="w-7 h-7 rounded-lg text-muted-foreground hover:text-white">
            <Maximize2 size={14} />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-5 overflow-hidden">
        {loading ? (
          <div className="w-full h-full flex flex-col gap-4">
            <div className="h-4 w-3/4 bg-white/5 animate-pulse rounded-lg" />
            <div className="flex-1 bg-white/5 animate-pulse rounded-2xl" />
          </div>
        ) : (
          children
        )}
      </div>

      {/* Futuristic corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/10 to-transparent blur-2xl pointer-events-none" />
    </div>
  );
}
