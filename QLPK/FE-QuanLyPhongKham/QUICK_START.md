# FE-QuanLyPhongKham - Clinic Management Frontend

Frontend React application cho hệ thống quản lý phòng khám với authentication, role-based access control, và business logic phân tách theo vai trò.

## 📋 Yêu Cầu

- Node.js >= 14
- npm hoặc yarn
- API backend (API-QuanLyPhongKham) đang chạy

## 🚀 Cài Đặt & Khởi Động

### 1. Cài đặt dependencies
```bash
cd FE-QuanLyPhongKham
npm install
```

### 2. Cấu hình API
Chỉnh sửa file `src/constant/api.ts` để trỏ đúng API endpoint:
```typescript
export const API_BASE_URL = 'http://localhost:3000/api'; // Chỉnh sửa port nếu cần
```

### 3. Khởi động development server
```bash
npm start
```

Ứng dụng sẽ mở tại `http://localhost:3000`

## 🔐 Đăng Nhập & Vai Trò

### Demo Credentials
Hệ thống hỗ trợ 4 vai trò chính:

| Vai Trò | Email | Mục Đích |
|---------|-------|---------|
| Admin | admin@yourmail.com | Quản lý toàn hệ thống |
| BacSi | doctor@yourmail.com | Quản lý lịch khám, bệnh nhân |
| NhanVien | staff@yourmail.com | Hỗ trợ đặt lịch, xử lý hành chính |
| BenhNhan | patient@yourmail.com | Đặt lịch khám, xem hóa đơn |

*Note: Thay đổi email/password trong hệ thống backend để test*

## 📂 Cấu Trúc Project

```
src/
├── pages/                    # Các trang component
│   ├── Auth/
│   │   └── Login.tsx        # Trang đăng nhập
│   ├── Admin/
│   │   ├── AdminDashboard.tsx
│   │   ├── ManageBenhNhan.tsx
│   │   ├── ManageBacSi.tsx
│   │   ├── ManageNguoiDung.tsx
│   │   ├── ManageChuyenKhoa.tsx
│   │   ├── ManageLichHen.tsx
│   │   └── ManageHoaDon.tsx
│   ├── BacSi/
│   │   ├── BacSiDashboard.tsx
│   │   ├── LichLamViec.tsx
│   │   └── BenhNhanCuaToi.tsx
│   ├── NhanVien/
│   │   ├── NhanVienDashboard.tsx
│   │   ├── LichHen.tsx
│   │   └── BenhNhan.tsx
│   └── BenhNhan/
│       ├── BenhNhanDashboard.tsx
│       ├── DatLichHen.tsx
│       ├── LichHenCuaToi.tsx
│       ├── HoaDonCuaToi.tsx
│       └── HoSoCaNhan.tsx
├── components/              # Các component tái sử dụng
│   ├── Navbar.tsx          # Thanh điều hướng trên cùng
│   ├── Sidebar.tsx         # Menu bên trái (dynamic theo role)
│   └── PrivateRoute.tsx    # Component bảo vệ route
├── context/                # React Context
│   └── AuthContext.tsx     # Quản lý authentication state
├── services/               # API calls
│   ├── apiClient.ts        # Axios instance với interceptors
│   ├── authService.ts      # Login/logout APIs
│   ├── bacSiService.ts     # Doctor related APIs
│   └── benhNhanService.ts  # Patient related APIs
├── types/                  # TypeScript interfaces
│   └── index.ts           # All type definitions
├── styles/                # CSS files
│   ├── index.css          # Global styles
│   ├── Login.css          # Login page styles
│   ├── Navbar.css         # Navbar styles
│   ├── Sidebar.css        # Sidebar styles
│   └── Dashboard.css      # Dashboard & layout styles
├── App.tsx               # Main routing component
└── index.tsx            # Entry point
```

## 🔄 Authentication Flow

1. **Login** → User nhập credentials
2. **Backend Verification** → API kiểm tra tài khoản
3. **Token Generation** → Server trả về token + user info
4. **Token Storage** → Token được lưu vào localStorage
5. **Navigation** → Redirect đến dashboard theo role

## 🔐 Token Management

- Token được gửi với mọi request qua header `Authorization: Bearer {token}`
- Tự động logout nếu API trả về 401 (token expired)
- Token được xóa khi logout

## 👥 Role-Based Features

### Admin
- Quản lý người dùng (tạo, sửa, xóa)
- Quản lý bác sĩ & chuyên khoa
- Quản lý bệnh nhân
- Xem/quản lý lịch khám
- Xem/quản lý hóa đơn

### Bác Sĩ (BacSi)
- Xem lịch làm việc
- Quản lý bệnh nhân của mình
- Tạo đơn thuốc
- Xem hóa đơn

### Nhân Viên (NhanVien)
- Xem lịch khám
- Quản lý bệnh nhân
- Hỗ trợ đặt lịch

### Bệnh Nhân
- Đặt lịch khám
- Xem lịch khám của tôi
- Xem hóa đơn
- Cập nhật hồ sơ cá nhân

## 🎯 Các Component Chính

### AuthContext
Quản lý authentication state toàn ứng dụng
- `login(tenDangNhap, matKhau)` - Đăng nhập
- `logout()` - Đăng xuất
- `user` - Thông tin user hiện tại
- `role` - Vai trò của user
- `isAuthenticated` - Trạng thái đăng nhập

### PrivateRoute
Bảo vệ các route theo authentication và role
```tsx
<Route
  path="/admin"
  element={<PrivateRoute component={AdminDashboard} allowedRoles={['Admin']} />}
/>
```

### ApiClient
Axios instance với interceptor tự động gắn token
```typescript
// Request interceptor - gắn token vào header
// Response interceptor - handle 401 errors
```

## 📡 API Integration

### Services hiện có
- `authService` - Login/Logout
- `bacSiService` - Doctor CRUD + appointment management
- `benhNhanService` - Patient CRUD + appointment booking

### Thêm API calls mới
1. Tạo method trong service tương ứng
2. Import service trong component
3. Call method trong useEffect

```typescript
useEffect(() => {
  bacSiService.getAllBacSi()
    .then(data => setDoctors(data))
    .catch(err => setError(err.message));
}, []);
```

## 🎨 Styling

- CSS modules được import trong từng component
- Responsive design cho mobile (768px breakpoint)
- Gradient purple theme (#667eea - #764ba2)
- Material-inspired colors & spacing

## 🐛 Troubleshooting

### Lỗi: "Token not found"
- Kiểm tra token được lưu trong localStorage
- Thử đăng nhập lại

### Lỗi: "Role not recognized"
- Kiểm tra API trả về đúng role
- Xem browser console dla debug

### Lỗi: "Cannot read property 'map' of undefined"
- Component đang render trước khi data tải xong
- Thêm loading state & null check

## 📝 TODO / Chưa Hoàn Thành

- [ ] Implement edit/delete modals cho các management pages
- [ ] Add form validation & error messages
- [ ] API integration cho tất cả endpoints
- [ ] Loading skeletons thay vì "Đang tải..."
- [ ] Error boundaries
- [ ] Unit tests
- [ ] E2E tests
- [ ] Internationalization (i18n) cho tiếng Việt/Anh

## 🔌 Built With

- **React 18** - UI framework
- **TypeScript** - Type safety
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling

## 📞 Support

Nếu gặp vấn đề, kiểm tra:
1. Backend API đang chạy
2. Credentials đúng
3. Browser console cho error messages
4. Network tab để kiểm tra API calls
