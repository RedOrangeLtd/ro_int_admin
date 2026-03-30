import React, { useState, useEffect } from "react";
import { Modal } from "../ui/modal";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import FileInput from "../form/input/FileInput";

interface TeamMember {
  id?: number | string;
  name: string;
  image: string;
}

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (member: TeamMember) => void;
  editData?: TeamMember | null;
}

export default function TeamModal({ isOpen, onClose, onSave, editData }: TeamModalProps) {
  const [name, setName] = useState("");
  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    if (editData) {
      setName(editData.name);
      setImagePreview(editData.image);
    } else {
      setName("");
      setImagePreview("");
    }
  }, [editData, isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleSave = () => {
    if (!name.trim()) return;
    onSave({
      id: editData?.id,
      name,
      image: imagePreview || "/images/user/user-17.jpg", // fallback image
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-full max-w-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-5">
        {editData ? "Edit Team Member" : "Add Team Member"}
      </h3>
      
      <div className="space-y-5">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Image
          </label>
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 overflow-hidden rounded-full border border-gray-200 dark:border-gray-800 bg-gray-100 flex-shrink-0">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-gray-400 text-xs">No img</div>
              )}
            </div>
            <div className="flex-1">
               <FileInput onChange={handleFileChange} />
            </div>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Name
          </label>
          <Input 
            type="text" 
            placeholder="Enter member name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-3">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </div>
    </Modal>
  );
}
