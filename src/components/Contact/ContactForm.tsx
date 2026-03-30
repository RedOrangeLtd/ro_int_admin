import { useState } from "react";
import ComponentCard from "../common/ComponentCard";
import FileInput from "../form/input/FileInput";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";

const TextArea = ({ value, onChange, placeholder, disabled }: any) => (
  <textarea
    className={`w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700  dark:focus:border-brand-800 min-h-[100px] ${disabled ? "opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-800" : "bg-transparent"}`}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    disabled={disabled}
  />
);

export default function ContactForm() {
  const [isEditing, setIsEditing] = useState(false);
  const [heading, setHeading] = useState("Contact Us");
  const [subHeading, setSubHeading] = useState("We'd love to hear from you");
  const [bannerPreview, setBannerPreview] = useState<string>("");
  const [bgPreview, setBgPreview] = useState<string>("");
  const [addresses, setAddresses] = useState<string[]>([
    "123 Tech Lane, Silicon Valley",
  ]);
  const [logos, setLogos] = useState<string[]>(["/images/logo/logo-icon.svg"]);

  const handleBannerFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerPreview(URL.createObjectURL(file));
    }
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

  const handleAddressChange = (index: number, value: string) => {
    const newAddresses = [...addresses];
    newAddresses[index] = value;
    setAddresses(newAddresses);
  };

  const addAddressField = () => {
    setAddresses([...addresses, ""]);
  };

  const removeAddressField = (index: number) => {
    setAddresses(addresses.filter((_, i) => i !== index));
  };

  const handleLogoChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const newLogos = [...logos];
      newLogos[index] = URL.createObjectURL(file);
      setLogos(newLogos);
    }
  };

  const addLogoField = () => {
    setLogos([...logos, ""]);
  };

  const removeLogoField = (index: number) => {
    setLogos(logos.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Submit API call here
  };

  return (
    <ComponentCard
      title="Contact Section Content"
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
            Edit Contact Content
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
                <FileInput onChange={handleBannerFileChange} />
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

        {/* Addresses Section */}
        <div>
          <div className="mb-1.5 flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
              Addresses
            </label>
            {isEditing && (
              <button
                onClick={addAddressField}
                className="flex items-center gap-1 text-sm text-brand-500 hover:text-brand-600 font-medium"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Address
              </button>
            )}
          </div>

          <div className="space-y-4">
            {addresses.map((address, index) => (
              <div key={`address-${index}`} className="flex gap-3 items-start">
                <div className="flex-1">
                  <TextArea
                    value={address}
                    onChange={(e: any) =>
                      handleAddressChange(index, e.target.value)
                    }
                    disabled={!isEditing}
                    placeholder="Enter address..."
                  />
                </div>
                {isEditing && addresses.length > 1 && (
                  <button
                    onClick={() => removeAddressField(index)}
                    className="mt-2 p-2 text-error-500 hover:bg-error-50 dark:hover:bg-error-500/10 rounded-lg transition"
                    title="Remove Address"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Logos Section */}
        <div>
          <div className="mb-1.5 flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
              Company Logos
            </label>
            {isEditing && (
              <button
                onClick={addLogoField}
                className="flex items-center gap-1 text-sm text-brand-500 hover:text-brand-600 font-medium"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Logo
              </button>
            )}
          </div>

          <div className="space-y-4">
            {logos.map((logoPreview, index) => (
              <div
                key={`logo-${index}`}
                className="mt-2 text-sm flex gap-6 items-center flex-wrap sm:flex-nowrap"
              >
                {logoPreview ? (
                  <div className="h-20 w-20 relative rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex justify-center items-center p-2 shrink-0">
                    <img
                      src={logoPreview}
                      alt={`Logo ${index + 1}`}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                ) : (
                  <div className="h-20 w-20 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-400 bg-gray-50 dark:bg-gray-800/50 text-xs text-center p-1 shrink-0">
                    No logo
                  </div>
                )}

                {isEditing && (
                  <div className="flex-1 max-w-sm flex items-center gap-3">
                    <FileInput
                      className="h-10 py-1"
                      onChange={(e) => handleLogoChange(index, e)}
                    />
                    {logos.length > 1 && (
                      <button
                        onClick={() => removeLogoField(index)}
                        className="p-2 text-error-500 hover:bg-error-50 dark:hover:bg-error-500/10 rounded-lg transition"
                        title="Remove Logo"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}
