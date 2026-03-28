import axios, { AxiosInstance, AxiosError } from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:7000/api';

class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Interceptor - Thêm token vào mỗi request
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Interceptor - Xử lý response
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Token hết hạn hoặc không hợp lệ
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  get<T>(url: string, config = {}) {
    return this.axiosInstance.get<T>(url, config);
  }

  post<T>(url: string, data = {}, config = {}) {
    return this.axiosInstance.post<T>(url, data, config);
  }

  put<T>(url: string, data = {}, config = {}) {
    return this.axiosInstance.put<T>(url, data, config);
  }

  delete<T>(url: string, config = {}) {
    return this.axiosInstance.delete<T>(url, config);
  }
}

export default new ApiClient();
