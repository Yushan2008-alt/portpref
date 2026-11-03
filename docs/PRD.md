# Product Requirement Documentation (PRD)
## Professional Full-Stack Developer Portfolio (Eloqwnt-Grade)

---

### 1. Executive Summary & Vision
Website ini adalah portofolio profesional berstandar industri tinggi (*Awwwards / Eloqwnt-grade*) untuk seorang **Senior Full-Stack Software Engineer**. Tujuannya adalah mengonversi pengunjung (Engineering Leaders, Tech Recruiters, Startup Founders, dan Klien Korporasi) menjadi peluang kerja sama nyata melalui pembuktian kompetensi teknis, kedalaman arsitektur perangkat lunak, dan estetika visual modern.

Website ini mengadopsi bahasa visual dan alur navigasi dari referensi kelas dunia (**www.eloqwnt.com**)—menggabungkan estetika *Dark Luxury*, *Bento Grid*, micro-interactions berbasis fisika, serta ketepatan tipografi. Selain mode gelap (*dark mode*) sebagai identitas utama, platform ini dilengkapi dengan tombol *theme switch* (Dark/Light mode) yang adaptif dan mulus.

---

### 2. Target Audience & User Personas

| Persona | Profil & Peran | Kebutuhan Utama | Kriteria Keberhasilan Konversi |
| :--- | :--- | :--- | :--- |
| **Tech Recruiter / Talent Acquisition** | Mencari Full-Stack Engineer / Tech Lead untuk enterprise / tech unicorn | Memeriksa ringkasan keahlian, pengalaman, resume, dan kontak cepat | Download CV dengan 1 klik, melihat ringkasan tech stack dalam 10 detik pertama |
| **CTO / VP of Engineering / Engineering Manager** | Mengevaluasi kedalaman teknis dan arsitektur kode kandidat | Ingin melihat arsitektur nyata, studi kasus masalah & solusi, performa sistem, serta link GitHub/demo | Membaca studi kasus berbobot teknis (latency, skala throughput, database optimization) |
| **Startup Founder / B2B Client** | Mencari builder mandiri untuk membuat MVP atau produk skala penuh | Ingin melihat rekam jejak pengiriman produk, kecepatan delivery, dan perkiraan biaya | Mengirim pesan inquiry proyek langsung lewat form kontak interaktif |

---

### 3. Core Value Propositions
1. **Uncompromising Engineering Excellence**: Dibangun di atas Next.js 14 App Router, TypeScript ketat, Supabase, dan performa 95+ di Google Lighthouse.
2. **Aesthetic Authority (Eloqwnt-Grade)**: Visual gelap mewah (*deep obsidian* `#08080A`), ambient lighting, kartu kaca *glassmorphism* tembus pandang, dan susunan modular bento grid.
3. **Dynamic & Autonomous**: Terhubung langsung ke Supabase (Database, Realtime, dan Storage) sehingga proyek dan pesan dapat dikelola dinamis tanpa harus deploy ulang kode.
4. **Frictionless Inquiries**: Form kontak interaktif multi-pilihan kebutuhan yang langsung merekam data ke database dan memicu notifikasi.

---

### 4. Detailed Feature Requirements

#### Phase 1 (Must-Have / P0)
- **F-01 Floating Navigation Pill**: Header melayang bergaya pil dengan logo inisial, anchor links (`Projects`, `Architecture`, `About`, `Process`), tombol Call to Action (`Start Project`), dan Theme Switcher.
- **F-02 Dynamic Hero Section**:
  - Status ketersediaan (*availability badge*) dengan indikator animasi hijau ("Available for Projects").
  - Value proposition headline besar (Space Grotesk) dengan gradient mask.
  - Subheadline kredibilitas dan tombol CTA ganda (Lihat Karya & Hubungi).
  - Ticker logo teknologi unggulan (Next.js, TypeScript, Supabase, Tailwind, Cloud).
- **F-03 Filterable Showcase & Case Study Modal**:
  - Filter kategori instan (All, Next.js & SaaS, Backend & Database, Creative & Motion).
  - Kartu proyek bergaya bento dengan badge industri, ringkasan dampak, dan stack tags.
  - Modal studi kasus interaktif tanpa reload halaman (menampilkan latar belakang masalah, arsitektur teknis, stack, dan hasil metrik).
- **F-04 Bento Grid Capabilities & Technical Architecture**:
  - Grid modular responsif (1 kolom & 2 kolom) menampilkan pilar keahlian: Full-Stack Engineering, Supabase & Database Security (RLS), Design System (Shadcn/ui & Framer Motion), serta Agile Delivery.
  - Kartu metrik pencapaian (misal: Uptime, skor performa, proyek terkirim).
- **F-05 Interactive Project Inquiry / Contact Form**:
  - Pemilihan jenis layanan berbasis chip tombol interaktif.
  - Input nama, email bisnis, dan deskripsi kebutuhan.
  - Validasi frontend & feedback submit sukses langsung di UI.
  - Penyimpanan data inquiry ke database Supabase.
- **F-06 Dual Theme Switcher (Dark Mode Signature / Light Mode Clean)**:
  - Default tampilan mengikuti signature dark mode Eloqwnt.
  - Tombol toggle untuk beralih ke mode terang bersih tanpa flicker (*zero flash*).
- **F-07 Footer Eksekutif**:
  - Indikator lokasi & zona waktu (Jakarta / GMT+7).
  - Tautan profil eksternal (GitHub, LinkedIn, Twitter/X, Email).
  - Copyright dan hak cipta.

#### Phase 2 (Should-Have / P1)
- **F-08 Realtime Project View Counter & Likes**: Pemanfaatan Supabase Realtime / RPC untuk mencatat jumlah apresiasi dan pembaca tiap studi kasus.
- **F-09 One-Click Resume / CV Preview & Download**: Tombol download PDF ringkasan riwayat profesional terintegrasi Supabase Storage.
- **F-10 Webhook / Email Notification**: Integrasi Resend atau Supabase Database Webhook saat ada klien baru mengisi form kontak.

#### Phase 3 (Nice-to-Have / P2)
- **F-11 Protected Admin Portal**: Rute khusus `/admin` dengan Supabase Auth untuk mengelola proyek (CRUD) dan membaca kontak masuk.
- **F-12 Engineering Notes / Technical Articles**: Halaman micro-blogging berbasis Markdown/MDX untuk thought leadership.

---

### 5. Non-Functional Requirements (NFR)
- **Performance**: Skor Google Lighthouse Mobile & Desktop ≥ 95 (First Contentful Paint < 1.0s, Cumulative Layout Shift < 0.05).
- **SEO & Social Sharing**: Dynamic OpenGraph tags, JSON-LD Structured Data (Person, WebSite), Semantic HTML5 tag (`header`, `main`, `section`, `article`, `footer`).
- **Accessibility**: Sesuai standar WCAG 2.1 Level AA (kontras rasio teks minimum 4.5:1, navigasi keyboard yang jelas, aria-labels pada tombol interaktif).
- **Browser Compatibility**: Mendukung Chrome, Safari, Firefox, Edge, dan peramban mobile (iOS WebKit & Android Blink).
- **Security**: Sanitasi input XSS pada form kontak, enkripsi SSL/TLS, penggunaan Supabase Row-Level Security (RLS) policies.

---

### 6. User Success Metrics & KPIs
1. **Engagement Rate**: Durasi rata-rata sesi pengunjung > 90 detik.
2. **Case Study Click-Through**: Lebih dari 40% pengunjung membuka minimal 1 modal studi kasus.
3. **Inquiry Conversion**: Rasio pengisian form kontak atau klik email > 5% dari total sesi unik.
4. **Zero Bug Bounce**: 0 error JavaScript runtime di console pada viewport desktop maupun mobile.
