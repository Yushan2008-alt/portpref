# Implementation Plan Documentation (IPD)
## Professional Full-Stack Developer Portfolio (Eloqwnt-Grade)

---

### 1. Executive Roadmap & Phasing Overview

Proses implementasi dibagi ke dalam 7 fase terstruktur untuk memastikan setiap komponen teruji secara visual, performa, dan fungsional sebelum melangkah ke tahap berikutnya.

```
[Fase 0: Setup & Bootstrap] ➔ [Fase 1: Design Tokens & Base] ➔ [Fase 2: Nav & Hero Section]
         │
         ▼
[Fase 3: Bento Capabilities] ➔ [Fase 4: Projects & Modal] ➔ [Fase 5: Supabase & Form]
         │
         ▼
[Fase 6: Theme Toggle & Motion] ➔ [Fase 7: Testing & Final Polish]
```

---

### 2. Detailed Phase Breakdown & Action Items

#### Fase 0: Project Setup & Package Initialization
- [ ] Inisialisasi Next.js 14 dengan TypeScript, ESLint, Tailwind CSS, dan App Router.
- [ ] Instalasi dependensi kunci:
  - `framer-motion` (Animasi fisika & transisi layout)
  - `lucide-react` (Ikon modern & ringan)
  - `@supabase/supabase-js` & `@supabase/ssr` (Konektor database)
  - `next-themes` (Dual theme switching tanpa flicker)
  - `clsx` & `tailwind-merge` (Utility class merger)
  - `zod` & `react-hook-form` (Validasi form)
- [ ] Konfigurasi `tsconfig.json` dengan `strict: true` dan path alias `@/*`.
- [ ] Setup file environment `.env.local` dan `.env.example`.

#### Fase 1: Design System, Tokens & Typography Setup
- [ ] Setup font kustom via `next/font/google`: `Space Grotesk` (Display) dan `Plus Jakarta Sans` (Body).
- [ ] Konfigurasi `tailwind.config.ts`:
  - Token warna custom: `obsidian` (`#08080a`), `card-glass` (`rgba(18, 18, 23, 0.65)`), `accent-indigo` (`#6366f1`).
  - Animasi kustom: ambient radial glow pulse, subtle float.
- [ ] Pembuatan komponen UI dasar (Atoms) di `src/components/ui/`: `Button`, `Badge`, `Dialog/Modal`, `Input`, `Textarea`.

#### Fase 2: Floating Navbar & Dynamic Hero Section
- [ ] Pembuatan `src/components/navbar.tsx`:
  - Bentuk kapsul mengambang (*floating pill*) dengan `backdrop-blur-xl`.
  - Logo inisial interaktif.
  - Tautan navigasi (`Projects`, `Architecture`, `About`, `Process`).
  - Tombol aksi `Start Project` dan integrasi tombol `ThemeToggle`.
- [ ] Pembuatan `src/components/hero-section.tsx`:
  - Beacon status ketersediaan dengan animasi denyut (*Available for Projects*).
  - Headline raksasa tipografi geometris dengan teks bergradien.
  - Tombol CTA ganda (*Lihat Karya* & *Jadwalkan Diskusi*).
  - Ticker teknologi unggulan (Next.js, TypeScript, Supabase, Tailwind, Cloud).

#### Fase 3: Bento Grid Capabilities & Architecture Showcase
- [ ] Pembuatan `src/components/bento-grid.tsx`:
  - Layout asimetris 3 kolom (Card 1: 2-kolom Full-Stack, Card 2: 1-kolom Metrik Uptime, Card 3: 1-kolom Design System, Card 4: 2-kolom Alur Kolaborasi).
  - Efek hover micro-interaction: angkat kartu 3px, pendaran border, dan bayangan indigo halus.

#### Fase 4: Filterable Projects Showcase & Case Study Modal
- [ ] Pembuatan `src/components/projects-grid.tsx`:
  - Tab kategori instan (*All*, *Next.js & SaaS*, *Backend & Supabase*, *Creative & Motion*).
  - Animasi filtering menggunakan Framer Motion `layout` & `AnimatePresence`.
  - Kartu proyek dengan thumbnail bergaya Eloqwnt dan badge tag tech stack.
- [ ] Pembuatan `src/components/project-modal.tsx`:
  - Dialog modal berbasis Radix UI Dialog.
  - Menampilkan deskripsi mendalam, arsitektur teknis, stack font-mono, dan metrik capaian.
  - Tautan ke Live Demo dan GitHub Repository.

#### Fase 5: Supabase Integration & Contact Form
- [ ] Inisialisasi klien Supabase di `src/lib/supabase/client.ts` dan `src/lib/supabase/server.ts`.
- [ ] Pembuatan Server Action atau Route Handler untuk menyimpan data form inquiry ke tabel `inquiries`.
- [ ] Pembuatan `src/components/inquiry-form.tsx`:
  - Chip interaktif multi-pilihan kategori layanan.
  - Input nama, email, dan pesan dengan validasi Zod.
  - Feedback visual sukses instan di layar tanpa reload halaman.

#### Fase 6: Dual Theme Switcher (Dark/Light) & Polish
- [ ] Setup `ThemeProvider` dari `next-themes` pada `src/app/layout.tsx`.
- [ ] Uji coba kontras warna pada mode gelap (signature obsidian) dan mode terang (clean canvas).
- [ ] Penambahan metadata SEO dinamis, OpenGraph card, dan Twitter Card di `layout.tsx`.

#### Fase 7: Testing, Audit & Verification
- [ ] Type Checking: `npm run typecheck` (harus 0 error).
- [ ] Lint Checking: `npm run lint`.
- [ ] Build Test: `npm run build` memastikan semua rute ter-generate dengan baik.
- [ ] Audit Core Web Vitals (Lighthouse) memastikan skor ≥ 95.

---

### 3. Risk Assessment & Mitigation Strategies

| Potensi Resiko | Tingkat Keparahan | Solusi Mitigasi Pencegahan |
| :--- | :--- | :--- |
| **Koneksi Supabase belum terkonfigurasi di awal** | Sedang | Menyediakan fallback mock data lokal yang rapi di `src/lib/mock-data.ts` sehingga web tetap berfungsi 100% saat offline atau sebelum API key dimasukkan. |
| **Flicker tampilan saat ganti tema (FOUC)** | Rendah | Menggunakan `next-themes` dengan atribut `suppressHydrationWarning` dan `enableSystem={false}` serta default theme `dark`. |
| **Animasi berat menyebabkan lag di mobile** | Sedang | Menggunakan CSS Hardware Acceleration (`transform`, `opacity`) dan menghindari manipulasi properti layout (`width`, `height`, `top`). |
| **Spam pada formulir kontak** | Sedang | Validasi Zod ketat di sisi server dan pembatasan panjang teks minimum/maksimum. |

---

### 4. Verification Checklist & Success Criteria

```bash
# 1. Jalankan Typecheck
npx tsc --noEmit

# 2. Jalankan Linter
npm run lint

# 3. Jalankan Production Build
npm run build

# 4. Preview Hasil Build
npm run start
```
Kriteria Lulus:
- [x] Desain dan alur identik dengan referensi Eloqwnt.com.
- [x] Tombol Theme Toggle beralih mulus antara Dark dan Light mode.
- [x] Modal studi kasus dan filter kategori berjalan responsif.
- [x] Form kontak siap terintegrasi ke Supabase.
- [x] Build lulus 100% tanpa kompromi performa.
