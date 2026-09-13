# 11 · Konsolidasi POI & Wall Siola
## Satu Dokumen, Semua Pertanyaan Terbuka

**Tanggal:** September 2026
**Cakupan:** 5 POI (Yamato, Jembatan Merah, Tugu Pahlawan, Siola, Tunjungan) + Wall Siola
**Tujuan:** menjawab sekali jalan seluruh asumsi yang saya tandai selagi membangun keenam layar, alih-alih tersebar di enam sesi terpisah.

---

## 1. Temuan Saya Sendiri Sebelum Anda Membaca Lebih Jauh

Saat merangkum keenam layar berdampingan, saya menemukan satu inkonsistensi yang saya buat sendiri:

**`SafetyNotice` hilang dari Tunjungan (U1–U3).** Komponen ini saya tetapkan permanen di keempat POI aksi lainnya, tapi Tunjungan — jalan kuliner malam yang ramai, persis kondisi yang membenarkan `SafetyNotice` di POI lain — tidak mendapatkannya. Ini bukan keputusan sadar, murni luput. Perlu ditambahkan ke U1 sebelum masuk kode:

> ⚠️ **Perhatian Keselamatan** — Jalan Tunjungan ramai kendaraan dan pejalan kaki malam hari. Simpan HP setelah menukar voucher, jangan berjalan sambil menatap layar.

Backlog: **B26**.

---

## 2. Keputusan yang Sudah Terkunci — Tidak Perlu Dikonfirmasi Lagi

Supaya jelas mana yang sudah final dan mana yang masih menunggu jawaban Anda.

| # | Keputusan | Sumber |
|---|---|---|
| K9 | Deteksi suara "Merdeka" = volume/intensitas, bukan pengenalan kata | Sesi Yamato |
| K10 | Narasi tetap pakai kata "Merdeka" sebagai jangkar emosional meski deteksi teknis longgar | Sesi Yamato |
| K11 | `SafetyNotice` adalah komponen tetap, konten kontekstual per lokasi | Sesi Yamato, ditegaskan ulang di M1/T1 |
| K12 | Avatar ilustrasi menggantikan foto profil bebas; jalur foto asli hanya lewat `ConsentRecord` | Sesi Beranda |
| K13 | Arsip Sepia per-rute, permanen dibaca ulang, hitungan beranda hanya rute aktif | Sesi Beranda |
| K14 | Render gedung/objek di semua POI adalah stilasi, bukan reproduksi foto arsip — foto asli masuk lewat CMS dengan `reviewed_by` | Sesi Yamato, konsisten di M1/T1 |
| K15 | Hologram Bung Tomo tetap garis cahaya abstrak, bukan figur fotorealistis | Dokumen 03 (lama), ditegaskan ulang di T3 |
| K16 | Wall Siola tingkat A tidak pernah menampilkan foto wajah; nama panggilan saja | Dokumen 08 (lama), diverifikasi ulang lewat referensi resolusi penuh |

---

## 3. Konsekuensi Teknis Baru — Perlu Masuk Dokumen 04

**Izin mikrofon.** Sebelum sesi ini, Dokumen 04 §B.6 menyatakan tegas *"Mikrofon: Tidak diminta."* Tahap "Katakan Merdeka" di Yamato mengubah ini. Revisi yang perlu masuk:

| Aspek | Ketentuan baru |
|---|---|
| Kapan diminta | Saat Tahap 2 (deteksi suara) dibuka — bukan di onboarding awal |
| Yang diukur | Amplitudo/volume input mikrofon, bukan transkripsi ucapan |
| Data yang disimpan | Hanya boolean "tahap terlewati", **tidak pernah** rekaman audio |
| Fallback izin ditolak | Tekan-tahan 3 detik sebagai gantinya (lihat Y3) — progres tidak pernah terblokir |
| Fallback lingkungan bising | Ambang batas longgar; umpan balik "hampir cukup" muncul bertahap, bukan biner berhasil/gagal |

Saya akan terapkan revisi ini ke Dokumen 04 setelah Anda konfirmasi bagian 4 di bawah — supaya sekali tulis, tidak dua kali kalau masih ada koreksi besar dari Anda.

---

## 4. Pertanyaan Terbuka — Mohon Jawab Sekali Jalan

### Dari Jembatan Merah (M1–M2)

**Q1.** Kartu "Enam Minggu di Antara Dua Peristiwa" — apakah itu layar interstitial terpisah (S3 storyboard, drama audio perjalanan) yang muncul *sebelum* sampai POI ini, atau kartu status *di dalam* halaman POI Jembatan Merah itu sendiri? Saya asumsikan yang pertama dan tidak menampilkannya di M1.

**Q2.** Stepper 4-tahap (STANDEE → INVESTIGASI → KESIMPULAN → BADGE) saya tambahkan untuk konsistensi lintas-POI. Apakah referensi asli Anda memang punya elemen ini, atau saya menambah sesuatu yang tidak diminta?

### Dari Tugu Pahlawan (T1–T3)

**Q3.** Bentuk render menara tugu — saya buat lonjong bercahaya abstrak karena resolusi referensi terlalu rendah untuk menangkap detail 12 lengkung Tugu Pahlawan asli. Perlu direvisi mengikuti bentuk asli, atau abstraksi ini justru sesuai maksud "hologram/energi digital"?

**Q4.** Kartu hijau kedua saya baca sebagai "Aktivasi Hologram 3D & Orasi Tomo" — konfirmasi ejaan/bunyi judul yang benar.

**Q5.** Kartu hijau ketiga tidak terbaca sama sekali di resolusi yang saya terima; saya ganti dengan kartu transkrip radio bergaya telegram (konsisten pola Yamato/Mallaby). Kirim ulang crop kalau maksud aslinya berbeda.

### Dari Siola (S1)

**Q6.** Statistik "3 jam 5 menit · 4,1 km · 3/3 lencana" — murni angka contoh dari saya. Apakah field ini benar tiga itu (waktu, jarak, lencana), atau ada kombinasi lain yang dimaksud referensi asli?

**Q7.** Tiga kartu hijau (Arsip Nyata, Foto Dulu-Sekarang, Berita Berdampingan) saya baca sebagai satu rangkaian "jembatan arsip fisik ke digital". Benar sebagai satu sistem, atau tiga fitur independen dengan alur masing-masing?

### Dari Tunjungan (U1–U3)

**Q8.** Angka "1.500 poin" dan daftar 3 merchant murni ilustratif dari saya. Berapa jumlah merchant aktual yang direncanakan tampil di sini, dan apakah sistem poin ini terpisah dari sistem voucher yang sudah ada di Dokumen 01, atau nama lain untuk hal yang sama?

**Q9.** "5 dari 10 Tokoh Surabaya" — mengonfirmasi apakah rencana lama (7 tokoh dari storyboard S9, direvisi jadi 10 di rencana V1.5) yang dipakai referensi ini, atau angka berbeda.

### Dari Wall Siola

**Q10.** Tagline "Dua Zaman, Satu Lagu" — saya baca ini dari referensi resolusi penuh, berbeda dari dugaan awal "Satu Layar" saat resolusi masih buram. Mohon konfirmasi final yang benar.

---

## 5. Cara Menjawab agar Efisien

Anda tidak perlu menjawab dalam format tertentu — cukup sebut nomornya, contoh:

> Q1: interstitial terpisah, benar. Q3: pertahankan abstraksi. Q10: benar "Satu Lagu".

Untuk pertanyaan yang tidak dijawab dalam waktu dekat, saya akan **melanjutkan dengan asumsi yang sudah tertulis** di setiap HTML — semuanya sudah cukup masuk akal untuk dipakai sebagai baseline sambil menunggu koreksi Anda kapan pun sempat.

---

## 6. Setelah Konfirmasi — Urutan Berikutnya

1. Perbaiki B26 (`SafetyNotice` di Tunjungan)
2. Revisi Dokumen 04 dengan konsekuensi izin mikrofon
3. Formalkan `SafetyNotice` sebagai komponen resmi di Dokumen 03 (saat ini baru disebut di catatan HTML, belum masuk tabel komponen inti)
4. Sesuaikan enam HTML sesuai jawaban Q1–Q10
5. Baru masuk ke Claude Code untuk menyalin ke `page.tsx` — dengan urutan yang saya sarankan: Beranda dulu (fondasi navigasi), baru kelima POI menyusul satu-satu
