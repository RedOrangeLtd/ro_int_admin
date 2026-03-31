import { api } from './api';
import { AboutResponse, AboutUpdateResponse, AboutDeleteResponse, AboutRecord } from '../types/about';

export const aboutService = {
  getAbout: async (id: number | string): Promise<AboutResponse> => {
    return api.get<AboutResponse>(`/admin/abouts/${id}`);
  },

  updateAbout: async (id: number | string, data: Partial<AboutRecord>): Promise<AboutUpdateResponse> => {
    return api.post<AboutUpdateResponse>(`/admin/abouts/${id}`, data);
  },

  deleteAbout: async (id: number | string): Promise<AboutDeleteResponse> => {
    return api.delete<AboutDeleteResponse>(`/admin/abouts/${id}`);
  },
};

export default aboutService;
