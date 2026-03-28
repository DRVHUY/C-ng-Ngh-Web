import { Request, Response } from 'express';
import { LichHenService } from '../services/LichHenService';

export class LichHenController {
  private service: LichHenService;

  constructor() {
    this.service = new LichHenService();
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
        res.status(404).json({ success: false, message: 'Lịch hẹn không tồn tại' });
        return;
      }
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Có lỗi xảy ra' });
    }
  }

  async layTheoBenhNhan(req: Request, res: Response): Promise<void> {
    try {
      const { maBenhNhan } = req.params;
      const data = await this.service.layTheoBenhNhan(parseInt(maBenhNhan));
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Có lỗi xảy ra' });
    }
  }

  async taoMoi(req: Request, res: Response): Promise<void> {
    try {
      const { MaBenhNhan, MaBacSi, MaLich, ThoiGianHen, TrangThai } = req.body;

      if (!MaBenhNhan || !MaBacSi || !MaLich) {
        res.status(400).json({ success: false, message: 'Các trường bắt buộc không được để trống' });
        return;
      }

      const data = await this.service.taoMoi({
        MaBenhNhan,
        MaBacSi,
        MaLich,
        ThoiGianHen,
        TrangThai: TrangThai || 'Chờ xác nhận',
      });

      res.status(201).json({ success: true, message: 'Tạo lịch hẹn thành công', data });
    } catch (error) {
      res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Có lỗi xảy ra' });
    }
  }

  async capNhat(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data = await this.service.capNhat(parseInt(id), req.body);
      res.json({ success: true, message: 'Cập nhật lịch hẹn thành công', data });
    } catch (error) {
      res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Có lỗi xảy ra' });
    }
  }

  async xoa(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.service.xoa(parseInt(id));
      res.json({ success: true, message: 'Xóa lịch hẹn thành công' });
    } catch (error) {
      res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Có lỗi xảy ra' });
    }
  }
}
