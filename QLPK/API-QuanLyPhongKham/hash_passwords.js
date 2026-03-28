const bcrypt = require('bcryptjs');
const sql = require('mssql');

(async () => {
  try {
    const pool = await sql.connect({
      server: 'localhost',
      port: 1433,
      user: 'sa',
      password: 'huy2005',
      database: 'QuanLyPhongKham',
      options: { encrypt: false, trustServerCertificate: true },
    });

    const users = ['admin01', 'bacsi01', 'bacsi02', 'nhanvien01', 'benhnhan01', 'benhnhan02'];

    for (const u of users) {
      const hash = await bcrypt.hash('123456', 10);
      await pool
        .request()
        .input('TenDangNhap', sql.NVarChar, u)
        .input('MatKhau', sql.NVarChar, hash)
        .query('UPDATE NguoiDung SET MatKhau = @MatKhau WHERE TenDangNhap = @TenDangNhap');
      console.log('Updated', u);
    }

    await pool.close();
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
