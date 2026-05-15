"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

// --- GlassCard ---
interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: boolean;
}

export const GlassCard = ({ children, className, hoverEffect = true, ...props }: GlassCardProps) => {
  return (
    <div
      className={cn(
        "glass-card rounded-[24px] overflow-hidden p-6 relative",
        hoverEffect && "hover:bg-white/[0.04] cursor-default",
        className
      )}
      {...props}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
};

// --- MetricCard ---
interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  chart?: React.ReactNode;
}

export const MetricCard = ({ title, value, change, icon: Icon, trend, chart }: MetricCardProps) => {
  return (
    <GlassCard className="flex flex-col gap-4 min-w-[240px]">
      <div className="flex items-center justify-between">
        <div className="p-2.5 rounded-2xl bg-primary/10 border border-primary/20">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        {change !== undefined && (
          <div className={cn(
            "text-xs font-medium px-2 py-1 rounded-full",
            trend === "up" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : 
            trend === "down" ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" :
            "bg-white/5 text-white/50 border border-white/10"
          )}>
            {trend === "up" ? "+" : trend === "down" ? "-" : ""}{Math.abs(change)}%
          </div>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
        <h3 className="text-3xl font-bold tracking-tight text-white mt-1">{value}</h3>
      </div>
      {chart && <div className="h-12 w-full mt-2">{chart}</div>}
    </GlassCard>
  );
};

// --- GradientBorder ---
export const GradientBorder = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={cn("relative p-[1px] rounded-[24px] overflow-hidden bg-gradient-to-br from-white/20 via-white/5 to-white/20", className)}>
      <div className="bg-background/90 backdrop-blur-xl rounded-[23px] h-full w-full">
        {children}
      </div>
    </div>
  );
};

// --- AnimatedBadge ---
export const AnimatedBadge = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-primary/20 bg-primary/10 text-primary shadow-[0_0_15px_rgba(59,130,246,0.3)]",
        className
      )}
    >
      {children}
    </motion.span>
  );
};

// --- LiveStatusIndicator ---
export const LiveStatusIndicator = ({ status = "live", label }: { status?: "live" | "idle" | "error"; label?: string }) => {
  const colors = {
    live: "bg-emerald-500",
    idle: "bg-amber-500",
    error: "bg-rose-500",
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative flex h-2 w-2">
        <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", colors[status])}></span>
        <span className={cn("relative inline-flex rounded-full h-2 w-2", colors[status])}></span>
      </div>
      {label && <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</span>}
    </div>
  );
};

// --- SectionHeader ---
export const SectionHeader = ({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-1">{title}</h2>
        {subtitle && <p className="text-muted-foreground text-sm">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

// --- AIInsightCard ---
export const AIInsightCard = ({ insight }: { insight: string }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 p-4">
      <div className="absolute top-0 right-0 p-2 opacity-10">
        <div className="w-20 h-20 bg-primary rounded-full blur-3xl" />
      </div>
      <div className="flex items-start gap-3 relative z-10">
        <div className="mt-1 p-1.5 rounded-lg bg-primary/20">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-primary uppercase tracking-tighter mb-1">AI Recommendation</h4>
          <p className="text-sm text-white/80 leading-relaxed italic">"{insight}"</p>
        </div>
      </div>
    </div>
  );
};
