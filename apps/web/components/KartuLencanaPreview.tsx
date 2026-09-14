// Preview lencana yang bisa diraih di POI ini. `progres` opsional menambah strip
// segmen emas (dipakai Tugu Pahlawan untuk progress trilogi 2/3) — tanpanya, kartu
// cuma ikon + judul + keterangan (Hotel Majapahit, Jembatan Merah).

interface KartuLencanaPreviewProps {
  judul: string;
  keterangan: string;
  progres?: { terisi: number; total: number };
  className?: string;
}

export function KartuLencanaPreview({ judul, keterangan, progres, className }: KartuLencanaPreviewProps) {
  return (
    <div
      className={['mx-6 rounded-xl border border-pencapaian/30 bg-pencapaian/10 px-4 py-3', className]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={progres ? 'mb-2.5 flex items-center gap-3' : 'flex items-center gap-3'}>
        <div className="text-[22px]">🎖️</div>
        <div className="flex-1">
          <p className="text-[15px] leading-5 font-bold text-pencapaian">{judul}</p>
          <p className="text-[12px] leading-[17px] font-medium text-teks-sekunder">{keterangan}</p>
        </div>
      </div>
      {progres && (
        <div className="flex gap-2">
          {Array.from({ length: progres.total }, (_, i) => (
            <div
              key={i}
              className={
                i < progres.terisi ? 'h-1 flex-1 rounded-full bg-pencapaian' : 'h-1 flex-1 rounded-full bg-teks-sekunder/20'
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
