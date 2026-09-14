import Link from 'next/link';
import { KartuArsipDokumen } from '@/components/KartuArsipDokumen';
import { KartuLencanaPreview } from '@/components/KartuLencanaPreview';
import { PoiHeader } from '@/components/PoiHeader';
import { SafetyNotice } from '@/components/SafetyNotice';
import { TahapanStepper } from '@/components/TahapanStepper';

// Sumber: docs/desain/08-poi-tugu-pahlawan.html, screen "T1 · Halaman POI — sebelum gerbang earphone"
// T2 (gerbang earphone) dan T3 (AR hologram orasi, kamera terkunci) sengaja belum
// dibangun — alasan sama dengan POI sebelumnya: berjalan dalam sesi kamera/audio live,
// menunggu keputusan arsitektur AR/WebAR.

const TAHAPAN = ['STANDEE', 'EARPHONE', 'ORASI', 'BADGE'];
const TAHAP_AKTIF = 1;

export default function PoiTuguPahlawan() {
  return (
    <main className="min-h-screen bg-permukaan-1 font-ui">
      <PoiHeader
        titik={3}
        judul="TUGU PAHLAWAN"
        alamat="Jl. Pahlawan, Alun-Alun Contong"
        badge={{ label: "10 NOV '45", jarak: '50 M' }}
      />

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

      <TahapanStepper tahapan={TAHAPAN} aktif={TAHAP_AKTIF} />

      <KartuArsipDokumen
        className="mt-5"
        label="TRANSKRIP SIARAN RADIO"
        nomor="10 NOV '45"
        isi="Ultimatum Mayjen Mansergh ditolak rakyat. Bung Tomo naik mimbar radio bawah tanah, membakar semangat seluruh kota lewat gelombang RRI."
        kutipan="Selama banteng-banteng Indonesia masih punya darah merah..."
      />

      <KartuLencanaPreview
        className="mt-5"
        judul="Lencana: Pahlawan Suroboyo"
        keterangan="Lencana penutup trilogi — selesaikan orasi (3/3)"
        progres={{ terisi: 2, total: 3 }}
      />

      <SafetyNotice
        className="mt-5"
        pesan="Kawasan terbuka dengan lalu lintas memutar. Gunakan zebra cross, jangan menyeberang sambil menatap layar."
      />
    </main>
  );
}
