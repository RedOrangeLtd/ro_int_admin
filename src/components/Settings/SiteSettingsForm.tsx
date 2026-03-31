import React, { useState, useEffect } from "react";
import ComponentCard from "../common/ComponentCard";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import FileInput from "../form/input/FileInput";
import Button from "../ui/button/Button";
import { SiteSettings, SocialLink } from "../../types/settings";

interface SiteSettingsFormProps {
  initialData: SiteSettings | null;
  onSave: (formData: FormData) => Promise<void>;
  isLoading: boolean;
}

const TextArea = ({ value, onChange, placeholder, rows = 3 }: any) => (
  <textarea
    rows={rows}
    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 bg-transparent"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);

export default function SiteSettingsForm({
  initialData,
  onSave,
  isLoading,
}: SiteSettingsFormProps) {
  const [formData, setFormData] = useState<SiteSettings>({
    site_name: "",
    site_email: "",
    phone_number: "",
    address: "",
    site_logo: null,
    favicon: null,
    gtm_id: "",
    seo_title: "",
    seo_description: "",
    seo_keywords: "",
    footer_text: "",
    social_links: [],
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [faviconPreview, setFaviconPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        social_links: Array.isArray(initialData.social_links) ? initialData.social_links : [],
      });
      if (initialData.site_logo && typeof initialData.site_logo === "string") {
        setLogoPreview(initialData.site_logo);
      }
      if (initialData.favicon && typeof initialData.favicon === "string") {
        setFaviconPreview(initialData.favicon);
      }
    }
  }, [initialData]);

  const handleInputChange = (field: keyof SiteSettings, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "logo" | "favicon") => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "logo") {
          setLogoPreview(reader.result as string);
          setLogoFile(file);
        } else {
          setFaviconPreview(reader.result as string);
          setFaviconFile(file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addSocialLink = () => {
    setFormData((prev) => ({
      ...prev,
      social_links: [...prev.social_links, { platform: "", url: "" }],
    }));
  };

  const removeSocialLink = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      social_links: prev.social_links.filter((_, i) => i !== index),
    }));
  };

  const updateSocialLink = (index: number, field: keyof SocialLink, value: string) => {
    setFormData((prev) => {
      const updated = [...prev.social_links];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, social_links: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    
    // Append text fields
    data.append("site_name", formData.site_name);
    data.append("site_email", formData.site_email);
    data.append("phone_number", formData.phone_number);
    data.append("address", formData.address);
    data.append("gtm_id", formData.gtm_id);
    data.append("seo_title", formData.seo_title);
    data.append("seo_description", formData.seo_description);
    data.append("seo_keywords", formData.seo_keywords);
    data.append("footer_text", formData.footer_text);
    
    // Append files if selected
    if (logoFile) data.append("site_logo", logoFile);
    if (faviconFile) data.append("favicon", faviconFile);
    
    // Append social links as JSON string (or individual indexed items depending on backend expectations)
    // Most Laravel backends prefer indexed objects for nested arrays in multipart
    formData.social_links.forEach((link, index) => {
      data.append(`social_links[${index}][platform]`, link.platform);
      data.append(`social_links[${index}][url]`, link.url);
    });

    await onSave(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <ComponentCard title="General Configuration">
          <div className="space-y-4">
            <div>
              <Label>Site Name <span className="text-error-500">*</span></Label>
              <Input
                type="text"
                value={formData.site_name}
                onChange={(e) => handleInputChange("site_name", e.target.value)}
                placeholder="e.g. RedOrange"
                required
              />
            </div>
            <div>
              <Label>Site Email <span className="text-error-500">*</span></Label>
              <Input
                type="email"
                value={formData.site_email}
                onChange={(e) => handleInputChange("site_email", e.target.value)}
                placeholder="info@example.com"
                required
              />
            </div>
            <div>
              <Label>Phone Number</Label>
              <Input
                type="text"
                value={formData.phone_number}
                onChange={(e) => handleInputChange("phone_number", e.target.value)}
                placeholder="+31 (0) 35 624 33 33"
              />
            </div>
            <div>
              <Label>Physical Address</Label>
              <TextArea
                value={formData.address}
                onChange={(e: any) => handleInputChange("address", e.target.value)}
                placeholder="Full office address..."
              />
            </div>
          </div>
        </ComponentCard>

        {/* Assets Management */}
        <ComponentCard title="Branding Assets">
          <div className="space-y-6">
            <div>
              <Label>Site Logo</Label>
              <div className="flex items-center gap-4 py-2">
                <div className="w-16 h-16 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo Preview" className="h-full w-full object-contain" />
                  ) : (
                    <p className="text-[10px] text-gray-400">No Logo</p>
                  )}
                </div>
                <div className="flex-1">
                  <FileInput 
                    onChange={(e) => handleFileChange(e, "logo")}
                    hint="SVG, PNG, JPG (Max 5MB)"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <Label>Favicon</Label>
              <div className="flex items-center gap-4 py-2">
                <div className="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
                  {faviconPreview ? (
                    <img src={faviconPreview} alt="Favicon Preview" className="h-full w-full object-contain" />
                  ) : (
                    <p className="text-[8px] text-gray-400">No Icon</p>
                  )}
                </div>
                <div className="flex-1">
                  <FileInput 
                    onChange={(e) => handleFileChange(e, "favicon")}
                    hint="ICO, SVG, PNG (Max 2MB)"
                  />
                </div>
              </div>
            </div>
          </div>
        </ComponentCard>

        {/* SEO & Analytics Settings */}
        <ComponentCard title="SEO & Analytics">
          <div className="space-y-4">
            <div>
              <Label>SEO Meta Title</Label>
              <Input
                type="text"
                value={formData.seo_title}
                onChange={(e) => handleInputChange("seo_title", e.target.value)}
                placeholder="Primary page title..."
              />
            </div>
            <div>
              <Label>SEO Keywords</Label>
              <Input
                type="text"
                value={formData.seo_keywords}
                onChange={(e) => handleInputChange("seo_keywords", e.target.value)}
                placeholder="communication, social change..."
              />
            </div>
            <div>
              <Label>SEO Meta Description</Label>
              <TextArea
                value={formData.seo_description}
                onChange={(e: any) => handleInputChange("seo_description", e.target.value)}
                placeholder="High-level site overview..."
                rows={2}
              />
            </div>
            <div>
              <Label>Google Tag Manager (GTM) ID</Label>
              <Input
                type="text"
                value={formData.gtm_id}
                onChange={(e) => handleInputChange("gtm_id", e.target.value)}
                placeholder="GTM-XXXXXXX"
              />
            </div>
          </div>
        </ComponentCard>

        {/* Footer & Social Links */}
        <div className="space-y-6">
          <ComponentCard title="Social Connectivity">
            <div className="space-y-4">
              {formData.social_links.map((link, index) => (
                <div key={index} className="flex gap-3 items-center group">
                  <div className="flex-1 space-y-2">
                    <Input
                      type="text"
                      value={link.platform}
                      onChange={(e) => updateSocialLink(index, "platform", e.target.value)}
                      placeholder="Platform (e.g. Facebook)"
                    />
                    <Input
                      type="text"
                      value={link.url}
                      onChange={(e) => updateSocialLink(index, "url", e.target.value)}
                      placeholder="Direct URL"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSocialLink(index)}
                    className="p-2 text-gray-400 hover:text-error-500 opacity-0 group-hover:opacity-100 transition-all"
                    title="Remove Link"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
              <Button variant="outline" size="sm" type="button" onClick={addSocialLink} className="w-full">
                + Add Social Link
              </Button>
            </div>
          </ComponentCard>

          <ComponentCard title="Legals & Footnotes">
             <div>
              <Label>Global Footer Copyright Text</Label>
              <TextArea
                value={formData.footer_text}
                onChange={(e: any) => handleInputChange("footer_text", e.target.value)}
                placeholder="© 2026 RedOrange. All rights reserved."
                rows={2}
              />
            </div>
          </ComponentCard>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100 dark:border-white/[0.05]">
        <Button variant="primary" type="submit" disabled={isLoading} className="w-full lg:w-auto px-10">
          {isLoading ? "Saving Settings..." : "Save All Settings"}
        </Button>
      </div>
    </form>
  );
}
