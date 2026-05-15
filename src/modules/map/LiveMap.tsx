"use client";

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MOCK_CUSTOMERS } from '@/services/mockData';
import { 
  Truck, 
  User, 
  Trash2, 
  Navigation, 
  AlertCircle,
  Clock,
  Battery,
  Route
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Icons
const customerIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/1216/1216733.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const driverIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3202/3202926.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// Simulated driver positions
const DRIVERS = [
  { id: 1, name: "Ashish Dangi", vehicle: "RJ19GB1234", lat: 26.24, lng: 73.02, speed: "40 km/h", status: "Active" },
  { id: 2, name: "Vikram Kumar", vehicle: "RJ14CA5678", lat: 26.28, lng: 73.04, speed: "35 km/h", status: "Active" },
];

export default function LiveMap() {
  const center: [number, number] = [26.2389, 73.0243]; // Jodhpur Center

  return (
    <div className="h-full w-full relative group">
      <MapContainer 
        center={center} 
        zoom={13} 
        className="h-full w-full"
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
            <Popup className="custom-popup">
              <div className="w-64 p-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                    <Trash2 size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{customer.client_name}</h4>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{customer.customer_id}</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Waste Type:</span>
                    <span className="font-semibold">{customer.waste_collection_type}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Bin Qty:</span>
                    <span className="font-semibold">{customer.bin_qty} ({customer.provided_bin_sizes})</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Last Pickup:</span>
                    <span className="font-semibold">2 hours ago</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="w-full text-[10px] h-8 rounded-lg">View Details</Button>
                  <Button size="sm" variant="outline" className="w-full text-[10px] h-8 rounded-lg">Navigate</Button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Driver Markers */}
        {DRIVERS.map((driver) => (
          <Marker 
            key={driver.id} 
            position={[driver.lat, driver.lng]} 
            icon={driverIcon}
          >
            <Popup>
              <div className="w-56 p-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <Truck size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{driver.name}</h4>
                    <p className="text-[10px] text-slate-500 font-bold tracking-wider">{driver.vehicle}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-slate-50 p-2 rounded-lg text-center">
                    <p className="text-[10px] text-slate-400">Speed</p>
                    <p className="text-xs font-bold">{driver.speed}</p>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg text-center">
                    <p className="text-[10px] text-slate-400">Battery</p>
                    <p className="text-xs font-bold">85%</p>
                  </div>
                </div>
                <Badge className="w-full justify-center bg-emerald-500">In Service</Badge>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Zone visualization (Example) */}
        <Circle 
          center={center} 
          pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.1 }} 
          radius={2000} 
        />
      </MapContainer>

      {/* Floating UI Elements */}
      <div className="absolute top-6 left-6 z-[1000] space-y-4">
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 w-64">
          <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
            <Navigation size={16} className="text-primary" />
            Live Fleet Status
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Total Vehicles</span>
              <span className="font-bold">45</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Active Now</span>
              <span className="font-bold text-emerald-500">38</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full w-[85%]"></div>
            </div>
          </div>
        </div>

        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 w-64">
          <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
            <AlertCircle size={16} className="text-amber-500" />
            Alerts
          </h3>
          <div className="space-y-2">
            <div className="p-2 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-100 dark:border-amber-900/50">
              <p className="text-[10px] font-bold text-amber-700 dark:text-amber-400">Delay in Zone B</p>
              <p className="text-[9px] text-amber-600/80">Vehicle RJ19 is 15m behind schedule</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 z-[1000] flex flex-col gap-2">
        <Button size="icon" className="w-12 h-12 rounded-2xl shadow-xl bg-white text-slate-900 hover:bg-slate-100">
          <Route size={24} />
        </Button>
        <Button size="icon" className="w-12 h-12 rounded-2xl shadow-xl bg-primary text-white">
          <Navigation size={24} />
        </Button>
      </div>
    </div>
  );
}
