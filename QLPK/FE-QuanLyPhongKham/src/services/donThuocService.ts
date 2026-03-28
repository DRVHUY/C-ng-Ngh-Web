import apiClient from '../utils/ApiClient';
import { ApiResponse } from '../types';

export interface DonThuoc {
  MaDonThuoc: number;
  MaLichHen: number;
  NgayCapDon: string;
  GhiChu?: string;
  TrangThai: string;
}

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

export const donThuocService = {
  // Lấy danh sách đơn thuốc với phân trang (client-side pagination)
  getAllDonThuoc: async (page: number = 1, pageSize: number = 6): Promise<PaginationResponse<DonThuoc>> => {
    try {
      const response = await apiClient.get<ApiResponse<DonThuoc[]>>('/don-thuoc');
      
      if (response.data.success && response.data.data) {
        const allDonThuocs = response.data.data;
        const total = allDonThuocs.length;
        const totalPages = Math.ceil(total / pageSize);
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const items = allDonThuocs.slice(startIndex, endIndex);

        return {
          success: true,
          message: 'Lấy danh sách đơn thuốc thành công',
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
        message: response.data.message || 'Không thể lấy danh sách đơn thuốc',
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Lỗi khi lấy danh sách đơn thuốc',
      };
    }
  },

  // Lấy danh sách đơn thuốc không phân trang
  getAllDonThuocList: async (): Promise<ApiResponse<DonThuoc[]>> => {
    const response = await apiClient.get<ApiResponse<DonThuoc[]>>('/don-thuoc');
    return response.data;
  },

  // Lấy đơn thuốc theo ID
  getDonThuocById: async (id: number): Promise<ApiResponse<DonThuoc>> => {
    const response = await apiClient.get<ApiResponse<DonThuoc>>(`/don-thuoc/${id}`);
    return response.data;
  },

  // Lấy đơn thuốc theo lịch hẹn
  getDonThuocByLichHen: async (maLichHen: number): Promise<ApiResponse<DonThuoc[]>> => {
    const response = await apiClient.get<ApiResponse<DonThuoc[]>>(`/don-thuoc/lich-hen/${maLichHen}`);
    return response.data;
  },

  // Tạo đơn thuốc
  createDonThuoc: async (donThuoc: Omit<DonThuoc, 'MaDonThuoc'>): Promise<ApiResponse<DonThuoc>> => {
    const response = await apiClient.post<ApiResponse<DonThuoc>>('/don-thuoc', donThuoc);
    return response.data;
  },

  // Cập nhật đơn thuốc
  updateDonThuoc: async (id: number, donThuoc: Partial<DonThuoc>): Promise<ApiResponse<DonThuoc>> => {
    const response = await apiClient.put<ApiResponse<DonThuoc>>(`/don-thuoc/${id}`, donThuoc);
    return response.data;
  },

  // Xóa đơn thuốc
  deleteDonThuoc: async (id: number): Promise<ApiResponse<any>> => {
    const response = await apiClient.delete<ApiResponse<any>>(`/don-thuoc/${id}`);
    return response.data;
  },
};
