Setup VS Code — Soerabaja Quest

Panduan dari mesin kosong sampai apps/web berjalan memakai token dan tipe API yang sudah dihasilkan. Sekitar 90 menit.

Simpan berkas ini di akar repo. Anggota tim berikutnya memakai panduan yang sama.

0. Prasyarat
Wajib sekarang
Alat	Versi	Verifikasi	Catatan
Node.js	20 LTS atau 22	node -v	Jangan 18; beberapa dependensi sudah melepasnya
pnpm	9+	pnpm -v	corepack enable && corepack prepare pnpm@latest --activate
Git	2.40+	git --version	
VS Code	terbaru		
Java JDK	17+	java -version	Hanya untuk openapi-generator (codegen Dart). Lewati kalau belum menggarap mobile
Belum perlu — jangan dipasang dulu

Flutter SDK dan Unity Hub. Keduanya baru dibutuhkan setelah spike UaaL di Sprint 0 minggu 5–6. Memasangnya sekarang berarti 20 GB ruang disk untuk sesuatu yang arsitekturnya belum diputuskan.

Docker Desktop. Baru perlu saat services/api dimulai, untuk PostgreSQL + PostGIS dan Redis. Fase ini masih frontend.

Ekstensi VS Code

Pasang lewat panel Extensions:

anthropic.claude-code                  ← Claude Code
dbaeumer.vscode-eslint
stylelint.vscode-stylelint
esbenp.prettier-vscode
bradlc.vscode-tailwindcss
redhat.vscode-yaml                     ← validasi openapi.yaml saat mengetik
42Crunch.vscode-openapi                ← pratinjau & lint kontrak API
usernamehw.errorlens                   ← galat lint tampil inline

Buat .vscode/settings.json agar seluruh tim punya perilaku sama:

json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": { "source.fixAll.eslint": "explicit" },
  "stylelint.validate": ["css", "scss", "postcss"],
  "css.validate": false,
  "yaml.schemas": {
    "https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/schemas/v3.1/schema.json": "packages/api-contract/openapi.yaml"
  },
  "files.eol": "\n"
}
1. Buat repo dan struktur
bash
mkdir soerabaja-quest && cd soerabaja-quest
git init -b main
code .

Buat struktur folder:

bash
mkdir -p docs packages/{tokens,api-contract,ui} apps/{web,merchant,cms,wall} services/api .vscode

Tanda berhasil: tree -L 2 -d menampilkan struktur di atas.

2. Masukkan artefak yang sudah jadi
bash
# Sepuluh dokumen markdown — ikut di-version, di-review lewat PR seperti kode
cp ~/Downloads/*.md docs/

# Paket token — ekstrak isinya ke packages/tokens
unzip ~/Downloads/soerabaja-tokens.zip -d /tmp/tok
cp -r /tmp/tok/packages/tokens/* packages/tokens/
cp /tmp/tok/.stylelintrc.json .
cp /tmp/tok/.eslintrc.tokens.json .

# Kontrak API
cp ~/Downloads/openapi.yaml packages/api-contract/

Kenapa dokumen masuk repo. Perubahan keputusan jadi punya jejak lewat git, dan developer membacanya di tempat yang sama dengan kodenya — bukan di folder cloud yang jarang dibuka.

3. Inisialisasi workspace pnpm

package.json di akar:

json
{
  "name": "soerabaja-quest",
  "private": true,
  "packageManager": "pnpm@9.12.0",
  "scripts": {
    "tokens": "pnpm --filter @soerabaja/tokens build",
    "api:lint": "redocly lint packages/api-contract/openapi.yaml",
    "api:types": "pnpm --filter @soerabaja/api-contract generate",
    "lint:css": "stylelint \"apps/**/*.css\" \"packages/ui/**/*.css\"",
    "dev": "pnpm --filter @soerabaja/web dev",
    "bootstrap": "pnpm install && pnpm tokens && pnpm api:types"
  },
  "devDependencies": {
    "@redocly/cli": "^1.25.0",
    "stylelint": "^16.10.0",
    "prettier": "^3.3.0"
  }
}

pnpm-workspace.yaml:

yaml
packages:
  - 'packages/*'
  - 'apps/*'
  - 'services/*'

.gitignore:

node_modules/
.next/
build/
dist/
.env*
!.env.example
.DS_Store
*.log

Lalu:

bash
pnpm install

Tanda berhasil: folder node_modules muncul, tanpa error.

4. Bangun token — langkah pertama yang menghasilkan sesuatu
bash
pnpm tokens

Tanda berhasil: keluar ✓ tema gelap, ✓ tema terang, ✓ tema silau, tanpa peringatan collision.

Periksa hasilnya:

bash
cat packages/tokens/build/css/tema-gelap.css

Harus memuat --semantik-permukaan-2: #14456f dan --semantik-scrim: rgba(8, 20, 31, 0.62).

Jangan lanjut sebelum langkah ini bersih. Seluruh komponen bergantung padanya.

5. Codegen tipe dari kontrak API

packages/api-contract/package.json:

json
{
  "name": "@soerabaja/api-contract",
  "version": "1.0.0",
  "main": "generated/types.ts",
  "scripts": {
    "generate": "openapi-typescript openapi.yaml -o generated/types.ts",
    "lint": "redocly lint openapi.yaml"
  },
  "devDependencies": {
    "openapi-typescript": "^7.4.0"
  }
}
bash
pnpm install
pnpm api:lint      # harus: "Woohoo! Your API description is valid."
pnpm api:types

Tanda berhasil: packages/api-contract/generated/types.ts berisi tipe seperti Rute, POI, EntriWall.

Kenapa ini sebelum menulis klien. Tipe dihasilkan dari kontrak, bukan ditulis tangan. Saat kontrak berubah, TypeScript langsung menunjukkan kode mana yang rusak — bukan ketahuan saat runtime di lapangan.

6. Scaffold apps/web
bash
cd apps/web
pnpm create next-app@latest . --typescript --tailwind --app --eslint --no-src-dir --import-alias "@/*"
cd ../..

Ubah apps/web/package.json → "name": "@soerabaja/web", lalu tambahkan dependensi internal:

json
"dependencies": {
  "@soerabaja/tokens": "workspace:*",
  "@soerabaja/api-contract": "workspace:*"
}
bash
pnpm install
7. Sambungkan token ke web

Catatan penting — Tailwind v4. Kalau create-next-app memasang tailwindcss: ^4 (cek apps/web/package.json), jangan buat tailwind.config.ts. Tailwind v4 tidak memakainya — project akan compile tanpa error, tapi seluruh kelas warna custom (bg-permukaan-1, dst) diam-diam diabaikan dan halaman tampil tanpa gaya sama sekali. Konfigurasi warna custom di v4 masuk langsung ke globals.css lewat @theme, seperti langkah di bawah.

apps/web/app/globals.css — seluruh isinya, urutan penting: @import 'tailwindcss' wajib baris pertama.

css
@import 'tailwindcss';

@import '@soerabaja/tokens/build/css/tema-gelap.css';
@import '@soerabaja/tokens/build/css/tema-terang.css';
@import '@soerabaja/tokens/build/css/tema-silau.css';

@theme {
  --color-permukaan-0: var(--semantik-permukaan-0);
  --color-permukaan-1: var(--semantik-permukaan-1);
  --color-permukaan-2: var(--semantik-permukaan-2);
  --color-permukaan-arsip: var(--semantik-permukaan-arsip);

  --color-teks-utama: var(--semantik-teks-utama);
  --color-teks-sekunder: var(--semantik-teks-sekunder);
  --color-teks-redup: var(--semantik-teks-redup);
  --color-teks-arsip: var(--semantik-teks-arsip);

  --color-aksi: var(--semantik-aksi-utama);
  --color-aksi-teks: var(--semantik-aksi-teks);
  --color-pencapaian: var(--semantik-pencapaian);
  --color-bahaya: var(--semantik-bahaya);

  --font-display: 'Big Shoulders Display', Anton, sans-serif;
  --font-ui: 'Plus Jakarta Sans', system-ui, sans-serif;
  --font-mono: 'Courier Prime', monospace;
}

Setiap --color-nama di blok @theme otomatis menghasilkan kelas bg-nama, text-nama, border-nama. Ini yang menggantikan peran tailwind.config.ts di v3.

Hindari modifier opasitas (text-teks-arsip/70, bg-black/5) sampai token warna didefinisikan dalam format channel RGB — untuk sekarang pakai warna token utuh atau rgba() manual bila perlu transparansi.

Set tema di app/layout.tsx:

tsx
<html lang="id" data-tema="gelap">

Uji cepat — dua bagian.

Bagian satu, tampilan dasar. Isi app/page.tsx:

tsx
export default function Home() {
  return (
    <main className="min-h-screen bg-permukaan-1 p-8">
      <h1 className="font-display text-[40px] leading-[40px] tracking-[-0.02em] text-teks-utama">
        SOERABAJA 1945
      </h1>
      <p className="mt-4 font-ui text-teks-sekunder">Token tersambung.</p>
      <button className="mt-6 h-14 rounded-xl bg-aksi px-6 font-ui font-semibold text-aksi-teks">
        Lanjutkan Misi
      </button>
    </main>
  );
}
bash
pnpm dev

Tanda berhasil: buka localhost:3000 — latar biru malam, judul kondensat besar, tombol mint. Ubah data-tema="terang" di layout, muat ulang; seluruh halaman berubah terang tanpa satu pun komponen disentuh. Itu bukti lapisan semantiknya bekerja. Kembalikan ke "gelap" setelah diuji.

Bagian dua, rezim Arsip dan sticky CTA — sekaligus menguji pola Halaman Baca dari Dokumen 07. Ganti isi page.tsx dengan versi yang kontennya sengaja dipanjangkan agar melebihi tinggi layar:

tsx
export default function Home() {
  return (
    <main className="relative min-h-screen bg-permukaan-arsip pb-28">
      <div className="px-7 pt-16">
        <h1 className="font-display text-[32px] leading-[34px] tracking-[-0.01em] text-teks-arsip">
          NAPAK TILAS 45
        </h1>
        <p className="mt-4 font-ui text-[17px] leading-[27px] text-teks-arsip">
          Lima titik. Tiga jam dua puluh menit. 4,1 kilometer berjalan
          melewati tiga tanggal.
        </p>
      </div>
      <div className="mx-7 mt-6 rounded-lg bg-permukaan-2 p-4">
        <p className="font-mono text-xs text-teks-arsip">SEBELUM BERANGKAT</p>
        <ul className="mt-2 space-y-1 font-mono text-[15px] leading-6 text-teks-arsip">
          <li>[ ]  Baterai di atas 70%</li>
          <li>[ ]  Earphone dibawa</li>
        </ul>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-permukaan-arsip px-7 py-4">
        <button className="h-14 w-full rounded-xl bg-aksi font-ui font-semibold text-aksi-teks">
          Siapkan Misi
        </button>
      </div>
    </main>
  );
}

Tanda berhasil: latar kertas krem (bukan biru), font mono terlihat beda di label dan checklist, dan tombol "Siapkan Misi" tetap menempel di bawah saat halaman digulir — pembuktian position: fixed untuk sticky CTA.

8. Aktifkan penegakan lint
bash
pnpm lint:css

Uji bahwa aturannya benar-benar menangkap. Tambahkan sementara di globals.css:

css
.uji { color: #14456F; }

Jalankan lagi — harus muncul:

Nilai heksadesimal dilarang di komponen. Pakai token semantik.

Hapus baris uji itu.

Kalau tidak muncul, jangan lanjut. Aturan yang tidak menangkap sama saja dengan tidak ada, dan dalam tiga sprint nilai mentah akan tersebar di mana-mana.

Gabungkan .eslintrc.tokens.json ke eslint.config.mjs agar nilai heksadesimal di JSX juga tertangkap.

9. Commit pertama
bash
git add .
git commit -m "fondasi: token semantik, kontrak API, scaffold web

- packages/tokens: 2 lapis token, 3 tema, build ke CSS/JS/Dart
- packages/api-contract: OpenAPI 3.1, 17 operasi, lolos redocly
- apps/web: Next.js tersambung ke token semantik
- docs: 10 dokumen keputusan desain & arsitektur
- lint: menolak nilai heksadesimal di berkas komponen"

Buat remote, push, lalu aktifkan branch protection pada main: wajib pull request, wajib CI lolos.

10. CI minimal

.github/workflows/ci.yml:

yaml
name: CI
on: [push, pull_request]

jobs:
  periksa:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm tokens
      - run: pnpm api:lint
      - run: pnpm api:types
      - run: pnpm lint:css
      - run: pnpm --filter @soerabaja/web build

CI ini yang menegakkan disiplin token, bukan kesepakatan rapat. Pull request yang memuat nilai heksadesimal di komponen akan gagal otomatis.

Urutan berikutnya

Setelah langkah 10 hijau:

apps/web/app/ar/yamato/ — halaman WebAR pilot, anggaran keras 4 MB
Tiga jalan buntu dari Dokumen 08: in-app browser Instagram, izin kamera ditolak, WebXR tidak didukung
packages/ui — komponen bersama: tombol, bottom sheet, kartu POI, badge
services/api — mulai dari /missions/{id}/verify, diperlakukan seperti endpoint pembayaran
Daftar periksa
 node -v ≥ 20, pnpm -v ≥ 9
 Ekstensi VS Code terpasang, .vscode/settings.json dibuat
 pnpm tokens bersih tanpa peringatan collision
 pnpm api:lint menampilkan "Woohoo!"
 generated/types.ts berisi tipe dari kontrak
 localhost:3000 tampil dengan warna token
 Mengubah data-tema mengubah seluruh tampilan
 Aturan lint terbukti menangkap nilai heksadesimal
 CI hijau, branch protection aktif
Masalah yang sering muncul

Halaman tampil tanpa gaya sama sekali, padahal terminal bilang ✓ Compiled tanpa error — hampir pasti Tailwind v4 dengan tailwind.config.ts yang tidak pernah dibaca. Cek apps/web/package.json: kalau "tailwindcss": "^4", konfigurasi warna wajib lewat @theme di globals.css, bukan berkas .ts terpisah. Lihat §7.

pnpm tokens gagal ERR_MODULE_NOT_FOUND — package.json di packages/tokens harus punya "type": "module".

Impor CSS token tidak ditemukan di Next.js — pakai jalur paket lengkap @soerabaja/tokens/build/css/tema-gelap.css, dan pastikan pnpm install sudah menautkan workspace.

Warna Tailwind tidak berlaku — content di tailwind.config.ts harus mencakup semua folder yang memakai kelas tersebut.

Stylelint tidak jalan di VS Code — pastikan css.validate: false agar validator bawaan tidak bentrok dengan Stylelint.