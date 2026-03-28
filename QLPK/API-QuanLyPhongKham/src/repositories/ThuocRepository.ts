import { getPool } from '../config/database';
import { DanhMucThuoc, Thuoc, TonKho, PhieuNhapThuoc, ChiTietPhieuNhap, ChiTietDonThuoc } from '../models';
import sql from 'mssql';

export class DanhMucThuocRepository {
  async getAll(): Promise<DanhMucThuoc[]> {
    const pool = getPool();
    const result = await pool.request().query('SELECT * FROM DanhMucThuoc');
    return result.recordset;
  }

  async getById(id: number): Promise<DanhMucThuoc | null> {
    const pool = getPool();
    const result = await pool.request()
      .input('MaDanhMuc', sql.Int, id)
      .query('SELECT * FROM DanhMucThuoc WHERE MaDanhMuc = @MaDanhMuc');
    return result.recordset.length > 0 ? result.recordset[0] : null;
  }

  async create(danhMuc: Omit<DanhMucThuoc, 'MaDanhMuc'>): Promise<DanhMucThuoc> {
    const pool = getPool();
    const result = await pool.request()
      .input('TenDanhMuc', sql.NVarChar, danhMuc.TenDanhMuc)
      .query('INSERT INTO DanhMucThuoc (TenDanhMuc) OUTPUT INSERTED.* VALUES (@TenDanhMuc)');
    return result.recordset[0];
  }

  async update(id: number, danhMuc: Partial<DanhMucThuoc>): Promise<DanhMucThuoc> {
    const pool = getPool();
    const request = pool.request().input('MaDanhMuc', sql.Int, id);
    const fields: string[] = [];
    if (danhMuc.TenDanhMuc) {
      fields.push('TenDanhMuc = @TenDanhMuc');
      request.input('TenDanhMuc', sql.NVarChar, danhMuc.TenDanhMuc);
    }
    const query = 'UPDATE DanhMucThuoc SET ' + fields.join(', ') + ' OUTPUT INSERTED.* WHERE MaDanhMuc = @MaDanhMuc';
    const result = await request.query(query);
    return result.recordset[0];
  }

  async delete(id: number): Promise<boolean> {
    const pool = getPool();
    const result = await pool.request()
      .input('MaDanhMuc', sql.Int, id)
      .query('DELETE FROM DanhMucThuoc WHERE MaDanhMuc = @MaDanhMuc');
    return result.rowsAffected[0] > 0;
  }
}

export class ThuocRepository {
  async getAll(): Promise<Thuoc[]> {
    const pool = getPool();
    const result = await pool.request().query('SELECT * FROM Thuoc');
    return result.recordset;
  }

  async getById(id: number): Promise<Thuoc | null> {
    const pool = getPool();
    const result = await pool.request()
      .input('MaThuoc', sql.Int, id)
      .query('SELECT * FROM Thuoc WHERE MaThuoc = @MaThuoc');
    return result.recordset.length > 0 ? result.recordset[0] : null;
  }

  async getByDanhMuc(maDanhMuc: number): Promise<Thuoc[]> {
    const pool = getPool();
    const result = await pool.request()
      .input('MaDanhMuc', sql.Int, maDanhMuc)
      .query('SELECT * FROM Thuoc WHERE MaDanhMuc = @MaDanhMuc');
    return result.recordset;
  }

  async create(thuoc: Omit<Thuoc, 'MaThuoc'>): Promise<Thuoc> {
    const pool = getPool();
    const result = await pool.request()
      .input('TenThuoc', sql.NVarChar, thuoc.TenThuoc)
      .input('DonViTinh', sql.NVarChar, thuoc.DonViTinh)
      .input('Gia', sql.Decimal(18, 2), thuoc.Gia)
      .input('MaDanhMuc', sql.Int, thuoc.MaDanhMuc)
      .query('INSERT INTO Thuoc (TenThuoc, DonViTinh, Gia, MaDanhMuc) OUTPUT INSERTED.* VALUES (@TenThuoc, @DonViTinh, @Gia, @MaDanhMuc)');
    return result.recordset[0];
  }

  async update(id: number, thuoc: Partial<Thuoc>): Promise<Thuoc> {
    const pool = getPool();
    const request = pool.request().input('MaThuoc', sql.Int, id);
    const fields: string[] = [];
    if (thuoc.TenThuoc) {
      fields.push('TenThuoc = @TenThuoc');
      request.input('TenThuoc', sql.NVarChar, thuoc.TenThuoc);
    }
    if (thuoc.DonViTinh) {
      fields.push('DonViTinh = @DonViTinh');
      request.input('DonViTinh', sql.NVarChar, thuoc.DonViTinh);
    }
    if (thuoc.Gia !== undefined) {
      fields.push('Gia = @Gia');
      request.input('Gia', sql.Decimal(18, 2), thuoc.Gia);
    }
    if (thuoc.MaDanhMuc) {
      fields.push('MaDanhMuc = @MaDanhMuc');
      request.input('MaDanhMuc', sql.Int, thuoc.MaDanhMuc);
    }
    const query = 'UPDATE Thuoc SET ' + fields.join(', ') + ' OUTPUT INSERTED.* WHERE MaThuoc = @MaThuoc';
    const result = await request.query(query);
    return result.recordset[0];
  }

  async delete(id: number): Promise<boolean> {
    const pool = getPool();
    const result = await pool.request()
      .input('MaThuoc', sql.Int, id)
      .query('DELETE FROM Thuoc WHERE MaThuoc = @MaThuoc');
    return result.rowsAffected[0] > 0;
  }
}

export class TonKhoRepository {
  async getAll(): Promise<TonKho[]> {
    const pool = getPool();
    const result = await pool.request().query('SELECT * FROM TonKho');
    return result.recordset;
  }

  async getById(id: number): Promise<TonKho | null> {
    const pool = getPool();
    const result = await pool.request()
      .input('MaTonKho', sql.Int, id)
      .query('SELECT * FROM TonKho WHERE MaTonKho = @MaTonKho');
    return result.recordset.length > 0 ? result.recordset[0] : null;
  }

  async getByThuoc(maThuoc: number): Promise<TonKho[]> {
    const pool = getPool();
    const result = await pool.request()
      .input('MaThuoc', sql.Int, maThuoc)
      .query('SELECT * FROM TonKho WHERE MaThuoc = @MaThuoc');
    return result.recordset;
  }

  async update(id: number, tonKho: Partial<TonKho>): Promise<TonKho> {
    const pool = getPool();
    const request = pool.request().input('MaTonKho', sql.Int, id);
    const fields: string[] = [];
    if (tonKho.MaThuoc) {
      fields.push('MaThuoc = @MaThuoc');
      request.input('MaThuoc', sql.Int, tonKho.MaThuoc);
    }
    if (tonKho.SoLuong !== undefined) {
      fields.push('SoLuong = @SoLuong');
      request.input('SoLuong', sql.Int, tonKho.SoLuong);
    }
    if (tonKho.MaKho) {
      fields.push('MaKho = @MaKho');
      request.input('MaKho', sql.Int, tonKho.MaKho);
    }

    const query = 'UPDATE TonKho SET ' + fields.join(', ') + ' OUTPUT INSERTED.* WHERE MaTonKho = @MaTonKho';
    const result = await request.query(query);
    return result.recordset[0];
  }
}

export class PhieuNhapThuocRepository {
  async getAll(): Promise<PhieuNhapThuoc[]> {
    const pool = getPool();
    const result = await pool.request().query('SELECT * FROM PhieuNhapThuoc');
    return result.recordset;
  }

  async getById(id: number): Promise<PhieuNhapThuoc | null> {
    const pool = getPool();
    const result = await pool.request()
      .input('MaPhieuNhap', sql.Int, id)
      .query('SELECT * FROM PhieuNhapThuoc WHERE MaPhieuNhap = @MaPhieuNhap');
    return result.recordset.length > 0 ? result.recordset[0] : null;
  }

  async create(phieu: Omit<PhieuNhapThuoc, 'MaPhieuNhap'>): Promise<PhieuNhapThuoc> {
    const pool = getPool();
    const result = await pool.request()
      .input('NgayNhap', sql.DateTime, phieu.NgayNhap)
      .input('NhaCungCap', sql.NVarChar, phieu.NhaCungCap)
      .input('NguoiNhap', sql.NVarChar, phieu.NguoiNhap || '')
      .query('INSERT INTO PhieuNhapThuoc (NgayNhap, NhaCungCap, NguoiNhap) OUTPUT INSERTED.* VALUES (@NgayNhap, @NhaCungCap, @NguoiNhap)');
    return result.recordset[0];
  }

  async update(id: number, phieu: Partial<PhieuNhapThuoc>): Promise<PhieuNhapThuoc> {
    const pool = getPool();
    const request = pool.request().input('MaPhieuNhap', sql.Int, id);
    const fields: string[] = [];
    if (phieu.NgayNhap) {
      fields.push('NgayNhap = @NgayNhap');
      request.input('NgayNhap', sql.DateTime, phieu.NgayNhap);
    }
    if (phieu.NhaCungCap) {
      fields.push('NhaCungCap = @NhaCungCap');
      request.input('NhaCungCap', sql.NVarChar, phieu.NhaCungCap);
    }
    if (phieu.NguoiNhap) {
      fields.push('NguoiNhap = @NguoiNhap');
      request.input('NguoiNhap', sql.NVarChar, phieu.NguoiNhap);
    }
    const query = 'UPDATE PhieuNhapThuoc SET ' + fields.join(', ') + ' OUTPUT INSERTED.* WHERE MaPhieuNhap = @MaPhieuNhap';
    const result = await request.query(query);
    return result.recordset[0];
  }

  async delete(id: number): Promise<boolean> {
    const pool = getPool();
    const result = await pool.request()
      .input('MaPhieuNhap', sql.Int, id)
      .query('DELETE FROM PhieuNhapThuoc WHERE MaPhieuNhap = @MaPhieuNhap');
    return result.rowsAffected[0] > 0;
  }
}

export class ChiTietPhieuNhapRepository {
  async getAll(): Promise<ChiTietPhieuNhap[]> {
    const pool = getPool();
    const result = await pool.request().query('SELECT * FROM ChiTietPhieuNhap');
    return result.recordset;
  }

  async getByPhieuNhap(maPhieuNhap: number): Promise<ChiTietPhieuNhap[]> {
    const pool = getPool();
    const result = await pool.request()
      .input('MaPhieuNhap', sql.Int, maPhieuNhap)
      .query('SELECT * FROM ChiTietPhieuNhap WHERE MaPhieuNhap = @MaPhieuNhap');
    return result.recordset;
  }

  async getById(id: number): Promise<ChiTietPhieuNhap | null> {
    const pool = getPool();
    const result = await pool.request()
      .input('MaChiTiet', sql.Int, id)
      .query('SELECT * FROM ChiTietPhieuNhap WHERE MaChiTiet = @MaChiTiet');
    return result.recordset.length > 0 ? result.recordset[0] : null;
  }

  async create(chiTiet: Omit<ChiTietPhieuNhap, 'MaChiTiet'>): Promise<ChiTietPhieuNhap> {
    const pool = getPool();
    const result = await pool.request()
      .input('MaPhieuNhap', sql.Int, chiTiet.MaPhieuNhap)
      .input('MaThuoc', sql.Int, chiTiet.MaThuoc)
      .input('SoLuong', sql.Int, chiTiet.SoLuong)
      .input('GiaNhap', sql.Decimal(18, 2), chiTiet.GiaNhap)
      .query('INSERT INTO ChiTietPhieuNhap (MaPhieuNhap, MaThuoc, SoLuong, GiaNhap) OUTPUT INSERTED.* VALUES (@MaPhieuNhap, @MaThuoc, @SoLuong, @GiaNhap)');
    return result.recordset[0];
  }
}

export class ChiTietDonThuocRepository {
  async getAll(): Promise<ChiTietDonThuoc[]> {
    const pool = getPool();
    const result = await pool.request().query('SELECT * FROM ChiTietDonThuoc');
    return result.recordset;
  }

  async getByDonThuoc(maDonThuoc: number): Promise<ChiTietDonThuoc[]> {
    const pool = getPool();
    const result = await pool.request()
      .input('MaDonThuoc', sql.Int, maDonThuoc)
      .query('SELECT * FROM ChiTietDonThuoc WHERE MaDonThuoc = @MaDonThuoc');
    return result.recordset;
  }

  async getById(id: number): Promise<ChiTietDonThuoc | null> {
    const pool = getPool();
    const result = await pool.request()
      .input('MaChiTiet', sql.Int, id)
      .query('SELECT * FROM ChiTietDonThuoc WHERE MaChiTiet = @MaChiTiet');
    return result.recordset.length > 0 ? result.recordset[0] : null;
  }

  async create(chiTiet: Omit<ChiTietDonThuoc, 'MaChiTiet'>): Promise<ChiTietDonThuoc> {
    const pool = getPool();
    const result = await pool.request()
      .input('MaDonThuoc', sql.Int, chiTiet.MaDonThuoc)
      .input('MaThuoc', sql.Int, chiTiet.MaThuoc)
      .input('SoLuong', sql.Int, chiTiet.SoLuong)
      .input('CachDung', sql.NVarChar, chiTiet.CachDung)
      .query('INSERT INTO ChiTietDonThuoc (MaDonThuoc, MaThuoc, SoLuong, CachDung) OUTPUT INSERTED.* VALUES (@MaDonThuoc, @MaThuoc, @SoLuong, @CachDung)');
    return result.recordset[0];
  }
}
