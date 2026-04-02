import React, { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import RichTextEditor from "../form/input/RichTextEditor";
import FileInput from "../form/input/FileInput";
import Checkbox from "../form/input/Checkbox";
import { PortfolioProject } from "../../types/portfolio";
import { portfolioService } from "../../services/portfolioService";

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (formData: FormData) => Promise<void>;
  editData: PortfolioProject | null;
}

const REGIONS = ["ASIA", "Europe", "Africa"];

export default function PortfolioModal({
  isOpen,
  onClose,
  onSave,
  editData,
}: PortfolioModalProps) {
  const [formData, setFormData] = useState<Partial<PortfolioProject>>({
    region: REGIONS[0],
    title: "",
    description: "",
    link: "",
    duration: "",
    is_active: true,
    image: null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  useEffect(() => {
    const loadDetails = async (id: number | string) => {
      try {
        setIsLoadingDetails(true);
        const response = await portfolioService.getPortfolio(id);
        if (response.success && response.data) {
          const detail = response.data;
          setFormData({
            region: detail.region || REGIONS[0],
            title: detail.title || "",
            description: detail.description || "",
            link: detail.link || "",
            duration: detail.duration || "",
            is_active: !!detail.is_active,
            image: detail.image,
          });
          setImagePreview(typeof detail.image === "string" ? (detail.image as string) : null);
        }
      } catch (error) {
        console.error("Failed to load project details", error);
      } finally {
        setIsLoadingDetails(false);
      }
    };

    if (isOpen) {
      if (editData) {
        loadDetails(editData.id);
      }
    }
  }, [editData, isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data = new FormData();
      data.append("region", formData.region || "");
      data.append("title", formData.title || "");
      data.append("description", formData.description || "");
      data.append("link", formData.link || "");
      data.append("duration", formData.duration || "");
      data.append("is_active", formData.is_active ? "1" : "0");

      if (selectedFile) {
        data.append("image", selectedFile);
      } else if (typeof formData.image === "string") {
        data.append("image", formData.image);
      }

      await onSave(data);
      onClose();
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[540px]"
    >
      <div className="px-6 pt-6 border-b border-gray-100 dark:border-white/[0.05] pb-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90">
          {editData ? "Edit Project" : "Add New Project"}
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Fill in the details below to {editData ? "update" : "create"} entry.
        </p>
      </div>

      {isLoadingDetails ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-600"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Region
              </label>
              <select
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                className="w-full h-11 px-4 rounded-lg border border-gray-200 dark:border-white/[0.05] bg-transparent text-gray-800 dark:text-white/90 outline-none focus:border-brand-500 transition-colors"
                required
              >
                {REGIONS.map((region) => (
                  <option key={region} value={region} className="dark:bg-gray-800">
                    {region}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Title
              </label>
              <Input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter Title"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Link (Optional)
              </label>
              <Input
                type="text"
                value={formData.link || ""}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Duration (Optional)
              </label>
              <Input
                type="text"
                value={formData.duration || ""}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="2019 - Present"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Description
            </label>
            <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-white/[0.05]">
              <RichTextEditor
                value={formData.description || ""}
                onChange={(val) => setFormData({ ...formData, description: val })}
                placeholder="Detailed project description..."
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Project Image
            </label>
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <FileInput onChange={handleFileChange} />
              </div>
              {imagePreview && (
                <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-100 dark:border-white/[0.05] shadow-sm">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setSelectedFile(null);
                      setFormData({ ...formData, image: null });
                    }}
                    className="absolute top-0.5 right-0.5 bg-white/90 dark:bg-gray-800/90 text-error-500 rounded-full p-0.5 hover:bg-white dark:hover:bg-gray-700 shadow-sm transition-all"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="pt-1">
            <Checkbox
              label="Publicly Visible"
              checked={!!formData.is_active}
              onChange={(checked: boolean) => setFormData({ ...formData, is_active: checked })}
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-white/[0.05]">
            <Button variant="outline" type="button" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : editData ? "Update Project" : "Create Project"}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
