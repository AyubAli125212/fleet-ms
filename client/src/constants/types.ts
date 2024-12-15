export type User = {
  id?: string;
  name?: string;
  email: string;
  password: string;
};

export type Vehicles = {
  id?: string;
  name?: string;
  licensePlate?: string;
  brand?: string;
  model?: string;
  year?: number;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type QueryParams = {
  total?: number ;
  page?: number;
  limit?: number;
  sort?: string | null;
  search?: string | null;
  status?: string | null;
};

export type ManagerDashboardData = {
  counts: {
    totalVehicles: number;
    activeVehicles: number;
    inactiveVehicles: number;
  };
  chart: any;
  recentlyAddedVehicles: any[];
};
