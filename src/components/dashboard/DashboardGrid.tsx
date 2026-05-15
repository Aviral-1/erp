"use client";

import React from 'react';
import { Responsive } from 'react-grid-layout';
import WidthProvider from 'react-grid-layout/build/WidthProvider';
import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';
import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';
import { useLayoutStore, WidgetConfig } from '@/store/useLayoutStore';
import { BaseWidget } from './BaseWidget';
import { 
  TrendingUp, 
  Users, 
  Map as MapIcon, 
  Truck, 
  Activity, 
  BarChart3,
  Calendar,
  AlertCircle,
  Zap,
  Target,
  ArrowUpRight,
  ShieldCheck,
  MousePointer2
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { MapProps } from '@/components/shared/Map';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// Dynamic imports
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
const Map = dynamic<MapProps>(() => import('@/components/shared/Map'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-slate-900/50 animate-pulse" />
});

const ResponsiveGridLayout = WidthProvider(Responsive);

export function DashboardGrid() {
  const { widgets, updateWidgets, theme } = useLayoutStore();

  const onLayoutChange = (currentLayout: any) => {
    const updatedWidgets = widgets.map(w => {
      const layoutItem = currentLayout.find((l: any) => l.i === w.id);
      if (layoutItem) {
        return {
          ...w,
          x: layoutItem.x,
          y: layoutItem.y,
          w: layoutItem.w,
          h: layoutItem.h
        };
      }
      return w;
    });
    updateWidgets(updatedWidgets);
  };

  const renderWidget = (widget: WidgetConfig) => {
    switch (widget.type) {
      case 'stats':
        const isRevenue = widget.id.includes('revenue');
        return (
          <BaseWidget title={widget.title} icon={isRevenue ? <TrendingUp size={18} className="text-primary" /> : <Users size={18} className="text-emerald-500" />}>
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex items-end gap-3">
                  <h3 className="text-4xl font-black tracking-tighter">
                    {isRevenue ? '$128.4K' : '2,840'}
                  </h3>
                  <Badge className={cn(
                    "mb-1 text-[10px] font-bold border-none",
                    isRevenue ? "bg-primary/10 text-primary" : "bg-emerald-500/10 text-emerald-500"
                  )}>
                    <ArrowUpRight size={10} className="mr-1" />
                    12.5%
                  </Badge>
                </div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Growth Index</p>
              </div>
              <div className="h-20 w-full mt-4">
                <Chart 
                  options={{
                    chart: { sparkline: { enabled: true }, animations: { enabled: true, speed: 1000 } },
                    stroke: { curve: 'smooth', width: 3 },
                    colors: [isRevenue ? '#3b82f6' : '#10b981'],
                    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.6, opacityTo: 0.1 } },
                    tooltip: { enabled: false }
                  }}
                  series={[{ data: [30, 40, 35, 50, 49, 60, 70, 91, 125] }]}
                  type="area"
                  height="100%"
                />
              </div>
            </div>
          </BaseWidget>
        );
      case 'map':
        return (
          <BaseWidget title={widget.title} icon={<MapIcon size={18} className="text-blue-400" />} className="p-0">
            <div className="w-full h-full rounded-[24px] overflow-hidden bg-slate-950 relative border border-white/5 shadow-inner">
              <Map center={[26.2389, 73.0243]} zoom={12} className="w-full h-full grayscale-[0.8] contrast-[1.2]" />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute top-4 left-4 z-10">
                <div className="px-3 py-1.5 rounded-xl glass-dark border-white/10 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white">Live Operations</span>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 z-10">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/5">
                    <p className="text-[8px] font-bold text-slate-500 uppercase">Active Fleet</p>
                    <p className="text-xs font-black text-white">38 Vehicles</p>
                  </div>
                  <div className="p-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/5">
                    <p className="text-[8px] font-bold text-slate-500 uppercase">Avg Response</p>
                    <p className="text-xs font-black text-white">12.4m</p>
                  </div>
                </div>
              </div>
            </div>
          </BaseWidget>
        );
      case 'chart':
        return (
          <BaseWidget title={widget.title} icon={<BarChart3 size={18} className="text-purple-500" />}>
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Revenue Forecast</p>
                  <p className="text-xl font-black text-white">$452K Expected</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-white/5">
                  <MousePointer2 size={14} className="text-muted-foreground" />
                </Button>
              </div>
              <div className="flex-1">
                <Chart 
                  options={{
                    chart: { background: 'transparent', toolbar: { show: false } },
                    xaxis: { 
                      categories: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
                      axisBorder: { show: false },
                      axisTicks: { show: false },
                      labels: { style: { colors: '#64748b', fontSize: '10px', fontWeight: 600 } }
                    },
                    yaxis: { show: false },
                    colors: ['#3b82f6', '#8b5cf6'],
                    stroke: { curve: 'smooth', width: 3 },
                    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.5, opacityTo: 0.1 } },
                    grid: { borderColor: 'rgba(255,255,255,0.05)', strokeDashArray: 5 },
                    dataLabels: { enabled: false }
                  }}
                  series={[
                    { name: 'Revenue', data: [400, 300, 600, 800, 500, 900, 700] },
                  ]}
                  type="area"
                  height="100%"
                />
              </div>
            </div>
          </BaseWidget>
        );
      case 'activity':
        return (
          <BaseWidget title={widget.title} icon={<Activity size={18} className="text-amber-500" />}>
            <div className="space-y-4">
              {[
                { label: 'Emergency Pickup', site: 'Site 42', time: '2m', color: 'bg-red-500', icon: AlertCircle },
                { label: 'Route Optimized', site: 'Zone B', time: '12m', color: 'bg-primary', icon: Zap },
                { label: 'Fleet Sync', site: 'Global', time: '45m', color: 'bg-emerald-500', icon: ShieldCheck },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group cursor-pointer p-2 rounded-2xl hover:bg-white/5 transition-colors">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", item.color + "/10", item.color.replace('bg-', 'text-'))}>
                    <item.icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-white truncate">{item.label}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{item.site} • {item.time} ago</p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight size={14} className="text-primary" />
                  </div>
                </div>
              ))}
            </div>
          </BaseWidget>
        );
      default:
        return <BaseWidget title={widget.title}>Content for {widget.type}</BaseWidget>;
    }
  };

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={{ lg: widgets.map(w => ({ i: w.id, x: w.x, y: w.y, w: w.w, h: w.h })) }}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xss: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xss: 2 }}
      rowHeight={60}
      draggableHandle=".drag-handle"
      onLayoutChange={onLayoutChange}
      margin={[24, 24]}
    >
      {widgets.filter(w => w.visible).map(widget => (
        <div key={widget.id} className="h-full">
          {renderWidget(widget)}
        </div>
      ))}
    </ResponsiveGridLayout>
  );
}
