"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle, ZoomControl, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MOCK_CUSTOMERS } from '@/services/mockData';
import { Customer } from '@/types';
import { 
  Truck, 
  Trash2, 
  Navigation, 
  AlertCircle,
  Clock,
  Battery,
  Route as RouteIcon,
  Activity,
  Layers,
  Map as MapIcon,
  Maximize2,
  ChevronRight,
  Sparkles,
  Zap,
  Search,
  Filter,
  SlidersHorizontal,
  Home,
  Building2,
  AlertTriangle,
  Recycle,
  User,
  MapPin,
  TrendingUp,
  X,
  Fullscreen,
  Settings,
  Bell,
  MoreVertical,
  ChevronDown,
  ArrowUpRight,
  ShieldCheck,
  Calendar,
  Cpu
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { 
  GlassCard, 
  SectionHeader, 
  AnimatedBadge,
  LiveStatusIndicator,
  AIInsightCard
} from '@/components/ui/premium';

// --- CUSTOM ICON CREATORS ---

const createMarkerIcon = (iconHtml: string, color: string) => L.divIcon({
  className: 'custom-marker',
  html: `
    <div class="relative group">
      <div class="absolute -inset-2 bg-${color}-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div class="relative w-10 h-10 rounded-2xl bg-slate-950 border border-white/10 flex items-center justify-center text-${color}-400 shadow-2xl transition-all group-hover:scale-110 group-hover:border-${color}-500/50">
        ${iconHtml}
        <div class="absolute -top-1 -right-1 w-3 h-3 bg-${color}-500 rounded-full border-2 border-slate-950 shadow-[0_0_8px_rgba(0,0,0,0.5)]"></div>
      </div>
    </div>
  `,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

const vehicleIcon = L.divIcon({
  className: 'vehicle-marker',
  html: `
    <div class="relative">
      <div class="absolute -inset-4 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
      <div class="relative w-12 h-12 rounded-full bg-primary border-2 border-white/20 shadow-[0_0_30px_rgba(59,130,246,0.5)] flex items-center justify-center text-white">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-1.39-1.74a2 2 0 0 0-1.56-.74H14"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>
      </div>
      <div class="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-emerald-500 text-[8px] font-black text-white shadow-[0_0_8px_rgba(16,185,129,0.5)]">LIVE</div>
    </div>
  `,
  iconSize: [48, 48],
  iconAnchor: [24, 24],
});

// --- MOCK DATA FOR ROUTING ---

const ROUTE_PATH: [number, number][] = [
  [26.2389, 73.0243],
  [26.2500, 73.0300],
  [26.2600, 73.0200],
  [26.2700, 73.0400],
  [26.2800, 73.0333]
];

const INITIAL_DRIVERS = [
  { id: 1, name: "Rahul Sharma", vehicle: "UP16-BT-4209", lat: 26.24, lng: 73.02, speed: "42 km/h", status: "Active", battery: 88, routeProgress: 65, efficiency: 94 },
  { id: 2, name: "Amit Kumar", vehicle: "DL01-CS-5512", lat: 26.28, lng: 73.04, speed: "38 km/h", status: "Active", battery: 92, routeProgress: 42, efficiency: 89 },
];

export default function LiveMap() {
  const [drivers, setDrivers] = useState(INITIAL_DRIVERS);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<typeof INITIAL_DRIVERS[0] | null>(null);
  const [activeLayer, setActiveLayer] = useState<'all' | 'residential' | 'commercial' | 'hazardous'>('all');

  // Simulate movement
  useEffect(() => {
    const interval = setInterval(() => {
      setDrivers(prev => prev.map(d => ({
        ...d,
        lat: d.lat + (Math.random() - 0.5) * 0.0005,
        lng: d.lng + (Math.random() - 0.5) * 0.0005,
      })));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const filteredCustomers = useMemo(() => {
    if (activeLayer === 'all') return MOCK_CUSTOMERS;
    return MOCK_CUSTOMERS.filter(c => c.property_type.toLowerCase() === activeLayer);
  }, [activeLayer]);

  return (
    <div className="h-full w-full relative overflow-hidden bg-slate-950">
      <MapContainer 
        center={[26.2389, 73.0243]} 
        zoom={13} 
        className="h-full w-full z-0"
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Glowing Routes */}
        <Polyline 
          positions={ROUTE_PATH} 
          pathOptions={{ 
            color: '#3b82f6', 
            weight: 6, 
            opacity: 0.2,
            lineCap: 'round',
            lineJoin: 'round',
          }} 
        />
        <Polyline 
          positions={ROUTE_PATH} 
          pathOptions={{ 
            color: '#60a5fa', 
            weight: 2, 
            opacity: 0.6,
            dashArray: '1, 15',
            lineCap: 'round',
            lineJoin: 'round',
          }} 
          className="animate-[dash_20s_linear_infinite]"
        />

        {/* Customer Markers */}
        {filteredCustomers.map((customer) => {
          let iconHtml = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>';
          let color = 'blue';

          if (customer.property_type === 'Commercial') {
            iconHtml = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>';
            color = 'purple';
          } else if (customer.waste_collection_type.includes('Hazardous')) {
            iconHtml = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';
            color = 'amber';
          }

          return (
            <Marker 
              key={customer.id} 
              position={[customer.latitude, customer.longitude]} 
              icon={createMarkerIcon(iconHtml, color)}
              eventHandlers={{
                click: () => setSelectedCustomer(customer),
              }}
            />
          );
        })}

        {/* Vehicle Markers */}
        {drivers.map((driver) => (
          <Marker 
            key={driver.id} 
            position={[driver.lat, driver.lng]} 
            icon={vehicleIcon}
            eventHandlers={{
              click: () => setSelectedDriver(driver),
            }}
          />
        ))}

        <ZoomControl position="bottomright" />
      </MapContainer>

      {/* --- FLOATING UI OVERLAYS --- */}

      {/* Top HUD */}
      <div className="absolute top-6 left-6 right-6 z-[1000] flex items-center gap-4 pointer-events-none">
        <div className="flex-1 max-w-2xl pointer-events-auto">
          <GlassCard className="p-2 flex items-center gap-2 border-white/10 rounded-2xl shadow-2xl backdrop-blur-3xl">
            <div className="pl-3 text-muted-foreground">
              <Search size={18} />
            </div>
            <Input 
              placeholder="Search command grid..." 
              className="border-none bg-transparent focus-visible:ring-0 text-white placeholder:text-slate-500 text-sm h-10"
            />
            <div className="flex items-center gap-1 pr-1">
              <Button size="sm" variant="ghost" className="h-9 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 font-bold text-[10px] uppercase tracking-widest">
                <Filter size={14} className="mr-2" />
                Filters
              </Button>
              <div className="w-px h-6 bg-white/10 mx-1" />
              <Button size="icon" variant="ghost" className="h-9 w-9 rounded-xl text-slate-400 hover:text-white hover:bg-white/5">
                <SlidersHorizontal size={16} />
              </Button>
            </div>
          </GlassCard>
        </div>

        <div className="flex items-center gap-3 pointer-events-auto">
          <GlassCard className="px-4 py-2 flex items-center gap-3 border-white/10 rounded-2xl shadow-2xl">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
            <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Live Sync</span>
          </GlassCard>
          <Button size="icon" className="w-12 h-12 rounded-2xl bg-primary text-white shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-transform">
            <Sparkles size={22} />
          </Button>
        </div>
      </div>

      {/* Left Sidebar HUD */}
      <div className="absolute left-6 top-24 bottom-6 z-[1000] w-80 pointer-events-none flex flex-col gap-4">
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="pointer-events-auto flex flex-col gap-4"
        >
          <GlassCard className="rounded-[32px] p-6 border-white/10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-black text-white italic tracking-tight uppercase">Fleet Intel</h2>
                <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Operational HUD</p>
              </div>
              <LiveStatusIndicator label="" />
            </div>

            <div className="grid grid-cols-2 gap-3 mb-8">
              <div className="bg-white/5 border border-white/5 p-4 rounded-3xl">
                <p className="text-[9px] font-black text-muted-foreground uppercase mb-1">Active</p>
                <div className="flex items-end justify-between">
                  <span className="text-2xl font-black text-white italic">38</span>
                  <Badge className="bg-emerald-500/10 text-emerald-400 border-none text-[8px] font-black">94%</Badge>
                </div>
              </div>
              <div className="bg-white/5 border border-white/5 p-4 rounded-3xl">
                <p className="text-[9px] font-black text-muted-foreground uppercase mb-1">Delayed</p>
                <div className="flex items-end justify-between">
                  <span className="text-2xl font-black text-white italic">04</span>
                  <Badge className="bg-rose-500/10 text-rose-400 border-none text-[8px] font-black">+2</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] flex items-center gap-2">
                 <div className="w-4 h-[1px] bg-primary/30" />
                 Layer Matrix
              </h3>
              <div className="flex flex-col gap-1">
                {[
                  { id: 'all', label: 'Global Grid', icon: MapPin, color: 'text-primary' },
                  { id: 'residential', label: 'Residential', icon: Home, color: 'text-blue-400' },
                  { id: 'commercial', label: 'Commercial', icon: Building2, color: 'text-purple-400' },
                  { id: 'hazardous', label: 'Hazardous', icon: AlertTriangle, color: 'text-amber-400' },
                ].map(layer => (
                  <button
                    key={layer.id}
                    onClick={() => setActiveLayer(layer.id as any)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group relative",
                      activeLayer === layer.id ? "bg-primary/10 text-white" : "text-slate-500 hover:bg-white/5 hover:text-slate-300"
                    )}
                  >
                    <layer.icon size={16} className={cn(layer.color, "transition-transform group-hover:scale-110")} />
                    <span className="text-xs font-black uppercase tracking-tight flex-1 text-left">{layer.label}</span>
                    {activeLayer === layer.id && (
                       <motion.div layoutId="layer-active" className="absolute left-0 w-1 h-6 bg-primary rounded-full" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
               <AIInsightCard insight="Optimizer: Redirecting Truck #042 to avoid Sector 14 traffic surge." />
            </div>
          </GlassCard>

          <GlassCard className="rounded-[32px] p-5 border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] font-black text-rose-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <Bell size={12} />
                Critical Alerts
              </h3>
              <span className="text-[8px] font-black text-primary hover:underline cursor-pointer uppercase tracking-widest">Acknowledge All</span>
            </div>
            <div className="space-y-2">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex gap-3 group hover:bg-amber-500/20 transition-colors cursor-pointer">
                <AlertTriangle size={14} className="text-amber-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <p className="text-[10px] text-slate-300 leading-tight font-bold uppercase tracking-tight">
                  <span className="text-white">VEH-204</span> detour detected. Sector B violation.
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Customer Detail HUD */}
      <AnimatePresence>
        {selectedCustomer && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            className="absolute top-24 right-6 bottom-6 z-[1000] w-96 pointer-events-auto"
          >
            <GlassCard className="h-full rounded-[40px] p-0 overflow-hidden border-white/10 flex flex-col shadow-2xl">
               <div className="h-56 relative shrink-0">
                  <img 
                    src={selectedCustomer.property_image || "https://images.unsplash.com/photo-1545324418-f1d3ac1ef38c?q=80&w=400&auto=format&fit=crop"} 
                    className="w-full h-full object-cover"
                    alt="Property"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="absolute top-4 left-4 right-4 flex justify-between">
                    <Badge className={cn(
                      "border-none text-[9px] font-black tracking-widest px-3 py-1",
                      selectedCustomer.status === 'Active' ? "bg-emerald-500 text-white" : "bg-amber-500 text-white"
                    )}>
                      {selectedCustomer.status?.toUpperCase()}
                    </Badge>
                    <button onClick={() => setSelectedCustomer(null)} className="h-8 w-8 rounded-full bg-black/40 backdrop-blur-md text-white/60 hover:text-white flex items-center justify-center transition-colors">
                      <X size={16} />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-6 right-6">
                    <h3 className="text-2xl font-black text-white tracking-tight uppercase italic leading-none">{selectedCustomer.client_name}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <MapPin size={10} className="text-primary" />
                      <p className="text-[10px] text-white/60 font-bold uppercase tracking-tight truncate">{selectedCustomer.gps_address}</p>
                    </div>
                  </div>
               </div>

               <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6 relative">
                  <div className="absolute inset-0 noise-overlay opacity-[0.03] pointer-events-none" />
                  
                  <div className="grid grid-cols-2 gap-4 relative z-10">
                    <div className="p-4 rounded-3xl bg-white/[0.03] border border-white/5">
                      <p className="text-[9px] font-black text-muted-foreground uppercase mb-1">Grid ID</p>
                      <p className="text-sm font-black text-white italic">{selectedCustomer.customer_id}</p>
                    </div>
                    <div className="p-4 rounded-3xl bg-white/[0.03] border border-white/5">
                      <p className="text-[9px] font-black text-muted-foreground uppercase mb-1">KYC Sync</p>
                      <div className="flex items-center gap-2">
                         <ShieldCheck size={12} className="text-primary" />
                         <span className="text-[10px] font-black text-white uppercase">{selectedCustomer.kyc_status || 'VERIFIED'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-[32px] bg-gradient-to-br from-primary/10 to-purple-500/10 border border-white/10 space-y-6 relative z-10">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
                        <TrendingUp size={14} className="text-primary" />
                        Health Index
                      </h4>
                      <span className="text-[10px] font-black text-emerald-400">{selectedCustomer.collection_performance}%</span>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-[9px] font-black text-muted-foreground uppercase mb-2">
                          <span>Payload Volume</span>
                          <span className="text-white">{selectedCustomer.bin_fill_level}% Capacity</span>
                        </div>
                        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${selectedCustomer.bin_fill_level}%` }}
                            className={cn(
                              "h-full rounded-full transition-all duration-1000",
                              (selectedCustomer.bin_fill_level || 0) > 80 ? "bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]" : "bg-primary shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                            )}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2 text-white/60">
                          <Clock size={12} />
                          <span className="text-[10px] font-bold uppercase tracking-tight">{selectedCustomer.last_pickup}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/60">
                          <Calendar size={12} />
                          <span className="text-[10px] font-bold uppercase tracking-tight">{selectedCustomer.pickup_request_frequency}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 relative z-10">
                    <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] flex items-center gap-2">
                       <div className="w-4 h-[1px] bg-white/10" />
                       Assigned Ops
                    </h4>
                    <div className="flex items-center gap-4 p-4 rounded-3xl bg-white/[0.03] border border-white/5 group hover:bg-white/[0.06] transition-all cursor-pointer">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-indigo-600 flex items-center justify-center text-white shadow-xl">
                        <User size={24} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-black text-white italic tracking-tight">{selectedCustomer.assigned_driver_name}</p>
                        <p className="text-[10px] font-black text-primary uppercase tracking-widest">{selectedCustomer.assigned_vehicle_no}</p>
                      </div>
                      <ChevronRight size={18} className="text-muted-foreground group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 relative z-10">
                    <Button className="rounded-2xl h-12 bg-primary text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]">
                      MANUAL DISPATCH
                    </Button>
                    <Button variant="outline" className="rounded-2xl h-12 glass border-white/10 text-white font-black text-[10px] uppercase tracking-widest hover:bg-white/5">
                      ROUTE MATRIX
                    </Button>
                  </div>
               </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vehicle Floating HUD */}
      <AnimatePresence>
        {selectedDriver && (
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[1000] w-[850px] pointer-events-auto"
          >
            <GlassCard className="p-8 rounded-[48px] border-primary/20 flex gap-10 items-center shadow-[0_0_100px_rgba(0,0,0,0.6)]">
               <div className="relative shrink-0">
                  <div className="w-24 h-24 rounded-[32px] bg-primary flex items-center justify-center text-white shadow-[0_0_40px_rgba(59,130,246,0.6)] relative z-10 border border-white/20">
                    <Truck size={44} />
                  </div>
                  <div className="absolute -inset-6 bg-primary/20 rounded-[40px] blur-3xl animate-pulse"></div>
               </div>

               <div className="flex-1 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-4">
                        <h3 className="text-3xl font-black text-white italic tracking-tight uppercase leading-none">{selectedDriver.name}</h3>
                        <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-black text-[10px] uppercase tracking-widest py-1 px-3">IN TRANSIT</Badge>
                      </div>
                      <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mt-3">{selectedDriver.vehicle} • ID: SIGMA-102</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right pr-6 border-r border-white/10">
                        <p className="text-[9px] font-black text-muted-foreground uppercase mb-1">Live Telemetry</p>
                        <p className="text-2xl font-black text-white italic">{selectedDriver.speed}</p>
                      </div>
                      <button onClick={() => setSelectedDriver(null)} className="h-10 w-10 rounded-full hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all">
                        <X size={24} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-10">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-[9px] font-black text-muted-foreground uppercase tracking-widest">
                        <span>Route Sync</span>
                        <span className="text-white">{selectedDriver.routeProgress}%</span>
                      </div>
                      <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${selectedDriver.routeProgress}%` }}
                          className="bg-primary h-full shadow-[0_0_15px_rgba(59,130,246,0.8)]"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-muted-foreground uppercase mb-2">Performance</p>
                      <div className="flex items-center gap-3">
                        <ShieldCheck size={18} className="text-emerald-500" />
                        <p className="text-lg font-black text-white italic uppercase tracking-tight">{selectedDriver.efficiency}% Efficiency</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-muted-foreground uppercase mb-2">Waypoint</p>
                      <p className="text-lg font-black text-primary italic uppercase tracking-tighter">CENTRAL FACILITY</p>
                    </div>
                  </div>
               </div>

               <div className="flex flex-col gap-3 shrink-0">
                  <Button className="rounded-2xl h-14 bg-white text-slate-950 font-black text-[10px] uppercase tracking-[0.2em] px-10 shadow-2xl hover:scale-105 active:scale-95 transition-all">
                    OPTIMIZE PATH
                  </Button>
                  <Button variant="outline" className="rounded-2xl h-14 glass border-white/10 text-white font-black text-[10px] uppercase tracking-[0.2em] px-10 hover:bg-white/5 transition-all">
                    SEND SIGNAL
                  </Button>
               </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Tool-Dock */}
      <div className="absolute bottom-6 left-6 z-[1000] flex flex-col gap-3">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="pointer-events-auto"
        >
          <GlassCard className="rounded-full px-2 py-2 flex items-center gap-1 shadow-2xl border-white/10 bg-slate-950/40">
            <Button size="icon" className="w-12 h-12 rounded-full bg-primary text-white shadow-xl shadow-primary/40 hover:scale-110 active:scale-90 transition-transform">
              <MapIcon size={20} />
            </Button>
            <Button size="icon" variant="ghost" className="w-12 h-12 rounded-full text-slate-500 hover:text-white hover:bg-white/10 transition-colors">
              <Truck size={20} />
            </Button>
            <Button size="icon" variant="ghost" className="w-12 h-12 rounded-full text-slate-500 hover:text-white hover:bg-white/10 transition-colors">
              <Navigation size={20} />
            </Button>
            <div className="w-px h-6 bg-white/10 mx-2" />
            <Button size="icon" variant="ghost" className="w-12 h-12 rounded-full text-slate-500 hover:text-white hover:bg-white/10 transition-colors">
              <Activity size={20} />
            </Button>
            <Button size="icon" variant="ghost" className="w-12 h-12 rounded-full text-slate-500 hover:text-white hover:bg-white/10 transition-colors">
              <Cpu size={20} />
            </Button>
            <Button size="icon" variant="ghost" className="w-12 h-12 rounded-full text-slate-500 hover:text-white hover:bg-white/10 transition-colors">
              <Settings size={20} />
            </Button>
          </GlassCard>
        </motion.div>
      </div>

      {/* AI Commander Link */}
      <div className="absolute bottom-6 right-6 z-[1000]">
        <Button className="h-16 rounded-[32px] px-10 bg-gradient-to-r from-primary to-indigo-600 shadow-[0_0_50px_rgba(59,130,246,0.4)] hover:shadow-[0_0_60px_rgba(59,130,246,0.6)] border-none text-white transition-all duration-500 group overflow-hidden">
          <div className="relative z-10 flex items-center gap-4">
            <Sparkles size={24} className="group-hover:rotate-12 transition-transform" />
            <span className="text-sm font-black tracking-[0.2em] uppercase italic">Analyze Sector</span>
          </div>
          <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        </Button>
      </div>

      <style jsx global>{`
        .leaflet-container {
          background: #020617 !important;
        }
        @keyframes dash {
          to {
            stroke-dashoffset: -100;
          }
        }
        .custom-marker {
          background: transparent !important;
          border: none !important;
        }
        .noise-overlay {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3%3Cfilter id='noiseFilter'%3%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3%3C/filter%3%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3%3C/svg%3");
        }
      `}</style>
    </div>
  );
}

