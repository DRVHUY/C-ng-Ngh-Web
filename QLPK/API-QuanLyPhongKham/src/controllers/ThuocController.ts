import { Request, Response } from 'express';
import { DanhMucThuocService, ThuocService, TonKhoService, PhieuNhapThuocService, ChiTietPhieuNhapService, ChiTietDonThuocService } from '../services/ThuocService';

export class DanhMucThuocController {
  private service = new DanhMucThuocService();

  async layTatCa(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.service.layTatCa();
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
    }
  }

  async layTheoId(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.service.layTheoId(parseInt(req.params.id));
      if (!data) {
        res.status(404).json({ success: false, message: 'Không tìm thấy' });
        return;
      }
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
    }
  }

  async taoMoi(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.service.taoMoi(req.body);
      res.status(201).json({ success: true, message: 'Tạo thành công', data });
    } catch (err) {
      res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
    }
  }

  async capNhat(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.service.capNhat(parseInt(req.params.id), req.body);
      res.json({ success: true, message: 'Cập nhật thành công', data });
    } catch (err) {
      res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
    }
  }

  async xoa(req: Request, res: Response): Promise<void> {
    try {
      await this.service.xoa(parseInt(req.params.id));
      res.json({ success: true, message: 'Xóa thành công' });
    } catch (err) {
      res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
    }
  }
}

export class ThuocController {
  private service = new ThuocService();

  async layTatCa(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.service.layTatCa();
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
    }
  }

  async layTheoId(req: Request, res: Response): Promise<void> {
    try {
      const value = await this.service.layTheoId(parseInt(req.params.id));
      if (!value) {
        res.status(404).json({ success: false, message: 'Không tìm thấy thuốc' });
        return;
      }
      res.json({ success: true, data: value });
    } catch (err) {
      res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
    }
  }

  async layTheoDanhMuc(req: Request, res: Response): Promise<void> {
    try {
      const value = await this.service.layTheoDanhMuc(parseInt(req.params.id));
      res.json({ success: true, data: value });
    } catch (err) {
      res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
    }
  }

  async taoMoi(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.service.taoMoi(req.body);
      res.status(201).json({ success: true, message: 'Tạo thuốc thành công', data });
    } catch (err) {
      res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
    }
  }

  async capNhat(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.service.capNhat(parseInt(req.params.id), req.body);
      res.json({ success: true, message: 'Cập nhật thành công', data });
    } catch (err) {
      res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
    }
  }

  async xoa(req: Request, res: Response): Promise<void> {
    try {
      await this.service.xoa(parseInt(req.params.id));
      res.json({ success: true, message: 'Xóa thuốc thành công' });
    } catch (err) {
      res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
    }
  }
}

export class TonKhoController {
  private service = new TonKhoService();

  async layTatCa(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.service.layTatCa();
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
    }
  }

  async layTheoId(req: Request, res: Response): Promise<void> {
    try {
      const value = await this.service.layTheoId(parseInt(req.params.id));
      if (!value) {
        res.status(404).json({ success: false, message: 'Không tìm thấy tồn kho' });
        return;
      }
      res.json({ success: true, data: value });
    } catch (err) {
      res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
    }
  }

  async layTheoThuoc(req: Request, res: Response): Promise<void> {
    try {
      const value = await this.service.layTheoThuoc(parseInt(req.params.id));
      res.json({ success: true, data: value });
    } catch (err) {
      res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
    }
  }

  async capNhat(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.service.capNhat(parseInt(req.params.id), req.body);
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
    }
  }
}

export class PhieuNhapThuocController {
  private service = new PhieuNhapThuocService();

  async layTatCa(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.service.layTatCa();
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
    }
  }

  async layTheoId(req: Request, res: Response): Promise<void> {
    try {
      const value = await this.service.layTheoId(parseInt(req.params.id));
      if (!value) {
        res.status(404).json({ success: false, message: 'Không tìm thấy phiếu nhập' });
        return;
      }
      res.json({ success: true, data: value });
    } catch (err) {
      res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
    }
  }

  async taoMoi(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.service.taoMoi(req.body);
      res.status(201).json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
    }
  }

  async capNhat(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.service.capNhat(parseInt(req.params.id), req.body);
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
    }
  }

  async xoa(req: Request, res: Response): Promise<void> {
    try {
      await this.service.xoa(parseInt(req.params.id));
      res.json({ success: true, message: 'Xóa phiếu nhập thành công' });
    } catch (err) {
      res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
    }
  }
}

export class ChiTietPhieuNhapController {
  private service = new ChiTietPhieuNhapService();

  async layTatCa(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.service.layTatCa();
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
    }
  }

  async layTheoPhieu(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.service.layTheoPhieu(parseInt(req.params.id));
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
    }
  }

  async layTheoId(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.service.layTheoId(parseInt(req.params.id));
      if (!data) {
        res.status(404).json({ success: false, message: 'Không tìm thấy chi tiết phiếu nhập' });
        return;
      }
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
    }
  }

  async taoMoi(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.service.taoMoi(req.body);
      res.status(201).json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
    }
  }
}

export class ChiTietDonThuocController {
  private service = new ChiTietDonThuocService();

  async layTatCa(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.service.layTatCa();
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
    }
  }

  async layTheoDon(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.service.layTheoDon(parseInt(req.params.id));
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
    }
  }

  async layTheoId(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.service.layTheoId(parseInt(req.params.id));
      if (!data) {
        res.status(404).json({ success: false, message: 'Không tìm thấy chi tiết đơn thuốc' });
        return;
      }
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
    }
  }

  async taoMoi(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.service.taoMoi(req.body);
      res.status(201).json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, message: err instanceof Error ? err.message : 'Có lỗi' });
    }
  }
}
