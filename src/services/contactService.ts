import api from "./api";
import { OfficeListResponse, OfficeResponse } from "../types/contact";

export const contactService = {
  getOffices: async (): Promise<OfficeListResponse> => {
    return await api.get<OfficeListResponse>("/admin/contacts");
  },

  getOffice: async (id: number | string): Promise<OfficeResponse> => {
    return await api.get<OfficeResponse>(`/admin/contacts/${id}`);
  },

  createOffice: async (data: any): Promise<OfficeResponse> => {
    return await api.post<OfficeResponse>("/admin/contacts", data);
  },

  updateOffice: async (id: number | string, data: any): Promise<OfficeResponse> => {
    return await api.post<OfficeResponse>(`/admin/contacts/${id}`, { ...data, _method: 'PUT' });
  },

  deleteOffice: async (id: number | string): Promise<OfficeResponse> => {
    return await api.delete<OfficeResponse>(`/admin/contacts/${id}`);
  },
};
