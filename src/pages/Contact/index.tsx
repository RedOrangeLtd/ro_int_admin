import { useEffect, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ContactForm from "../../components/Contact/ContactForm";
import ContactTable from "../../components/Contact/ContactTable";
import ContactModal from "../../components/Contact/ContactModal";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import { Office } from "../../types/contact";
import { contactService } from "../../services/contactService";
import Swal from "sweetalert2";

export default function Contact() {
  const [offices, setOffices] = useState<Office[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<Office | null>(null);

  useEffect(() => {
    loadOffices();
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

  const loadOffices = async () => {
    try {
      setIsLoading(true);
      const response = await contactService.getOffices();
      if (response.success) {
        setOffices(response.data);
      }
    } catch (error: any) {
      Swal.fire(getSwalConfig("error", "Error", error.message || "Failed to load offices"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModalForAdd = () => {
    setEditData(null);
    setIsModalOpen(true);
  };

  const handleOpenModalForEdit = (office: Office) => {
    setEditData(office);
    setIsModalOpen(true);
  };

  const handleSaveOffice = async (data: any) => {
    try {
      let response;
      if (editData) {
        response = await contactService.updateOffice(editData.id, data);
      } else {
        response = await contactService.createOffice(data);
      }

      if (response.success) {
        await Swal.fire(getSwalConfig("success", "Success!", response.message || `Office ${editData ? "updated" : "added"} successfully`));
        loadOffices();
      }
    } catch (error: any) {
      Swal.fire(getSwalConfig("error", "Save Error", error.message || "Failed to save office location"));
    }
  };

  const handleDeleteOffice = async (id: number | string) => {
    const result = await Swal.fire({
      ...getSwalConfig("warning", "Are you sure?", "This office location will be permanently removed."),
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const response = await contactService.deleteOffice(id);
        if (response.success) {
          await Swal.fire(getSwalConfig("success", "Deleted!", response.message || "Office removed successfully"));
          loadOffices();
        }
      } catch (error: any) {
        Swal.fire(getSwalConfig("error", "Delete Error", error.message || "Failed to delete office"));
      }
    }
  };

  return (
    <>
      <PageMeta title="Contact Management | Admin Dashboard" description="Manage office locations and contact details" />
      <PageBreadcrumb pageTitle="Contact Us" />

      <div className="space-y-6">
        {/* General Contact Info Setup (Banner, Background, Heading) */}
        <ContactForm />

        {/* Office Locations Management */}
        <ComponentCard title="Office Locations">
          <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-lg">
              Manage physical office addresses, contact emails, and regional availability.
              Supports multi-line addresses and active/inactive status toggling.
            </p>
            <Button variant="primary" size="sm" onClick={handleOpenModalForAdd}>
              + Add Office
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <ContactTable
              offices={offices}
              onEdit={handleOpenModalForEdit}
              onDelete={handleDeleteOffice}
            />
          )}
        </ComponentCard>
      </div>

      <ContactModal
        key={editData?.id || "new"}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveOffice}
        editData={editData}
      />
    </>
  );
}
