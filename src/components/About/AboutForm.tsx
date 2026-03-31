import { useEffect, useState } from "react";
import ComponentCard from "../common/ComponentCard";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import RichTextEditor from "../form/input/RichTextEditor";
import FileInput from "../form/input/FileInput";
import { aboutService } from "../../services/aboutService";
import { AboutRecord } from "../../types/about";
import Alert from "../ui/alert/Alert";

export default function AboutForm() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<AboutRecord | null>(null);

  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
  const [heroImagePreview, setHeroImagePreview] = useState<string | null>(null);

  const [notification, setNotification] = useState<{
    variant: "success" | "error";
    title: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      setLoading(true);
      const response = await aboutService.getAbout(1);
      if (response.success) {
        setData(response.data);
        setHeroImagePreview(typeof response.data.hero_content.image === 'string' ? response.data.hero_content.image : null);
      }
    } catch (error: any) {
      setNotification({
        variant: "error",
        title: "Error",
        message: error.message || "Failed to fetch about data",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setHeroImageFile(file);
      setHeroImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!data) return;
    try {
      setSaving(true);

      const formData = new FormData();
      formData.append("title", data.title || "");
      formData.append("description[text]", data.description.text || "");
      formData.append("hero_content[heading]", data.hero_content.heading || "");
      formData.append("hero_content[subtext]", data.hero_content.subtext || "");
      formData.append("is_active", data.is_active ? "1" : "0");

      if (heroImageFile) {
        formData.append("hero_content[image]", heroImageFile);
      }

      const response = await aboutService.updateAbout(data.id, formData);
      if (response.success) {
        setNotification({
          variant: "success",
          title: "Success",
          message: response.message || "About Us updated successfully",
        });
        setIsEditing(false);
        setData(response.data);
        setHeroImageFile(null);
        if (typeof response.data.hero_content.image === 'string') {
          setHeroImagePreview(response.data.hero_content.image);
        }
      }
    } catch (error: any) {
      setNotification({
        variant: "error",
        title: "Error",
        message: error.message || "Failed to update about data",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!data) return;
    if (!window.confirm("Are you sure you want to delete this about record?"))
      return;

    try {
      setSaving(true);
      const response = await aboutService.deleteAbout(data.id);
      if (response.success) {
        setNotification({
          variant: "success",
          title: "Deleted",
          message: response.message || "About record deleted successfully",
        });
        setData(null);
      }
    } catch (error: any) {
      setNotification({
        variant: "error",
        title: "Error",
        message: error.message || "Failed to delete about record",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center p-10 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
        <p className="text-gray-500 dark:text-gray-400">No about record found.</p>
        <Button
          variant="primary"
          className="mt-4"
          onClick={() => setData({
            id: 1,
            title: "",
            description: { text: "" },
            hero_content: { heading: "", subtext: "", image: "" },
            is_active: true
          })}
        >
          Create New Record
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      {notification && (
        <Alert
          variant={notification.variant}
          title={notification.title}
          message={notification.message}
        />
      )}
      <ComponentCard
        title="General Information"
        action={
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button size="sm" variant="outline" onClick={() => setIsEditing(false)} disabled={saving}>
                  Cancel
                </Button>
                <Button size="sm" variant="primary" onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </>
            ) : (
              <>
                <Button size="sm" variant="outline" className="text-error-600" onClick={handleDelete}>
                  Delete
                </Button>
                <Button size="sm" variant="primary" onClick={() => setIsEditing(true)}>
                  Edit Content
                </Button>
              </>
            )}
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Page Title
            </label>
            <Input
              type="text"
              value={data.title || ""}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              disabled={!isEditing}
              placeholder="e.g. About RedOrange"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Description Text
            </label>
            <RichTextEditor
              value={data.description.text || ""}
              onChange={(value) => setData({ ...data, description: { text: value } })}
              disabled={!isEditing}
              placeholder="Main description paragraph..."
            />
          </div>
        </div>
      </ComponentCard>

      <ComponentCard title="Hero Section">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Hero Heading
              </label>
              <Input
                type="text"
                value={data.hero_content.heading || ""}
                onChange={(e) => setData({
                  ...data,
                  hero_content: { ...data.hero_content, heading: e.target.value }
                })}
                disabled={!isEditing}
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Hero Subtext
              </label>
              <Input
                type="text"
                value={data.hero_content.subtext || ""}
                onChange={(e) => setData({
                  ...data,
                  hero_content: { ...data.hero_content, subtext: e.target.value }
                })}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Hero Image
            </label>
            <div className="mt-2 text-sm">
              {heroImagePreview ? (
                <div className="relative inline-block w-full max-w-sm rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800">
                  <img
                    src={heroImagePreview}
                    alt="Hero"
                    className="w-full h-auto object-cover max-h-[300px]"
                  />
                  {isEditing && (
                    <button
                      onClick={() => {
                        setHeroImageFile(null);
                        setHeroImagePreview(null);
                      }}
                      className="absolute top-2 right-2 bg-white text-error-500 rounded-full p-2 shadow-md hover:bg-error-50"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ) : (
                <div className="w-full max-w-sm h-32 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-400 bg-gray-50 dark:bg-gray-800/50">
                  No Hero Image
                </div>
              )}

              {isEditing && (
                <div className="mt-4 max-w-sm">
                  <FileInput onChange={handleFileChange} />
                </div>
              )}
            </div>
          </div>
        </div>
      </ComponentCard>

      <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
          Status: {data.is_active ?
            <span className="text-success-600">Active</span> :
            <span className="text-warning-600">Inactive</span>
          }
        </span>
        {isEditing && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Active</span>
            <button
              onClick={() => setData({ ...data, is_active: !data.is_active })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${data.is_active ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
            >
              <span
                className={`${data.is_active ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
