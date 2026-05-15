"use client";

import React, { useEffect, useState } from "react";
import { 
  CommandDialog, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList, 
  CommandSeparator,
  CommandShortcut
} from "@/components/ui/command";
import { 
  LayoutDashboard, 
  Users, 
  Map as MapIcon, 
  BarChart3, 
  Settings,
  Plus,
  Search,
  Bell,
  Trash2,
  Truck
} from "lucide-react";
import { useRouter } from "next/navigation";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <>
      <button 
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-sm text-muted-foreground hover:bg-white/10 transition-all group"
      >
        <Search size={16} className="group-hover:text-primary transition-colors" />
        <span>Search...</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="bg-slate-950 border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <CommandInput placeholder="Type a command or search..." className="border-none focus:ring-0" />
          <CommandList className="max-h-[300px] no-scrollbar">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem onSelect={() => runCommand(() => router.push("/dashboard"))}>
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => router.push("/customers"))}>
                <Users className="mr-2 h-4 w-4" />
                <span>Customers</span>
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => router.push("/map"))}>
                <MapIcon className="mr-2 h-4 w-4" />
                <span>Live Map</span>
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => router.push("/analytics"))}>
                <BarChart3 className="mr-2 h-4 w-4" />
                <span>Analytics</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator className="bg-white/5" />
            <CommandGroup heading="Actions">
              <CommandItem>
                <Plus className="mr-2 h-4 w-4" />
                <span>New Collection Task</span>
                <CommandShortcut>⌘N</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Truck className="mr-2 h-4 w-4" />
                <span>Deploy Fleet</span>
                <CommandShortcut>⌘D</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => router.push("/settings"))}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </div>
      </CommandDialog>
    </>
  );
}
