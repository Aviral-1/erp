"use client";

import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
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
  AlertCircle
} from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamic imports for chart/map components to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
const Map = dynamic(() => import('../shared/Map'), { ssr: false });

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
        return (
          <BaseWidget title={widget.title} icon={widget.id.includes('revenue') ? <TrendingUp size={18} /> : <Users size={18} />}>
            <div className="flex flex-col h-full justify-between">
              <div>
                <p className="text-3xl font-bold tracking-tight">
                  {widget.id.includes('revenue') ? '$128,430' : '2,840'}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded-md">+12.5%</span>
                  <span className="text-[10px] text-muted-foreground">vs last month</span>
                </div>
              </div>
              <div className="h-16 w-full opacity-50">
                <Chart 
                  options={{
                    chart: { sparkline: { enabled: true }, animations: { enabled: true } },
                    stroke: { curve: 'smooth', width: 2 },
                    colors: [widget.id.includes('revenue') ? '#3b82f6' : '#10b981'],
                    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0 } },
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
          <BaseWidget title={widget.title} icon={<MapIcon size={18} />} className="p-0">
            <div className="w-full h-full rounded-2xl overflow-hidden bg-slate-900/50 relative">
              <Map center={[51.505, -0.09]} zoom={13} className="w-full h-full" />
              {/* Overlay elements */}
              <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                <div className="px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold">12 Active Drivers</span>
                </div>
              </div>
            </div>
          </BaseWidget>
        );
      case 'chart':
        return (
          <BaseWidget title={widget.title} icon={<BarChart3 size={18} />}>
            <Chart 
              options={{
                chart: { background: 'transparent', toolbar: { show: false } },
                theme: { mode: 'dark' },
                xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
                colors: ['#3b82f6', '#8b5cf6'],
                stroke: { curve: 'smooth' },
                grid: { borderColor: 'rgba(255,255,255,0.05)' },
              }}
              series={[
                { name: 'Revenue', data: [400, 300, 600, 800, 500, 900, 700] },
                { name: 'Costs', data: [300, 200, 400, 500, 300, 600, 400] }
              ]}
              type="bar"
              height="100%"
            />
          </BaseWidget>
        );
      case 'activity':
        return (
          <BaseWidget title={widget.title} icon={<Activity size={18} />}>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <div className="flex-1">
                    <p className="text-xs font-medium">New collection request from Site {i}</p>
                    <p className="text-[10px] text-muted-foreground">2 minutes ago</p>
                  </div>
                  <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2 rounded-lg">View</Button>
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
      margin={[20, 20]}
    >
      {widgets.filter(w => w.visible).map(widget => (
        <div key={widget.id}>
          {renderWidget(widget)}
        </div>
      ))}
    </ResponsiveGridLayout>
  );
}
