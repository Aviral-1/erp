"use client";

import React, { useState } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Download, 
  Filter, 
  SlidersHorizontal,
  ChevronDown
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2 flex-1 min-w-[250px]">
          <div className="relative w-full max-w-sm group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
            <Input
              placeholder={`Search ${searchKey}...`}
              value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn(searchKey)?.setFilterValue(event.target.value)
              }
              className="pl-10 bg-white/5 border-white/10 focus:border-primary/50 transition-all rounded-2xl h-11 text-sm placeholder:text-muted-foreground/50"
            />
          </div>
          <Button variant="outline" size="icon" className="rounded-2xl shrink-0 h-11 w-11 glass border-white/10 hover:bg-white/5">
            <Filter size={18} className="text-muted-foreground" />
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-2xl h-11 gap-2 hidden md:flex glass border-white/10 hover:bg-white/5 text-xs font-bold uppercase tracking-wider">
                <SlidersHorizontal size={14} />
                Visibility
                <ChevronDown size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 glass border-white/10">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize text-xs font-medium"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" className="rounded-2xl h-11 gap-2 hidden sm:flex glass border-white/10 hover:bg-white/5 text-xs font-bold uppercase tracking-wider">
            <Download size={14} />
            CSV
          </Button>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden shadow-2xl backdrop-blur-md">
        <Table>
          <TableHeader className="bg-white/5">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-white/5 hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="h-14 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-white/5 hover:bg-white/[0.02] transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-6 py-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-40 text-center">
                  <div className="flex flex-col items-center justify-center gap-2 opacity-50">
                    <Search size={32} />
                    <p className="text-sm font-medium">No records found matching your criteria.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-2">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Showing <span className="text-primary">{table.getFilteredRowModel().rows.length}</span> active records
        </p>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="rounded-xl h-10 w-10 p-0 glass border-white/10 hover:bg-white/5 disabled:opacity-20"
          >
            <ChevronLeft size={18} />
          </Button>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center min-w-[2.5rem] h-10 px-3 bg-primary/20 text-primary border border-primary/20 rounded-xl text-xs font-bold">
              {table.getState().pagination.pageIndex + 1}
            </div>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">of</span>
            <div className="flex items-center justify-center min-w-[2.5rem] h-10 px-3 glass border-white/10 rounded-xl text-xs font-bold">
              {table.getPageCount()}
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="rounded-xl h-10 w-10 p-0 glass border-white/10 hover:bg-white/5 disabled:opacity-20"
          >
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}
