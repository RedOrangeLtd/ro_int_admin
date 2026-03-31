import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { PortfolioProject } from "../../types/portfolio";
import Badge from "../ui/badge/Badge";

interface PortfolioTableProps {
  projects: PortfolioProject[];
  onEdit: (project: PortfolioProject) => void;
  onDelete: (id: number | string) => void;
}

export default function PortfolioTable({ projects, onEdit, onDelete }: PortfolioTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Project
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Region
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Status
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400">
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="px-5 py-10 text-center text-gray-500 dark:text-gray-400 font-medium">
                  No projects found.
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project) => (
                <TableRow key={project.id} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.01] transition-colors">
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-10 overflow-hidden rounded-lg border border-gray-100 dark:border-white/[0.05] shadow-sm bg-gray-50 dark:bg-gray-800">
                        {project.image ? (
                          <img
                            src={typeof project.image === 'string' ? project.image : URL.createObjectURL(project.image)}
                            alt={project.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400 font-medium">
                            No Img
                          </div>
                        )}
                      </div>
                      <div>
                        <span className="block font-semibold text-gray-800 text-theme-sm dark:text-white/90">
                          {project.title}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400 truncate max-w-[200px]">
                          {project.link || project.duration || "No link"}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start">
                    <Badge variant="light" color="primary" size="sm">
                      {project.region}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start">
                    {project.is_active ? (
                      <Badge variant="light" color="success" size="sm">Active</Badge>
                    ) : (
                      <Badge variant="light" color="warning" size="sm">Inactive</Badge>
                    )}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-end">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => onEdit(project)}
                        className="text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition"
                        title="Edit"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => onDelete(project.id)}
                        className="text-gray-400 hover:text-error-600 dark:hover:text-error-400 transition"
                        title="Delete"
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
