export interface Expert {
  id: number;
  name: string;
  photo: string | null;
  designation: string;
  email: string | null;
  order: number;
  is_active: boolean | number;
  created_at?: string;
  updated_at?: string;
}

export interface ExpertResponse {
  success: boolean;
  data?: Expert;
  message?: string;
}

export interface ExpertListResponse {
  success: boolean;
  data: Expert[];
  message?: string;
}
