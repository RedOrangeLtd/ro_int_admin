import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

interface TeamMember {
  id: number | string;
  name: string;
  image: string;
}

interface TeamListTableProps {
  members: TeamMember[];
  onEdit: (member: TeamMember) => void;
  onDelete: (id: number | string) => void;
}

export default function TeamListTable({ members, onEdit, onDelete }: TeamListTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Member
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400">
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {members.length === 0 ? (
              <TableRow>
                <TableCell className="px-5 py-4 text-center text-gray-500 dark:text-gray-400 col-span-2">
                  No members added yet.
                </TableCell>
              </TableRow>
            ) : (
              members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full border border-gray-200 shadow-sm">
                        <img
                          width={40}
                          height={40}
                          src={member.image}
                          alt={member.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {member.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-end">
                    <div className="flex items-center justify-end gap-2">
                       <button 
                         onClick={() => onEdit(member)}
                         className="text-brand-500 hover:text-brand-600 transition"
                       >
                         Edit
                       </button>
                       <button 
                         onClick={() => onDelete(member.id)}
                         className="text-error-500 hover:text-error-600 transition ml-3"
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
