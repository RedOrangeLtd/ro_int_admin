import api from "./api";
import { DashboardResponse } from "../types/dashboard";

export const dashboardService = {
  getDashboardData: async (): Promise<DashboardResponse> => {
    return await api.get<DashboardResponse>("/admin/dashboard");
  },
};

export default dashboardService;
