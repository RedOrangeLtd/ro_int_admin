import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { PortfolioMapData } from "./PortfolioMapModal";

interface PortfolioMapTableProps {
  mapData: PortfolioMapData[];
  onEdit: (data: PortfolioMapData) => void;
  onDelete: (id: number | string) => void;
}

export default function PortfolioMapTable({ mapData, onEdit, onDelete }: PortfolioMapTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Location Title
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Coordinates (Lat, Lng)
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400">
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {mapData.length === 0 ? (
              <TableRow>
                <TableCell className="px-5 py-4 text-center text-gray-500 dark:text-gray-400 col-span-3">
                  No map data added yet.
                </TableCell>
              </TableRow>
            ) : (
              mapData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                     <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {item.title}
                     </span>
                     {item.content && (
                       <span className="block text-gray-500 text-xs truncate max-w-[200px] mt-1" dangerouslySetInnerHTML={{ __html: item.content }} />
                     )}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start">
                     <div className="text-theme-sm text-gray-600 dark:text-gray-400 font-mono bg-gray-50 dark:bg-gray-800/50 inline-block px-2 py-1 rounded-md">
                        {item.latitude}, {item.longitude}
                     </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-end">
                    <div className="flex items-center justify-end gap-2">
                       <button 
                         onClick={() => onEdit(item)}
                         className="text-brand-500 hover:text-brand-600 transition text-sm font-medium"
                       >
                         Edit
                       </button>
                       <button 
                         onClick={() => onDelete(item.id!)}
                         className="text-error-500 hover:text-error-600 transition ml-3 text-sm font-medium"
                       >
                         Delete
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
