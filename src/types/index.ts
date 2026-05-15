export interface Customer {
  id: number;
  job_id: string;
  customer_id: string;
  client_name: string;
  contact_person_name: string;
  client_number: string;
  customer_type: string;
  waste_collection_type: string;
  recycling_type: string;
  provided_bin_sizes: string;
  bin_qty: number;
  provided_services: string;
  pickup_request_frequency: string;
  assigned_driver_name: string;
  assigned_vehicle_no: string;
  latitude: number;
  longitude: number;
  gps_address: string;
  property_type: string;
  property_subtype: string;
  status?: 'Active' | 'Inactive' | 'Pending';
  created_date?: string;
}

export interface DashboardStats {
  totalCustomers: number;
  activeDrivers: number;
  vehiclesRunning: number;
  wasteCollectionStatus: number;
  revenue: number;
  recentActivities: Activity[];
}

export interface Activity {
  id: string;
  type: 'pickup' | 'registration' | 'payment';
  title: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'in-progress' | 'pending';
}
