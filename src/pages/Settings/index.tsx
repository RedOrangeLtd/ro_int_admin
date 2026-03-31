import { useEffect, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import SiteSettingsForm from "../../components/Settings/SiteSettingsForm";
import { SiteSettings } from "../../types/settings";
import { settingsService } from "../../services/settingsService";
import Swal from "sweetalert2";

export default function Settings() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadSettings();
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

  const loadSettings = async () => {
    try {
      setIsPageLoading(true);
      const response = await settingsService.getSettings();
      if (response.success) {
        setSettings(response.data);
      }
    } catch (error: any) {
      Swal.fire(getSwalConfig("error", "Error", error.message || "Failed to load site settings"));
    } finally {
      setIsPageLoading(false);
    }
  };

  const handleSaveSettings = async (formData: FormData) => {
    try {
      setIsSaving(true);
      const response = await settingsService.updateSettings(formData);
      if (response.success) {
        setSettings(response.data);
        await Swal.fire(getSwalConfig("success", "Success!", response.message || "Site settings updated successfully"));
      }
    } catch (error: any) {
      Swal.fire(getSwalConfig("error", "Update Error", error.message || "Failed to update global settings"));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <PageMeta title="Global Settings | Admin Dashboard" description="Manage branding, SEO, and social metadata" />
      <PageBreadcrumb pageTitle="Site Settings" />

      <div className="space-y-6 pb-20">
        {isPageLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-600"></div>
          </div>
        ) : (
          <SiteSettingsForm 
            initialData={settings} 
            onSave={handleSaveSettings} 
            isLoading={isSaving} 
          />
        )}
      </div>
    </>
  );
}
