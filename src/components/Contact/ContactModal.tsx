import React, { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import { Office } from "../../types/contact";
import { contactService } from "../../services/contactService";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
  editData: Office | null;
}

const TextArea = ({ value, onChange, placeholder }: any) => (
  <textarea
    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 min-h-[120px] bg-transparent"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);

export default function ContactModal({
  isOpen,
  onClose,
  onSave,
  editData,
}: ContactModalProps) {
  const [formData, setFormData] = useState<Partial<Office>>({
    office_name: "",
    address: "",
    email: "",
    is_active: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  useEffect(() => {
    const loadDetails = async (id: number | string) => {
      try {
        setIsLoadingDetails(true);
        const response = await contactService.getOffice(id);
        if (response.success && response.data) {
          const detail = response.data;
          setFormData({
            office_name: detail.office_name || "",
            address: detail.address || "",
            email: detail.email || "",
            is_active: !!detail.is_active,
          });
        }
      } catch (error) {
        console.error("Failed to load office details", error);
      } finally {
        setIsLoadingDetails(false);
      }
    };

    if (isOpen) {
      if (editData) {
        loadDetails(editData.id);
      } else {
        setFormData({
          office_name: "",
          address: "",
          email: "",
          is_active: true,
        });
      }
    }
  }, [editData, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSave(formData);
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
          {editData ? "Edit Office Location" : "Add Office Location"}
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your global office contact details and addresses.
        </p>
      </div>

      {isLoadingDetails ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-600"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Office Name
            </label>
            <Input
              type="text"
              value={formData.office_name || ""}
              onChange={(e) => setFormData({ ...formData, office_name: e.target.value })}
              placeholder="e.g. Netherlands Office"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Email Address
            </label>
            <Input
              type="email"
              value={formData.email || ""}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="info@example.com"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Full Address
            </label>
            <TextArea
              value={formData.address || ""}
              onChange={(e: any) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Enter full address (supports multi-line)..."
              required
            />
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
              {isSubmitting ? "Saving..." : editData ? "Update Office" : "Add Office"}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
