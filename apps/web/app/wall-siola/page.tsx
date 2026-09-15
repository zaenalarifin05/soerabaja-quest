// Sumber: docs/desain/11-wall-siola.html, "VERSI TV KIOSK — LOBI SIOLA"
// Dirancang untuk perangkat kiosk fisik 1080×1920 potret (Dokumen 08 §7) — mini-PC/
// media player dalam mode kiosk tanpa kursor, BUKAN tab browser laptop. Nilai px di
// bawah adalah dua kali lipat kotak 540×960 di mock-up, sesuai catatan mock-up sendiri
// ("tipografi 2× skala mobile") — jadi ini skala nyata 1080p, bukan tebakan.
//
// Halaman statis dengan data contoh, sama seperti Beranda. Yang BELUM diimplementasikan
// karena butuh data/state nyata yang tidak ada di codebase ini:
// - Kartu kontribusi yang berotasi tiap 12 detik (Dokumen 08 §6) — butuh feed UGC nyata
// - Jam berjalan dan hitungan live (foto terkirim, dst.) — butuh backend
// - Anti burn-in: geser elemen statis 4px tiap 20 menit (Dokumen 08 §6) — butuh timer klien
// - State "sepi"/"museum tutup"/"jaringan putus" (Dokumen 08 §6) — butuh deteksi runtime
// Ketiga perbaikan B21-B23 dari referensi asli SUDAH tercermin di sini (tanpa ticker FPS,
// tanpa metrik UMKM, mengasumsikan jeda moderasi 5 menit) — sudah diperbaiki di mock-up.

const TITIK_RUTE = [
  { label: 'YAMATO', status: 'selesai' as const },
  { label: 'MALLABY', status: 'selesai' as const },
  { label: 'TUGU', status: 'selesai' as const },
  { label: 'SIOLA', status: 'sekarang' as const },
  { label: 'TUNJUNGAN', status: 'nanti' as const },
];

export default function WallSiola() {
  return (
    <main className="flex h-[1920px] w-[1080px] flex-col bg-permukaan-1 font-ui">
      <div className="flex items-center justify-between border-b border-teks-sekunder/15 px-[72px] pt-[64px] pb-[40px]">
        <div>
          <p className="font-mono text-[24px] tracking-[0.04em] text-aksi">SOERABAJA 1945</p>
          <p className="mt-1 font-display text-[68px] leading-none tracking-[-0.01em] text-teks-utama">
            DUA ZAMAN, SATU LAYAR
          </p>
        </div>
        <div className="flex-none text-right">
          <p className="font-mono text-[24px] tracking-[0.04em] text-teks-redup">PUKUL</p>
          <p className="font-display text-[56px] text-teks-utama">13:58</p>
        </div>
      </div>

      <div className="mx-[72px] mt-[56px] rounded-[32px] border border-aksi/25 bg-permukaan-2/40 p-[64px]">
        <div className="mb-[36px] flex gap-[16px]">
          <span className="rounded-full bg-aksi/16 px-[28px] py-[8px] font-mono text-[24px] tracking-[0.04em] text-aksi">
            TINGKAT A
          </span>
          <span className="rounded-full bg-teks-sekunder/10 px-[28px] py-[8px] font-mono text-[24px] tracking-[0.04em] text-teks-sekunder">
            TITIK 4 · SIOLA
          </span>
        </div>
        <p className="text-[64px] leading-[1.5] font-medium text-teks-utama">
          &ldquo;Merinding pas nyobek birunya. Getaran haptic muncul, kayak beneran robek kain
          arek-arek Suroboyo tahun 1945.&rdquo;
        </p>
        <div className="mt-[48px] flex items-center justify-between">
          <span className="text-[44px] text-aksi">— Rekrut Baru, 13:20</span>
          <span className="font-mono text-[24px] tracking-[0.04em] text-teks-redup">TERVERIFIKASI AR</span>
        </div>
      </div>

      <div className="mx-[72px] mt-[48px] flex justify-between">
        {TITIK_RUTE.map((titik) => (
          <div key={titik.label} className="flex-1 text-center">
            <div
              className={[
                'mx-auto mb-[16px] h-[80px] w-[80px] rounded-full',
                titik.status === 'selesai' && 'bg-aksi',
                titik.status === 'sekarang' && 'bg-pencapaian',
                titik.status === 'nanti' && 'bg-teks-sekunder/15',
              ]
                .filter(Boolean)
                .join(' ')}
            />
            <span
              className={[
                'font-mono text-[24px] tracking-[0.04em]',
                titik.status === 'selesai' && 'text-aksi',
                titik.status === 'sekarang' && 'text-pencapaian',
                titik.status === 'nanti' && 'text-teks-redup',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {titik.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mx-[72px] mt-[48px] flex items-center gap-[48px] rounded-[32px] border-[3px] border-aksi bg-aksi/8 p-[48px]">
        <div className="flex h-[200px] w-[200px] flex-none items-center justify-center rounded-[20px] bg-teks-utama">
          <svg width="160" height="160" viewBox="0 0 21 21" aria-hidden="true">
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
        <div>
          <p className="text-[40px] font-bold text-teks-utama">Abadikan Jejakmu</p>
          <p className="mt-[8px] text-[30px] text-teks-sekunder">
            Pindai · pilih foto AR · tulis kesan. Tayang di sini dalam 5 menit.
          </p>
        </div>
      </div>

      <div className="mx-[72px] mt-[48px] flex gap-[32px]">
        <div className="flex-1 rounded-[24px] bg-permukaan-0/40 p-[36px] text-center">
          <p className="font-display text-[60px] text-teks-utama">2.840</p>
          <p className="font-mono text-[24px] tracking-[0.04em] text-teks-redup">FOTO TERKIRIM</p>
        </div>
        <div className="flex-1 rounded-[24px] bg-permukaan-0/40 p-[36px] text-center">
          <p className="font-display text-[60px] text-teks-utama">412</p>
          <p className="font-mono text-[24px] tracking-[0.04em] text-teks-redup">PESAN TAYANG</p>
        </div>
        <div className="flex-1 rounded-[24px] bg-permukaan-0/40 p-[36px] text-center">
          <p className="font-display text-[60px] text-pencapaian">1.240</p>
          <p className="font-mono text-[24px] tracking-[0.04em] text-teks-redup">PENGUNJUNG HARI INI</p>
        </div>
      </div>

      <div className="mt-auto border-t border-teks-sekunder/10 px-[72px] py-[32px] text-center">
        <span className="font-mono text-[24px] tracking-[0.04em] text-teks-redup">
          MUSEUM SURABAYA · GEDUNG SIOLA
        </span>
      </div>
    </main>
  );
}
