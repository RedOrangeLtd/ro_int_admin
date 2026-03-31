import { useEffect, useState } from "react";
import ComponentCard from "../common/ComponentCard";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import RichTextEditor from "../form/input/RichTextEditor";
import { aboutService } from "../../services/aboutService";
import { AboutRecord, ContentBlock } from "../../types/about";
import Alert from "../ui/alert/Alert";

export default function AboutForm() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<AboutRecord | null>(null);
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

  const handleSave = async () => {
    if (!data) return;
    try {
      setSaving(true);
      const response = await aboutService.updateAbout(data.id, data);
      if (response.success) {
        setNotification({
          variant: "success",
          title: "Success",
          message: response.message || "About Us updated successfully",
        });
        setIsEditing(false);
        setData(response.data);
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

  const handleContentBlockChange = (index: number, field: keyof ContentBlock, value: string) => {
    if (!data) return;
    const newBlocks = [...data.content_blocks];
    newBlocks[index] = { ...newBlocks[index], [field]: value };
    setData({ ...data, content_blocks: newBlocks });
  };

  const addContentBlock = () => {
    if (!data) return;
    const newBlock: ContentBlock = { type: "text", heading: "", body: "" };
    setData({ ...data, content_blocks: [...data.content_blocks, newBlock] });
  };

  const removeContentBlock = (index: number) => {
    if (!data) return;
    const newBlocks = data.content_blocks.filter((_, i) => i !== index);
    setData({ ...data, content_blocks: newBlocks });
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
            banner_content: { title: "", tagline: "" },
            content_blocks: [],
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
          <div className="md:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Hero Image Path
            </label>
            <Input
              type="text"
              value={data.hero_content.image || ""}
              onChange={(e) => setData({
                ...data,
                hero_content: { ...data.hero_content, image: e.target.value }
              })}
              disabled={!isEditing}
              placeholder="e.g. /img/About.png"
            />
          </div>
        </div>
      </ComponentCard>

      <ComponentCard title="Banner Section">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Banner Title
            </label>
            <Input
              type="text"
              value={data.banner_content.title || ""}
              onChange={(e) => setData({
                ...data,
                banner_content: { ...data.banner_content, title: e.target.value }
              })}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Banner Tagline
            </label>
            <Input
              type="text"
              value={data.banner_content.tagline || ""}
              onChange={(e) => setData({
                ...data,
                banner_content: { ...data.banner_content, tagline: e.target.value }
              })}
              disabled={!isEditing}
            />
          </div>
        </div>
      </ComponentCard>

      <ComponentCard
        title="Content Blocks"
        action={isEditing && (
          <Button size="sm" variant="outline" onClick={addContentBlock}>
            + Add Block
          </Button>
        )}
      >
        <div className="space-y-8">
          {data.content_blocks.map((block, index) => (
            <div key={index} className="relative p-4 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50/50 dark:bg-gray-800/20">
              {isEditing && (
                <button
                  onClick={() => removeContentBlock(index)}
                  className="absolute -top-3 -right-3 bg-white dark:bg-gray-900 text-error-500 rounded-full p-1 shadow-sm border border-gray-100 dark:border-gray-800 hover:bg-error-50"
                  title="Remove Block"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}

              <div className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                      Block Type
                    </label>
                    <Input
                      type="text"
                      value={block.type}
                      onChange={(e) => handleContentBlockChange(index, "type", e.target.value)}
                      disabled={!isEditing}
                      placeholder="e.g. text"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                      Block Heading
                    </label>
                    <Input
                      type="text"
                      value={block.heading}
                      onChange={(e) => handleContentBlockChange(index, "heading", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Block Body
                  </label>
                  <RichTextEditor
                    value={block.body}
                    onChange={(value) => handleContentBlockChange(index, "body", value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          ))}

          {data.content_blocks.length === 0 && (
            <div className="text-center py-6 text-gray-400 italic">
              No content blocks added yet.
            </div>
          )}
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
