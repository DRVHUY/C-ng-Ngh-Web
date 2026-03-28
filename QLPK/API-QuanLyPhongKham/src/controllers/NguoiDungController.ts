import { Request, Response } from 'express';
import { NguoiDungService } from '../services/NguoiDungService';

export class NguoiDungController {
  private service: NguoiDungService;

  constructor() {
    this.service = new NguoiDungService();
  }

  async layTatCa(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.service.layTatCa();
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Có lỗi xảy ra' });
    }
  }

  async layTheoId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data = await this.service.layTheoId(parseInt(id));
      if (!data) {
        res.status(404).json({ success: false, message: 'Người dùng không tồn tại' });
        return;
      }
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Có lỗi xảy ra' });
    }
  }

  async taoMoi(req: Request, res: Response): Promise<void> {
    try {
      const { TenDangNhap, MatKhau, HoTen, DienThoai, Email, TrangThai, VaiTro } = req.body;

      if (!TenDangNhap || !MatKhau) {
        res.status(400).json({ success: false, message: 'Tên đăng nhập và mật khẩu là bắt buộc' });
        return;
      }

      const data = await this.service.taoMoi({
        TenDangNhap,
        MatKhau,
        HoTen,
        DienThoai,
        Email,
        TrangThai: TrangThai ?? true,
        VaiTro,
      });

      res.status(201).json({ success: true, message: 'Tạo người dùng thành công', data });
    } catch (error) {
      res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Có lỗi xảy ra' });
    }
  }

  async capNhat(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data = await this.service.capNhat(parseInt(id), req.body);
      res.json({ success: true, message: 'Cập nhật người dùng thành công', data });
    } catch (error) {
      res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Có lỗi xảy ra' });
    }
  }

  async xoa(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.service.xoa(parseInt(id));
      res.json({ success: true, message: 'Xóa người dùng thành công' });
    } catch (error) {
      res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Có lỗi xảy ra' });
    }
  }

  async timKiem(req: Request, res: Response): Promise<void> {
    try {
      const { q } = req.query;
      if (!q || typeof q !== 'string' || !q.trim()) {
        res.status(400).json({ success: false, message: 'Tham số q bắt buộc để tìm kiếm' });
        return;
      }

      const data = await this.service.timKiem(q);
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Có lỗi xảy ra' });
    }
  }

  async dangNhap(req: Request, res: Response): Promise<void> {
    try {
      const { TenDangNhap, MatKhau } = req.body;

      if (!TenDangNhap || !MatKhau) {
        res.status(400).json({ success: false, message: 'Tên đăng nhập và mật khẩu là bắt buộc' });
        return;
      }

      const result = await this.service.kiemTraMatKhau(TenDangNhap, MatKhau);
      if (!result) {
        res.status(401).json({ success: false, message: 'Tên đăng nhập hoặc mật khẩu không chính xác' });
        return;
      }

      // result đã chứa token, user info và roles
      res.json({
        success: true,
        message: 'Đăng nhập thành công',
        data: result,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Có lỗi xảy ra' });
    }
  }
}
