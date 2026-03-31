import { useEffect, useState } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import ExpertTable from "../../components/Teams/ExpertTable";
import ExpertModal from "../../components/Teams/ExpertModal";
import { Expert } from "../../types/expert";
import { expertService } from "../../services/expertService";
import Swal from "sweetalert2";

export default function Teams() {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<Expert | null>(null);

  useEffect(() => {
    loadExperts();
  }, []);

  const getSwalConfig = (icon: "success" | "error" | "warning", title: string, text: string) => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    return {
      icon,
      title,
      text,
      confirmButtonColor: "#4F46E5",
      cancelButtonColor: "#EF4444",
      background: isDarkMode ? "#1f2937" : "#fff",
      color: isDarkMode ? "#fff" : "#000",
      heightAuto: false,
      scrollbarPadding: false,
    } as any;
  };

  const loadExperts = async () => {
    try {
      setIsLoading(true);
      const response = await expertService.getExperts();
      if (response.success) {
        setExperts(response.data);
      }
    } catch (error: any) {
      Swal.fire(getSwalConfig("error", "Error", error.message || "Failed to load experts"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModalForAdd = () => {
    setEditData(null);
    setIsModalOpen(true);
  };

  const handleOpenModalForEdit = (expert: Expert) => {
    setEditData(expert);
    setIsModalOpen(true);
  };

  const handleSaveExpert = async (formData: FormData) => {
    try {
      let response;
      if (editData) {
        response = await expertService.updateExpert(editData.id, formData);
      } else {
        response = await expertService.createExpert(formData);
      }

      if (response.success) {
        await Swal.fire(getSwalConfig("success", "Success!", response.message || `Expert ${editData ? "updated" : "created"} successfully`));
        loadExperts();
      }
    } catch (error: any) {
      Swal.fire(getSwalConfig("error", "Save Error", error.message || "Failed to save expert"));
    }
  };

  const handleDeleteExpert = async (id: number | string) => {
    const result = await Swal.fire({
      ...getSwalConfig("warning", "Are you sure?", "This team member will be permanently removed."),
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const response = await expertService.deleteExpert(id);
        if (response.success) {
          await Swal.fire(getSwalConfig("success", "Deleted!", response.message || "Expert removed successfully"));
          loadExperts();
        }
      } catch (error: any) {
        Swal.fire(getSwalConfig("error", "Delete Error", error.message || "Failed to delete expert"));
      }
    }
  };

  return (
    <>
      <PageMeta
        title="Teams Management | Admin Dashboard"
        description="Manage your professional team roster and experts"
      />
      <PageBreadcrumb pageTitle="Teams" />

      <div className="space-y-6">
        <ComponentCard title="Team Roster">
          <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-lg">
              Manage your global team of consultants and international development experts. 
              Add new experts with photos, designations, and specific display order.
            </p>
            <Button variant="primary" onClick={handleOpenModalForAdd}>
              + Add Expert
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <ExpertTable
              experts={experts}
              onEdit={handleOpenModalForEdit}
              onDelete={handleDeleteExpert}
            />
          )}
        </ComponentCard>
      </div>

      <ExpertModal
        key={editData?.id || "new"}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveExpert}
        editData={editData}
      />
    </>
  );
}
