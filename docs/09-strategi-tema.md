# 09 · Strategi Tema & Kesiapan Handoff

**Tanggal:** September 2026
**Menjawab:** apakah fase desain sudah lengkap, dan bagaimana menangani mode gelap/terang dengan biaya FE yang masuk akal

---

# BAGIAN A — STRATEGI TEMA

## 1. Kenyataan yang Sudah Ada

Sebelum membahas mode gelap dan terang, satu fakta yang mengubah seluruh pembahasan:

**Produk ini sudah punya dua tema di produksi, dan itu bukan pilihan pengguna.**

| Permukaan | Tema | Kenapa |
|---|---|---|
| Aplikasi pemain | Gelap | Kamera hidup; overlay AR butuh latar gelap |
| WebAR | Gelap | Sama |
| Wall Siola | Gelap | Layar besar di lobi, menyala 10 jam |
| **Merchant PWA** | **Terang** | Kafe berlampu, dibaca sambil berdiri, sesi pendek |
| **Admin CMS** | **Terang** | Kantor, siang hari, sesi berjam-jam |
| **Dashboard** | **Terang** | Sama |

Jadi pertanyaannya bukan "apakah nanti perlu mode terang". Mode terang **sudah ada** di tiga permukaan. Yang belum ada adalah lapisan yang membuat keduanya hidup dari satu sumber.

## 2. Rekomendasi: Bukan Mode Terang untuk Pemain

Sebagai pertimbangan UX, saya **tidak menyarankan** mode terang sebagai preferensi pengguna di aplikasi pemain. Tiga alasan:

**Satu — ledakan kombinasi.** Design system sudah punya dua rezim: Lapangan dan Arsip. Menambah gelap/terang di atasnya menghasilkan empat kombinasi. Arsip versi gelap itu apa — kertas hitam? Lapangan versi terang dengan kamera hidup jadi tidak terbaca. Dua dari empat kombinasi itu tidak punya makna.

**Dua — gelap di sini fungsional, bukan gaya.** Layar kamera harus gelap supaya objek AR terbaca. Kalau pengguna bisa memaksa terang, separuh produk rusak.

**Tiga — masalah sebenarnya bukan preferensi, tapi silau.** Keluhan nyata di Surabaya jam sepuluh pagi bukan "saya lebih suka terang", melainkan "saya tidak bisa membaca apa pun". Mode terang tidak menyelesaikan itu; kontras yang menyelesaikannya.

## 3. Yang Saya Sarankan: Mode Silau

Bukan pembalikan tema, melainkan **lapisan penguat kontras** di atas tema gelap yang ada.

| Yang berubah di Mode Silau | Dari | Menjadi |
|---|---|---|
| Scrim di belakang teks kamera | hitam 62% | hitam 82% |
| Berat teks isi | Regular 400 | Medium 500 |
| Warna teks sekunder | `--perak` | `--putih` |
| Garis dan pembatas | 18% opasitas | 40% opasitas |
| Bayangan halus | Ada | Dihapus semua |
| Kecerahan layar | — | Diminta naik ke maksimum |

**Pemicunya otomatis**, bukan tombol tersembunyi di pengaturan: sensor cahaya sekitar di atas ambang, atau pengguna berada di Layar Aksi luar ruangan antara pukul 09.00–16.00. Tetap sediakan sakelar manual di pengaturan untuk kasus sensor meleset.

**Biaya FE-nya kecil** kalau token semantik sudah ada — ia hanya satu peta nilai tambahan, bukan komponen baru. Tanpa token semantik, ia berarti menyentuh setiap komponen.

## 4. Kunci Sebenarnya: Lapisan Token Semantik

Ini jawaban atas pertanyaan tentang effort FE. **Biaya mode apa pun ditentukan di Sprint 0, bukan saat modenya dibangun.**

Kalau komponen menulis nilai mentah, menambah satu mode berarti menyentuh setiap komponen:

```css
/* SALAH — mengunci diri ke satu tema selamanya */
.kartu       { background: #14456F; }
.judul       { color: #F2F5F7; }
.tombol-aksi { background: #4FE68C; }
```

Kalau komponen menulis nama peran, menambah mode berarti mengganti satu peta:

```css
/* BENAR — komponen tidak tahu warnanya apa */
.kartu       { background: var(--permukaan-2); }
.judul       { color: var(--teks-utama); }
.tombol-aksi { background: var(--aksi-utama); }
```

### Peta token semantik

| Token semantik | Tema Gelap (pemain) | Tema Terang (merchant, CMS) | Mode Silau |
|---|---|---|---|
| `--permukaan-0` | `#08141F` | `#F6F8FA` | `#08141F` |
| `--permukaan-1` | `#0E2438` | `#FFFFFF` | `#0E2438` |
| `--permukaan-2` | `#14456F` | `#FFFFFF` | `#14456F` |
| `--permukaan-arsip` | `#E3D6B8` | `#E3D6B8` | `#E3D6B8` |
| `--teks-utama` | `#F2F5F7` | `#0E2438` | `#FFFFFF` |
| `--teks-sekunder` | `#C7D2DA` | `#6E7B88` | `#F2F5F7` |
| `--teks-redup` | `#7A8592` | `#98A4AE` | `#C7D2DA` |
| `--teks-arsip` | `#241B12` | `#241B12` | `#241B12` |
| `--aksi-utama` | `#4FE68C` | `#1E8B4E` | `#4FE68C` |
| `--aksi-teks` | `#08141F` | `#FFFFFF` | `#08141F` |
| `--pencapaian` | `#D4A22F` | `#8A6A16` | `#D4A22F` |
| `--bahaya` | `#E5533D` | `#C9402B` | `#E5533D` |
| `--garis` | rgba putih 18% | `#DCE3E8` | rgba putih 40% |
| `--scrim` | hitam 62% | — | hitam 82% |

**Perhatikan `--permukaan-arsip` dan `--teks-arsip`: nilainya sama di ketiga tema.** Rezim Arsip tidak ikut berubah. Dokumen 1945 tidak punya mode gelap — itu kertas, dan kertas selalu kertas. Ini menyelesaikan masalah "ledakan kombinasi" tanpa kehilangan apa pun.

Perhatikan juga `--aksi-utama` berubah dari `#4FE68C` ke `#1E8B4E` di tema terang. Mint terang tidak lolos kontras di atas putih. Ini contoh kenapa tema tidak bisa sekadar dibalik.

## 5. Yang Harus Dilakukan Sekarang

| Kapan | Tindakan | Biaya |
|---|---|---|
| **Sprint 0** | Bangun lapisan token semantik. Larang nilai mentah di komponen, tegakkan lewat lint | 2 hari |
| Sprint 0 | Definisikan tema Gelap dan Terang sebagai dua peta | Sudah ada datanya |
| Sprint 3–4 | Tambah Mode Silau sebagai peta ketiga | 1 hari kalau token benar |
| Nanti, kalau perlu | Mode terang untuk pemain | Mungkin, tanpa menulis ulang |

**Tegakkan lewat alat, bukan lewat niat.** Aturan lint yang menolak nilai heksadesimal di berkas komponen jauh lebih andal daripada kesepakatan di rapat. Di Figma, aturannya sama: setiap isian warna terikat ke variabel, tidak pernah diketik manual.

**Untuk Feed web**, hormati `prefers-color-scheme` bawaan sistem. Itu murah dan diharapkan pengguna. Tapi jangan berlaku untuk aplikasi pemain — di sana gelap adalah keputusan produk.

---

# BAGIAN B — KESIAPAN FASE DESAIN

## 6. Sudah Selesai

| Kategori | Isi |
|---|---|
| Dokumen | 9 berkas: rencana, analisa sistem, storyboard, design system, spek teknis, walkthrough, backlog, adendum arsitektur, Wall & Feed, strategi tema |
| Desain layar | 45 layar di 5 permukaan |
| Fondasi Figma | 20 variabel, 10 text style, papan palet, 2 spesimen rezim |
| Keputusan arsitektur | Model hybrid gulir/terkunci · model hub · gerbang privasi tiga tingkat · strategi tema |
| **Rekonsiliasi dokumen** *(update: selesai)* | Dokumen 01, 03, 04 diselaraskan ke adendum 07 dan 08 — model hub, batas 3× viewport, dua kelas layar, kamera-mati-penuh, timeout 90 detik, semuanya sudah masuk. Item ini sebelumnya nomor 1 di §7 (item blokir), sudah dipindah ke sini |
| **Lapisan token semantik** *(update: selesai)* | `packages/tokens` dibangun dengan lapisan primitif + semantik penuh (tiga peta: gelap/terang/silau), dan aturan lint penolak nilai heksadesimal sudah ditegakkan di CI (Dokumen 06 B27/B28) — persis yang disyaratkan §8 di bawah sebagai wajib sebelum Sprint 0 |
| **Prototipe klik — sebagian** *(update: sebagian selesai)* | Beranda + lima halaman POI (layar "sebelum-aksi") sudah berupa kode React/Next.js sungguhan di `apps/web`, bukan tautan Figma — lihat Dokumen 11 §7. Ini melampaui prototipe klik biasa, tapi **belum diuji ke pengguna nyata** — bagian itu di §7 item 4 di bawah tetap terbuka |

## 7. Belum Selesai — Memblokir

> **Update:** item lama #1 (rekonsiliasi Dokumen 01/03) sudah selesai — lihat §6 di atas. Nomor di bawah dirapikan ulang.

| # | Belum ada | Akibat |
|---|---|---|
| 1 | **31 dari 45 layar hanya ada di HTML** | Figma bukan sumber kebenaran; tim akan bertanya "yang mana yang benar" |
| 2 | **Backlog P0 belum dieksekusi di 14 layar Figma** | Dua versi berbeda beredar untuk layar yang sama |
| 3 | **Belum ada komponen bervarian** | Setiap layar baru dibuat dari nol; biaya perubahan naik terus |
| 4 | **Prototipe kode belum diuji ke siapa pun** | Enam halaman sudah berupa kode nyata (lihat §6), tapi seluruh asumsi UX yang mendasarinya masih asumsi — belum ada sesi uji dengan pengguna sungguhan di lapangan (Dokumen 10 D3) |

## 8. Belum Selesai — Tidak Memblokir

| Artefak | Catatan |
|---|---|
| Set ikon SVG grid 24 | Masih pakai glyph dan SVG inline |
| Tata letak Wall versi 28 px | Spesifikasi ada, visual belum |
| Desain Feed web | Belum ada sama sekali |
| Berkas naskah terstruktur dengan `reviewed_by` | Belum |
| Referensi gerak (video, bukan tabel) | Tabel timing ada, referensi visual belum |
| State kosong, galat, memuat | Baru sebagian |
| Audit aksesibilitas | Belum dijalankan |
| Foto lokasi asli untuk storyboard | Hanya Anda yang bisa mengambilnya |

## 9. Belum Selesai — Di Luar Desain

Tiga hal yang bukan pekerjaan desain tapi akan memblokir rilis kalau tidak dimulai sekarang:

**Izin hak cipta rekaman orasi dan foto arsip.** Proses 2–3 bulan. Sudah disebut sejak Rencana Pengembangan, dan setiap minggu penundaan menggeser tanggal rilis satu-satu.

**Rekrutmen AR engineer.** Jalur terpanjang di seluruh rencana.

**Survei lapangan lima titik.** Sinyal, akurasi GPS, sumber listrik untuk standee, dan uji tracking di jam 10 pagi. Tanpa ini, sebagian keputusan teknis di Dokumen 04 masih asumsi.

---

## 10. Jawaban Ringkas

**Apakah fase desain sudah lengkap?** Sekitar 75% pada saat ditulis; rekonsiliasi dokumen dan lapisan token semantik (dua dari lima item blokir) sudah selesai sejak itu — lihat §6. Yang tersisa bukan menambah layar — melainkan impor Figma, eksekusi backlog P0, komponen bervarian, dan pengujian ke pengguna nyata.

**Bisakah mode gelap dan terang ditangani saat development?** Bisa, dan sebagian sudah harus ada karena Merchant PWA dan CMS memang terang. Lapisan token semantik yang disyaratkan **sudah dibangun** (§6) — jadi menambah mode apa pun setelahnya sudah murah, sesuai skenario "kalau" di paragraf ini yang sekarang terpenuhi.

**Apa yang saya sarankan untuk pemain?** Bukan mode terang, melainkan Mode Silau — penguat kontras otomatis untuk siang hari Surabaya. Ia menyelesaikan masalah yang sebenarnya, dan biayanya sepersepuluh.
