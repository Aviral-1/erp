"use client";

import React from 'react';
import { ResponsiveGridLayout, useContainerWidth, Layout, LayoutItem } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
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

export function DashboardGrid() {
  const { widgets, updateWidgets } = useLayoutStore();
  const { width, containerRef, mounted } = useContainerWidth();

  const onLayoutChange = (currentLayout: Layout) => {
    const updatedWidgets = widgets.map(w => {
      const layoutItem = currentLayout.find((l: LayoutItem) => l.i === w.id);
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
    const isRevenue = widget.type === 'revenue';
    
    switch (widget.type) {
      case 'revenue':
      case 'orders':
        return (
          <BaseWidget title={widget.title} icon={isRevenue ? <BarChart3 size={18} className="text-primary" /> : <Truck size={18} className="text-emerald-500" />}>
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
      case 'fleet':
        return (
          <BaseWidget title="Live Fleet Operations" icon={<MapIcon size={18} className="text-primary" />}>
            <div className="h-full w-full rounded-2xl overflow-hidden relative group">
              <Map center={[26.2389, 73.0243]} zoom={12} className="h-full w-full" />
              <div className="absolute top-4 right-4 z-[10] flex flex-col gap-2">
                <Badge className="bg-black/60 backdrop-blur-md border-white/10 text-[10px] font-bold py-1">
                  <Activity size={10} className="mr-1 text-emerald-500 animate-pulse" />
                  142 ACTIVE
                </Badge>
              </div>
            </div>
          </BaseWidget>
        );
      case 'analytics':
        return (
          <BaseWidget title="Efficiency Metrics" icon={<TrendingUp size={18} className="text-purple-500" />}>
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-2xl font-black tracking-tight">94.2%</p>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Route Optimization</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl hover:bg-white/5 drag-handle cursor-grab active:cursor-grabbing">
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
                    { name: 'Planned', data: [31, 40, 28, 51, 42, 109, 100] },
                    { name: 'Actual', data: [11, 32, 45, 32, 34, 52, 41] }
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
    <div ref={containerRef} className="w-full h-full min-h-[800px]">
      {mounted && (
        <ResponsiveGridLayout
          width={width}
          className="layout"
          layouts={{ lg: widgets.map(w => ({ i: w.id, x: w.x, y: w.y, w: w.w, h: w.h })) }}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xss: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xss: 2 }}
          rowHeight={60}
          dragConfig={{ handle: ".drag-handle" }}
          onLayoutChange={onLayoutChange}
          margin={[24, 24]}
        >
          {widgets.filter(w => w.visible).map(widget => (
            <div key={widget.id} className="h-full">
              {renderWidget(widget)}
            </div>
          ))}
        </ResponsiveGridLayout>
      )}
    </div>
  );
}
