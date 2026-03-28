import { Request, Response } from 'express';
import { HoSoKhamBenhService } from '../services/HoSoKhamBenhService';

export class HoSoKhamBenhController {
  private service: HoSoKhamBenhService;

  constructor() {
    this.service = new HoSoKhamBenhService();
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
        res.status(404).json({ success: false, message: 'Hồ sơ khám bệnh không tồn tại' });
        return;
      }
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Có lỗi xảy ra' });
    }
  }

  async taoMoi(req: Request, res: Response): Promise<void> {
    try {
      const { MaLichHen, TrieuChung, ChanDoan, GhiChu } = req.body;

      if (!MaLichHen) {
        res.status(400).json({ success: false, message: 'Mã lịch hẹn là bắt buộc' });
        return;
      }

      const data = await this.service.taoMoi({
        MaLichHen,
        TrieuChung,
        ChanDoan,
        GhiChu,
      });

      res.status(201).json({ success: true, message: 'Tạo hồ sơ khám bệnh thành công', data });
    } catch (error) {
      res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Có lỗi xảy ra' });
    }
  }

  async capNhat(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data = await this.service.capNhat(parseInt(id), req.body);
      res.json({ success: true, message: 'Cập nhật hồ sơ khám bệnh thành công', data });
    } catch (error) {
      res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Có lỗi xảy ra' });
    }
  }

  async xoa(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.service.xoa(parseInt(id));
      res.json({ success: true, message: 'Xóa hồ sơ khám bệnh thành công' });
    } catch (error) {
      res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Có lỗi xảy ra' });
    }
  }
}
