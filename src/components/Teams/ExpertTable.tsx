import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Expert } from "../../types/expert";
import Badge from "../ui/badge/Badge";

interface ExpertTableProps {
  experts: Expert[];
  onEdit: (expert: Expert) => void;
  onDelete: (id: number | string) => void;
}

export default function ExpertTable({
  experts,
  onEdit,
  onDelete,
}: ExpertTableProps) {
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
                Expert
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Designation
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Order
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
            {experts.length === 0 ? (
              <TableRow>
                <TableCell
                  className="px-5 py-4 text-center text-gray-500 dark:text-gray-400"
                  colSpan={5}
                >
                  No experts found.
                </TableCell>
              </TableRow>
            ) : (
              experts.map((expert) => (
                <TableRow key={expert.id} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.01] transition-colors">
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full border border-gray-200 shadow-sm bg-gray-50 dark:bg-gray-800">
                        {expert.photo ? (
                          <img
                            src={expert.photo}
                            alt={expert.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400">
                            <span className="text-xs font-semibold">{expert.name.charAt(0)}</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <span className="block font-semibold text-gray-800 text-theme-sm dark:text-white/90">
                          {expert.name}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {expert.email || "No email"}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start text-gray-700 text-theme-sm dark:text-gray-400">
                    {expert.designation}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start text-gray-700 text-theme-sm dark:text-gray-400">
                    <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 text-xs font-medium">
                      #{expert.order}
                    </span>
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start">
                    {expert.is_active ? (
                      <Badge variant="light" color="success">Active</Badge>
                    ) : (
                      <Badge variant="light" color="error">Inactive</Badge>
                    )}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-end">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEdit(expert)}
                        className="p-2 text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
                        title="Edit Expert"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => onDelete(expert.id)}
                        className="p-2 text-gray-400 hover:text-error-500 dark:hover:text-error-400 transition-colors"
                        title="Delete Expert"
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
