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

## 4. Pertanyaan Terbuka — SUDAH TERJAWAB

> **Status: selesai.** Dijawab oleh pengguna pada sesi yang sama. Dua di antaranya (Q9, Q10) membalik asumsi awal saya — dicatat di sini supaya jejak koreksinya tidak hilang, bukan cuma diam-diam diganti.

| # | Topik | Jawaban final | Status penerapan |
|---|---|---|---|
| Q1 | Kartu "Enam Minggu" | **Di dalam halaman POI Jembatan Merah**, bukan interstitial terpisah | ✅ Diterapkan ke M1 |
| Q2 | Stepper 4-tahap | Dikonfirmasi benar, dipertahankan di seluruh POI aksi | ✅ Tidak ada perubahan diperlukan |
| Q3 | Bentuk menara Tugu Pahlawan | Mengikuti bentuk beralur asli monumen dengan **10 rusuk, melambangkan 10 November** — dikonfirmasi final oleh pengguna | ✅ Diterapkan dan **dikonfirmasi final**. Render diperbaiki dari 7 garis (draft awal, salah hitung) jadi tepat 10 |
| Q4 | Judul & sifat hologram | "Aktivasi Hologram 3D & Orasi Tomo" dikonfirmasi. Direalisasikan sebagai **overlay AR**, bukan proyeksi volumetrik penuh — pilihan teknis yang lebih murah dieksekusi | ✅ Diterapkan, copy diperjelas di T1 |
| Q5 | Kartu telegram pengganti | Dikonfirmasi sesuai | ✅ Tidak ada perubahan diperlukan |
| Q6 | Statistik Siola | Kombinasi waktu/jarak/lencana dikonfirmasi benar | ✅ Tidak ada perubahan diperlukan |
| Q7 | Tiga kartu arsip Siola | **Tiga fitur independen**, bukan satu sistem terpadu — masing-masing punya alur dan CTA sendiri | ✅ Diterapkan ke S1: setiap kartu kini punya tombol aksi terpisah (Pindai Benda / Buka Galeri Geser / Lihat di Ruang Pamer) |
| Q8 | Sistem "poin" | **Sama dengan sistem voucher** di Dokumen 01 — bukan ekonomi poin terpisah | ✅ Diterapkan: U1 diganti dari "1.500 Poin" jadi "3 Voucher Siap", selaras terminologi `Voucher` yang sudah ada |
| Q9 | Jumlah tokoh terkumpul | **3 dari 10**, bukan 5 dari 10 seperti draft awal saya | ✅ Diterapkan ke U3: progress bar dan grid disesuaikan jadi 3/10 |
| Q10 | Tagline Wall Siola | **"Dua Zaman, Satu Layar"** — dugaan awal saya benar; bacaan "Satu Lagu" dari resolusi rendah yang keliru | ✅ Diterapkan ke seluruh mock-up Wall Siola |

### Catatan tentang Q8 — dampak ke domain model

Karena "poin" ternyata bukan konsep baru, **tidak perlu entitas tambahan** di Dokumen 01. Ini kabar baik — domain model tetap sesederhana sebelumnya. Yang perlu disesuaikan hanya salah label di UI (sudah diperbaiki), bukan struktur data.

### Catatan tentang Q3 — kenapa item ini sempat ditahan, dan kenapa sekarang final

Dokumen 11 sempat menahan item ini meski jawaban awal pengguna sudah "12 lengkung", karena Tugu Pahlawan adalah monumen nasional sungguhan, bukan elemen fiksi yang bisa direka bebas — dan produk ini bertumpu pada akurasi sejarah sebagai nilai jualnya. Setelah dicek ulang, pengguna mengonfirmasi angka yang benar: **10 rusuk**, melambangkan 10 November. Render sudah diperbaiki dari 7 garis (kesalahan hitung di draft pertama) jadi tepat 10. Item ini sekarang final, tidak ada lagi yang menunggu.

---

## 5. Cara Menjawab agar Efisien

Anda tidak perlu menjawab dalam format tertentu — cukup sebut nomornya, contoh:

> Q1: interstitial terpisah, benar. Q3: pertahankan abstraksi. Q10: benar "Satu Lagu".

Untuk pertanyaan yang tidak dijawab dalam waktu dekat, saya akan **melanjutkan dengan asumsi yang sudah tertulis** di setiap HTML — semuanya sudah cukup masuk akal untuk dipakai sebagai baseline sambil menunggu koreksi Anda kapan pun sempat.

---

## 6. Status Sekarang & Langkah Berikutnya

Seluruh sepuluh pertanyaan sudah terjawab dan diterapkan. **Tidak ada lagi item tertunda** — termasuk Q3 (jumlah rusuk Tugu Pahlawan) yang sempat ditahan menunggu konfirmasi, sekarang final di angka 10.

Riwayat penyelesaian:
1. Perbaiki B26 (`SafetyNotice` di Tunjungan) — selesai.
2. Revisi Dokumen 04 dengan konsekuensi izin mikrofon — selesai.
3. Formalkan `SafetyNotice` sebagai komponen resmi di Dokumen 03 — selesai.
4. Enam HTML disesuaikan sesuai jawaban Q1–Q10 — selesai.
5. Render menara Tugu Pahlawan dikoreksi dari 7 jadi 10 rusuk — selesai.

**Berikutnya:** masuk ke Claude Code untuk menyalin ke `page.tsx` — urutan yang disarankan: Beranda dulu (fondasi navigasi model hub), baru kelima POI menyusul satu-satu, mengikuti pola commit-branch-PR yang sudah terbukti jalan sejak sesi S1 Briefing.

---

## 7. Status Konversi ke Kode — Selesai (September 2026)

Urutan di atas sudah dijalankan penuh lewat Claude Code, satu branch dan PR per unit, seperti disarankan.

| Unit | Rute `apps/web` | PR | Layar yang dibangun | Layar yang ditunda |
|---|---|---|---|---|
| Beranda | `/` | [#4](https://github.com/zaenalarifin05/soerabaja-quest/pull/4) | Hub penuh + kartu Arsip Sepia | — |
| Hotel Majapahit (Yamato) | `/rute/hotel-majapahit` | [#7](https://github.com/zaenalarifin05/soerabaja-quest/pull/7) | Y1 (info sebelum AR) | Y2/Y3 — kamera & mikrofon live |
| Jembatan Merah | `/rute/jembatan-merah` | [#8](https://github.com/zaenalarifin05/soerabaja-quest/pull/8) | M1 (info sebelum investigasi) | M2 — kamera live |
| Tugu Pahlawan | `/rute/tugu-pahlawan` | [#9](https://github.com/zaenalarifin05/soerabaja-quest/pull/9) | T1 (info sebelum gerbang earphone) | T2/T3 — audio & kamera live |
| Museum Siola | `/rute/museum-siola` | [#10](https://github.com/zaenalarifin05/soerabaja-quest/pull/10) | S1 — **utuh**, tidak ada layar AR yang ditunda | — |
| Koridor Tunjungan | `/rute/koridor-tunjungan` | [#11](https://github.com/zaenalarifin05/soerabaja-quest/pull/11) | U1 (ringkasan & merchant) | U2 (QR aktif + hitung mundur) — butuh state klien; U3 (penutup rute) — butuh data game state yang belum ada model/backend-nya |

**Batas cakupan yang konsisten dipakai di semua PR:** setiap POI hanya membangun layar "sebelum aksi" (statis, tanpa kamera/mikrofon/state klien). Layar yang butuh sesi kamera/audio live (Y2/Y3, M2, T2/T3) atau state klien + data game nyata (U2/U3) sengaja ditunda sebagai backlog terpisah, menunggu keputusan arsitektur AR/WebAR dan model data game state yang belum ada di manapun di codebase ini.

**Token semantik baru yang lahir dari proses ini** (lihat juga Dokumen 06 B27): `semantik.permukaan.arsip-2`, `semantik.teks.arsip-sekunder` (PR #5/B27), `semantik.permukaan.arsip-notifikasi`, `semantik.teks.arsip-notifikasi` (PR #6/B28), `semantik.teks.arsip-bahaya` (PR #7). Semua mengikuti pola "SAMA di semua tema" yang sudah ditetapkan untuk rezim Arsip.

**Belum ada di backlog manapun, perlu keputusan Anda sebelum dikerjakan:** arsitektur AR/WebAR untuk Y2/Y3/M2/T2/T3, dan model data game state (progres tokoh, riwayat lencana, sesi voucher) untuk U2/U3.
