# App Flow Documentation (AFD)
## Professional Full-Stack Developer Portfolio (Eloqwnt-Grade)

---

### 1. High-Level User Journey Flow

Alur navigasi website dirancang agar minim hambatan (*frictionless*), memberikan impresi visual kuat dalam 5 detik pertama, dan mengarahkan pengunjung ke aksi konversi utama (*Contact / Hire / Case Study*).

```mermaid
flowchart TD
    Start([Pengunjung Tiba di Website]) --> HeroSection[1. Hero Section: Headline, Status Ketersediaan & Tech Stack]
    
    HeroSection --> ActionChoice{Pilihan Eksplorasi Pengunjung}
    
    ActionChoice -- "Ingin melihat bukti nyata" --> ProjectsSection[2. Filterable Projects Showcase]
    ActionChoice -- "Ingin tahu kapabilitas arsitektur" --> BentoSection[3. Bento Grid: Architecture & Skills]
    ActionChoice -- "Ingin langsung berdiskusi" --> InquirySection[4. Contact & Project Inquiry Form]
    ActionChoice -- "Ingin ganti suasana tampilan" --> ThemeSwitch[Toggle Switch: Dark / Light Mode]

    ProjectsSection --> FilterClick[Pilih Kategori: SaaS / Backend / Motion]
    FilterClick --> CardClick[Klik Kartu Proyek]
    CardClick --> ModalOpen[Buka Modal Interaktif: Detail Studi Kasus & Metrik]
    ModalOpen --> ModalAction{Aksi dalam Modal}
    ModalAction -- "Kunjungi Live Demo" --> ExternalSite([Buka URL Proyek Baru])
    ModalAction -- "Tutup Modal" --> ProjectsSection
    ModalAction -- "Ingin diskusi proyek serupa" --> InquirySection

    BentoSection --> ReviewMetrics[Melihat Uptime, Arsitektur SSR, Keamanan RLS]
    ReviewMetrics --> InquirySection

    InquirySection --> SelectService[Pilih Kebutuhan via Chip Interaktif]
    SelectService --> FillForm[Isi Nama, Email & Pesan Proyek]
    FillForm --> SubmitInquiry[Klik 'Kirimkan Inquiry ke Database']
    SubmitInquiry --> ValidateInput{Validasi Zod}
    ValidateInput -- "Tidak Valid" --> ShowError[Tampilkan Pesan Error di Kolom]
    ValidateInput -- "Valid" --> SaveSupabase[Simpan ke Tabel Supabase 'inquiries']
    SaveSupabase --> ShowSuccess[Tampilkan Banner Sukses & Reset Form]
    ShowSuccess --> End([Sesi Selesai / Notifikasi Terkirim])
```

---

### 2. Detailed User Journey Scenarios

#### Scenario A: The Tech Recruiter / Talent Scout (Speed & Tech Fit)
1. **Landing (0-5s)**: Melihat beacon hijau "Available for Projects", headline "Senior Full-Stack Software Engineer", dan logo ticker Next.js/Supabase/TypeScript.
2. **Scan (5-20s)**: Scroll ke bagian Bento Grid untuk melihat bukti kompetensi (SSR, Type-Safe API, Uptime 99.8%).
3. **Action (20-40s)**: Menekan tombol "Start Project" di header atau "Schedule Discovery Call" di hero section.
4. **Outcome**: Mengirimkan tawaran via form kontak terstruktur atau mengklik link LinkedIn di footer.

#### Scenario B: The Technical Lead / CTO (Code & Architecture Proof)
1. **Landing (0-10s)**: Menilai kualitas rancangan visual, performa fluid 60fps, dan kerapian tipografi.
2. **Filter & Deep-Dive (10-60s)**: Mengklik tab filter "Backend & Supabase" untuk menyaring proyek relevan.
3. **Inspect Case Study (60-120s)**: Membuka modal salah satu proyek (misal: *PayNexus Billing OS* atau *DocuMind Vector Search*), membaca tantangan skalabilitas, stack yang dipakai, dan dampak metrik.
4. **Verification**: Mengklik tautan repository GitHub atau Live Demo dari dalam modal.

#### Scenario C: The Startup Founder / Client (Value & Trust)
1. **Landing**: Terpukau oleh kualitas branding premium Eloqwnt-style yang memberikan kredibilitas instan.
2. **Explore Services**: Membaca 4 kartu bento mengenai alur kerja transparan (Discovery, Execution, Handoff).
3. **Inquiry**: Memilih chip layanan "Web Application / Full-Stack", mengisi deskripsi ide, dan mengirimkan pesan.

---

### 3. State Transitions & Interaction Flows

#### 3.1 Contact Form Submission Sequence

```mermaid
sequenceDiagram
    autonumber
    actor User as Pengunjung
    participant UI as InquiryFormComponent
    participant Action as ServerAction / Route
    participant DB as Supabase PostgreSQL

    User->>UI: Memilih Service Chip & Mengisi Form
    User->>UI: Klik Tombol "Kirimkan Inquiry ke Database"
    UI->>UI: Set State: isSubmitting = true (Disable Button & Show Loader)
    UI->>Action: Kirim Payload (name, email, service_type, message)
    Action->>Action: Validasi Server-Side dengan Zod Schema
    alt Data Tidak Valid
        Action-->>UI: Return { success: false, errors }
        UI->>UI: Tampilkan Inline Error & isSubmitting = false
    else Data Valid
        Action->>DB: INSERT INTO inquiries (name, email, service_type, message, status)
        DB-->>Action: Return Record Terbuat (id, created_at)
        Action-->>UI: Return { success: true }
        UI->>UI: Sembunyikan Form & Tampilkan Success State
        UI->>UI: Trigger Toast Konfirmasi ("Inquiry Terkirim!")
    end
```

#### 3.2 Modal Case Study State Machine

```mermaid
stateDiagram-v2
    [*] --> Closed: Halaman Dimuat
    Closed --> Opening: Pengunjung Klik Kartu Proyek
    Opening --> Opened: Animasi Fade-In & Backdrop Blur Selesai
    Opened --> Opened: Scroll Membaca Studi Kasus & Tech Stack
    Opened --> Closing: Klik Tombol [✕] / Klik Luar Backdrop / Tekan ESC
    Closing --> Closed: Animasi Fade-Out & Focus Dikembalikan ke Kartu
```

#### 3.3 Theme Switch State Flow

```mermaid
stateDiagram-v2
    [*] --> DetectSystem: Inisialisasi Aplikasi
    DetectSystem --> DarkMode: Default App / LocalStorage 'dark'
    DetectSystem --> LightMode: LocalStorage 'light'

    DarkMode --> TransitionToLight: Pengunjung Klik Toggle Switch ☀️
    TransitionToLight --> LightMode: Ubah Class HTML 'light', Simpan ke LocalStorage

    LightMode --> TransitionToDark: Pengunjung Klik Toggle Switch 🌙
    TransitionToDark --> DarkMode: Ubah Class HTML 'dark', Simpan ke LocalStorage
```

---

### 4. Edge Cases & Error Handling Flow

| Skenario Hambatan | Mekanisme Penanganan UI/UX | Dampak ke Pengunjung |
| :--- | :--- | :--- |
| **Koneksi Jaringan Putus saat Kirim Pesan** | Form mendeteksi error network, menampilkan badge peringatan merah, data isian input tetap terjaga (tidak hilang). | Pengunjung cukup klik tombol coba lagi (*Retry*) tanpa mengetik ulang. |
| **Pengunjung Mengisi Email Tidak Valid** | Validasi Zod langsung mengidentifikasi sebelum request dikirimkan ke server. | Muncul teks bantuan "Format email tidak valid". |
| **Koneksi Supabase Lambat** | Tombol submit menampilkan spinner halus dengan batas timeout 8 detik. | Pengunjung mengetahui sistem sedang memproses dan mencegah klik ganda (*double submit*). |
| **Layar Sangat Kecil (< 360px)** | Grid bento secara otomatis beralih menjadi 1 kolom murni, font ukuran responsif, padding disesuaikan. | Tidak ada teks terpotong atau horizontal overflow yang merusak estetika. |
