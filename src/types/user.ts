export interface Role {
  id: number;
  name: string;
  guard_name: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role_id: number;
  is_active: boolean | number;
  roles?: Role[]; // If the API returns a list of assigned roles
  created_at?: string;
  updated_at?: string;
}

export interface RoleListResponse {
  success: boolean;
  data: Role[];
}

export interface UserListResponse {
  success: boolean;
  data: User[];
}

export interface UserResponse {
  success: boolean;
  data?: User;
  message?: string;
}
