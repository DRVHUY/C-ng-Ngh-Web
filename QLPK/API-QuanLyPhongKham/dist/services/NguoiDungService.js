"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NguoiDungService = void 0;
const NguoiDungRepository_1 = require("../repositories/NguoiDungRepository");
const NguoiDungVaiTroRepository_1 = require("../repositories/NguoiDungVaiTroRepository");
const JwtService_1 = require("../utils/JwtService");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const database_1 = require("../config/database");
const mssql_1 = __importDefault(require("mssql"));
class NguoiDungService {
    constructor() {
        this.repository = new NguoiDungRepository_1.NguoiDungRepository();
        this.vaiTroRepository = new NguoiDungVaiTroRepository_1.NguoiDungVaiTroRepository();
    }
    async getRoleIdByName(tenVaiTro) {
        const pool = (0, database_1.getPool)();
        const result = await pool
            .request()
            .input('TenVaiTro', mssql_1.default.NVarChar, tenVaiTro)
            .query('SELECT MaVaiTro FROM VaiTro WHERE TenVaiTro = @TenVaiTro');
        return result.recordset.length > 0 ? result.recordset[0].MaVaiTro : null;
    }
    async layTatCa() {
        return this.repository.getAll();
    }
    async layTheoId(maNguoiDung) {
        return this.repository.getById(maNguoiDung);
    }
    async layTheoTenDangNhap(tenDangNhap) {
        return this.repository.getByTenDangNhap(tenDangNhap);
    }
    async timKiem(ten) {
        if (!ten || ten.trim() === '') {
            return [];
        }
        return this.repository.searchByName(ten.trim());
    }
    async taoMoi(nguoiDung) {
        const existing = await this.repository.getByTenDangNhap(nguoiDung.TenDangNhap);
        if (existing) {
            throw new Error('Tên đăng nhập đã tồn tại');
        }
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(nguoiDung.MatKhau, salt);
        const newUser = await this.repository.create({
            ...nguoiDung,
            MatKhau: hashedPassword,
        });
        // Gán vai trò nếu được cung cấp
        if (nguoiDung.VaiTro) {
            const roleId = await this.getRoleIdByName(nguoiDung.VaiTro);
            if (roleId) {
                await this.vaiTroRepository.assignRole(newUser.MaNguoiDung, roleId);
            }
        }
        return newUser;
    }
    async capNhat(maNguoiDung, nguoiDung) {
        const existing = await this.repository.getById(maNguoiDung);
        if (!existing) {
            throw new Error('Người dùng không tồn tại');
        }
        // Cập nhật vai trò nếu được cung cấp
        if (nguoiDung.VaiTro) {
            const roleId = await this.getRoleIdByName(nguoiDung.VaiTro);
            if (roleId) {
                // Xóa vai trò cũ
                await this.vaiTroRepository.revokeAllRoles(maNguoiDung);
                // Gán vai trò mới
                await this.vaiTroRepository.assignRole(maNguoiDung, roleId);
            }
        }
        // Loại bỏ VaiTro khỏi object cập nhật vì nó không phải là trường trong bảng NguoiDung
        const { VaiTro, ...updateData } = nguoiDung;
        return this.repository.update(maNguoiDung, updateData);
    }
    async xoa(maNguoiDung) {
        const existing = await this.repository.getById(maNguoiDung);
        if (!existing) {
            throw new Error('Người dùng không tồn tại');
        }
        return this.repository.delete(maNguoiDung);
    }
    async kiemTraMatKhau(tenDangNhap, matKhau) {
        const nguoiDung = await this.repository.getByTenDangNhap(tenDangNhap);
        if (!nguoiDung) {
            return null;
        }
        let isValid = false;
        try {
            isValid = await bcryptjs_1.default.compare(matKhau, nguoiDung.MatKhau);
        }
        catch (err) {
            isValid = false;
        }
        if (!isValid && nguoiDung.MatKhau === matKhau) {
            isValid = true;
            const newHash = await bcryptjs_1.default.hash(matKhau, 10);
            await this.repository.update(nguoiDung.MaNguoiDung, { MatKhau: newHash });
        }
        if (!isValid) {
            return null;
        }
        const roles = await this.vaiTroRepository.getRolesByUserId(nguoiDung.MaNguoiDung);
        const primaryRole = roles.length > 0 ? roles[0] : 'BenhNhan';
        const token = JwtService_1.JwtService.generateToken({
            MaNguoiDung: nguoiDung.MaNguoiDung,
            TenDangNhap: nguoiDung.TenDangNhap,
            Email: nguoiDung.Email || '',
            VaiTro: primaryRole,
        });
        return {
            success: true,
            token,
            user: {
                MaNguoiDung: nguoiDung.MaNguoiDung,
                TenDangNhap: nguoiDung.TenDangNhap,
                HoTen: nguoiDung.HoTen,
                Email: nguoiDung.Email,
                DienThoai: nguoiDung.DienThoai,
                VaiTro: primaryRole,
                Roles: roles,
            },
        };
    }
    async layVaiTro(maNguoiDung) {
        return this.vaiTroRepository.getRolesByUserId(maNguoiDung);
    }
    async ganVaiTro(maNguoiDung, maVaiTro) {
        await this.vaiTroRepository.assignRole(maNguoiDung, maVaiTro);
    }
}
exports.NguoiDungService = NguoiDungService;
//# sourceMappingURL=NguoiDungService.js.map