# Technical Requirement Documentation (TRD)
## Professional Full-Stack Developer Portfolio (Eloqwnt-Grade)

---

### 1. System Architecture Overview

Arsitektur aplikasi dibangun di atas arsitektur modern berbasis **Hybrid Rendering (Next.js 14 App Router)** yang menggabungkan:
1. **React Server Components (RSC)** untuk rendering awal super cepat, optimasi SEO instan, dan pengambilan data langsung dari database tanpa *client-side waterfall*.
2. **Client Components (`'use client'`)** secara terisolasi untuk interaktivitas dinamis (filter animasi, modal dialog, formulir kontak, dan toggle tema).
3. **Supabase Cloud (PostgreSQL)** sebagai Backend-as-a-Service (BaaS) untuk persistence data proyek, pesan inquiry, dan analitik, diamankan dengan *Row-Level Security (RLS)*.

```
[ Client Browser ]
        │
        ├── HTTPS / Web Vitals Optimized
        ▼
[ Next.js 14 App Router (Vercel Edge Network) ]
        │
        ├── Server Components (SSR / Static Shell)
        ├── Server Actions & API Routes (Zod Validation)
        └── Theme Provider (next-themes)
        │
        ├── Supabase JS SDK (PostgreSQL via HTTPS/WSS)
        ▼
[ Supabase Cloud Services ]
        ├── PostgreSQL (Relational Data & pgvector ready)
        ├── Row Level Security (RLS Policies)
        ├── Supabase Realtime (WebSockets)
        └── Supabase Storage (Assets & CV PDFs)
```

---

### 2. Frontend Tech Stack & Dependencies

| Layer | Pilihan Teknologi | Versi Target | Rationale & Fungsi |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | `14.2+` | Standar industri untuk Full-Stack React dengan SSR, streaming HTML, dan caching bawaan. |
| **Language** | TypeScript | `5.0+` | Menjamin type safety ketat (end-to-end type sharing dari skema database ke komponen UI). |
| **Styling** | Tailwind CSS | `3.4+` | Utility-first styling dengan konfigurasi custom warna `obsidian`, `ambient glow`, dan breakpoint. |
| **UI Primitives** | Shadcn/ui & Radix UI | Latest | Komponen tanpa gaya dasar (*unstyled primitives*) yang aksesibel, modular, dan mudah dikustomisasi. |
| **Motion** | Framer Motion | `11.0+` | Engine animasi deklaratif untuk micro-interactions, transisi modal, dan scroll reveal. |
| **Icons** | Lucide React | Latest | Kumpulan ikon vektor modern yang ringan dan konsisten. |
| **Theming** | `next-themes` | `0.3+` | Pengelolaan perpindahan tema Dark/Light tanpa flicker tampilan (*flash of unstyled content*). |
| **Form & Validation** | React Hook Form + Zod | Latest | Validasi input form yang efisien di sisi browser maupun server. |

---

### 3. Backend & Data Layer (Supabase)

#### 3.1 Client Initialization Strategy
- **Public Client (`createBrowserClient`)**: Untuk query data publik di Client Component jika diperlukan.
- **Server Client (`createServerClient`)**: Untuk pemanggilan di Server Components, Server Actions, dan Route Handlers dengan perlindungan token lingkungan aman.

#### 3.2 Security & Access Controls (RLS)
- **Tabel `projects`**: 
  - `SELECT`: Diizinkan untuk publik (`anon` role) di mana `status = 'published'`.
  - `INSERT / UPDATE / DELETE`: Dibatasi hanya untuk `service_role` atau user terotentikasi admin.
- **Tabel `inquiries`**:
  - `INSERT`: Diizinkan untuk `anon` (pengunjung web) dengan validasi format.
  - `SELECT / UPDATE`: Dibatasi hanya untuk `service_role` / admin terverifikasi.
- **Tabel `analytics_events`**:
  - `INSERT`: Diizinkan untuk `anon` (pencatatan event anonim: page view, project open).

---

### 4. Component Hierarchy & File Structure

```
portprofes/
├── docs/                      # Dokumentasi Proyek Lengkap (PRD, TRD, AFD, DBD, BSD, IPD)
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root Layout: Fonts, ThemeProvider, Metadata SEO
│   │   ├── page.tsx           # Single Page App Shell (Hero, Projects, Bento, Inquiry)
│   │   ├── api/
│   │   │   └── inquiry/
│   │   │       └── route.ts   # Edge API Route fallback untuk form submit
│   │   └── globals.css        # Tailwind directives, CSS variables, & ambient glow keyframes
│   ├── components/
│   │   ├── navbar.tsx         # Floating Pill Nav & Theme Toggle
│   │   ├── hero-section.tsx   # Headline, Availability Beacon, & Tech Stack Ticker
│   │   ├── projects-grid.tsx  # Filterable Projects with Framer Motion Layout animations
│   │   ├── project-modal.tsx  # Case Study Modal Dialog (Radix Dialog)
│   │   ├── bento-grid.tsx     # Bento Capabilities & System Architecture Showcase
│   │   ├── inquiry-form.tsx   # Interactive Multi-Chip Contact & Project Form
│   │   ├── footer.tsx         # Executive Minimalist Footer & Social Links
│   │   └── ui/                # Shadcn/ui atomic components (button, dialog, badge, input, etc.)
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts      # Browser Supabase Client
│   │   │   └── server.ts      # Server Supabase Client
│   │   ├── utils.ts           # Class merging (clsx + tailwind-merge)
│   │   └── validations.ts     # Zod schemas untuk inquiry form
│   └── types/
│       ├── database.ts        # Generated TypeScript types dari Supabase Schema
│       └── project.ts         # Interface data proyek dan studi kasus
├── public/                    # Aset statis, favicon, logo, dan CV PDF
├── tailwind.config.ts         # Definisi token warna, animasi glow, dan font family
├── tsconfig.json              # Strict TypeScript configuration
└── package.json
```

---

### 5. Theming Engine & Color Token System

Aplikasi menggunakan CSS Variables yang di-inject oleh `next-themes`:
- **Dark Mode (Default - Eloqwnt Signature)**:
  - `--background`: `240 10% 3.9%` (`#08080a`)
  - `--card`: `240 10% 4.5%` (`rgba(18, 18, 23, 0.65)`)
  - `--border`: `240 3.7% 15.9%` (`rgba(255, 255, 255, 0.08)`)
  - `--foreground`: `0 0% 98%` (`#f8fafc`)
  - `--primary`: `238 84% 67%` (`#6366f1` / Indigo Accent)
- **Light Mode (Clean Precision Variant)**:
  - `--background`: `210 40% 98%` (`#f8fafc`)
  - `--card`: `0 0% 100%` (`#ffffff`)
  - `--border`: `214.3 31.8% 91.4%` (`#e2e8f0`)
  - `--foreground`: `222.2 84% 4.9%` (`#0f172a`)
  - `--primary`: `238 84% 59%` (`#4f46e5`)

---

### 6. Performance & Optimization Protocol
1. **Font Optimization**: Penggunaan `next/font/google` dengan `subsets: ['latin']` dan `display: 'swap'` untuk font `Space Grotesk` dan `Plus Jakarta Sans`, menghilangkan Layout Shift (CLS = 0).
2. **Image Optimization**: Menggunakan `next/image` dengan format modern WebP/AVIF, blur placeholder, dan lazy loading otomatis untuk thumbnail proyek.
3. **Animation Performance**: Menerapkan hardware acceleration (CSS `transform: translate3d` dan `will-change`) pada animasi kartu bento dan floating elements untuk menjaga performa konsisten di 60fps.
4. **Bundle Splitting**: Komponen berat seperti modal dan interaksi dinamis di-code-split secara otomatis oleh bundler.

---

### 7. Environment Variables Specification

File `.env.local` yang dibutuhkan:
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-for-admin-actions

# Site Metadata
NEXT_PUBLIC_SITE_URL=https://yourportfolio.com
```

---

### 8. Testing & Quality Assurance Plan
- **Type Checking**: `tsc --noEmit` wajib lulus tanpa error.
- **Linting**: `eslint` dengan rule Next.js dan TypeScript rekomendasi.
- **Build Verification**: `npm run build` sukses dengan hasil bundle yang efisien.
- **Core Web Vitals Audit**: Lighthouse audit otomatis untuk verifikasi skor performa, SEO, dan aksesibilitas.
