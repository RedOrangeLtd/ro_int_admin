import React, { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import { User, Role } from "../../types/user";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
  editData: User | null;
  roles: Role[];
}

export default function UserModal({
  isOpen,
  onClose,
  onSave,
  editData,
  roles,
}: UserModalProps) {
  const [formData, setFormData] = useState<Partial<User & { password?: string }>>({
    name: "",
    email: "",
    password: "",
    role_id: 2,
    is_active: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (editData) {
        setFormData({
          name: editData.name || "",
          email: editData.email || "",
          password: "",
          role_id: editData.role_id || 2,
          is_active: !!editData.is_active,
        });
      } else {
        setFormData({
          name: "",
          email: "",
          password: "",
          role_id: 2,
          is_active: true,
        });
      }
    }
  }, [editData, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload: any = {
        name: formData.name,
        email: formData.email,
        role_id: formData.role_id,
        is_active: formData.is_active ? 1 : 0,
      };

      if (formData.password) {
        payload.password = formData.password;
      }

      await onSave(payload);
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
          {editData ? "Edit User Account" : "Add New Admin User"}
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage user identity, roles, and platform access permissions.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 p-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Full Name
          </label>
          <Input
            type="text"
            value={formData.name || ""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. John Doe"
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
            placeholder="user@example.com"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
              {editData ? "Update Password (Optional)" : "Password"}
            </label>
            <Input
              type="password"
              value={formData.password || ""}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder={editData ? "Leave blank to keep" : "Min. 8 characters"}
              required={!editData}
              minLength={8}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Assigned Role
            </label>
            <div className="relative">
              <select
                value={formData.role_id}
                onChange={(e) => setFormData({ ...formData, role_id: parseInt(e.target.value) })}
                className="w-full appearance-none rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-4 py-2.5 text-sm text-gray-800 dark:text-white/90 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/20"
                required
              >
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name.charAt(0).toUpperCase() + role.name.slice(1)}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-1">
          <Checkbox
            label="Active Account Status"
            checked={!!formData.is_active}
            onChange={(checked: boolean) => setFormData({ ...formData, is_active: checked })}
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-white/[0.05]">
          <Button variant="outline" type="button" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : editData ? "Update Account" : "Create Account"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
