import apiClient from '../utils/ApiClient';
import { ApiResponse, BenhNhan, BenhNhanExt, LichHen, HoaDon } from '../types';

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

export const benhNhanService = {
  // Lấy danh sách bệnh nhân với phân trang (client-side pagination)
  getAllBenhNhan: async (page: number = 1, pageSize: number = 6): Promise<PaginationResponse<BenhNhan>> => {
    try {
      const response = await apiClient.get<ApiResponse<BenhNhan[]>>('/benh-nhan');
      
      if (response.data.success && response.data.data) {
        const allBenhNhans = response.data.data;
        const total = allBenhNhans.length;
        const totalPages = Math.ceil(total / pageSize);
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const items = allBenhNhans.slice(startIndex, endIndex);

        return {
          success: true,
          message: 'Lấy danh sách bệnh nhân thành công',
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
        message: response.data.message || 'Không thể lấy danh sách bệnh nhân',
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Lỗi khi lấy danh sách bệnh nhân',
      };
    }
  },

  // Lấy danh sách bệnh nhân không phân trang
  getAllBenhNhanList: async (): Promise<ApiResponse<BenhNhan[]>> => {
    const response = await apiClient.get<ApiResponse<BenhNhan[]>>('/benh-nhan');
    return response.data;
  },

  // Lấy bệnh nhân theo ID
  getBenhNhanById: async (id: number): Promise<ApiResponse<BenhNhanExt>> => {
    const response = await apiClient.get<ApiResponse<BenhNhanExt>>(`/benh-nhan/${id}`);
    return response.data;
  },

  // Tạo bệnh nhân
  createBenhNhan: async (benhNhan: Omit<BenhNhan, 'MaBenhNhan'>): Promise<ApiResponse<BenhNhanExt>> => {
    const response = await apiClient.post<ApiResponse<BenhNhanExt>>('/benh-nhan', benhNhan);
    return response.data;
  },

  // Cập nhật bệnh nhân
  updateBenhNhan: async (id: number, benhNhan: Partial<BenhNhan>): Promise<ApiResponse<BenhNhanExt>> => {
    const response = await apiClient.put<ApiResponse<BenhNhanExt>>(`/benh-nhan/${id}`, benhNhan);
    return response.data;
  },

  // Xóa bệnh nhân
  deleteBenhNhan: async (id: number): Promise<ApiResponse<any>> => {
    const response = await apiClient.delete<ApiResponse<any>>(`/benh-nhan/${id}`);
    return response.data;
  },
};

export const lichHenService = {
  // Lấy danh sách lịch hẹn với phân trang (client-side pagination)
  getAllLichHen: async (page: number = 1, pageSize: number = 6): Promise<PaginationResponse<LichHen>> => {
    try {
      const response = await apiClient.get<ApiResponse<LichHen[]>>('/lich-hen');
      
      if (response.data.success && response.data.data) {
        const allLichHens = response.data.data;
        const total = allLichHens.length;
        const totalPages = Math.ceil(total / pageSize);
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const items = allLichHens.slice(startIndex, endIndex);

        return {
          success: true,
          message: 'Lấy danh sách lịch hẹn thành công',
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
        message: response.data.message || 'Không thể lấy danh sách lịch hẹn',
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Lỗi khi lấy danh sách lịch hẹn',
      };
    }
  },

  // Lấy danh sách lịch hẹn không phân trang
  getAllLichHenList: async (): Promise<ApiResponse<LichHen[]>> => {
    const response = await apiClient.get<ApiResponse<LichHen[]>>('/lich-hen');
    return response.data;
  },

  // Lấy lịch hẹn theo bệnh nhân
  getLichHenByBenhNhan: async (maBenhNhan: number): Promise<ApiResponse<LichHen[]>> => {
    const response = await apiClient.get<ApiResponse<LichHen[]>>(`/lich-hen/benh-nhan/${maBenhNhan}`);
    return response.data;
  },

  // Lấy lịch hẹn theo ID
  getLichHenById: async (id: number): Promise<ApiResponse<LichHen>> => {
    const response = await apiClient.get<ApiResponse<LichHen>>(`/lich-hen/${id}`);
    return response.data;
  },

  // Đặt lịch hẹn
  bookAppointment: async (lichHen: Omit<LichHen, 'MaLichHen' | 'NgayDat' | 'TrangThai'>): Promise<ApiResponse<LichHen>> => {
    const response = await apiClient.post<ApiResponse<LichHen>>('/lich-hen', {
      ...lichHen,
      TrangThai: 'Chờ xác nhận',
    });
    return response.data;
  },

  // Tạo lịch hẹn (Admin)
  createLichHen: async (lichHen: Omit<LichHen, 'MaLichHen' | 'NgayDat'>): Promise<ApiResponse<LichHen>> => {
    const response = await apiClient.post<ApiResponse<LichHen>>('/lich-hen', lichHen);
    return response.data;
  },

  // Cập nhật lịch hẹn
  updateLichHen: async (id: number, lichHen: Partial<LichHen>): Promise<ApiResponse<LichHen>> => {
    const response = await apiClient.put<ApiResponse<LichHen>>(`/lich-hen/${id}`, lichHen);
    return response.data;
  },

  // Cập nhật trạng thái lịch hẹn
  updateLichHenStatus: async (id: number, trangThai: string): Promise<ApiResponse<LichHen>> => {
    const response = await apiClient.put<ApiResponse<LichHen>>(`/lich-hen/${id}`, {
      TrangThai: trangThai,
    });
    return response.data;
  },

  // Xóa lịch hẹn
  deleteLichHen: async (id: number): Promise<ApiResponse<any>> => {
    const response = await apiClient.delete<ApiResponse<any>>(`/lich-hen/${id}`);
    return response.data;
  },
};

export const hoaDonService = {
  // Lấy danh sách hóa đơn với phân trang (client-side pagination)
  getAllHoaDon: async (page: number = 1, pageSize: number = 6): Promise<PaginationResponse<HoaDon>> => {
    try {
      const response = await apiClient.get<ApiResponse<HoaDon[]>>('/hoa-don');
      
      if (response.data.success && response.data.data) {
        const allHoaDons = response.data.data;
        const total = allHoaDons.length;
        const totalPages = Math.ceil(total / pageSize);
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const items = allHoaDons.slice(startIndex, endIndex);

        return {
          success: true,
          message: 'Lấy danh sách hóa đơn thành công',
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
        message: response.data.message || 'Không thể lấy danh sách hóa đơn',
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Lỗi khi lấy danh sách hóa đơn',
      };
    }
  },

  // Lấy danh sách hóa đơn không phân trang
  getAllHoaDonList: async (): Promise<ApiResponse<HoaDon[]>> => {
    const response = await apiClient.get<ApiResponse<HoaDon[]>>('/hoa-don');
    return response.data;
  },

  // Lấy hóa đơn theo ID
  getHoaDonById: async (id: number): Promise<ApiResponse<HoaDon>> => {
    const response = await apiClient.get<ApiResponse<HoaDon>>(`/hoa-don/${id}`);
    return response.data;
  },

  // Tạo hóa đơn
  createHoaDon: async (hoaDon: Omit<HoaDon, 'MaHoaDon'>): Promise<ApiResponse<HoaDon>> => {
    const response = await apiClient.post<ApiResponse<HoaDon>>('/hoa-don', hoaDon);
    return response.data;
  },

  // Cập nhật hóa đơn
  updateHoaDon: async (id: number, hoaDon: Partial<HoaDon>): Promise<ApiResponse<HoaDon>> => {
    const response = await apiClient.put<ApiResponse<HoaDon>>(`/hoa-don/${id}`, hoaDon);
    return response.data;
  },

  // Xóa hóa đơn
  deleteHoaDon: async (id: number): Promise<ApiResponse<any>> => {
    const response = await apiClient.delete<ApiResponse<any>>(`/hoa-don/${id}`);
    return response.data;
  },
};
