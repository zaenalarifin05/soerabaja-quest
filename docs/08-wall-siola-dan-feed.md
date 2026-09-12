# 08 · Wall Siola & Soerabaja Feed
## Permukaan Keenam

**Tanggal:** September 2026
**Pemicu:** desain Wall menampilkan satu tata letak untuk dua kanal yang kendalanya berlawanan
**Status:** spesifikasi baru; menambah permukaan keenam ke arsitektur di Rencana Pengembangan

---

## 1. Ini Dua Produk, Bukan Satu

Wall di lobi Siola dan Soerabaja Feed berbagi data yang sama, tapi kendalanya berlawanan arah.

| | **WALL SIOLA** | **SOERABAJA FEED** |
|---|---|---|
| Jarak baca | 2–4 meter | 40 cm |
| Interaksi | Tidak ada; tanpa sentuh | Klik, gulir, filter, bagikan |
| Durasi lihat | 10–30 detik, sambil lewat | Bermenit-menit |
| Penonton | Orang banyak sekaligus | Satu orang |
| Teks minimum | 40 px pada 1080p | 13 px cukup |
| Elemen per layar | Maksimal 6 blok | Bebas |
| Kendali | Berotasi otomatis | Pengguna |

**Aturan induk: satu sumber data, dua tata letak.** Wall memuat sekitar sepertiga elemen Feed dengan tipografi dua kali lebih besar. Memaksakan satu tata letak untuk keduanya berarti Wall jadi tekstur abu-abu dari jarak dua meter, dan Feed terasa kosong di layar laptop.

---

## 2. Skala Tipografi Wall

Diturunkan dari jarak baca 2,5 meter pada layar 55 inci resolusi 1080p.

| Peran | Ukuran pada 1080p | Padanan mobile |
|---|---|---|
| Judul dinding | 92 px | Display XL |
| Kutipan utama | 56 px | Judul M |
| Nama kontributor | 40 px | Isi L |
| Metadata | 32 px | Isi S |
| **Batas bawah mutlak** | **28 px** | — |

Apa pun yang tidak muat di atas 28 px **tidak masuk Wall**. Ia pindah ke Feed. Aturan ini menyelesaikan sebagian besar keputusan tata letak tanpa perlu diperdebatkan.

---

## 3. Apa yang Masuk Wall, Apa yang Tidak

### Masuk
- **Satu kartu kontribusi besar** yang berotasi, memakai setengah layar: foto AR, kutipan, nama panggilan, titik, waktu
- **Strip lima titik rute** — konsisten dengan beranda aplikasi, supaya pengunjung yang baru selesai langsung mengenali posisinya
- **Panel QR kontribusi** — tiga langkah, tetap di posisi yang sama, tidak pernah berotasi
- **Tiga hitungan sederhana**: foto terkirim, pesan tayang, pengunjung hari ini
- **Tagline** "Dua Zaman, Satu Layar"

### Tidak masuk
| Elemen | Alasan | Pindah ke |
|---|---|---|
| Antrean verifikasi live | Mekanika internal; membocorkan alur moderasi ke publik | CMS |
| Ticker telemetri, FPS | Chrome pengembang. Jangan sampai ikut rilis | Dihapus |
| Dampak UMKM Rp 142,5M | Metrik dasbor kota. Angka rupiah besar di layar publik mengundang pertanyaan metodologi yang tidak ingin dijawab di lobi | Dashboard D2 |
| Daftar kontributor kecil di sisi | Tidak terbaca dari 2 meter | Feed |
| Caption panjang | Tidak terbaca, dan tidak ada waktu membacanya | Feed |

---

## 4. Gerbang Privasi — Tiga Tingkat Tayang

Ini bagian terpenting dokumen ini.

**Asumsi yang harus dibuang:** "bukan School Mode berarti dewasa." School Mode bukan satu-satunya pintu masuk anak. Remaja 14 tahun mendaftar sendiri lewat Solo Explorer. Anak 11 tahun memakai HP orang tuanya. Solo Explorer juga tidak punya verifikasi usia — deklarasi mandiri bisa diklik siapa saja.

Karena itu gerbangnya bertumpu pada **persetujuan eksplisit per unggahan dengan default yang aman**, bukan pada mode masuk.

| Tingkat | Yang tayang | Syarat |
|---|---|---|
| **A — Default untuk semua** | Kutipan teks, nama panggilan, titik, waktu. **Tanpa foto orang** | Tidak ada; ini bawaan |
| **B — Foto tanpa wajah** | Foto AR di mana wajah membelakangi, terpotong, atau dikaburkan. Nama depan saja | Akun menyatakan 18+ **dan** persetujuan per unggahan **dan** lolos moderator |
| **C — Wajah dan nama lengkap** | Foto wajah, nama lengkap, institusi | Semua syarat B **plus** persetujuan tertulis sekali seumur akun, disimpan dengan stempel waktu |

**Aturan yang dipaksakan sistem, bukan oleh ingatan moderator:**

1. Deteksi wajah otomatis menahan setiap foto yang memuat wajah terdeteksi. Foto hanya bisa naik ke tingkat B atau C lewat tindakan moderator, tidak pernah otomatis.
2. Sub-profil School Mode **tidak punya tombol menuju Wall sama sekali** — tujuannya hanya rekap kelas. Konsisten dengan C3 di CMS: tombolnya dihapus, bukan diandalkan pada kehati-hatian.
3. Akun yang menyatakan usia 13–17 terkunci di tingkat A. Tanpa foto orang, tanpa nama institusi.
4. Akun tanpa keterangan usia diperlakukan sebagai tingkat A.
5. Persetujuan bisa ditarik. Penarikan menghapus entri dari Wall dan Feed dalam 15 menit.

**Catatan tentang institusi:** nama sekolah atau kampus yang digabung dengan nama lengkap dan wajah membuat seseorang bisa ditemukan di dunia nyata. Untuk tingkat C, institusi hanya boleh tampil bila pengguna memilihnya secara terpisah, bukan ikut otomatis.

---

## 5. Moderasi — Jeda Lima Menit

Desain saat ini menyebut "moderasi otomatis, tayang dalam 30 detik". Layar publik di gedung milik Pemkot dengan publikasi otomatis tiga puluh detik adalah risiko yang tidak sebanding dengan manfaatnya.

**Usulan:**
- Klasifikasi tetap otomatis — teks, wajah, konten tidak pantas
- **Jeda tayang 5 menit** antara lolos klasifikasi dan muncul di Wall
- Satu petugas Siola per shift memegang tombol tahan di tablet, dengan daftar antrean tayang
- Tombol "Kosongkan Wall" untuk keadaan darurat, mengembalikan layar ke mode arsip statis

Jeda lima menit tidak akan dirasakan pengunjung — mereka sudah berpindah ruangan. Tapi ia memberi ruang menghentikan satu unggahan bermasalah sebelum ratusan orang melihatnya.

---

## 6. Perilaku Wall

| Keadaan | Perilaku |
|---|---|
| **Normal** | Kartu utama berotasi tiap 12 detik. Panel QR dan strip rute tidak pernah berpindah |
| **Sepi** (belum ada kontribusi hari ini) | Tampilkan arsip terbaik minggu lalu, diberi label jelas. Jangan pernah menampilkan keadaan kosong |
| **Museum tutup** | Mode malam: foto arsip monokrom berotasi lambat, kecerahan turun 60%, tanpa QR |
| **Jaringan putus** | Tampilkan cache 50 entri terakhir. Tanpa pesan galat di layar publik |
| **Sistem bermasalah** | Jatuh ke poster statis, bukan layar biru. Siapkan gambar cadangan di perangkat |

**Anti burn-in:** elemen statis — panel QR, strip rute, tagline — digeser 4 piksel tiap 20 menit. Layar menyala 10 jam sehari selama bertahun-tahun; tanpa ini, panel QR akan terbakar permanen di panel.

---

## 7. Spesifikasi Teknis Wall

| Aspek | Spesifikasi |
|---|---|
| Perangkat | Layar komersial 55–65 inci, orientasi potret atau lanskap sesuai lobi |
| Resolusi rancangan | 1080 × 1920 potret, atau 1920 × 1080 lanskap |
| Pemutar | Perangkat mini-PC atau media player; **bukan** browser tab di laptop |
| Mode | Kiosk, tanpa kursor, tanpa bilah alamat |
| Muat ulang | Otomatis tiap 6 jam di luar jam buka |
| Jam operasi | Mengikuti jam buka Museum Surabaya; mode malam di luar itu |
| Kecerahan | Minimal 500 nit; lobi Siola terang di siang hari |
| Audio | Tidak ada. Wall bisu — lobi museum bukan tempat pengeras suara |

---

## 8. Soerabaja Feed

Kanal web publik, tata letak berbeda, data sama.

**Fungsi yang hanya ada di Feed:**
- Gulir tak terbatas dengan filter per titik dan per tanggal
- Halaman per kontribusi dengan tautan yang bisa dibagikan
- Pencarian dan tagar
- Tautan "Ikut rute ini" menuju instal aplikasi — Feed adalah kanal akuisisi, bukan sekadar arsip
- Halaman arsip bulanan yang bisa diindeks mesin pencari

**Aturan privasi identik.** Tingkat A, B, C berlaku sama. Yang tayang di Wall pasti boleh tayang di Feed, dan sebaliknya — tidak ada entri yang punya izin berbeda antar-kanal. Satu aturan, dua tampilan.

---

## 9. Dampak ke Dokumen Lain

| Dokumen | Perubahan |
|---|---|
| Rencana Pengembangan | Arsitektur ekosistem jadi **enam permukaan**; tambah Wall dan Feed |
| 01 Analisa Sistem | Tambah entitas `ConsentRecord` dengan tingkat A/B/C, stempel waktu, dan jejak penarikan. Tambah aktor "Petugas Siola" |
| 03 Design System | Tambah skala tipografi Wall dengan batas bawah 28 px |
| 04 Spesifikasi Teknis | Tambah spesifikasi perangkat kiosk, anti burn-in, perilaku offline |
| 06 Backlog | B21 · hapus ticker FPS · B22 · pindahkan metrik UMKM ke D2 · B23 · ubah 30 detik jadi jeda 5 menit |

---

## Catatan Penutup

Panel QR kontribusi adalah bagian terkuat dari seluruh desain Wall. Ia menutup lingkaran yang dijanjikan storyboard S7 — *"muncul di dinding digital fisik di lobi Siola"* — dengan tiga langkah jelas dan tanpa perlu instal apa pun.

Justru karena itu gerbang privasinya harus benar sejak awal. Permukaan yang membuat orang ingin berkontribusi adalah permukaan yang paling banyak mengumpulkan wajah dan nama. Kemudahan berkontribusi dan perlindungan anak bergerak berlawanan arah, dan satu-satunya cara mendamaikannya adalah membuat tingkat A cukup memuaskan untuk dibagikan — kutipan yang bagus di layar besar tetap terasa membanggakan tanpa perlu wajah.
