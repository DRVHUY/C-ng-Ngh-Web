import apiClient from '../utils/ApiClient';
import { ApiResponse, DanhMucThuoc, Thuoc, TonKho, PhieuNhapThuoc, ChiTietPhieuNhap } from '../types';

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

// Service cho Danh mục thuốc
export const danhMucThuocService = {
  // Lấy danh sách danh mục thuốc với phân trang
  getAllDanhMucThuoc: async (page: number = 1, pageSize: number = 6): Promise<PaginationResponse<DanhMucThuoc>> => {
    try {
      const response = await apiClient.get<ApiResponse<DanhMucThuoc[]>>('/danh-muc-thuoc');
      
      if (response.data.success && response.data.data) {
        const allDanhMuc = response.data.data;
        const total = allDanhMuc.length;
        const totalPages = Math.ceil(total / pageSize);
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const items = allDanhMuc.slice(startIndex, endIndex);

        return {
          success: true,
          message: 'Lấy danh sách danh mục thuốc thành công',
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
        message: response.data.message || 'Không thể lấy danh sách danh mục thuốc',
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Lỗi khi lấy danh sách danh mục thuốc',
      };
    }
  },

  // Lấy danh sách danh mục thuốc không phân trang
  getAllDanhMucThuocList: async (): Promise<ApiResponse<DanhMucThuoc[]>> => {
    const response = await apiClient.get<ApiResponse<DanhMucThuoc[]>>('/danh-muc-thuoc');
    return response.data;
  },

  // Lấy danh mục thuốc theo ID
  getDanhMucThuocById: async (id: number): Promise<ApiResponse<DanhMucThuoc>> => {
    const response = await apiClient.get<ApiResponse<DanhMucThuoc>>(`/danh-muc-thuoc/${id}`);
    return response.data;
  },

  // Tạo danh mục thuốc
  createDanhMucThuoc: async (danhMuc: Omit<DanhMucThuoc, 'MaDanhMuc'>): Promise<ApiResponse<DanhMucThuoc>> => {
    const response = await apiClient.post<ApiResponse<DanhMucThuoc>>('/danh-muc-thuoc', danhMuc);
    return response.data;
  },

  // Cập nhật danh mục thuốc
  updateDanhMucThuoc: async (id: number, danhMuc: Partial<DanhMucThuoc>): Promise<ApiResponse<DanhMucThuoc>> => {
    const response = await apiClient.put<ApiResponse<DanhMucThuoc>>(`/danh-muc-thuoc/${id}`, danhMuc);
    return response.data;
  },

  // Xóa danh mục thuốc
  deleteDanhMucThuoc: async (id: number): Promise<ApiResponse<any>> => {
    const response = await apiClient.delete<ApiResponse<any>>(`/danh-muc-thuoc/${id}`);
    return response.data;
  },
};

// Service cho Thuốc
export const thuocService = {
  // Lấy danh sách thuốc với phân trang
  getAllThuoc: async (page: number = 1, pageSize: number = 6): Promise<PaginationResponse<Thuoc>> => {
    try {
      const response = await apiClient.get<ApiResponse<Thuoc[]>>('/thuoc');
      
      if (response.data.success && response.data.data) {
        const allThuoc = response.data.data;
        const total = allThuoc.length;
        const totalPages = Math.ceil(total / pageSize);
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const items = allThuoc.slice(startIndex, endIndex);

        return {
          success: true,
          message: 'Lấy danh sách thuốc thành công',
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
        message: response.data.message || 'Không thể lấy danh sách thuốc',
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Lỗi khi lấy danh sách thuốc',
      };
    }
  },

  // Lấy danh sách thuốc không phân trang
  getAllThuocList: async (): Promise<ApiResponse<Thuoc[]>> => {
    const response = await apiClient.get<ApiResponse<Thuoc[]>>('/thuoc');
    return response.data;
  },

  // Lấy thuốc theo ID
  getThuocById: async (id: number): Promise<ApiResponse<Thuoc>> => {
    const response = await apiClient.get<ApiResponse<Thuoc>>(`/thuoc/${id}`);
    return response.data;
  },

  // Lấy thuốc theo danh mục
  getThuocByDanhMuc: async (maDanhMuc: number): Promise<ApiResponse<Thuoc[]>> => {
    const response = await apiClient.get<ApiResponse<Thuoc[]>>(`/thuoc/danh-muc/${maDanhMuc}`);
    return response.data;
  },

  // Tạo thuốc
  createThuoc: async (thuoc: Omit<Thuoc, 'MaThuoc'>): Promise<ApiResponse<Thuoc>> => {
    const response = await apiClient.post<ApiResponse<Thuoc>>('/thuoc', thuoc);
    return response.data;
  },

  // Cập nhật thuốc
  updateThuoc: async (id: number, thuoc: Partial<Thuoc>): Promise<ApiResponse<Thuoc>> => {
    const response = await apiClient.put<ApiResponse<Thuoc>>(`/thuoc/${id}`, thuoc);
    return response.data;
  },

  // Xóa thuốc
  deleteThuoc: async (id: number): Promise<ApiResponse<any>> => {
    const response = await apiClient.delete<ApiResponse<any>>(`/thuoc/${id}`);
    return response.data;
  },
};

// Service cho Tồn kho
export const tonKhoService = {
  // Lấy danh sách tồn kho với phân trang
  getAllTonKho: async (page: number = 1, pageSize: number = 6): Promise<PaginationResponse<TonKho>> => {
    try {
      const response = await apiClient.get<ApiResponse<TonKho[]>>('/ton-kho');
      
      if (response.data.success && response.data.data) {
        const allTonKho = response.data.data;
        const total = allTonKho.length;
        const totalPages = Math.ceil(total / pageSize);
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const items = allTonKho.slice(startIndex, endIndex);

        return {
          success: true,
          message: 'Lấy danh sách tồn kho thành công',
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
        message: response.data.message || 'Không thể lấy danh sách tồn kho',
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Lỗi khi lấy danh sách tồn kho',
      };
    }
  },

  // Lấy danh sách tồn kho không phân trang
  getAllTonKhoList: async (): Promise<ApiResponse<TonKho[]>> => {
    const response = await apiClient.get<ApiResponse<TonKho[]>>('/ton-kho');
    return response.data;
  },

  // Lấy tồn kho theo ID
  getTonKhoById: async (id: number): Promise<ApiResponse<TonKho>> => {
    const response = await apiClient.get<ApiResponse<TonKho>>(`/ton-kho/${id}`);
    return response.data;
  },

  // Lấy tồn kho theo thuốc
  getTonKhoByThuoc: async (maThuoc: number): Promise<ApiResponse<TonKho[]>> => {
    const response = await apiClient.get<ApiResponse<TonKho[]>>(`/ton-kho/thuoc/${maThuoc}`);
    return response.data;
  },

  // Cập nhật tồn kho
  updateTonKho: async (id: number, tonKho: Partial<TonKho>): Promise<ApiResponse<TonKho>> => {
    const response = await apiClient.put<ApiResponse<TonKho>>(`/ton-kho/${id}`, tonKho);
    return response.data;
  },
};

// Service cho Phiếu nhập thuốc
export const phieuNhapThuocService = {
  // Lấy danh sách phiếu nhập thuốc với phân trang
  getAllPhieuNhapThuoc: async (page: number = 1, pageSize: number = 6): Promise<PaginationResponse<PhieuNhapThuoc>> => {
    try {
      const response = await apiClient.get<ApiResponse<PhieuNhapThuoc[]>>('/phieu-nhap-thuoc');
      
      if (response.data.success && response.data.data) {
        const allPhieuNhap = response.data.data;
        const total = allPhieuNhap.length;
        const totalPages = Math.ceil(total / pageSize);
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const items = allPhieuNhap.slice(startIndex, endIndex);

        return {
          success: true,
          message: 'Lấy danh sách phiếu nhập thuốc thành công',
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
        message: response.data.message || 'Không thể lấy danh sách phiếu nhập thuốc',
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Lỗi khi lấy danh sách phiếu nhập thuốc',
      };
    }
  },

  // Lấy danh sách phiếu nhập thuốc không phân trang
  getAllPhieuNhapThuocList: async (): Promise<ApiResponse<PhieuNhapThuoc[]>> => {
    const response = await apiClient.get<ApiResponse<PhieuNhapThuoc[]>>('/phieu-nhap-thuoc');
    return response.data;
  },

  // Lấy phiếu nhập thuốc theo ID
  getPhieuNhapThuocById: async (id: number): Promise<ApiResponse<PhieuNhapThuoc>> => {
    const response = await apiClient.get<ApiResponse<PhieuNhapThuoc>>(`/phieu-nhap-thuoc/${id}`);
    return response.data;
  },

  // Tạo phiếu nhập thuốc
  createPhieuNhapThuoc: async (phieuNhap: Omit<PhieuNhapThuoc, 'MaPhieuNhap'>): Promise<ApiResponse<PhieuNhapThuoc>> => {
    const response = await apiClient.post<ApiResponse<PhieuNhapThuoc>>('/phieu-nhap-thuoc', phieuNhap);
    return response.data;
  },

  // Cập nhật phiếu nhập thuốc
  updatePhieuNhapThuoc: async (id: number, phieuNhap: Partial<PhieuNhapThuoc>): Promise<ApiResponse<PhieuNhapThuoc>> => {
    const response = await apiClient.put<ApiResponse<PhieuNhapThuoc>>(`/phieu-nhap-thuoc/${id}`, phieuNhap);
    return response.data;
  },

  // Xóa phiếu nhập thuốc
  deletePhieuNhapThuoc: async (id: number): Promise<ApiResponse<any>> => {
    const response = await apiClient.delete<ApiResponse<any>>(`/phieu-nhap-thuoc/${id}`);
    return response.data;
  },
};

// Service cho Chi tiết phiếu nhập
export const chiTietPhieuNhapService = {
  // Lấy danh sách chi tiết phiếu nhập với phân trang
  getAllChiTietPhieuNhap: async (page: number = 1, pageSize: number = 6): Promise<PaginationResponse<ChiTietPhieuNhap>> => {
    try {
      const response = await apiClient.get<ApiResponse<ChiTietPhieuNhap[]>>('/chi-tiet-phieu-nhap');
      
      if (response.data.success && response.data.data) {
        const allChiTiet = response.data.data;
        const total = allChiTiet.length;
        const totalPages = Math.ceil(total / pageSize);
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const items = allChiTiet.slice(startIndex, endIndex);

        return {
          success: true,
          message: 'Lấy danh sách chi tiết phiếu nhập thành công',
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
        message: response.data.message || 'Không thể lấy danh sách chi tiết phiếu nhập',
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Lỗi khi lấy danh sách chi tiết phiếu nhập',
      };
    }
  },

  // Lấy danh sách chi tiết phiếu nhập không phân trang
  getAllChiTietPhieuNhapList: async (): Promise<ApiResponse<ChiTietPhieuNhap[]>> => {
    const response = await apiClient.get<ApiResponse<ChiTietPhieuNhap[]>>('/chi-tiet-phieu-nhap');
    return response.data;
  },

  // Lấy chi tiết phiếu nhập theo ID
  getChiTietPhieuNhapById: async (id: number): Promise<ApiResponse<ChiTietPhieuNhap>> => {
    const response = await apiClient.get<ApiResponse<ChiTietPhieuNhap>>(`/chi-tiet-phieu-nhap/${id}`);
    return response.data;
  },

  // Lấy chi tiết phiếu nhập theo phiếu nhập
  getChiTietPhieuNhapByPhieuNhap: async (maPhieuNhap: number): Promise<ApiResponse<ChiTietPhieuNhap[]>> => {
    const response = await apiClient.get<ApiResponse<ChiTietPhieuNhap[]>>(`/chi-tiet-phieu-nhap/phieu-nhap/${maPhieuNhap}`);
    return response.data;
  },

  // Tạo chi tiết phiếu nhập
  createChiTietPhieuNhap: async (chiTiet: Omit<ChiTietPhieuNhap, 'MaChiTiet'>): Promise<ApiResponse<ChiTietPhieuNhap>> => {
    const response = await apiClient.post<ApiResponse<ChiTietPhieuNhap>>('/chi-tiet-phieu-nhap', chiTiet);
    return response.data;
  },

  // Cập nhật chi tiết phiếu nhập
  updateChiTietPhieuNhap: async (id: number, chiTiet: Partial<ChiTietPhieuNhap>): Promise<ApiResponse<ChiTietPhieuNhap>> => {
    const response = await apiClient.put<ApiResponse<ChiTietPhieuNhap>>(`/chi-tiet-phieu-nhap/${id}`, chiTiet);
    return response.data;
  },

  // Xóa chi tiết phiếu nhập
  deleteChiTietPhieuNhap: async (id: number): Promise<ApiResponse<any>> => {
    const response = await apiClient.delete<ApiResponse<any>>(`/chi-tiet-phieu-nhap/${id}`);
    return response.data;
  },
};