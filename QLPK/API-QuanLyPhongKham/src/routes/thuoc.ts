import { Router } from 'express';
import { DanhMucThuocController, ThuocController, TonKhoController, PhieuNhapThuocController, ChiTietPhieuNhapController, ChiTietDonThuocController } from '../controllers/ThuocController';

const router = Router();
const danhMucThuocController = new DanhMucThuocController();
const thuocController = new ThuocController();

// Danh mục thuốc
router.get('/danh-muc-thuoc', danhMucThuocController.layTatCa.bind(danhMucThuocController));
router.get('/danh-muc-thuoc/:id', danhMucThuocController.layTheoId.bind(danhMucThuocController));
router.post('/danh-muc-thuoc', danhMucThuocController.taoMoi.bind(danhMucThuocController));
router.put('/danh-muc-thuoc/:id', danhMucThuocController.capNhat.bind(danhMucThuocController));
router.delete('/danh-muc-thuoc/:id', danhMucThuocController.xoa.bind(danhMucThuocController));

// Thuốc
router.get('/thuoc', thuocController.layTatCa.bind(thuocController));
router.get('/thuoc/:id', thuocController.layTheoId.bind(thuocController));
router.get('/thuoc/danh-muc/:id', thuocController.layTheoDanhMuc.bind(thuocController));
router.post('/thuoc', thuocController.taoMoi.bind(thuocController));
router.put('/thuoc/:id', thuocController.capNhat.bind(thuocController));
router.delete('/thuoc/:id', thuocController.xoa.bind(thuocController));

const tonKhoController = new TonKhoController();
router.get('/ton-kho', tonKhoController.layTatCa.bind(tonKhoController));
router.get('/ton-kho/:id', tonKhoController.layTheoId.bind(tonKhoController));
router.get('/ton-kho/thuoc/:id', tonKhoController.layTheoThuoc.bind(tonKhoController));
router.put('/ton-kho/:id', tonKhoController.capNhat.bind(tonKhoController));

const phieuNhapController = new PhieuNhapThuocController();
router.get('/phieu-nhap-thuoc', phieuNhapController.layTatCa.bind(phieuNhapController));
router.get('/phieu-nhap-thuoc/:id', phieuNhapController.layTheoId.bind(phieuNhapController));
router.post('/phieu-nhap-thuoc', phieuNhapController.taoMoi.bind(phieuNhapController));
router.put('/phieu-nhap-thuoc/:id', phieuNhapController.capNhat.bind(phieuNhapController));
router.delete('/phieu-nhap-thuoc/:id', phieuNhapController.xoa.bind(phieuNhapController));

const chiTietPhieuNhapController = new ChiTietPhieuNhapController();
router.get('/chi-tiet-phieu-nhap', chiTietPhieuNhapController.layTatCa.bind(chiTietPhieuNhapController));
router.get('/chi-tiet-phieu-nhap/:id', chiTietPhieuNhapController.layTheoId.bind(chiTietPhieuNhapController));
router.get('/chi-tiet-phieu-nhap/phieu-nhap/:id', chiTietPhieuNhapController.layTheoPhieu.bind(chiTietPhieuNhapController));
router.post('/chi-tiet-phieu-nhap', chiTietPhieuNhapController.taoMoi.bind(chiTietPhieuNhapController));

const chiTietDonController = new ChiTietDonThuocController();
router.get('/chi-tiet-don-thuoc', chiTietDonController.layTatCa.bind(chiTietDonController));
router.get('/chi-tiet-don-thuoc/:id', chiTietDonController.layTheoId.bind(chiTietDonController));
router.get('/chi-tiet-don-thuoc/don-thuoc/:id', chiTietDonController.layTheoDon.bind(chiTietDonController));
router.post('/chi-tiet-don-thuoc', chiTietDonController.taoMoi.bind(chiTietDonController));

export default router;
