import { DashboardPortfolio } from "../../types/dashboard";

interface LatestPortfoliosProps {
  portfolios: DashboardPortfolio[];
}

export default function LatestPortfolios({ portfolios }: LatestPortfoliosProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="font-semibold text-gray-800 text-title-xs dark:text-white/90">
          Latest Portfolios
        </h3>
        <span className="inline-flex rounded-full bg-orange-50 px-2 py-0.5 text-xs font-medium text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
          New Projects
        </span>
      </div>

      <div className="space-y-4">
        {portfolios.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">No recent portfolios found.</p>
        ) : (
          portfolios.map((portfolio) => (
            <div key={portfolio.id} className="flex items-center gap-3 border-b border-gray-100 pb-3 last:border-0 last:pb-0 dark:border-white/[0.05]">
              <div className="h-12 w-16 overflow-hidden rounded-lg bg-gray-100 last:border-0 last:pb-0 dark:bg-gray-800">
                <img
                  src={portfolio.project_image}
                  alt={portfolio.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="truncate text-sm font-medium text-gray-800 dark:text-white/90">
                  {portfolio.title}
                </h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs font-semibold uppercase text-brand-500 bg-brand-50/50 px-1 rounded dark:bg-brand-500/5 dark:text-brand-400">
                    {portfolio.region}
                  </span>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500">
                    {new Date(portfolio.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
