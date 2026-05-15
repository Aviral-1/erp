"use client";

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useParams, useRouter } from 'next/navigation';
import { MOCK_CUSTOMERS } from '@/services/mockData';
import { 
  ChevronLeft, 
  MapPin, 
  Truck, 
  Trash2, 
  Calendar, 
  User, 
  Phone, 
  Mail,
  Building,
  CheckCircle2,
  Clock,
  History,
  FileText,
  Camera,
  ArrowUpRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import dynamic from 'next/dynamic';

const MapPicker = dynamic(() => import('@/components/forms/MapPicker'), { 
  ssr: false,
  loading: () => <div className="h-[300px] w-full bg-slate-100 animate-pulse rounded-xl"></div>
});

export default function CustomerDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const customer = MOCK_CUSTOMERS.find(c => c.customer_id === params.id) || MOCK_CUSTOMERS[0];

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full shrink-0"
              onClick={() => router.back()}
            >
              <ChevronLeft size={24} />
            </Button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {customer.client_name}
                </h1>
                <Badge className="bg-emerald-500 hover:bg-emerald-600">Active</Badge>
              </div>
              <p className="text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-1 text-sm font-medium">
                <span className="font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-xs tracking-tight">
                  {customer.customer_id}
                </span>
                •
                <span>Registered on Mar 15, 2024</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-xl border-slate-200">Edit Profile</Button>
            <Button className="rounded-xl shadow-lg shadow-primary/20">Schedule Pickup</Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Pickups', value: '142', icon: Truck, color: 'text-blue-500' },
            { label: 'Waste Collected', value: '12.4 T', icon: Trash2, color: 'text-emerald-500' },
            { label: 'Avg Frequency', value: 'Daily', icon: Calendar, color: 'text-amber-500' },
            { label: 'Efficiency', value: '98%', icon: CheckCircle2, color: 'text-purple-500' },
          ].map((stat, i) => (
            <Card key={i} className="border-none shadow-sm bg-white dark:bg-slate-900">
              <CardContent className="p-4 flex items-center gap-4">
                <div className={cn("w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center", stat.color)}>
                  <stat.icon size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{stat.label}</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Info & Map */}
          <div className="lg:col-span-2 space-y-8">
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-1 rounded-xl w-full justify-start gap-2 h-auto">
                <TabsTrigger value="info" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Info</TabsTrigger>
                <TabsTrigger value="history" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Pickup History</TabsTrigger>
                <TabsTrigger value="billing" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Billing</TabsTrigger>
                <TabsTrigger value="documents" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Documents</TabsTrigger>
              </TabsList>
              
              <TabsContent value="info" className="mt-6 space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <Card className="border-none shadow-md overflow-hidden bg-white dark:bg-slate-900">
                  <CardHeader className="border-b border-slate-50 dark:border-slate-800 pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <User size={18} className="text-primary" />
                      Client Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Contact Person</p>
                        <p className="font-semibold text-slate-900 dark:text-white">{customer.contact_person_name}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Mobile Number</p>
                        <p className="font-semibold text-slate-900 dark:text-white">{customer.client_number}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</p>
                        <p className="font-semibold text-slate-900 dark:text-white">ramesh.s@royalheights.com</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Property Type</p>
                        <p className="font-semibold text-slate-900 dark:text-white">{customer.property_type} ({customer.property_subtype})</p>
                      </div>
                      <div className="md:col-span-2 space-y-1">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Site Address</p>
                        <p className="font-semibold text-slate-900 dark:text-white leading-relaxed">
                          {customer.gps_address}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-md overflow-hidden bg-white dark:bg-slate-900">
                  <CardHeader className="border-b border-slate-50 dark:border-slate-800 pb-4 flex flex-row items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MapPin size={18} className="text-primary" />
                      Geographic Location
                    </CardTitle>
                    <Button variant="ghost" size="sm" className="text-primary text-xs h-8">Full Map</Button>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="h-[300px] w-full">
                      <MapPicker 
                        lat={customer.latitude} 
                        lng={customer.longitude} 
                        onChange={() => {}} 
                      />
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-4">
                        <span className="text-slate-500">Lat: <span className="font-mono font-bold text-slate-900 dark:text-white">{customer.latitude}</span></span>
                        <span className="text-slate-500">Lng: <span className="font-mono font-bold text-slate-900 dark:text-white">{customer.longitude}</span></span>
                      </div>
                      <div className="flex items-center gap-1 text-emerald-600 font-bold">
                        <CheckCircle2 size={14} />
                        Verified GPS Point
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="mt-6 space-y-4 animate-in fade-in slide-in-from-bottom-4">
                <Card className="border-none shadow-md bg-white dark:bg-slate-900">
                  <CardContent className="p-0">
                    <div className="space-y-0">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-50 dark:border-slate-800 last:border-0">
                          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                            <Truck size={20} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold truncate">Solid Waste Pickup Completed</p>
                            <p className="text-xs text-slate-400">Driver: Ashish Dangi • Vehicle: RJ19GB1234</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-sm font-bold">May {15 - i}, 2024</p>
                            <p className="text-xs text-slate-400">09:30 AM</p>
                          </div>
                          <div className="ml-2">
                            <Badge className="bg-emerald-100 text-emerald-600 hover:bg-emerald-100 shadow-none border-none">Success</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column: Sidebar info */}
          <div className="space-y-8">
            <Card className="border-none shadow-md bg-white dark:bg-slate-900 overflow-hidden">
              <CardHeader className="bg-primary/5 border-b border-primary/10">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <Truck size={16} />
                  Assigned Fleet
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 border-2 border-slate-100">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{customer.assigned_driver_name}</p>
                    <p className="text-xs text-slate-400">Primary Driver</p>
                  </div>
                  <Button variant="ghost" size="icon" className="ml-auto text-primary rounded-full">
                    <Phone size={18} />
                  </Button>
                </div>
                
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3 mb-2">
                    <Building size={16} className="text-slate-400" />
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Vehicle Details</p>
                  </div>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{customer.assigned_vehicle_no}</p>
                  <p className="text-xs text-slate-500 mt-1">Smart Truck • 20 CBM Capacity</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md bg-white dark:bg-slate-900">
              <CardHeader>
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <Camera size={16} />
                  Property Photos
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="aspect-square rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden group cursor-pointer relative">
                      <img 
                        src={`https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=200&auto=format&fit=crop`} 
                        className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                        alt="Property"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ArrowUpRight size={24} className="text-white" />
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 rounded-xl border-slate-200">View All Media</Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md bg-white dark:bg-slate-900">
              <CardHeader>
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <FileText size={16} />
                  Quick Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-slate-500 leading-relaxed italic">
                  &quot;Entry from back gate only before 10 AM. Contact manager if gate is locked.&quot;
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
