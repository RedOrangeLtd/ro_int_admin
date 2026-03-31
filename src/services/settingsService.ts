import api from "./api";
import { SiteSettingsResponse } from "../types/settings";

export const settingsService = {
  getSettings: async (): Promise<SiteSettingsResponse> => {
    return await api.get<SiteSettingsResponse>("/admin/settings");
  },

  updateSettings: async (formData: FormData): Promise<SiteSettingsResponse> => {
    // We use POST to support multipart/form-data for file uploads
    return await api.post<SiteSettingsResponse>("/admin/settings", formData);
  },
};

export default settingsService;
