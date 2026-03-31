import { useEffect, useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import DashboardMetrics from "../../components/Dashboard/DashboardMetrics";
import LatestUsers from "../../components/Dashboard/LatestUsers";
import LatestPortfolios from "../../components/Dashboard/LatestPortfolios";
import { DashboardData } from "../../types/dashboard";
import { dashboardService } from "../../services/dashboardService";

export default function Home() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const response = await dashboardService.getDashboardData();
      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Dashboard data fetch error:", error);
    } finally {
      setIsPageLoading(false);
    }
  };

  const setIsPageLoading = (val: boolean) => setIsLoading(val);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
      </div>
    );
  }

  return (
    <>
      <PageMeta
        title="RedOrange Dashboard | RedOrange Admin Dashboard"
        description="This is RedOrange Dashboard page for RedOrange Admin Dashboard"
      />
      <div className="space-y-6">
        {data && <DashboardMetrics stats={data.stats} />}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {data && <LatestUsers users={data.latest_users} />}
          {data && <LatestPortfolios portfolios={data.latest_portfolios} />}
        </div>
      </div>
    </>
  );
}
