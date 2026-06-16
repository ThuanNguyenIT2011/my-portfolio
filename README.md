# Personal Portfolio Website

Website portfolio cá nhân được xây dựng bằng **Vite + React + TypeScript + Tailwind CSS**, deploy miễn phí lên **GitHub Pages**.

## Cài đặt & Chạy local

```bash
npm install
npm run dev
```

Truy cập `http://localhost:5173` để xem kết quả.

---

## Cách sửa nội dung (chỉ cần sửa file JSON)

Tất cả dữ liệu nằm trong thư mục `public/data/`. Bạn chỉ cần sửa file JSON rồi push lên GitHub, website sẽ tự cập nhật — **không cần đụng vào code**.

### `public/data/profile.json`
Thông tin cá nhân: tên, chức danh, bio, email, mạng xã hội.

| Trường | Mô tả |
|--------|-------|
| `name` | Họ tên đầy đủ |
| `title` | Chức danh (hiển thị dưới tên) |
| `avatar` | Đường dẫn ảnh trong thư mục `public/` (vd: `images/avatar.jpg`) |
| `tagline` | Câu slogan ngắn |
| `bio` | Đoạn giới thiệu dài |
| `location` | Địa điểm |
| `email` | Email liên hệ |
| `socials` | Danh sách mạng xã hội, `icon` nhận: `github`, `linkedin`, `twitter`, `website`, `email` |

### `public/data/education.json`
Danh sách học vấn (array). `degree` nhận: `"Bachelor"` / `"Master"` / `"PhD"` — hiển thị badge màu khác nhau.

### `public/data/experience.json`
Danh sách công ty (array). Mỗi công ty có mảng `projects` lồng bên trong. Click vào thẻ công ty sẽ mở modal hiển thị chi tiết từng dự án.

- `logo`: đường dẫn logo trong `public/` (vd: `images/company1.png`)
- `technologies`: mảng string, hiển thị dạng chip/tag

### `public/data/papers.json`
Danh sách bài báo. `type` nhận: `"Journal"` / `"Conference"` / `"Preprint"`.
- Có thể filter theo `type` và `tags` trực tiếp trên giao diện.
- Nếu có `doi`, link sẽ tự tạo thành `https://doi.org/<doi>`.

### `public/data/achievements.json`
Danh sách thành tích, chứng chỉ, giải thưởng.

---

## Thêm ảnh

Đặt file ảnh vào `public/images/` rồi tham chiếu trong JSON:
```json
"avatar": "images/avatar.jpg"
```

---

## Deploy lên GitHub Pages

### Bước 1 — Set tên repo trong `vite.config.ts`

Mở file [`vite.config.ts`](./vite.config.ts) và thay `<REPO_NAME>` bằng tên repository của bạn:

```ts
base: '/tên-repo-của-bạn/',
```

Ví dụ nếu repo là `https://github.com/username/my-portfolio` thì đặt:
```ts
base: '/my-portfolio/',
```

### Bước 2 — Tạo repository và push code

```bash
git init
git add .
git commit -m "Initial portfolio"
git remote add origin https://github.com/<username>/<repo-name>.git
git push -u origin main
```

### Bước 3 — Bật GitHub Pages

1. Vào tab **Settings** của repository.
2. Chọn **Pages** ở sidebar trái.
3. Mục **Source** → chọn **GitHub Actions**.
4. Mỗi lần push vào nhánh `main`, GitHub Actions sẽ tự build và deploy.

Website sẽ có URL dạng: `https://<username>.github.io/<repo-name>/`

---

## Cấu trúc thư mục

```
├── public/
│   ├── data/
│   │   ├── profile.json
│   │   ├── education.json
│   │   ├── experience.json
│   │   ├── papers.json
│   │   └── achievements.json
│   └── images/          ← đặt ảnh avatar, logo công ty ở đây
├── src/
│   ├── components/      ← các React component
│   ├── hooks/           ← useFetch, useTheme
│   ├── types/           ← TypeScript interfaces
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .github/workflows/deploy.yml
├── vite.config.ts
└── README.md
```
