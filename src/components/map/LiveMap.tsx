"use client";

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CUSTOMERS_DATA } from '@/lib/dummy-data';
import { Badge } from '@/components/ui/badge';
import { Search, Navigation, Layers, ShieldCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';

// Fix for default marker icons in Leaflet + Next.js
const createCustomIcon = (color: string) => {
  return L.divIcon({
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3); display: flex; items-center; justify-center;">
             <div style="background-color: white; width: 6px; height: 6px; border-radius: 50%;"></div>
           </div>`,
    className: 'custom-div-icon',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

const WASTE_COLORS: Record<string, string> = {
  'Solid Waste': '#3b82f6', // blue
  'E-Waste': '#f59e0b', // amber
  'Bio-Medical': '#ef4444', // red
  'Organic Waste': '#10b981', // emerald
};

export default function LiveMap() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return (
    <div className="w-full h-full bg-slate-100 animate-pulse rounded-[2rem] flex items-center justify-center">
      <div className="text-slate-400 font-medium">Initializing Map System...</div>
    </div>
  );

  return (
    <div className="relative w-full h-[calc(100vh-180px)] rounded-[2rem] overflow-hidden border border-slate-200 shadow-2xl">
      {/* Floating Controls */}
      <div className="absolute top-6 left-6 z-[1000] w-72 space-y-3">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          <Input 
            placeholder="Search location..." 
            className="pl-10 h-12 bg-white/90 backdrop-blur-md border-none shadow-xl rounded-2xl focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Units</span>
            <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-100">45 Active</Badge>
          </div>
          <div className="space-y-2">
            {['Vehicles', 'Drivers', 'Customers'].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-sm font-medium text-slate-700">{item}</span>
                <span className="ml-auto text-[10px] font-bold text-slate-400">ONLINE</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute top-6 right-6 z-[1000] flex flex-col gap-2">
        <button className="p-3 bg-white/90 backdrop-blur-md rounded-xl shadow-xl text-slate-600 hover:text-blue-600 transition-colors">
          <Navigation className="w-5 h-5" />
        </button>
        <button className="p-3 bg-white/90 backdrop-blur-md rounded-xl shadow-xl text-slate-600 hover:text-blue-600 transition-colors">
          <Layers className="w-5 h-5" />
        </button>
        <button className="p-3 bg-white/90 backdrop-blur-md rounded-xl shadow-xl text-slate-600 hover:text-blue-600 transition-colors">
          <ShieldCheck className="w-5 h-5" />
        </button>
      </div>

      <MapContainer 
        center={[28.6139, 77.209]} 
        zoom={11} 
        style={{ width: '100%', height: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        
        <ZoomControl position="bottomright" />

        {CUSTOMERS_DATA.map((customer) => (
          <Marker 
            key={customer.id} 
            position={[customer.latitude, customer.longitude]}
            icon={createCustomIcon(WASTE_COLORS[customer.waste_collection_type] || '#3b82f6')}
          >
            <Popup className="custom-popup">
              <div className="p-2 min-w-[200px]">
                <div className="flex items-center justify-between mb-3">
                  <Badge className="bg-slate-100 text-slate-600 text-[10px] font-bold border-none uppercase">
                    {customer.id}
                  </Badge>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-green-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    LIVE
                  </div>
                </div>
                
                <h4 className="font-bold text-slate-900 mb-1">{customer.client_name}</h4>
                <p className="text-[10px] text-slate-500 mb-3">{customer.gps_address}</p>
                
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-slate-50 p-2 rounded-lg">
                    <p className="text-[8px] text-slate-400 font-bold uppercase">Bins</p>
                    <p className="text-xs font-bold text-slate-700">{customer.bin_qty}</p>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg">
                    <p className="text-[8px] text-slate-400 font-bold uppercase">Type</p>
                    <p className="text-xs font-bold text-slate-700 truncate">{customer.waste_collection_type.split(' ')[0]}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <Navigation className="w-3 h-3 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[8px] text-slate-400 font-bold uppercase">Assigned Driver</p>
                      <p className="text-[10px] font-bold text-slate-700">{customer.assigned_driver_name}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Dummy Route Line */}
        <Polyline 
          positions={[
            [28.6139, 77.209],
            [28.625, 77.215],
            [28.63, 77.25],
            [28.59, 77.23]
          ]}
          pathOptions={{ color: '#3b82f6', weight: 3, opacity: 0.6, dashArray: '10, 10' }}
        />
      </MapContainer>

      {/* Map Legend */}
      <div className="absolute bottom-6 left-6 z-[1000] bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/20">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Waste Categories</p>
        <div className="flex gap-4">
          {Object.entries(WASTE_COLORS).map(([type, color]) => (
            <div key={type} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-[10px] font-semibold text-slate-600">{type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
