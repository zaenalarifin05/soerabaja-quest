# @soerabaja/tokens

Satu sumber nilai desain untuk Figma, Flutter, dan web. Format W3C Design Tokens (DTCG).

## Dua lapis, dan kenapa

**Lapis 1 — primitif** (`tokens/primitif.json`). Daftar warna mentah: `primitif.inti.biru = #14456F`.

**Lapis 2 — semantik** (`tokens/semantik.*.json`). Nama berdasarkan peran: `semantik.permukaan.2 → {primitif.inti.biru}`.

**Komponen hanya boleh memakai lapis 2.** Ini bukan preferensi gaya — ia yang menentukan biaya setiap perubahan tema di kemudian hari.

```css
/* SALAH — mengunci diri ke satu tema selamanya */
.kartu-poi { background: #14456F; }

/* BENAR — komponen tidak tahu warnanya apa */
.kartu-poi { background: var(--semantik-permukaan-2); }
```

Menambah Mode Silau dengan lapis semantik: satu berkas peta baru, nol komponen disentuh. Tanpa lapis semantik: membuka ratusan berkas.

## Tiga tema

| Tema | Permukaan |
|---|---|
| `gelap` | Aplikasi pemain, WebAR, Wall Siola |
| `terang` | Merchant PWA, Admin CMS, Dashboard |
| `silau` | Penguat kontras otomatis untuk siang hari Surabaya |

**`semantik.permukaan.arsip` dan `semantik.teks.arsip` bernilai sama di ketiga tema.** Rezim Arsip tidak ikut berubah — itu kertas, dan kertas selalu kertas. Aturan ini yang mencegah ledakan kombinasi antara dua rezim visual dan tiga tema.

Perhatikan `semantik.aksi.utama` berubah dari `#4FE68C` (gelap) ke `#1E8B4E` (terang). Mint terang tidak lolos kontras di atas putih — tema tidak bisa sekadar dibalik.

## Membangun

```bash
npm install
npm run build
```

Keluaran:

```
build/
├── css/
│   ├── primitif.css        ← referensi saja, jangan diimpor komponen
│   ├── tema-gelap.css      ← :root, [data-tema="gelap"]
│   ├── tema-terang.css     ← [data-tema="terang"]
│   └── tema-silau.css      ← [data-tema="silau"]
├── js/tema-*.js            ← untuk Tailwind config & TS
└── dart/tema_*.dart        ← untuk Flutter
```

## Memakai

**Web** — impor `tema-gelap.css` sebagai dasar, lalu tema lain sesuai permukaan. Ganti tema dengan mengubah `data-tema` pada `<html>`.

**Flutter** — `TemaGelap.semantik_permukaan_2`, dsb.

**Figma** — impor `tokens/` lewat plugin Tokens Studio. Setiap isian warna terikat variabel, tidak pernah diketik manual.

## Penegakan

Aturan lint menolak nilai heksadesimal, `rgb()`, `hsl()`, dan pemakaian langsung `var(--primitif-*)` di berkas komponen. Ditegakkan alat, bukan kesepakatan rapat — kesepakatan rapat tidak bertahan sampai sprint keenam.

```bash
npx stylelint "apps/**/*.css" "packages/ui/**/*.css"
```

## Token non-warna yang layak diperhatikan

| Token | Nilai | Asal keputusan |
|---|---|---|
| `ukuran.gulir.kedalaman-maks` | 2500px | Batas Halaman Baca per POI (Dok 07). Menggantikan batas 140 kata |
| `ukuran.target.sentuh-min` | 48px | Backlog B5 |
| `ukuran.safe-area.atas` / `.bawah` | 47px / 34px | Backlog B4 |
| `ukuran.target.tombol-kasir` | 72px | Merchant PWA — ditekan sambil berdiri |
| `gerak.durasi.robek` | 700ms | Satu-satunya animasi panjang di sistem |
| `gerak.easing.arsip` | potong keras | Rezim Arsip berubah dalam 1 frame |
| `gerak.timeout.layar-aksi-menganggur` | 90000ms | Kamera dimatikan penuh (Dok 04 B.3b) |
| `font.wall.minimum` | 28px | Apa pun di bawah ini tidak masuk Wall Siola (Dok 08) |
