// Stepper 4-tahap yang muncul di setiap POI aksi (STANDEE -> ... -> BADGE), sesuai
// pola yang dikonfirmasi konsisten lintas POI (Dokumen 11 Q2). `aktif` memakai
// penomoran 1-indexed, sesuai label "TAHAPAN YANG DIHADAPI (n DARI total)".

interface TahapanStepperProps {
  tahapan: string[];
  aktif: number;
  className?: string;
}

export function TahapanStepper({ tahapan, aktif, className }: TahapanStepperProps) {
  return (
    <div className={['px-6', className].filter(Boolean).join(' ')}>
      <p className="mb-2.5 font-mono text-[10.5px] leading-[15px] tracking-[0.03em] text-teks-redup">
        TAHAPAN YANG DIHADAPI ({aktif} DARI {tahapan.length})
      </p>
      <div className="flex items-center">
        {tahapan.map((_, index) => {
          const nomor = index + 1;
          const isAktif = nomor === aktif;
          return (
            <div key={nomor} className="flex flex-1 items-center last:flex-none">
              <div
                className={
                  isAktif
                    ? 'flex h-[30px] w-[30px] flex-none items-center justify-center rounded-full bg-aksi text-[12px] font-bold text-aksi-teks'
                    : 'flex h-[30px] w-[30px] flex-none items-center justify-center rounded-full bg-teks-sekunder/20 text-[12px] text-teks-redup'
                }
              >
                {nomor}
              </div>
              {nomor < tahapan.length && (
                <div className={isAktif ? 'h-0.5 flex-1 bg-aksi' : 'h-0.5 flex-1 bg-teks-sekunder/20'} />
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-1.5 flex justify-between font-mono text-[10.5px] leading-[15px] tracking-[0.03em]">
        {tahapan.map((label, index) => (
          <span key={label} className={index + 1 === aktif ? 'text-aksi' : 'text-teks-redup'}>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
