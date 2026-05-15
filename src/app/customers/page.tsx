"use client";

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CustomersModule } from '@/modules/customers/CustomersModule';

export default function CustomersPage() {
  return (
    <DashboardLayout>
      <CustomersModule />
    </DashboardLayout>
  );
}
