import apiClient from '../utils/ApiClient';
import { ApiResponse, HoSoKhamBenh, HoSoBenhNhan, DonThuoc, ChiTietDonThuoc } from '../types';

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

// Service cho Hồ sơ khám bệnh
export const hoSoKhamBenhService = {
  // Lấy danh sách hồ sơ khám bệnh với phân trang
  getAllHoSoKhamBenh: async (page: number = 1, pageSize: number = 6): Promise<PaginationResponse<HoSoKhamBenh>> => {
    try {
      const response = await apiClient.get<ApiResponse<HoSoKhamBenh[]>>('/ho-so-kham-benh');
      
      if (response.data.success && response.data.data) {
        const allHoSo = response.data.data;
        const total = allHoSo.length;
        const totalPages = Math.ceil(total / pageSize);
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const items = allHoSo.slice(startIndex, endIndex);

        return {
          success: true,
          message: 'Lấy danh sách hồ sơ khám bệnh thành công',
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
        message: response.data.message || 'Không thể lấy danh sách hồ sơ khám bệnh',
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Lỗi khi lấy danh sách hồ sơ khám bệnh',
      };
    }
  },

  // Lấy danh sách hồ sơ khám bệnh không phân trang
  getAllHoSoKhamBenhList: async (): Promise<ApiResponse<HoSoKhamBenh[]>> => {
    const response = await apiClient.get<ApiResponse<HoSoKhamBenh[]>>('/ho-so-kham-benh');
    return response.data;
  },

  // Lấy hồ sơ khám bệnh theo ID
  getHoSoKhamBenhById: async (id: number): Promise<ApiResponse<HoSoKhamBenh>> => {
    const response = await apiClient.get<ApiResponse<HoSoKhamBenh>>(`/ho-so-kham-benh/${id}`);
    return response.data;
  },

  // Lấy hồ sơ khám bệnh theo lịch hẹn
  getHoSoKhamBenhByLichHen: async (maLichHen: number): Promise<ApiResponse<HoSoKhamBenh[]>> => {
    const response = await apiClient.get<ApiResponse<HoSoKhamBenh[]>>(`/ho-so-kham-benh/lich-hen/${maLichHen}`);
    return response.data;
  },

  // Tạo hồ sơ khám bệnh
  createHoSoKhamBenh: async (hoSo: Omit<HoSoKhamBenh, 'MaHoSoKham'>): Promise<ApiResponse<HoSoKhamBenh>> => {
    const response = await apiClient.post<ApiResponse<HoSoKhamBenh>>('/ho-so-kham-benh', hoSo);
    return response.data;
  },

  // Cập nhật hồ sơ khám bệnh
  updateHoSoKhamBenh: async (id: number, hoSo: Partial<HoSoKhamBenh>): Promise<ApiResponse<HoSoKhamBenh>> => {
    const response = await apiClient.put<ApiResponse<HoSoKhamBenh>>(`/ho-so-kham-benh/${id}`, hoSo);
    return response.data;
  },

  // Xóa hồ sơ khám bệnh
  deleteHoSoKhamBenh: async (id: number): Promise<ApiResponse<any>> => {
    const response = await apiClient.delete<ApiResponse<any>>(`/ho-so-kham-benh/${id}`);
    return response.data;
  },
};

// Service cho Hồ sơ bệnh nhân
export const hoSoBenhNhanService = {
  // Lấy danh sách hồ sơ bệnh nhân với phân trang
  getAllHoSoBenhNhan: async (page: number = 1, pageSize: number = 6): Promise<PaginationResponse<HoSoBenhNhan>> => {
    try {
      const response = await apiClient.get<ApiResponse<HoSoBenhNhan[]>>('/ho-so-benh-nhan');
      
      if (response.data.success && response.data.data) {
        const allHoSo = response.data.data;
        const total = allHoSo.length;
        const totalPages = Math.ceil(total / pageSize);
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const items = allHoSo.slice(startIndex, endIndex);

        return {
          success: true,
          message: 'Lấy danh sách hồ sơ bệnh nhân thành công',
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
        message: response.data.message || 'Không thể lấy danh sách hồ sơ bệnh nhân',
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Lỗi khi lấy danh sách hồ sơ bệnh nhân',
      };
    }
  },

  // Lấy danh sách hồ sơ bệnh nhân không phân trang
  getAllHoSoBenhNhanList: async (): Promise<ApiResponse<HoSoBenhNhan[]>> => {
    const response = await apiClient.get<ApiResponse<HoSoBenhNhan[]>>('/ho-so-benh-nhan');
    return response.data;
  },

  // Lấy hồ sơ bệnh nhân theo ID
  getHoSoBenhNhanById: async (id: number): Promise<ApiResponse<HoSoBenhNhan>> => {
    const response = await apiClient.get<ApiResponse<HoSoBenhNhan>>(`/ho-so-benh-nhan/${id}`);
    return response.data;
  },

  // Lấy hồ sơ bệnh nhân theo bệnh nhân
  getHoSoBenhNhanByBenhNhan: async (maBenhNhan: number): Promise<ApiResponse<HoSoBenhNhan[]>> => {
    const response = await apiClient.get<ApiResponse<HoSoBenhNhan[]>>(`/ho-so-benh-nhan/benh-nhan/${maBenhNhan}`);
    return response.data;
  },

  // Tạo hồ sơ bệnh nhân
  createHoSoBenhNhan: async (hoSo: Omit<HoSoBenhNhan, 'MaHoSo'>): Promise<ApiResponse<HoSoBenhNhan>> => {
    const response = await apiClient.post<ApiResponse<HoSoBenhNhan>>('/ho-so-benh-nhan', hoSo);
    return response.data;
  },

  // Cập nhật hồ sơ bệnh nhân
  updateHoSoBenhNhan: async (id: number, hoSo: Partial<HoSoBenhNhan>): Promise<ApiResponse<HoSoBenhNhan>> => {
    const response = await apiClient.put<ApiResponse<HoSoBenhNhan>>(`/ho-so-benh-nhan/${id}`, hoSo);
    return response.data;
  },

  // Xóa hồ sơ bệnh nhân
  deleteHoSoBenhNhan: async (id: number): Promise<ApiResponse<any>> => {
    const response = await apiClient.delete<ApiResponse<any>>(`/ho-so-benh-nhan/${id}`);
    return response.data;
  },
};

// Service cho Đơn thuốc
export const donThuocService = {
  // Lấy danh sách đơn thuốc với phân trang
  getAllDonThuoc: async (page: number = 1, pageSize: number = 6): Promise<PaginationResponse<DonThuoc>> => {
    try {
      const response = await apiClient.get<ApiResponse<DonThuoc[]>>('/don-thuoc');
      
      if (response.data.success && response.data.data) {
        const allDonThuoc = response.data.data;
        const total = allDonThuoc.length;
        const totalPages = Math.ceil(total / pageSize);
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const items = allDonThuoc.slice(startIndex, endIndex);

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

  // Lấy đơn thuốc theo hồ sơ khám bệnh
  getDonThuocByHoSoKham: async (maHoSoKham: number): Promise<ApiResponse<DonThuoc[]>> => {
    const response = await apiClient.get<ApiResponse<DonThuoc[]>>(`/don-thuoc/ho-so-kham/${maHoSoKham}`);
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

// Service cho Chi tiết đơn thuốc
export const chiTietDonThuocService = {
  // Lấy danh sách chi tiết đơn thuốc với phân trang
  getAllChiTietDonThuoc: async (page: number = 1, pageSize: number = 6): Promise<PaginationResponse<ChiTietDonThuoc>> => {
    try {
      const response = await apiClient.get<ApiResponse<ChiTietDonThuoc[]>>('/chi-tiet-don-thuoc');
      
      if (response.data.success && response.data.data) {
        const allChiTiet = response.data.data;
        const total = allChiTiet.length;
        const totalPages = Math.ceil(total / pageSize);
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const items = allChiTiet.slice(startIndex, endIndex);

        return {
          success: true,
          message: 'Lấy danh sách chi tiết đơn thuốc thành công',
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
        message: response.data.message || 'Không thể lấy danh sách chi tiết đơn thuốc',
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Lỗi khi lấy danh sách chi tiết đơn thuốc',
      };
    }
  },

  // Lấy danh sách chi tiết đơn thuốc không phân trang
  getAllChiTietDonThuocList: async (): Promise<ApiResponse<ChiTietDonThuoc[]>> => {
    const response = await apiClient.get<ApiResponse<ChiTietDonThuoc[]>>('/chi-tiet-don-thuoc');
    return response.data;
  },

  // Lấy chi tiết đơn thuốc theo ID
  getChiTietDonThuocById: async (id: number): Promise<ApiResponse<ChiTietDonThuoc>> => {
    const response = await apiClient.get<ApiResponse<ChiTietDonThuoc>>(`/chi-tiet-don-thuoc/${id}`);
    return response.data;
  },

  // Lấy chi tiết đơn thuốc theo đơn thuốc
  getChiTietDonThuocByDonThuoc: async (maDonThuoc: number): Promise<ApiResponse<ChiTietDonThuoc[]>> => {
    const response = await apiClient.get<ApiResponse<ChiTietDonThuoc[]>>(`/chi-tiet-don-thuoc/don-thuoc/${maDonThuoc}`);
    return response.data;
  },

  // Tạo chi tiết đơn thuốc
  createChiTietDonThuoc: async (chiTiet: Omit<ChiTietDonThuoc, 'MaChiTiet'>): Promise<ApiResponse<ChiTietDonThuoc>> => {
    const response = await apiClient.post<ApiResponse<ChiTietDonThuoc>>('/chi-tiet-don-thuoc', chiTiet);
    return response.data;
  },

  // Cập nhật chi tiết đơn thuốc
  updateChiTietDonThuoc: async (id: number, chiTiet: Partial<ChiTietDonThuoc>): Promise<ApiResponse<ChiTietDonThuoc>> => {
    const response = await apiClient.put<ApiResponse<ChiTietDonThuoc>>(`/chi-tiet-don-thuoc/${id}`, chiTiet);
    return response.data;
  },

  // Xóa chi tiết đơn thuốc
  deleteChiTietDonThuoc: async (id: number): Promise<ApiResponse<any>> => {
    const response = await apiClient.delete<ApiResponse<any>>(`/chi-tiet-don-thuoc/${id}`);
    return response.data;
  },
};