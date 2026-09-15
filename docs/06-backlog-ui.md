# 06 · Backlog Perbaikan UI
## Hasil kritik pass pertama — 8 layar mobile

**Tanggal:** September 2026 · **File Figma:** `JONGPNmzp5eSSKrrk2GvJx`
**Status:** dicatat, belum dikerjakan. Dikerjakan setelah set layar mobile lengkap.

---

## P0 — Blocker, perbaiki sebelum uji pengguna

| # | Layar | Masalah | Perbaikan |
|---|---|---|---|
| B1 | S8.3 | Mock QR terbaca sebagai tiga baris kotak — pengguna akan mengira gagal muat | Ganti dengan pola QR sungguhan (modul 7×7 acak semu + finder pattern di 3 sudut) |
| B2 | S8.3 | Dua state tercampur: hitung mundur sudah jalan tapi tombol `Tukar sekarang` masih ada | Pecah jadi S8.3a (sebelum tap: QR redup, tombol menonjol) dan S8.3b (sesudah tap: QR hidup, hitung mundur, tombol hilang) |
| B3 | S8.3 | Kode bypass `4K7–Q29` tampil permanen — mengundang penyalahgunaan | Sembunyikan di balik tautan "Sinyal kasir mati?" |
| B4 | Semua | Safe area belum ada; CTA di y=730–786 bertabrakan dengan home indicator | **Ditutup untuk 6 halaman `apps/web` yang ada** — collision literal S8.3 belum relevan di sana (Halaman Baca, bukan full-bleed), tapi infrastrukturnya sudah disiapkan: `viewportFit: "cover"` di `layout.tsx` + `env(safe-area-inset-top/bottom)` pada padding header dan elemen penutup setiap halaman (termasuk komponen `SafetyNotice`). Cek ulang saat layar kamera/AR full-bleed (Y2/Y3/M2/T2/T3/U2/U3) dibangun — di sanalah risiko collision sungguhan muncul |
| B5 | Semua | Target sentuh gagal: `Tidak bisa scan?`, `Simpan kartu`, `Lanjut tanpa earphone` teks telanjang tanpa wadah 48dp | **Diperbaiki di 6 halaman `apps/web` yang ada.** Ditemukan 5 pelanggaran serupa (bukan layar S8.3 yang sama, tapi masalah yang sama): tombol 🔔/⚙ Beranda (36px→48px), link "Lihat semua →" Beranda (tanpa wadah→48px), dua tombol sekunder Hotel Majapahit (44px→48px), tiga tombol arsip Museum Siola (40px→48px). Semua CTA utama sudah ≥48px sejak awal |

## P1 — Merusak kualitas, perbaiki sebelum handoff

> **Dicek September 2026** terhadap kode yang sudah ada di `apps/web` (Beranda + 5 POI, lihat Dokumen 11 §7). B6, B7, B8, B9, B11 tetap terbuka — masing-masing berada di layar Layar Aksi kamera/audio (S2.2, S2.5, S6.1) yang belum dikonversi ke kode sama sekali (lihat catatan di halaman POI: Y2/Y3/M2/T2/T3/U2/U3 sengaja ditunda). B10 sudah dicek dan **patuh** di kode yang ada (lihat catatan barisnya).

| # | Layar | Masalah | Perbaikan |
|---|---|---|---|
| B6 | S6.1 | Ikon `◖◗` adalah retasan tipografi, bukan ikon | Ganti vektor earphone sungguhan, grid 24, stroke 1,75 |
| B7 | S2.5 | Badge masih medali aplikasi generik | Bangun ulang sebagai `BadgeStamp`: tepi tidak rata, tinta tidak merata, kesan ditekan ke dokumen |
| B8 | S6.1 | `Menunggu earphone…` dan `Lanjut tanpa earphone` warna identik `#7A8592`; kontras ~4:1 tidak terbaca di bawah matahari | Bedakan: status pasif tetap redup, kontrol aktif naik ke `--inti/perak` dengan wadah |
| B9 | S2.5, S6.1 | Ruang mati 90–150px; komposisi berat di atas | Naikkan blok teks atau turunkan badge; rapatkan ke ritme 8pt |
| B10 | Semua | Casing Display tidak konsisten (`NAPAK TILAS 45` vs `Pasang earphone`) | **Sudah patuh di kode yang ada** — seluruh teks `font-display` di Beranda dan 5 POI sudah huruf besar. Ditutup untuk cakupan saat ini; cek ulang kalau ada layar Display baru |
| B11 | S2.2 | Label `QR STANDEE` di atas gradien tanpa scrim gelap | Tambah lapisan `--inti/hitam` 62% di belakang semua teks mode kamera |
| B17 | S4.1 | Benang merah investigasi tidak semua terhubung ke pin; satu garis lolos ke tepi kanan | Perbaiki koordinat SVG agar tiap garis benar-benar berakhir di pin |

## P1 — Ditambahkan menyusul Dokumen 07 (revisi arsitektur beranda)

> Butir ini dijanjikan saat Dokumen 07 ditulis (lihat referensi di sana) tapi baru resmi masuk daftar sekarang, setelah kritik visual pertama terhadap Beranda model hub.

| # | Layar | Masalah | Perbaikan |
|---|---|---|---|
| B18 | Beranda | Mint terlalu banyak dipakai — muncul di tombol, chip status, ikon, garis, dan aksen kartu sekaligus. Ketika semuanya menyala, tidak ada yang menonjol | **Sudah diperbaiki.** Eyebrow "SOERABAJA 1945", statistik "0/5", dan link "Lihat semua →" dipindah ke perak (`text-teks-sekunder`/`text-teks-utama`) — mint kini hanya di kartu Radar Rute (aksi utama) dan kartu POI aktif (status POI aktif), sesuai aturan Dokumen 03 |
| B19 | Beranda, S10 | Emas belum dipakai untuk pencapaian. Lencana yang sudah diraih harus emas — kalau tidak, sinyal terkuat sistem hilang dan lencana terlihat sama saja dengan chip biasa | **Sudah terpenuhi di kode POI** (`semantik.pencapaian` dipakai di kartu lencana Hotel Majapahit/Jembatan Merah/Tugu Pahlawan). Di Beranda sendiri belum ada lencana yang diraih (masih 0/5) — tidak ada target untuk diwarnai emas sampai ada progres sungguhan |
| B20 | Beranda | ~~Koleksi Lencana dan kartu briefing perlu dipisah dari beranda~~ *Digantikan B24–B25 setelah klarifikasi pengguna* | — |

## P1 — Ditambahkan menyusul Dokumen 08 (Wall Siola & Feed)

> **Update September 2026:** ketiga butir di bawah sudah diperbaiki di mock-up `docs/desain/11-wall-siola.html` sejak awal — sama seperti B26 di mock-up Tunjungan. **Konversi ke kode sudah selesai**: `apps/web/app/wall-siola` (versi TV Kiosk, 1080×1920) dan `apps/web/app/feed` (Soerabaja Feed, web responsif). Keduanya statis dengan data contoh, sama seperti Beranda — rotasi kartu tiap 12 detik, jam berjalan, hitungan live, dan anti burn-in (Dokumen 08 §6) belum diimplementasikan karena butuh backend UGC nyata dan state klien yang belum ada.

| # | Layar | Masalah | Perbaikan |
|---|---|---|---|
| B21 | Wall Siola | Ticker FPS/telemetri pengembang terlihat di rancangan awal — chrome pengembang, jangan sampai ikut rilis | **Sudah diperbaiki di mock-up.** Dihapus total, tidak ada di `11-wall-siola.html` |
| B22 | Wall Siola | Metrik "Dampak UMKM Rp 142,5M" tampil di layar publik — itu metrik Dashboard Pemkot (D2), bukan informasi pengunjung | **Sudah diperbaiki di mock-up.** Dipindah ke D2, tidak ada di tampilan Wall versi baru |
| B23 | Wall Siola | Moderasi otomatis tayang 30 detik terlalu cepat untuk layar publik gedung Pemkot | **Sudah diperbaiki di mock-up.** Jeda tayang 5 menit + tombol tahan Petugas Siola |

## P1 — Ditambahkan menyusul sesi Beranda & Arsip Sepia

| # | Layar | Masalah | Perbaikan |
|---|---|---|---|
| B24 | Beranda | Kartu briefing/arsip permanen memakan ±30% tinggi gulir beranda | **Bukan dihapus** — diubah jadi tombol ringkas "Arsip Sepia" dengan penanda belum-dibaca; isi lengkap pindah ke overlay terpisah. Lihat Dokumen 01 entitas `ArchiveEntry` |
| B25 | Beranda | Status "TERKUNCI" memakai ikon gembok generik, kurang menarik secara visual | Ganti jadi `LockedCard` (Dokumen 03 §5): siluet ikon asli kartu itu sendiri, diredupkan — bukan gembok. Gembok disisakan khusus untuk kunci sistem, mis. avatar terkunci syarat pangkat |

## P0 — Ditemukan saat konsolidasi lintas-POI (Dokumen 11)

| # | Layar | Masalah | Perbaikan |
|---|---|---|---|
| B26 | Tunjungan (U1) | `SafetyNotice` — komponen wajib di semua POI aksi — terlewat di draft pertama Tunjungan, padahal jalan kuliner malam sama ramainya dengan Yamato/Jembatan Merah/Tugu | **Sudah diperbaiki** di `soerabaja-poi-tunjungan.html`. Dicatat di sini sebagai pengingat: setiap POI baru wajib dicek terhadap checklist komponen tetap sebelum dianggap selesai |

## P0 — Ditemukan saat implementasi Claude Code (backlog teknis)

| # | Layar | Masalah | Perbaikan |
|---|---|---|---|
| B27 | Beranda (kartu Arsip Sepia) | `packages/tokens` cuma punya satu varian warna permukaan arsip dan satu teks arsip — mock-up butuh varian kedua: permukaan aksen lebih gelap (`#CDBB95`) dan teks sekunder sepia (`#7A6144`) | **Sudah diperbaiki** ([PR #5](https://github.com/zaenalarifin05/soerabaja-quest/pull/5)). Tambah `semantik.permukaan.arsip-2` dan `semantik.teks.arsip-sekunder` di ketiga tema. Menyusul saat lima POI dibangun: `semantik.permukaan.arsip-notifikasi`, `semantik.teks.arsip-notifikasi` ([PR #6](https://github.com/zaenalarifin05/soerabaja-quest/pull/6)), dan `semantik.teks.arsip-bahaya` ([PR #7](https://github.com/zaenalarifin05/soerabaja-quest/pull/7)) |
| B28 | Seluruh `apps/web` | `stylelint` cuma men-scan file `.css` lewat glob `apps/**/*.css` — nilai heksadesimal mentah di kelas Tailwind arbitrary-value (`bg-[#hex]`) pada komponen React (`.tsx`) lolos tanpa terdeteksi CI | **Sudah diperbaiki** ([PR #6](https://github.com/zaenalarifin05/soerabaja-quest/pull/6)). Pasang `eslint-plugin-better-tailwindcss` (bukan `eslint-plugin-tailwindcss` klasik — dukungan Tailwind v4-nya masih beta/parsial saat dicek), aktifkan rule `no-restricted-classes` dengan pola regex khusus nilai hex. Dijalankan di CI lewat script baru `lint:tailwind` |

## P2 — Kelengkapan konsep

| # | Cakupan | Masalah | Perbaikan |
|---|---|---|---|
| B12 | Seluruh produk | Momen "lihat ke atas" — ide terkuat di konsep — belum punya layar sama sekali | Desain `LookUpMoment`: layar padam, satu kalimat rata tengah, tanpa tombol 3–15 detik |
| B13 | Seluruh produk | Suroboyoan tidak muncul di satu pun layar; identitas pembeda produk hilang | Masukkan ke judul misi, narasi, dan reaksi karakter. Navigasi tetap Bahasa Indonesia |
| B14 | Seluruh produk | Belum ada state kosong, error, offline, loading | Lengkapi per Definition of Done Dokumen 04 |
| B15 | S2.5 | Kartu share 9:16 dijanjikan di spesifikasi tapi tidak ada di layar badge | Tambah pratinjau kartu share di momen badge |
| B16 | Semua | Tombol hanya punya state default | Buat varian: default, tekan, fokus, disabled, loading |

---

## Yang sudah benar — jangan diubah

- **Aturan emas dipatuhi.** Warna emas hanya muncul di badge dan hitung mundur voucher, tidak pernah sebagai dekorasi.
- **Dua rezim terbaca berbeda tanpa label.** Arsip dan Lapangan langsung terasa sebagai dunia yang berbeda.
- **Chrome terkunci di sepertiga bawah** pada semua layar kamera, konsisten.
- **Courier Prime memikul perannya** sebagai penanda "ini dokumen, bukan antarmuka".

---

## Urutan pengerjaan yang disepakati

1. Selesaikan dulu set layar mobile (sedang berjalan)
2. Sprint perbaikan A — seluruh P0
3. Sprint perbaikan B — P1 + B12 (layar "lihat ke atas")
4. Sprint perbaikan C — P2 sisanya, lalu konversi ke komponen bervarian
5. **Beranda model hub** (sedang berjalan, terpisah dari urutan sprint di atas karena mengikuti tempo review desain asli pengguna) — B18–B25 dikerjakan begitu tata letak final beranda disepakati untuk seluruh 6 layar referensi, bukan dicicil per layar
