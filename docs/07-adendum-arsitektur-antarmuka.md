# 07 · Adendum Arsitektur Antarmuka
## Dua Kelas Layar: Halaman Baca & Layar Aksi

**Tanggal:** September 2026 · **Status:** disetujui, menggantikan asumsi layar tetap di Dokumen 01 dan 03
**Pemicu:** desain terbaru memakai halaman gulir; interaksi AR dan kamera diputuskan tetap sebagai layar terkunci

---

## 1. Aturan Induk

> **Layar untuk membaca boleh digulir. Layar untuk bertindak tidak.**

Kalau mata pengguna harus berpindah ke dunia nyata, atau ada orang lain yang sedang menunggu, viewport dikunci.

| | **HALAMAN BACA** | **LAYAR AKSI** |
|---|---|---|
| Tinggi | Bebas, maksimal 3× viewport | Persis 1× viewport, `overflow: hidden` |
| Perhatian pengguna | Di layar | Di dunia nyata, atau pada orang lain |
| Kamera | Tidak aktif | Boleh full-bleed |
| Navigasi | Tab bar terlihat | Tab bar disembunyikan |
| Cara keluar | Bebas, kapan saja | Satu jalan keluar eksplisit |
| Posisi gulir | Dipulihkan saat kembali | Tidak berlaku |
| CTA | Sticky di bawah | Tetap di sepertiga bawah |

---

## 2. Uji Keputusan

Saat ragu menempatkan layar baru, jawab tiga pertanyaan ini. **Satu saja "ya" berarti Layar Aksi.**

1. Apakah kamera perlu hidup?
2. Apakah ada orang lain yang menunggu hasilnya — kasir, guru, teman serombongan?
3. Apakah pengguna harus mengangkat kepala atau menggerakkan badan?

Kalau ketiganya "tidak", ia Halaman Baca.

---

## 3. Klasifikasi 45 Layar

### Layar Aksi — viewport terkunci

| Layar | Alasan |
|---|---|
| S2.2 Pemindaian QR | Bingkai bidik harus di posisi tetap setiap kali |
| S2.4 AR Robek Bendera | Kamera hidup; gestur usap bertabrakan dengan gestur gulir |
| S4.1 Mode Investigasi (saat pindai) | Kamera hidup |
| S6.1 Gerbang Earphone | Gerbang, menurut definisi, tidak digulir |
| S6.2 AR Orasi | Kamera hidup, pengguna berputar mencari arah suara |
| S12 Momen Lihat Ke Atas | Seluruh kekuatannya karena tidak ada yang bisa dilakukan |
| S8.3a / S8.3b QR Kasir | Antrean di belakang. Menggulir mencari QR = kegagalan produk |
| S15 Verifikasi Gagal | Bagian dari alur kamera |
| Navigasi aktif (radar rute) | Orang berjalan mencari standee tidak bisa menggulir |
| M2 Pemindaian merchant | Kamera hidup |
| M3 / M4 Konfirmasi merchant | Pelanggan menunggu; harus terbaca dari seberang meja |
| M5 Input kode offline | Pelanggan menunggu |
| W2 Pra-izin WebAR | Satu keputusan, satu layar |
| W4 / W5 Kamera WebAR | Kamera hidup |

### Halaman Baca — gulir diizinkan

Beranda rute · S1 Briefing · S2.1 Kartu pratinjau titik · S2.3 Lore · S2.5 Badge · S3 Konvoi audio · S4.2 Dua Versi · S7 Guestbook Siola · S8.1 Daftar merchant · S10 Profil & Koleksi · S11 Riwayat Voucher · S13 School Mode · S16 Mode Offline · W1 Landing · M1 Siaga · M6 Voucher salah merchant · M7 Rekap · M8 Latihan · seluruh CMS dan Dashboard.

### Catatan khusus

**S3 Konvoi** adalah Halaman Baca, tapi kunci keselamatan tetap berlaku: di atas 7 km/jam, kamera terkunci dan halaman berubah jadi pemutar audio sederhana yang tidak menuntut gulir.

**S4.1 Mode Investigasi** terbelah dua. Papan bukti dengan tiga kartu foto boleh digulir. Begitu pemain menekan "Pindai area jembatan", ia masuk Layar Aksi.

---

## 4. Transisi Antar Kelas

Ini bagian yang paling sering salah diimplementasikan. Perpindahan dari Halaman Baca ke Layar Aksi bukan navigasi biasa — ia perubahan mode.

**Masuk ke Layar Aksi:**
- Tab bar menghilang, tidak sekadar tertutup
- Posisi gulir halaman asal disimpan
- Transisi memakai gestur robek, 700 ms — satu-satunya animasi panjang di sistem
- Notifikasi dalam aplikasi ditahan sampai keluar

**Keluar dari Layar Aksi:**
- Selalu ada satu jalan keluar yang terlihat; tidak pernah menjebak
- Kembali ke posisi gulir yang tersimpan, bukan ke puncak halaman
- Kamera dimatikan sepenuhnya, bukan disembunyikan — ini soal baterai dan panas, bukan kerapian kode

**Timeout:** Layar Aksi yang menganggur 90 detik kembali sendiri ke Halaman Baca dengan kamera mati. Mencegah HP panas di saku dalam keadaan kamera menyala.

---

## 5. Aturan Halaman Baca

**Batas kedalaman: 3× tinggi viewport, sekitar 2.500 piksel.** Beranda pada desain saat ini sekitar lima sampai enam kali viewport. Memisahkan Koleksi Lencana menjadi pratinjau tiga slot dan memindahkan kartu briefing ke alur pertama kali akan memangkasnya hampir separuh.

**CTA utama sticky.** Aturan "chrome di sepertiga bawah" tetap hidup di dunia gulir dengan cara ini. Tanpa sticky, pemain harus menggulir kembali ribuan piksel untuk menekan tombol utama.

**Indikator progres baca** pada halaman lore, supaya pembaca tahu masih berapa jauh. Batas 140 kata per layar dari Dokumen 03 **dicabut** — diganti batas 3× viewport per POI. Kurator boleh menulis sesuai kebutuhan peristiwa; Yamato dan Mallaby memang tidak sama panjangnya.

**Posisi gulir bertahan** melintasi layar mati, telepon masuk, dan aplikasi ditutup. Di halaman 844 piksel ini tidak penting. Di halaman 2.500 piksel ini menentukan apakah orang melanjutkan atau menyerah.

---

## 6. Perubahan State Machine — Model Hub

Model jalur terkunci diganti. Semua POI terlihat sejak awal dengan status masing-masing.

```
              ┌──────────────────────────────────┐
              │         BERANDA RUTE             │
              │  5 POI terlihat sekaligus        │
              │  + CTA "Lanjutkan Misi" → aktif  │
              └───────────────┬──────────────────┘
                              │
     ┌────────────┬───────────┼───────────┬────────────┐
     ▼            ▼           ▼           ▼            ▼
 SELESAI       AKTIF      TERKUNCI    TERKUNCI    TERKUNCI
 (badge        (CTA       (urutan     (urutan     (urutan
  emas)        menuju)     belum)      belum)      belum)
```

**Yang berubah:** POI terkunci tetap **terlihat dengan nama dan tanggalnya**, tidak disembunyikan. Kronologi 19 Sept → 30 Okt → 10 Nov dijaga lewat status kartu, bukan dengan menyembunyikan peta besarnya. Pemain yang kembali tiga hari kemudian tahu posisinya dalam satu detik.

**Yang tetap:** urutan penyelesaian tetap dipaksa berurutan untuk rute pertama. Voucher tetap terbit hanya pada `ROUTE_CLEARED`.

**Konsep baru — POI aktif:** tepat satu POI berstatus `AKTIF` pada satu waktu, dan CTA "Lanjutkan Misi" selalu menunjuk ke sana. Ini yang membuat beranda bisa dipakai tanpa berpikir.

---

## 7. Sistem Pangkat — Perlu Didefinisikan

Desain menampilkan "Cak Adi (Rekrut Baru)". Ini tambahan bagus yang tidak ada di rencana awal — ia memberi alasan kembali yang tidak bergantung pada rilis rute baru. Tapi harus didefinisikan sekarang, atau ia akan jadi tempelan tanpa aturan.

**Usulan lima tingkat:**

| Pangkat | Syarat | Nada |
|---|---|---|
| Rekrut Baru | Daftar | Netral, tanpa merendahkan |
| Arek Lapangan | 1 rute tuntas | |
| Penjaga Kota | 3 rute tuntas atau 5 tokoh dikumpulkan | |
| Saksi Sejarah | Seluruh rute tersedia tuntas | |
| Cak/Ning Suroboyo | 10 tokoh lengkap | Pangkat tertinggi, sebutan kehormatan kota |

Pangkat ditampilkan di beranda dan profil, tidak pernah di layar misi — ia identitas, bukan mekanik permainan.

---

## 8. Perbaikan yang Masuk Backlog

Tiga temuan dari beranda, ditambahkan ke Dokumen 06:

**B18 · Mint terlalu banyak dipakai.** Di beranda, mint muncul di tombol, chip status, ikon, garis, dan aksen kartu sekaligus. Ketika semuanya menyala, tidak ada yang menonjol. Kembalikan ke aturan Dokumen 03: mint hanya untuk aksi utama dan status aktif; sisanya perak.

**B19 · Emas belum dipakai untuk pencapaian.** Lencana yang sudah diraih harus emas. Kalau tidak, sinyal terkuat sistem hilang dan lencana terlihat sama saja dengan chip biasa.

**B20 · Koleksi Lencana dan kartu briefing perlu dipisah dari beranda.** Koleksi jadi pratinjau tiga slot dengan "lihat semua" menuju S10. Briefing pindah ke alur pertama kali, sisakan tautan "baca ulang perintah operasi".

---

## 9. Dampak ke Dokumen Lain

| Dokumen | Perubahan |
|---|---|
| 01 Analisa Sistem | State machine diganti model hub · tambah entitas `Rank` dan `PlayerRank` · tambah field `scroll_position` pada progres |
| 03 Design System | Batas 140 kata dicabut · tambah aturan dua kelas layar · tambah spesifikasi sticky CTA dan indikator progres baca |
| 04 Spesifikasi Teknis | Tambah aturan kamera dimatikan penuh saat keluar Layar Aksi · timeout 90 detik · persistensi posisi gulir |
| 06 Backlog | Tambah B18, B19, B20 |

---

## Catatan Penutup

Satu hal yang perlu dijaga tim seiring produk ini bergerak ke model gulir.

Seluruh tesis produk adalah mengangkat kepala — *"Lepaskan HP-mu. Lihat tugunya."* Antarmuka yang digulir melatih postur yang persis berlawanan: menunduk, jempol bergerak, dunia hilang.

Model gulir tetap keputusan yang benar untuk konten dan untuk kecepatan tim. Tapi konsekuensinya: **momen lihat-ke-atas jadi makin penting, bukan makin tidak penting.** Ia satu-satunya rem di tengah arus gulir, dan ia tidak boleh dikorbankan saat jadwal menyempit.
