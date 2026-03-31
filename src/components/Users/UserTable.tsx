import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { User } from "../../types/user";
import Badge from "../ui/badge/Badge";

interface UserTableProps {
  users: User[];
  currentUserId?: number | string;
  onEdit: (user: User) => void;
  onDelete: (id: number | string) => void;
  onToggleStatus: (id: number | string, is_active: number) => void;
}

export default function UserTable({
  users,
  currentUserId,
  onEdit,
  onDelete,
  onToggleStatus,
}: UserTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                User
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Role
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {users.length === 0 ? (
              <TableRow>
                <TableCell
                  className="px-5 py-4 text-center text-gray-500 dark:text-gray-400"
                  colSpan={4}
                >
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.01] transition-colors">
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full border border-gray-200 bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 font-bold uppercase">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <span className="block font-semibold text-gray-800 text-theme-sm dark:text-white/90">
                          {user.name} {currentUserId === user.id && <span className="ml-1 text-[10px] text-brand-500 bg-brand-50 px-1 py-0.5 rounded border border-brand-100">(Me)</span>}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start">
                    <Badge variant="light" color={user.role_id === 1 ? "primary" : "info"} size="sm">
                      {user.role_id === 1 ? "Superadmin" : "Admin"}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start">
                    <button
                      onClick={() => onToggleStatus(user.id, user.is_active ? 0 : 1)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                        user.is_active
                          ? "bg-success-50 text-success-600 hover:bg-success-100 dark:bg-success-500/10 dark:text-success-400"
                          : "bg-error-50 text-error-600 hover:bg-error-100 dark:bg-error-500/10 dark:text-error-400"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${user.is_active ? "bg-success-500" : "bg-error-500"}`}></span>
                      {user.is_active ? "Active" : "Inactive"}
                    </button>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-end">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEdit(user)}
                        className="p-2 text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
                        title="Edit User"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => onDelete(user.id)}
                        disabled={currentUserId === user.id}
                        className={`p-2 transition-colors ${
                          currentUserId === user.id 
                            ? "text-gray-200 cursor-not-allowed" 
                            : "text-gray-400 hover:text-error-500 dark:hover:text-error-400"
                        }`}
                        title={currentUserId === user.id ? "Cannot delete self" : "Delete User"}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
