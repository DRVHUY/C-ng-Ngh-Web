# FE-QuanLyPhongKham - Architecture Documentation

## 📐 Architecture Overview

Ứng dụng Frontend được xây dựng theo **Component-Based Architecture** với **Separation of Concerns**:

```
┌─────────────────────────────────────┐
│        React Components              │ <- UI Layer
│  (pages, components)                │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│   Context API (AuthContext)         │ <- State Management
│   (Authentication, Role Management) │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│   Services Layer                    │ <- Business Logic
│   (authService, bacSiService, etc)  │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│   ApiClient (Axios)                 │ <- HTTP Layer
│   (Request/Response Interceptors)   │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│        Backend API                  │ <- External Service
│    (Express/Node.js)                │
└─────────────────────────────────────┘
```

## 🏗️ Layered Architecture

### 1. **Presentation Layer** (UI/Pages)
- Components chịu trách nhiệm render UI
- Mỗi page đại diện cho một route
- Components có hạn chế business logic
- Sử dụng hooks để access state & services

**Các component:**
- `pages/Auth/Login.tsx` - Login form
- `pages/Admin/*` - Admin management pages
- `pages/BacSi/*` - Doctor pages
- `pages/NhanVien/*` - Staff pages
- `pages/BenhNhan/*` - Patient pages

### 2. **Business Logic Layer** (Services)
- Định nghĩa các operation liên quan đến domain
- Để communicate với API
- Chứa business rules & data transformations
- Không liên quan tới UI

**Service files:**
- `services/authService.ts` - Authentication operations
- `services/bacSiService.ts` - Doctor operations
- `services/benhNhanService.ts` - Patient operations

### 3. **State Management Layer** (Context)
- **AuthContext** - Toàn cầp authentication state
- Provide user info, role, token
- Thực hiện login/logout

```typescript
{
  user: NguoiDung | null,
  token: string | null,
  role: UserRole | null,
  isAuthenticated: boolean,
  login: (tenDangNhap, matKhau) => Promise<void>,
  logout: () => void
}
```

### 4. **HTTP Layer** (ApiClient + Axios)
- Centralized API communication
- Request interceptor - gắn token vào mọi request
- Response interceptor - handle 401, token refresh
- Error handling

### 5. **Type System** (TypeScript)
- Strong typing cho tất cả entities
- Type safety từ dev time
- Ngăn chặn runtime errors

**Type definitions trong `types/index.ts`:**
```typescript
interface NguoiDung {
  MaNguoiDung: number;
  TenDangNhap: string;
  HoTen: string;
  Email: string;
  VaiTro: string;
  // ...
}

type UserRole = 'Admin' | 'BacSi' | 'NhanVien' | 'BenhNhan';
```

## 🔐 Authentication & Authorization Flow

### Authentication (xác thực)
1. User enters credentials → Login page
2. `authService.login()` → Send POST to backend
3. Backend validates → Returns token + user info
4. `AuthContext` stores token & user in localStorage
5. Token sent with autorequests as `Authorization: Bearer {token}`

### Authorization (phân quyền)
1. `PrivateRoute` component checks `role`
2. If `allowedRoles` specified, verify user role
3. If unauthorized → Redirect to /login
4. If authorized → Render component
5. `Sidebar` dynamically renders menu based on role

### Role Routing Matrix

| Role | Dashboard | Available Routes |
|------|-----------|------------------|
| Admin | /admin | All management pages |
| BacSi | /bac-si | Schedule, patients, invoices |
| NhanVien | /nhan-vien | Appointments, patients |
| BenhNhan | /benh-nhan | Book appointment, my records |

## 🎯 Data Flow Example

### Scenario: Doctor views patient list

```
1. User navigates to /bac-si/benh-nhan-cua-toi

2. App routing layer (App.tsx)
   └─> Matches route
   └─> Renders <PrivateRoute> with component={BenhNhanCuaToi}

3. PrivateRoute validation
   └─> Checks useAuth() → role = 'BacSi'
   └─> Checks allowedRoles include 'BacSi' → true
   └─> Renders <BenhNhanCuaToi />

4. BenhNhanCuaToi component mounts
   └─> useEffect(() => {
       └─> Calls benhNhanService.getAllBenhNhan()
           └─> Service calls apiClient.get('/benh-nhan')
               └─> ApiClient interceptor adds token header
               └─> Sends: GET /api/benh-nhan
                         Headers: Authorization: Bearer {token}
       └─> Backend returns patients array
   └─> setPatients(data)
   └─> Render table with patient list

5. User sees patient list table
```

## 🔌 Service Pattern Example

```typescript
// bacSiService.ts
export const bacSiService = {
  // Get all doctors
  getAllBacSi: async (): Promise<BacSi[]> => {
    const response = await apiClient.get<ApiResponse<BacSi[]>>('/bac-si');
    return response.data.data || [];
  },

  // Get doctors by specialty
  getBacSiByChuyenKhoa: async (chuyenKhoaId: number): Promise<BacSi[]> => {
    const response = await apiClient.get<ApiResponse<BacSi[]>>(
      `/bac-si?maChuyenKhoa=${chuyenKhoaId}`
    );
    return response.data.data || [];
  },

  // Create new doctor
  createBacSi: async (data: Partial<BacSi>): Promise<BacSi> => {
    const response = await apiClient.post<ApiResponse<BacSi>>('/bac-si', data);
    return response.data.data;
  },

  // Update doctor
  updateBacSi: async (id: number, data: Partial<BacSi>): Promise<BacSi> => {
    const response = await apiClient.put<ApiResponse<BacSi>>(
      `/bac-si/${id}`,
      data
    );
    return response.data.data;
  },

  // Delete doctor
  deleteBacSi: async (id: number): Promise<void> => {
    await apiClient.delete(`/bac-si/${id}`);
  },
};
```

## 🛣️ Routing Hierarchy

```
/
├── /login                          (Public)
├── /admin                          (Admin only)
│   ├── /admin/nguoi-dung          (User Management)
│   ├── /admin/bac-si              (Doctor Management)
│   ├── /admin/benh-nhan           (Patient Management)
│   ├── /admin/chuyen-khoa         (Specialty Management)
│   ├── /admin/lich-hen            (Appointment Management)
│   └── /admin/hoa-don             (Invoice Management)
├── /bac-si                         (Doctor only)
│   ├── /bac-si/lich-lam-viec      (Work Schedule)
│   └── /bac-si/benh-nhan-cua-toi  (My Patients)
├── /nhan-vien                      (Staff only)
│   ├── /nhan-vien/lich-hen        (Appointments)
│   └── /nhan-vien/benh-nhan       (Patients)
└── /benh-nhan                      (Patient only)
    ├── /benh-nhan/dat-lich        (Book Appointment)
    ├── /benh-nhan/lich-hen        (My Appointments)
    ├── /benh-nhan/hoa-don         (My Invoices)
    └── /benh-nhan/ho-so           (Profile)
```

## 📦 Component Hierarchy

```
<App>
  ├── <AuthProvider>
  │   ├── <Router>
  │   │   ├── <Routes>
  │   │   │   ├── <Route path="/login">
  │   │   │   │   └── <Login />
  │   │   │   ├── <Route path="/admin">
  │   │   │   │   └── <PrivateRoute>
  │   │   │   │       ├── <Navbar />
  │   │   │   │       ├── <Sidebar />
  │   │   │   │       └── <AdminDashboard />
  │   │   │   └── ...
```

## 🎨 Component Composition

### Layout Components (Appear on protected routes)
- **Navbar** - Top navigation bar (user info, logout)
- **Sidebar** - Left navigation (role-based menu)
- **PrivateRoute** - Route protection wrapper

### Page Components (Main content)
- **Dashboard pages** - Overview & stats
- **Management pages** - CRUD tables & forms
- **Feature pages** - Role-specific features

## 🔄 State Management Decisions

### Why Context API?
- Small to medium app size
- Authentication state shared globally
- Avoid prop drilling
- Built into React

### When to consider Redux?
- App gets much larger (100+ components)
- Complex state with many interactions
- Time travel debugging needed

## 🧪 Testing Strategy

### Unit Tests
```typescript
// bác sĩ service test
test('getAllBacSi should return array of doctors', async () => {
  const doctors = await bacSiService.getAllBacSi();
  expect(Array.isArray(doctors)).toBe(true);
});
```

### Integration Tests
```typescript
// Authentication flow test
test('login should set token and user in context', async () => {
  const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
  await act(async () => {
    await result.current.login('admin', 'password');
  });
  expect(result.current.isAuthenticated).toBe(true);
  expect(result.current.user).toBeDefined();
});
```

### E2E Tests
```typescript
// User journey test
test('user can login and navigate to dashboard', async () => {
  cy.visit('http://localhost:3000');
  cy.get('input[name="tenDangNhap"]').type('admin@test.com');
  cy.get('input[name="matKhau"]').type('password');
  cy.get('button[type="submit"]').click();
  cy.should('have.url', 'http://localhost:3000/admin');
});
```

## 📊 Performance Considerations

### Optimization Techniques
1. **React.memo** - Prevent unnecessary re-renders
2. **useCallback** - Prevent callback recreation
3. **useMemo** - Cache computed values
4. **Code splitting** - Lazy load components
5. **Virtual scrolling** - For large lists

```typescript
// Example: Memoized component
const BenhNhanRow = React.memo(({ benhNhan, onEdit, onDelete }) => {
  return (
    <tr>
      <td>{benhNhan.HoTen}</td>
      <button onClick={() => onEdit(benhNhan.MaBenhNhan)}>Edit</button>
    </tr>
  );
}, (prevProps, nextProps) => {
  return prevProps.benhNhan?.MaBenhNhan === nextProps.benhNhan?.MaBenhNhan;
});
```

## 🔍 Error Handling

### API Errors
```typescript
try {
  const patients = await benhNhanService.getAllBenhNhan();
} catch (error) {
  if (error.response?.status === 401) {
    // Token expired - logout
    logout();
  } else {
    setError(error.message);
  }
}
```

### Type Safety
```typescript
// Ensure type safety in service calls
const handleDelete = async (id: number): Promise<void> => {
  try {
    await adminService.deleteUser(id);  // Type-checked at compile time
  } catch (error) {
    handleError(error);
  }
};
```

## 🚀 Future Improvements

1. **Authentication**
   - [ ] Implement refresh token mechanism
   - [ ] Add 2FA support
   - [ ] Session timeout handling

2. **Performance**
   - [ ] Implement virtual scrolling for large tables
   - [ ] Add request caching
   - [ ] Lazy load page components

3. **Features**
   - [ ] Real-time notifications (WebSocket)
   - [ ] Export to PDF/Excel
   - [ ] Advanced filtering & search
   - [ ] Multi-language support

4. **Code Quality**
   - [ ] Add comprehensive test coverage
   - [ ] Implement error tracking (Sentry)
   - [ ] Add analytics
   - [ ] Code quality monitoring (SonarQube)

## 📚 References

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [React Router Documentation](https://reactrouter.com)
- [Axios Documentation](https://axios-http.com)
