export interface Office {
  id: number;
  office_name: string;
  address: string;
  email: string | null;
  is_active: boolean | number;
  created_at?: string;
  updated_at?: string;
}

export interface OfficeResponse {
  success: boolean;
  data?: Office;
  message?: string;
}

export interface OfficeListResponse {
  success: boolean;
  data: Office[];
  message?: string;
}
