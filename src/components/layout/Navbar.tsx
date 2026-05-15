"use client";

import React from 'react';
import { 
  Search, 
  Bell, 
  User, 
  Moon, 
  Sun, 
  Command,
  Maximize,
  Menu,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useAppStore } from '@/store/useAppStore';

export function Navbar() {
  const { theme, setTheme } = useAppStore();

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-40 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md w-full group hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
          <Input 
            placeholder="Search anything... (Ctrl + K)" 
            className="pl-10 bg-slate-100/50 border-transparent focus:bg-white focus:border-primary transition-all rounded-xl"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-1 text-[10px] font-medium text-slate-400 bg-white border border-slate-200 px-1.5 py-0.5 rounded shadow-sm">
            <Command size={10} />
            <span>K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="rounded-full relative">
          <Bell size={20} className="text-slate-600 dark:text-slate-400" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
        </Button>

        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? (
            <Sun size={20} className="text-slate-400" />
          ) : (
            <Moon size={20} className="text-slate-600" />
          )}
        </Button>

        <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-1"></div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10 border-2 border-slate-100 dark:border-slate-800 transition-transform hover:scale-105">
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mt-2" align="end">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Ashish Dangi</p>
                <p className="text-xs leading-none text-slate-500">ashish@wastewise.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-red-500 focus:text-red-500">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

const LogOut = ({ className, size }: { className?: string; size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);
