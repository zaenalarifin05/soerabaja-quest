import Link from 'next/link';
import { PoiHeader } from '@/components/PoiHeader';
import { SafetyNotice } from '@/components/SafetyNotice';

// Sumber: docs/desain/10-poi-tunjungan.html, screen "U1 · Halaman POI — ringkasan &
// rekomendasi merchant". Titik terakhir dari lima — di sinilah rute berubah jadi
// transaksi UMKM sungguhan (Dokumen 01/04).
//
// U2 (QR aktif + hitung mundur, "momen paling rapuh di seluruh sistem") dan U3 (penutup
// rute + koleksi tokoh) sengaja belum dibangun. Beda dari alasan Y2/Y3/M2/T2/T3 di POI
// lain (bukan soal kamera/mikrofon) — U2 butuh state klien nyata (hitung mundur,
// transisi setelah tombol ditekan sesuai perbaikan B2) dan U3 butuh data game state
// (koleksi tokoh, riwayat lencana) yang belum ada model/backend-nya di manapun di
// codebase ini. Daftar merchant di bawah murni ilustratif — sumber kebenarannya tabel
// Merchant & Voucher di Dokumen 01, belum diambil dari data nyata.

const MERCHANT = [
  { nama: 'Depot Tunjungan', tawaran: 'Rawon gratis · 180 m', gradasi: 'linear-gradient(160deg, #8A6E56, #3A2E20)' },
  { nama: 'Kopi & Toast Tunjungan', tawaran: 'Kopi susu gratis · 220 m', gradasi: 'linear-gradient(160deg, #4A3A2A, #1C140C)' },
  { nama: '7 Kedai Klasik', tawaran: 'Diskon 30% · 340 m', gradasi: 'linear-gradient(160deg, #6E4A2E, #2A1C10)' },
];

export default function PoiKoridorTunjungan() {
  return (
    <main className="min-h-screen bg-permukaan-1 font-ui">
      <PoiHeader titik={5} judul="TUNJUNGAN" alamat="Zona Kuliner & Kreatif" />

      <div className="mx-6 mb-4 rounded-2xl border border-pencapaian/40 bg-gradient-to-br from-pencapaian/18 to-permukaan-2/40 px-5 py-4.5 text-center">
        {/* Gradien mock-up 160deg didekati dengan to-br, sama seperti kartu-kartu lain */}
        <p className="font-mono text-[10.5px] leading-[15px] tracking-[0.03em] text-pencapaian">
          RUTE TUNTAS · VOUCHER TERBIT
        </p>
        <p className="mt-1.5 font-display text-[32px] leading-[34px] tracking-[-0.01em] text-teks-utama">
          3 VOUCHER SIAP
        </p>
        <p className="mt-1 text-[12px] leading-[17px] font-medium text-teks-sekunder">
          Dari 5 misi, 3 lencana, 1 kesimpulan arsip. Berlaku 7 hari.
        </p>
      </div>

      <div className="mx-6 mb-5 rounded-2xl bg-permukaan-2/45 px-5 py-4.5 text-center">
        <p className="font-mono text-[10.5px] leading-[15px] tracking-[0.03em] text-aksi">
          VOUCHER SIAP DITUKAR · BERLAKU 7 HARI
        </p>
        <div className="mt-3.5 flex justify-center">
          {/* QR belum aktif — placeholder blur, sama seperti mock-up. QR sungguhan
              baru dirender di U2 setelah merchant dipilih. */}
          <div className="h-40 w-40 overflow-hidden rounded-[10px] opacity-30 blur-[1px]" aria-hidden="true">
            <svg width="160" height="160" viewBox="0 0 21 21">
              <rect width="21" height="21" fill="#F2F5F7" />
              <g fill="#08141F">
                <path d="M0 0h7v7H0zM14 0h7v7h-7zM0 14h7v7H0z" />
              </g>
              <g fill="#F2F5F7">
                <path d="M1 1h5v5H1zM15 1h5v5h-5zM1 15h5v5H1z" />
              </g>
              <g fill="#08141F">
                <path d="M2 2h3v3H2zM16 2h3v3h-3zM2 16h3v3H2z" />
              </g>
            </svg>
          </div>
        </div>
        <p className="mt-2.5 text-[12px] leading-[17px] font-medium text-teks-redup">
          QR aktif setelah kamu berdiri di depan kasir merchant pilihan.
        </p>
      </div>

      <div className="px-6 pb-3">
        <p className="mb-2.5 font-mono text-[10.5px] leading-[15px] tracking-[0.03em] text-teks-redup">
          MERCHANT REKOMENDASI TUNJUNGAN
        </p>
        {MERCHANT.map((m) => (
          <div key={m.nama} className="mb-2.5 flex gap-3 rounded-xl bg-permukaan-2/35 p-2.5">
            {/* Thumbnail merchant — placeholder gradasi, palet aset ilustratif, belum
                foto sungguhan (menunggu data Merchant nyata, Dokumen 01) */}
            <div
              aria-hidden="true"
              className="h-14 w-14 flex-none rounded-lg"
              style={{ background: m.gradasi }}
            />
            <div className="flex-1">
              <p className="text-[15px] leading-5 font-bold text-teks-utama">{m.nama}</p>
              <p className="text-[12px] leading-[17px] font-medium text-aksi">{m.tawaran}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="px-6 pb-5">
        <Link
          // TODO: arahkan ke layar QR aktif + hitung mundur begitu dibangun (U2 di
          // docs/desain/10-poi-tunjungan.html) — butuh state klien (timer, transisi
          // setelah tombol ditekan sesuai B2) dan pemilihan merchant sungguhan
          href="/rute/koridor-tunjungan/qr"
          className="flex h-[54px] items-center justify-center gap-2 rounded-[14px] bg-aksi text-[14px] font-bold text-aksi-teks"
        >
          <span aria-hidden="true">▶</span> PILIH MERCHANT &amp; TUNJUKKAN QR
        </Link>
      </div>

      {/* SafetyNotice — sempat terlewat di draft pertama Tunjungan, diperbaiki
          sebagai B26 (Dokumen 11 §1, Dokumen 06 B26) */}
      <SafetyNotice pesan="Jalan Tunjungan ramai kendaraan dan pejalan kaki malam hari. Simpan HP setelah menukar voucher, jangan berjalan sambil menatap layar." />
    </main>
  );
}
