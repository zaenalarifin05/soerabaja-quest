# 03 · Design System & Handoff UI/UX
## "Dua Zaman, Satu Layar"

**Pembaca:** Design Lead, UI Designer, Frontend Engineer, Unity Artist
**Prinsip induk:** Antarmuka bukan wadah netral untuk konten sejarah. Antarmuka **adalah** perpindahan zamannya.

---

## 1. Konsep Inti

Deck asli sudah menemukan ketegangan yang tepat — "Zaman Biyen" versus "Zaman Saiki". Kesalahan yang mudah dilakukan adalah menjadikan keduanya sekadar dua palet warna. Di sistem ini, keduanya adalah **dua rezim desain penuh** dengan aturan gerak, tipografi, suara, dan bahkan tempo yang berbeda.

| | ARSIP (Zaman Biyen) | LAPANGAN (Zaman Saiki) |
|---|---|---|
| Kapan muncul | Lore, dokumen, hasil investigasi, badge | Peta, kamera, HUD, voucher, profil |
| Perasaan | Kertas, tinta, mesin, tidak bisa diubah | Kaca, cahaya, responsif, sekarang |
| Warna | Sepia, tinta, merah pudar | Biru malam, perak, emas, mint |
| Gerak | **Potong keras (cut), tanpa easing.** Dokumen tidak memudar — ia dibuka | Easing halus, respons langsung ke sentuhan |
| Tipografi | Kondensat berat + mesin tik | Sans humanis |
| Tekstur | Grain kertas, cetakan tak rata, noda | Bersih, sedikit blur kaca |
| Suara | Analog: mesin tik, kertas, statik radio | Digital: klik pendek, dengung rendah |

**Transisi antar rezim adalah momen paling penting di seluruh sistem.** Ia tidak boleh berupa fade. Ia berupa **robekan** — layar sekarang terkoyak dan memperlihatkan lapisan arsip di bawahnya. Gestur ini identik dengan mekanik merobek bendera di Level 1. Satu gestur, satu makna, dipakai konsisten di seluruh produk: *merobek yang sekarang untuk melihat yang dulu.*

Ini tempat kita membelanjakan seluruh keberanian desain. Semua elemen lain tenang dan disiplin.

---

## 2. Token Warna

### 2.1 Jangkar brand

Lambang resmi Kota Surabaya ditetapkan menggunakan warna biru, hitam, perak (putih), dan emas (kuning), dan sistem ini mengambil keempatnya sebagai fondasi. Ini bukan pilihan estetis semata — ia membuat produk secara visual sah sebagai milik kota, bukan aplikasi swasta yang kebetulan bertema Surabaya.

```css
/* ═══ INTI · dari lambang kota ═══ */
--sby-biru-malam:   #0E2438;  /* base gelap seluruh mode Lapangan  */
--sby-biru:         #14456F;  /* biru lambang, permukaan & aksen   */
--sby-perak:        #C7D2DA;  /* teks sekunder, garis, ikon        */
--sby-putih:        #F2F5F7;  /* teks utama di atas gelap          */
--sby-emas:         #D4A22F;  /* penanda pencapaian, badge, cap    */
--sby-hitam:        #08141F;  /* bukan #000 dan bukan #0B0B0B      */

/* ═══ AKSI · warna interaksi ═══ */
--quest-mint:       #4FE68C;  /* CTA utama, status aktif, jejak    */
--quest-mint-redup: #2FA862;  /* tekan, disabled aktif             */

/* ═══ ARSIP · rezim Zaman Biyen ═══ */
--arsip-kertas:     #E3D6B8;  /* latar dokumen                     */
--arsip-kertas-tua: #CDBB95;  /* lipatan, bayang kertas            */
--arsip-tinta:      #241B12;  /* teks utama arsip                  */
--arsip-sepia:      #7A6144;  /* teks sekunder, garis tipis        */
--arsip-merah:      #9E2B22;  /* merah bendera pudar, penanda      */

/* ═══ SISTEM ═══ */
--sinyal-bahaya:    #E5533D;  /* error, kunci keselamatan          */
--sinyal-aman:      #4FE68C;
--sinyal-tunggu:    #D4A22F;
```

### 2.2 Catatan pertahanan atas palet ini

Latar kertas hangat berpasangan dengan serif dan aksen terakota adalah tampilan default yang muncul di hampir semua desain bertema "warisan/arsip", dan itu justru yang harus dihindari agar produk ini tidak terlihat generik. Tiga hal membedakan sistem ini:

1. **Kertas bukan latar utama.** Ia hanya muncul di rezim Arsip, kira-kira 30% dari total waktu layar. Latar utama produk adalah biru malam kota pelabuhan.
2. **Aksen bukan terakota.** Aksennya merah bendera pudar `#9E2B22` — warna yang secara harfiah berasal dari objek naratif produk ini.
3. **Emas bukan gradien dekoratif.** Emas hanya boleh dipakai untuk pencapaian. Kalau elemen berwarna emas, artinya pemain mendapatkannya. Aturan ini keras dan tanpa pengecualian.

### 2.3 Rasio kontras yang wajib lolos

| Kombinasi | Rasio | Status |
|---|---|---|
| `--sby-putih` di `--sby-biru-malam` | 13,8:1 | AAA |
| `--quest-mint` di `--sby-biru-malam` | 9,1:1 | AAA |
| `--arsip-tinta` di `--arsip-kertas` | 11,4:1 | AAA |
| `--arsip-sepia` di `--arsip-kertas` | 4,9:1 | AA (teks ≥16 px saja) |
| `--sby-emas` di `--sby-biru-malam` | 6,2:1 | AA |

Produk ini dipakai **di bawah matahari Surabaya**. Target kontras dinaikkan satu tingkat dari standar biasa, dan seluruh teks kritikal di mode kamera wajib memiliki lapisan gelap semi-transparan di belakangnya (`--sby-hitam` pada 62%), bukan mengandalkan text-shadow.

---

### 2.4 Lapisan token semantik — wajib

> **Ditambahkan September 2026**, peta lengkap di Dokumen 09.

Token di atas adalah **primitif** — daftar warna mentah. Komponen tidak boleh memakainya langsung. Komponen hanya memakai **token semantik**, yaitu nama berdasarkan peran:

```css
/* SALAH — mengunci diri ke satu tema selamanya */
.kartu-poi { background: #14456F; }

/* BENAR — komponen tidak tahu warnanya apa */
.kartu-poi { background: var(--permukaan-2); }
```

Peran utama: `--permukaan-0/1/2`, `--permukaan-arsip`, `--teks-utama/sekunder/redup`, `--teks-arsip`, `--aksi-utama`, `--aksi-teks`, `--pencapaian`, `--bahaya`, `--garis`, `--scrim`.

**Tiga peta nilai:** Gelap (pemain, WebAR, Wall) · Terang (Merchant PWA, CMS, Dashboard) · Mode Silau (penguat kontras otomatis untuk siang hari Surabaya).

**`--permukaan-arsip` dan `--teks-arsip` bernilai sama di ketiga peta.** Rezim Arsip tidak ikut berubah tema — itu kertas, dan kertas selalu kertas. Ini yang mencegah ledakan kombinasi.

**Ditegakkan lewat alat, bukan niat:** aturan lint menolak nilai heksadesimal di berkas komponen; di Figma setiap isian warna terikat variabel, tidak pernah diketik manual.

---

## 3. Tipografi

| Peran | Typeface | Alasan pemilihan |
|---|---|---|
| **Display / judul misi** | Big Shoulders Display (alternatif: Anton) | Kondensat, tegak, berkarakter huruf stensil dan papan nama industri pelabuhan. Kuat dalam huruf besar tanpa terasa seperti font poster film |
| **Antarmuka & isi** | Plus Jakarta Sans | Dirancang di Indonesia untuk keperluan kota; bentuk humanis, sangat terbaca di layar kecil, dukungan berat yang lengkap |
| **Dokumen arsip** | Courier Prime | Mesin tik, dipakai **hanya** di rezim Arsip untuk transkrip, telegram, dan berkas bukti. Tidak pernah untuk label UI |

Tiga keluarga adalah batas atas. Courier Prime bukan tambahan dekoratif — ia pembawa makna: kalau pemain melihat huruf mesin tik, ia sedang membaca dokumen, bukan teks aplikasi.

### Skala tipe

```
Display XL   40 / 40   Big Shoulders 800   tracking -0.02em   judul level
Display L    32 / 34   Big Shoulders 800   tracking -0.01em   judul scene
Judul M      24 / 30   Plus Jakarta 700                       header layar
Judul S      20 / 26   Plus Jakarta 700                       kartu
Isi L        17 / 27   Plus Jakarta 400                       naskah lore
Isi M        15 / 23   Plus Jakarta 400                       default UI
Isi S        13 / 19   Plus Jakarta 500                       metadata
Mono M       15 / 24   Courier Prime 400                      dokumen arsip
Mono S       12 / 18   Courier Prime 400                      sumber & sitasi
```

**Aturan naskah lore (direvisi September 2026):** Isi L, lebar baris maksimum 62 karakter.

> ~~Maksimum 140 kata per layar.~~ **Batas ini dicabut** menyusul Dokumen 07. Ia lahir dari asumsi layar tetap 844 piksel yang sudah tidak berlaku.
>
> **Penggantinya: maksimum 3× tinggi viewport per POI, sekitar 2.500 piksel.** Kurator boleh menulis sesuai kebutuhan peristiwa — insiden Yamato dan misteri Mallaby memang tidak sama panjangnya. Halaman lore wajib punya indikator progres baca supaya pembaca tahu masih berapa jauh.

---

## 4. Layout

### 4.0 Dua kelas layar — aturan induk

> **Ditambahkan September 2026**, spesifikasi penuh di Dokumen 07.

**Layar untuk membaca boleh digulir. Layar untuk bertindak tidak.**

Uji keputusan, satu saja "ya" berarti Layar Aksi:
1. Apakah kamera perlu hidup?
2. Apakah ada orang lain yang menunggu — kasir, guru, teman serombongan?
3. Apakah pengguna harus mengangkat kepala atau menggerakkan badan?

| | **HALAMAN BACA** | **LAYAR AKSI** |
|---|---|---|
| Tinggi | Bebas, maksimal 3× viewport | Persis 1× viewport, `overflow: hidden` |
| Kamera | Tidak aktif | Boleh full-bleed |
| Tab bar | Terlihat | Disembunyikan |
| CTA | **Sticky di bawah** | Tetap di sepertiga bawah |
| Posisi gulir | Dipulihkan saat kembali | Tidak berlaku |

**Sticky CTA adalah cara aturan "chrome di sepertiga bawah" tetap hidup di dunia gulir.** Tanpa itu, pemain harus menggulir kembali ribuan piksel untuk menekan tombol utama.

### 4.1 Kerangka mode Lapangan (kamera aktif)

```
┌─────────────────────────────────┐
│                                 │ ← kamera penuh, tanpa chrome
│                                 │
│         [ objek AR ]            │
│                                 │
│                                 │
│                                 │
├─────────────────────────────────┤
│  ╭───────────────────────────╮  │ ← lembar bawah, tinggi 3 tahap:
│  │ Titik 1 · Hotel Majapahit │  │   peek 88px / half 45% / full 88%
│  │ Usap layar dari atas ke   │  │
│  │ bawah. Robek birunya.     │  │
│  ╰───────────────────────────╯  │
│  ●━━━━━━○──────○      [ ⌂ ]     │ ← indikator progres 3 titik
└─────────────────────────────────┘
```

Sepertiga bawah layar adalah satu-satunya tempat chrome antarmuka boleh berada. Dua pertiga atas milik dunia nyata. Aturan ini tidak boleh dilanggar oleh fitur apa pun, termasuk notifikasi.

### 4.2 Kerangka mode Arsip

```
┌─────────────────────────────────┐
│ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ │ ← tepi kertas tidak rata
│  BERKAS 001            19·IX·45 │ ← Courier, kiri & kanan
│  ─────────────────────────────  │
│                                 │
│  Ploegman mengibarkan bendera   │ ← Plus Jakarta 17/27
│  Belanda di tiang lantai atas   │   rata kiri, 62 karakter
│  hotel tanpa izin siapa pun.    │
│                                 │
│  ┌───────────────────────────┐  │
│  │  [ foto arsip, monokrom ] │  │ ← gambar selalu dalam bingkai
│  └───────────────────────────┘  │   dengan kapsi Courier di bawah
│  Sumber: ANRI, koleksi ...      │
│                                 │
│  ╭─────────────╮                │
│  │ Lanjut  ▸   │                │ ← tombol tetap gaya Lapangan:
│  ╰─────────────╯                │   satu jangkar "sekarang"
└─────────────────────────────────┘
```

Perataan selalu kiri di kedua rezim. Tidak ada teks rata tengah kecuali pada layar badge dan layar "lihat ke atas" — dua momen yang memang berhenti total.

---

### Skala tipe Wall Siola

> **Ditambahkan September 2026**, spesifikasi penuh di Dokumen 08.

Diturunkan dari jarak baca 2,5 meter pada layar 55 inci resolusi 1080p. Skala mobile tidak berlaku di sini.

| Peran | Ukuran pada 1080p | Padanan mobile |
|---|---|---|
| Judul dinding | 92 px | Display XL |
| Kutipan utama | 56 px | Judul M |
| Nama kontributor | 40 px | Isi L |
| Metadata | 32 px | Isi S |
| **Batas bawah mutlak** | **28 px** | — |

**Apa pun yang tidak muat di atas 28 px tidak masuk Wall.** Ia pindah ke Feed. Aturan satu baris ini menyelesaikan sebagian besar keputusan tata letak Wall tanpa perlu diperdebatkan.

---

## 5. Komponen Inti

| Komponen | Rezim | Spesifikasi ringkas |
|---|---|---|
| `ScanFrame` | Lapangan | Bingkai bidik 260×260 dp, sudut mint 3 dp, denyut 1,2 detik. Tombol "Tidak bisa scan?" muncul otomatis pada detik ke-15 |
| `MissionSheet` | Lapangan | Lembar bawah 3 tahap, radius atas 20 dp, latar `--sby-hitam` 88% + blur 20 |
| `LoreDocument` | Arsip | Latar kertas + tekstur grain 6% opacity, tepi robek SVG, maksimal 3 halaman |
| `EvidenceCard` | Arsip | Kartu bukti dengan pin, rotasi acak −3° s/d +3°, dapat diketuk |
| `BadgeStamp` | Arsip → Lapangan | Cap emas yang **turun sekali dengan tumbukan**, bukan kilau berputar. Getar haptik medium bersamaan |
| `ProgressRail` | Lapangan | Tiga simpul horizontal, terisi mint, simpul aktif berdenyut |
| `LookUpMoment` | — | Layar padam, satu kalimat rata tengah, tanpa tombol selama 3–15 detik, `prefers-reduced-motion` tetap dihormati (padam tanpa animasi) |
| `VoucherQR` | Lapangan | QR 240 dp, latar putih penuh untuk keterbacaan pemindai, hitung mundur di bawah |
| `TearTransition` | Keduanya | Gestur usap vertikal, mesh terkoyak, 700 ms, dipicu manual atau otomatis di batas rezim |
| `SafetyLock` | Lapangan | Overlay `--sinyal-bahaya` 18% + pesan, aktif saat kecepatan > 7 km/j |
| `LockedCard` | Lapangan | **Ditambahkan Sept 2026.** Kartu POI/koleksi terkunci memakai **siluet ikon aslinya sendiri**, diredupkan (grayscale + opacity 35%) — bukan ikon gembok generik. Rasional: mempertahankan rasa penasaran terhadap konten di baliknya, bukan sekadar menandai "tidak bisa diakses". Gembok hanya dipakai untuk kunci sistem (mis. avatar terkunci syarat pangkat), tidak untuk POI |
| `ArchiveEntryCard` | Arsip | Kartu kepingan koleksi, identik pola dengan `BadgeStamp` tapi persegi bukan bundar. Status terkunci mengikuti aturan `LockedCard` di atas |

### Aturan gerak

- Rezim Lapangan: `cubic-bezier(0.2, 0, 0, 1)`, durasi 200–320 ms.
- Rezim Arsip: **tanpa easing.** Perubahan terjadi dalam 1 frame, seperti slide proyektor. Ini terasa aneh saat pertama diuji dan benar setelah dilihat dalam konteks.
- `TearTransition` adalah satu-satunya animasi panjang di sistem (700 ms). Tidak boleh ada animasi lain yang melebihi 320 ms.
- `prefers-reduced-motion: reduce` → semua transisi menjadi potong keras, termasuk TearTransition yang menjadi potong dengan bunyi robek saja.

---

## 6. Suara sebagai Bagian Design System

Sering dilupakan di handoff, padahal di produk ini suara memikul separuh beban atmosfer.

| Event | Rezim | Bunyi | Durasi |
|---|---|---|---|
| Scan berhasil | Lapangan | Klik mekanis pendek + haptik ringan | 120 ms |
| Buka dokumen | Arsip | Kertas ditarik dari map | 400 ms |
| Robek transisi | — | Kain terkoyak, dilapis statik radio | 700 ms |
| Badge diperoleh | Arsip | Cap stempel di atas meja kayu | 300 ms |
| Voucher tertukar | Lapangan | Dua nada naik + haptik sukses | 250 ms |
| Kunci keselamatan | Lapangan | Nada rendah tunggal, tidak menakutkan | 200 ms |

Semua bunyi UI dimatikan otomatis saat scene audio naratif sedang berjalan. Tidak ada yang lebih merusak orasi Bung Tomo daripada bunyi klik tombol.

---

## 7. Paket Handoff — Yang Harus Diserahkan ke Developer

### 7.1 Dari desainer

| Artefak | Format | Kriteria selesai |
|---|---|---|
| Design token | `tokens.json` (W3C Design Tokens) | Terhubung ke Tailwind config & Unity ScriptableObject |
| Komponen Figma | Library terpublikasi, semua varian & state | Setiap komponen punya state: default, tekan, fokus, disabled, loading, error |
| Layar mobile | 3 ukuran: 360×800, 390×844, 430×932 | Termasuk keadaan kosong, error, dan offline |
| Layar WebAR | 360×640 dan 390×844 | Termasuk layar izin kamera ditolak |
| Spesifikasi gerak | Video referensi + tabel timing | Setiap animasi punya durasi, easing, dan pemicu tertulis |
| Aset ikon | SVG, grid 24, stroke 1,75 | Tidak ada ikon berbasis font |
| Aset arsip | PNG + tekstur grain terpisah | Grain sebagai layer, bukan dipanggang ke gambar |
| Anotasi aksesibilitas | Di dalam Figma | Urutan fokus, label pembaca layar, target sentuh ≥ 48×48 dp |

### 7.2 Dari copywriter

Naskah diserahkan sebagai file terstruktur, bukan komentar di Figma:

```json
{
  "poi.majapahit.lore.p1": {
    "id": "Ploegman mengibarkan bendera Belanda di tiang lantai atas hotel tanpa izin siapa pun.",
    "en": "Ploegman raised the Dutch flag on the hotel's upper-floor pole without anyone's permission.",
    "max_chars": 180,
    "source_ref": "curator/majapahit-01",
    "reviewed_by": "historian_id_04",
    "reviewed_at": "2027-01-14"
  }
}
```

Field `reviewed_by` dan `reviewed_at` wajib terisi sebelum build produksi. CI harus gagal jika ada kunci naskah sejarah tanpa reviewer. Ini cara termurah untuk mencegah kesalahan sejarah lolos ke publik.

### 7.3 Dari 3D artist

| Aset | Batas poligon | Tekstur | Format |
|---|---|---|---|
| Bendera (Level 1) | ≤ 4.000 tris, mesh cloth | 1024² albedo + normal | glTF 2.0 + Draco |
| Mobil Buick (Level 2) | ≤ 25.000 tris | 2048² PBR, 1 material | glTF 2.0 + Draco, KTX2 |
| Figur cahaya (Level 3) | ≤ 8.000 tris | Emissive, tanpa albedo detail | glTF 2.0 |
| Badge 3D | ≤ 1.500 tris | 512² | glTF 2.0 |
| Total per POI | **≤ 12 MB setelah kompresi** | | |

Anggaran 12 MB per POI itu keras. Ia berasal dari target offline pack 250 MB per rute dikurangi audio dan tekstur lingkungan.

---

## 8. Perbedaan WebAR vs Mobile App

Keduanya berbagi token dan bahasa visual, tapi bukan produk yang sama. WebAR adalah **cuplikan**, bukan versi kecil.

| Aspek | WebAR (trial) | Mobile App (produk) |
|---|---|---|
| Cakupan | 1 POI, 1 interaksi AR, 60–90 detik | 5 POI, rute penuh, 3+ jam |
| Rezim desain | Hanya Lapangan + 1 layar Arsip | Kedua rezim penuh |
| Anggaran unduh | **≤ 4 MB total** | 180 MB app + 250 MB pack |
| Tracking | Image target pada standee/poster | Image target + plane detection + geospasial |
| Audio | Stereo | Spatial 3D |
| Badge | Pratinjau, tidak tersimpan | Tersimpan permanen |
| Voucher | Tidak ada | Ada |
| Tujuan konversi | Instal aplikasi | Selesaikan rute |
| Layar khusus | *"Ini baru satu titik. Ada empat lagi."* | — |

WebAR punya satu tugas dan hanya satu: membuat orang yang sedang berdiri di trotoar merasakan 60 detik yang cukup mengesankan untuk mau mengunduh 180 MB. Setiap kilobyte yang tidak melayani tugas itu harus dibuang.

---

## 9. Aksesibilitas & Keselamatan Fisik

Bagian ini bukan lampiran. Produk yang membuat remaja menatap layar sambil menyeberang Jalan Tunjungan adalah produk yang gagal, seberapa pun indah desainnya.

- **Target sentuh minimum 48×48 dp** di seluruh mode kamera, 44×44 dp di mode dokumen.
- **Semua audio bertakarir**, termasuk drama audio interstitial dan orasi. Takarir bukan opsi tersembunyi di pengaturan — ia menyala secara default dan pemain boleh mematikannya.
- **Mode kontras tinggi** yang menebalkan seluruh lapisan gelap di belakang teks kamera.
- **Kunci keselamatan bergerak**: kamera terkunci di atas 7 km/jam.
- **Peringatan penyeberangan**: sistem mengenali 4 titik penyeberangan berisiko di rute dan mengunci layar 15 detik sebelum pemain mencapainya, dengan pesan tegas.
- **Zona aman fisik**: setiap standee dipasang mundur minimal 1,5 m dari tepi jalan, dengan penanda lantai yang menunjukkan tempat berdiri yang aman untuk memindai.
- **Batas durasi kamera**: setelah 12 menit kamera aktif berturut-turut, sistem menyarankan istirahat. Baik untuk baterai, lebih baik lagi untuk mata dan kesadaran situasi.
