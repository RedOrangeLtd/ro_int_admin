import { useState } from "react";
import ComponentCard from "../common/ComponentCard";
import FileInput from "../form/input/FileInput";
import RichTextEditor from "../form/input/RichTextEditor";
import Button from "../ui/button/Button";

export default function HomeForm() {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(
    "Welcome to our main home page. Explore our comprehensive services and top-tier global integrations.",
  );

  const [bannerPreview, setBannerPreview] = useState<string>("");
  const [bgPreview, setBgPreview] = useState<string>("");
  const [logoPreview, setLogoPreview] = useState<string>("");

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setBannerPreview(URL.createObjectURL(file));
  };

  const handleBgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setBgPreview(URL.createObjectURL(file));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setLogoPreview(URL.createObjectURL(file));
  };

  const handleDeleteBanner = () => {
    if (window.confirm("Remove banner image?")) setBannerPreview("");
  };

  const handleDeleteBg = () => {
    if (window.confirm("Remove background image?")) setBgPreview("");
  };

  const handleDeleteLogo = () => {
    if (window.confirm("Remove logo?")) setLogoPreview("");
  };

  const handleSave = () => {
    setIsEditing(false);
    // Submit API payload
  };

  return (
    <ComponentCard
      title="Home Section Configuration"
      action={
        isEditing ? (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button size="sm" variant="primary" onClick={handleSave}>
              Save
            </Button>
          </div>
        ) : (
          <Button
            size="sm"
            variant="primary"
            onClick={() => setIsEditing(true)}
          >
            Edit Home Content
          </Button>
        )
      }
    >
      <div className="space-y-6">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Welcome Content Area
          </label>
          <div className="bg-white dark:bg-gray-900 rounded-lg">
            <RichTextEditor
              value={content}
              onChange={setContent}
              disabled={!isEditing}
              placeholder="Write the introduction rich text for the home page..."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Banner Upload */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Banner Image
            </label>
            <div className="mt-2 text-sm">
              {bannerPreview ? (
                <div className="relative inline-block w-full max-w-sm rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800">
                  <img
                    src={bannerPreview}
                    alt="Banner"
                    className="w-full h-auto object-cover max-h-[250px]"
                  />
                  {isEditing && (
                    <button
                      onClick={handleDeleteBanner}
                      className="absolute top-2 right-2 bg-white text-error-500 rounded-full p-2 shadow-md hover:bg-error-50"
                    >
                      Delete
                    </button>
                  )}
                </div>
              ) : (
                <div className="w-full max-w-sm h-32 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-400 bg-gray-50 dark:bg-gray-800/50">
                  No Banner Image
                </div>
              )}
              {isEditing && (
                <div className="mt-4 max-w-sm">
                  <FileInput onChange={handleBannerChange} />
                </div>
              )}
            </div>
          </div>

          {/* Background Upload */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Background Image
            </label>
            <div className="mt-2 text-sm">
              {bgPreview ? (
                <div className="relative inline-block w-full max-w-sm rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800">
                  <img
                    src={bgPreview}
                    alt="Background"
                    className="w-full h-auto object-cover max-h-[250px]"
                  />
                  {isEditing && (
                    <button
                      onClick={handleDeleteBg}
                      className="absolute top-2 right-2 bg-white text-error-500 rounded-full p-2 shadow-md hover:bg-error-50"
                    >
                      Delete
                    </button>
                  )}
                </div>
              ) : (
                <div className="w-full max-w-sm h-32 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-400 bg-gray-50 dark:bg-gray-800/50">
                  No Background Image
                </div>
              )}
              {isEditing && (
                <div className="mt-4 max-w-sm">
                  <FileInput onChange={handleBgChange} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Logo Upload */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Primary Content Logo
          </label>
          <div className="mt-2 text-sm flex gap-6 items-center flex-wrap sm:flex-nowrap">
            {logoPreview ? (
              <div className="h-24 w-24 relative rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex justify-center items-center p-2 shrink-0">
                <img
                  src={logoPreview}
                  alt="Logo"
                  className="w-full h-auto object-contain"
                />
              </div>
            ) : (
              <div className="h-24 w-24 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-400 bg-gray-50 dark:bg-gray-800/50 text-xs text-center p-2 shrink-0">
                No Logo
              </div>
            )}
            {isEditing && (
              <div className="flex-1 max-w-sm">
                <FileInput
                  className="h-10 py-1 flex items-center"
                  onChange={handleLogoChange}
                />
                {logoPreview && (
                  <button
                    onClick={handleDeleteLogo}
                    className="mt-3 text-sm text-error-500 hover:text-error-600 transition font-medium"
                  >
                    Remove Logo Entry
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}
