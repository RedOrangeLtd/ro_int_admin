import api from "./api";
import { UserListResponse, UserResponse, RoleListResponse } from "../types/user";

export const userService = {
  getRoles: async (): Promise<RoleListResponse> => {
    return await api.get<RoleListResponse>("/admin/roles");
  },

  getUsers: async (): Promise<UserListResponse> => {
    return await api.get<UserListResponse>("/admin/users");
  },

  createUser: async (data: any): Promise<UserResponse> => {
    return await api.post<UserResponse>("/admin/users", data);
  },

  updateUser: async (id: number | string, data: any): Promise<UserResponse> => {
    return await api.post<UserResponse>(`/admin/users/${id}`, { ...data, _method: "PUT" });
  },

  toggleUserStatus: async (id: number | string, is_active: number): Promise<UserResponse> => {
    return await api.post<UserResponse>(`/admin/users/${id}/status`, { is_active });
  },

  deleteUser: async (id: number | string): Promise<UserResponse> => {
    return await api.delete<UserResponse>(`/admin/users/${id}`);
  },
};
