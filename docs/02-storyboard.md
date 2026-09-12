# 02 · Storyboard Lengkap
## Dari Layar Pertama hingga Es Kopi Susu di Tunjungan

**Persona pemandu:** Adi, 19 tahun, mahasiswa semester 3, HP Redmi Note kelas Rp 2,5 juta, kuota 8 GB/bulan, datang berdua dengan temannya Sabtu pagi.
**Durasi total rute:** 3 jam 20 menit (termasuk perpindahan dan istirahat)
**Jarak tempuh:** ±4,1 km, dengan 1 segmen kendaraan

Setiap scene ditulis dalam format yang bisa langsung dipakai desainer dan developer: apa yang terlihat, apa yang dilakukan pemain, apa yang dikerjakan sistem, apa bunyi copy-nya, dan apa yang bisa salah.

---

## Peta Alur Besar

```
S0 TEMU        S1 SIAP       S2 TITIK 1        S3 KONVOI      S4 TITIK 2
Web/IG/QR  →  Briefing   →  Hotel Majapahit → Audio drama → Jembatan Merah
                            19 Sept '45        (2,4 km)      30 Okt '45
                                                                  │
                     ┌────────────────────────────────────────────┘
                     ▼
S5 KONVOI      S6 TITIK 3        S7 TITIK 4        S8 TITIK 5      S9 PULANG
Audio drama → Tugu Pahlawan  →  Siola          →  Tunjungan   →  Share &
(1,1 km)      10 Nov '45         Refleksi          Redeem          Hook
```

---

## S0 · Temu Pertama

**Lokasi:** Di mana saja — kos, kelas, atau justru di trotoar Tunjungan
**Tujuan scene:** Mengubah rasa penasaran 5 detik menjadi niat datang

| Frame | Isi |
|---|---|
| **Pemicu** | Tiga jalur: (a) Reels teman yang membagikan kartu badge, (b) pencarian "wisata sejarah Surabaya" → landing web, (c) QR di standee yang kebetulan dilewati |
| **Yang terlihat** | Halaman web membuka dengan satu hal: potongan audio orasi 12 detik yang berjalan otomatis dengan visualisasi gelombang di atas siluet Tugu Pahlawan. Tidak ada hero image generik, tidak ada tombol "Learn More" |
| **Aksi Adi** | Menekan "Coba sekarang, tanpa unduh" |
| **Respons sistem** | Membuka WebAR ringan (< 4 MB). Meminta izin kamera. Menampilkan satu marker sederhana yang bisa dipindai dari layar mana pun — poster, screenshot, atau standee |
| **Copy layar** | Judul: *Kota iki tau dadi medan perang. Saiki dadi arena mu.*<br>Sub: Lima titik. Tiga jam. Satu kota yang tidak pernah kamu lihat seperti ini.<br>Tombol: `Coba sekarang` · `Lihat rutenya` |
| **Audio** | Ambient rendah, potongan orasi. Mute default di mobile, dengan tombol suara yang menonjol |
| **Yang bisa salah** | Izin kamera ditolak → langsung tampilkan versi video 20 detik, jangan buntu. Koneksi lambat → tampilkan poster statis dulu, muat AR di belakang |
| **Metrik scene** | % pengunjung web yang menyelesaikan trial WebAR; % dari itu yang menginstal |

---

## S1 · Briefing

**Lokasi:** Rumah (H-1) atau di lokasi (H-0)
**Tujuan scene:** Menyiapkan Adi secara fisik dan mental, bukan sekadar menampilkan menu

| Frame | Isi |
|---|---|
| **Yang terlihat** | Layar pemilihan rute berbentuk **dokumen perintah operasi** — bukan kartu produk. Kertas arsip, cap "RAHASIA" yang sudah pudar, daftar lima titik dengan koordinat dan jam |
| **Aksi Adi** | Memilih rute "Napak Tilas 45 · Rute Penuh". Mengetuk `Siapkan misi` |
| **Respons sistem** | 1. Cek kesiapan: baterai, koneksi WiFi, ruang penyimpanan<br>2. Tawarkan unduh offline pack (218 MB) — **hanya lewat WiFi secara default**<br>3. Minta izin lokasi (foreground only) dan kamera dengan penjelasan alasan yang spesifik per izin<br>4. Deteksi tier perangkat secara senyap |
| **Copy layar** | Header: *Perintah Operasi 001*<br>Isi: Lima titik. Mulai jam 07.00 atau 16.00 — di luar itu Surabaya akan menghukummu dengan panas.<br>Checklist: `Baterai di atas 70%` · `Earphone dibawa` · `Botol minum` · `Sepatu yang nyaman`<br>Tombol izin lokasi: *Kami perlu tahu kamu sudah sampai di titiknya. Lokasi hanya dibaca saat aplikasi terbuka.* |
| **Audio** | Suara mesin tik saat dokumen tersusun. Sekali saja, jangan berulang |
| **Yang bisa salah** | Ruang penyimpanan kurang → tawarkan mode streaming dengan peringatan kuota. Izin lokasi ditolak → jelaskan bahwa QR tetap bisa dipakai, dengan verifikasi lebih ketat |
| **Catatan desain** | Checklist fisik ini bukan basa-basi. Ia menurunkan angka pemain yang menyerah di tengah jalan secara nyata, dan sekaligus membentuk ekspektasi bahwa ini aktivitas fisik, bukan game rebahan |

---

## S2 · Titik 1 — Hotel Majapahit, 19 September 1945

**Lokasi:** Jl. Tunjungan No. 65, trotoar seberang
**Durasi:** 18 menit
**Badge:** Nyali Wani

### S2.1 Mendekat

| Frame | Isi |
|---|---|
| **Yang terlihat** | Peta menyempit jadi kompas sederhana saat jarak < 150 m. Detak halus makin cepat mendekati titik |
| **Respons sistem** | Geofence 80 m memicu prefetch aset scene. Standee mulai relevan |
| **Copy** | *Titik 1 di depan. Cari standee logam di sisi trotoar.* |

### S2.2 Pemindaian

| Frame | Isi |
|---|---|
| **Yang terlihat** | Kamera terbuka, bingkai pemindai bergaya bidik. Standee memantulkan lampu jalan |
| **Aksi Adi** | Mengarahkan kamera ke QR di standee |
| **Respons sistem** | Baca payload → POST `/verify` → validasi HMAC + jarak → buka scene. Getaran haptic pendek saat berhasil |
| **Copy sukses** | *Terverifikasi. Kamu berdiri di tempat yang sama dengan mereka.* |
| **Copy gagal (jauh)** | *Kamu belum sampai di titiknya. Standee-nya di depan Hotel Majapahit, sisi trotoar Tunjungan.* |
| **Yang bisa salah** | QR kotor/terhalang → tombol "Tidak bisa scan?" muncul setelah 15 detik, membuka input kode 6 digit yang tercetak kecil di standee |

### S2.3 Lore

| Frame | Isi |
|---|---|
| **Yang terlihat** | Layar berubah ke **Mode Arsip**: warna hilang, kertas menua, teks tersusun seperti laporan. Foto bangunan hari ini perlahan larut jadi foto 1945 dari sudut yang sama |
| **Isi naskah** | W.V.C. Ploegman mengibarkan bendera Belanda di tiang lantai atas hotel tanpa izin. Residen Soedirman datang bernegosiasi; perundingan buntu dan berakhir ricuh. Hariyono dan Koesno Wibowo naik ke atap. |
| **Aksi Adi** | Menggulir. Naskah dibatasi **maksimal 3× tinggi viewport per POI (±2.500 px)**, dengan indikator progres baca |
| **Copy penutup lore** | *Mereka tidak punya tangga darurat, tidak punya rencana cadangan, dan tidak tahu apa yang terjadi setelahnya. Sekarang giliranmu naik.* |
| **Audio** | Kerumunan jauh, angin, derit tiang bendera |
| **Catatan desain** | Batas 3× viewport itu keras *(direvisi Sept 2026 dari batas 140 kata per layar, menyusul model gulir di Dokumen 07)*. Deck asli sudah benar mendiagnosis masalahnya: teks dowo-dowo adalah alasan orang meninggalkan museum. Halaman gulir tidak boleh jadi pintu belakang untuk mengulang dosa yang sama |

### S2.4 AR — Interaksi Puncak

| Frame | Isi |
|---|---|
| **Yang terlihat** | Kamera hidup. Bendera merah-putih-biru berkibar di atas bangunan asli di depan Adi, mengikuti perspektif kamera |
| **Aksi Adi** | Swipe dari atas ke bawah pada bagian biru, dengan tekanan dan kecepatan yang terdeteksi |
| **Respons sistem** | Simulasi robek dengan mesh tearing (bukan animasi video). Kain terpisah, jatuh, tertiup angin. Kerumunan bersorak — audio spasial dari arah bawah |
| **Copy instruksi** | *Usap layar dari atas ke bawah. Robek birunya.* |
| **Copy setelah** | *19 September 1945, 21.00. Bendera itu turun tanpa perintah siapa pun.* |
| **Momen "lihat ke atas"** | Setelah robekan selesai, layar meredup 3 detik dengan satu kalimat: *Angkat kepalamu. Tiang itu masih ada di sana.* Tidak ada tombol selama 3 detik itu |
| **Yang bisa salah** | Tracking gagal (gelap/hujan) → turun ke Tier 2: rekonstruksi video 360 dengan gestur yang sama. Badge tetap sama |

### S2.5 Badge

| Frame | Isi |
|---|---|
| **Yang terlihat** | Badge **Nyali Wani** tercetak seperti stempel di atas dokumen — bukan animasi kilau ala game gacha |
| **Copy** | *Badge 1 dari 3. Hariyono dan Koesno Wibowo tidak pernah dapat medali. Kamu dapat ini.* |
| **Tombol** | `Lanjut ke Jembatan Merah` · `Simpan kartu` |

---

## S3 · Konvoi — Perjalanan ke Jembatan Merah

**Jarak:** 2,4 km · **Durasi:** 12 menit naik kendaraan, 30 menit jalan kaki
**Tujuan scene:** Mengubah waktu mati menjadi bagian cerita

Ini scene yang paling sering dilupakan dan paling sering membunuh produk sejenis. Dua setengah kilometer tanpa apa-apa adalah dua setengah kilometer untuk memutuskan pulang.

| Frame | Isi |
|---|---|
| **Yang terlihat** | Layar tidak menuntut perhatian. Peta sederhana + kartu pemutar audio. Layar boleh dimatikan |
| **Aksi Adi** | Memasang earphone, memesan ojek atau berjalan. Layar di saku |
| **Respons sistem** | Memutar **drama audio 9 menit**: "Enam Minggu di Antara Dua Peristiwa" — apa yang terjadi antara 19 September dan 30 Oktober. Kedatangan Sekutu, pembentukan BKR, ketegangan yang menumpuk. Audio berhenti otomatis saat geofence titik 2 tersentuh |
| **Copy** | *Pasang earphone. Enam minggu berikutnya lebih penting dari yang kamu kira.* |
| **Fitur keselamatan** | Jika kecepatan terdeteksi > 7 km/jam, semua fitur kamera terkunci dan layar menampilkan: *Kamu sedang bergerak. Dengarkan saja.* |
| **Metrik scene** | % pemain yang menyelesaikan audio; **% pemain yang berhenti di sini (drop-off terbesar yang diprediksi)** |

---

## S4 · Titik 2 — Jembatan Merah, 30 Oktober 1945

**Lokasi:** Taman Sejarah, dekat replika mobil Mallaby
**Durasi:** 22 menit
**Badge:** Detektif Sejarah

### S4.1 Mode Investigasi

| Frame | Isi |
|---|---|
| **Yang terlihat** | Antarmuka berubah total: papan penyelidikan. Foto-foto tersemat, benang merah, catatan tulisan tangan |
| **Aksi Adi** | Memindai QR, lalu mengarahkan kamera ke area jembatan |
| **Respons sistem** | Rekonstruksi 3D mobil Buick terbakar muncul di posisi kejadian, dengan tiga titik bukti yang bisa diketuk |
| **Copy pembuka** | *Gencatan senjata gagal. Sore itu, sebuah mobil terbakar di ujung jembatan ini. Yang di dalamnya adalah Brigjen A.W.S. Mallaby. Siapa yang melempar granat — sampai hari ini tidak ada yang tahu pasti.* |

### S4.2 Dua Versi

| Frame | Isi |
|---|---|
| **Yang terlihat** | Dua berkas dokumen, masing-masing bisa dibuka |
| **Berkas A** | Versi lemparan pejuang Suroboyo — dengan sumber dan keterbatasannya |
| **Berkas B** | Versi tembakan/lemparan meleset dari pihak Inggris sendiri — dengan sumber dan keterbatasannya |
| **Aksi Adi** | Membaca keduanya, lalu memilih versi mana yang menurutnya paling masuk akal, dan **mengetik satu kalimat alasan** |
| **Respons sistem** | Menyimpan pilihan. Menampilkan distribusi jawaban pemain lain hari itu. **Tidak menyatakan mana yang benar** |
| **Copy penutup** | *Kami tidak akan memberitahumu jawabannya, karena tidak ada yang punya. Yang kami tahu: keesokan harinya, kota ini diberi ultimatum.* |
| **Catatan kurator** | Setiap berkas wajib mencantumkan sumbernya secara terlihat. Ini titik paling rawan dipersoalkan secara akademis, dan sekaligus titik paling berharga secara pendidikan |

### S4.3 Badge & Momen Fisik

| Frame | Isi |
|---|---|
| **Momen "lihat ke atas"** | *Jembatan yang kamu pijak sekarang adalah jembatan yang sama. Rasakan geternya saat truk lewat.* |
| **Badge** | Detektif Sejarah |

---

## S5 · Konvoi — ke Tugu Pahlawan

**Jarak:** 1,1 km · **Durasi:** 15 menit jalan kaki

| Frame | Isi |
|---|---|
| **Audio** | Drama 7 menit: ultimatum Mayjen Mansergh, 10 hari yang mencekam, keputusan kota untuk tidak menyerah |
| **Copy** | *Sepuluh hari lagi. Jalan pelan-pelan, ada banyak yang harus kamu dengar.* |
| **Titik istirahat** | Sistem menandai 2 warung/kafe di jalur sebagai titik isi ulang. Ini sekaligus perkenalan awal ke ekosistem merchant |

---

## S6 · Titik 3 — Tugu Pahlawan, 10 November 1945

**Lokasi:** Pelataran Tugu Pahlawan
**Durasi:** 25 menit
**Badge:** Pahlawan Suroboyo

### S6.1 Gerbang Earphone

| Frame | Isi |
|---|---|
| **Yang terlihat** | Layar gelap penuh. Satu ikon earphone. Tidak ada yang lain |
| **Copy** | *Pasang earphone. Yang berikutnya tidak bisa didengar lewat speaker.* |
| **Respons sistem** | Deteksi output audio. Scene tidak dimulai sampai earphone terpasang — **satu-satunya gerbang keras di seluruh rute**, karena spatial audio lewat speaker HP akan menghancurkan seluruh efek |
| **Jalan keluar** | Setelah 30 detik, tombol kecil `Lanjut tanpa earphone` muncul, dengan peringatan jujur bahwa pengalamannya akan berbeda |

### S6.2 Orasi

| Frame | Isi |
|---|---|
| **Yang terlihat** | Kamera diarahkan ke dasar Tugu. Bung Tomo muncul sebagai figur cahaya — **sengaja tidak fotorealistis**. Rekonstruksi realistis tokoh nasional akan memancing perdebatan yang tidak perlu, dan uncanny valley akan merusak momen |
| **Aksi Adi** | Berdiri diam. Berputar perlahan mengikuti arah suara |
| **Respons sistem** | Audio spasial 3D. Suara orasi datang dari arah tugu, sorakan massa mengelilingi dari 360°, intensitas naik saat Adi mendekat |
| **Isi** | Potongan orasi radio 10 November, dengan takarir. Durasi 90 detik — bukan seluruh pidato |
| **Momen "lihat ke atas"** | Pada puncak orasi, seluruh layar padam. Hanya audio. *Lepaskan HP-mu. Lihat tugunya.* Selama 15 detik layar tetap hitam |
| **Copy penutup** | *Suara itu disiarkan dari radio gelap, ke rumah-rumah tanpa listrik, di kota yang sudah dikepung. Dan kota ini bertahan tiga minggu.* |
| **Catatan lisensi** | Jika hak rekaman asli tidak diperoleh, gunakan pembacaan ulang naskah oleh pengisi suara dengan label tegas: *Rekonstruksi naskah. Bukan rekaman asli.* Jangan pernah mengaburkan garis ini |

---

## S7 · Titik 4 — Siola, Fase Kilas Balik

**Lokasi:** Museum Surabaya, Gedung Siola, Jl. Tunjungan No. 1
**Durasi:** 30 menit
**Fungsi:** Pendinginan, refleksi, dan pertemuan antara digital dan benda nyata

| Frame | Isi |
|---|---|
| **Yang terlihat** | Ruangan ber-AC setelah tiga jam di luar. Sistem tahu ini dan mengakuinya |
| **Copy sambutan** | *Duduk dulu. Kamu baru saja berjalan 4 kilometer melewati tiga tanggal.* |
| **Aktivitas 1 — Arsip** | Lima benda di museum diberi penanda. Adi memindai, dan aplikasi menghubungkan benda itu dengan momen yang baru saja ia alami di jalan. Bukan katalog museum — **penghubung** |
| **Aktivitas 2 — Rekap** | Timeline personal: rute yang ditempuh, keputusan yang diambil di Jembatan Merah, waktu di tiap titik, foto AR yang tersimpan |
| **Aktivitas 3 — Guestbook** | Adi menulis satu kalimat dan mengunggah satu foto AR. Masuk antrean moderasi, tayang setelah disetujui, muncul di dinding digital fisik di lobi Siola |
| **Copy guestbook** | *Tinggalkan satu kalimat. Yang datang setelahmu akan membacanya.* |
| **Kartu rangkuman** | Otomatis dibuat: 3 badge, peta rute yang ditempuh, satu kutipan pilihan, waktu tempuh. Format 9:16 dan 1:1 sekaligus |
| **Yang bisa salah** | Museum tutup (Senin/hari libur) → sistem harus tahu jam buka dan menawarkan versi digital fase ini plus undangan kembali. Jangan biarkan pemain berdiri di depan pintu terkunci setelah 3 jam berjalan |

---

## S8 · Titik 5 — Tunjungan, Wayahe Redeem

**Lokasi:** Jl. Tunjungan
**Durasi:** 30–60 menit
**Fungsi:** Menutup loop ekonomi — bagian yang membuat produk ini bukan sekadar game

### S8.1 Voucher Terbuka

| Frame | Isi |
|---|---|
| **Pemicu** | Transisi state ke `ROUTE_CLEARED` |
| **Yang terlihat** | Tiga badge menyatu jadi satu segel, lalu berubah bentuk menjadi kupon |
| **Copy** | *Rute tuntas. Tiga titik, tiga tanggal, satu kota.*<br>*Sekarang bagian yang paling enak: pilih tempat menukar.* |
| **Respons sistem** | POST `/vouchers/issue` dengan idempotency key. Voucher berlaku 7 hari, bukan hanya hari itu — pemain yang kelelahan boleh kembali besok |

### S8.2 Memilih Merchant

| Frame | Isi |
|---|---|
| **Yang terlihat** | Daftar merchant di Tunjungan dengan jarak berjalan kaki, jenis penawaran, dan **status buka/tutup real-time** |
| **Aksi Adi** | Memilih kafe 200 m dari Siola |
| **Copy** | *Es kopi susu, gratis. 200 meter dari sini, buka sampai 22.00.* |
| **Catatan** | Jangan tampilkan rating bintang. Ini bukan aplikasi review; menampilkan rating akan membuat merchant kecil kalah sebelum mulai |

### S8.3 Penukaran di Kasir

| Frame | Isi |
|---|---|
| **Yang terlihat** | QR voucher dengan penghitung mundur 10 menit yang berjalan **hanya setelah Adi menekan `Tukar sekarang`** di depan kasir |
| **Aksi** | Kasir memindai lewat PWA merchant |
| **Respons sistem** | POST `/vouchers/{code}/redeem` → lock optimistik → konfirmasi di dua layar sekaligus, dengan bunyi dan getar di kedua perangkat |
| **Copy layar Adi** | *Tertukar. Selamat menikmati.* |
| **Copy layar kasir** | *Voucher sah. Es kopi susu × 1. Rekap masuk ke laporan harianmu.* |
| **Yang bisa salah** | Sinyal kasir mati → mode offline dengan kode 6 digit dan rekonsiliasi belakangan. **Jangan pernah membuat pelanggan berdiri canggung di kasir karena aplikasi kita.** Ini momen paling rapuh di seluruh sistem, dan yang paling merusak hubungan dengan merchant jika gagal |
| **Metrik** | Waktu dari tap `Tukar sekarang` sampai konfirmasi kasir: target < 4 detik |

---

## S9 · Pulang — Share & Kail Berikutnya

| Frame | Isi |
|---|---|
| **Yang terlihat** | Kartu rangkuman siap bagikan, sudah dalam format Story dan feed |
| **Aksi Adi** | Membagikan ke Instagram Story sambil menunggu kopinya |
| **Respons sistem** | Kartu membawa QR kecil yang menautkan langsung ke rute — teman yang melihat bisa masuk tanpa mencari |
| **Kail retensi** | Layar terakhir: siluet tujuh tokoh, tiga di antaranya sudah berwarna. *3 dari 10 tokoh ditemukan.*<br>*Tujuh sisanya ada di Peneleh, Ampel, dan Kota Lama. Rute berikutnya dibuka 31 Mei.* |
| **Notifikasi terjadwal** | H+3: bukan "kembali main", tapi *"Pesanmu di Siola sudah tayang. Ada 41 orang yang membacanya."* Alasan untuk kembali harus berupa fakta baru, bukan permohonan |

---

## Ringkasan Titik Rawan yang Harus Diuji Lapangan

| Scene | Risiko | Cara uji |
|---|---|---|
| S1 | Unduh 218 MB gagal / ditinggal | Uji dengan kuota terbatas & WiFi publik |
| S2.4 | Tracking AR gagal di siang terik atau hujan | Uji jam 11.00, 15.00, dan saat hujan |
| **S3** | **Drop-off terbesar. 2,4 km adalah titik menyerah** | Uji A/B: dengan audio drama vs tanpa |
| S6.1 | Pemain tidak bawa earphone | Hitung berapa persen; jika > 40%, sediakan earphone pinjam di merchant |
| S7 | Museum tutup di hari kunjungan | Verifikasi jam buka resmi, tanamkan di sistem |
| S8.3 | Kasir bingung / sinyal mati | Latih 20 kasir langsung, uji mode offline |

Prioritas uji lapangan pertama adalah **S3**, bukan S2.4. Kegagalan AR di satu titik masih bisa diselamatkan fallback. Kehilangan pemain di tengah jalan tidak bisa.
