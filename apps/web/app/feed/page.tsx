import Link from 'next/link';

// Sumber: docs/desain/11-wall-siola.html, "VERSI WEB — SOERABAJA FEED"
// Kanal publik yang sama datanya dengan Wall Siola (/wall-siola), tata letak berbeda —
// interaktif, kepadatan lebih tinggi, dibaca dari jarak 40cm (Dokumen 08 §1/§8). Aturan
// privasi identik dengan Wall: tingkat A/B/C berlaku sama, tidak ada entri yang boleh
// tayang di satu kanal tapi ditolak di kanal lain.
//
// Halaman statis dengan data contoh, sama seperti Wall Siola — gulir tak terbatas,
// filter per titik/tanggal, pencarian, dan halaman per kontribusi (Dokumen 08 §8) belum
// diimplementasikan karena butuh backend UGC nyata dan routing tambahan.

const KONTRIBUSI_LAIN = [
  {
    tingkat: 'B · 18+',
    tingkatWarna: 'pencapaian' as const,
    meta: null,
    isi: '"Bapakku cerita kakekku ikut di Jembatan Merah. Baru hari ini aku ngerti maksudnya."',
    fotoPlaceholder: true,
  },
  {
    tingkat: 'A',
    tingkatWarna: 'aksi' as const,
    meta: 'Verified 10:02 WIB',
    isi: '"Baru sadar Siola dulu jadi saksi sejarah lewat. Kirain cuma mal biasa."',
    fotoPlaceholder: false,
  },
];

export default function SoerabajaFeed() {
  return (
    <main className="min-h-screen bg-permukaan-1 font-ui">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-teks-sekunder/15 px-6 py-6">
        <div>
          <p className="font-mono text-[11px] leading-4 tracking-[0.03em] text-aksi">
            SOERABAJA 1945 · FEED
          </p>
          <h1 className="mt-0.5 font-display text-[22px] leading-[26px] tracking-[-0.01em] text-teks-utama">
            DUA ZAMAN, SATU LAYAR
          </h1>
        </div>
        <div className="flex flex-none gap-2">
          <button
            type="button"
            // TODO: buka filter per titik/tanggal begitu tersedia — butuh data UGC nyata
            className="rounded-lg bg-teks-sekunder/10 px-3.5 py-2.5 text-[13px] text-teks-sekunder"
          >
            Semua Titik ▾
          </button>
          <Link
            // TODO: arahkan ke halaman unduh aplikasi — Feed adalah kanal akuisisi
            // (Dokumen 08 §8), belum ada halaman tujuannya
            href="/unduh"
            className="flex items-center rounded-lg bg-aksi px-3.5 py-2.5 text-[13px] font-semibold text-aksi-teks"
          >
            Ikuti Rute Ini →
          </Link>
        </div>
      </header>

      <div className="flex flex-wrap gap-6 border-b border-teks-sekunder/10 px-6 py-5">
        <div>
          <span className="font-bold text-aksi">2.840</span>{' '}
          <span className="text-[13px] text-teks-redup">foto</span>
        </div>
        <div>
          <span className="font-bold text-aksi">412</span>{' '}
          <span className="text-[13px] text-teks-redup">tayang</span>
        </div>
        <div>
          <span className="font-bold text-aksi">13:58:16</span>{' '}
          <span className="text-[13px] text-teks-redup">live</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 px-6 py-6 sm:grid-cols-2">
        <div className="col-span-full rounded-xl bg-permukaan-2/40 p-5">
          <div className="mb-2.5 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-aksi/16 px-2.5 py-1 text-[11px] text-aksi">TINGKAT A</span>
            <span className="text-[12px] text-teks-redup">Titik 4 · Siola · 14:22</span>
          </div>
          <p className="text-[15px] leading-[1.6] text-teks-utama">
            &ldquo;Merinding pas nyobek birunya. Getaran haptic muncul, kayak beneran robek kain
            arek-arek Suroboyo tahun 1945. Sejarah dadi cetha, verifikasi museum Siola
            #64.&rdquo;
          </p>
          <div className="mt-2 text-[13px] text-aksi">— Rekrut Baru</div>
        </div>

        {KONTRIBUSI_LAIN.map((kontribusi, index) => (
          <div key={index} className="rounded-xl bg-permukaan-2/40 p-4">
            {kontribusi.fotoPlaceholder && (
              <div
                className="mb-2.5 flex h-[100px] items-center justify-center rounded-lg"
                style={{ background: 'linear-gradient(160deg, #14456F, #0E2438)' }}
              >
                <span className="font-mono text-[10.5px] tracking-[0.03em] text-teks-redup">
                  FOTO AR · TANPA WAJAH
                </span>
              </div>
            )}
            <span
              className={
                kontribusi.tingkatWarna === 'pencapaian'
                  ? 'rounded-full bg-pencapaian/16 px-2.5 py-1 text-[11px] text-pencapaian'
                  : 'rounded-full bg-aksi/16 px-2.5 py-1 text-[11px] text-aksi'
              }
            >
              TINGKAT {kontribusi.tingkat}
            </span>
            <p className="mt-2 text-[13px] leading-[1.5] text-teks-sekunder">{kontribusi.isi}</p>
            {kontribusi.meta && (
              <div className="mt-2 text-[11px] text-teks-redup">{kontribusi.meta}</div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
