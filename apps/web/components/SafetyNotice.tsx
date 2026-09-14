// Komponen tetap, Dokumen 03 §5: kotak peringatan keselamatan permanen di posisi
// akhir setiap POI aksi (sebelum tombol navigasi), tidak bisa di-dismiss. Konten
// kontekstual per lokasi, komponennya sama. Wajib di seluruh POI aksi tanpa kecuali
// (Dokumen 11 §1, Dokumen 06 B26).

interface SafetyNoticeProps {
  pesan: string;
  className?: string;
}

export function SafetyNotice({ pesan, className }: SafetyNoticeProps) {
  return (
    <div
      className={['mx-6 mb-8 flex items-start gap-2.5 rounded-xl border border-bahaya/50 bg-bahaya/14 px-4 py-3.5', className]
        .filter(Boolean)
        .join(' ')}
    >
      <span aria-hidden="true" className="flex-none text-[18px]">
        ⚠️
      </span>
      <div>
        <p className="text-[15px] leading-5 font-bold text-bahaya">Perhatian Keselamatan</p>
        <p className="mt-0.5 text-[12px] leading-[17px] font-medium text-teks-utama">{pesan}</p>
      </div>
    </div>
  );
}
