import apiClient from '../utils/ApiClient';
import { ApiResponse, BacSi } from '../types';

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

export const bacSiService = {
  // Lấy danh sách bác sĩ với phân trang (client-side pagination)
  getAllBacSi: async (page: number = 1, pageSize: number = 6): Promise<PaginationResponse<BacSi>> => {
    try {
      const response = await apiClient.get<ApiResponse<BacSi[]>>('/bac-si');
      
      if (response.data.success && response.data.data) {
        const allBacSis = response.data.data;
        const total = allBacSis.length;
        const totalPages = Math.ceil(total / pageSize);
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const items = allBacSis.slice(startIndex, endIndex);

        return {
          success: true,
          message: 'Lấy danh sách bác sĩ thành công',
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
        message: response.data.message || 'Không thể lấy danh sách bác sĩ',
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Lỗi khi lấy danh sách bác sĩ',
      };
    }
  },

  // Lấy danh sách bác sĩ không phân trang
  getAllBacSiList: async (): Promise<ApiResponse<BacSi[]>> => {
    const response = await apiClient.get<ApiResponse<BacSi[]>>('/bac-si');
    return response.data;
  },

  // Lấy bác sĩ theo ID
  getBacSiById: async (id: number): Promise<ApiResponse<BacSi>> => {
    const response = await apiClient.get<ApiResponse<BacSi>>(`/bac-si/${id}`);
    return response.data;
  },

  // Lấy danh sách bác sĩ theo chuyên khoa (client-side pagination)
  getBacSiByChuyenKhoa: async (maChuyenKhoa: number, page: number = 1, pageSize: number = 6): Promise<PaginationResponse<BacSi>> => {
    try {
      const response = await apiClient.get<ApiResponse<BacSi[]>>(`/bac-si`);
      
      if (response.data.success && response.data.data) {
        const filtered = response.data.data.filter(bs => bs.MaChuyenKhoa === maChuyenKhoa);
        const total = filtered.length;
        const totalPages = Math.ceil(total / pageSize);
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const items = filtered.slice(startIndex, endIndex);

        return {
          success: true,
          message: 'Lấy danh sách bác sĩ thành công',
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
        message: response.data.message || 'Không thể lấy danh sách bác sĩ',
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Lỗi khi lấy danh sách bác sĩ',
      };
    }
  },

  // Tạo bác sĩ (Admin)
  createBacSi: async (bacSi: Omit<BacSi, 'MaBacSi'>): Promise<ApiResponse<BacSi>> => {
    const response = await apiClient.post<ApiResponse<BacSi>>('/bac-si', bacSi);
    return response.data;
  },

  // Cập nhật bác sĩ (Admin)
  updateBacSi: async (id: number, bacSi: Partial<BacSi>): Promise<ApiResponse<BacSi>> => {
    const response = await apiClient.put<ApiResponse<BacSi>>(`/bac-si/${id}`, bacSi);
    return response.data;
  },

  // Xóa bác sĩ (Admin)
  deleteBacSi: async (id: number): Promise<ApiResponse<any>> => {
    const response = await apiClient.delete<ApiResponse<any>>(`/bac-si/${id}`);
    return response.data;
  },
};
