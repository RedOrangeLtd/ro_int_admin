export interface PortfolioProject {
  id: number;
  region: string;
  title: string;
  description: string | null;
  image: File | string | null;
  link: string | null;
  duration: string | null;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface PortfolioListResponse {
  success: boolean;
  data: PortfolioProject[];
}

export interface PortfolioDetailResponse {
  success: boolean;
  data: PortfolioProject;
}

export interface PortfolioUpdateResponse {
  success: boolean;
  message: string;
  data: PortfolioProject;
}

export interface PortfolioDeleteResponse {
  success: boolean;
  message: string;
}
