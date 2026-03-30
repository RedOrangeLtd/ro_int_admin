import { useState } from "react";
import ComponentCard from "../common/ComponentCard";
import FileInput from "../form/input/FileInput";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";

// Assuming we have a textarea component, if not we build a simple one
import RichTextEditor from "../form/input/RichTextEditor";

export default function AboutForm() {
  const [isEditing, setIsEditing] = useState(false);
  const [heading, setHeading] = useState("About Our Company");
  const [subHeading, setSubHeading] = useState("Our Mission & Vision");
  const [content, setContent] = useState(
    "We are a leading tech company committed to giving you the best solutions...",
  );

  const [bannerPreview, setBannerPreview] = useState<string>("");
  const [bgPreview, setBgPreview] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    // Submit API call here
  };

  const handleDeleteBanner = () => {
    if (window.confirm("Remove banner image?")) {
      setBannerPreview("");
    }
  };

  const handleBgFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBgPreview(URL.createObjectURL(file));
    }
  };

  const handleDeleteBg = () => {
    if (window.confirm("Remove background image?")) {
      setBgPreview("");
    }
  };

  return (
    <ComponentCard
      title="About Section Content"
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
            Edit About Content
          </Button>
        )
      }
    >
      <div className="space-y-6">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Heading
          </label>
          <Input
            type="text"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            disabled={!isEditing}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Sub Heading
          </label>
          <Input
            type="text"
            value={subHeading}
            onChange={(e) => setSubHeading(e.target.value)}
            disabled={!isEditing}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Section Content
          </label>
          <div className="bg-white dark:bg-gray-900 rounded-lg">
            <RichTextEditor
              value={content}
              onChange={setContent}
              disabled={!isEditing}
              placeholder="Write your rich text content here..."
            />
          </div>
        </div>

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
                <FileInput onChange={handleFileChange} />
              </div>
            )}
          </div>
        </div>

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
                <FileInput onChange={handleBgFileChange} />
              </div>
            )}
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}
