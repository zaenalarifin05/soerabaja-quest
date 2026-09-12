# 10 · Rencana Fase Berikutnya & Walkthrough
## Dari Penutupan Desain ke Pilot Hari Pahlawan

**Tanggal:** September 2026
**Jangkar:** 10 November 2026 — pilot teaser WebAR pada rangkaian Hari Pahlawan
**Waktu tersisa:** sekitar 8 minggu

---

## 0. Keputusan yang Sudah Dikunci

Dicatat supaya tidak dibuka ulang tanpa alasan baru. Setiap perubahan atas daftar ini butuh keputusan sadar, bukan kesepakatan lisan di tengah sprint.

| # | Keputusan | Sumber |
|---|---|---|
| K1 | Satu tema: gelap, dengan Mode Silau sebagai penguat kontras otomatis | Dok 09 |
| K2 | Permukaan internal (Merchant, CMS, Dashboard) tetap terang | Dok 09 |
| K3 | Dua kelas layar: Halaman Baca boleh digulir, Layar Aksi terkunci | Dok 07 |
| K4 | Navigasi model hub, bukan jalur terkunci; satu POI berstatus aktif | Dok 07 |
| K5 | Batas 140 kata per layar dicabut, diganti batas 3× viewport | Dok 07 |
| K6 | Gerbang privasi tiga tingkat untuk Wall dan Feed | Dok 08 |
| K7 | Enam permukaan, satu backend, satu design system | Dok 08 |
| K8 | Lapisan token semantik wajib sebelum baris kode pertama | Dok 09 |

---

## 1. Peta Fase

```
   D2                D3                  E0              PILOT
Konsolidasi  →   Validasi        →   Sprint 0      →   10 NOV 2026
  2 minggu        2 minggu          + Build Pilot      Hari Pahlawan
                                       4 minggu
     │                │                   │                 │
 Satu sumber     Asumsi jadi        Fondasi teknis     Data perilaku
 kebenaran       data               + WebAR 1 titik    nyata
```

Setelah pilot, masuk ke roadmap di Dokumen 05: Fase 2 Desain & Konten mulai Desember 2026.

---

## 2. FASE D2 · Konsolidasi Desain

**Durasi:** 2 minggu · **Tujuan:** satu sumber kebenaran, tanpa versi yang saling bertentangan

Ini fase yang paling membosankan dan paling sering dilewati. Melewatinya berarti developer membaca dokumen yang saling bertentangan di bulan ketiga.

### Minggu 1

| Hari | Kegiatan | Pemilik | Keluaran |
|---|---|---|---|
| 1 | Selaraskan Dokumen 01 ke adendum: ganti state machine ke model hub, tambah entitas `Rank`, `ConsentRecord`, `scroll_position` | PM | Dok 01 v2 |
| 1–2 | Selaraskan Dokumen 03: cabut batas 140 kata, tambah aturan dua kelas layar, sticky CTA, skala tipografi Wall | Design Lead | Dok 03 v2 |
| 2 | Selaraskan Dokumen 04: kamera dimatikan penuh saat keluar Layar Aksi, timeout 90 detik, persistensi posisi gulir | Tech Lead | Dok 04 v2 |
| 3–5 | Bangun `tokens.json` W3C dengan **lapisan semantik**, bukan nilai mentah | Design Lead | Berkas token + Figma Variables |

### Minggu 2

| Hari | Kegiatan | Pemilik | Keluaran |
|---|---|---|---|
| 6–8 | Impor 31 layar HTML ke Figma lewat html.to.design; hapus 14 layar lama yang belum kena perbaikan P0 | UI Designer | Figma jadi sumber tunggal |
| 8–9 | Eksekusi backlog P0 dan P1 yang tersisa: B6–B11, B18–B23 | UI Designer | Backlog bersih sampai P1 |
| 9–10 | Ubah elemen berulang jadi komponen bervarian: tombol, bottom sheet, kartu POI, badge, chip status | UI Designer | Library komponen |
| 10 | Set ikon SVG grid 24, menggantikan glyph dan SVG inline | UI Designer | Berkas ikon |

### Gerbang keluar D2

- Tidak ada satu pun pernyataan yang bertentangan antar-dokumen
- Setiap isian warna di Figma terikat ke variabel, tidak ada yang diketik manual
- Backlog P0 dan P1 kosong
- Figma berisi seluruh 45 layar; berkas HTML turun status jadi arsip

---

## 3. FASE D3 · Validasi Lapangan

**Durasi:** 2 minggu · **Tujuan:** mengubah asumsi jadi data sebelum ada kode yang ditulis

### Minggu 3 — Menyiapkan

| Kegiatan | Keluaran |
|---|---|
| Rangkai prototipe klik dari layar Figma: alur penuh Yamato sampai redeem | Tautan prototipe yang bisa dibuka di HP |
| Cetak 3 varian desain standee, uji skor tracking dan uji di bawah matahari jam 10 | Desain standee terpilih |
| Survei teknis 5 titik: sinyal seluler, akurasi GPS, sumber listrik | Laporan kelayakan lokasi |
| Rekrut 8 penguji: 5 pelajar/mahasiswa 16–22, 2 guru, 1 pemilik warung Tunjungan | Jadwal uji |

### Minggu 4 — Menguji

Uji dilakukan **di Jalan Tunjungan, bukan di ruang rapat.** Prototipe dibuka di HP penguji sendiri, bukan HP tim.

| Yang diuji | Pertanyaan yang dijawab |
|---|---|
| Beranda model hub | Dalam berapa detik penguji tahu harus ke mana? |
| Halaman POI yang digulir | Berapa dalam mereka menggulir sebelum berhenti? |
| Perpindahan ke Layar Aksi | Apakah terasa seperti mode berbeda, atau membingungkan? |
| Alur redeem | Apakah penguji ragu saat berdiri di depan kasir? |
| **Kedalaman gulir** | Apakah batas 3× viewport terasa terlalu panjang atau pas? |
| Keterbacaan di bawah matahari | Apakah Mode Silau memang dibutuhkan, dan sekuat apa? |

### Gerbang keluar D3

- Minimal 5 sesi uji selesai dengan catatan terstruktur
- Daftar temuan diprioritaskan, dan perbaikan yang memblokir sudah dikerjakan
- Keputusan kedalaman gulir difinalkan berdasar data, bukan dugaan
- Lokasi standee dan desainnya disetujui pengelola kawasan

---

## 4. FASE E0 · Sprint 0 + Build Pilot

**Durasi:** 4 minggu · **Tujuan:** fondasi teknis yang benar, plus WebAR satu titik yang siap dipakai publik

### Pilihan titik pilot — dan alasannya

**Pilot memakai Hotel Majapahit, bukan Tugu Pahlawan.**

Alasannya bukan naratif, melainkan jadwal. Pengalaman Tugu Pahlawan bergantung pada rekaman orasi Bung Tomo, dan proses lisensinya memakan 2–3 bulan. Memilihnya berarti pilot 10 November mustahil. Interaksi merobek bendera di Yamato tidak memerlukan lisensi rekaman apa pun — hanya foto arsip yang izinnya lebih sederhana, dan interaksinya justru yang paling kuat di seluruh konsep.

Ini contoh keputusan produk yang ditentukan oleh jalur terpanjang, bukan oleh preferensi.

### Minggu 5–6 — Fondasi

| Kegiatan | Pemilik | Catatan |
|---|---|---|
| Repo, CI/CD, lingkungan staging | Tech Lead | |
| **Lapisan token semantik + aturan lint penolak nilai heksadesimal** | FE Lead | K8. Tanpa ini, semua mode jadi mahal selamanya |
| Backend skeleton: `/routes`, `/missions/verify`, sesi tamu | Backend | Verify diperlakukan seperti endpoint pembayaran |
| Kontrak API `openapi.yaml` v1 | Tech Lead | Disepakati sebelum ada klien yang dibangun |
| Lisensi 8th Wall, akun, kuota | PM | |
| **Spike UaaL** — Flutter + Unity, pesan dua arah, muat 1 aset | AR Engineer | Gerbang lanjut/ganti arsitektur |

### Minggu 7–8 — Build Pilot

| Kegiatan | Pemilik |
|---|---|
| WebAR 9 layar sesuai desain, anggaran keras 4 MB | FE + AR |
| Aset bendera: mesh cloth, maksimal 4.000 tris, 1,9 MB | 3D Artist |
| Penanganan tiga jalan buntu: in-app browser, izin ditolak, WebXR tidak didukung | FE |
| Cetak dan pasang standee, izin lokasi | PM |
| Instrumentasi: 6 event inti, funnel dari buka sampai selesai | FE |
| Uji lapangan di 10 model HP, siang dan sore | QA |
| Gladi bersih operasional bersama petugas kawasan | PM |

### Gerbang keluar E0

- Spike UaaL berhasil dalam < 2,5 detik, atau rencana cadangan diaktifkan **sekarang**
- WebAR lolos anggaran 4 MB dan Time to Interactive ≤ 5 detik di 4G
- Tiga jalan buntu tertangani dan diuji langsung di aplikasi Instagram
- Standee terpasang dan lolos tracking pada jam 10, 15, dan 19

---

## 5. Pilot 10 November 2026

**Bukan peluncuran.** Ini pengumpulan data perilaku dengan risiko rendah.

| Yang diukur | Target minimum untuk lanjut |
|---|---|
| Penyelesaian pengalaman WebAR | ≥ 500 |
| Rasio selesai dari yang membuka | ≥ 45% |
| Konversi ke daftar tunggu instal | ≥ 20% |
| Kepuasan (survei 1 pertanyaan) | ≥ 60% puas |
| Kegagalan teknis di lapangan | ≤ 10% sesi |

**Keputusan setelah pilot:** kalau angka tercapai, lanjut ke Fase 2 di Dokumen 05 dengan keyakinan dan bukti untuk mencari pendanaan. Kalau tidak, kita tahu di November 2026 dengan biaya kecil — bukan di November 2027 setelah menghabiskan miliaran.

---

## 6. Yang Harus Dimulai Sekarang, Paralel

Tiga hal ini tidak menunggu fase mana pun. Jalur terpanjang, mulai hari ini.

| Kegiatan | Kenapa mendesak |
|---|---|
| **Izin hak cipta rekaman orasi dan foto arsip** | 2–3 bulan. Menentukan apakah Level 3 mungkin di v1.0 |
| **Rekrutmen AR engineer** | Jalur terpanjang di seluruh rencana; kalau gagal, jadwal mundur 3–6 bulan |
| **Bentuk dewan kurator** | 2 sejarawan kampus + 2 komunitas. Tanpa mereka, naskah tidak bisa lolos gerbang di CMS |
| **Foto lokasi asli untuk storyboard** | Hanya Anda yang bisa mengambilnya. Dibutuhkan untuk presentasi ke Disbudporapar |

---

## 7. Peran dan Tanggung Jawab

| Peran | D2 | D3 | E0 |
|---|---|---|---|
| Product Owner | Memutuskan konflik dokumen | Memimpin sesi uji | Menjaga ruang lingkup pilot |
| Design Lead | Token semantik, rekonsiliasi Dok 03 | Prototipe klik | Dukungan implementasi |
| UI Designer | Impor, backlog, komponen | Perbaikan hasil uji | Aset WebAR |
| Tech Lead | Rekonsiliasi Dok 04 | Survei teknis lokasi | Kontrak API, spike |
| FE Lead | — | — | Token, WebAR |
| AR Engineer | — | Uji tracking standee | Spike UaaL, scene AR |
| QA | — | Fasilitasi uji | Uji lapangan 10 HP |

---

## 8. Definition of Ready untuk Development

Development tidak dimulai sebelum seluruh butir ini terpenuhi. Daftar ini yang membedakan proyek yang lancar dari proyek yang terus-menerus berhenti untuk bertanya.

- [ ] Tidak ada pernyataan yang bertentangan antar-dokumen
- [ ] `tokens.json` dengan lapisan semantik tersedia dan terhubung ke Figma
- [ ] Seluruh layar ada di Figma sebagai komponen bervarian
- [ ] Backlog P0 dan P1 kosong
- [ ] Prototipe sudah diuji ke minimal 5 pengguna nyata
- [ ] `openapi.yaml` v1 disepakati
- [ ] Keputusan arsitektur AR sudah final lewat spike
- [ ] Survei teknis 5 titik selesai
- [ ] Dewan kurator terbentuk
- [ ] Status lisensi arsip diketahui, termasuk rencana cadangan bila ditolak

---

## Catatan Penutup

Delapan minggu menuju 10 November adalah jadwal yang ketat tapi masuk akal, **dengan syarat ruang lingkup pilot dijaga keras.** Godaan terbesar akan muncul di minggu keenam: menambahkan titik kedua, menambahkan badge, menambahkan voucher. Tolak semuanya.

Pilot ini bukan untuk memamerkan produk. Ia untuk menjawab satu pertanyaan: apakah orang yang berdiri di trotoar Tunjungan mau berhenti, mengangkat HP, dan menyelesaikan enam puluh detik. Kalau jawabannya ya, semua yang lain bisa dibangun. Kalau tidak, lebih baik tahu sekarang.
