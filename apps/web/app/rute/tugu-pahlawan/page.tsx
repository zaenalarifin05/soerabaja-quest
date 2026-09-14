import Link from 'next/link';

// Sumber: docs/desain/08-poi-tugu-pahlawan.html, screen "T1 · Halaman POI — sebelum gerbang earphone"
// T2 (gerbang earphone) dan T3 (AR hologram orasi, kamera terkunci) sengaja belum
// dibangun — alasan sama dengan POI sebelumnya: berjalan dalam sesi kamera/audio live,
// menunggu keputusan arsitektur AR/WebAR.

const TAHAPAN = ['STANDEE', 'EARPHONE', 'ORASI', 'BADGE'];
const TAHAP_AKTIF = 1;

export default function PoiTuguPahlawan() {
  return (
    <main className="min-h-screen bg-permukaan-1 font-ui">
      <header className="flex items-start justify-between px-6 pt-11 pb-4">
        <div>
          <p className="font-mono text-[11px] leading-4 tracking-[0.03em] text-aksi">
            SOERABAJA 1945 · TITIK 3
          </p>
          <h1 className="mt-1 font-display text-[24px] leading-[26px] tracking-[-0.01em] text-teks-utama">
            TUGU PAHLAWAN
          </h1>
          <p className="mt-0.5 text-[12px] leading-[17px] font-medium text-teks-sekunder">
            Jl. Pahlawan, Alun-Alun Contong
          </p>
        </div>
        <div className="flex-none text-right">
          <div className="mb-1 rounded-lg bg-permukaan-arsip-notifikasi px-2 py-1 font-mono text-[10.5px] leading-[15px] tracking-[0.03em] text-teks-arsip-notifikasi">
            10 NOV &apos;45
          </div>
          <p className="font-mono text-[10.5px] leading-[15px] tracking-[0.03em] text-teks-redup">50 M</p>
        </div>
      </header>

      {/* Render menara — ilustrasi stilasi, 10 rusuk beralur meruncing ke atas
          melambangkan 10 November (dikonfirmasi final, Dokumen 11 Q3). Palet di bawah
          milik aset ilustrasi, bukan token semantik. */}
      <div className="relative mx-6 mb-3 h-[190px] overflow-hidden rounded-2xl" style={{ background: '#0A1420' }}>
        <svg width="100%" height="100%" viewBox="0 0 342 190" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <rect width="342" height="190" fill="#0A1420" />
          <g opacity="0.5">
            <circle cx="171" cy="130" r="50" fill="#4FE68C" opacity="0.08" />
            <circle cx="171" cy="130" r="90" fill="#4FE68C" opacity="0.05" />
          </g>
          <g>
            <path d="M148 172 L153 30 Q171 14 189 30 L194 172 Z" fill="#14456F" opacity="0.55" />
            <line x1="149" y1="171" x2="155" y2="38" stroke="#4FE68C" strokeWidth="1" opacity="0.45" />
            <line x1="154" y1="171" x2="159" y2="30" stroke="#4FE68C" strokeWidth="1" opacity="0.5" />
            <line x1="159" y1="171" x2="163" y2="24" stroke="#4FE68C" strokeWidth="1" opacity="0.55" />
            <line x1="164" y1="171" x2="167" y2="19" stroke="#4FE68C" strokeWidth="1" opacity="0.65" />
            <line x1="168" y1="171" x2="169.5" y2="16.5" stroke="#4FE68C" strokeWidth="1.3" opacity="0.8" />
            <line x1="172.5" y1="171" x2="172" y2="16.5" stroke="#4FE68C" strokeWidth="1.3" opacity="0.8" />
            <line x1="177" y1="171" x2="174" y2="19" stroke="#4FE68C" strokeWidth="1" opacity="0.65" />
            <line x1="182" y1="171" x2="178" y2="24" stroke="#4FE68C" strokeWidth="1" opacity="0.55" />
            <line x1="187" y1="171" x2="182" y2="30" stroke="#4FE68C" strokeWidth="1" opacity="0.5" />
            <line x1="192" y1="171" x2="186" y2="38" stroke="#4FE68C" strokeWidth="1" opacity="0.45" />
          </g>
          <rect x="130" y="168" width="82" height="14" rx="2" fill="#14456F" />
          <ellipse cx="171" cy="182" rx="70" ry="8" fill="#4FE68C" opacity="0.12" />
        </svg>
        <div className="absolute bottom-2 left-3 rounded-md bg-scrim px-2 py-1 font-mono text-[10.5px] leading-[15px] tracking-[0.03em] text-aksi">
          RENDER STILASI · BERALUR VERTIKAL
        </div>
      </div>

      <div className="mx-6 mb-5 flex items-center gap-2.5 rounded-xl border border-pencapaian/35 bg-pencapaian/10 px-4 py-3">
        <span aria-hidden="true" className="text-[16px]">
          🎧
        </span>
        <div>
          <p className="font-mono text-[10.5px] leading-[15px] tracking-[0.03em] text-pencapaian">
            EARPHONE DIPERLUKAN
          </p>
          <p className="mt-0.5 text-[12px] leading-[17px] font-medium text-teks-sekunder">
            Orasi memakai audio spasial 3D — tak bisa lewat speaker.
          </p>
        </div>
      </div>

      <div className="px-6 pb-5">
        <Link
          // TODO: arahkan ke gerbang earphone lalu AR hologram orasi begitu dibangun
          // (T2/T3 di docs/desain/08-poi-tugu-pahlawan.html) — menunggu keputusan
          // arsitektur AR/WebAR
          href="/rute/tugu-pahlawan/earphone"
          className="flex h-[54px] items-center justify-center gap-2 rounded-[14px] bg-aksi px-3 text-center text-[14px] font-bold text-aksi-teks"
        >
          <span aria-hidden="true">▶</span> AKTIFKAN HOLOGRAM 3D &amp; ORASI TOMO
        </Link>
        <p className="mt-2 text-center text-[12px] leading-[17px] font-medium text-teks-redup">
          Ditampilkan sebagai overlay AR lewat kameramu — bukan proyeksi cahaya sungguhan.
        </p>
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
          <span className="text-teks-arsip-sekunder">TRANSKRIP SIARAN RADIO</span>
          <span className="text-teks-arsip-bahaya">10 NOV &apos;45</span>
        </div>
        <div className="my-2 h-px bg-teks-arsip-sekunder/35" />
        <p className="text-[12px] leading-[19px] text-teks-arsip">
          Ultimatum Mayjen Mansergh ditolak rakyat. Bung Tomo naik mimbar radio bawah tanah,
          membakar semangat seluruh kota lewat gelombang RRI.
        </p>
        <p className="mt-2 text-[12px] leading-[19px] italic text-teks-arsip-bahaya">
          &ldquo;Selama banteng-banteng Indonesia masih punya darah merah...&rdquo;
        </p>
      </div>

      <div className="mx-6 mt-5 rounded-xl border border-pencapaian/30 bg-pencapaian/10 px-4 py-3">
        <div className="mb-2.5 flex items-center gap-3">
          <div className="text-[22px]">🎖️</div>
          <div className="flex-1">
            <p className="text-[15px] leading-5 font-bold text-pencapaian">Lencana: Pahlawan Suroboyo</p>
            <p className="text-[12px] leading-[17px] font-medium text-teks-sekunder">
              Lencana penutup trilogi — selesaikan orasi (3/3)
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="h-1 flex-1 rounded-full bg-pencapaian" />
          <div className="h-1 flex-1 rounded-full bg-pencapaian" />
          <div className="h-1 flex-1 rounded-full bg-teks-sekunder/20" />
        </div>
      </div>

      <div className="mx-6 mt-5 mb-8 flex items-start gap-2.5 rounded-xl border border-bahaya/50 bg-bahaya/14 px-4 py-3.5">
        <span aria-hidden="true" className="flex-none text-[18px]">
          ⚠️
        </span>
        <div>
          <p className="text-[15px] leading-5 font-bold text-bahaya">Perhatian Keselamatan</p>
          <p className="mt-0.5 text-[12px] leading-[17px] font-medium text-teks-utama">
            Kawasan terbuka dengan lalu lintas memutar. Gunakan zebra cross, jangan
            menyeberang sambil menatap layar.
          </p>
        </div>
      </div>
    </main>
  );
}
