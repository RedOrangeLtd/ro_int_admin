export interface DashboardStats {
  total_users: number;
  total_experts: number;
  total_portfolios: number;
}

export interface DashboardUser {
  id: number;
  name: string;
  email: string;
  roles: Array<{ id: number; name: string }>;
  created_at: string;
}

export interface DashboardPortfolio {
  id: number;
  title: string;
  region: string;
  image: string;
  created_at: string;
}

export interface DashboardData {
  stats: DashboardStats;
  latest_users: DashboardUser[];
  latest_portfolios: DashboardPortfolio[];
}

export interface DashboardResponse {
  success: boolean;
  data: DashboardData;
}
