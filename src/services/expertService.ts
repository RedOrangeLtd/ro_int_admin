import api from "./api";
import { ExpertListResponse, ExpertResponse } from "../types/expert";

export const expertService = {
  getExperts: async (): Promise<ExpertListResponse> => {
    return await api.get<ExpertListResponse>("/admin/experts");
  },

  getExpert: async (id: number | string): Promise<ExpertResponse> => {
    return await api.get<ExpertResponse>(`/admin/experts/${id}`);
  },

  createExpert: async (formData: FormData): Promise<ExpertResponse> => {
    return await api.post<ExpertResponse>("/admin/experts", formData);
  },

  updateExpert: async (id: number | string, formData: FormData): Promise<ExpertResponse> => {
    // Laravel uses POST for multipart updates if we send _method: PUT,
    // but the user's API doc specifically says "POST /api/admin/experts/{id}"
    return await api.post<ExpertResponse>(`/admin/experts/${id}`, formData);
  },

  deleteExpert: async (id: number | string): Promise<ExpertResponse> => {
    return await api.delete<ExpertResponse>(`/admin/experts/${id}`);
  },
};
