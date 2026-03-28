# Hệ Thống Quản Lý Phòng Khám

Ứng dụng web full-stack để quản lý phòng khám, được xây dựng với Backend Node.js (Kiến trúc Layered) và Frontend React (Kiến trúc Component-Based).

## Tính năng

### Xác thực & Phân quyền
- Đăng nhập dựa trên vai trò: Admin, Lễ tân, Bác Sĩ → Bảng điều khiển Quản trị
- Bệnh nhân đăng nhập → Cổng thông tin Bệnh nhân với quyền truy cập dữ liệu cá nhân

### Cổng thông tin Bệnh nhân
- Đặt lịch hẹn
- Xem lịch làm việc của bác sĩ
- Xem và hủy lịch hẹn cá nhân
- Xem hồ sơ bệnh án
- Xem đơn thuốc
- Xem hóa đơn

### Bảng điều khiển Quản trị
- Quản lý hoạt động phòng khám (bác sĩ, bệnh nhân, v.v.)

## Cấu trúc Dự án

- **BE/**: Backend Node.js với TypeScript, Express, Sequelize, và SQL Server
- **quan-ly-phong-kham-FE/**: Frontend React với TypeScript

## Tính năng Backend

- Kiến trúc Layered: Routes -> Controllers -> Services -> Repositories -> Models
- Xác thực với JWT
- CRUD operations cho bác sĩ, bệnh nhân, lịch hẹn, v.v.
- Tích hợp cơ sở dữ liệu SQL Server

## Tính năng Frontend

- Kiến trúc Component-Based
- Điều hướng React Router
- Axios cho API calls
- Điều hướng dựa trên vai trò: Admin/Lễ tân/Bác sĩ → Bảng điều khiển Quản trị, Bệnh nhân → Cổng thông tin Bệnh nhân
- Cổng thông tin Bệnh nhân: Đặt lịch, xem lịch trình, quản lý dữ liệu cá nhân

## Cài đặt

### Backend

1. Điều hướng đến thư mục BE: `cd BE`
2. Cài đặt dependencies: `npm install`
3. Cấu hình cơ sở dữ liệu trong file `.env`
4. Build: `npm run build`
5. Chạy: `npm start` hoặc `npm run dev` cho chế độ phát triển

### Frontend

1. Điều hướng đến thư mục quan-ly-phong-kham-FE: `cd quan-ly-phong-kham-FE`
2. Cài đặt dependencies: `npm install`
3. Chạy: `npm start`

## Cơ sở dữ liệu

Chạy script SQL trong `BE/database/DoAn3 chinh sua.sql` để thiết lập cơ sở dữ liệu.