"use client";

import React from 'react';
import { DashboardModule } from '@/modules/dashboard/DashboardModule';
import { CustomersModule } from '@/modules/customers/CustomersModule';
import { DriversModule } from '@/modules/drivers/DriversModule';
import { VehiclesModule } from '@/modules/vehicles/VehiclesModule';
import { BillingModule } from '@/modules/billing/BillingModule';
import { AnalyticsModule } from '@/modules/analytics/AnalyticsModule';
import { MapModule } from '@/modules/map/MapModule';
import { ScheduleModule } from '@/modules/schedule/ScheduleModule';

interface ModuleHostProps {
  moduleId: string;
}

export function ModuleHost({ moduleId }: ModuleHostProps) {
  switch (moduleId) {
    case 'dashboard': return <DashboardModule />;
    case 'customers': return <CustomersModule />;
    case 'drivers': return <DriversModule />;
    case 'vehicles': return <VehiclesModule />;
    case 'billing': return <BillingModule />;
    case 'analytics': return <AnalyticsModule />;
    case 'map': return <MapModule />;
    case 'schedule': return <ScheduleModule />;
    default: return <DashboardModule />;
  }
}
