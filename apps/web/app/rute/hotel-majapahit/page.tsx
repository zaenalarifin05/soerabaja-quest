import Link from 'next/link';
import { SafetyNotice } from '@/components/SafetyNotice';
import { TahapanStepper } from '@/components/TahapanStepper';

// Sumber: docs/desain/06-poi-yamato.html, screen "Y1 · Halaman POI — sebelum masuk AR"
// Y2 (deteksi suara AR) dan Y3 (fallback izin mikrofon) sengaja belum dibangun di sini —
// keduanya berjalan dalam sesi kamera live (ARFoundation/Unity per Dokumen 04), bukan
// halaman web statis. Ditunda sampai keputusan arsitektur AR/WebAR untuk platform ini final.

const TAHAPAN = ['STANDEE', 'MERDEKA', 'ROBEK', 'BADGE'];
const TAHAP_AKTIF = 1;

export default function PoiHotelMajapahit() {
  return (
    <main className="min-h-screen bg-permukaan-1 font-ui">
      <header className="flex items-start justify-between px-6 pt-[max(2.75rem,env(safe-area-inset-top))] pb-4">
        <div>
          <p className="font-mono text-[11px] leading-4 tracking-[0.03em] text-aksi">
            SOERABAJA 1945 · TITIK 1
          </p>
          <h1 className="mt-1 font-display text-[24px] leading-[26px] tracking-[-0.01em] text-teks-utama">
            HOTEL YAMATO
          </h1>
          <p className="mt-0.5 text-[12px] leading-[17px] font-medium text-teks-sekunder">
            Jl. Tunjungan No. 65
          </p>
        </div>
        <div className="flex-none text-right">
          <div className="mb-1 rounded-lg bg-permukaan-arsip-notifikasi px-2 py-1 font-mono text-[10.5px] leading-[15px] tracking-[0.03em] text-teks-arsip-notifikasi">
            19 SEPT &apos;45
          </div>
          <p className="font-mono text-[10.5px] leading-[15px] tracking-[0.03em] text-teks-redup">35 M</p>
        </div>
      </header>

      {/* Render gedung — ilustrasi stilasi diterjemahkan dari referensi foto arsip
          (menara sudut, tiang bendera, jendela tiga baris Art Deco 1930-an), BUKAN
          reproduksi foto asli. Foto arsip sungguhan wajib masuk lewat CMS dengan
          reviewed_by, tidak pernah ditempel langsung ke kode. Palet di bawah milik
          aset ilustrasi, bukan token semantik permukaan/aksi. */}
      <div
        className="relative mx-6 mb-3 h-[170px] overflow-hidden rounded-2xl"
        style={{ background: 'linear-gradient(180deg, #C9A98E 0%, #B08F72 55%, #8A6E56 100%)' }}
      >
        <svg width="100%" height="100%" viewBox="0 0 342 170" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <rect width="342" height="170" fill="#D4B896" />
          <rect x="60" y="70" width="180" height="90" fill="#EFE3D2" />
          <rect x="60" y="70" width="180" height="10" fill="#C9A98E" />
          <g fill="#5A4A38">
            <rect x="72" y="86" width="18" height="20" />
            <rect x="98" y="86" width="18" height="20" />
            <rect x="124" y="86" width="18" height="20" />
            <rect x="150" y="86" width="18" height="20" />
            <rect x="176" y="86" width="18" height="20" />
            <rect x="202" y="86" width="18" height="20" />
            <rect x="72" y="116" width="18" height="20" />
            <rect x="98" y="116" width="18" height="20" />
            <rect x="124" y="116" width="18" height="20" />
            <rect x="150" y="116" width="18" height="20" />
            <rect x="176" y="116" width="18" height="20" />
            <rect x="202" y="116" width="18" height="20" />
          </g>
          <rect x="210" y="20" width="34" height="140" fill="#E3D3BC" />
          <rect x="210" y="20" width="34" height="8" fill="#C9A98E" />
          <rect x="225" y="4" width="3" height="20" fill="#5A4A38" />
          <path d="M120 160 L120 140 Q150 118 180 140 L180 160 Z" fill="#8A6E56" />
          <g fill="#3A2E20" opacity="0.85">
            <rect x="30" y="150" width="34" height="12" rx="3" />
            <circle cx="38" cy="164" r="4" />
            <circle cx="58" cy="164" r="4" />
            <rect x="250" y="152" width="30" height="11" rx="3" />
            <circle cx="257" cy="164" r="4" />
            <circle cx="275" cy="164" r="4" />
          </g>
          <rect width="342" height="170" fill="#000" opacity="0.04" />
        </svg>
        <div className="absolute bottom-2 left-3 rounded-md bg-teks-arsip/55 px-2 py-1 font-mono text-[10.5px] leading-[15px] tracking-[0.03em] text-permukaan-arsip">
          RENDER STILASI · 1945
        </div>
      </div>

      <div className="mx-6 mb-5 flex items-center justify-between rounded-xl border border-aksi/35 bg-aksi/10 px-4 py-3">
        <div>
          <p className="font-mono text-[10.5px] leading-[15px] tracking-[0.03em] text-aksi">
            JARAK OPTIMAL TERDETEKSI
          </p>
          <p className="mt-0.5 text-[12px] leading-[17px] font-medium text-teks-sekunder">
            Kamu cukup dekat untuk memulai
          </p>
        </div>
        <span className="flex-none rounded-full bg-aksi px-3 py-1 font-mono text-[10.5px] leading-[15px] tracking-[0.03em] text-aksi-teks">
          AKTIF
        </span>
      </div>

      <div className="px-6">
        <Link
          // TODO: arahkan ke AR Scanner & mekanisme robek bendera begitu dibangun
          // (Y2 di docs/desain/06-poi-yamato.html) — menunggu keputusan arsitektur AR
          href="/rute/hotel-majapahit/ar"
          className="flex h-[54px] items-center justify-center gap-2 rounded-[14px] bg-aksi text-[14.5px] font-bold text-aksi-teks"
        >
          <span aria-hidden="true">▶</span> BUKA AR SCANNER &amp; ROBEK BENDERA
        </Link>
        <div className="mt-2.5 flex gap-2.5">
          <button
            type="button"
            // TODO: buka pemindai QR standee begitu mekanisme AR tersedia — bukan
            // navigasi halaman, jadi sengaja bukan <Link>
            className="flex h-12 flex-1 items-center justify-center gap-1.5 rounded-xl border border-teks-sekunder/30 text-[12px] font-medium text-teks-sekunder"
          >
            📷 Scan Standee QR
          </button>
          <button
            type="button"
            // TODO: buka input kode 4 digit begitu mekanisme fallback tersedia
            className="flex h-12 flex-1 items-center justify-center gap-1.5 rounded-xl border border-teks-sekunder/30 text-[12px] font-medium text-teks-sekunder"
          >
            ⌨ Input Kode (4 digit)
          </button>
        </div>
      </div>

      <TahapanStepper tahapan={TAHAPAN} aktif={TAHAP_AKTIF} className="pt-5" />

      <div className="mx-6 mt-5 rounded-[14px] bg-permukaan-arsip px-4.5 py-4">
        <div className="flex justify-between font-mono text-[10.5px] leading-[15px] tracking-[0.03em]">
          <span className="text-teks-arsip-sekunder">TELEGRAM SANDI RAHASIA</span>
          <span className="text-teks-arsip-bahaya">NO. 19/SBY/45</span>
        </div>
        <div className="my-2 h-px bg-teks-arsip-sekunder/35" />
        <p className="text-[12px] leading-[19px] text-teks-arsip">
          Insiden 19 September 1945, 21.00. Bendera Belanda dikibarkan tanpa izin di tiang Hotel
          Yamato. Perundingan buntu. Massa bergerak.
        </p>
        <p className="mt-2 text-[12px] leading-[19px] italic text-teks-arsip-bahaya">
          &ldquo;Merdeka atau mati, tidak ada pilihan ketiga.&rdquo;
        </p>
      </div>

      <div className="mx-6 mt-5 flex items-center gap-3 rounded-xl border border-pencapaian/30 bg-pencapaian/10 px-4 py-3">
        <div className="text-[22px]">🎖️</div>
        <div className="flex-1">
          <p className="text-[15px] leading-5 font-bold text-pencapaian">Lencana: Nyali Wani</p>
          <p className="text-[12px] leading-[17px] font-medium text-teks-sekunder">
            Selesaikan misi ini untuk meraihnya (1/3)
          </p>
        </div>
      </div>

      <SafetyNotice
        className="mt-5"
        pesan="Waspada lalu lintas. Jalan Tunjungan ramai. Berdiri di trotoar, jangan di badan jalan saat memindai atau bermain AR."
      />
    </main>
  );
}
