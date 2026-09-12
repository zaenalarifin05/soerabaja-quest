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
| B4 | Semua | Safe area belum ada; CTA di y=730–786 bertabrakan dengan home indicator | Padding atas 47pt, bawah 34pt di seluruh layar |
| B5 | Semua | Target sentuh gagal: `Tidak bisa scan?`, `Simpan kartu`, `Lanjut tanpa earphone` teks telanjang tanpa wadah 48dp | Bungkus semua kontrol teks dalam wadah min 48dp |

## P1 — Merusak kualitas, perbaiki sebelum handoff

| # | Layar | Masalah | Perbaikan |
|---|---|---|---|
| B6 | S6.1 | Ikon `◖◗` adalah retasan tipografi, bukan ikon | Ganti vektor earphone sungguhan, grid 24, stroke 1,75 |
| B7 | S2.5 | Badge masih medali aplikasi generik | Bangun ulang sebagai `BadgeStamp`: tepi tidak rata, tinta tidak merata, kesan ditekan ke dokumen |
| B8 | S6.1 | `Menunggu earphone…` dan `Lanjut tanpa earphone` warna identik `#7A8592`; kontras ~4:1 tidak terbaca di bawah matahari | Bedakan: status pasif tetap redup, kontrol aktif naik ke `--inti/perak` dengan wadah |
| B9 | S2.5, S6.1 | Ruang mati 90–150px; komposisi berat di atas | Naikkan blok teks atau turunkan badge; rapatkan ke ritme 8pt |
| B10 | Semua | Casing Display tidak konsisten (`NAPAK TILAS 45` vs `Pasang earphone`) | Kunci satu aturan: Display selalu huruf besar |
| B11 | S2.2 | Label `QR STANDEE` di atas gradien tanpa scrim gelap | Tambah lapisan `--inti/hitam` 62% di belakang semua teks mode kamera |

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
