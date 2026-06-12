# 🤝 Panduan Kontribusi

Terima kasih telah tertarik untuk berkontribusi pada Baso Yen Frontend! 🎉

Dokumen ini menjelaskan cara berkontribusi pada proyek ini dengan cara yang efektif dan terorganisir.

---

## 📋 Daftar Isi

- [Kode Etik](#kode-etik)
- [Cara Memulai](#cara-memulai)
- [Branching Strategy](#branching-strategy)
- [Commit Message](#commit-message)
- [Pull Request](#pull-request)
- [Development Setup](#development-setup)
- [Testing](#testing)
- [Reporting Issues](#reporting-issues)

---

## 🤝 Kode Etik

Kami berkomitmen pada lingkungan yang inklusif dan hormat-menghormati. Semua kontributor harus:

- Menghormati pendapat dan ide orang lain
- Menerima kritik konstruktif dengan baik
- Fokus pada apa yang terbaik untuk komunitas
- Menunjukkan empati terhadap anggota komunitas lain

**Tidak Toleransi:**

- Pelecehan atau diskriminasi dalam bentuk apapun
- Konten yang menghina, kasar, atau tidak pantas
- Serangan pribadi atau permusuhan

---

## 🚀 Cara Memulai

### 1. Fork Repository

Klik tombol "Fork" di GitHub untuk membuat salinan repository di akun Anda.

```bash
# Clone fork Anda
git clone https://github.com/USERNAME/baso-yen-frontend.git
cd baso-yen-frontend
```

### 2. Setup Development Environment

```bash
# Install dependencies
npm install

# Setup .env untuk development
cp .env.example .env
# Edit .env sesuai kebutuhan lokal

# Jalankan dev server
npm run dev
```

### 3. Sinkronkan dengan Main Repository

```bash
# Tambah remote upstream
git remote add upstream https://github.com/RezaR2P/baso-yen-frontend.git

# Fetch latest changes
git fetch upstream
```

---

## 🌳 Branching Strategy

Kami menggunakan strategi branching sederhana:

### Naming Convention

- **Feature:** `feat/deskripsi-fitur`
  - Contoh: `feat/add-product-filter`, `feat/improve-navbar`

- **Bug Fix:** `fix/deskripsi-bug`
  - Contoh: `fix/cart-calculation-bug`, `fix/login-redirect`

- **Documentation:** `docs/deskripsi`
  - Contoh: `docs/update-readme`, `docs/api-guide`

- **Refactoring:** `refactor/deskripsi`
  - Contoh: `refactor/api-service-structure`

### Membuat Branch Baru

```bash
# Pastikan di branch main dan sync dengan upstream
git checkout main
git fetch upstream
git rebase upstream/main

# Buat branch baru
git checkout -b feat/nama-fitur
```

---

## 💬 Commit Message

Gunakan format commit message yang jelas dan deskriptif:

### Format

```
<type>: <deskripsi singkat>

<deskripsi panjang (opsional)>

Closes #<issue-number> (jika applicable)
```

### Type

- `feat:` - Fitur baru
- `fix:` - Bug fix
- `docs:` - Perubahan dokumentasi
- `style:` - Perubahan formatting (tanpa logic change)
- `refactor:` - Refactoring code
- `perf:` - Performance improvement
- `test:` - Menambah atau update test
- `chore:` - Perubahan build, dependencies, dll

### Contoh

```bash
git commit -m "feat: add product filter by category"

git commit -m "fix: resolve CORS error in API calls

- Added proxy configuration in vite.config.js
- Updated API_URL in .env
- Tested with backend on localhost:3000

Closes #42"
```

---

## 🔄 Pull Request

### Sebelum Membuat PR

1. **Update dari upstream:**

   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Test perubahan Anda:**

   ```bash
   npm run dev       # Test di dev server
   npm run build     # Test build production
   npm run lint      # Cek code style
   ```

3. **Commit changes:**

   ```bash
   git add .
   git commit -m "feat: describe your changes"
   ```

4. **Push ke fork:**
   ```bash
   git push origin feat/nama-fitur
   ```

### Membuat PR

1. Buka GitHub dan navigate ke fork Anda
2. Klik "Compare & pull request"
3. Pastikan:
   - **Base branch:** `main` (di repository asli)
   - **Head branch:** `feat/nama-fitur` (di fork Anda)

### PR Description Template

```markdown
## 📝 Deskripsi

Penjelasan singkat tentang apa yang diubah/ditambahkan.

## 🎯 Tujuan

- [ ] Menambah fitur X
- [ ] Memperbaiki bug Y
- [ ] Meningkatkan performa Z

## 📸 Screenshot (jika UI change)

Sertakan screenshot sebelum dan sesudah.

## ✅ Checklist

- [ ] Code sudah di-review
- [ ] Tests sudah ditambahkan/update
- [ ] Dokumentasi sudah diupdate
- [ ] Build dan lint tidak error
- [ ] Commit message jelas dan deskriptif

## 🔗 Related Issues

Closes #123 atau Relates to #456
```

### Code Review

Maintainer akan review PR Anda dalam waktu secepatnya. Mungkin ada perminatan perubahan. Silakan:

- Respond dengan penjelasan atau update PR
- Commit perubahan dengan pesan jelas
- Push ke branch yang sama (PR akan auto-update)

---

## 💻 Development Setup

### Prerequisites

- Node.js v18+
- npm v9+
- Git

### Instalasi Lengkap

```bash
# Clone & setup
git clone https://github.com/USERNAME/baso-yen-frontend.git
cd baso-yen-frontend

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env sesuai kebutuhan

# Jalankan dev server
npm run dev

# Di terminal lain, optional: jalankan linter watch mode
npm run lint -- --fix
```

### Project Structure

- `src/components/` — Komponen reusable
- `src/pages/` — Halaman (public + admin)
- `src/services/` — API calls
- `src/App.jsx` — Routing utama
- `src/index.css` — Global styles + Tailwind config

---

## 🧪 Testing

Saat ini project belum memiliki test suite. Sebelum PR:

1. **Manual testing:**
   - Jalankan `npm run dev`
   - Test fitur yang Anda ubah di browser
   - Test di berbagai screen size

2. **Build testing:**

   ```bash
   npm run build
   npm run preview
   ```

   - Pastikan production build berhasil
   - Test fitur di preview server

3. **Lint check:**
   ```bash
   npm run lint
   ```

   - Fix semua lint errors sebelum PR

---

## 🐛 Reporting Issues

### Sebelum Report

1. Cek apakah issue sudah ada di [GitHub Issues](https://github.com/RezaR2P/baso-yen-frontend/issues)
2. Cek di dokumentasi atau README
3. Coba reproduce issue di environment yang bersih

### Template Issue

```markdown
## 📝 Deskripsi Bug

Penjelasan singkat tentang bug yang ditemukan.

## 🔄 Cara Reproduce

1. Buka halaman X
2. Klik tombol Y
3. Scroll hingga Z

## 🎯 Expected Behavior

Apa yang seharusnya terjadi.

## 😞 Actual Behavior

Apa yang benar-benar terjadi.

## 🖼️ Screenshots

Sertakan screenshot atau video jika membantu.

## 💻 Environment

- **OS:** Windows 10 / macOS 13 / Ubuntu 22.04
- **Browser:** Chrome 120 / Firefox 121
- **Node.js:** v18.0.0
- **npm:** v9.0.0

## 📋 Additional Context

Informasi tambahan yang relevan.
```

---

## ❓ Pertanyaan?

- **Discord/Chat:** Hubungi maintainer di komunitas
- **Email:** reza@basoyen.com
- **GitHub Discussions:** Buat discussion di repo

---

## 🎉 Terima Kasih!

Setiap kontribusi, sekecil apapun, sangat berarti bagi project ini. Terima kasih telah menjadi bagian dari komunitas Baso Yen! 🙏
