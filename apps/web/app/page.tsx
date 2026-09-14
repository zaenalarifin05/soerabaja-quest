import Link from 'next/link';

type StatusTitik = 'aktif' | 'terkunci';

interface Titik {
  nomor: number;
  nama: string;
  keterangan: string;
  status: StatusTitik;
}

// Sumber: docs/desain/14-arsip-sepia.html, screen "B1 · Beranda — versi ringkas"
// (bukan docs/desain/12-beranda-hub.html — file itu draft pertama tanpa tombol Arsip Sepia)
const TITIK: Titik[] = [
  {
    nomor: 1,
    nama: 'Hotel Majapahit',
    keterangan: '19 Sept 1945 · Insiden Bendera',
    status: 'aktif',
  },
  {
    nomor: 2,
    nama: 'Jembatan Merah',
    keterangan: '30 Okt 1945 · Misteri Mallaby',
    status: 'terkunci',
  },
  {
    nomor: 3,
    nama: 'Tugu Pahlawan',
    keterangan: '10 Nov 1945 · Orasi Bung Tomo',
    status: 'terkunci',
  },
  {
    nomor: 4,
    nama: 'Museum Siola',
    keterangan: 'Ruang Refleksi',
    status: 'terkunci',
  },
  {
    nomor: 5,
    nama: 'Koridor Tunjungan',
    keterangan: 'Voucher Kuliner',
    status: 'terkunci',
  },
];

const SLOT_LENCANA = 3;

export default function Home() {
  return (
    <main className="min-h-screen bg-permukaan-1 font-ui">
      {/* ── Header ── */}
      <header className="flex items-start justify-between px-6 pt-11 pb-5">
        <div>
          <p className="font-mono text-[11px] leading-4 tracking-[0.03em] text-aksi">
            SOERABAJA 1945
          </p>
          <h1 className="mt-0.5 font-display text-[26px] leading-[28px] tracking-[-0.01em] text-teks-utama">
            NAPAK TILAS
            <br />
            KOTA PAHLAWAN
          </h1>
        </div>
        <div className="flex flex-none gap-2.5">
          <button
            type="button"
            aria-label="Notifikasi"
            className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-teks-redup/12 text-[15px] text-teks-sekunder"
          >
            🔔
          </button>
          <button
            type="button"
            aria-label="Pengaturan"
            className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-teks-redup/12 text-[15px] text-teks-sekunder"
          >
            ⚙
          </button>
        </div>
      </header>

      {/* ── Kartu identitas ── */}
      <section className="mx-6 mb-4 flex items-center gap-3.5 rounded-2xl bg-permukaan-2/45 px-4.5 py-4">
        <div className="h-13 w-13 flex-none overflow-hidden rounded-full border-2 border-teks-sekunder">
          {/* Avatar ilustrasi — palet tetap milik aset, bukan token semantik permukaan/aksi */}
          <svg width="100%" height="100%" viewBox="0 0 64 64" aria-hidden="true">
            <circle cx="32" cy="32" r="30" fill="#14456F" />
            <circle cx="32" cy="24" r="10" fill="#F2F5F7" />
            <path d="M14 54c2-12 10-18 18-18s16 6 18 18" fill="#F2F5F7" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-[16px] leading-[21px] font-bold text-teks-utama">Cak Adi</p>
          <p className="mt-0.5 font-mono text-[11px] leading-4 tracking-[0.03em] text-teks-sekunder">
            PANGKAT: REKRUT BARU
          </p>
        </div>
        <div className="text-right">
          <p className="text-[16px] leading-[21px] font-bold text-aksi">0/5</p>
          <p className="font-mono text-[11px] leading-4 tracking-[0.03em] text-teks-redup">TITIK</p>
        </div>
      </section>

      {/* ── Radar Rute ── */}
      <section
        className="mx-6 mb-4 rounded-2xl border border-aksi/35 bg-gradient-to-br from-aksi/14 to-permukaan-2/35 px-5 py-4.5"
        // Gradien mock-up 160deg didekati dengan to-br — cukup dekat untuk sudut kartu ini
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] leading-4 tracking-[0.03em] text-aksi">
            RADAR RUTE · MENUJU TITIK 1
          </span>
          <span className="font-mono text-[11px] leading-4 tracking-[0.03em] text-teks-redup">
            180 M
          </span>
        </div>
        <p className="mt-2 text-[19px] leading-[25px] font-bold text-teks-utama">
          Hotel Majapahit
        </p>
        <p className="mt-1 text-[12.5px] leading-[18px] font-medium text-teks-sekunder">
          Cari standee logam di sisi trotoar Tunjungan.
        </p>
        <Link
          // TODO: arahkan ke rute POI sungguhan begitu routing rute tersedia
          href="/rute/hotel-majapahit"
          className="mt-3.5 flex h-14 items-center justify-center gap-2 rounded-[14px] bg-aksi text-[15px] font-bold text-aksi-teks"
        >
          <span aria-hidden="true">▶</span> LANJUTKAN MISI
        </Link>
      </section>

      {/* ── Tombol Arsip Sepia — ringkas, bukan kartu penuh (B24) ── */}
      <Link
        id="btn-arsip"
        // TODO: arahkan ke overlay Arsip Sepia begitu layar itu dibangun (Dokumen 06 B24)
        href="/arsip"
        className="mx-6 mb-6 flex items-center gap-3 rounded-[14px] border border-teks-arsip-sekunder/30 bg-permukaan-arsip px-4 py-3.5"
      >
        <div className="flex h-9.5 w-9.5 flex-none items-center justify-center rounded-[9px] bg-permukaan-arsip-2 text-[17px]">
          📜
        </div>
        <div className="flex-1">
          <p className="text-[16px] leading-[21px] font-bold text-teks-arsip">Arsip Sepia</p>
          <p className="font-mono text-[11px] leading-4 tracking-[0.03em] text-teks-arsip-sekunder">
            KEPINGAN SEJARAH · PELENGKAP PUZZLE
          </p>
        </div>
        <span className="rounded-full bg-permukaan-arsip-notifikasi px-2.25 py-0.75 font-mono text-[11px] leading-4 tracking-[0.03em] text-teks-arsip-notifikasi">
          0 BARU
        </span>
        <span aria-hidden="true" className="text-teks-arsip-sekunder">
          ›
        </span>
      </Link>

      {/* ── 5 titik ekspedisi ── */}
      <section className="px-6">
        <p className="mb-3 font-mono text-[11px] leading-4 tracking-[0.03em] text-teks-redup">
          5 TITIK EKSPEDISI HEROIK
        </p>
        <ol className="space-y-2.5">
          {TITIK.map((titik) => {
            const aktif = titik.status === 'aktif';
            return (
              <li
                key={titik.nomor}
                className={
                  aktif
                    ? 'flex items-center gap-3 rounded-[14px] border-[1.5px] border-aksi bg-aksi/10 px-4 py-3.5'
                    : 'flex items-center gap-3 rounded-[14px] bg-permukaan-2/35 px-4 py-3.5 opacity-75'
                }
              >
                <div
                  className={
                    aktif
                      ? 'flex h-10 w-10 flex-none items-center justify-center rounded-[10px] bg-aksi font-bold text-aksi-teks'
                      : 'flex h-10 w-10 flex-none items-center justify-center rounded-[10px] bg-teks-redup/15 text-teks-redup'
                  }
                >
                  {/* B25 belum dikerjakan: ikon gembok masih emoji placeholder, bukan SVG
                      custom. text-teks-redup di atas TIDAK mengubah warnanya — emoji 🔒
                      dirender lewat font emoji berwarna bawaan OS (mis. Segoe UI Emoji di
                      Windows) yang mengabaikan `color` CSS di sebagian besar browser/OS.
                      Sengaja dibiarkan oranye/kuning bawaan sampai B25 mengganti dengan
                      SVG siluet ikon POI yang diredupkan (Dokumen 03 §5, LockedCard) —
                      jangan dipaksa lewat filter/hack CSS. */}
                  {aktif ? titik.nomor : '🔒'}
                </div>
                <div className="flex-1">
                  <p
                    className={
                      aktif
                        ? 'text-[16px] leading-[21px] font-bold text-teks-utama'
                        : 'text-[16px] leading-[21px] font-bold text-teks-sekunder'
                    }
                  >
                    {titik.nama}
                  </p>
                  <p className="text-[12.5px] leading-[18px] font-medium text-teks-redup">
                    {titik.keterangan}
                  </p>
                </div>
                <span
                  className={
                    aktif
                      ? 'font-mono text-[11px] leading-4 tracking-[0.03em] text-aksi'
                      : 'font-mono text-[11px] leading-4 tracking-[0.03em] text-teks-redup'
                  }
                >
                  {aktif ? 'AKTIF' : 'TERKUNCI'}
                </span>
              </li>
            );
          })}
        </ol>
      </section>

      {/* ── Koleksi Lencana — pratinjau 3 slot ── */}
      <section className="px-6 pt-1 pb-8">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-[11px] leading-4 tracking-[0.03em] text-teks-redup">
            KOLEKSI LENCANA SEJARAH
          </span>
          <Link href="/lencana" className="text-[12.5px] font-medium text-aksi">
            Lihat semua →
          </Link>
        </div>
        <div className="flex gap-2.5">
          {Array.from({ length: SLOT_LENCANA }).map((_, index) => (
            <div
              key={index}
              className="flex aspect-square flex-1 items-center justify-center rounded-xl border border-dashed border-teks-redup/25 bg-teks-redup/10 font-mono text-[11px] leading-4 tracking-[0.03em] text-teks-redup"
            >
              ?
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
