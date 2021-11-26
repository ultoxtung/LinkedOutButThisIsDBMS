# Bài tập Hệ quản trị cơ sở dữ liệu (INT3202 5)
Bài tập Phát Triển Ứng Dụng Web (INT3306 30), được nâng cấp với hàng loạt kỹ thuật tối ưu hóa csdl để làm bài tập Hệ quản trị cơ sở dữ liệu (INT3202 5).

## Cài đặt và chạy

### 1. Cài đặt

Cài đặt `docker` và `docker-compose`.

Linux (Debian based):
```bash
apt install docker.io docker-compose
```
Linux (Arch based)
```
pacman -S docker
```
Windows:

Cài đặt `Docker Desktop` dựa trên `wsl` hoặc `wsl2` theo [hướng dẫn](https://docs.docker.com/docker-for-windows/install/).

### 2. Chạy

Clone project từ github

```
git clone https://github.com/HKAB/summer-weeb-1920H_PTUDW
```

Nếu đây là lần khởi chạy project đầu tiên, chạy file `build.sh`
```
./build.sh
```
~~(Cái VM WFH xơi hết ổ C: rồi, ai viết hộ em file batch script với)~~ ☆⌒(>。<)

Từ các lần sau, chỉ cần sử dụng `docker-compose up -d` để chạy project

## Sử dụng

Truy cập http://localhost/ để sử dụng trang web.


![sample.gif](sample.gif)

Ngoài ra người dùng có thể truy cập một số dịch vụ khác.
- MySQL Master Server: `localhost:3307` (tài khoản và mật khẩu `backend:backend`)
- MySQL Slave Server: `localhost:3308` (tài khoản và mật khẩu `replica:replica`)
- Redis Cache Server: `localhost:6379`
- Consul Dashboard: http://localhost:8500/
- Prometheus + Grafana Dashboard: http://localhost:8002/ (tài khoản và mật khẩu mặc định: `admin:admin`)
- Admin UI: http://localhost/admin

## Dữ liệu mẫu

Có thể sử dụng dữ liệu mẫu tại đây: [Data-sample.sql](https://drive.google.com/file/d/1BJadLWDux6dK41ioh9hWMaXNjvmAqWyI/view?usp=sharing)

Import dữ liệu trên vào MySQL Master Server thông qua `localhost:3307`, database schema là `backend`, tài khoản và mật khẩu `backend:backend`. Dữ liệu sẽ được tự động đồng bộ vào Slave Server ngay sau đó.

Trong bộ dữ liệu mẫu có:
- 6 tài khoản sinh viên: `student1` - `student6`, mật khẩu giống tên tài khoản.
- 3 tài khoản doanh nghiệp: `company7` - `company9`, mật khẩu giống tên tài khoản.
- Các tags về `Kỹ năng`, `Địa điểm`, `Trường Đại học`.
- Tài khoản quản trị: `admin:admin` (Đăng nhập tại http://localhost/admin)
