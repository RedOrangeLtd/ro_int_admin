import React, { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import FileInput from "../form/input/FileInput";
import Checkbox from "../form/input/Checkbox";
import { Expert } from "../../types/expert";
import { expertService } from "../../services/expertService";

interface ExpertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (formData: FormData) => Promise<void>;
  editData: Expert | null;
}

export default function ExpertModal({
  isOpen,
  onClose,
  onSave,
  editData,
}: ExpertModalProps) {
  const [formData, setFormData] = useState<Partial<Expert>>({
    name: "",
    designation: "",
    email: "",
    order: 0,
    is_active: true,
    photo: null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  useEffect(() => {
    const loadDetails = async (id: number | string) => {
      try {
        setIsLoadingDetails(true);
        const response = await expertService.getExpert(id);
        if (response.success && response.data) {
          const detail = response.data;
          setFormData({
            name: detail.name || "",
            designation: detail.designation || "",
            email: detail.email || "",
            order: detail.order || 0,
            is_active: !!detail.is_active,
            photo: detail.photo,
          });
          setImagePreview(typeof detail.photo === "string" ? detail.photo : null);
        }
      } catch (error) {
        console.error("Failed to load expert details", error);
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
      data.append("name", formData.name || "");
      data.append("designation", formData.designation || "");
      data.append("email", formData.email || "");
      data.append("order", String(formData.order || 0));
      data.append("is_active", formData.is_active ? "1" : "0");

      if (selectedFile) {
        data.append("photo", selectedFile);
      } else if (typeof formData.photo === "string") {
        data.append("photo", formData.photo);
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
          {editData ? "Edit Expert" : "Add New Expert"}
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Fill in the details to {editData ? "update" : "create"} a team member roster entry.
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
                Name
              </label>
              <Input
                type="text"
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Full Name"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Designation
              </label>
              <Input
                type="text"
                value={formData.designation || ""}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                placeholder="Expert Title"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Email
              </label>
              <Input
                type="email"
                value={formData.email || ""}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Display Order
              </label>
              <Input
                type="number"
                value={formData.order || 0}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                placeholder="Sort order number"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Profile Photo
            </label>
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <FileInput onChange={handleFileChange} />
              </div>
              {imagePreview && (
                <div className="relative w-20 h-20 rounded-full overflow-hidden border border-gray-100 dark:border-white/[0.05] shadow-sm">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setSelectedFile(null);
                      setFormData({ ...formData, photo: null });
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
              label="Active Status"
              checked={!!formData.is_active}
              onChange={(checked: boolean) => setFormData({ ...formData, is_active: checked })}
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-white/[0.05]">
            <Button variant="outline" type="button" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : editData ? "Update Expert" : "Create Expert"}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
