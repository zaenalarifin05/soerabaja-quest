# 05 · Walkthrough Pengerjaan & Panduan Prompt
## Cara Tim Ini Bekerja, Langkah demi Langkah

**Pembaca:** seluruh tim
**Asumsi:** tim 9–12 orang, sprint 2 minggu, AI dipakai sebagai akselerator di setiap peran

---

## BAGIAN A — WALKTHROUGH PENGERJAAN

### A.1 Peta Alur Kerja Besar

```
SPRINT 0        SPRINT 1-2      SPRINT 3-6        SPRINT 7-9       SPRINT 10-12
Fondasi     →   Vertical    →   Lebar         →   Kedalaman   →   Pengerasan
                Slice           (5 POI)           (voucher,        (beban,
                (1 POI utuh)                      sekolah)         keamanan,
                                                                   rilis)
    │               │                │                 │                │
 Repo, CI,     1 POI dari       Replikasi ke      Loop ekonomi    Uji beban,
 token,        scan sampai      4 POI lain,       & B2B           pentest,
 spike UaaL,   badge —          interstitial,     tersambung      store review
 kontrak API   TEMBUS PENUH     offline pack
```

**Prinsip pengurutan:** bangun **satu POI secara utuh dari ujung ke ujung** sebelum menyentuh POI kedua. Godaan terbesar di proyek seperti ini adalah membangun "semua layar dulu, AR belakangan". Itu selalu berakhir dengan integrasi AR yang meledak di bulan keenam. Vertical slice memaksa seluruh risiko teknis muncul di minggu keempat, saat masih murah untuk diperbaiki.

### A.2 Sprint 0 — Fondasi (2 minggu)

| Hari | Kegiatan | Penanggung jawab | Keluaran |
|---|---|---|---|
| 1–2 | Kickoff, sepakati kontrak API, buat repo & CI | Tech Lead | `openapi.yaml` v0.1 |
| 1–3 | Survei lapangan 5 titik: sinyal, GPS, listrik, cahaya | PM + QA | Laporan kelayakan lokasi |
| 3–8 | **Spike UaaL**: Flutter + Unity minimal, kirim pesan dua arah, muat 1 aset | AR Engineer + Mobile | Keputusan lanjut/ganti arsitektur |
| 4–8 | Design token + 3 layar kunci di Figma | Design Lead | Library terpublikasi |
| 5–10 | Backend skeleton: auth, `/routes`, `/verify` (stub) | Backend | API dapat dipanggil |
| 8–10 | Uji cetak image target: 3 varian desain standee, uji tracking | Designer + AR | Desain standee terpilih |
| 10 | Demo internal + retro | Semua | Go/no-go arsitektur |

**Gerbang keluar Sprint 0:** spike UaaL berhasil memuat aset dan mengirim pesan dua arah dalam < 2,5 detik. Jika gagal, pindah ke rencana cadangan (Flutter + plugin AR native, dengan scope AR yang dikurangi) **sekarang**, bukan tiga bulan lagi.

### A.3 Sprint 1–2 — Vertical Slice: Hotel Majapahit Utuh

Target: pemain bisa berdiri di Jl. Tunjungan, memindai standee sungguhan, membaca lore, merobek bendera di AR, dan mendapat badge. Satu POI, tapi **tidak ada yang di-mock**.

```
Alur yang harus tembus penuh:
  buka app → pilih rute → izin → unduh pack 1 POI → navigasi →
  scan QR fisik → verify ke server sungguhan → lore → AR robek →
  badge tersimpan di server → kartu share tergenerate
```

Definisi selesai sprint: **demo dilakukan di lokasi, bukan di kantor.** Seluruh tim berjalan ke Hotel Majapahit dan mencoba di HP masing-masing. Ini terasa berlebihan di sprint kedua dan akan menyelamatkan bulan-bulan berikutnya.

### A.4 Sprint 3–6 — Melebar

| Sprint | Fokus | Risiko yang dijinakkan |
|---|---|---|
| 3 | POI 2 (Jembatan Merah) + sistem tier fallback | Perangkat kelas bawah |
| 4 | POI 3 (Tugu Pahlawan) + spatial audio + offline pack | Audio 3D & kuota data |
| 5 | POI 4 (Siola) + interstitial audio drama + navigasi antar-POI | **Drop-off di perjalanan** |
| 6 | POI 5 (Tunjungan) + voucher + merchant PWA | Loop ekonomi |

Sprint 5 adalah sprint terpenting yang tidak terlihat penting. Ia menangani 3,5 km ruang kosong antar-titik — penyebab kegagalan nomor satu yang diprediksi di storyboard.

### A.5 Sprint 7–12 — Mendalam & Mengeras

- **7–8:** Guestbook + moderasi, kartu share, lokalisasi ID/EN, aksesibilitas
- **9–10:** School Mode, dashboard guru, booking web, dashboard kota
- **11:** Uji beban 5× puncak, penetration test, dashboard anti-cheat
- **12:** Store review, beta tertutup, pelatihan 20 kasir merchant, gladi bersih operasional

### A.6 Ritual Tim

| Ritual | Frekuensi | Aturan yang tidak biasa |
|---|---|---|
| Standup | Harian, 12 menit | Sebutkan hambatan sebelum kemajuan |
| **Field Friday** | Mingguan | Seluruh tim menguji di lokasi sungguhan, 90 menit. Tidak boleh diganti demo di kantor |
| Curator Review | Dwi-mingguan | Sejarawan meninjau naskah baru. Tanpa persetujuan, naskah tidak masuk build |
| Battery Log | Tiap Field Friday | Catat persen baterai tiap 30 menit, semua perangkat |
| Retro | Tiap akhir sprint | Satu tindakan perbaikan, dieksekusi sprint berikutnya |

### A.7 Cabang Git & Rilis

```
main            ← selalu siap rilis, dilindungi
 └─ develop     ← integrasi harian
     ├─ feat/poi-majapahit-ar
     ├─ feat/voucher-redeem
     └─ fix/qr-verify-timeout

Tag: v1.0.0-rc.1 → beta internal
     v1.0.0-rc.2 → beta tertutup (sekolah + komunitas)
     v1.0.0      → 10 November 2027
```

Aset Unity berada di repo terpisah dengan Git LFS, di-build menjadi artefak berversi, dan dikonsumsi Flutter sebagai dependensi biner. Mencampur aset 3D ke repo utama akan membuat repo membengkak dan `git clone` memakan puluhan menit.

### A.8 Lingkungan

| Env | Tujuan | Data | Catatan |
|---|---|---|---|
| `local` | Pengembangan | Seed sintetis | QR uji dengan secret dev |
| `staging` | QA + demo pemangku kepentingan | Salinan anonim | **Punya standee fisik sendiri** di kantor untuk uji scan |
| `production` | Publik | Nyata | Feature flag untuk tiap POI |

Feature flag per POI penting: jika ada masalah di Jembatan Merah pada hari peluncuran, satu titik bisa dimatikan dan rute dialihkan tanpa menurunkan seluruh aplikasi.

---

## BAGIAN B — PANDUAN PROMPT PER LANGKAH

AI dipakai sebagai akselerator, bukan pengganti keputusan. Aturan pemakaian di tim ini:

1. **AI tidak pernah menjadi sumber fakta sejarah.** Naskah sejarah selalu berasal dari arsip dan disetujui kurator manusia. AI boleh membantu menyunting kalimat, tidak boleh mengarang tanggal.
2. **Kode hasil AI tetap melewati review manusia**, dengan standar yang sama dengan kode manusia.
3. **Prompt yang berhasil disimpan** di `/docs/prompts/` supaya tim tidak menemukan ulang.

### B.1 Untuk Product Manager — Menyusun User Story

```
Kamu adalah Senior Product Manager untuk aplikasi wisata sejarah berbasis AR
di Surabaya. Pengguna inti: pelajar/mahasiswa 16-22 tahun.

Konteks: [tempel bagian yang relevan dari Dokumen 01]

Tugas: pecah epic "Verifikasi kehadiran pemain di POI" menjadi user story
INVEST-compliant.

Untuk tiap story sertakan:
- Format: Sebagai [peran], saya ingin [aksi], supaya [nilai]
- Kriteria penerimaan dalam Given/When/Then
- Skenario kegagalan minimal 2 per story
- Estimasi kompleksitas (S/M/L) dengan alasan satu kalimat

Batasan: jangan mengusulkan solusi teknis di dalam story. Fokus pada perilaku
yang bisa diamati.
```

### B.2 Untuk Copywriter — Naskah Lore

```
Kamu menulis naskah untuk aplikasi yang dibaca sambil berdiri di trotoar,
di bawah matahari, oleh anak 17 tahun yang mudah bosan.

Fakta yang boleh dipakai (JANGAN menambah fakta di luar daftar ini):
[tempel fakta terverifikasi dari kurator, dengan sumbernya]

Tulis naskah untuk POI [nama], dengan aturan:
- Maksimal 3x tinggi viewport per POI (sekitar 2.500 piksel). Tulis sesuai
  kebutuhan peristiwa, jangan memaksa masuk kotak, tapi jangan pula mengisi
  ruang hanya karena tersedia
- Kalimat pendek. Rata-rata di bawah 15 kata
- Bahasa Indonesia standar untuk isi; boleh satu sentuhan Suroboyoan di
  kalimat penutup
- Layar terakhir harus berakhir dengan dorongan untuk BERTINDAK atau
  MELIHAT SEKELILING, bukan dengan kesimpulan moral
- Jangan gunakan kata: "menyaksikan", "mengukir sejarah", "tak terlupakan",
  "saksi bisu"

Hasilkan 3 alternatif dengan nada berbeda: dingin-dokumenter, tegang, personal.
```

Daftar kata terlarang itu penting. Tanpanya, keluaran AI akan penuh klise wisata sejarah yang persis merupakan masalah yang produk ini coba selesaikan.

### B.3 Untuk Designer — Eksplorasi UI

```
Kamu adalah design lead. Buat 3 arah visual untuk layar "Mode Investigasi"
di POI Jembatan Merah.

Design system yang WAJIB dipatuhi:
[tempel token warna & tipografi dari Dokumen 03]

Konteks layar: pemain berdiri di Taman Sejarah, membandingkan dua versi
sejarah kematian Brigjen Mallaby, lalu memilih satu dan menuliskan alasannya.

Kendala:
- Dua pertiga atas layar milik kamera, tidak boleh ditutupi
- Terbaca di bawah sinar matahari langsung
- Target sentuh minimal 48dp
- Rezim visual "Arsip": tanpa easing, potong keras

Untuk tiap arah, jelaskan: konsep dalam satu kalimat, hierarki informasi,
dan satu keputusan yang membuatnya berbeda dari papan investigasi generik.
Sertakan wireframe ASCII.
```

### B.4 Untuk 3D Artist — Brief Aset

```
Buat brief produksi untuk aset 3D "bendera Belanda di tiang Hotel Yamato".

Kendala teknis keras:
- Maksimal 4.000 tris, mesh cloth dengan simulasi robek
- Tekstur 1024x1024 albedo + normal, format KTX2
- Total ukuran setelah kompresi Draco: maksimal 2 MB
- Harus terbaca dari jarak 15-25 meter di layar HP 6 inci
- Akan dilihat di bawah cahaya matahari langsung dan cahaya lampu jalan

Kendala historis:
- Bendera tiga warna merah-putih-biru, proporsi 2:3
- Kondisi: sudah berkibar beberapa jam, sedikit kusam, bukan baru
- JANGAN menambahkan lambang, tulisan, atau ornamen apa pun

Keluarkan: daftar tahapan produksi, checklist QA aset, dan 3 risiko teknis
yang paling mungkin muncul saat simulasi robek di perangkat kelas menengah.
```

### B.5 Untuk Engineer — Implementasi Fitur

```
Konteks proyek: [tempel bagian arsitektur dari Dokumen 04]

Tugas: implementasikan endpoint POST /v1/missions/{id}/verify di NestJS.

Persyaratan:
[tempel 8 langkah verifikasi dari Dokumen 04 bagian B.5]

Wajib:
- Validasi input dengan class-validator
- Semua penolakan dicatat dengan alasan terstruktur, tanpa membocorkan
  ambang batas ke klien
- Uji unit untuk setiap jalur penolakan
- Idempoten terhadap percobaan ulang klien

Larangan:
- Jangan menaruh secret di respons
- Jangan mengembalikan pesan error yang mengungkap jarak sebenarnya
- Jangan gunakan library kriptografi selain crypto bawaan Node

Setelah kode, tuliskan: 3 cara endpoint ini bisa disalahgunakan yang belum
tercakup oleh persyaratan di atas.
```

Kalimat penutup itu — meminta AI mencari celah yang belum tertutup — konsisten menghasilkan temuan yang berguna, dan lebih berharga daripada kodenya sendiri.

### B.6 Untuk QA — Rencana Uji Lapangan

```
Susun rencana uji lapangan untuk POI [nama] di [lokasi].

Kondisi yang harus diuji: pukul 07.00, 11.00, 15.00, 19.00; cuaca cerah dan
hujan; perangkat Tier 1, 2, dan 3; kondisi sinyal penuh dan lemah.

Untuk tiap kombinasi, tentukan:
- Apa yang diamati (metrik terukur, bukan kesan)
- Ambang lolos/gagal
- Cara mencatat (form, screenshot, video)

Sertakan checklist keselamatan penguji, dan protokol jika penguji menarik
perhatian orang sekitar atau petugas keamanan lokasi.
```

### B.7 Untuk Tech Lead — Review Arsitektur

```
Kamu adalah CTO yang skeptis dan berpengalaman membangun aplikasi AR
berbasis lokasi. Tinjau rencana arsitektur berikut secara kritis.

[tempel Dokumen 04]

Konteks: tim 10 orang, anggaran terbatas, tenggat 10 November 2027, lokasi
outdoor di kota tropis dengan suhu rutin di atas 32°C.

Berikan:
1. Tiga asumsi paling berbahaya yang tidak dinyatakan eksplisit
2. Bagian mana yang over-engineered untuk skala 50.000 pengguna
3. Bagian mana yang under-engineered dan akan menjadi masalah di bulan ke-9
4. Satu keputusan yang paling sulit dibalik, dan bukti apa yang harus
   dikumpulkan sebelum memutuskannya

Bersikaplah langsung. Jangan menyeimbangkan kritik dengan pujian.
```

### B.8 Rantai Prompt untuk Satu Fitur Utuh

Urutan yang terbukti efisien, dari ide sampai kode siap review:

```
1. PM      → Pecah epic jadi story          (B.1)
2. PM      → "Buat matriks kasus tepi untuk story ini, kelompokkan
              berdasarkan: perangkat, jaringan, perilaku pengguna,
              kondisi lingkungan"
3. Design  → Eksplorasi 3 arah               (B.3)
4. Design  → "Kritik arah terpilih seolah kamu pengguna berusia 17 tahun
              yang tidak sabar dan sedang kepanasan"
5. Copy    → Naskah 3 alternatif             (B.2)
6. Eng     → Implementasi + uji              (B.5)
7. Eng     → "Tulis ulang kode ini dengan asumsi jaringan gagal di setiap
              titik. Tunjukkan diff-nya"
8. QA      → Rencana uji lapangan            (B.6)
9. Lead    → Review arsitektur               (B.7)
```

Langkah 4 dan 7 adalah langkah kritik yang paling sering dilewati dan paling banyak memberi nilai. Menghasilkan sesuatu itu mudah sekarang; yang mahal adalah menemukan di mana ia akan patah.

---

## Penutup: Tiga Hal yang Menentukan Nasib Proyek Ini

Setelah seluruh dokumen ini, jika hanya tiga hal yang bisa dijaga, jagalah ini:

**Pertama, vertical slice di Sprint 1–2.** Satu POI utuh, diuji di trotoar sungguhan, sebelum menyentuh POI kedua. Semua risiko teknis besar — UaaL, tracking di bawah matahari, verifikasi QR, baterai — akan muncul di sana. Menemukannya di minggu keempat berarti masih bisa berbelok. Menemukannya di bulan keenam berarti tenggat 10 November hilang.

**Kedua, ruang kosong antar-titik.** Storyboard memperkirakan drop-off terbesar bukan di AR yang gagal, melainkan di 2,4 km antara Hotel Majapahit dan Jembatan Merah. Perlakukan perjalanan sebagai konten, bukan sebagai jeda.

**Ketiga, jangan biarkan AI menyentuh fakta sejarah.** Produk ini dibangun di atas kredibilitas. Satu tanggal salah yang viral akan menghapus kerja dua tahun, dan tidak ada perbaikan teknis yang bisa mengembalikannya. Kurator manusia adalah gerbang terakhir, selalu.
