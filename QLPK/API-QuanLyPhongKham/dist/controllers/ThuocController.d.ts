import { Request, Response } from 'express';
export declare class DanhMucThuocController {
    private service;
    layTatCa(req: Request, res: Response): Promise<void>;
    layTheoId(req: Request, res: Response): Promise<void>;
    taoMoi(req: Request, res: Response): Promise<void>;
    capNhat(req: Request, res: Response): Promise<void>;
    xoa(req: Request, res: Response): Promise<void>;
}
export declare class ThuocController {
    private service;
    layTatCa(req: Request, res: Response): Promise<void>;
    layTheoId(req: Request, res: Response): Promise<void>;
    layTheoDanhMuc(req: Request, res: Response): Promise<void>;
    taoMoi(req: Request, res: Response): Promise<void>;
    capNhat(req: Request, res: Response): Promise<void>;
    xoa(req: Request, res: Response): Promise<void>;
}
export declare class TonKhoController {
    private service;
    layTatCa(req: Request, res: Response): Promise<void>;
    layTheoId(req: Request, res: Response): Promise<void>;
    layTheoThuoc(req: Request, res: Response): Promise<void>;
    capNhat(req: Request, res: Response): Promise<void>;
}
export declare class PhieuNhapThuocController {
    private service;
    layTatCa(req: Request, res: Response): Promise<void>;
    layTheoId(req: Request, res: Response): Promise<void>;
    taoMoi(req: Request, res: Response): Promise<void>;
    capNhat(req: Request, res: Response): Promise<void>;
    xoa(req: Request, res: Response): Promise<void>;
}
export declare class ChiTietPhieuNhapController {
    private service;
    layTatCa(req: Request, res: Response): Promise<void>;
    layTheoPhieu(req: Request, res: Response): Promise<void>;
    layTheoId(req: Request, res: Response): Promise<void>;
    taoMoi(req: Request, res: Response): Promise<void>;
}
export declare class ChiTietDonThuocController {
    private service;
    layTatCa(req: Request, res: Response): Promise<void>;
    layTheoDon(req: Request, res: Response): Promise<void>;
    layTheoId(req: Request, res: Response): Promise<void>;
    taoMoi(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=ThuocController.d.ts.map