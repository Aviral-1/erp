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
  Calendar
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';

// --- CUSTOM ICON CREATORS ---

const createMarkerIcon = (iconHtml: string, color: string) => L.divIcon({
  className: 'custom-marker',
  html: `
    <div class="relative group">
      <div class="absolute -inset-2 bg-${color}-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div class="relative w-10 h-10 rounded-2xl bg-slate-900 border border-white/20 flex items-center justify-center text-${color}-400 shadow-2xl transition-transform hover:scale-110 active:scale-95">
        ${iconHtml}
        <div class="absolute -top-1 -right-1 w-3 h-3 bg-${color}-500 rounded-full border-2 border-slate-900"></div>
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
      <div class="relative w-12 h-12 rounded-full bg-primary border-4 border-white shadow-[0_0_20px_rgba(59,130,246,0.5)] flex items-center justify-center text-white">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-1.39-1.74a2 2 0 0 0-1.56-.74H14"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>
      </div>
      <div class="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-emerald-500 text-[8px] font-black text-white">LIVE</div>
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

// --- COMPONENTS ---

function MapEffect() {
  const map = useMap();
  useEffect(() => {
    // Add subtle dark mode overlay to standard map
    const overlay = L.canvas();
    map.getContainer().style.filter = "invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%)";
  }, [map]);
  return null;
}

export default function LiveMap() {
  const [drivers, setDrivers] = useState(INITIAL_DRIVERS);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<typeof INITIAL_DRIVERS[0] | null>(null);
  const [activeLayer, setActiveLayer] = useState<'all' | 'residential' | 'commercial' | 'hazardous'>('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
    <div className="h-full w-full relative overflow-hidden bg-slate-950 font-sans">
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
            opacity: 0.4,
            lineCap: 'round',
            lineJoin: 'round',
          }} 
        />
        <Polyline 
          positions={ROUTE_PATH} 
          pathOptions={{ 
            color: '#60a5fa', 
            weight: 2, 
            opacity: 0.8,
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

      {/* Top Navigation Bar */}
      <div className="absolute top-6 left-6 right-6 z-[1000] flex items-center gap-4 pointer-events-none">
        <div className="flex-1 max-w-2xl pointer-events-auto">
          <div className="glass-dark border-white/10 rounded-2xl p-2 flex items-center gap-2 shadow-2xl backdrop-blur-xl">
            <div className="pl-3 text-slate-500">
              <Search size={18} />
            </div>
            <Input 
              placeholder="Search customers, vehicles, drivers..." 
              className="border-none bg-transparent focus-visible:ring-0 text-white placeholder:text-slate-500 text-sm h-10"
            />
            <div className="flex items-center gap-1 pr-1">
              <Button size="sm" variant="ghost" className="h-9 rounded-xl text-slate-400 hover:text-white hover:bg-white/5">
                <Filter size={16} className="mr-2" />
                Filters
              </Button>
              <div className="w-px h-6 bg-white/10 mx-1" />
              <Button size="icon" variant="ghost" className="h-9 w-9 rounded-xl text-slate-400 hover:text-white hover:bg-white/5">
                <SlidersHorizontal size={16} />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="glass-dark border-white/10 rounded-2xl px-4 py-2 flex items-center gap-3 shadow-2xl">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
            <span className="text-[10px] font-bold text-white uppercase tracking-widest">Live Sync: Active</span>
          </div>
          <Button size="icon" className="w-12 h-12 rounded-2xl bg-primary text-white shadow-xl shadow-primary/30 hover:scale-105 transition-transform">
            <Sparkles size={22} />
          </Button>
        </div>
      </div>

      {/* Left Sidebar: Operational Intelligence */}
      <div className="absolute left-6 top-24 bottom-6 z-[1000] w-80 pointer-events-none flex flex-col gap-4">
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="glass-dark border-white/10 rounded-[32px] p-6 shadow-2xl pointer-events-auto flex flex-col gap-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-white tracking-tight">Fleet Intel</h2>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Real-time Ops Center</p>
            </div>
            <Button size="icon" variant="ghost" className="rounded-full hover:bg-white/5">
              <ChevronDown size={20} className="text-slate-500" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 border border-white/5 p-4 rounded-3xl">
              <p className="text-[9px] font-bold text-slate-500 uppercase mb-1">Active Trucks</p>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-black text-white">38</span>
                <Badge className="bg-emerald-500/10 text-emerald-400 border-none text-[8px]">84%</Badge>
              </div>
            </div>
            <div className="bg-white/5 border border-white/5 p-4 rounded-3xl">
              <p className="text-[9px] font-bold text-slate-500 uppercase mb-1">Delayed</p>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-black text-white">04</span>
                <Badge className="bg-red-500/10 text-red-400 border-none text-[8px]">+2</Badge>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Layer Control</h3>
            <div className="flex flex-col gap-1">
              {[
                { id: 'all', label: 'All Customers', icon: MapPin, color: 'text-primary' },
                { id: 'residential', label: 'Residential', icon: Home, color: 'text-blue-400' },
                { id: 'commercial', label: 'Commercial', icon: Building2, color: 'text-purple-400' },
                { id: 'hazardous', label: 'Hazardous', icon: AlertTriangle, color: 'text-amber-400' },
              ].map(layer => (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id as any)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group",
                    activeLayer === layer.id ? "bg-white/10 text-white" : "text-slate-500 hover:bg-white/5 hover:text-slate-300"
                  )}
                >
                  <layer.icon size={16} className={layer.color} />
                  <span className="text-xs font-bold flex-1 text-left">{layer.label}</span>
                  {activeLayer === layer.id && <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-white/5">
            <div className="flex items-center gap-3 p-4 rounded-3xl bg-primary/10 border border-primary/20">
              <Zap size={20} className="text-primary animate-pulse" />
              <div>
                <p className="text-[10px] font-bold text-white uppercase tracking-widest">AI Route Engine</p>
                <p className="text-[9px] text-primary/80 font-medium">Optimizing 4 active paths...</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mini Alerts Widget */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-dark border-white/10 rounded-[32px] p-5 shadow-2xl pointer-events-auto"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Bell size={12} />
              Recent Alerts
            </h3>
            <span className="text-[8px] font-black text-primary hover:underline cursor-pointer">CLEAR ALL</span>
          </div>
          <div className="space-y-2">
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex gap-3">
              <AlertTriangle size={14} className="text-amber-500 shrink-0 mt-0.5" />
              <p className="text-[9px] text-slate-300 leading-tight">
                <span className="font-bold text-white">VEH-204</span> detour detected. Potential route violation in Zone B.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right-Side Detailed Info Panels (Conditional) */}
      <AnimatePresence>
        {selectedCustomer && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            className="absolute top-24 right-6 bottom-6 z-[1000] w-96 glass-dark border-white/10 rounded-[40px] shadow-2xl pointer-events-auto overflow-hidden flex flex-col"
          >
            {/* Header with Image */}
            <div className="h-56 relative shrink-0">
              <img 
                src={selectedCustomer.property_image || "https://images.unsplash.com/photo-1545324418-f1d3ac1ef38c?q=80&w=400&auto=format&fit=crop"} 
                className="w-full h-full object-cover"
                alt="Property"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute top-4 left-4 right-4 flex justify-between">
                <Badge className={cn(
                  "border-none text-[9px] font-black tracking-widest",
                  selectedCustomer.status === 'Active' ? "bg-emerald-500 text-white" : "bg-amber-500 text-white"
                )}>
                  {selectedCustomer.status?.toUpperCase()}
                </Badge>
                <Button size="icon" variant="ghost" onClick={() => setSelectedCustomer(null)} className="h-8 w-8 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/40">
                  <X size={16} />
                </Button>
              </div>
              <div className="absolute bottom-4 left-6 right-6">
                <h3 className="text-2xl font-black text-white tracking-tight leading-tight">{selectedCustomer.client_name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin size={10} className="text-primary" />
                  <p className="text-[10px] text-slate-300 font-medium truncate">{selectedCustomer.gps_address}</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6">
              {/* Core Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-3xl bg-white/5 border border-white/5">
                  <p className="text-[9px] font-bold text-slate-500 uppercase mb-1">Customer ID</p>
                  <p className="text-sm font-black text-white">{selectedCustomer.customer_id}</p>
                </div>
                <div className="p-4 rounded-3xl bg-white/5 border border-white/5">
                  <p className="text-[9px] font-bold text-slate-500 uppercase mb-1">KYC Status</p>
                  <Badge variant="outline" className="border-primary/30 text-primary text-[8px] font-black h-5">
                    <ShieldCheck size={10} className="mr-1" />
                    {selectedCustomer.kyc_status?.toUpperCase() || 'VERIFIED'}
                  </Badge>
                </div>
              </div>

              {/* Operational Intelligence Card */}
              <div className="p-5 rounded-[32px] bg-gradient-to-br from-primary/10 to-purple-500/10 border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-white flex items-center gap-2">
                    <TrendingUp size={14} className="text-primary" />
                    Operational Health
                  </h4>
                  <span className="text-[10px] font-black text-emerald-400">{selectedCustomer.collection_performance}%</span>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-[9px] font-bold text-slate-500 uppercase mb-1.5">
                      <span>Bin Capacity (10 CBM)</span>
                      <span className="text-white">{selectedCustomer.bin_fill_level}% FULL</span>
                    </div>
                    <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedCustomer.bin_fill_level}%` }}
                        className={cn(
                          "h-full rounded-full transition-all duration-1000",
                          (selectedCustomer.bin_fill_level || 0) > 80 ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" : "bg-primary shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Clock size={12} />
                      <span className="text-[10px] font-medium">Last Pickup: {selectedCustomer.last_pickup}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Calendar size={12} />
                      <span className="text-[10px] font-medium">Freq: {selectedCustomer.pickup_request_frequency}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Assigned Team */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Assigned Logistics Team</h4>
                <div className="flex items-center gap-4 p-4 rounded-3xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-all cursor-pointer">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center text-white shadow-lg">
                    <User size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-black text-white">{selectedCustomer.assigned_driver_name}</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">{selectedCustomer.assigned_vehicle_no}</p>
                  </div>
                  <ChevronRight size={18} className="text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              </div>

              {/* Action Matrix */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button className="rounded-2xl h-12 bg-primary text-white font-bold text-xs shadow-xl shadow-primary/20">
                  Manual Pickup
                </Button>
                <Button variant="outline" className="rounded-2xl h-12 glass border-white/10 text-white font-bold text-xs hover:bg-white/5">
                  Route Matrix
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedDriver && (
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[1000] w-[800px] glass-dark border-primary/20 p-8 rounded-[48px] shadow-2xl pointer-events-auto flex gap-8 items-center"
          >
            <div className="relative">
              <div className="w-24 h-24 rounded-[32px] bg-primary flex items-center justify-center text-white shadow-2xl shadow-primary/40 relative z-10">
                <Truck size={48} />
              </div>
              <div className="absolute -inset-4 bg-primary/20 rounded-[40px] blur-2xl animate-pulse"></div>
            </div>

            <div className="flex-1 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-3xl font-black text-white tracking-tight">{selectedDriver.name}</h3>
                    <Badge className="bg-emerald-500 text-white border-none font-black text-[9px]">IN TRANSIT</Badge>
                  </div>
                  <p className="text-sm font-bold text-primary uppercase tracking-widest mt-1">{selectedDriver.vehicle} • ID: DRV-102</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right mr-4 border-r border-white/10 pr-4">
                    <p className="text-[9px] font-bold text-slate-500 uppercase mb-0.5">Live Speed</p>
                    <p className="text-xl font-black text-white">{selectedDriver.speed}</p>
                  </div>
                  <Button size="icon" variant="ghost" onClick={() => setSelectedDriver(null)} className="h-10 w-10 rounded-full hover:bg-white/5">
                    <X size={24} className="text-slate-500" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-8">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase">
                    <span>Route Progress</span>
                    <span className="text-white">{selectedDriver.routeProgress}%</span>
                  </div>
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedDriver.routeProgress}%` }}
                      className="bg-primary h-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                    />
                  </div>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-500 uppercase mb-1">Collection Performance</p>
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-emerald-500" />
                    <p className="text-lg font-black text-white">{selectedDriver.efficiency}% Efficiency</p>
                  </div>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-500 uppercase mb-1">Target Station</p>
                  <p className="text-lg font-black text-blue-400">Jodhpur Central Dump</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 shrink-0">
              <Button className="rounded-2xl h-12 bg-white text-black font-bold text-xs px-8 shadow-xl transition-all hover:scale-105 active:scale-95">
                Optimize Path
              </Button>
              <Button variant="outline" className="rounded-2xl h-12 glass border-white/10 text-white font-bold text-xs px-8 hover:bg-white/5 transition-all">
                Send Dispatch
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- SMART DOCK TOOLBAR --- */}
      <div className="absolute bottom-6 left-6 z-[1000] flex flex-col gap-3">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass-dark border-white/10 rounded-full px-2 py-2 flex items-center gap-1 shadow-2xl shadow-black/50"
        >
          <Button size="icon" className="w-12 h-12 rounded-full bg-primary text-white shadow-xl shadow-primary/20">
            <MapIcon size={20} />
          </Button>
          <Button size="icon" variant="ghost" className="w-12 h-12 rounded-full text-slate-400 hover:text-white hover:bg-white/5">
            <Truck size={20} />
          </Button>
          <Button size="icon" variant="ghost" className="w-12 h-12 rounded-full text-slate-400 hover:text-white hover:bg-white/5">
            <Navigation size={20} />
          </Button>
          <div className="w-px h-6 bg-white/10 mx-2" />
          <Button size="icon" variant="ghost" className="w-12 h-12 rounded-full text-slate-400 hover:text-white hover:bg-white/5">
            <Activity size={20} />
          </Button>
          <Button size="icon" variant="ghost" className="w-12 h-12 rounded-full text-slate-400 hover:text-white hover:bg-white/5">
            <RouteIcon size={20} />
          </Button>
          <Button size="icon" variant="ghost" className="w-12 h-12 rounded-full text-slate-400 hover:text-white hover:bg-white/5">
            <Settings size={20} />
          </Button>
        </motion.div>
      </div>

      {/* AI Assistant Overlay */}
      <div className="absolute bottom-6 right-6 z-[1000]">
        <Button className="h-14 rounded-[28px] px-8 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] border-none text-white transition-all duration-500 group overflow-hidden">
          <div className="relative z-10 flex items-center gap-3">
            <Sparkles size={22} className="group-hover:rotate-12 transition-transform" />
            <span className="text-sm font-black tracking-tight uppercase">Analyze Operations</span>
          </div>
          <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
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
        .premium-popup .leaflet-popup-content-wrapper {
          background: rgba(15, 23, 42, 0.9) !important;
          backdrop-filter: blur(16px) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 24px !important;
          padding: 0 !important;
        }
        .premium-popup .leaflet-popup-tip {
          background: rgba(15, 23, 42, 0.9) !important;
        }
        .custom-marker {
          background: transparent !important;
          border: none !important;
        }
      `}</style>
    </div>
  );
}
