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
  Info
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
  SheetDescription,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

type Customer = typeof CUSTOMERS_DATA[0];

export default function CustomersPage() {
  const [globalFilter, setGlobalFilter] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const columns: ColumnDef<Customer>[] = [
    {
      accessorKey: 'id',
      header: 'Customer ID',
      cell: (info) => <span className="font-mono text-xs font-semibold text-slate-500">{info.getValue() as string}</span>,
    },
    {
      accessorKey: 'client_name',
      header: 'Client Name',
      cell: (info) => <span className="font-bold text-slate-900">{info.getValue() as string}</span>,
    },
    {
      accessorKey: 'waste_collection_type',
      header: 'Waste Type',
      cell: (info) => (
        <Badge variant="outline" className="bg-blue-50/50 text-blue-600 border-blue-100 rounded-lg">
          {info.getValue() as string}
        </Badge>
      ),
    },
    {
      accessorKey: 'bin_qty',
      header: 'Bin Qty',
      cell: (info) => <span className="font-medium">{info.getValue() as number}</span>,
    },
    {
      accessorKey: 'pickup_request_frequency',
      header: 'Frequency',
      cell: (info) => (
        <div className="flex items-center gap-1.5 text-slate-600">
          <Calendar className="w-3.5 h-3.5" />
          <span className="text-sm">{info.getValue() as string}</span>
        </div>
      ),
    },
    {
      accessorKey: 'assigned_driver_name',
      header: 'Driver',
      cell: (info) => (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
            <User className="w-3 h-3 text-slate-500" />
          </div>
          <span className="text-sm">{info.getValue() as string}</span>
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (info) => {
        const status = info.getValue() as string;
        return (
          <Badge className={
            status === 'Active' 
              ? 'bg-green-100 text-green-700 border-none rounded-full px-3' 
              : 'bg-amber-100 text-amber-700 border-none rounded-full px-3'
          }>
            {status}
          </Badge>
        );
      },
    },
    {
      id: 'actions',
      cell: () => <MoreVertical className="w-4 h-4 text-slate-400" />,
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Customers</h1>
          <p className="text-slate-500 mt-1">Manage your service locations and clients.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search clients..." 
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-10 w-[300px] bg-white border-slate-200 rounded-xl focus:ring-blue-500/20"
            />
          </div>
          <Button variant="outline" className="rounded-xl border-slate-200">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50">
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id} className="border-b border-slate-100 hover:bg-transparent">
                  {headerGroup.headers.map(header => (
                    <TableHead key={header.id} className="text-slate-500 font-semibold text-xs uppercase tracking-wider py-4">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row, index) => (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleRowClick(row.original)}
                  className="group cursor-pointer hover:bg-slate-50/80 transition-colors border-b border-slate-50"
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} className="py-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Showing {table.getRowModel().rows.length} of {CUSTOMERS_DATA.length} customers
          </p>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-lg h-8 text-xs"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-lg h-8 text-xs"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Details Drawer */}
      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent className="sm:max-w-xl border-l-0 bg-slate-50/95 backdrop-blur-xl p-0">
          {selectedCustomer && (
            <div className="h-full flex flex-col">
              <div className="relative h-48 bg-slate-900 overflow-hidden">
                <img 
                  src={`https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1000&auto=format&fit=crop`} 
                  alt="Property" 
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <Badge className="mb-2 bg-blue-500 text-white border-none">{selectedCustomer.property_type}</Badge>
                  <h2 className="text-2xl font-bold text-white">{selectedCustomer.client_name}</h2>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
                {/* Section: Basic Info */}
                <section>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Info className="w-3.5 h-3.5" />
                    Overview
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-2xl border border-slate-200">
                      <p className="text-[10px] text-slate-500 uppercase font-bold">Contact Person</p>
                      <p className="font-semibold text-slate-900 mt-0.5">{selectedCustomer.contact_person_name}</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-slate-200">
                      <p className="text-[10px] text-slate-500 uppercase font-bold">Property Subtype</p>
                      <p className="font-semibold text-slate-900 mt-0.5">{selectedCustomer.property_subtype}</p>
                    </div>
                  </div>
                </section>

                {/* Section: Waste Details */}
                <section>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Recycle className="w-3.5 h-3.5" />
                    Service Details
                  </h3>
                  <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
                    <div className="p-4 flex items-center justify-between border-b border-slate-100">
                      <span className="text-sm text-slate-600">Collection Type</span>
                      <span className="font-bold text-blue-600">{selectedCustomer.waste_collection_type}</span>
                    </div>
                    <div className="p-4 flex items-center justify-between border-b border-slate-100">
                      <span className="text-sm text-slate-600">Bin Quantity</span>
                      <span className="font-bold">{selectedCustomer.bin_qty} x {selectedCustomer.provided_bin_sizes}</span>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                      <span className="text-sm text-slate-600">Frequency</span>
                      <span className="font-bold">{selectedCustomer.pickup_request_frequency}</span>
                    </div>
                  </div>
                </section>

                {/* Section: Logistics */}
                <section>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Truck className="w-3.5 h-3.5" />
                    Logistics
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-2xl border border-slate-200">
                      <p className="text-[10px] text-slate-500 uppercase font-bold">Driver</p>
                      <p className="font-semibold text-slate-900 mt-0.5">{selectedCustomer.assigned_driver_name}</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-slate-200">
                      <p className="text-[10px] text-slate-500 uppercase font-bold">Vehicle</p>
                      <p className="font-semibold text-slate-900 mt-0.5">{selectedCustomer.assigned_vehicle_no}</p>
                    </div>
                  </div>
                </section>

                {/* Section: Location */}
                <section>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5" />
                    Address
                  </h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200">
                    <p className="text-sm text-slate-700 leading-relaxed">{selectedCustomer.gps_address}</p>
                    <div className="mt-3 pt-3 border-t border-slate-50 flex items-center justify-between text-[11px] text-slate-400">
                      <span>LAT: {selectedCustomer.latitude}</span>
                      <span>LNG: {selectedCustomer.longitude}</span>
                    </div>
                  </div>
                </section>

                {/* Section: Remarks */}
                <section>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <ImageIcon className="w-3.5 h-3.5" />
                    Remarks
                  </h3>
                  <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50 italic text-sm text-slate-600">
                    "{selectedCustomer.remark}"
                  </div>
                </section>

                {/* Section: Dates */}
                <div className="pt-4 flex items-center justify-between text-[10px] text-slate-400 uppercase font-bold tracking-tighter">
                  <div className="flex flex-col">
                    <span>KYC DATE</span>
                    <span className="text-slate-900 mt-0.5">{selectedCustomer.kyc_date}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span>SERVICE START</span>
                    <span className="text-slate-900 mt-0.5">{selectedCustomer.service_date}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white border-t border-slate-200">
                <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20">
                  Edit Customer Details
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
