import apiClient from '../utils/ApiClient';
import { ApiResponse, NguoiDung } from '../types';

// Pagination Response Type
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

export const nguoiDungService = {
  // Lấy danh sách người dùng với phân trang (client-side pagination)
  getAllNguoiDung: async (page: number = 1, pageSize: number = 6): Promise<PaginationResponse<NguoiDung>> => {
    try {
      const response = await apiClient.get<ApiResponse<NguoiDung[]>>('/nguoi-dung');
      
      if (response.data.success && response.data.data) {
        const allUsers = response.data.data;
        const total = allUsers.length;
        const totalPages = Math.ceil(total / pageSize);
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const items = allUsers.slice(startIndex, endIndex);

        return {
          success: true,
          message: 'Lấy danh sách người dùng thành công',
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
        message: response.data.message || 'Không thể lấy danh sách người dùng',
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Lỗi khi lấy danh sách người dùng',
      };
    }
  },

  // Lấy danh sách tất cả người dùng (không phân trang)
  getAllNguoiDungList: async (): Promise<ApiResponse<NguoiDung[]>> => {
    const response = await apiClient.get<ApiResponse<NguoiDung[]>>('/nguoi-dung');
    return response.data;
  },

  // Lấy danh sách tên đăng nhập đã có
  getAllUsernames: async (): Promise<ApiResponse<{ MaNguoiDung: number; TenDangNhap: string }[]>> => {
    try {
      const response = await apiClient.get<ApiResponse<NguoiDung[]>>('/nguoi-dung');
      if (response.data.success && response.data.data) {
        const usernames = response.data.data.map(user => ({
          MaNguoiDung: user.MaNguoiDung,
          TenDangNhap: user.TenDangNhap,
        }));
        return {
          success: true,
          message: 'Lấy danh sách tên đăng nhập thành công',
          data: usernames,
        };
      }
      return {
        success: false,
        message: response.data.message || 'Lỗi khi lấy danh sách tên đăng nhập',
        data: [],
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Lỗi khi lấy danh sách tên đăng nhập',
        data: [],
      };
    }
  },

  // Lấy người dùng theo ID
  getNguoiDungById: async (id: number): Promise<ApiResponse<NguoiDung>> => {
    const response = await apiClient.get<ApiResponse<NguoiDung>>(`/nguoi-dung/${id}`);
    return response.data;
  },

  // Tạo người dùng mới
  createNguoiDung: async (nguoiDung: Omit<NguoiDung, 'MaNguoiDung'>): Promise<ApiResponse<NguoiDung>> => {
    const response = await apiClient.post<ApiResponse<NguoiDung>>('/nguoi-dung', nguoiDung);
    return response.data;
  },

  // Cập nhật người dùng
  updateNguoiDung: async (id: number, nguoiDung: Partial<NguoiDung>): Promise<ApiResponse<NguoiDung>> => {
    const response = await apiClient.put<ApiResponse<NguoiDung>>(`/nguoi-dung/${id}`, nguoiDung);
    return response.data;
  },

  // Xóa người dùng
  deleteNguoiDung: async (id: number): Promise<ApiResponse<any>> => {
    const response = await apiClient.delete<ApiResponse<any>>(`/nguoi-dung/${id}`);
    return response.data;
  },

  // Kiểm tra tên đăng nhập đã tồn tại
  checkUsernameExists: async (username: string): Promise<ApiResponse<boolean>> => {
    const response = await apiClient.get<ApiResponse<boolean>>(`/nguoi-dung/check/username/${username}`);
    return response.data;
  },
};
