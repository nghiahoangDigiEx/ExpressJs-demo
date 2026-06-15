# Express TypeScript Project

Dự án mẫu sử dụng framework **Express** kết hợp với **TypeScript**, được cấu hình sẵn môi trường phát triển (Development) và sản xuất (Production).

## 🚀 Yêu cầu hệ thống

Trước khi bắt đầu, hãy đảm bảo máy tính của bạn đã cài đặt:
* **Node.js** (Khuyến nghị phiên bản LTS mới nhất)
* **npm** hoặc **yarn**

## 📦 Hướng dẫn cài đặt

Cài đặt toàn bộ các thư viện phụ thuộc (dependencies và devDependencies) bằng lệnh:

```bash
npm install
```

## 🛠️ Các lệnh chạy chương trình

Dự án sử dụng `package.json` với các script được cấu hình sẵn để biên dịch từ TypeScript (`.ts`) sang JavaScript (`.js`) trong thư mục `dist/`.

### 1. Chạy ở môi trường Phát triển (Development Mode)

Chạy lệnh này để lập trình. Hệ thống sẽ tự động biên dịch lại khi bạn thay đổi code (Hot-reload bằng `nodemon` và `concurrently`):

```bash
npm run dev
```

### 2. Chạy ở môi trường Sản xuất (Production Mode)

Lệnh này sẽ tự động xóa thư mục cũ, biên dịch dự án và chạy ứng dụng ở chế độ tối ưu cho môi trường Production:

```bash
npm start
```

### 3. Biên dịch thủ công (Build)

Nếu chỉ muốn biên dịch mã nguồn từ file `.ts` sang `.js` mà không chạy server:

```bash
npm run build
```

## 📂 Cấu trúc thư mục chính

* `index.ts`: File chạy chính của ứng dụng (Entry point).
* `dist/`: Thư mục chứa mã nguồn JavaScript sau khi được biên dịch (Tự động sinh ra khi build).
* `package.json`: Quản lý thư viện và scripts chạy dự án.
