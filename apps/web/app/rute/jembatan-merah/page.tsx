import Link from 'next/link';

// Sumber: docs/desain/07-poi-jembatan-merah.html, screen "M1 · Halaman POI — sebelum investigasi"
// M2 (AR investigasi 3D, kamera terkunci) sengaja belum dibangun — sama alasannya dengan
// Y2/Y3 di halaman Hotel Majapahit: berjalan dalam sesi kamera live, menunggu keputusan
// arsitektur AR/WebAR.
//
// Catatan penyimpangan dari frame statis mock-up: mock-up menunjukkan kartu bukti
// "Lemparan Granat" sudah terpilih dan tombol kunci berwarna aktif (mint) — itu contoh
// tampilan SETELAH dipilih untuk keperluan review desain, bukan state awal. Sesuai
// catatan mock-up sendiri ("tombol kunci baru aktif setelah satu dipilih") dan prinsip
// "satu pilihan, tanpa jawaban benar", halaman ini merender state awal yang benar: belum
// ada bukti terpilih, tombol kunci nonaktif.

const TAHAPAN = ['STANDEE', 'INVESTIGASI', 'KESIMPULAN', 'BADGE'];
const TAHAP_AKTIF = 1;

export default function PoiJembatanMerah() {
  return (
    <main className="min-h-screen bg-permukaan-1 font-ui">
      <header className="flex items-start justify-between px-6 pt-11 pb-4">
        <div>
          <p className="font-mono text-[11px] leading-4 tracking-[0.03em] text-aksi">
            SOERABAJA 1945 · TITIK 2
          </p>
          <h1 className="mt-1 font-display text-[24px] leading-[26px] tracking-[-0.01em] text-teks-utama">
            JEMBATAN MERAH
          </h1>
          <p className="mt-0.5 text-[12px] leading-[17px] font-medium text-teks-sekunder">
            Kawasan Kota Lama
          </p>
        </div>
        <div className="flex-none text-right">
          <div className="mb-1 rounded-lg bg-permukaan-arsip-notifikasi px-2 py-1 font-mono text-[10.5px] leading-[15px] tracking-[0.03em] text-teks-arsip-notifikasi">
            30 OKT &apos;45
          </div>
          <p className="font-mono text-[10.5px] leading-[15px] tracking-[0.03em] text-teks-redup">60 M</p>
        </div>
      </header>

      {/* Render TKP — ilustrasi stilasi (jembatan + ledakan), BUKAN reproduksi foto asli.
          Palet di bawah milik aset ilustrasi, bukan token semantik. */}
      <div
        className="relative mx-6 mb-3 h-[170px] overflow-hidden rounded-2xl"
        style={{ background: '#1C2B38' }}
      >
        <svg width="100%" height="100%" viewBox="0 0 342 170" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <rect width="342" height="170" fill="#22303C" />
          <rect x="0" y="120" width="342" height="50" fill="#16222C" />
          <g stroke="#7A2B22" strokeWidth="5" fill="none">
            <path d="M20 120 L60 55 L120 55 L100 120" />
            <path d="M242 120 L262 55 L322 55 L302 120" />
            <line x1="60" y1="55" x2="60" y2="120" />
            <line x1="120" y1="55" x2="120" y2="120" />
            <line x1="262" y1="55" x2="262" y2="120" />
            <line x1="322" y1="55" x2="322" y2="120" />
          </g>
          <rect x="20" y="118" width="302" height="6" fill="#3A2A22" />
          <rect x="150" y="98" width="46" height="20" rx="3" fill="#1A1410" />
          <circle cx="160" cy="120" r="6" fill="#0D0A08" />
          <circle cx="186" cy="120" r="6" fill="#0D0A08" />
          <path d="M158 98 Q166 70 176 92 Q182 66 192 96 Q196 78 200 98 Z" fill="#D4681E" opacity="0.9" />
          <path d="M162 98 Q168 82 176 96 Q180 76 188 98 Z" fill="#F2A93C" opacity="0.9" />
          <ellipse cx="176" cy="60" rx="30" ry="16" fill="#3A3A3A" opacity="0.35" />
          <ellipse cx="185" cy="40" rx="24" ry="14" fill="#3A3A3A" opacity="0.28" />
        </svg>
        <div className="absolute bottom-2 left-3 rounded-md bg-scrim px-2 py-1 font-mono text-[10.5px] leading-[15px] tracking-[0.03em] text-pencapaian">
          RENDER STILASI · 30 OKT 1945
        </div>
      </div>

      <div className="mx-6 mb-5 rounded-xl border border-pencapaian/35 bg-pencapaian/10 px-4 py-3">
        <p className="font-mono text-[10.5px] leading-[15px] tracking-[0.03em] text-pencapaian">
          MISTERI BELUM TERPECAHKAN
        </p>
        <p className="mt-0.5 text-[12px] leading-[17px] font-medium text-teks-sekunder">
          Siapa pelempar granat itu? Kau yang memutuskan.
        </p>
      </div>

      {/* Kartu "Enam Minggu" — dikonfirmasi di dalam halaman POI, bukan interstitial
          terpisah (Dokumen 11, Q1) */}
      <div className="mx-6 mb-5 flex items-center gap-3 rounded-xl bg-permukaan-2/40 px-4 py-3">
        <span aria-hidden="true" className="flex-none text-[18px]">
          📻
        </span>
        <div>
          <p className="text-[15px] leading-5 font-bold text-teks-utama">
            Enam Minggu di Antara Dua Peristiwa
          </p>
          <p className="mt-0.5 text-[12px] leading-[17px] font-medium text-teks-sekunder">
            19 Sept → 30 Okt 1945. Kedatangan Sekutu, ketegangan menumpuk hingga meledak di
            jembatan ini.
          </p>
        </div>
      </div>

      <div className="px-6 pb-5">
        <Link
          // TODO: arahkan ke investigasi AR 3D begitu dibangun (M2 di
          // docs/desain/07-poi-jembatan-merah.html) — menunggu keputusan arsitektur AR
          href="/rute/jembatan-merah/ar"
          className="flex h-[54px] items-center justify-center gap-2 rounded-[14px] bg-aksi px-3 text-center text-[14px] font-bold text-aksi-teks"
        >
          <span aria-hidden="true">▶</span> MULAI INVESTIGASI AR 3D &amp; TELAAH
        </Link>
      </div>

      <div className="px-6">
        <p className="mb-2.5 font-mono text-[10.5px] leading-[15px] tracking-[0.03em] text-teks-redup">
          TAHAPAN YANG DIHADAPI ({TAHAP_AKTIF} DARI {TAHAPAN.length})
        </p>
        <div className="flex items-center">
          {TAHAPAN.map((_, index) => {
            const nomor = index + 1;
            const aktif = nomor === TAHAP_AKTIF;
            return (
              <div key={nomor} className="flex flex-1 items-center last:flex-none">
                <div
                  className={
                    aktif
                      ? 'flex h-[30px] w-[30px] flex-none items-center justify-center rounded-full bg-aksi text-[12px] font-bold text-aksi-teks'
                      : 'flex h-[30px] w-[30px] flex-none items-center justify-center rounded-full bg-teks-sekunder/20 text-[12px] text-teks-redup'
                  }
                >
                  {nomor}
                </div>
                {nomor < TAHAPAN.length && (
                  <div className={aktif ? 'h-0.5 flex-1 bg-aksi' : 'h-0.5 flex-1 bg-teks-sekunder/20'} />
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-1.5 flex justify-between font-mono text-[10.5px] leading-[15px] tracking-[0.03em]">
          {TAHAPAN.map((label, index) => (
            <span key={label} className={index + 1 === TAHAP_AKTIF ? 'text-aksi' : 'text-teks-redup'}>
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-6 mt-5 rounded-[14px] bg-permukaan-arsip px-4.5 py-4">
        <div className="flex justify-between font-mono text-[10.5px] leading-[15px] tracking-[0.03em]">
          <span className="text-teks-arsip-sekunder">BERKAS PENYELIDIKAN</span>
          <span className="text-teks-arsip-bahaya">NO. 002/SBY/45</span>
        </div>
        <div className="my-2 h-px bg-teks-arsip-sekunder/35" />
        <p className="text-[12px] leading-[19px] text-teks-arsip">
          30 Oktober 1945. Gencatan senjata gagal di Jembatan Merah. Mobil Brigjen A.W.S.
          Mallaby hancur kena ledakan. Siapa pelemparnya — masih misteri hingga kini.
        </p>
      </div>

      <div className="px-6 pt-5 pb-3">
        <p className="mb-2.5 font-mono text-[10.5px] leading-[15px] tracking-[0.03em] text-teks-redup">
          PILIH BUKTI &amp; KESIMPULANMU
        </p>

        <div className="mb-2.5 flex items-center gap-2.5 rounded-xl border border-teks-sekunder/20 bg-permukaan-2/20 px-3.5 py-3">
          <div className="h-[18px] w-[18px] flex-none rounded-full border-2 border-teks-redup" />
          <div>
            <p className="text-[15px] leading-5 font-bold text-teks-sekunder">
              Lemparan Granat oleh Arek Suroboyo
            </p>
            <p className="mt-1 text-[12px] leading-[17px] font-medium text-teks-redup">
              Berdasar kesaksian lisan pejuang. Tak ada dokumen tertulis sezaman.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 rounded-xl border border-teks-sekunder/20 bg-permukaan-2/20 px-3.5 py-3">
          <div className="h-[18px] w-[18px] flex-none rounded-full border-2 border-teks-redup" />
          <div>
            <p className="text-[15px] leading-5 font-bold text-teks-sekunder">
              Tembakan Mortir Nyasar Pasukan Sendiri
            </p>
            <p className="mt-1 text-[12px] leading-[17px] font-medium text-teks-redup">
              Berdasar laporan internal Inggris. Sumbernya pihak berkepentingan.
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-5">
        <button
          type="button"
          disabled
          // TODO: aktifkan (bg-aksi) begitu satu bukti dipilih — butuh state klien,
          // belum ditambahkan di halaman statis ini
          className="flex h-[54px] w-full items-center justify-center gap-2 rounded-[14px] bg-teks-sekunder/15 px-3 text-center text-[14px] font-bold text-teks-redup"
        >
          🔒 KUNCI KESIMPULAN ARSIP &amp; DAPATKAN LENCANA
        </button>
      </div>

      <div className="mx-6 mb-5 flex items-center gap-3 rounded-xl border border-pencapaian/30 bg-pencapaian/10 px-4 py-3">
        <div className="text-[22px]">🎖️</div>
        <div className="flex-1">
          <p className="text-[15px] leading-5 font-bold text-pencapaian">Lencana: Detektif Sejarah</p>
          <p className="text-[12px] leading-[17px] font-medium text-teks-sekunder">
            Kunci satu kesimpulan untuk meraihnya (2/3)
          </p>
        </div>
      </div>

      <div className="mx-6 mb-8 flex items-start gap-2.5 rounded-xl border border-bahaya/50 bg-bahaya/14 px-4 py-3.5">
        <span aria-hidden="true" className="flex-none text-[18px]">
          ⚠️
        </span>
        <div>
          <p className="text-[15px] leading-5 font-bold text-bahaya">Perhatian Keselamatan</p>
          <p className="mt-0.5 text-[12px] leading-[17px] font-medium text-teks-utama">
            Jembatan ini masih dilewati kendaraan. Tetap di jalur pejalan kaki, jangan
            bersandar ke pagar pembatas saat memotret.
          </p>
        </div>
      </div>
    </main>
  );
}
