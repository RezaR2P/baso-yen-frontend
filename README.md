# 🥩 Baso Yen — Frontend

[![Node.js](https://img.shields.io/badge/Node.js-v18+-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5+-purple)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

**Frontend untuk Baso Yen** — Aplikasi web modern dibangun dengan React + Vite dan desain NeoBrutalism. Menyediakan UI publik dan panel admin (CMS) untuk mengelola produk, resep, artikel, dan pesan kontak.

> 🔗 **Backend Repository:** [baso-yen-backend](https://github.com/RezaR2P/baso-yen-backend)

---

## 📖 Daftar Isi

- [🎯 Ringkasan](#-ringkasan)
- [📋 Tech Stack](#-tech-stack)
- [⚙️ Prasyarat](#️-prasyarat)
- [🚀 Instalasi & Setup](#-instalasi--setup)
- [📁 Struktur Proyek](#-struktur-proyek)
- [🗺️ Routing & Halaman](#️-routing--halaman)
- [🎨 Design System](#-design-system)
- [⚡ Script & Command](#-script--command)
- [🔑 Environment Variables](#-environment-variables)
- [🔌 API Integration](#-api-integration)
- [🔐 Login Admin](#-login-admin)
- [🐛 Troubleshooting](#-troubleshooting)
- [🤝 Kontribusi](#-kontribusi)
- [📝 License](#-license)

---

## 🎯 Ringkasan

**Baso Yen Frontend** adalah aplikasi e-commerce dan CMS untuk produk makanan Indonesia. Terdiri dari dua bagian:

1. **Halaman Publik** — Tampilan untuk pelanggan (home, produk, resep, artikel, kontak)
2. **Panel Admin** — Dashboard CMS untuk mengelola konten dan data (login di `/admin/login`)

Stack: React 18, Vite, Tailwind CSS, React Router, Axios

---

## 📋 Tech Stack

| Teknologi                   | Fungsi                            |
| --------------------------- | --------------------------------- |
| **React 18**                | UI framework                      |
| **Vite 5**                  | Build tool & dev server           |
| **Tailwind CSS**            | Utility-first styling             |
| **React Router DOM**        | Client-side routing               |
| **Axios**                   | HTTP client untuk API calls       |
| **NeoBrutalism**            | Custom design system              |
| **Swiper**                  | Carousel/slider components        |
| **@tailwindcss/typography** | Styling untuk konten HTML dinamis |

---

## ⚙️ Prasyarat

Pastikan sudah terinstall:

- **Node.js** v18 atau lebih baru ([download](https://nodejs.org/))
- **npm** v9+ atau **pnpm** v7+ (biasanya sudah bundled dengan Node.js)
- **Git** ([download](https://git-scm.com/))
- **Backend Baso Yen** sudah berjalan di `http://localhost:3000`

Cek versi:

```bash
node --version
npm --version
```

---

## 🚀 Instalasi & Setup

### 1. Clone Repository

```bash
git clone https://github.com/RezaR2P/baso-yen-frontend.git
cd baso-yen-frontend
```

### 2. Install Dependencies

```bash
npm install
```

Atau gunakan `pnpm`:

```bash
pnpm install
```

### 3. Setup Environment Variables

Buat file `.env` di root folder (bisa copy dari `.env.example`):

```env
VITE_API_URL=http://localhost:3000/api
VITE_SERVER_URL=http://localhost:3000
```

**Catatan:** Sesuaikan URL jika backend berjalan di port atau host lain.

### 4. Jalankan Development Server

```bash
npm run dev
```

Frontend akan tersedia di **`http://localhost:5173`**

### 5. Build untuk Produksi

```bash
npm run build
```

Hasil build akan ada di folder `dist/`

---

## 📁 Struktur Proyek

```
frontend/
├── src/
│   ├── assets/                      # Gambar, icon, aset statis
│   ├── components/
│   │   ├── AdminLayout.jsx          # Wrapper layout admin
│   │   ├── PublicLayout.jsx         # Wrapper layout publik
│   │   ├── Navbar.jsx               # Navigation bar
│   │   ├── Footer.jsx               # Footer
│   │   ├── Button.jsx               # Tombol NeoBrutalism
│   │   ├── Card.jsx                 # Card NeoBrutalism
│   │   └── ProtectedRoute.jsx       # Route guard (admin)
│   ├── pages/
│   │   ├── public/                  # Halaman publik
│   │   │   ├── Home.jsx             # Homepage
│   │   │   ├── Produk.jsx           # List produk
│   │   │   ├── ProdukDetail.jsx     # Detail produk
│   │   │   ├── Resep.jsx            # List resep
│   │   │   ├── ResepDetail.jsx      # Detail resep
│   │   │   ├── Artikel.jsx          # List artikel
│   │   │   ├── ArtikelDetail.jsx    # Detail artikel
│   │   │   ├── Layanan.jsx          # Halaman layanan
│   │   │   ├── TentangKami.jsx      # Tentang perusahaan
│   │   │   └── Kontak.jsx           # Form kontak
│   │   └── admin/                   # Halaman admin CMS
│   │       ├── AdminLogin.jsx       # Form login
│   │       ├── AdminDashboard.jsx   # Dashboard
│   │       ├── AdminProducts.jsx    # CRUD produk
│   │       ├── AdminCategories.jsx  # CRUD kategori
│   │       ├── AdminRecipes.jsx     # CRUD resep
│   │       ├── AdminArticles.jsx    # CRUD artikel
│   │       └── AdminContacts.jsx    # Kelola pesan
│   ├── services/                    # API calls & utilities
│   │   ├── api.js                   # Axios instance + interceptor
│   │   ├── authService.js           # Login/logout
│   │   ├── productService.js        # CRUD produk
│   │   ├── categoryService.js       # CRUD kategori
│   │   ├── recipeService.js         # CRUD resep
│   │   ├── articleService.js        # CRUD artikel
│   │   └── contactService.js        # Kelola kontak
│   ├── App.jsx                      # Routing utama
│   ├── main.jsx                     # Entry point
│   └── index.css                    # Global styles + Tailwind config
├── public/                          # Static assets (favicon, dll)
├── .env                             # Environment variables (local)
├── .env.example                     # Template .env
├── .gitignore                       # Git ignore rules
├── package.json                     # Dependencies & scripts
├── vite.config.js                   # Vite configuration
├── tailwind.config.js               # Tailwind configuration
├── eslint.config.js                 # ESLint rules
├── index.html                       # HTML root
├── README.md                        # File ini
├── CONTRIBUTING.md                  # Panduan kontribusi
└── LICENSE                          # Lisensi MIT
```

---

## 🗺️ Routing & Halaman

### 📱 Halaman Publik

| URL              | Nama           | Deskripsi                          |
| ---------------- | -------------- | ---------------------------------- |
| `/`              | Home           | Halaman utama + hero + CTA         |
| `/produk`        | Daftar Produk  | List produk dengan filter kategori |
| `/produk/:slug`  | Detail Produk  | Info lengkap produk                |
| `/resep`         | Daftar Resep   | List resep masakan                 |
| `/resep/:slug`   | Detail Resep   | Bahan + langkah pembuatan          |
| `/artikel`       | Daftar Artikel | Blog/artikel mengenai produk       |
| `/artikel/:slug` | Detail Artikel | Full artikel content               |
| `/layanan`       | Layanan        | Info layanan B2C dan B2B           |
| `/tentang-kami`  | Tentang Kami   | Sejarah + sertifikasi perusahaan   |
| `/kontak`        | Kontak         | Form kontak + info lokasi          |

### 🛠️ Halaman Admin (CMS)

| URL                 | Nama            | Deskripsi                       |
| ------------------- | --------------- | ------------------------------- |
| `/admin/login`      | Login Admin     | Form login (email + password)   |
| `/admin/dashboard`  | Dashboard       | Statistik & overview data       |
| `/admin/products`   | Kelola Produk   | CRUD produk + upload foto       |
| `/admin/categories` | Kelola Kategori | CRUD kategori produk            |
| `/admin/recipes`    | Kelola Resep    | CRUD resep + upload foto        |
| `/admin/articles`   | Kelola Artikel  | CRUD artikel + upload thumbnail |
| `/admin/contacts`   | Pesan Masuk     | Lihat + balas pesan kontak      |

---

## 🎨 Design System

### Warna & Styling (NeoBrutalism)

Tema warna didefinisikan di `src/index.css`:

```css
@theme {
  --color-primary: #f97316; /* Oranye utama */
  --color-primary-dark: #ea580c; /* Oranye hover */
  --color-black: #1a1a1a; /* Hitam */
  --color-white: #fffbf5; /* Putih hangat */
  --color-bg: #fff8f0; /* Background */
  --shadow-nb: 4px 4px 0 #1a1a1a;
  --shadow-nb-lg: 6px 6px 0 #1a1a1a;
  --shadow-nb-sm: 2px 2px 0 #1a1a1a;
}
```

### Komponen Utama

- **Button** — Variant `"primary"` (oranye) atau `"secondary"` (putih dengan border tebal)
- **Card** — Border tebal + shadow "shifted" khas NeoBrutalism
- **Layout** — Padding konsisten, spacing units (4px, 8px, 16px)

### Penggunaan Komponen

```jsx
// Button
<Button variant="primary" onClick={handleClick}>Click Me</Button>

// Card
<Card title="Product" description="Product info">
  <img src={image} alt="product" />
</Card>
```

---

## ⚡ Script & Command

Semua script didefinisikan di `package.json`:

| Command           | Fungsi                               |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Jalankan dev server (hot reload)     |
| `npm run build`   | Build untuk produksi (di `dist/`)    |
| `npm run preview` | Preview build produksi secara lokal  |
| `npm run lint`    | Jalankan ESLint untuk cek code style |

**Contoh penggunaan:**

```bash
# Development
npm run dev

# Production build
npm run build

# Test production build
npm run preview
```

---

## 🔑 Environment Variables

File `.env` harus ada di root folder. Berikut variabel yang diperlukan:

### Development

```env
VITE_API_URL=http://localhost:3000/api
VITE_SERVER_URL=http://localhost:3000
```

### Production

```env
VITE_API_URL=https://api.basoyen.com/api
VITE_SERVER_URL=https://api.basoyen.com
```

### Penjelasan Variabel

- **`VITE_API_URL`** — Base URL untuk semua API requests (contoh: `http://localhost:3000/api`)
  - Dipakai di `src/services/api.js` sebagai `baseURL` axios
- **`VITE_SERVER_URL`** — Server URL umum (contoh: `http://localhost:3000`)
  - Dipakai untuk redirect atau link eksternal

---

## 🔌 API Integration

API calls dikelola di folder `src/services/`. Setup axios ada di `src/services/api.js`:

### Setup Axios

```javascript
// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor untuk menyisipkan token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### Contoh: Fetch Produk

```javascript
// src/services/productService.js
import api from './api';

export const getProducts = () => api.get('/products');
export const getProductBySlug = (slug) => api.get(`/products/${slug}`);
export const createProduct = (data) => api.post('/products', data);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);
```

### Penggunaan di Component

```jsx
import { useEffect, useState } from 'react';
import { getProducts } from '../services/productService';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p>Error: {error}</p>;
  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}
```

### Error Handling

```javascript
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);
```

---

**Akun Demo** (untuk development):

- **URL:** `http://localhost:5173/admin/login`
- **Email:** `admin@basoyen.com`
- **Password:** `admin1234`

> ⚠️ **Penting:**
>
> - Pastikan backend sudah berjalan di `http://localhost:3000` sebelum login.
> - Jangan gunakan akun demo ini di production!
> - Ubah password di production ke yang lebih aman.

---

## 🐛 Troubleshooting

### Backend tidak terkoneksi

**Error:** `CORS error` atau `Cannot POST /api/...`

**Solusi:**

1. Pastikan backend berjalan: `http://localhost:3000`
2. Cek `VITE_API_URL` di `.env` sudah benar
3. Restart dev server: `npm run dev`

### Port 5173 sudah dipakai

**Error:** `Port 5173 is already in use`

**Solusi:**

```bash
# Gunakan port berbeda
npm run dev -- --port 5174
```

### Env variables tidak terbaca

**Error:** `import.meta.env.VITE_API_URL` undefined

**Solusi:**

1. Pastikan `.env` ada di root folder
2. Variabel harus dimulai dengan `VITE_`
3. Restart dev server setelah edit `.env`

### Token/Login tidak bekerja

**Error:** `401 Unauthorized` atau redirect ke login loop

**Solusi:**

1. Cek token disimpan di localStorage: `localStorage.getItem('token')`
2. Pastikan token dikirim di header: `Authorization: Bearer <token>`
3. Cek token sudah expired atau tidak valid di backend

### Build error

**Error:** `npm run build` gagal

**Solusi:**

```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 🤝 Kontribusi

Kami menerima kontribusi! Lihat [CONTRIBUTING.md](CONTRIBUTING.md) untuk panduan lengkap.

**Quick Start:**

1. Fork repository
2. Buat branch fitur: `git checkout -b feat/nama-fitur`
3. Commit changes: `git commit -m "feat: add new feature"`
4. Push ke branch: `git push origin feat/nama-fitur`
5. Buat Pull Request

---

## 📝 License

Project ini dilisensikan di bawah [MIT License](LICENSE). Silakan gunakan, modifikasi, dan distribusikan dengan bebas.

---

## 👤 Pengembang

Dibuat oleh **Reza** — [@RezaR2P](https://github.com/RezaR2P)

Untuk pertanyaan atau issue, buka [GitHub Issues](https://github.com/RezaR2P/baso-yen-frontend/issues).
