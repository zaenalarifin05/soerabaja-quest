# 04 · Spesifikasi Teknis
## WebAR & Aplikasi Mobile

**Pembaca:** Tech Lead, Mobile Engineer, Unity/AR Engineer, Web Engineer, Backend Engineer
**Prasyarat:** Dokumen 01 (Analisa Sistem) dan 03 (Design System)

---

## BAGIAN A — WEBAR

### A.1 Tujuan dan Batas Tegas

WebAR ada untuk satu hal: memberi pengalaman 60–90 detik tanpa instalasi kepada orang yang sedang berdiri di lokasi atau melihat poster. Ia **bukan** versi ringan dari aplikasi.

**Anggaran keras:**

| Metrik | Batas | Konsekuensi jika dilanggar |
|---|---|---|
| Total transfer awal | 4 MB | Di 4G Surabaya jam sibuk, tiap MB tambahan ≈ 1,5 detik tunggu |
| Time to Interactive | ≤ 5 detik di 4G | Di atas ini, angka tinggalkan halaman melewati 60% |
| Time to first AR frame | ≤ 8 detik dari izin kamera | |
| Aset 3D | ≤ 1,5 MB | glTF + Draco + KTX2 wajib |
| Audio | ≤ 600 KB | Opus 48 kbps mono |
| Frame rate | ≥ 24 fps di Android kelas menengah | Di bawah ini, tracking terasa rusak |

### A.2 Pilihan Platform

| Kandidat | Kelebihan | Kelemahan | Rekomendasi |
|---|---|---|---|
| **8th Wall** | Tracking paling stabil, SLAM tanpa marker, dukungan iOS Safari matang, analitik bawaan | Biaya lisensi berbasis view — bisa mahal saat viral | **Pilih untuk pilot & produksi** jika anggaran ada |
| **MindAR (open source)** | Gratis, image tracking cukup baik | Tidak ada SLAM, tracking goyah saat cahaya rendah, dukungan komunitas terbatas | Cadangan jika anggaran ketat |
| **Model Viewer + Scene Viewer/Quick Look** | Sangat ringan, native OS | Bukan AR sungguhan dalam alur — pengguna keluar ke aplikasi OS, alurnya patah | Hanya untuk pratinjau badge 3D |

**Keputusan:** 8th Wall sebagai jalur utama, dengan lapisan abstraksi tipis agar penggantian ke MindAR tidak menyentuh kode aplikasi.

```
src/
├─ ar/
│  ├─ AREngine.ts          ← antarmuka abstrak
│  ├─ adapters/
│  │  ├─ EightWallAdapter.ts
│  │  └─ MindARAdapter.ts   ← disiapkan, tidak dipakai di v1
│  └─ scenes/
│     └─ MajapahitFlag.ts
```

### A.3 Image Target

Standee bukan sekadar tempat menempel QR. Ia adalah **image target** yang harus dirancang agar mudah dilacak:

| Syarat | Nilai |
|---|---|
| Ukuran cetak minimum | 40 × 40 cm untuk area target |
| Kekayaan fitur | Skor tracking 8th Wall ≥ 4/5 — uji setiap desain sebelum cetak |
| Kontras | Rasio ≥ 5:1 antara elemen gelap dan terang |
| Yang harus dihindari | Pola berulang, area kosong luas, gradien halus, permukaan mengkilap |
| Material | Laminasi **matte**, bukan glossy. Pantulan matahari mematikan tracking |
| Sudut pandang | Diuji pada 30°, 45°, 60°, dan 90° dari normal |

Poin material sering diabaikan dan konsekuensinya fatal: standee logam mengkilap yang terlihat mewah di render 3D akan gagal dilacak sepenuhnya pada pukul 10 pagi.

### A.4 Alur Izin

```
Buka halaman
   │
   ├─ Cek HTTPS (wajib untuk getUserMedia) ─── gagal → tampilkan pesan teknis + tautan benar
   │
   ├─ Tampilkan penjelasan SEBELUM prompt browser
   │    "Kami akan membuka kamera untuk menampilkan bendera di atas
   │     gedung. Kamera tidak merekam apa pun."
   │    [ Buka kamera ]  [ Lihat versi video ]
   │
   ├─ requestCameraPermission()
   │    ├─ granted  → muat scene AR
   │    ├─ denied   → alur video 20 detik, JANGAN buntu
   │    └─ prompt tidak muncul (in-app browser IG/FB)
   │                → deteksi user agent, tampilkan
   │                  "Buka di Chrome/Safari" + tombol salin tautan
   │
   └─ Deteksi WebXR/WebGL2 ─── tidak didukung → alur video
```

Kasus **in-app browser Instagram dan Facebook** wajib ditangani secara eksplisit. Sebagian besar trafik pilot akan datang dari sana, dan kamera sering tidak berfungsi di dalamnya. Melewatkan penanganan ini berarti kehilangan mayoritas pengunjung tanpa pernah tahu penyebabnya.

### A.5 Stack WebAR

```
Next.js 15 (App Router)
├─ Halaman marketing        → SSG, edge cache, target LCP < 1,8 s
├─ /ar/[poi]                → CSR penuh, dynamic import bundel AR
├─ 8th Wall SDK             → dimuat setelah izin diberikan, bukan sebelumnya
├─ Three.js r1xx            → renderer scene
├─ Zustand                  → state scene (ringan, hindari Redux di sini)
└─ Instrumentasi            → PostHog event, batasi ke 6 event penting
```

Pemuatan SDK AR **setelah** izin diberikan adalah optimasi terpenting di sini — ia memindahkan ~2 MB keluar dari jalur kritis dan menyelamatkan Time to Interactive.

---

## BAGIAN B — APLIKASI MOBILE

### B.1 Arsitektur

```
┌────────────────────────────────────────────────────┐
│                   FLUTTER SHELL                    │
│  Navigasi · Peta · Profil · Voucher · Guestbook    │
│  Offline pack manager · Auth · Analitik            │
│                                                    │
│    ┌──────────────────────────────────────────┐    │
│    │        UNITY AS A LIBRARY (UaaL)         │    │
│    │  AR Foundation · ARCore/ARKit            │    │
│    │  Scene AR per POI · Spatial audio        │    │
│    │  Addressables (aset per POI)             │    │
│    └──────────────────────────────────────────┘    │
│              ▲ platform channel ▼                  │
└────────────────────────────────────────────────────┘
```

**Kontrak antara Flutter dan Unity harus sempit dan tertulis.** Ini sumber bug integrasi terbesar di arsitektur UaaL:

```dart
// Flutter → Unity
sendToUnity({
  "command": "LOAD_SCENE",
  "poi_id": "majapahit",
  "tier": 1,                    // 1 | 2 | 3
  "locale": "id",
  "asset_bundle_path": "/data/.../majapahit_t1.bundle",
  "audio_output": "headphones"  // headphones | speaker
});

// Unity → Flutter
onUnityMessage({
  "event": "SCENE_COMPLETED",   // SCENE_READY | SCENE_FAILED |
  "poi_id": "majapahit",        // INTERACTION_DONE | SCENE_COMPLETED
  "duration_ms": 74300,
  "tier_served": 1,
  "photo_path": "/tmp/ar_capture_...jpg"  // null jika tidak ambil foto
});
```

Aturan: **Unity tidak pernah memanggil API backend secara langsung.** Semua panggilan jaringan melalui Flutter. Ini menjaga satu sumber kebenaran untuk auth, retry, dan telemetri, dan mencegah duplikasi logika HTTP di dua runtime.

### B.2 Matriks Perangkat & Penentuan Tier

```dart
Future<int> resolveTier() async {
  final arSupported = await ARFoundation.checkAvailability();
  final ram = await DeviceInfo.totalRamMB();
  final gpuScore = await DeviceInfo.gpuTier();     // hasil benchmark ringan

  if (arSupported && ram >= 4096 && gpuScore >= 2) return 1;  // AR penuh
  if (ram >= 3072) return 2;                                   // video 360
  return 3;                                                    // audio + still
}
```

Tier ditentukan **sekali saat onboarding**, disimpan, dan dapat dinaikkan manual oleh pemain di pengaturan (dengan peringatan bahwa mungkin tersendat). Jangan hitung ulang tiap scene — hasil yang berubah-ubah di tengah rute membingungkan.

**Perangkat uji wajib** (minimal, harus dimiliki tim QA secara fisik):

| Kelas | Contoh perangkat | Tier target |
|---|---|---|
| Android atas | Samsung S23, Pixel 8 | 1 |
| Android menengah | Redmi Note 13, Samsung A54 | 1 |
| Android bawah | Redmi 12C, Infinix Hot | 2–3 |
| iOS atas | iPhone 15 | 1 |
| iOS lama | iPhone SE 2020, iPhone XR | 1–2 |

Redmi Note dan Samsung A-series adalah perangkat yang benar-benar dipegang segmen sasaran. Kalau produk berjalan mulus di Pixel tapi tersendat di Redmi Note, produk itu gagal.

### B.3 Manajemen Aset & Offline

```
Offline pack "napak-tilas-45" (218 MB)
├─ manifest.json           hash SHA-256 setiap file, versi, ukuran total
├─ scenes/
│  ├─ majapahit_t1.bundle   9,2 MB   (Unity Addressables)
│  ├─ majapahit_t2.mp4      14 MB    (video 360, H.265)
│  ├─ majapahit_t3.zip      1,1 MB   (foto + audio)
│  └─ ...
├─ audio/
│  ├─ interstitial_01.opus  6,8 MB   (drama 9 menit)
│  └─ orasi_tugu.opus       2,1 MB
├─ lore/                    380 KB   (JSON, semua bahasa)
└─ maps/                    18 MB    (tile peta offline kawasan)
```

**Aturan pengunduhan:**
- Default hanya lewat WiFi; pemakaian data seluler butuh konfirmasi eksplisit dengan angka MB ditampilkan.
- Dapat dijeda dan dilanjutkan (`Range` request), tahan terhadap koneksi terputus.
- Verifikasi hash tiap berkas; berkas rusak diunduh ulang sendirian, bukan seluruh paket.
- Pembersihan otomatis 14 hari setelah rute tuntas, dengan pemberitahuan.

### B.3b Siklus Hidup Layar Aksi & Persistensi Gulir

> **Ditambahkan September 2026** menyusul Dokumen 07. Aplikasi kini memakai model hybrid: Halaman Baca boleh digulir, Layar Aksi terkunci pada satu viewport.

**Masuk ke Layar Aksi** bukan navigasi biasa, melainkan perubahan mode:

```dart
Future<void> masukLayarAksi(String poiId) async {
  await simpanScrollPosition(poiId);        // persistensi ke lokal + server
  tabBar.sembunyikan();                      // bukan sekadar tertutup
  notifikasi.tahan();                        // tidak ada interupsi saat kamera hidup
  await transisiRobek(durasi: 700);          // satu-satunya animasi panjang di sistem
  await unity.kirim({'command': 'LOAD_SCENE', 'poi_id': poiId, ...});
  timerMenganggur.mulai(detik: 90);
}
```

**Keluar dari Layar Aksi — tiga hal wajib, tanpa pengecualian:**

1. **Kamera dimatikan sepenuhnya**, bukan disembunyikan. `dispose()` pada sesi ARFoundation, bukan sekadar `setVisible(false)`. Ini soal baterai dan panas di suhu 32°C, bukan kerapian kode. Kamera yang hidup di latar adalah penyebab paling umum HP panas dan baterai habis di tengah rute.
2. **Kembali ke posisi gulir yang tersimpan**, bukan ke puncak halaman.
3. **Selalu ada satu jalan keluar yang terlihat.** Layar Aksi tidak pernah menjebak.

**Timeout menganggur 90 detik.** Layar Aksi yang tidak disentuh selama 90 detik kembali sendiri ke Halaman Baca dengan kamera mati. Mencegah HP masuk saku dalam keadaan kamera menyala — skenario yang di uji lapangan terbukti menghabiskan baterai paling cepat.

**Persistensi posisi gulir.** Disimpan per POI sebagai `scroll_position`, bertahan melintasi layar mati, telepon masuk, dan aplikasi ditutup paksa. Di halaman 844 piksel ini tidak penting; di halaman 2.500 piksel ini menentukan apakah pemain melanjutkan atau menyerah. Simpan lokal setiap 2 detik, sinkronkan ke server saat keluar halaman.

---

### B.4 Anggaran Kinerja

| Metrik | Target | Alat ukur |
|---|---|---|
| Ukuran APK/AAB | ≤ 180 MB (dengan Play Asset Delivery) | Play Console |
| Ukuran IPA | ≤ 200 MB | App Store Connect |
| Cold start → peta | ≤ 3,5 s (Redmi Note 13) | Firebase Performance trace |
| Inisialisasi Unity | ≤ 2,5 s, **dilakukan di latar saat pemain mendekati POI** | Custom trace |
| Muat scene AR | ≤ 6 s dari tap | Custom trace |
| Memori puncak | ≤ 480 MB | Android Profiler |
| Baterai | ≤ 22%/jam pemakaian AR aktif | Uji lapangan 3 jam |
| Suhu perangkat | Tidak memicu thermal throttling dalam 12 menit AR | Uji lapangan siang hari |

Baris terakhir sering luput. Surabaya rutin di atas 32°C. HP kelas menengah yang menjalankan kamera + AR + GPS akan panas dan menurunkan clock dalam 8–12 menit. Karena itu ada aturan produk: **tidak ada scene AR yang berdurasi lebih dari 4 menit,** dan kamera dimatikan sepenuhnya (bukan sekadar disembunyikan) begitu scene selesai.

### B.5 Keamanan — Skema Verifikasi QR

```
Payload QR (statis, tercetak):
  SBQ|<poi_id>|<version>|<hmac_8char>

Verifikasi server pada POST /v1/missions/{id}/verify:
  1. Parse payload; tolak format tidak dikenal
  2. Hitung HMAC-SHA256(poi_id + version, secret_poi), bandingkan 8 karakter pertama
  3. Cek jarak coarse_geo ke POI ≤ radius_m + 40 m toleransi
  4. Tolak jika mock_location_flag == true
  5. Cek plausibilitas waktu: POI sebelumnya selesai ≥ 4 menit lalu
  6. Cek kecepatan implisit: jarak antar-POI / selisih waktu ≤ 60 km/jam
  7. Rate limit: maksimal 8 percobaan verify per pemain per 10 menit
  8. Catat semua penolakan dengan alasan → dashboard anti-cheat
```

**Yang tidak boleh dilakukan:** menaruh secret di dalam aplikasi dan memverifikasi di klien. Aplikasi mobile bisa dibongkar dalam hitungan jam, dan begitu satu orang membuat generator kode, seluruh sistem voucher runtuh. Perlakukan endpoint ini seperti endpoint pembayaran.

Untuk POI dengan layar (jika listrik tersedia), naikkan ke **QR dinamis** yang menyertakan `timestamp` dan berotasi tiap 60 detik. Ini menutup celah berbagi foto QR sepenuhnya.

### B.6 Izin & Privasi Teknis

| Izin | Kapan diminta | Alasan yang ditampilkan |
|---|---|---|
| Kamera | Saat pertama membuka scan, bukan saat onboarding | "Untuk memindai penanda di lokasi dan menampilkan lapisan sejarah." |
| Lokasi (**foreground only**) | Saat memilih rute | "Untuk memastikan kamu sudah sampai di titiknya. Tidak dibaca saat aplikasi tertutup." |
| Penyimpanan | Saat unduh offline pack | "Untuk menyimpan konten rute agar bisa dipakai tanpa sinyal." |
| Notifikasi | **Setelah** rute pertama tuntas, tidak sebelumnya | "Untuk memberitahumu saat pesanmu tayang atau rute baru dibuka." |
| Mikrofon | **Direvisi Sept 2026.** Saat Tahap 2 di POI Yamato dibuka (misi "Katakan Merdeka"), bukan di onboarding | "Untuk mengukur kerasnya suaramu saat berteriak Merdeka. Kami tidak merekam atau menyimpan suaramu." |

Tidak ada `ACCESS_BACKGROUND_LOCATION`. Titik. Ia akan memicu review tambahan di Play Store, memerlukan justifikasi video, dan produk ini tidak membutuhkannya.

**Konsekuensi teknis izin mikrofon (Dokumen 11):**

| Aspek | Ketentuan |
|---|---|
| Yang diukur | Amplitudo/volume input mikrofon secara real-time, **bukan** transkripsi atau pengenalan kata |
| Data yang disimpan | Hanya boolean `tahap_2_selesai: true/false`. **Tidak pernah** menyimpan rekaman audio, bahkan sementara |
| Ambang batas | Longgar dan bertahap — UI menampilkan umpan balik "hampir cukup" sebelum berhasil penuh, bukan biner gagal/berhasil sekali coba |
| Fallback izin ditolak | Tekan-tahan tombol 3 detik sebagai pengganti. Progres tidak pernah terblokir oleh penolakan izin |
| Fallback lingkungan bising | Karena ambang longgar, kebisingan latar (lalu lintas, kerumunan) tidak dianggap kegagalan — sistem tetap menerima asal ada lonjakan volume dari pemain |

**Data yang disimpan server:** `player_id`, `nickname`, daftar `poi_id` yang selesai, waktu selesai, tier yang disajikan, pilihan di Jembatan Merah, entri guestbook. **Tidak ada jejak koordinat, tidak ada rekaman audio.** Koordinat kasar dikirim hanya saat verifikasi dan tidak dipersistensikan.

### B.7 Skema Event Analitik

Enam event inti. Lebih dari ini menghasilkan dashboard yang tidak dibaca siapa pun.

```jsonc
{ "event": "route_started",     "route_id": "...", "tier": 1 }
{ "event": "poi_verified",      "poi_id": "...", "method": "QR|BLE|CODE", "attempts": 1 }
{ "event": "scene_completed",   "poi_id": "...", "tier_served": 1, "duration_ms": 74300 }
{ "event": "route_abandoned",   "last_poi": "...", "elapsed_min": 62, "battery_pct": 31 }
{ "event": "voucher_redeemed",  "merchant_id": "...", "latency_ms": 2400 }
{ "event": "share_completed",   "surface": "instagram_story|whatsapp|other" }
```

Event `route_abandoned` membawa `battery_pct` karena hipotesis utama untuk pemain yang berhenti adalah kehabisan baterai, bukan kebosanan. Kalau data membenarkannya, solusinya adalah powerbank di merchant, bukan menulis ulang konten.

### B.8 Backend & Infrastruktur

```
Cloudflare (CDN + WAF + R2 untuk aset)
        │
   Load Balancer
        │
   ┌────┴─────┬──────────────┬──────────────┐
   │ API      │ Worker       │ CMS          │
   │ NestJS   │ (BullMQ)     │ Next.js      │
   │ 2 pod    │ moderasi UGC │              │
   └────┬─────┴──────┬───────┴──────────────┘
        │            │
   ┌────▼──────┐ ┌───▼────┐
   │PostgreSQL │ │ Redis  │
   │ + PostGIS │ │ cache, │
   │ primary + │ │ queue, │
   │ replica   │ │ ratelmt│
   └───────────┘ └────────┘
```

**Kapasitas puncak yang harus tahan:** 10 November, pukul 07.00–11.00, diperkirakan 3.000 pemain aktif serentak dengan lonjakan verifikasi di Tugu Pahlawan. Lakukan uji beban pada 5× angka itu, dan siapkan mode degradasi: jika verifikasi antre, izinkan penyelesaian optimistik di klien dengan rekonsiliasi belakangan — lebih baik daripada 3.000 orang berdiri menatap spinner di pelataran Tugu Pahlawan.

### B.8b Wall Siola — Perangkat Kiosk

> **Ditambahkan September 2026** menyusul Dokumen 08. Permukaan keenam, kendala berbeda dari kelima permukaan lain.

| Aspek | Spesifikasi |
|---|---|
| Perangkat | Layar komersial 55–65 inci; **bukan** TV konsumen (tidak dirancang menyala 10 jam/hari) |
| Resolusi rancangan | 1080 × 1920 potret atau 1920 × 1080 lanskap |
| Pemutar | Mini-PC atau media player dedikasi; **bukan** tab browser di laptop |
| Mode | Kiosk penuh: tanpa kursor, tanpa bilah alamat, tanpa dialog sistem |
| Kecerahan | Minimal 500 nit — lobi Siola terang di siang hari |
| Audio | **Tidak ada.** Wall bisu; lobi museum bukan tempat pengeras suara |
| Muat ulang | Otomatis tiap 6 jam, dijadwalkan di luar jam buka |

**Anti burn-in — wajib.** Elemen statis (panel QR, strip rute, tagline) digeser 4 piksel tiap 20 menit dengan pola melingkar. Layar menyala 10 jam sehari selama bertahun-tahun; tanpa ini, panel QR akan terbakar permanen ke panel dalam hitungan bulan.

**Perilaku degradasi:**

| Keadaan | Perilaku |
|---|---|
| Jaringan putus | Tampilkan cache 50 entri terakhir. **Tanpa pesan galat di layar publik** |
| Belum ada kontribusi hari ini | Arsip terbaik minggu lalu, diberi label. Jangan pernah tampilkan keadaan kosong |
| Museum tutup | Mode malam: arsip monokrom berotasi lambat, kecerahan −60%, panel QR disembunyikan |
| Sistem mogok | Jatuh ke poster statis dari penyimpanan lokal, bukan layar biru |

**Gerbang privasi ditegakkan di server, bukan di klien Wall.** Klien Wall hanya menampilkan apa yang dikirim API; ia tidak pernah memutuskan sendiri apa yang layak tayang. Field `tayang_after` menegakkan jeda 5 menit, dan perintah tahan dari Petugas Siola berlaku seketika.

---

### B.9 Definisi Selesai untuk Setiap Fitur

Sebuah fitur dianggap selesai hanya jika seluruhnya terpenuhi:

- [ ] Berjalan di 5 perangkat uji wajib, termasuk kelas bawah
- [ ] Punya keadaan: loading, kosong, error, offline
- [ ] Teks berasal dari file lokalisasi, bukan hard-coded
- [ ] Naskah sejarah punya `reviewed_by` terisi
- [ ] Target sentuh ≥ 48 dp, kontras lolos AA
- [ ] `prefers-reduced-motion` dihormati
- [ ] Event analitik terpasang dan terverifikasi di dashboard
- [ ] **Diuji di lapangan pada lokasi sebenarnya, siang dan sore**
- [ ] Tidak menaikkan ukuran build melebihi anggaran
- [ ] Ada catatan di changelog untuk tim konten dan operasional

Butir kedelapan adalah pembeda proyek ini dari proyek aplikasi biasa. Fitur yang lolos di simulator tapi belum pernah diuji berdiri di trotoar Tunjungan pukul 10 pagi belum selesai.
