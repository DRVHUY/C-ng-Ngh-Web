# DEVELOPMENT_GUIDE.md - Guide cho Developer

## 🎯 Mục Đích

Hướng dẫn để developer mới nhanh chóng hiểu cấu trúc project và bắt đầu contributing code.

## 🛠️ Setup Environment

### 1. Prerequisites
- Node.js >= 14.x
- npm >= 6.x hoặc yarn >= 1.22.x
- Git
- IDE: VS Code (recommended)

### 2. Clone & Install
```bash
git clone <repository>
cd FE-QuanLyPhongKham
npm install
```

### 3. Environment Configuration
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
REACT_APP_API_BASE_URL=http://localhost:7000/api
REACT_APP_DEBUG=true
```

### 4. Start Development
```bash
npm start
```

App sẽ mở tại `http://localhost:3000`

## 📂 Project Structure

### Directories
```
src/
├── pages/              # Route-level components (mỗi trang là 1 component)
├── components/         # Reusable components (Navbar, Sidebar, etc)
├── context/            # React Context (AuthContext)
├── services/           # API call functions
├── types/              # TypeScript interfaces & types
├── utils/              # Utility functions (ApiClient)
├── constant/           # Constants & config
├── styles/             # CSS files
├── App.tsx            # Main app routing
└── index.tsx          # Entry point
```

### File Naming Conventions
```
PascalCase.tsx    # React components
camelCase.ts      # TypeScript utilities, services
UPPER_CASE        # Constants
```

## 🎨 Component Development

### Creating a New Page Component

1. **Create file** in `src/pages/{RoleName}/{FeatureName}.tsx`

```typescript
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import '../../styles/Dashboard.css';

interface MyData {
  id: number;
  name: string;
}

const MyPage: React.FC = () => {
  const [data, setData] = useState<MyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // TODO: Call service
        setData([]);
      } catch (err) {
        setError('Error message');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-layout">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="content">
          <h1>My Page</h1>
          {error && <div className="error-alert">{error}</div>}
          {/* Content here */}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
```

2. **Add route** in `src/App.tsx`

```typescript
<Route
  path="/my-page"
  element={<PrivateRoute component={MyPage} allowedRoles={['Admin']} />}
/>
```

3. **Update Sidebar** in `src/components/Sidebar.tsx`

```typescript
case 'Admin':
  return [
    { label: 'Dashboard', path: '/admin' },
    { label: 'My New Page', path: '/my-page' },
  ];
```

### Creating a Reusable Component

1. **Create file** in `src/components/{ComponentName}.tsx`

```typescript
import React from 'react';

interface MyComponentProps {
  title: string;
  onAction?: () => void;
}

const MyComponent: React.FC<MyComponentProps> = ({ title, onAction }) => {
  return (
    <div>
      <h3>{title}</h3>
      {onAction && <button onClick={onAction}>Action</button>}
    </div>
  );
};

export default MyComponent;
```

2. **Use component** in pages/other components

```typescript
import MyComponent from '../../components/MyComponent';

// In render
<MyComponent title="Hello" onAction={() => console.log('clicked')} />
```

## 🔗 API Integration

### 1. Create Service File

```typescript
// src/services/myService.ts
import { ApiResponse } from '../types';
import { apiClient } from '../utils/ApiClient';

interface MyEntity {
  id: number;
  name: string;
}

export const myService = {
  getAll: async (): Promise<MyEntity[]> => {
    const response = await apiClient.get<ApiResponse<MyEntity[]>>('/my-endpoint');
    return response.data.data || [];
  },

  getById: async (id: number): Promise<MyEntity> => {
    const response = await apiClient.get<ApiResponse<MyEntity>>(`/my-endpoint/${id}`);
    return response.data.data;
  },

  create: async (data: Partial<MyEntity>): Promise<MyEntity> => {
    const response = await apiClient.post<ApiResponse<MyEntity>>('/my-endpoint', data);
    return response.data.data;
  },

  update: async (id: number, data: Partial<MyEntity>): Promise<MyEntity> => {
    const response = await apiClient.put<ApiResponse<MyEntity>>(`/my-endpoint/${id}`, data);
    return response.data.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/my-endpoint/${id}`);
  },
};
```

### 2. Use Service in Component

```typescript
import { myService } from '../../services/myService';

useEffect(() => {
  myService.getAll()
    .then(data => setItems(data))
    .catch(err => setError(err.message));
}, []);
```

## 💾 Types & TypeScript

### Adding Types

1. **Add to** `src/types/index.ts`

```typescript
interface MyEntity {
  id: number;
  name: string;
  createdAt: string;
}

type MyEntityResponse = ApiResponse<MyEntity>;
```

2. **Use in components**

```typescript
import { MyEntity } from '../types';

const [items, setItems] = useState<MyEntity[]>([]);
```

### Common Type Patterns

```typescript
// API Response
interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

// Async State
const [data, setData] = useState<T | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');

// Optional props
interface ComponentProps {
  required: string;
  optional?: string;
  children?: React.ReactNode;
}
```

## 🧠 State Management

### Using AuthContext

```typescript
import { useAuth } from '../context/AuthContext';

const MyComponent = () => {
  const { user, role, isAuthenticated, logout } = useAuth();
  
  return (
    <div>
      <p>{user?.HoTen}</p>
      <p>{role}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
```

### Local State for Component Data

```typescript
const [items, setItems] = useState<Item[]>([]);
const [selectedId, setSelectedId] = useState<number | null>(null);

// Derived state
const selectedItem = items.find(i => i.id === selectedId);
```

## 🎨 Styling

### Global Styles
- Edit `src/styles/index.css` cho global CSS

### Component Styles
- Create corresponding `.css` file
- Import in component: `import './MyComponent.css'`
- Use class names: `<div className="my-component">`

### CSS Guidelines
```css
/* Use BEM naming convention */
.component {}
.component__header {}
.component__body {}
.component--active {}

/* Responsive breakpoint */
@media (max-width: 768px) {
  .component {
    /* mobile styles */
  }
}
```

## 🧪 Testing

### Manual Testing Checklist

Before push code:

- [ ] Component renders without errors
- [ ] All props validated
- [ ] API calls work
- [ ] Error states handled
- [ ] Loading states visible
- [ ] Responsive on mobile
- [ ] Browser console no errors/warnings

### Browser DevTools
```
Chrome DevTools:
1. Open DevTools (F12)
2. Go to Console tab - check for errors
3. Go to Network tab - check API calls
4. Go to Application tab - check localStorage
5. Check mobile view (Ctrl+Shift+M)
```

## 🐛 Debugging

### Debug Mode
Set `REACT_APP_DEBUG=true` in `.env.local`

```typescript
if (DEBUG) {
  console.log('Debug info');
}
```

### Common Issues & Solutions

**Issue**: Component not updating after state change
```typescript
// Wrong - mutating state directly
state.push(newItem);

// Correct - create new array
setState([...state, newItem]);
```

**Issue**: useEffect running infinitely
```typescript
// Wrong - dependency array missing
useEffect(() => { /* code */ });

// Correct - add dependency array
useEffect(() => { /* code */ }, []);
```

**Issue**: Token not attached to request
```typescript
// Check localStorage
console.log(localStorage.getItem('token'));

// Check interceptor - it's in ApiClient.ts
// Verify token format: 'Bearer {token}'
```

## 📝 Code Conventions

### Naming
```typescript
// Components & Types - PascalCase
const MyComponent: React.FC = () => {};
interface MyInterface {}

// Functions & Variables - camelCase
const myVariable = '';
const myFunction = () => {};

// Constants - UPPER_CASE
const API_URL = '';
const MY_CONSTANT = 123;

// Classes - PascalCase
class MyClass {}
```

### Comments
```typescript
// Use meaningful comments - what and why, not what is obvious
// Good
// Redirect admin to dashboard instead of home page
if (isAdmin) navigate('/admin');

// Bad
// Check if admin
if (isAdmin) { /* ... */ }
```

### Formatting
- Use Prettier/ESLint settings if configured
- Indentation: 2 spaces
- Max line length: 100 characters (not required)

## 🚀 Performance Tips

1. **Memoize components**
```typescript
const MyComponent = React.memo(({ prop }) => {
  return <div>{prop}</div>;
});
```

2. **Use useCallback for functions**
```typescript
const handleClick = useCallback(() => {
  // expensive operation
}, [dependency]);
```

3. **Use useMemo for computed values**
```typescript
const sortedItems = useMemo(() => {
  return items.sort((a, b) => a.id - b.id);
}, [items]);
```

4. **Lazy load components**
```typescript
const LazyComponent = lazy(() => 
  import('./LazyComponent')
);

// In render
<Suspense fallback={<Loading />}>
  <LazyComponent />
</Suspense>
```

## 📚 Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [React Router Guide](https://reactrouter.com)
- [Axios Documentation](https://axios-http.com)

## ❓ FAQ

**Q: How to add new page?**
A: Create file in pages/{Role}/{Page}.tsx, add route in App.tsx, update Sidebar

**Q: How to call API?**
A: Create service in services/, use in component with useEffect

**Q: How to check user role?**
A: Use useAuth() hook from AuthContext

**Q: How to add global CSS?**
A: Add to styles/index.css

**Q: How to fix CORS error?**
A: Configure CORS on backend or setup proxy in development

---

Happy Coding! 🚀
