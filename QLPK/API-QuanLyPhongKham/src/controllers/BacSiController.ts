import { Request, Response } from 'express';
import { BacSiService } from '../services/BacSiService';

export class BacSiController {
  private service: BacSiService;

  constructor() {
    this.service = new BacSiService();
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
        res.status(404).json({ success: false, message: 'Bác sĩ không tồn tại' });
        return;
      }
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Có lỗi xảy ra' });
    }
  }

  async layTheoChuyenKhoa(req: Request, res: Response): Promise<void> {
    try {
      const { maChuyenKhoa } = req.params;
      const data = await this.service.layTheoChuyenKhoa(parseInt(maChuyenKhoa));
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Có lỗi xảy ra' });
    }
  }

  async taoMoi(req: Request, res: Response): Promise<void> {
    try {
      const { MaNguoiDung, MaChuyenKhoa, BangCap, SoNamKinhNghiem, MoTa } = req.body;

      if (!MaNguoiDung || !MaChuyenKhoa) {
        res.status(400).json({ success: false, message: 'Mã người dùng và mã chuyên khoa là bắt buộc' });
        return;
      }

      const data = await this.service.taoMoi({
        MaNguoiDung,
        MaChuyenKhoa,
        BangCap,
        SoNamKinhNghiem,
        MoTa,
      });

      res.status(201).json({ success: true, message: 'Tạo bác sĩ thành công', data });
    } catch (error) {
      res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Có lỗi xảy ra' });
    }
  }

  async capNhat(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data = await this.service.capNhat(parseInt(id), req.body);
      res.json({ success: true, message: 'Cập nhật bác sĩ thành công', data });
    } catch (error) {
      res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Có lỗi xảy ra' });
    }
  }

  async xoa(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.service.xoa(parseInt(id));
      res.json({ success: true, message: 'Xóa bác sĩ thành công' });
    } catch (error) {
      res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Có lỗi xảy ra' });
    }
  }

  async timKiem(req: Request, res: Response): Promise<void> {
    try {
      const { q } = req.query;
      if (!q || typeof q !== 'string' || !q.trim()) {
        res.status(400).json({ success: false, message: 'Tham số q bắt buộc để tìm kiếm bác sĩ' });
        return;
      }

      const data = await this.service.timKiem(q);
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Có lỗi xảy ra' });
    }
  }
}
