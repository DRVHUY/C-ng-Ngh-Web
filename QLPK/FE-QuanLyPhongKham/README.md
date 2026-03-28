# FE-QuanLyPhongKham - 医 Clinic Management Frontend

🏥 React-based frontend application cho hệ thống quản lý phòng khám (clinic management system) với authentication, role-based access control, và business logic phân tách theo vai trò người dùng.

## ✨ Features

- ✅ **Authentication** - Đăng nhập với credentials từ database
- ✅ **Role-Based Access Control (RBAC)** - 4 vai trò: Admin, BacSi (Doctor), NhanVien (Staff), BenhNhan (Patient)
- ✅ **Responsive Design** - Mobile-friendly UI
- ✅ **Token-Based Security** - JWT token management with localStorage
- ✅ **Dynamic Navigation** - Menu tự động thay đổi theo role
- ✅ **API Integration** - Axios client với interceptors
- ✅ **TypeScript** - Strong typing cho code safety

## 🚀 Quick Start

### 1. Clone & Install
```bash
cd FE-QuanLyPhongKham
npm install
```

### 2. Configure Environment
Sao chép `.env.example` thành `.env.local`:
```bash
cp .env.example .env.local
```

Chỉnh sửa `.env.local` để trỏ đúng API backend:
```env
REACT_APP_API_BASE_URL=http://localhost:7000/api
REACT_APP_DEBUG=true
```

### 3. Start Development Server
```bash
npm start
```

Ứng dụng sẽ mở tại `http://localhost:3000`

## 🔐 Đăng Nhập Demo

Sử dụng tài khoản từ database backend với các vai trò:

| Vai Trò | Mục Đích | Ghi Chú |
|---------|---------|--------|
| Admin | Quản lý toàn hệ thống | Tất cả quyền |
| BacSi | Quản lý bác sĩ | Lịch khám, bệnh nhân |
| NhanVien | Nhân viên hành chính | Hỗ trợ đặt lịch |
| BenhNhan | Bệnh nhân | Đặt lịch, xem hóa đơn |

## 📁 Cấu Trúc Thư Mục

```
FE-QuanLyPhongKham/
├── public/
│   └── index.html
├── src/
│   ├── pages/                 # Các trang (route-level components)
│   │   ├── Auth/
│   │   │   └── Login.tsx
│   │   ├── Admin/             # Admin dashboard & management
│   │   ├── BacSi/             # Doctor features
│   │   ├── NhanVien/          # Staff features
│   │   └── BenhNhan/          # Patient features
│   ├── components/            # Reusable components
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   └── PrivateRoute.tsx
│   ├── context/               # React Context
│   │   └── AuthContext.tsx
│   ├── services/              # API calls
│   │   ├── authService.ts
│   │   ├── bacSiService.ts
│   │   └── benhNhanService.ts
│   ├── utils/                 # Utilities
│   │   ├── ApiClient.ts       # Axios instance
│   │   └── ...
│   ├── types/                 # TypeScript interfaces
│   │   └── index.ts
│   ├── styles/                # CSS files
│   │   └── ...
│   ├── App.tsx                # Main routing
│   └── index.tsx              # Entry point
├── package.json
├── tsconfig.json
├── .env.example
├── QUICK_START.md             # Getting started guide
└── ARCHITECTURE.md            # Architecture documentation
```

## 🧪 Testing JWT Authentication

### 1. Start Backend First
```bash
cd ../API-QuanLyPhongKham
npm run dev
```

### 2. Test Login API
```bash
curl -X POST http://localhost:7000/api/nguoi-dung/dang-nhap \
  -H "Content-Type: application/json" \
  -d '{"TenDangNhap": "admin", "MatKhau": "password"}'
```

### 3. Test Protected Endpoint
```bash
curl -X GET http://localhost:7000/api/nguoi-dung \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### 4. Test Frontend
- Truy cập `http://localhost:3000`
- Đăng nhập với credentials từ backend
- Kiểm tra token được lưu trong browser DevTools > Application > Local Storage

## 📋 Pages Overview

### Login Page
- Trang đăng nhập tại route `/login`
- Kiểm tra credentials từ database
- Tự động redirect đến dashboard theo role

### Admin Pages (`/admin/*`)
- **Dashboard** - Thống kê: Bệnh nhân, Lịch khám, Hóa đơn
- **Người Dùng** - CRUD người dùng hệ thống
- **Bác Sĩ** - Quản lý danh sách bác sĩ
- **Bệnh Nhân** - Quản lý danh sách bệnh nhân
- **Chuyên Khoa** - Quản lý chuyên khoa
- **Lịch Khám** - Quản lý tất cả lịch khám
- **Hóa Đơn** - Quản lý hóa đơn

### BacSi Pages (`/bac-si/*`)
- **Dashboard** - Overview cho bác sĩ
- **Lịch Làm Việc** - Xem lịch khám của tôi
- **Bệnh Nhân Của Tôi** - Danh sách bệnh nhân giao tiếp

### NhanVien Pages (`/nhan-vien/*`)
- **Dashboard** - Overview cho nhân viên
- **Lịch Khám** - Quản lý lịch khám
- **Bệnh Nhân** - Danh sách bệnh nhân

### BenhNhan Pages (`/benh-nhan/*`)
- **Dashboard** - Welcome page
- **Đặt Lịch Khám** - Form đặt lịch mới
- **Lịch Khám Của Tôi** - Xem các lịch đã đặt
- **Hóa Đơn Của Tôi** - Xem hóa đơn
- **Hồ Sơ Cá Nhân** - Cập nhật thông tin cá nhân

## 🔄 Authentication Flow

```
1. User visits /login
   ↓
2. Enter credentials (TenDangNhap, MatKhau)
   ↓
3. authService.login() → POST /api/nguoi-dung/login
   ↓
4. Backend validates & returns token + user info
   ↓
5. AuthContext stores token & user in localStorage
   ↓
6. Determine role based on user data
   ↓
7. Auto-redirect to dashboard (/admin, /bac-si, /benh-nhan, etc)
   ↓
8. Token attached to all subsequent API requests
```

## 🛡️ Role-Based Access Control

### PrivateRoute Component
```tsx
<Route
  path="/admin"
  element={<PrivateRoute 
    component={AdminDashboard} 
    allowedRoles={['Admin']} 
  />}
/>
```

- Kiểm tra nếu user đã authenticated
- Xác minh role có trong allowedRoles
- Redirect to /login nếu không authorized

### Dynamic Sidebar
Menu automatically renders based on user role:
```
Admin     → 7 menu items (Users, Doctors, Patients, ...)
BacSi     → 3 menu items (Schedule, Patients, ...)
NhanVien  → 3 menu items (Appointments, Patients, ...)
BenhNhan  → 5 menu items (Book, Appointments, Invoices, ...)
```

## 🔌 API Integration

### Services Pattern
```typescript
// bacSiService.ts
export const bacSiService = {
  getAllBacSi: async () => { /* ... */ },
  getBacSiById: async (id: number) => { /* ... */ },
  createBacSi: async (data: Partial<BacSi>) => { /* ... */ },
  updateBacSi: async (id: number, data: Partial<BacSi>) => { /* ... */ },
  deleteBacSi: async (id: number) => { /* ... */ },
};
```

### Using in Components
```typescript
useEffect(() => {
  bacSiService.getAllBacSi()
    .then(doctors => setDoctors(doctors))
    .catch(err => setError(err.message));
}, []);
```

## 🎨 Styling

- **CSS in separate files** - Organized by page/component
- **Responsive Design** - Mobile breakpoint at 768px
- **Gradient Theme** - Purple (#667eea - #764ba2)
- **Material-Inspired** - Clean spacing & typography

## 📦 Dependencies

- **React 18** - UI framework
- **TypeScript** - Static type checking
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **react-scripts** - Build tools

## 🛠️ Available Scripts

```bash
npm start      # Start dev server (port 3000)
npm build      # Create optimized build
npm test       # Run test suite
npm eject      # Eject from react-scripts (irreversible)
```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Important Notes

### Token Management
- Token stored in `localStorage` as `token`
- User info stored as JSON in `localStorage['user']`
- Role stored in `localStorage['role']`
- Token automatically included in all API requests
- Token cleared on logout or 401 response

### CORS
- Ensure backend has CORS enabled for `http://localhost:3000`
- Or configure proxy in development

```json
// package.json
"proxy": "http://localhost:7000"
```

## 🚨 Common Issues

### Error: "Cannot find module 'react-router-dom'"
```bash
npm install react-router-dom@latest
```

### Error: "Token not found" after refresh
- Check if localStorage is enabled in browser
- Check if browser is in private/incognito mode

### Error: "404 Not Found from API"
- Verify API_URL in `.env.local`
- Check if backend server is running
- Check API endpoint paths

### Error: "CORS error"
- Configure CORS in backend
- Or use proxy in development

## 📚 Documentation

- [QUICK_START.md](./QUICK_START.md) - Getting started guide
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Detailed architecture & patterns
- [Backend API](../API-QuanLyPhongKham/README.md) - API documentation

## ✅ Checklist for Deployment

- [ ] Update `.env` with production API URL
- [ ] Run `npm build` to create optimized build
- [ ] Test in production environment
- [ ] Configure CORS on backend
- [ ] Set up HTTPS/SSL certificate
- [ ] Configure environment variables on hosting
- [ ] Test authentication flow
- [ ] Test all role-based routes

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/my-feature`
2. Commit changes: `git commit -m 'Add feature'`
3. Push to branch: `git push origin feature/my-feature`
4. Open Pull Request

## 📞 Support

Gặp vấn đề? 
1. Kiểm tra [QUICK_START.md](./QUICK_START.md)
2. Xem lỗi trong browser console
3. Kiểm tra network tab cho API errors
4. Đảm bảo backend đang chạy

## 📄 License

Part of Clinic Management System project

---

**Last Updated:** 2024
**Version:** 1.0.0
**Status:** Active Development
