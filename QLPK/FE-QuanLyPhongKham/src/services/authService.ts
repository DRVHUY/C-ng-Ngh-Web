import apiClient from '../utils/ApiClient';
import { NguoiDung, LoginResponse, ApiResponse } from '../types';

export const authService = {
  // Đăng nhập
  login: async (tenDangNhap: string, matKhau: string): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/nguoi-dung/dang-nhap', {
      TenDangNhap: tenDangNhap,
      MatKhau: matKhau,
    });
    return response.data;
  },

  // Lấy thông tin người dùng theo ID
  getUserById: async (id: number): Promise<ApiResponse<NguoiDung>> => {
    const response = await apiClient.get<ApiResponse<NguoiDung>>(`/nguoi-dung/${id}`);
    return response.data;
  },

  // Lấy danh sách vai trò của người dùng (cần API mới)
  getUserRoles: async (maNguoiDung: number) => {
    // TODO: Implement khi có API
    return [];
  },
};
