"use client";

import React, { useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  ColumnDef
} from '@tanstack/react-table';
import { cn } from '@/lib/utils';
import {
  Search,
  Filter,
  MoreVertical,
  Eye,
  User,
  Truck,
  MapPin,
  Calendar,
  Image as ImageIcon,
  Info,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  Recycle,
  Clock,
  ArrowUpRight,
  Settings
} from 'lucide-react';
import { CUSTOMERS_DATA } from '@/lib/dummy-data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GlassCard,
  SectionHeader,
  AnimatedBadge,
  LiveStatusIndicator
} from '@/components/ui/premium';

type Customer = typeof CUSTOMERS_DATA[0];

export default function CustomersPage() {
  const [globalFilter, setGlobalFilter] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const columns: ColumnDef<Customer>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: (info) => <span className="font-mono text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">{info.getValue() as string}</span>,
    },
    {
      accessorKey: 'client_name',
      header: 'Client',
      cell: (info) => (
        <div className="flex flex-col">
          <span className="font-black text-white tracking-tight">{info.getValue() as string}</span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Priority Account</span>
        </div>
      ),
    },
    {
      accessorKey: 'waste_collection_type',
      header: 'Waste Profile',
      cell: (info) => {
        const type = info.getValue() as string;
        return (
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-2 h-2 rounded-full",
              type.includes('Hazardous') ? "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]" :
                type.includes('Commercial') ? "bg-primary shadow-[0_0_8px_rgba(59,130,246,0.5)]" :
                  "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
            )} />
            <span className="text-xs font-bold text-white/80">{type}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'bin_qty',
      header: 'Capacity',
      cell: (info) => (
        <div className="flex items-center gap-2">
          <span className="text-sm font-black text-white">{info.getValue() as number}</span>
          <span className="text-[10px] text-muted-foreground uppercase font-bold">Units</span>
        </div>
      ),
    },
    {
      accessorKey: 'pickup_request_frequency',
      header: 'Cycle',
      cell: (info) => (
        <Badge variant="outline" className="border-white/10 bg-white/5 text-[10px] font-bold text-white/60">
          {info.getValue() as string}
        </Badge>
      ),
    },
    {
      accessorKey: 'assigned_driver_name',
      header: 'Fleet Ops',
      cell: (info) => (
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Truck className="w-3.5 h-3.5 text-primary" />
          </div>
          <span className="text-xs font-bold text-white/80">{info.getValue() as string}</span>
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Sync',
      cell: (info) => {
        const status = info.getValue() as string;
        return (
          <div className="flex items-center gap-2">
            <div className={cn("w-1.5 h-1.5 rounded-full", status === 'Active' ? "bg-emerald-500 animate-pulse" : "bg-amber-500")} />
            <span className={cn(
              "text-[10px] font-black uppercase tracking-widest",
              status === 'Active' ? "text-emerald-400" : "text-amber-400"
            )}>{status}</span>
          </div>
        );
      },
    },
    {
      id: 'actions',
      header: '',
      cell: () => (
        <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-muted-foreground hover:text-white">
          <MoreVertical size={16} />
        </button>
      ),
    },
  ];

  const table = useReactTable({
    data: CUSTOMERS_DATA,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const handleRowClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDrawerOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-12"
    >
      <SectionHeader
        title="Client Directory"
        subtitle="Operational overview of all service points and active contracts."
        action={
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Query customers..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-10 w-[280px] bg-white/5 border-white/10 rounded-xl focus:ring-primary/20 text-white text-sm"
              />
            </div>
            <Button className="rounded-xl bg-primary text-white font-bold text-xs h-10 shadow-lg shadow-primary/20 px-6">
              REGISTER CLIENT
            </Button>
          </div>
        }
      />

      {/* Table Container */}
      <GlassCard className="p-0 overflow-hidden border-white/10">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-white/[0.02] border-b border-white/5">
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id} className="hover:bg-transparent border-none">
                  {headerGroup.headers.map(header => (
                    <TableHead key={header.id} className="text-muted-foreground font-black text-[10px] uppercase tracking-[0.2em] py-5 px-6 h-auto">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              <AnimatePresence mode="popLayout">
                {table.getRowModel().rows.map((row, index) => (
                  <TableRow
                    key={row.id}
                    onClick={() => handleRowClick(row.original)}
                    className="group cursor-pointer hover:bg-white/[0.04] transition-all duration-300 border-b border-white/[0.02]"
                  >
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id} className="py-5 px-6">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>

        {/* Advanced Pagination */}
        <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between bg-white/[0.01]">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Page</span>
            <span className="text-xs font-black text-white">{table.getState().pagination.pageIndex + 1}</span>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">of</span>
            <span className="text-xs font-black text-white">{table.getPageCount()}</span>
          </div>

          <div className="flex gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-lg h-9 px-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-white hover:bg-white/5 border border-white/5"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Prev
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-lg h-9 px-4 text-[10px] font-black uppercase tracking-widest text-white hover:bg-primary/20 border border-primary/20"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </GlassCard>

      {/* Futuristic Detail Drawer */}
      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent className="sm:max-w-2xl border-l border-white/10 bg-slate-950/95 backdrop-blur-3xl p-0 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]">
          {selectedCustomer && (
            <div className="h-full flex flex-col relative">
              {/* Noise Overlay */}
              <div className="absolute inset-0 noise-overlay opacity-20 pointer-events-none" />

              {/* Header Hero */}
              <div className="h-64 relative shrink-0">
                <img
                  src={`https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1000&auto=format&fit=crop`}
                  alt="Property"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                  <div className="flex flex-col gap-2">
                    <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px] font-black tracking-widest py-1 px-3">
                      {selectedCustomer.property_type.toUpperCase()}
                    </Badge>
                    <h2 className="text-3xl font-black text-white italic tracking-tight uppercase leading-none">
                      {selectedCustomer.client_name}
                    </h2>
                  </div>
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="p-2 rounded-full bg-black/40 backdrop-blur-md text-white/60 hover:text-white transition-colors"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
                <div className="absolute bottom-6 left-6 flex items-center gap-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Active Service</span>
                  </div>
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">ID: {selectedCustomer.id}</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-10 no-scrollbar relative z-10">
                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                    <p className="text-[9px] font-black text-muted-foreground uppercase mb-1">Collection Perf.</p>
                    <p className="text-xl font-black text-white">98.2%</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                    <p className="text-[9px] font-black text-muted-foreground uppercase mb-1">Service Rank</p>
                    <p className="text-xl font-black text-primary">#14</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                    <p className="text-[9px] font-black text-muted-foreground uppercase mb-1">Impact Score</p>
                    <p className="text-xl font-black text-emerald-400">A+</p>
                  </div>
                </div>

                {/* Logistics Intelligencedjsbfidufbdiufbaiubfuaifbauifbui v xvxcvxcv fdsgsgsgsgsgsg fg sdfgsdfgsgsgsgsgxcvxcvxcvxcvxcvcxv*/}
                <section>
                  <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                    <div className="w-6 h-[1px] bg-primary/30" />
                    Fleet Logistics
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex items-center gap-4 group cursor-pointer">
                      <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:border-primary transition-colors">
                        <User className="text-muted-foreground group-hover:text-primary" />
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-muted-foreground uppercase">Commander</p>
                        <p className="text-sm font-black text-white">{selectedCustomer.assigned_driver_name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 group cursor-pointer">
                      <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:border-primary transition-colors">
                        <Truck className="text-muted-foreground group-hover:text-primary" />
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-muted-foreground uppercase">Unit assigned</p>
                        <p className="text-sm font-black text-white">{selectedCustomer.assigned_vehicle_no}</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Operations Timeline Placeholder */}
                <section>
                  <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                    <div className="w-6 h-[1px] bg-primary/30" />
                    Service Timeline
                  </h3>
                  <div className="space-y-6 relative pl-4">
                    <div className="absolute left-4 top-2 bottom-2 w-px bg-white/5" />
                    {[
                      { title: "Collection Completed", time: "2h ago", desc: "10 CBM Mixed Waste removed", icon: Recycle },
                      { title: "Service Request", time: "1d ago", desc: "Requested for hazardous waste removal", icon: Clock },
                      { title: "Fleet Dispatched", time: "2d ago", desc: "Driver assigned for routine cycle", icon: Truck },
                    ].map((item, idx) => (
                      <div key={idx} className="relative pl-8">
                        <div className="absolute left-[-5px] top-1.5 w-[10px] h-[10px] rounded-full bg-slate-950 border-2 border-primary z-10" />
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="text-sm font-black text-white">{item.title}</h4>
                          <span className="text-[9px] font-bold text-muted-foreground uppercase">{item.time}</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* GIS Mapping */}
                <section>
                  <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                    <div className="w-6 h-[1px] bg-primary/30" />
                    GIS Location Matrix
                  </h3>
                  <div className="p-6 rounded-[32px] bg-white/[0.02] border border-white/5 space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-primary/10 rounded-xl">
                        <MapPin className="text-primary w-5 h-5" />
                      </div>
                      <p className="text-xs font-bold text-white/80 leading-relaxed">{selectedCustomer.gps_address}</p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="text-[9px] font-bold text-muted-foreground uppercase flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        LAT: {selectedCustomer.latitude}
                      </div>
                      <div className="text-[9px] font-bold text-muted-foreground uppercase flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        LNG: {selectedCustomer.longitude}
                      </div>
                      <button className="text-[9px] font-black text-primary uppercase flex items-center gap-1 hover:underline">
                        OPEN IN COMMAND MAP
                        <ArrowUpRight size={10} />
                      </button>
                    </div>
                  </div>
                </section>
              </div>

              {/* Action Bar */}
              <div className="p-8 bg-slate-950/80 backdrop-blur-xl border-t border-white/5 relative z-20 flex gap-4">
                <Button className="flex-1 h-14 bg-primary text-white font-black text-xs uppercase tracking-widest shadow-2xl shadow-primary/40 rounded-2xl transition-transform hover:scale-[1.02] active:scale-[0.98]">
                  OPERATIONAL OVERRIDE
                </Button>
                <Button variant="outline" className="w-14 h-14 rounded-2xl border-white/10 glass text-white hover:bg-white/5">
                  <Settings size={20} />
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </motion.div>
  );
}


