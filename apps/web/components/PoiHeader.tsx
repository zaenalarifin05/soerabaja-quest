// Header POI: eyebrow "SOERABAJA 1945 · TITIK n" + judul + alamat, dengan chip
// tanggal/status opsional di kanan (dua warna: "arsip" untuk badge tanggal 1945 di
// atas latar merah, "netral" untuk status non-historis seperti "BER-AC" di Siola).
// Tidak dipakai di Beranda — struktur headernya beda (tanpa nomor titik, ikon bukan
// chip, judul dua baris).

interface PoiHeaderProps {
  titik: number;
  judul: string;
  alamat: string;
  badge?: {
    label: string;
    jarak: string;
    varian?: 'arsip' | 'netral';
  };
}

export function PoiHeader({ titik, judul, alamat, badge }: PoiHeaderProps) {
  const identitas = (
    <div>
      <p className="font-mono text-[11px] leading-4 tracking-[0.03em] text-aksi">
        SOERABAJA 1945 · TITIK {titik}
      </p>
      <h1 className="mt-1 font-display text-[24px] leading-[26px] tracking-[-0.01em] text-teks-utama">
        {judul}
      </h1>
      <p className="mt-0.5 text-[12px] leading-[17px] font-medium text-teks-sekunder">{alamat}</p>
    </div>
  );

  if (!badge) {
    return (
      <header className="px-6 pt-[max(2.75rem,env(safe-area-inset-top))] pb-4">{identitas}</header>
    );
  }

  const netral = badge.varian === 'netral';

  return (
    <header className="flex items-start justify-between px-6 pt-[max(2.75rem,env(safe-area-inset-top))] pb-4">
      {identitas}
      <div className="flex-none text-right">
        <div
          className={[
            'mb-1 rounded-lg px-2 py-1 font-mono text-[10.5px] leading-[15px] tracking-[0.03em]',
            netral ? 'bg-permukaan-2 text-teks-utama' : 'bg-permukaan-arsip-notifikasi text-teks-arsip-notifikasi',
          ].join(' ')}
        >
          {badge.label}
        </div>
        <p className="font-mono text-[10.5px] leading-[15px] tracking-[0.03em] text-teks-redup">
          {badge.jarak}
        </p>
      </div>
    </header>
  );
}
