import { Request, Response } from 'express';
import { HoaDonService } from '../services/HoaDonService';

export class HoaDonController {
  private service: HoaDonService;

  constructor() {
    this.service = new HoaDonService();
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
        res.status(404).json({ success: false, message: 'Hóa đơn không tồn tại' });
        return;
      }
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Có lỗi xảy ra' });
    }
  }

  async taoMoi(req: Request, res: Response): Promise<void> {
    try {
      const { MaLichHen, TongTien, TrangThai } = req.body;

      if (!MaLichHen || !TongTien) {
        res.status(400).json({ success: false, message: 'Các trường bắt buộc không được để trống' });
        return;
      }

      const data = await this.service.taoMoi({
        MaLichHen,
        TongTien,
        TrangThai: TrangThai || 'Chưa thanh toán',
        NgayThanhToan: null,
      });

      res.status(201).json({ success: true, message: 'Tạo hóa đơn thành công', data });
    } catch (error) {
      res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Có lỗi xảy ra' });
    }
  }

  async capNhat(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data = await this.service.capNhat(parseInt(id), req.body);
      res.json({ success: true, message: 'Cập nhật hóa đơn thành công', data });
    } catch (error) {
      res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Có lỗi xảy ra' });
    }
  }

  async xoa(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.service.xoa(parseInt(id));
      res.json({ success: true, message: 'Xóa hóa đơn thành công' });
    } catch (error) {
      res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Có lỗi xảy ra' });
    }
  }
}
