import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";
import TeamListTable from "../../components/Teams/TeamListTable";
import TeamModal from "../../components/Teams/TeamModal";

interface TeamMember {
  id: number | string;
  name: string;
  image: string;
}

export default function Teams() {
  const [heading, setHeading] = useState("Our Professional Team");
  const [isEditingHeading, setIsEditingHeading] = useState(false);
  
  const [members, setMembers] = useState<TeamMember[]>([
    { id: 1, name: "Lindsey Curtis", image: "/images/user/user-17.jpg" },
    { id: 2, name: "Kaiya George", image: "/images/user/user-18.jpg" }
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<TeamMember | null>(null);

  const handleOpenModalForAdd = () => {
    setEditData(null);
    setIsModalOpen(true);
  };

  const handleOpenModalForEdit = (member: TeamMember) => {
    setEditData(member);
    setIsModalOpen(true);
  };

  const handleSaveMember = (memberData: any) => {
    if (memberData.id) {
       setMembers(members.map(m => m.id === memberData.id ? memberData : m));
    } else {
       setMembers([...members, { ...memberData, id: Date.now() }]);
    }
  };

  const handleDeleteMember = (id: number | string) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      setMembers(members.filter((m) => m.id !== id));
    }
  };

  return (
    <>
      <PageMeta title="Teams Management | Admin Dashboard" description="Manage team members" />
      <PageBreadcrumb pageTitle="Teams" />
      
      <div className="space-y-6">
        {/* Section Heading Setup */}
        <ComponentCard title="Teams Section Heading">
          <div className="flex items-end gap-4">
            <div className="flex-1">
               <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Heading Content
              </label>
              {isEditingHeading ? (
                 <Input 
                   type="text" 
                   value={heading} 
                   onChange={(e) => setHeading(e.target.value)} 
                 />
              ) : (
                <div className="h-11 flex items-center px-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 text-gray-800 dark:text-white/90">
                  {heading}
                </div>
              )}
            </div>
            <div>
              {isEditingHeading ? (
                <Button variant="primary" onClick={() => setIsEditingHeading(false)}>Save</Button>
              ) : (
                <Button variant="outline" onClick={() => setIsEditingHeading(true)}>Edit</Button>
              )}
            </div>
          </div>
        </ComponentCard>

        {/* Members List Setup */}
        <ComponentCard title="Team Members">
          <div className="mb-4 flex justify-end">
            <Button variant="primary" onClick={handleOpenModalForAdd}>
              + Add Member
            </Button>
          </div>
          
          <TeamListTable 
            members={members} 
            onEdit={handleOpenModalForEdit} 
            onDelete={handleDeleteMember} 
          />
        </ComponentCard>
      </div>

      <TeamModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveMember}
        editData={editData}
      />
    </>
  );
}
