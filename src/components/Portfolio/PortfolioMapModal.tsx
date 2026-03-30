import React, { useState, useEffect } from "react";
import { Modal } from "../ui/modal";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import RichTextEditor from "../form/input/RichTextEditor";

export interface PortfolioMapData {
  id?: number | string;
  title: string;
  latitude: string;
  longitude: string;
  content: string;
}

interface PortfolioMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: PortfolioMapData) => void;
  editData?: PortfolioMapData | null;
}

export default function PortfolioMapModal({ isOpen, onClose, onSave, editData }: PortfolioMapModalProps) {
  const [title, setTitle] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editData) {
      setTitle(editData.title);
      setLatitude(editData.latitude);
      setLongitude(editData.longitude);
      setContent(editData.content);
    } else {
      setTitle("");
      setLatitude("");
      setLongitude("");
      setContent("");
    }
  }, [editData, isOpen]);

  const handleSave = () => {
    if (!title.trim() || !latitude.trim() || !longitude.trim()) return;
    
    onSave({
      id: editData?.id,
      title,
      latitude,
      longitude,
      content,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-full max-w-2xl p-6">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-5">
        {editData ? "Edit Map Data" : "Add Map Data"}
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Location Title
          </label>
          <Input 
            type="text" 
            placeholder="Enter location name" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Latitude
            </label>
            <Input 
              type="number"
               step={0.000001}
              placeholder="e.g. 40.7128" 
              value={latitude} 
              onChange={(e) => setLatitude(e.target.value)} 
            />
          </div>
          <div className="flex-1">
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Longitude
            </label>
            <Input 
              type="number"
              step={0.000001}
              placeholder="e.g. -74.0060" 
              value={longitude} 
              onChange={(e) => setLongitude(e.target.value)} 
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Location Description (Content)
          </label>
           <div className="bg-white dark:bg-gray-900 rounded-lg max-h-[250px] overflow-y-auto custom-scrollbar">
             <RichTextEditor 
               value={content} 
               onChange={setContent} 
               placeholder="Write additional details about this map location..."
             />
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Data
        </Button>
      </div>
    </Modal>
  );
}
