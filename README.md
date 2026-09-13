# Soerabaja Quest

Menghidupkan sejarah 1945 Surabaya sebagai petualangan kota berbasis AR. Lima titik, satu rute, dan lingkaran ekonomi yang berakhir di UMKM Jalan Tunjungan.

**Jangkar tanggal:** 10 November 2026 — pilot teaser WebAR pada rangkaian Hari Pahlawan.

---

## Satu produk, enam permukaan, dua repositori

Ini **satu produk**, bukan dua. Satu backend, satu design system, satu kontrak API.

| Permukaan | Repo | Tema | Status desain |
|---|---|---|---|
| Aplikasi pemain (iOS + Android) | `soerabaja-mobile` | Gelap | 40 layar |
| WebAR | `soerabaja-quest` → `apps/web` | Gelap | 9 layar |
| Soerabaja Feed | `soerabaja-quest` → `apps/web` | Gelap | 1 layar |
| Merchant PWA (kasir) | `soerabaja-quest` → `apps/merchant` | Terang | 8 layar |
| Admin CMS (kurator) | `soerabaja-quest` → `apps/cms` | Terang | 4 layar |
| Dashboard guru & Pemkot | `soerabaja-quest` → `apps/cms` | Terang | 2 layar |
| Wall Siola (kiosk) | `soerabaja-quest` → `apps/wall` | Gelap | 1 layar |

**Kenapa dua repositori, bukan satu.** Aplikasi mobile membawa aset Unity yang butuh Git LFS. Mencampurnya ke repo ini akan membuat `git clone` memakan puluhan menit bagi semua orang, termasuk yang tidak pernah menyentuh mobile.

**Yang menyatukan keduanya:** `packages/tokens` dan `packages/api-contract` di repo ini. Repo mobile mengonsumsi keduanya sebagai artefak berversi, bukan menyalin nilainya.

> Repo `soerabaja-mobile` dibuat di Sprint 0 minggu 5, setelah spike UaaL memutuskan arsitekturnya. Jangan buat sebelum itu.

---

## Mulai dari mana

```bash
pnpm bootstrap    # install + build token + generate tipe API
pnpm dev          # apps/web di localhost:3000
```

Panduan lengkap dari mesin kosong: **[SETUP.md](./SETUP.md)**

---

## Struktur

```
soerabaja-quest/
├── docs/                    ← 11 dokumen keputusan; di-review lewat PR seperti kode
│   └── desain/              ← 65 layar sebagai HTML, referensi visual
├── packages/
│   ├── tokens/              ← token 2 lapis, 3 tema → CSS, JS, Dart
│   ├── api-contract/        ← openapi.yaml, sumber tipe untuk semua klien
│   └── ui/                  ← komponen bersama web
├── apps/
│   ├── web/                 ← Landing + WebAR + Feed
│   ├── merchant/            ← PWA kasir
│   ├── cms/                 ← Admin kurator + dashboard
│   └── wall/                ← Kiosk Siola
└── services/api/
```

---

## Dokumen — urutan membaca

| # | Berkas | Untuk siapa |
|---|---|---|
| 00 | [rencana-pengembangan](docs/00-rencana-pengembangan.md) | Semua. Mulai di sini |
| 01 | [analisa-sistem](docs/01-analisa-sistem.md) | PM, backend. Domain model, state machine, API |
| 02 | [storyboard](docs/02-storyboard.md) | Desain, konten. S0–S9 per scene |
| 03 | [design-system](docs/03-design-system.md) | Desain, frontend. Token, dua rezim, komponen |
| 04 | [spesifikasi-teknis](docs/04-spesifikasi-teknis.md) | Engineering. WebAR, UaaL, keamanan QR |
| 05 | [walkthrough-dan-prompt](docs/05-walkthrough-dan-prompt.md) | Semua. Sprint plan, ritual, template prompt |
| 06 | [backlog-ui](docs/06-backlog-ui.md) | Desain. 23 butir, P0–P2 |
| 07 | [adendum-arsitektur-antarmuka](docs/07-adendum-arsitektur-antarmuka.md) | **Wajib sebelum menulis UI.** Dua kelas layar |
| 08 | [wall-siola-dan-feed](docs/08-wall-siola-dan-feed.md) | Wajib sebelum menyentuh UGC. Gerbang privasi |
| 09 | [strategi-tema](docs/09-strategi-tema.md) | Frontend. Lapisan token semantik |
| 10 | [rencana-fase-berikutnya](docs/10-rencana-fase-berikutnya.md) | Semua. Peta 8 minggu ke pilot |
| 11 | [konsolidasi-poi-wall](docs/11-konsolidasi-poi-wall.md) | Desain, konten, engineering. Konsolidasi 5 POI + Wall Siola, pertanyaan terbuka Q1–Q10 |

Dokumen 07, 08, dan 09 lebih baru daripada 01–05 dan **menggantikan** beberapa keputusan di dalamnya. Bagian yang digantikan sudah ditandai di dokumen aslinya.

---

## Delapan keputusan yang sudah dikunci

Mengubahnya butuh keputusan sadar dan alasan baru, bukan kesepakatan lisan di tengah sprint.

| # | Keputusan |
|---|---|
| K1 | Satu tema gelap untuk pemain, dengan Mode Silau sebagai penguat kontras otomatis |
| K2 | Permukaan internal (Merchant, CMS, Dashboard) tetap terang |
| K3 | Dua kelas layar: Halaman Baca boleh digulir, Layar Aksi terkunci viewport |
| K4 | Navigasi model hub; tepat satu POI berstatus aktif |
| K5 | Batas 140 kata per layar dicabut, diganti batas 3× viewport |
| K6 | Gerbang privasi tiga tingkat untuk Wall dan Feed |
| K7 | Enam permukaan, satu backend, satu design system |
| K8 | Lapisan token semantik wajib sebelum baris kode pertama |

---

## Aturan yang ditegakkan alat, bukan rapat

**Nilai heksadesimal dilarang di berkas komponen.** Pakai `var(--semantik-permukaan-2)`, bukan `#14456F`. Stylelint menolaknya, dan CI gagal. Ini yang membuat penambahan tema apa pun nanti berbiaya satu hari, bukan tiga minggu.

**Tipe API dihasilkan, tidak ditulis tangan.** Kontrak berubah lebih dulu, implementasi menyusul.

**Naskah sejarah tidak boleh tayang tanpa sumber dan tanpa reviewer sejarawan.** Ditegakkan di CMS, bukan diandalkan pada kehati-hatian.

---

## Yang tidak boleh dilewati

**Validasi lapangan sebelum membangun banyak.** Prototipe sudah cukup untuk diuji ke lima pelajar di Jalan Tunjungan. Satu jam bersama mereka akan membatalkan lebih banyak asumsi daripada sebulan diskusi internal. Godaannya besar untuk melewatinya begitu ada kode yang berjalan.

**Ruang lingkup pilot.** Godaan terbesar muncul di minggu keenam: menambah titik kedua, menambah badge, menambah voucher. Tolak semuanya. Pilot hanya perlu menjawab satu pertanyaan — apakah orang yang berdiri di trotoar mau berhenti, mengangkat HP, dan menyelesaikan enam puluh detik.
