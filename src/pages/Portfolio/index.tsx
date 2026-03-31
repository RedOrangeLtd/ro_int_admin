import { useEffect, useState } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import PortfolioTable from "../../components/Portfolio/PortfolioTable";
import PortfolioModal from "../../components/Portfolio/PortfolioModal";
import { PortfolioProject } from "../../types/portfolio";
import { portfolioService } from "../../services/portfolioService";
import Alert from "../../components/ui/alert/Alert";

export default function Portfolio() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<PortfolioProject | null>(null);
  const [notification, setNotification] = useState<{
    variant: "success" | "error";
    title: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setIsLoading(true);
      const response = await portfolioService.getPortfolios();
      if (response.success) {
        setProjects(response.data);
      }
    } catch (error: any) {
      setNotification({
        variant: "error",
        title: "Error",
        message: error.message || "Failed to load projects",
      });
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
        setNotification({
          variant: "success",
          title: "Success",
          message: response.message || `Project ${editData ? "updated" : "created"} successfully`,
        });
        loadProjects();
      }
    } catch (error: any) {
      setNotification({
        variant: "error",
        title: "Save Error",
        message: error.message || "Failed to save project",
      });
    }
  };

  const handleDeleteProject = async (id: number | string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      const response = await portfolioService.deletePortfolio(id);
      if (response.success) {
        setNotification({
          variant: "success",
          title: "Deleted",
          message: response.message || "Project removed successfully",
        });
        loadProjects();
      }
    } catch (error: any) {
      setNotification({
        variant: "error",
        title: "Delete Error",
        message: error.message || "Failed to delete project",
      });
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
        {notification && (
          <Alert
            variant={notification.variant}
            title={notification.title}
            message={notification.message}
          />
        )}

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
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProject}
        editData={editData}
      />
    </>
  );
}
