import { Customer } from "@/types";

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: 24,
    job_id: "JOB2029",
    customer_id: "PRKYC00002",
    client_name: "Royal Heights Apartment",
    contact_person_name: "Ramesh Sharma",
    client_number: "9876543210",
    customer_type: "D2D",
    waste_collection_type: "Solid General Mixed Waste",
    recycling_type: "Cardboard, Plastic",
    provided_bin_sizes: "10 CBM",
    bin_qty: 10,
    provided_services: "Door to Door Collection",
    pickup_request_frequency: "Daily",
    assigned_driver_name: "Ashish Dangi",
    assigned_vehicle_no: "RJ19GB1234",
    latitude: 26.2389,
    longitude: 73.0243,
    gps_address: "Royal Heights Apartment, Shastri Nagar, Jodhpur",
    property_type: "Residential",
    property_subtype: "Apartment",
    status: 'Active',
    created_date: '2024-03-15'
  },
  {
    id: 25,
    job_id: "JOB2030",
    customer_id: "PRKYC00003",
    client_name: "Green Valley Society",
    contact_person_name: "Priya Singh",
    client_number: "9823456789",
    customer_type: "Commercial",
    waste_collection_type: "Organic Waste",
    recycling_type: "Paper, Glass",
    provided_bin_sizes: "5 CBM",
    bin_qty: 5,
    provided_services: "On-call Pickup",
    pickup_request_frequency: "Weekly",
    assigned_driver_name: "Vikram Kumar",
    assigned_vehicle_no: "RJ14CA5678",
    latitude: 26.2978,
    longitude: 73.0333,
    gps_address: "Green Valley, Pal Road, Jodhpur",
    property_type: "Residential",
    property_subtype: "Gated Community",
    status: 'Active',
    created_date: '2024-03-20'
  },
  {
    id: 26,
    job_id: "JOB2031",
    customer_id: "PRKYC00004",
    client_name: "Tech Park Hub",
    contact_person_name: "Amit Patel",
    client_number: "9988776655",
    customer_type: "Industrial",
    waste_collection_type: "Hazardous Waste",
    recycling_type: "Electronic Waste",
    provided_bin_sizes: "20 CBM",
    bin_qty: 2,
    provided_services: "Door to Door Collection",
    pickup_request_frequency: "Daily",
    assigned_driver_name: "Suresh Meena",
    assigned_vehicle_no: "RJ19GB9999",
    latitude: 26.2635,
    longitude: 73.0089,
    gps_address: "Industrial Area, Phase II, Jodhpur",
    property_type: "Commercial",
    property_subtype: "Office Complex",
    status: 'Pending',
    created_date: '2024-04-01'
  }
];

export const MOCK_STATS = {
  totalCustomers: 1250,
  activeDrivers: 45,
  vehiclesRunning: 38,
  wasteCollectionStatus: 85,
  revenue: 125000,
  recentActivities: [
    {
      id: '1',
      type: 'pickup',
      title: 'Pickup Completed',
      description: 'Royal Heights Apartment pickup finished by Ashish Dangi',
      timestamp: '10 mins ago',
      status: 'completed'
    },
    {
      id: '2',
      type: 'registration',
      title: 'New Customer',
      description: 'Tech Park Hub registered for Industrial waste collection',
      timestamp: '1 hour ago',
      status: 'completed'
    },
    {
      id: '3',
      type: 'pickup',
      title: 'Pickup Scheduled',
      description: 'Green Valley Society pickup scheduled for tomorrow 9 AM',
      timestamp: '2 hours ago',
      status: 'pending'
    }
  ]
};
