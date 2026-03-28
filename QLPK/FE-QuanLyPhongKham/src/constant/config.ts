// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:7000/api';

// App Configuration
export const APP_NAME = process.env.REACT_APP_NAME || 'Clinic Management System';
export const APP_VERSION = process.env.REACT_APP_VERSION || '1.0.0';

// Feature Flags
export const DEBUG = process.env.REACT_APP_DEBUG === 'true';
export const ENABLE_LOGGING = process.env.REACT_APP_ENABLE_LOGGING === 'true';

// Token Configuration
export const TOKEN_KEY = 'token';
export const USER_KEY = 'user';
export const ROLE_KEY = 'role';

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/nguoi-dung/login',
    LOGOUT: '/nguoi-dung/logout',
    REFRESH: '/nguoi-dung/refresh-token',
  },
  USERS: {
    GET_ALL: '/nguoi-dung',
    GET_BY_ID: (id: number) => `/nguoi-dung/${id}`,
    CREATE: '/nguoi-dung',
    UPDATE: (id: number) => `/nguoi-dung/${id}`,
    DELETE: (id: number) => `/nguoi-dung/${id}`,
  },
  DOCTORS: {
    GET_ALL: '/bac-si',
    GET_BY_ID: (id: number) => `/bac-si/${id}`,
    GET_BY_SPECIALTY: (specialtyId: number) => `/bac-si?maChuyenKhoa=${specialtyId}`,
    CREATE: '/bac-si',
    UPDATE: (id: number) => `/bac-si/${id}`,
    DELETE: (id: number) => `/bac-si/${id}`,
  },
  PATIENTS: {
    GET_ALL: '/benh-nhan',
    GET_BY_ID: (id: number) => `/benh-nhan/${id}`,
    CREATE: '/benh-nhan',
    UPDATE: (id: number) => `/benh-nhan/${id}`,
    DELETE: (id: number) => `/benh-nhan/${id}`,
  },
  SPECIALTIES: {
    GET_ALL: '/chuyen-khoa',
    GET_BY_ID: (id: number) => `/chuyen-khoa/${id}`,
    CREATE: '/chuyen-khoa',
    UPDATE: (id: number) => `/chuyen-khoa/${id}`,
    DELETE: (id: number) => `/chuyen-khoa/${id}`,
  },
  APPOINTMENTS: {
    GET_ALL: '/lich-hen',
    GET_BY_ID: (id: number) => `/lich-hen/${id}`,
    CREATE: '/lich-hen',
    UPDATE: (id: number) => `/lich-hen/${id}`,
    DELETE: (id: number) => `/lich-hen/${id}`,
    BOOK: '/lich-hen/book',
  },
  INVOICES: {
    GET_ALL: '/hoa-don',
    GET_BY_ID: (id: number) => `/hoa-don/${id}`,
    CREATE: '/hoa-don',
    UPDATE: (id: number) => `/hoa-don/${id}`,
    DELETE: (id: number) => `/hoa-don/${id}`,
  },
};

// User Roles
export const USER_ROLES = {
  ADMIN: 'Admin',
  DOCTOR: 'BacSi',
  STAFF: 'NhanVien',
  PATIENT: 'BenhNhan',
} as const;

// Route Paths
export const ROUTE_PATHS = {
  LOGIN: '/login',
  
  ADMIN: {
    DASHBOARD: '/admin',
    USERS: '/admin/nguoi-dung',
    DOCTORS: '/admin/bac-si',
    PATIENTS: '/admin/benh-nhan',
    SPECIALTIES: '/admin/chuyen-khoa',
    APPOINTMENTS: '/admin/lich-hen',
    INVOICES: '/admin/hoa-don',
  },
  
  DOCTOR: {
    DASHBOARD: '/bac-si',
    SCHEDULE: '/bac-si/lich-lam-viec',
    MY_PATIENTS: '/bac-si/benh-nhan-cua-toi',
  },
  
  STAFF: {
    DASHBOARD: '/nhan-vien',
    APPOINTMENTS: '/nhan-vien/lich-hen',
    PATIENTS: '/nhan-vien/benh-nhan',
  },
  
  PATIENT: {
    DASHBOARD: '/benh-nhan',
    BOOK_APPOINTMENT: '/benh-nhan/dat-lich',
    MY_APPOINTMENTS: '/benh-nhan/lich-hen',
    MY_INVOICES: '/benh-nhan/hoa-don',
    PROFILE: '/benh-nhan/ho-so',
  },
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZES: [10, 20, 50, 100],
} as const;

// Date Format
export const DATE_FORMAT = 'DD/MM/YYYY';
export const DATETIME_FORMAT = 'DD/MM/YYYY HH:mm';

// Request Timeout
export const REQUEST_TIMEOUT = 30000; // 30 seconds

// Retry Configuration
export const RETRY_CONFIG = {
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // milliseconds
} as const;
