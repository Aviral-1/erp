"use client";

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MOCK_CUSTOMERS } from '@/services/mockData';
import { 
  Truck, 
  Trash2, 
  Navigation, 
  AlertCircle,
  Clock,
  Battery,
  Route,
  Activity,
  Layers,
  Map as MapIcon,
  Maximize2,
  ChevronRight,
  Sparkles,
  Zap
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

// Custom Marker Creator
const createPulseIcon = (color: string) => L.divIcon({
  className: 'custom-div-icon',
  html: `<div class="relative flex items-center justify-center">
          <div class="absolute w-8 h-8 rounded-full bg-${color}-500/30 animate-ping"></div>
          <div class="relative w-4 h-4 rounded-full bg-${color}-500 border-2 border-white shadow-lg"></div>
        </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const driverIcon = L.divIcon({
  className: 'driver-div-icon',
  html: `<div class="relative flex flex-col items-center">
          <div class="w-10 h-10 rounded-2xl bg-primary shadow-xl border-2 border-white flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-1.39-1.74a2 2 0 0 0-1.56-.74H14"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>
          </div>
          <div class="absolute -bottom-1 w-2 h-2 bg-primary rotate-45"></div>
        </div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const customerIcon = createPulseIcon('blue');

// Simulated driver positions with movement
const INITIAL_DRIVERS = [
  { id: 1, name: "Rahul Sharma", vehicle: "UP16-BT-4209", lat: 26.24, lng: 73.02, speed: "42 km/h", status: "Active", battery: 88, routeProgress: 65 },
  { id: 2, name: "Amit Kumar", vehicle: "DL01-CS-5512", lat: 26.28, lng: 73.04, speed: "38 km/h", status: "Active", battery: 92, routeProgress: 42 },
];

export default function LiveMap() {
  const [drivers, setDrivers] = useState(INITIAL_DRIVERS);
  const [selectedDriver, setSelectedDriver] = useState<any>(null);
  const center: [number, number] = [26.2389, 73.0243];

  // Simulate movement
  useEffect(() => {
    const interval = setInterval(() => {
      setDrivers(prev => prev.map(d => ({
        ...d,
        lat: d.lat + (Math.random() - 0.5) * 0.001,
        lng: d.lng + (Math.random() - 0.5) * 0.001,
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full w-full relative overflow-hidden group">
      <MapContainer 
        center={center} 
        zoom={13} 
        className="h-full w-full z-0"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Customer Markers */}
        {MOCK_CUSTOMERS.map((customer) => (
          <Marker 
            key={customer.id} 
            position={[customer.latitude, customer.longitude]} 
            icon={customerIcon}
          >
            <Popup className="premium-popup">
              <div className="w-64 p-2 bg-slate-900 text-white rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <Trash2 size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm leading-tight">{customer.client_name}</h4>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">{customer.customer_id}</p>
                  </div>
                </div>
                <div className="space-y-2 mb-4 px-1">
                  <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
                    <span>Waste Type</span>
                    <span className="text-white">{customer.waste_collection_type}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
                    <span>Next Pickup</span>
                    <span className="text-emerald-400">Scheduled 14:00</span>
                  </div>
                </div>
                <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl text-[10px] font-bold h-9">
                  Assign Emergency Pickup
                </Button>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Driver Markers */}
        {drivers.map((driver) => (
          <Marker 
            key={driver.id} 
            position={[driver.lat, driver.lng]} 
            icon={driverIcon}
            eventHandlers={{
              click: () => setSelectedDriver(driver),
            }}
          >
            <Popup className="premium-popup">
              <div className="w-64 p-2 bg-slate-900 text-white rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                    <Truck size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm leading-tight">{driver.name}</h4>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">{driver.vehicle}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                    <p className="text-[9px] font-bold text-slate-500 uppercase mb-1">Speed</p>
                    <p className="text-xs font-black">{driver.speed}</p>
                  </div>
                  <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                    <p className="text-[9px] font-bold text-slate-500 uppercase mb-1">Battery</p>
                    <div className="flex items-center gap-2">
                      <Battery size={10} className="text-emerald-500" />
                      <p className="text-xs font-black">{driver.battery}%</p>
                    </div>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="w-full border-white/10 hover:bg-white/5 text-white rounded-xl text-[10px] font-bold h-9">
                  Open Comms
                </Button>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Dynamic Route Visualization (Simulated) */}
        <Polyline 
          positions={[[26.24, 73.02], [26.25, 73.03], [26.26, 73.025]]} 
          pathOptions={{ color: '#3b82f6', weight: 4, dashArray: '10, 10', opacity: 0.6 }} 
        />
        
        <Circle 
          center={center} 
          pathOptions={{ color: '#3b82f6', fillColor: '#3b82f6', fillOpacity: 0.05, weight: 1 }} 
          radius={3000} 
        />
      </MapContainer>

      {/* Floating Controls - Left */}
      <div className="absolute top-6 left-6 z-[1000] flex flex-col gap-4">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="glass-dark border-white/10 p-5 rounded-3xl w-72 shadow-2xl"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2 text-white">
              <Activity size={14} className="text-primary" />
              Live Telemetry
            </h3>
            <Badge className="bg-emerald-500/20 text-emerald-400 border-none text-[9px] font-bold">SYSTEM ONLINE</Badge>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Active Fleet</span>
              <span className="text-sm font-black text-white">38 / 45</span>
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                className="bg-primary h-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                <p className="text-[8px] font-bold text-slate-500 uppercase mb-1 text-center">Avg Speed</p>
                <p className="text-sm font-black text-white text-center">34 km/h</p>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                <p className="text-[8px] font-bold text-slate-500 uppercase mb-1 text-center">Fuel Saved</p>
                <p className="text-sm font-black text-emerald-400 text-center">12.4%</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-dark border-white/10 p-4 rounded-3xl w-72 shadow-2xl"
        >
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3 flex items-center gap-2 text-white">
            <AlertCircle size={14} className="text-amber-500" />
            Critical Alerts
          </h3>
          <div className="space-y-2">
            {[
              { type: 'delay', title: 'Route Delay', desc: 'VEH-204 is stuck in traffic (Zone B)', icon: Clock, color: 'text-amber-400', bg: 'bg-amber-400/10' },
              { type: 'critical', title: 'Low Fuel', desc: 'VEH-102 fuel level below 5%', icon: Zap, color: 'text-red-400', bg: 'bg-red-400/10' },
            ].map((alert, i) => (
              <div key={i} className={cn("p-3 rounded-2xl border border-white/5 flex gap-3 group cursor-pointer hover:bg-white/5 transition-colors", alert.bg)}>
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", alert.bg, alert.color)}>
                  <alert.icon size={14} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white">{alert.title}</p>
                  <p className="text-[9px] text-slate-400 leading-tight mt-0.5">{alert.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Floating Controls - Right */}
      <div className="absolute top-6 right-6 z-[1000] flex flex-col gap-3">
        <Button size="icon" className="w-12 h-12 rounded-2xl glass-dark border-white/10 text-white hover:bg-primary/20 hover:border-primary/40 shadow-2xl transition-all">
          <Layers size={22} />
        </Button>
        <Button size="icon" className="w-12 h-12 rounded-2xl glass-dark border-white/10 text-white hover:bg-primary/20 hover:border-primary/40 shadow-2xl transition-all">
          <MapIcon size={22} />
        </Button>
        <div className="w-px h-6 bg-white/10 mx-auto my-1" />
        <Button size="icon" className="w-12 h-12 rounded-2xl glass-dark border-white/10 text-white hover:bg-primary/20 hover:border-primary/40 shadow-2xl transition-all">
          <Maximize2 size={22} />
        </Button>
      </div>

      {/* Bottom Driver Tracking Panel (Conditional) */}
      <AnimatePresence>
        {selectedDriver && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] w-[600px] glass-dark border-primary/20 p-6 rounded-[32px] shadow-2xl flex gap-6"
          >
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center text-white shrink-0 shadow-lg">
              <Truck size={40} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-xl font-black text-white leading-tight">{selectedDriver.name}</h3>
                  <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{selectedDriver.vehicle}</p>
                </div>
                <Button size="sm" variant="ghost" onClick={() => setSelectedDriver(null)} className="text-slate-500 hover:text-white">
                  <X size={20} />
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-[9px] font-bold text-slate-500 uppercase mb-1">Route Progress</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-black text-white">{selectedDriver.routeProgress}%</p>
                    <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="bg-primary h-full" style={{ width: `${selectedDriver.routeProgress}%` }} />
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-500 uppercase mb-1">Assigned Tasks</p>
                  <p className="text-sm font-black text-white">12 / 18</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-500 uppercase mb-1">Next Destination</p>
                  <p className="text-sm font-black text-emerald-400 truncate">Royal Heights Apt.</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 shrink-0 justify-center">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-white rounded-xl text-[10px] font-bold h-10 px-6">
                Live Chat
              </Button>
              <Button size="sm" variant="outline" className="border-white/10 hover:bg-white/5 text-white rounded-xl text-[10px] font-bold h-10 px-6">
                Reroute
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Search Overlay Button */}
      <div className="absolute bottom-6 left-6 z-[1000]">
        <Button className="h-14 rounded-full px-6 bg-primary shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:bg-primary/90 transition-all group overflow-hidden relative">
          <div className="relative z-10 flex items-center gap-3">
            <Sparkles size={24} className="text-white group-hover:rotate-12 transition-transform" />
            <span className="text-sm font-black text-white">Ask Fleet AI</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        </Button>
      </div>
    </div>
  );
}

const X = ({ className, size }: { className?: string; size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={className}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);
