import { api } from './api';
import {
  PortfolioListResponse,
  PortfolioDetailResponse,
  PortfolioUpdateResponse,
  PortfolioDeleteResponse,
  PortfolioProject
} from '../types/portfolio';

export const portfolioService = {
  getPortfolios: async (): Promise<PortfolioListResponse> => {
    return api.get<PortfolioListResponse>('/admin/portfolios');
  },

  getPortfolio: async (id: number | string): Promise<PortfolioDetailResponse> => {
    return api.get<PortfolioDetailResponse>(`/admin/portfolios/${id}`);
  },

  createPortfolio: async (data: FormData): Promise<PortfolioUpdateResponse> => {
    return api.post<PortfolioUpdateResponse>('/admin/portfolios', data);
  },

  updatePortfolio: async (id: number | string, data: FormData | Partial<PortfolioProject>): Promise<PortfolioUpdateResponse> => {
    return api.post<PortfolioUpdateResponse>(`/admin/portfolios/${id}`, data);
  },

  deletePortfolio: async (id: number | string): Promise<PortfolioDeleteResponse> => {
    return api.delete<PortfolioDeleteResponse>(`/admin/portfolios/${id}`);
  },
};

export default portfolioService;
