"use client";

import React from 'react';
import { 
  Bell, 
  Shield, 
  User, 
  Globe, 
  Appearance,
  CreditCard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const SETTINGS_GROUPS = [
  {
    title: 'Account',
    items: [
      { icon: User, label: 'Profile Information', desc: 'Update your personal details and photo' },
      { icon: Globe, label: 'Language & Region', desc: 'Set your preferred language and time zone' },
    ]
  },
  {
    title: 'Preferences',
    items: [
      { icon: Bell, label: 'Notifications', desc: 'Manage your alert preferences' },
      { icon: Shield, label: 'Security', desc: 'Password, 2FA and login activity' },
    ]
  }
];

export default function SettingsPage() {
  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Settings</h1>
        <p className="text-slate-500 mt-1">Manage your account settings and preferences.</p>
      </div>

      <div className="space-y-6">
        {SETTINGS_GROUPS.map((group, groupIdx) => (
          <div key={group.title} className="space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">{group.title}</h3>
            <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
              {group.items.map((item, idx) => (
                <motion.div 
                  key={item.label}
                  whileHover={{ x: 4 }}
                  className={`p-6 flex items-center justify-between cursor-pointer hover:bg-slate-50/50 transition-colors ${
                    idx !== group.items.length - 1 ? 'border-b border-slate-100' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{item.label}</p>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="rounded-xl text-slate-400">
                    Manage
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        <div className="pt-6">
          <Button variant="destructive" className="rounded-2xl px-8 h-12 font-bold shadow-lg shadow-rose-500/20">
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}
