import apiClient from '../utils/ApiClient';
import { ApiResponse, ChuyenKhoa } from '../types';

export interface PaginationResponse<T> {
  success: boolean;
  message: string;
  data?: {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

export const chuyenKhoaService = {
  // Lấy danh sách chuyên khoa với phân trang (client-side pagination)
  getAllChuyenKhoa: async (page: number = 1, pageSize: number = 6): Promise<PaginationResponse<ChuyenKhoa>> => {
    try {
      const response = await apiClient.get<ApiResponse<ChuyenKhoa[]>>('/chuyen-khoa');
      
      if (response.data.success && response.data.data) {
        const allChuyenKhoas = response.data.data;
        const total = allChuyenKhoas.length;
        const totalPages = Math.ceil(total / pageSize);
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const items = allChuyenKhoas.slice(startIndex, endIndex);

        return {
          success: true,
          message: 'Lấy danh sách chuyên khoa thành công',
          data: {
            items,
            total,
            page,
            pageSize,
            totalPages,
          },
        };
      }
      
      return {
        success: false,
        message: response.data.message || 'Không thể lấy danh sách chuyên khoa',
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Lỗi khi lấy danh sách chuyên khoa',
      };
    }
  },

  // Lấy danh sách chuyên khoa không phân trang
  getAllChuyenKhoaList: async (): Promise<ApiResponse<ChuyenKhoa[]>> => {
    const response = await apiClient.get<ApiResponse<ChuyenKhoa[]>>('/chuyen-khoa');
    return response.data;
  },

  // Lấy chuyên khoa theo ID
  getChuyenKhoaById: async (id: number): Promise<ApiResponse<ChuyenKhoa>> => {
    const response = await apiClient.get<ApiResponse<ChuyenKhoa>>(`/chuyen-khoa/${id}`);
    return response.data;
  },

  // Tạo chuyên khoa
  createChuyenKhoa: async (data: Omit<ChuyenKhoa, 'MaChuyenKhoa'>): Promise<ApiResponse<ChuyenKhoa>> => {
    const response = await apiClient.post<ApiResponse<ChuyenKhoa>>('/chuyen-khoa', data);
    return response.data;
  },

  // Cập nhật chuyên khoa
  updateChuyenKhoa: async (id: number, data: Partial<ChuyenKhoa>): Promise<ApiResponse<ChuyenKhoa>> => {
    const response = await apiClient.put<ApiResponse<ChuyenKhoa>>(`/chuyen-khoa/${id}`, data);
    return response.data;
  },

  // Xóa chuyên khoa
  deleteChuyenKhoa: async (id: number): Promise<ApiResponse<any>> => {
    const response = await apiClient.delete<ApiResponse<any>>(`/chuyen-khoa/${id}`);
    return response.data;
  },
};