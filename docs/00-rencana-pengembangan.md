# Rencana Pengembangan Produk
## SOERABAJA: Urban Battlefield Quest

**Versi dokumen:** 1.0 · September 2026
**Cakupan:** Aplikasi mobile (iOS + Android), Web Companion, Admin CMS, Merchant Portal
**Segmen:** Gen Z (14–28 th) sebagai pengguna inti, Gen Alpha (9–13 th) lewat mode terpandu

> Dokumen ini menerjemahkan konsep service design pada deck "Soerabaja: Urban Battlefield Quest" menjadi rencana produk yang bisa dieksekusi: arsitektur, stack, prioritas fitur, roadmap, tim, biaya indikatif, risiko, dan KPI.

---

## 1. Ringkasan Eksekutif

Soerabaja Quest mengubah kawasan bersejarah Surabaya (Hotel Majapahit → Jembatan Merah → Tugu Pahlawan → Siola → Tunjungan) menjadi satu museum terbuka berbasis AR dan misi. Produknya bukan "aplikasi museum", melainkan **layanan berlapis**: aplikasi mobile sebagai mesin pengalaman, titik sentuh fisik di jalan sebagai bukti (evidencing), dan ekosistem UMKM Tunjungan sebagai penutup loop ekonomi.

Tiga keputusan produk paling menentukan di rencana ini:

1. **QR + BLE beacon sebagai pemicu utama, bukan GPS.** Kawasan Kota Lama padat bangunan; akurasi GPS di sana buruk. Standee QR yang sudah ada di konsep justru harus jadi tulang punggung teknis, bukan sekadar dekorasi.
2. **AR bertingkat, bukan AR seragam.** Setiap misi punya tiga level kualitas (AR penuh → video 360 → audio + still). HP entry-level tetap bisa menyelesaikan quest. Tanpa ini, separuh pelajar Surabaya gagal main di titik pertama.
3. **Pilot kecil dulu di Hari Pahlawan 2026, grand launch di Hari Pahlawan 2027.** Momentum 10 November adalah aset pemasaran gratis yang tidak dimiliki produk sejenis di kota lain.

---

## 2. Target Pengguna: Membaca Ulang "Gen Z–Alpha"

Per 2026, dua generasi ini menempati rentang usia yang sangat berbeda kebutuhannya. Menyatukannya dalam satu pengalaman adalah kesalahan desain yang umum.

| Segmen | Usia 2026 | Konteks | Peran di produk |
|---|---|---|---|
| **Gen Z akhir** (persona Adi) | 16–22 | SMA/mahasiswa, main mandiri atau berdua, motif konten + tugas | **Pengguna inti.** Semua fitur default dirancang untuk mereka |
| **Gen Z awal** | 23–28 | Pekerja muda, weekend explorer, daya beli ada | Pengguna sekunder; penggerak redeem UMKM |
| **Gen Alpha** | 9–13 | SD kelas 4–6 & SMP awal, **datang rombongan**, HP sering milik ortu/guru | Diakses lewat **School Mode**, bukan akun mandiri |
| Pendamping | Guru, ortu, pemandu | Bukan pemain, tapi pemegang keputusan | Butuh dashboard & panduan sendiri |

### Konsekuensi desain yang wajib

- **Dua mode masuk:** `Solo Explorer` (13+, akun pribadi) dan `School Squad` (satu perangkat guru menaungi 5–8 siswa, progres kolektif).
- **Kepatuhan data anak.** UU PDP No. 27/2022 mensyaratkan persetujuan orang tua/wali untuk pemrosesan data anak. Google Play Families Policy dan Apple age rating juga mengikat. Praktisnya: untuk pengguna <13 tidak ada nama asli, tidak ada foto wajah, tidak ada iklan berbasis perilaku, tidak ada chat terbuka.
- **Panjang misi berbeda.** Gen Z sanggup rute penuh 3–4 jam. Rombongan SD butuh varian 75 menit, 3 titik, satu kawasan saja.

---

## 3. Arsitektur Ekosistem

Empat klien, satu backend.

```
┌─────────────────┐  ┌──────────────────┐  ┌────────────────┐  ┌──────────────┐
│  MOBILE APP     │  │  WEB COMPANION   │  │  ADMIN CMS     │  │  MERCHANT    │
│  iOS + Android  │  │  (publik, PWA)   │  │  (internal)    │  │  PORTAL      │
│                 │  │                  │  │                │  │  (PWA)       │
│ • AR Scanner    │  │ • Landing & SEO  │  │ • Kurasi lore  │  │ • Scan       │
│ • Quest Engine  │  │ • Arsip cerita   │  │ • POI & geo-   │  │   voucher    │
│ • Peta rute     │  │ • Leaderboard    │  │   fence editor │  │ • Rekap      │
│ • Badge/Profil  │  │ • Guestbook wall │  │ • Aset AR      │  │   klaim      │
│ • Voucher QR    │  │ • Booking sekolah│  │ • Moderasi UGC │  │ • Onboarding │
│ • Audio spatial │  │ • Mode "coba AR" │  │ • Voucher &    │  │              │
│ • Offline pack  │  │   ringan (WebAR) │  │   mitra        │  │              │
│                 │  │ • Dashboard guru │  │ • Analitik     │  │              │
└────────┬────────┘  └────────┬─────────┘  └───────┬────────┘  └──────┬───────┘
         └────────────────────┴────────────┬───────┴──────────────────┘
                                  ┌────────▼─────────┐
                                  │   BACKEND API    │
                                  │ Auth · Quest     │
                                  │ Engine · Geofence│
                                  │ Voucher · UGC    │
                                  │ Analytics · CDN  │
                                  └──────────────────┘
```

### Kenapa web tetap perlu, bukan pelengkap basa-basi

Peran web di sini bukan "versi kecil dari app". Ia menyelesaikan empat masalah yang tidak bisa diselesaikan app:

1. **Discovery.** Orang mencari "wisata sejarah Surabaya" di Google, bukan di App Store. Halaman web ber-SEO adalah pintu akuisisi termurah.
2. **Zero-install trial.** Turis yang sudah berdiri di depan Hotel Majapahit tidak akan menunggu unduhan 400 MB. WebAR ringan lewat browser memberi mereka pengalaman 60 detik, lalu mengarahkan ke instal.
3. **Kanal B2B sekolah.** Guru memesan kunjungan lewat laptop, bukan HP. Booking rombongan, RPP pendukung, dan rekap nilai kuis siswa hidup di web.
4. **Transparansi ke Pemkot & sponsor.** Dashboard publik berisi jumlah kunjungan, titik terpopuler, dan nilai transaksi UMKM yang terpicu — jauh lebih meyakinkan daripada laporan PDF tahunan.

---

## 4. Rekomendasi Teknologi

### 4.1 Klien mobile — tiga opsi

| Opsi | Pendekatan | Kelebihan | Kelemahan | Cocok untuk |
|---|---|---|---|---|
| **A. WebAR** | 8th Wall / Niantic Studio / Zappar, dibungkus PWA | Tanpa instal, lintas OS instan, iterasi cepat | Performa & kualitas AR terbatas, tak ada spatial audio 3D penuh, lisensi tahunan mahal saat trafik naik | **Pilot & trial di web** |
| **B. Flutter + Unity as a Library** ⭐ | Flutter untuk UI, peta, profil, voucher; Unity + AR Foundation (ARCore/ARKit) untuk modul AR | Satu codebase UI, AR kelas produksi, tim UI dan tim AR bisa jalan paralel | Ukuran app besar (~250–400 MB), integrasi UaaL butuh engineer berpengalaman | **Produk utama v1.0** |
| **C. Full Unity** | Semua di Unity | AR & game feel terbaik, satu engine | UI form-heavy (login, profil, voucher) menyakitkan dibuat, ukuran app besar, talenta lebih langka | Kalau produk berevolusi jadi game penuh |

**Rekomendasi: mulai dari A untuk pilot, bangun B sebagai produk utama.** Opsi A tidak terbuang — ia tetap hidup selamanya sebagai "coba tanpa instal" di Web Companion.

### 4.2 Stack lengkap

| Lapisan | Pilihan | Alasan singkat |
|---|---|---|
| Mobile shell | Flutter 3.x | Talenta luas di Surabaya, UI konsisten dua OS |
| Modul AR | Unity 6 + AR Foundation | ARCore + ARKit satu API, image tracking untuk QR/standee |
| Format aset 3D | glTF 2.0 (+ USDZ untuk Quick Look) dengan kompresi Draco/KTX2 | Ukuran unduh turun 60–80% |
| Audio spasial | Unity Spatializer / Resonance Audio | Untuk orasi Bung Tomo 3D di Tugu Pahlawan |
| Web publik | Next.js (App Router) + Tailwind | SEO server-rendered, PWA, WebAR embed |
| Admin CMS | Next.js + shadcn/ui, atau Filament bila backend Laravel | Cepat dibangun, role-based |
| Backend | NestJS (TypeScript) **atau** Laravel 11 | Pilih sesuai tim yang ada; Laravel lebih mudah cari orang di Jatim |
| Database | PostgreSQL + **PostGIS** | Query geofence & radius natif |
| Cache/queue | Redis | Leaderboard, rate limit, job aset |
| Object storage | S3-compatible (Cloudflare R2 / MinIO) + CDN | Aset AR berat, harus di edge |
| Auth | Firebase Auth (Google/Apple/telepon) + guest session | Guest-first: main dulu, daftar belakangan |
| Push & crash | FCM + Crashlytics | Standar, gratis di tier awal |
| Analytics | Firebase/GA4 + PostHog (event produk) | Funnel per POI, bukan sekadar page view |
| Beacon | BLE Eddystone/iBeacon di 5 titik utama | Anchor lokasi presisi di dalam gedung & gang sempit |
| CI/CD | GitHub Actions + Fastlane + Firebase App Distribution | Rilis beta ke sekolah tanpa store |

### 4.3 Tiga masalah teknis yang wajib diselesaikan sejak awal

**Validasi lokasi & anti-cheat.**
GPS di Kota Lama meleset 20–50 m. Solusinya berlapis:
- **QR bertanda tangan.** Payload berisi `poi_id + timestamp + HMAC` yang berotasi tiap 60 detik (QR dinamis di layar standee) atau QR statis + verifikasi lokasi server-side. Mencegah orang menyelesaikan quest dari rumah lewat foto QR di grup WA.
- **BLE beacon** sebagai konfirmasi kedua di 5 titik utama.
- **Deteksi mock location** (`isFromMockProvider` di Android, integritas lokasi di iOS) + rate limit "tak mungkin secara fisik" (dua POI berjarak 2 km diselesaikan dalam 3 menit → flag).

**Degradasi anggun untuk HP kelas bawah.**
Setiap misi dibangun tiga varian sejak konten dibuat, bukan sebagai tambalan:

| Tier | Syarat perangkat | Pengalaman |
|---|---|---|
| Tier 1 | ARCore/ARKit didukung, RAM ≥ 4 GB | AR penuh + occlusion + spatial audio |
| Tier 2 | Kamera + gyro, RAM ≥ 3 GB | Video 360° / overlay 2D di kamera |
| Tier 3 | Apa pun, atau sinyal buruk | Audio narasi + foto arsip + kuis |

Badge dan poin **sama di ketiga tier**. Tidak ada pemain yang dihukum karena HP-nya murah — ini soal keadilan akses, dan juga soal angka penyelesaian misi.

**Mode offline.**
Sinyal di sekitar Jembatan Merah tidak bisa diandalkan saat ramai. Aset satu rute (±150–250 MB) diunduh di awal lewat WiFi, progres disimpan lokal, sinkronisasi saat sinyal kembali. Ini juga menghemat kuota pelajar — hambatan nyata yang sering diabaikan.

---

## 5. Prioritas Fitur

### MVP — Pilot (target: rangkaian Hari Pahlawan, Nov 2026)
Tujuan: membuktikan orang mau berjalan kaki mengikuti misi, bukan membuktikan teknologi.

- 1 kawasan, 3 titik (Tugu Pahlawan → Siola → Tunjungan)
- WebAR: 1 pengalaman AR ikonik (hologram + audio orasi)
- Scan QR di standee, badge digital, kartu hasil untuk dibagikan
- Redeem manual di 5 merchant Tunjungan (kode alfanumerik, belum otomatis)
- Form waitlist + survei kepuasan singkat

### V1.0 — Rilis Publik (target: 10 November 2027)
- Rute penuh 5 titik sesuai blueprint deck: Hotel Majapahit (swipe robek bendera) → Jembatan Merah (mode investigasi Mallaby) → Tugu Pahlawan (orasi spatial audio) → Siola (arsip + guestbook) → Tunjungan (redeem)
- App native iOS + Android, guest mode + akun
- Peta rute dengan navigasi antar-titik dan estimasi waktu jalan
- 3 badge misi + 1 badge penuntas rute
- Kartu share otomatis (rasio IG Story & TikTok) dengan watermark titik
- Voucher QR terintegrasi kasir merchant, 30–60 mitra
- Digital guestbook dengan moderasi pra-tayang
- Bahasa Indonesia + Inggris; Suroboyoan sebagai *voice* narasi, bukan bahasa UI
- School Mode dasar + booking rombongan lewat web
- Dashboard Pemkot & merchant

### V1.5 — Kedalaman (2028 H1)
- "7 Tokoh Menunggu" dari slide penutup deck menjadi koleksi tokoh yang bisa dikumpulkan lintas rute
- Rute kedua: Peneleh–Kampung Lawas (HOS Tjokroaminoto, rumah kelahiran Bung Karno) dan rute Ampel
- Mode tim co-op: 3–5 orang, tiap orang memegang potongan petunjuk berbeda
- Foto AR bersama tokoh (photogrammetry, kualitas tinggi)
- Kuis pra/pasca kunjungan untuk sekolah + rekap nilai ke guru

### V2.0 — Platform (2028 H2+)
- Quest builder untuk komunitas & kampus (UGC terkurasi)
- Integrasi tiket museum & transportasi (Suroboyo Bus, Wira-Wiri)
- Lisensi white-label ke kota lain (Semarang, Malang, Bandung)
- API terbuka untuk peneliti & pengembang lokal

---

## 6. Roadmap 18 Bulan

| Fase | Periode | Output kunci | Gerbang keputusan |
|---|---|---|---|
| **0 · Discovery & Kesepakatan** | Okt–Nov 2026 | MoU Pemkot/Disbudporapar, dewan kurator sejarah terbentuk, izin lokasi standee, riset lapangan 20 responden | Ada sponsor/anggaran fase 1? |
| **1 · Pilot Hari Pahlawan** | Nov 2026 | WebAR 3 titik aktif selama rangkaian 10 Nov, 5 merchant, data perilaku nyata | ≥500 penyelesaian & ≥60% puas → lanjut |
| **2 · Desain & Konten** | Des 2026–Feb 2027 | Naskah 5 misi tervalidasi sejarawan, desain UI lengkap, aset 3D & audio, spesifikasi teknis | Naskah lolos review kurator |
| **3 · Build Inti** | Mar–Jun 2027 | App native alpha, backend, CMS, quest engine, sistem voucher | Alpha stabil di 10 model HP uji |
| **4 · Closed Beta** | Jul–Ags 2027 | 3 sekolah + 2 komunitas sejarah, 200 penguji, standee & signage terpasang | Crash-free ≥99%, penyelesaian rute ≥50% |
| **5 · Open Beta & Merchant** | Sep–Okt 2027 | 30+ merchant onboard, TestFlight/Play Beta publik, latihan operasional | Review store lolos |
| **6 · Grand Launch** | **10 Nov 2027** | Rilis publik + kampanye Hari Pahlawan | — |
| **7 · Stabilisasi & V1.5** | Des 2027–Mar 2028 | Perbaikan berbasis data, rute kedua mulai produksi | Retensi D30 ≥15% |

Dua jangkar tanggal yang tidak boleh digeser: **10 November** (Hari Pahlawan) dan **31 Mei** (HUT Kota Surabaya). Kampanye besar selalu ditempelkan ke keduanya.

---

## 7. Tim & Estimasi Biaya

### Komposisi tim inti (fase build)

| Peran | Jumlah | Catatan |
|---|---|---|
| Product Manager / Service Designer | 1 | Pemegang jembatan konsep–eksekusi |
| UI/UX Designer | 2 | Satu fokus app, satu fokus wayfinding fisik |
| Flutter Engineer | 2 | |
| Unity/AR Engineer | 2 | **Peran tersulit direkrut** — kunci jadwal |
| Backend Engineer | 2 | Satu menguasai PostGIS |
| Web Engineer (Next.js) | 1 | |
| 3D Artist / Motion | 1–2 | Bisa kontrak per aset |
| Content Lead + Penulis Naskah | 1 | Bekerja dengan dewan kurator |
| Sound Designer | 0,5 | Kontrak |
| QA | 1 | Uji lapangan, bukan hanya di meja |
| Community & Merchant Manager | 1 | Aktif sejak fase 4 |

### Biaya indikatif (rupiah, kisaran kasar)

| Pos | Kisaran | Catatan |
|---|---|---|
| Pilot fase 1 | Rp 250–450 jt | Termasuk lisensi WebAR, 3 standee, konten 1 titik |
| Pembangunan v1.0 (fase 2–6) | Rp 1,8–3,5 M | Bergantung in-house vs agensi |
| Titik sentuh fisik (5 titik) | Rp 500 jt–1,5 M | Standee metalik, signage, tata cahaya, instalasi listrik |
| Opex tahunan | Rp 600 jt–1,2 M | Cloud, CDN, lisensi store, konten baru, 3–4 staf pemeliharaan |
| Kampanye peluncuran | Rp 300–600 jt | KOL lokal, event, produksi konten |

> Angka di atas **indikatif untuk penyusunan proposal awal**, bukan RAB. Variabel terbesar: apakah aset 3D dibuat in-house atau dibeli, dan apakah tata cahaya kawasan ditanggung program revitalisasi Pemkot yang sudah berjalan.

**Cara memangkas biaya secara sehat:** gandeng program magang/skripsi kampus (ITS, Unair, Petra, UPN) untuk QA lapangan dan riset arsip, bukan untuk pekerjaan engineering inti. Aset 3D tokoh bisa dikerjakan mahasiswa DKV di bawah supervisi art director.

---

## 8. Konten & Validasi Sejarah

Ini bagian yang paling sering diremehkan di proyek AR sejarah, dan paling cepat menghancurkan kredibilitas.

### Dewan kurator (bentuk sebelum satu baris naskah ditulis)
Sejarawan kampus (Unair/Unesa), Dinas Kebudayaan Surabaya, pengelola Museum Sepuluh Nopember & Museum Surabaya, dan komunitas penggiat sejarah kota seperti Roodebrug Soerabaia serta Begandring Soerabaia. Komunitas bukan pelengkap seremonial — mereka penjaga akurasi sekaligus saluran distribusi paling awal.

### Tiga isu sensitif yang harus diputuskan di level kebijakan, bukan level developer

**Interaksi merobek bendera.** Mekanik swipe untuk merobek warna biru adalah mekanik terkuat di seluruh konsep, dan juga yang paling perlu dibingkai hati-hati. Rekomendasi: sajikan sebagai rekonstruksi peristiwa 19 September 1945 dengan konteks yang jelas (siapa Ploegman, mengapa negosiasi Residen Soedirman buntu), tutup dengan refleksi tentang kedaulatan — bukan dengan sentimen terhadap Belanda hari ini. Surabaya punya hubungan sister-city dan kerja sama warisan budaya dengan pihak Belanda; framing edukatif menjaga pintu itu tetap terbuka.

**Kematian Brigjen Mallaby.** Deck sudah memilih pendekatan yang tepat: menyajikan dua versi sebagai misteri yang belum tuntas. Pertahankan itu. Tampilkan sumber untuk tiap versi, dan biarkan pemain menilai. Ini justru pelajaran literasi sejarah yang lebih berharga daripada jawaban tunggal.

**Hak cipta & izin arsip.** Rekaman orasi Bung Tomo, foto arsip, dan materi RRI perlu izin tertulis dari pemegang hak/ahli waris sebelum dipakai komersial. Anggarkan waktu 2–3 bulan untuk proses ini dan mulai di fase 0, bukan menjelang rilis. Sumber arsip lain yang layak ditelusuri: ANRI, arsip militer Belanda (NIMH), dan Imperial War Museum untuk sisi Inggris.

### Nada bahasa
Suroboyoan adalah kekuatan identitas produk ini, tapi jangan dipakai di elemen fungsional. Aturan praktis: **navigasi dan tombol dalam Bahasa Indonesia/Inggris; narasi, judul misi, dan reaksi karakter dalam Suroboyoan.** Turis Jakarta dan Singapura harus tetap bisa menyelesaikan rute.

---

## 9. Manajemen Risiko

| Risiko | Dampak | Mitigasi |
|---|---|---|
| **Panas & hujan Surabaya** | Rute ditinggalkan di tengah jalan | Jam main disarankan 06.00–10.00 & 15.30–20.00; rute melewati jalur teduh; titik istirahat ber-AC di Siola & merchant; peringatan cuaca di app |
| **Baterai habis** | Quest gagal, kesan buruk | Mode hemat daya, aset offline, powerbank rental di merchant mitra sebagai benefit ekosistem |
| **AR gagal di HP entry-level** | Eksklusi segmen pelajar | Sistem tiga tier (§4.3), uji di 10 model HP populer <Rp 2,5 jt |
| **GPS meleset di Kota Lama** | Misi tak terpicu | QR + BLE sebagai anchor utama, GPS hanya pendukung |
| **Keselamatan lalu lintas** | Insiden serius, produk ditutup | "Look-up moment" wajib di tiap misi, AR terkunci saat kecepatan terdeteksi >7 km/jam, zona aman ditandai fisik, onboarding keselamatan tak bisa di-skip, School Mode wajib rasio pendamping |
| **Vandalisme/pencurian standee** | Biaya berulang | Material tahan cuaca & anti-congkel, penempatan dalam jangkauan CCTV, kemitraan RT/RW & Satpol PP, desain modular agar cukup ganti panel |
| **Retensi rendah (main sekali lalu hilang)** | KPI tahun 2 anjlok | Konten musiman, misi terbatas waktu, leaderboard antar-sekolah, rute kedua di V1.5 |
| **Merchant tidak bertahan** | Loop ekonomi putus | Gratis untuk merchant di tahun 1, settlement voucher jelas & cepat, laporan bulanan berapa pengunjung yang mereka dapat |
| **Ketergantungan APBD** | Proyek mati saat pergantian anggaran | Diversifikasi ke CSR korporat, sponsorship, dan pendapatan paket sekolah sejak tahun 1 |
| **Rekrutmen AR engineer gagal** | Jadwal mundur 3–6 bulan | Mulai rekrut di fase 0; siapkan opsi kontrak studio AR (Jakarta/Yogya) sebagai cadangan |

---

## 10. Privasi, Keamanan & Perlindungan Anak

Karena Gen Alpha masuk dalam target, standar ini bukan opsional.

- **Lokasi hanya saat aplikasi aktif.** Tidak ada pelacakan latar belakang, titik.
- **Minimalisasi data.** Guest mode bisa menyelesaikan seluruh rute. Akun hanya dibutuhkan untuk menyimpan progres lintas perangkat.
- **Untuk pengguna <13:** tanpa nama asli (nickname dari daftar aman), avatar ilustrasi bukan foto, tanpa iklan berbasis perilaku, tanpa fitur pesan antar-pengguna.
- **UGC (guestbook & foto AR):** moderasi pra-tayang + filter otomatis. Foto yang memuat wajah anak tidak tayang publik tanpa persetujuan wali.
- **Persetujuan wali** lewat kode undangan guru (School Mode) atau tautan verifikasi orang tua.
- **Kepatuhan:** UU PDP No. 27/2022, Google Play Families Policy, Apple App Review Guidelines untuk kategori anak. Siapkan Data Protection Impact Assessment sebelum rilis publik.
- **Keamanan teknis:** semua endpoint HTTPS, token berumur pendek, penyimpanan lokasi hanya sebagai `poi_id` yang diselesaikan (bukan jejak koordinat mentah), audit keamanan pihak ketiga sebelum V1.0.

---

## 11. Model Keberlanjutan

Aplikasi gratis untuk pemain, selamanya. Pendapatan datang dari lima arah:

1. **Anggaran kota & program pariwisata** — jangkar utama tahun 1–2, diposisikan sebagai infrastruktur pariwisata, bukan belanja aplikasi.
2. **Sponsorship & CSR korporat** — bank daerah, telco, BUMN. Naming rights per rute atau per badge, dengan batas agar tidak merusak nuansa sejarah.
3. **Paket sekolah B2B** — paket kunjungan terpandu + modul pembelajaran. Ini pendapatan paling stabil dan paling mudah diprediksi.
4. **Tier merchant** — gratis di tahun 1, lalu tier berbayar ringan untuk penempatan menonjol dan analitik pengunjung.
5. **Lisensi white-label** — kota lain membeli platform, Surabaya menjadi pemilik IP dan rujukan. Ini upside jangka panjang terbesar.

Satu hal yang sebaiknya **tidak** dilakukan: menjual data perilaku pengguna. Selain berisiko hukum dengan segmen anak, itu merusak posisi produk sebagai layanan publik.

---

## 12. KPI

**North Star Metric: jumlah rute yang diselesaikan tuntas per bulan.** Bukan jumlah unduhan. Unduhan mudah dibeli; rute tuntas berarti seseorang benar-benar berjalan kaki menyusuri sejarah kota.

| Kategori | Metrik | Target indikatif tahun 1 |
|---|---|---|
| Akuisisi | Instal kumulatif | 40.000–60.000 |
| Aktivasi | % pengguna yang scan QR pertama dalam 24 jam sejak instal | ≥55% |
| Inti | % sesi yang menuntaskan rute penuh | ≥30% |
| Engagement | Rata-rata POI selesai per sesi | ≥3,2 dari 5 |
| Retensi | D30 | ≥15% |
| Konversi ekonomi | Voucher ditukarkan / badge diperoleh | ≥25% |
| Ekosistem | Merchant aktif | 60 |
| Edukasi | Kenaikan skor kuis pra→pasca (School Mode) | ≥25 poin |
| Amplifikasi | Kartu hasil dibagikan / rute tuntas | ≥40% |
| Dampak kota | Durasi tinggal rata-rata di kawasan | naik 45–90 menit |

Instrumentasi analitik harus dipasang di fase 3, bukan sesudah rilis. Funnel yang dilacak: `buka app → izin lokasi/kamera → scan pertama → misi 1 selesai → misi 2 → ... → redeem`. Titik bocor terbesar hampir selalu ada di izin kamera dan di perpindahan antar-POI.

---

## 13. Go-to-Market

**Urutan yang berhasil untuk produk seperti ini: komunitas → sekolah → publik luas.**

- **Komunitas dulu (fase 4).** Roodebrug Soerabaia, Begandring, komunitas sepeda & jalan kaki, klub fotografi. Mereka menghasilkan konten organik berkualitas dan menjadi penjaga kredibilitas.
- **Sekolah (fase 5).** Kaitkan dengan projek penguatan profil pelajar (P5) dan mata pelajaran Sejarah. Sediakan modul siap pakai untuk guru — ini yang membuat guru memilih Anda dibanding karyawisata biasa. Target realistis tahun 1: 40 sekolah di Surabaya Raya.
- **Sosial (peluncuran).** Tantangan hashtag di TikTok/IG dengan hadiah nyata, filter AR gratis versi ringan sebagai umpan, KOL lokal Surabaya (bukan nasional — relevansi lebih penting daripada jangkauan).
- **Momentum berulang.** 10 November, 31 Mei, libur sekolah Juni–Juli dan Desember. Siapkan konten musiman untuk tiap jendela.
- **Merchant.** Kickoff bersama paguyuban Tunjungan; pastikan minimal 20 merchant siap di hari pertama agar reward terasa nyata, bukan janji.

---

## 14. Tata Kelola & Mitra

| Pihak | Peran |
|---|---|
| Pemkot Surabaya (Disbudporapar) | Pemilik program, izin lokasi, anggaran jangkar |
| Dinas Pendidikan | Kanal sekolah, kurikulum pendamping |
| Pengelola Tugu Pahlawan & Museum Sepuluh Nopember | Izin kawasan, akurasi konten, integrasi kunjungan |
| Dewan kurator sejarah | Validasi naskah, otoritas akademik |
| Komunitas sejarah | Ko-kreasi konten, ambassador awal |
| Kampus (ITS, Unair, Petra, UPN) | Riset, magang, uji lapangan |
| Paguyuban UMKM Tunjungan | Jaringan merchant, loop ekonomi |
| Vendor teknologi | Pembangunan & pemeliharaan |

Bentuk tata kelolanya sebagai **steering committee** yang rapat bulanan di fase 0–3 dan kuartalan setelahnya, dengan satu product owner tunggal yang punya wewenang memutuskan. Proyek lintas-instansi paling sering mati karena tidak ada satu orang yang boleh berkata "ini yang kita bangun".

---

## 15. Langkah 30 Hari Pertama

1. Kunci **satu product owner** dengan wewenang keputusan.
2. Ajukan pertemuan awal dengan Disbudporapar; bawa deck yang sudah ada — ia sudah cukup kuat sebagai alat lobi.
3. Bentuk dewan kurator: hubungi 2 sejarawan kampus + 2 komunitas sejarah.
4. Mulai proses izin hak cipta rekaman orasi & foto arsip (proses paling lambat, mulai paling awal).
5. Riset lapangan singkat: 20 wawancara pelajar/mahasiswa di Tunjungan & Tugu Pahlawan — validasi apakah mereka mau berjalan 3 km demi badge digital.
6. Survei teknis lokasi: uji sinyal seluler & akurasi GPS di 5 titik rute, catat sumber listrik untuk standee.
7. Buat prototipe WebAR satu titik (2–3 minggu kerja) untuk demo ke pemangku kepentingan. Demo yang bisa dipegang mengalahkan 50 slide.
8. Susun RAB detail fase 1 dan identifikasi 3 kandidat sponsor.
9. Mulai rekrut/kontak **AR engineer** — jalur terpanjang di seluruh rencana.
10. Tetapkan target pilot 10 November 2026 dan mundurkan jadwal dari sana.

---

## Lampiran: Ringkasan Keputusan Terbuka

Hal-hal yang perlu Anda putuskan agar rencana ini bisa dipertajam:

- **Konteks proyek** — proposal ke Pemkot, tugas akhir/mata kuliah service design, atau rintisan komersial? Ini mengubah bobot bagian biaya dan tata kelola secara signifikan.
- **Plafon anggaran** — menentukan pilihan antara Opsi A dan B di §4.1.
- **Kepemilikan IP** — Pemkot, konsorsium, atau entitas swasta? Menentukan model lisensi white-label di §11.
- **Jumlah titik di v1.0** — 5 titik seperti blueprint, atau mulai 3 untuk mengurangi risiko konten?
