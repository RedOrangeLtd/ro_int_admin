import { useEffect, useState } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import PortfolioTable from "../../components/Portfolio/PortfolioTable";
import PortfolioModal from "../../components/Portfolio/PortfolioModal";
import { PortfolioProject } from "../../types/portfolio";
import { portfolioService } from "../../services/portfolioService";
import Swal from "sweetalert2";

export default function Portfolio() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<PortfolioProject | null>(null);

  useEffect(() => {
    loadProjects();
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
    } as any;
  };

  const loadProjects = async () => {
    try {
      setIsLoading(true);
      const response = await portfolioService.getPortfolios();
      if (response.success) {
        setProjects(response.data);
      }
    } catch (error: any) {
      Swal.fire(getSwalConfig("error", "Error", error.message || "Failed to load projects"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModalForAdd = () => {
    setEditData(null);
    setIsModalOpen(true);
  };

  const handleOpenModalForEdit = (project: PortfolioProject) => {
    setEditData(project);
    setIsModalOpen(true);
  };

  const handleSaveProject = async (formData: FormData) => {
    try {
      let response;
      if (editData) {
        response = await portfolioService.updatePortfolio(editData.id, formData);
      } else {
        response = await portfolioService.createPortfolio(formData);
      }

      if (response.success) {
        await Swal.fire(getSwalConfig("success", "Success!", response.message || `Project ${editData ? "updated" : "created"} successfully`));
        loadProjects();
      }
    } catch (error: any) {
      Swal.fire(getSwalConfig("error", "Save Error", error.message || "Failed to save project"));
    }
  };

  const handleDeleteProject = async (id: number | string) => {
    const result = await Swal.fire({
      ...getSwalConfig("warning", "Are you sure?", "This project will be permanently removed."),
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const response = await portfolioService.deletePortfolio(id);
        if (response.success) {
          await Swal.fire(getSwalConfig("success", "Deleted!", response.message || "Project removed successfully"));
          loadProjects();
        }
      } catch (error: any) {
        Swal.fire(getSwalConfig("error", "Delete Error", error.message || "Failed to delete project"));
      }
    }
  };

  return (
    <>
      <PageMeta
        title="Portfolio Management | Admin Dashboard"
        description="Manage portfolio projects and consultancies"
      />
      <PageBreadcrumb pageTitle="Portfolio" />

      <div className="space-y-6">
        <ComponentCard title="Projects List">
          <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-lg">
              Manage international consultancy projects. Add new entries with images,
              descriptions, and regions to showcase our global reach.
            </p>
            <Button variant="primary" onClick={handleOpenModalForAdd}>
              + Add Project
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <PortfolioTable
              projects={projects}
              onEdit={handleOpenModalForEdit}
              onDelete={handleDeleteProject}
            />
          )}
        </ComponentCard>
      </div>

      <PortfolioModal
        key={editData?.id || "new"}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProject}
        editData={editData}
      />
    </>
  );
}
