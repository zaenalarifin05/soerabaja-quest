# 01 · Analisa Sistem — Tingkat Product Manager
## Soerabaja: Urban Battlefield Quest

**Status:** Draft untuk review teknis · September 2026
**Pembaca:** CTO, Tech Lead, Solution Architect, Design Lead
**Turunan dari:** Rencana Pengembangan Produk v1.0

---

## 1. Pernyataan Masalah & Hasil yang Dituju

**Masalah sistem, bukan masalah konten.** Sejarah 1945 Surabaya sudah lengkap terdokumentasi. Yang tidak ada adalah *mesin yang mengubah dokumentasi itu menjadi perjalanan fisik yang orang mau selesaikan.* Karena itu sistem ini pada dasarnya bukan aplikasi museum — ia adalah **quest engine berbasis lokasi dengan lapisan AR dan settlement voucher**.

| Aspek | Formulasi |
|---|---|
| Job to be done (Gen Z) | "Saat aku punya waktu luang di akhir pekan, aku ingin jalan-jalan yang menghasilkan konten bagus dan tidak membosankan, supaya aku merasa harinya tidak terbuang." |
| Job to be done (guru) | "Saat aku harus merancang kegiatan P5 tentang kebangsaan, aku ingin aktivitas luar kelas yang terstruktur dan bisa dinilai, supaya aku tidak perlu menyusun semuanya sendiri." |
| Job to be done (UMKM) | "Saat hari kerja sepi, aku ingin ada aliran pengunjung baru yang datang dengan alasan jelas, supaya kursi kosong terisi." |
| Outcome utama | Rute tuntas per bulan |
| Outcome pendukung | Voucher tertukar, sesi sekolah terlaksana, UGC terbit |
| Anti-outcome (jangan dikejar) | Jumlah unduhan, jumlah menit di dalam aplikasi |

Poin terakhir penting untuk diinternalisasi tim: **produk ini sukses ketika orang menutup layar dan melihat ke atas.** Waktu layar yang tinggi justru sinyal buruk. Ini mengubah cara kita mendesain notifikasi, animasi, dan bahkan definisi "engagement" di dashboard.

---

## 2. Aktor & Peran Sistem

| Aktor | Autentikasi | Kemampuan kunci |
|---|---|---|
| **Guest Explorer** | Anonymous session (device-bound) | Main rute penuh, dapat badge, klaim voucher sekali |
| **Registered Explorer** | Firebase (Google/Apple/telepon) | Progres lintas perangkat, leaderboard, guestbook, riwayat voucher |
| **Squad Leader (Guru)** | Akun terverifikasi sekolah | Buat squad, kelola 5–8 siswa, lihat rekap kuis, booking jadwal |
| **Squad Member (siswa <13)** | Sub-profil di bawah Squad Leader, tanpa PII | Ikut misi, jawab kuis, tanpa UGC publik |
| **Merchant Operator** | Akun merchant (PWA) | Validasi voucher, lihat rekap harian |
| **Content Curator** | Akun CMS, role-based | Tulis/ubah lore, kelola aset AR, ajukan publish |
| **Historian Reviewer** | Akun CMS, read + approve | Setujui/tolak naskah sebelum tayang |
| **Moderator** | Akun CMS | Loloskan/tolak UGC guestbook |
| **City Admin** | Akun CMS read-only + analitik | Dashboard dampak, ekspor laporan |
| **Petugas Siola** | Akun perangkat, terikat lokasi | Tahan tayang Wall, kosongkan Wall saat darurat |

**Keputusan arsitektural yang lahir dari tabel ini:** sistem butuh RBAC sejak hari pertama, dan butuh konsep *sub-profil tanpa PII* yang tidak umum ada di template auth. Jangan pakai boilerplate auth yang hanya mengenal "user" dan "admin".

**Catatan usia yang mengikat seluruh sistem (Dokumen 08).** School Mode bukan satu-satunya pintu masuk anak — remaja mendaftar sendiri lewat Solo Explorer, dan anak memakai HP orang tuanya. Solo Explorer tidak punya verifikasi usia. Karena itu izin tayang publik **tidak pernah** disimpulkan dari mode masuk; ia selalu berasal dari `ConsentRecord` per unggahan, dengan default tingkat A yang aman.

---

## 3. Peta User Story (Backbone)

```
BACKBONE →  MENEMUKAN   MEMULAI    MENJALANI MISI    MENUTUP     MENUKAR    KEMBALI
             │            │            │              │            │           │
MVP  ────────┼────────────┼────────────┼──────────────┼────────────┼───────────┤
             │ Landing    │ Pilih rute │ Scan QR      │ Kartu      │ Klaim     │ Hook
             │ web SEO    │ Izin kamera│ Baca lore    │ rangkuman  │ voucher   │ 7 tokoh
             │ Coba WebAR │ + lokasi   │ AR interaksi │ Guestbook  │ Redeem    │
             │ Install    │ Unduh pack │ Dapat badge  │            │ di kasir  │
             │            │            │ Navigasi     │            │           │
             │            │            │ antar titik  │            │           │
V1.0 ────────┼────────────┼────────────┼──────────────┼────────────┼───────────┤
             │ Deep link  │ School Mode│ Tier fallback│ Kuis pasca │ Riwayat   │ Leaderboard
             │ dari QR    │ Squad      │ Audio drama  │ Share card │ voucher   │ Notif event
             │ luar app   │ Booking    │ interstitial │            │           │
V1.5 ────────┼────────────┼────────────┼──────────────┼────────────┼───────────┤
             │ Rute kedua │ Co-op tim  │ Koleksi tokoh│ Rapor guru │ Tier      │ Misi
             │            │            │ Foto AR      │            │ merchant  │ musiman
```

### User story kritikal (format Given/When/Then untuk QA)

```gherkin
Feature: Penyelesaian titik misi

Scenario: Pemain menyelesaikan misi di lokasi yang benar
  Given pemain sudah mengunduh offline pack rute "Napak Tilas 45"
    And pemain berada dalam radius 80 m dari POI "Hotel Majapahit"
   When pemain memindai QR pada standee POI tersebut
   Then sistem memverifikasi signature QR ke server
    And sistem membuka scene lore POI
    And progres POI berubah dari LOCKED ke IN_PROGRESS

Scenario: Pemain mencoba menyelesaikan misi dari luar lokasi
  Given pemain berada 3 km dari POI "Jembatan Merah"
   When pemain memindai foto QR yang dikirim temannya lewat WhatsApp
   Then sistem menolak dengan pesan "Kamu belum sampai di lokasi"
    And sistem TIDAK mengungkap seberapa jauh ambang batasnya
    And percobaan dicatat untuk deteksi pola kecurangan

Scenario: Perangkat tidak mendukung AR
  Given perangkat pemain gagal cek ARCore/ARKit
   When pemain membuka scene AR di POI
   Then sistem menyajikan pengalaman Tier 2 (video 360)
    And badge yang diberikan identik dengan Tier 1
    And sistem tidak menampilkan pesan yang membuat pemain merasa perangkatnya kurang
```

Skenario ketiga bukan sekadar technical fallback — ia keputusan produk. Anak dengan HP Rp 1,8 juta tidak boleh diberi tahu bahwa ia mendapat versi "murah". Copy-nya harus netral.

---

## 4. Domain Model

```
┌──────────────┐        ┌──────────────┐        ┌──────────────┐
│    Route     │1      *│     POI      │1      *│    Scene     │
│──────────────│────────│──────────────│────────│──────────────│
│ id           │        │ id           │        │ id           │
│ slug         │        │ route_id     │        │ poi_id       │
│ title        │        │ order_index  │        │ type: LORE / │
│ duration_min │        │ name         │        │  AR / QUIZ / │
│ distance_m   │        │ geo (POINT)  │        │  REFLECT     │
│ difficulty   │        │ radius_m     │        │ tier_variants│
│ status       │        │ qr_secret    │        │ asset_bundle │
└──────────────┘        │ beacon_uuid  │        │ duration_s   │
                        │ indoor: bool │        └──────────────┘
                        └──────┬───────┘
                               │1
                               │*
                        ┌──────▼───────┐        ┌──────────────┐
                        │   Mission    │1      1│    Badge     │
                        │──────────────│────────│──────────────│
                        │ id           │        │ id           │
                        │ poi_id       │        │ name         │
                        │ lore_doc_id  │        │ art_asset    │
                        │ badge_id     │        │ rarity       │
                        │ points       │        └──────────────┘
                        └──────────────┘

┌──────────────┐        ┌────────────────┐       ┌──────────────┐
│    Player    │1      *│ PlayerProgress │*     1│   Mission    │
│──────────────│────────│────────────────│───────│              │
│ id           │        │ player_id      │       └──────────────┘
│ type: GUEST /│        │ mission_id     │
│  REGISTERED /│        │ state          │       ┌──────────────┐
│  SQUAD_MEMBER│        │ tier_served    │       │   Voucher    │
│ squad_id?    │        │ started_at     │       │──────────────│
│ nickname     │        │ completed_at   │       │ id           │
│ device_id    │        │ evidence_json  │       │ player_id    │
└──────┬───────┘        └────────────────┘       │ merchant_id  │
       │                                          │ code_hmac    │
       │1                                         │ state        │
       │*                                         │ issued_at    │
┌──────▼───────┐        ┌──────────────┐         │ redeemed_at  │
│  UGCEntry    │        │   Merchant   │1       *│ expires_at   │
│──────────────│        │──────────────│─────────│              │
│ id           │        │ id, name     │         └──────────────┘
│ player_id    │        │ geo, offer   │
│ poi_id       │        │ tier         │
│ media_url    │        │ operator_ids │
│ mod_state    │        └──────────────┘
└──────────────┘
```

### Entitas tambahan — revisi September 2026

```
┌──────────────┐        ┌──────────────────┐     ┌──────────────────┐
│     Rank     │        │  ConsentRecord   │     │  WallPublication │
│──────────────│        │──────────────────│     │──────────────────│
│ id           │        │ id               │     │ id               │
│ nama         │        │ player_id        │     │ ugc_id           │
│ urutan (1-5) │        │ ugc_id?          │     │ tingkat: A|B|C   │
│ syarat_json  │        │ tingkat: A|B|C   │     │ state: QUEUED /  │
└──────┬───────┘        │ usia_dinyatakan  │     │  HELD / LIVE /   │
       │1               │ diberikan_at     │     │  WITHDRAWN       │
       │*               │ ditarik_at?      │     │ tayang_after     │
┌──────▼───────┐        │ bukti_ref        │     │ ditahan_oleh?    │
│  PlayerRank  │        └──────────────────┘     └──────────────────┘
│──────────────│
│ player_id    │        PlayerProgress + scroll_position (INT, per POI)
│ rank_id      │
│ dicapai_at   │
└──────────────┘
```

### Entitas tambahan — revisi lanjutan, sesi Beranda & Arsip Sepia

Keputusan sesi ini: **avatar ilustrasi menggantikan foto profil bebas** (alasan privasi, lihat §8 di bawah), dan **Arsip Sepia** ditambahkan sebagai koleksi paralel terhadap Badge — kepingan pengetahuan tambahan per POI, terpisah dari bukti penyelesaian misi.

```
┌──────────────┐        ┌──────────────────┐     ┌──────────────────┐
│    Avatar    │        │  ArchiveEntry    │     │ ArchiveProgress  │
│──────────────│        │──────────────────│     │──────────────────│
│ id           │        │ id               │     │ id               │
│ nama         │        │ poi_id           │     │ player_id        │
│ svg_asset    │        │ route_id         │     │ route_id         │
│ syarat_json  │        │ judul            │     │ entries_terbuka  │
│ urutan_galeri│        │ isi (≤180 kata)  │     │  (array ref)     │
└──────┬───────┘        │ sumber_arsip     │     │ mulai_at         │
       │1               │ reviewed_by      │     └──────────────────┘
       │*               └────────┬─────────┘
┌──────▼───────┐                 │1
│ PlayerAvatar │                 │*
│──────────────│          ┌──────▼───────┐
│ player_id    │          │ArchiveUnlock │
│ avatar_id    │          │──────────────│
│ dipakai: bool│          │ player_id    │
└──────────────┘          │ entry_id     │
                          │ dibuka_at    │
                          └──────────────┘
```

**Avatar bukan foto.** `svg_asset` menunjuk ke ilustrasi bergaya cap/stempel, bukan gambar raster hasil unggahan. Field ini sengaja tidak menerima referensi ke penyimpanan foto pengguna — jalur ke foto asli (kalau suatu saat dibutuhkan) tetap ada tapi lewat `ConsentRecord` tingkat B/C, terpisah total dari sistem avatar profil. `syarat_json` menyimpan syarat pembukaan avatar terkunci, contoh `{"rute_selesai": 1}` untuk avatar kedelapan di galeri.

**Arsip Sepia terikat `route_id`, bukan global.** Alasan: koherensi cerita — kepingan satu rute bercerita tentang satu peristiwa sejarah yang utuh, mencampur lintas rute akan memecah narasi. `ArchiveProgress` unik per kombinasi `player_id` + `route_id`, sejalan dengan Badge yang juga per rute.

**`ArchiveUnlock` permanen — dikonfirmasi, bukan dugaan.** Sekali kepingan terbuka, ia tetap bisa dibuka-baca kapan saja, termasuk setelah pemain pindah ke rute lain. Hitungan "X dari 5 kepingan" yang tampil di Beranda hanya menghitung entri milik rute yang sedang `AKTIF` — bukan gabungan seluruh rute yang pernah dimainkan. Ini konsisten dengan Badge, yang juga tidak pernah hilang setelah diraih.

**Pemicu pembukaan kepingan:** `ArchiveEntry` terbuka otomatis saat POI terkait mencapai `COMPLETED` di state machine (§5) — event yang sama yang menerbitkan Badge. Satu aksi penyelesaian, dua hasil: bukti penyelesaian (Badge) dan pengetahuan tambahan (Arsip Sepia).

**Isi kepingan bukan pengulangan naskah misi.** `ArchiveEntry.isi` wajib berisi sudut pandang atau detail yang *tidak* muncul di `Scene` tipe LORE milik POI yang sama — misalnya latar belakang tokoh sekunder, sumber yang berseberangan, atau detail arsip yang tidak masuk cerita utama karena alasan pacing. Ini beban riset tambahan bagi dewan kurator, bukan salin-tempel dari naskah misi; `reviewed_by` tetap wajib mengikuti aturan gerbang persetujuan sejarawan yang sama seperti naskah lore.

**Lima tingkat pangkat:** Rekrut Baru (daftar) → Arek Lapangan (1 rute) → Penjaga Kota (3 rute atau 5 tokoh) → Saksi Sejarah (semua rute) → Cak/Ning Suroboyo (10 tokoh). Pangkat tampil di beranda dan profil, **tidak pernah di layar misi** — ia identitas, bukan mekanik permainan.

**Tiga tingkat tayang:** A = kutipan teks saja, default untuk semua, tanpa syarat. B = foto tanpa wajah, butuh 18+ dan persetujuan per unggahan. C = wajah dan nama lengkap, butuh persetujuan tertulis tersimpan. Deteksi wajah otomatis menahan setiap foto berwajah; kenaikan tingkat hanya lewat tindakan moderator. Sub-profil School Mode tidak punya jalur ke `WallPublication` sama sekali.

**`tayang_after` menegakkan jeda 5 menit** antara lolos klasifikasi dan muncul di Wall, memberi ruang petugas Siola menahan satu unggahan sebelum ratusan orang melihatnya.

### Catatan desain data yang tidak boleh dilewatkan

**`evidence_json` bukan koordinat mentah.** Ia menyimpan `{poi_id, method: "QR"|"BLE", verified_at, tier}`. Kita tidak pernah menyimpan jejak lokasi pemain — hanya fakta bahwa verifikasi di satu POI berhasil. Ini bukan sekadar kepatuhan privasi; ini juga memangkas volume data secara drastis dan menghilangkan seluruh kelas risiko kebocoran.

**`tier_variants` di level Scene, bukan di level device.** Konten dibuat tiga versi sejak produksi. Kalau tier ditentukan runtime dengan menurunkan kualitas aset yang sama, hasilnya selalu terlihat rusak, bukan berbeda.

**`qr_secret` per POI, dirotasi terjadwal.** Bukan satu secret global. Kalau satu standee dibongkar orang, hanya satu POI yang perlu di-rotate.

---

## 5. State Machine Misi — Model Hub

> **Direvisi September 2026** menyusul Dokumen 07. Model jalur terkunci diganti model hub: seluruh POI terlihat sejak awal beserta status masing-masing. Kronologi dijaga lewat status kartu, bukan dengan menyembunyikan peta besarnya.

### Tampilan beranda

```
              ┌──────────────────────────────────┐
              │         BERANDA RUTE             │
              │  5 POI terlihat sekaligus        │
              │  + CTA "Lanjutkan Misi" → AKTIF  │
              └───────────────┬──────────────────┘
                              │
     ┌────────────┬───────────┼───────────┬────────────┐
     ▼            ▼           ▼           ▼            ▼
 COMPLETED      AKTIF       LOCKED      LOCKED       LOCKED
 badge emas   CTA menuju   terlihat,   terlihat,    terlihat,
              sini         nama &      nama &       nama &
                           tanggal     tanggal      tanggal
```

**Tepat satu POI berstatus `AKTIF`** pada satu waktu, dan CTA "Lanjutkan Misi" selalu menunjuk ke sana. Ini yang membuat beranda bisa dipakai tanpa berpikir oleh pemain yang kembali tiga hari kemudian.

### Siklus per POI

```
                    ┌─────────┐
                    │ LOCKED  │  terlihat di beranda dengan nama & tanggal,
                    └────┬────┘  tapi belum bisa dimasuki
                         │ POI sebelumnya COMPLETED
                    ┌────▼─────┐
                    │  AKTIF   │  satu-satunya POI yang jadi tujuan CTA
                    └────┬─────┘
                         │ QR/BLE tervalidasi server
                    ┌────▼──────┐
              ┌─────│IN_PROGRESS│─────┐
              │     └────┬──────┘     │ keluar app / timeout 45 mnt
              │          │            ▼
              │          │       ┌──────────┐
              │          │       │ PAUSED   │──┐ buka lagi di lokasi
              │          │       └──────────┘  │
              │          │            ▲────────┘
              │ AR gagal │ scene selesai
              │ 2x       │
         ┌────▼─────┐ ┌──▼────────┐
         │ FALLBACK │ │ COMPLETED │ badge + poin diberikan
         │ (tier↓)  │ └──┬────────┘
         └────┬─────┘    │ semua POI rute COMPLETED
              └──────────┤
                    ┌────▼─────────┐
                    │ ROUTE_CLEARED│ voucher di-issue
                    └──────────────┘
```

**Aturan bisnis yang mengikat state machine:**

1. Voucher hanya terbit pada transisi ke `ROUTE_CLEARED`, dan hanya sekali per pemain per rute per 30 hari. Mencegah farming.
2. `PAUSED` tidak menghanguskan progres. Pemain yang baterainya habis di Tugu Pahlawan harus bisa lanjut besok. Ini keputusan produk yang mahal secara teknis (butuh persistensi server-side untuk guest) tapi wajib — kegagalan di sini adalah kegagalan yang paling menyakitkan bagi pemain.
3. Transisi ke `FALLBACK` bersifat senyap. Tidak ada dialog "perangkat Anda tidak mendukung". Sistem cukup memutar varian tier berikutnya.
4. Urutan penyelesaian POI **tetap dipaksa berurutan** untuk rute pertama (kronologi 19 Sept → 30 Okt → 10 Nov). Yang berubah: POI terkunci **tetap terlihat** di beranda lengkap dengan nama dan tanggalnya. Kronologi dijaga lewat status, bukan dengan menyembunyikan. Rute V1.5 boleh non-linear.
5. **Posisi gulir dipertahankan** pada setiap Halaman Baca, melintasi layar mati, telepon masuk, dan aplikasi ditutup. Field `scroll_position` disimpan per POI. Di halaman 844 piksel ini tidak penting; di halaman 2.500 piksel ini menentukan apakah pemain melanjutkan atau menyerah.
6. Masuk ke **Layar Aksi** (lihat Dokumen 07) bukan navigasi biasa melainkan perubahan mode: tab bar disembunyikan, posisi gulir halaman asal disimpan, notifikasi dalam aplikasi ditahan. Layar Aksi yang menganggur 90 detik kembali sendiri ke Halaman Baca dengan kamera dimatikan penuh.

---

## 6. Permukaan API (Ringkas)

| Method | Endpoint | Fungsi | Catatan keamanan |
|---|---|---|---|
| POST | `/v1/session/guest` | Buat sesi anonim device-bound | Rate limit per IP |
| POST | `/v1/auth/link` | Naikkan guest jadi registered, migrasi progres | Idempoten |
| GET | `/v1/routes` | Daftar rute + metadata ringan | Cacheable, CDN |
| GET | `/v1/routes/{slug}/manifest` | Manifest offline pack (daftar aset + hash) | Signed URL, TTL 1 jam |
| POST | `/v1/missions/{id}/verify` | **Inti sistem.** Validasi QR/BLE + lokasi | Wajib server-side; body berisi `qr_payload`, `coarse_geo`, `mock_location_flag` |
| POST | `/v1/missions/{id}/complete` | Tandai selesai, kembalikan badge | Cek state sebelumnya, tolak lompatan |
| GET | `/v1/players/me/progress` | Progres lintas perangkat | |
| POST | `/v1/ugc` | Kirim entri guestbook | Masuk antrean moderasi, default `PENDING` |
| POST | `/v1/vouchers/issue` | Terbitkan voucher saat rute tuntas | Idempotency key wajib |
| POST | `/v1/vouchers/{code}/redeem` | Validasi di kasir merchant | Hanya token merchant; single-use; lock optimistik |
| GET | `/v1/squads/{id}/report` | Rekap untuk guru | Agregat, tanpa PII siswa |
| POST | `/v1/events/batch` | Telemetri produk | Batch, boleh gagal diam-diam |

**Endpoint paling kritikal adalah `/v1/missions/{id}/verify`.** Seluruh integritas produk bertumpu di sana. Ia harus: (a) memvalidasi HMAC QR, (b) mengecek jarak koordinat kasar terhadap POI, (c) menolak jika `mock_location_flag` true, (d) menolak jika pemain menyelesaikan POI lain <3 menit lalu di jarak >1 km, (e) mencatat semua penolakan. Perlakukan ia seperti endpoint pembayaran: review kode wajib dua orang, uji beban, dan monitoring khusus.

---

## 7. Kebutuhan Non-Fungsional

| Kategori | Target | Cara ukur |
|---|---|---|
| Cold start ke layar peta | ≤ 3,5 detik di Redmi kelas Rp 2 jt | Firebase Performance |
| Waktu scan QR → lore tampil | ≤ 1,5 detik (cache lokal), ≤ 4 detik (online) | Custom trace |
| Waktu muat scene AR | ≤ 6 detik dari tap | Custom trace |
| Frame rate AR | ≥ 25 fps di perangkat Tier 1 | Unity Profiler + telemetri |
| Konsumsi baterai | ≤ 22%/jam pemakaian aktif AR | Uji lapangan terkontrol |
| Ukuran unduh awal | ≤ 180 MB app, offline pack terpisah ≤ 250 MB/rute | Play Console / App Store Connect |
| Ketersediaan API | 99,5% bulanan, 99,9% pada 10 Nov | Uptime monitor |
| Crash-free sessions | ≥ 99,3% | Crashlytics |
| Aksesibilitas | Kontras WCAG AA, dukung dynamic type, semua audio bertakarir | Audit manual + otomatis |
| Kepatuhan | UU PDP 27/2022, Play Families, App Store Kids | Checklist pra-rilis |

Dua target yang biasanya diremehkan tapi akan menentukan nasib produk: **konsumsi baterai** dan **ukuran unduh awal**. Rute penuh 3 jam dengan kamera aktif akan menghabiskan baterai HP kelas menengah kalau tidak dianggarkan sejak desain. Dan app 400 MB akan gagal diunduh di depan Hotel Majapahit dengan kuota pelajar.

---

## 8. Prioritisasi RICE (MVP → V1.0)

| Fitur | Reach | Impact | Confidence | Effort | Skor | Keputusan |
|---|---|---|---|---|---|---|
| Verifikasi QR + state machine misi | 100% | 3 | 100% | 8 | 37,5 | **Sprint 1** |
| Scene lore + AR Tier 1 (1 POI) | 100% | 3 | 90% | 13 | 20,8 | **Sprint 2–3** |
| Sistem tier fallback | 45% | 3 | 90% | 5 | 24,3 | **Sprint 3** |
| Offline pack | 80% | 2 | 80% | 8 | 16,0 | **Sprint 4** |
| Navigasi antar-POI + interstitial | 100% | 2 | 85% | 5 | 34,0 | **Sprint 4** |
| Badge + kartu share | 90% | 2 | 95% | 3 | 57,0 | **Sprint 5** |
| Voucher + merchant PWA | 60% | 3 | 80% | 8 | 18,0 | **Sprint 6** |
| Guestbook + moderasi | 35% | 1 | 90% | 5 | 6,3 | Sprint 8 |
| School Mode | 25% | 3 | 70% | 13 | 4,0 | Sprint 9–10 |
| Leaderboard | 40% | 1 | 60% | 5 | 4,8 | Sprint 11 |

Perhatikan bahwa **kartu share punya skor tertinggi** — usaha kecil, jangkauan besar, dampak langsung ke akuisisi organik. Ini sering dijadwalkan terlalu akhir karena terasa "kosmetik". Jangan.

---

## 9. Asumsi & Pertanyaan Terbuka untuk Tim Teknis

**Asumsi yang perlu divalidasi di Sprint 0:**
- Standee bisa mendapat sumber listrik di 5 titik (untuk QR dinamis di layar). Jika tidak, fallback ke QR cetak + verifikasi lokasi lebih ketat.
- Sinyal seluler cukup di Jembatan Merah pada jam ramai. Jika tidak, offline pack jadi wajib, bukan opsional.
- Izin memasang beacon BLE di kawasan cagar budaya bisa diperoleh.

**Pertanyaan arsitektural terbuka:**
1. Unity as a Library atau Flutter murni dengan plugin AR? Butuh spike 2 minggu dengan kriteria keluar yang jelas.
2. Backend NestJS atau Laravel? Tentukan berdasarkan komposisi tim yang tersedia, bukan preferensi.
3. WebAR: lisensi 8th Wall (mahal, matang) atau Niantic Studio / MindAR (murah, risiko lebih tinggi)? Hitung berdasarkan proyeksi trafik pilot.
4. Apakah rekaman orasi Bung Tomo sudah pasti bisa dilisensikan? Jika tidak, siapkan rencana B: rekonstruksi naskah dengan pengisi suara + disclaimer eksplisit. Ini mengubah scope audio secara signifikan.
