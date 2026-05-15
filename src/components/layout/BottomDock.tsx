"use client";

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  Truck, 
  Map as MapIcon, 
  BarChart3, 
  Settings, 
  MessageSquare,
  Search,
  Bell,
  Cpu
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLayoutStore } from '@/store/useLayoutStore';
import Link from 'next/link';

const dockItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Users, label: 'Customers', href: '/customers' },
  { icon: MapIcon, label: 'Map', href: '/map' },
  { icon: Truck, label: 'Fleet', href: '/vehicles' },
  { icon: MessageSquare, label: 'AI Chat', href: '/ai' },
  { icon: BarChart3, label: 'Charts', href: '/analytics' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export function BottomDock() {
  const { showBottomDock, theme } = useLayoutStore();
  const mouseX = useMotionValue(Infinity);

  if (!showBottomDock) return null;

  const isDark = theme === 'glass-dark' || theme === 'cyber-neon';

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] hidden md:block">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={cn(
          "flex items-end gap-3 px-4 py-3 rounded-3xl border shadow-2xl transition-all duration-300",
          isDark 
            ? "bg-black/40 backdrop-blur-2xl border-white/10" 
            : "bg-white/40 backdrop-blur-2xl border-slate-200"
        )}
      >
        {dockItems.map((item, i) => (
          <DockIcon key={i} mouseX={mouseX} {...item} />
        ))}
      </motion.div>
    </div>
  );
}

function DockIcon({ mouseX, icon: Icon, label, href }: any) {
  const ref = React.useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [48, 80, 48]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <Link href={href}>
      <motion.div
        ref={ref}
        style={{ width }}
        className="aspect-square rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-white relative group transition-all duration-300 hover:bg-primary/20 hover:border-primary/40 hover:-translate-y-4 shadow-xl"
      >
        <Icon size={24} className="group-hover:scale-125 transition-transform" />
        
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg bg-black text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">
          {label}
        </div>
        
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/40 group-hover:bg-primary transition-colors" />
      </motion.div>
    </Link>
  );
}
