import { DashboardUser } from "../../types/dashboard";
import Badge from "../ui/badge/Badge";

interface LatestUsersProps {
  users: DashboardUser[];
}

export default function LatestUsers({ users }: LatestUsersProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="font-semibold text-gray-800 text-title-xs dark:text-white/90">
          Latest Users
        </h3>
        <span className="inline-flex rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
          Recent Joiners
        </span>
      </div>

      <div className="space-y-4">
        {users.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">No recent users found.</p>
        ) : (
          users.map((user) => (
            <div key={user.id} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0 dark:border-white/[0.05]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-sm font-bold uppercase text-gray-400 dark:bg-gray-800">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-800 dark:text-white/90">
                    {user.name}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user.email}
                  </p>
                </div>
              </div>
              <Badge variant="light" color={user.roles[0]?.id === 1 ? "primary" : "info"} size="sm">
                {user.roles[0]?.name || "N/A"}
              </Badge>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
