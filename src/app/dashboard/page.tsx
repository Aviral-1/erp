"use client";

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardModule } from '@/modules/dashboard/DashboardModule';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <DashboardModule />
    </DashboardLayout>
  );
}
