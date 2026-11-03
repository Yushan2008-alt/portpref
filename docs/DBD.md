# Design Brief Documentation (DBD)
## Professional Full-Stack Developer Portfolio (Eloqwnt-Grade Minimalist)

---

### 1. Design Philosophy & Visual DNA

Desain default portofolio ini merefleksikan estetika asli **www.eloqwnt.com** sebagaimana tercantum pada referensi tangkapan layar resmi: **Minimalis, Bersih, Eksekutif, dan Nyaman di Mata (*Comfortable Eye-Level Reading*)**.

Prinsip desain utama:
1. **Pristine Minimalist Canvas (Default)**: Mengutamakan latar belakang putih bersih (`#FFFFFF`) dengan ruang bernapas yang lega (*generous negative space*), bebas dari gangguan visual yang berlebihan, serta memberikan kenyamanan maksimal saat dibaca.
2. **High-Contrast Monochromatic Hierarchy**: Teks hitam pekat (`#0A0A0A` / `#000000`) berpadu kontras di atas latar belakang putih, memberikan ketegasan tipografi modern berstandar agensi B2B internasional.
3. **Soft-Pill Interactive Accents**: Mengadopsi elemen tombol kapsul abu-abu lembut (*soft gray pill* `#F0F0F3` atau `#EAEAEF`) untuk menciptakan kesan profesional namun tetap mudah didekati (*approachable*).
4. **Structured 3-Part Navigation**: Tata letak navigasi proporsional yang memisahkan identitas logo di kiri, tautan menu utama dengan indikator dropdown panah halus (`↓`) di tengah, serta tombol aksi cepat (*quick action pill* dan tombol menu bulat) di kanan.
5. **Linear Marquee Metric Proof**: Garis ticker berjalan horizontal di bawah hero section yang dipisahkan oleh garis miring tegas (`/`), membuktikan kapabilitas dan pencapaian metrik secara langsung.
6. **Adaptive Dark Mode Support**: Meskipun default bertema putih minimalis (*light*), sistem tetap menyediakan tombol toggle tema untuk pengunjung yang menginginkan mode gelap (*dark mode luxury*).

---

### 2. Color System & Design Tokens

#### 2.1 Default Theme: Pristine Minimalist (Persis Referensi Gambar)

| Token Name | Nilai CSS / HEX | Deskripsi & Penggunaan |
| :--- | :--- | :--- |
| `bg-canvas` | `#ffffff` | Background kanvas utama seluruh halaman |
| `bg-pill-soft` | `#f0f0f3` | Background tombol kapsul (*pill*) "Let's chat", "Book strategy call" |
| `bg-pill-hover` | `#e4e4e9` | State hover tombol kapsul abu-abu |
| `border-subtle` | `#e5e7eb` (atau `rgba(0,0,0,0.07)`) | Garis pemisah halus, border kartu, dan garis ticker |
| `text-headline` | `#0a0a0a` / `#000000` | Headline utama, judul studi kasus, dan ticker uppercase |
| `text-body` | `#1f2937` | Paragraf penjelasan dan teks konten utama |
| `text-kicker` | `#4b5563` | Sub-tagline di atas headline hero section |
| `text-muted` | `#6b7280` | Tautan navigasi, hak cipta, dan keterangan sekunder |
| `btn-circle-dark`| `#000000` | Tombol panah bawah bulat `( ↓ )` pada hero section |
| `accent-brand` | `#2563eb` | Aksen warna logo (waveform icon) dan highlight interaktif |

#### 2.2 Secondary Mode: Obsidian Luxury (Opsi Dark Mode Toggle)

| Token Name | Nilai CSS / HEX | Deskripsi & Penggunaan |
| :--- | :--- | :--- |
| `bg-obsidian` | `#08080a` | Background halaman saat toggle ke Dark Mode |
| `card-glass` | `rgba(18, 18, 23, 0.7)` | Kartu bento semi-transparan dengan backdrop blur |
| `border-dark` | `rgba(255, 255, 255, 0.08)` | Garis batas kartu dan navbar mode gelap |
| `text-dark-main`| `#f8fafc` | Teks judul utama mode gelap |
| `bg-pill-dark` | `rgba(255, 255, 255, 0.08)` | Tombol pill mode gelap |

---

### 3. Typography Hierarchy & Font Pairing

Menggunakan font sans-serif geometris modern berkarakter kuat yang mudah dibaca di berbagai resolusi layar:
- **Display & Headline Font**: `Space Grotesk` atau `Plus Jakarta Sans` (Weight: 600 SemiBold / 700 Bold, Tracking: `-0.02em` s.d. `-0.03em`).
- **Body & Subtitle Font**: `Plus Jakarta Sans` / `Inter` (Weight: 400 Regular / 500 Medium, Tracking: `-0.01em`).
- **Ticker & Metric Font**: `Plus Jakarta Sans` / `Space Grotesk` (Weight: 700 Bold, Uppercase, Tracking: `+0.05em`).

```
Hero Kicker (Atas) : Plus Jakarta Sans Medium, 14px - 16px, Line-height 1.5, Text Gray
Hero Main Headline : Space Grotesk / Jakarta Bold, 48px - 64px (Desktop 72px), Leading 1.15, Pure Black
Hero CTA Pill      : Plus Jakarta Sans SemiBold, 14px - 15px, Background Soft Gray,
Scroll Indicator   : Circular Icon 36px x 36px, Black Background, White Arrow '↓'
Marquee Ticker     : Space Grotesk Bold, 16px - 18px, Uppercase, '/' Separators
Section Title      : Space Grotesk Bold, 32px - 40px, Pure Black
Card Title         : Space Grotesk SemiBold, 20px - 24px
Body Text          : Plus Jakarta Sans Regular, 15px - 16px, Line-height 1.6
```

---

### 4. Layout & Signature Components Breakdown

#### 4.1 3-Part Navigation Bar (Header)
Sesuai persis dengan tangkapan layar referensi:
- **Bagian Kiri (Brand Identity)**:
  - Ikon logo modern (bentuk gelombang suara / waveform biru bernuansa dinamis).
  - Teks brand `eloqwnt` / nama inisial portofolio dengan tipografi lowercase minimalis.
- **Bagian Tengah (Nav Links dengan Panah Dropdown)**:
  - Menu horizontal: `Home`, `About ↓`, `Works ↓`, `Services ↓`, `Stack`, `Notes ↓`.
  - Tanda panah ke bawah halus (`↓`) pada item yang memiliki submenu/studi kasus.
- **Bagian Kanan (Quick Actions)**:
  - Tombol circular menu `( = )` dengan ikon garis ganda minimalis.
  - Tombol pill utama: `Let's chat` dengan background abu-abu lembut `#F0F0F3` dan teks hitam.
  - Tombol toggle switch tema (`☀️ / 🌙`).

#### 4.2 Hero Section (Identity & Value Statement)
- **Kicker Text (Paling Atas)**:
  - Terletak tepat di atas headline: *"Helping fast-moving startups and companies build scalable, high-performance web products."*
  - Berukuran sedang (15px), warna abu-abu gelap, perataan tengah.
- **Centered Giant Headline**:
  - *"Strategy-led creative partner for scaling B2B tech companies"*  
    (atau untuk persona Full-Stack: *"Senior Full-Stack Software Engineer building scalable products with precision & impact"*).
  - Teks hitam pekat, tebal, dengan perataan tengah yang mendominasi area di atas lipatan layar (*above-the-fold*).
- **Interactive Action Pill**:
  - Tombol kapsul: `Book strategy call` (atau `Explore case studies`).
  - Efek hover: background abu-abu sedikit lebih gelap (`#E4E4E9`), scale halus 1.02x.
- **Centered Scroll Down Button**:
  - Tombol lingkaran hitam 36px di tengah layar dengan tanda panah putih ke bawah `( ↓ )`.
  - Mengarahkan scroll otomatis ke section proyek berikutnya saat diklik.
- **Linear Running Marquee Ticker**:
  - Banner metrik horizontal tanpa henti dengan separator garis miring tegas:
  - `/ 2.3X CONVERSION LIFT POST-REBRAND   / SUB-100MS API LATENCY   / 99.98% PRODUCTION UPTIME   / $85M+ VOLUME HANDLED   / 15+ SHIPPED ENTERPRISE PRODUCTS`

#### 4.3 Portfolio Showcase & Bento Cards
- Latar belakang kartu putih bersih dengan garis batas abu-abu 1px (`border-slate-200`).
- Bayangan kartu ultra-halus (*subtle elevation* `shadow-[0_4px_20px_rgba(0,0,0,0.04)]`).
- Efek hover: kartu terangkat 3px ke atas dengan bayangan yang sedikit lebih dalam (*comfort lift*), tanpa membuat mata lelah.

#### 4.4 Form Inquiry & Handoff
- Form kontak tetap mengadopsi chip interaktif abu-abu lembut untuk pemilihan jenis layanan.
- Field input berbingkai tipis bersih, fokus border gelap pekat dengan transisi mulus.

---

### 5. Spatial Rhythm & Spacing Rules

- Menggunakan **8-point spatial rhythm**:
  - Padding navbar: `py-4 px-8`
  - Spacing vertikal antar section: `py-20` hingga `py-28`
  - Margin bottom headline hero: `mb-8`
  - Gap antar elemen ticker: `gap-12`
- Container lebar maksimum:
  - Header: `max-w-7xl` (1280px)
  - Hero Section: `max-w-4xl` (896px) untuk keterbacaan teks optimum
  - Grid Proyek: `max-w-6xl` (1152px)

---

### 6. Accessibility & Comfort Standards (WCAG 2.1 AAA)

- **Rasio Kontras**: Teks hitam pekat (`#0A0A0A`) di atas putih murni (`#FFFFFF`) menghasilkan rasio kontras **21:1** (skor tertinggi standar WCAG AAA).
- **Eye-Strain Reduction**: Spasi baris yang longgar (*generous line-height 1.6*) dan pemisahan konten berbasis ruang kosong (*white space*) membuat halaman sangat nyaman dinavigasi dalam durasi lama.
- **Keyboard Navigation**: Seluruh tombol pill dan link memiliki outline fokus yang kontras dan jelas saat diakses via tombol Tab.
