import React, { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import RichTextEditor from "../form/input/RichTextEditor";
import FileInput from "../form/input/FileInput";
import Checkbox from "../form/input/Checkbox";
import { PortfolioProject } from "../../types/portfolio";

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (formData: FormData) => Promise<void>;
  editData: PortfolioProject | null;
}

const REGIONS = ["ASIA", "Europe", "Africa", "America", "Oceania"];

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

  useEffect(() => {
    if (editData) {
      setFormData({
        region: editData.region || REGIONS[0],
        title: editData.title || "",
        description: editData.description || "",
        link: editData.link || "",
        duration: editData.duration || "",
        is_active: editData.is_active,
        image: editData.image,
      });
      setImagePreview(typeof editData.image === "string" ? editData.image : null);
    } else {
      setFormData({
        region: REGIONS[0],
        title: "",
        description: "",
        link: "",
        duration: "",
        is_active: true,
        image: null,
      });
      setImagePreview(null);
    }
    setSelectedFile(null);
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
      className="max-w-[700px]"
    >
      <div className="px-6 pt-6 border-b border-gray-100 dark:border-white/[0.05] pb-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90">
          {editData ? "Edit Project" : "Add New Project"}
        </h3>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Region
            </label>
            <select
              value={formData.region}
              onChange={(e) => setFormData({ ...formData, region: e.target.value })}
              className="w-full h-11 px-4 rounded-lg border border-gray-200 dark:border-white/[0.05] bg-transparent text-gray-800 dark:text-white/90 outline-none focus:border-brand-500"
              required
            >
              {REGIONS.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Title
            </label>
            <Input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Project Title"
              required
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Link (Optional)
          </label>
          <Input
            type="text"
            value={formData.link || ""}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            placeholder="https://example.com"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Duration (Optional)
          </label>
          <Input
            type="text"
            value={formData.duration || ""}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            placeholder="e.g. 2019 - Present"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Description
          </label>
          <div className="bg-white dark:bg-gray-900 rounded-lg">
            <RichTextEditor
              value={formData.description || ""}
              onChange={(val) => setFormData({ ...formData, description: val })}
              placeholder="Detailed project description..."
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Project Image
          </label>
          <div className="space-y-4">
            {imagePreview && (
              <div className="relative w-full max-w-[200px] h-32 rounded-lg overflow-hidden border border-gray-100 dark:border-white/[0.05]">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview(null);
                    setSelectedFile(null);
                    setFormData({ ...formData, image: null });
                  }}
                  className="absolute top-1 right-1 bg-white/80 text-error-500 rounded-full p-1 hover:bg-white"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
            <FileInput onChange={handleFileChange} />
          </div>
        </div>

        <div className="py-2">
          <Checkbox
            label="Active Status"
            checked={formData.is_active || false}
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
    </Modal>
  );
}
