import {
  BoxIconLine,
  GroupIcon,
  UserCircleIcon,
} from "../../icons";
import { DashboardStats } from "../../types/dashboard";

interface DashboardMetricsProps {
  stats: DashboardStats;
}

export default function DashboardMetrics({ stats }: DashboardMetricsProps) {
  const metrics = [
    {
      title: "Total Users",
      value: stats.total_users,
      icon: <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />,
      color: "blue",
    },
    {
      title: "Total Experts",
      value: stats.total_experts,
      icon: <UserCircleIcon className="text-gray-800 size-6 dark:text-white/90" />,
      color: "purple",
    },
    {
      title: "Total Portfolios",
      value: stats.total_portfolios,
      icon: <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />,
      color: "orange",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
      {metrics.map((metric, index) => (
        <div key={index} className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 transition-all hover:shadow-lg hover:shadow-gray-200/20 dark:hover:shadow-none">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            {metric.icon}
          </div>

          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {metric.title}
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                {metric.value.toLocaleString()}
              </h4>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
