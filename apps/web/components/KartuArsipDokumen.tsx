// Kartu dokumen rezim Arsip: label + nomor berkas, garis pembatas, isi, kutipan
// opsional. Dipakai untuk telegram (Yamato), berkas penyelidikan (Jembatan Merah),
// dan transkrip siaran (Tugu Pahlawan) — bukan untuk guestbook Siola, strukturnya beda
// (tidak ada nomor berkas, ada placeholder input).

interface KartuArsipDokumenProps {
  label: string;
  nomor: string;
  isi: string;
  kutipan?: string;
  className?: string;
}

export function KartuArsipDokumen({ label, nomor, isi, kutipan, className }: KartuArsipDokumenProps) {
  return (
    <div
      className={['mx-6 rounded-[14px] bg-permukaan-arsip px-4.5 py-4', className].filter(Boolean).join(' ')}
    >
      <div className="flex justify-between font-mono text-[10.5px] leading-[15px] tracking-[0.03em]">
        <span className="text-teks-arsip-sekunder">{label}</span>
        <span className="text-teks-arsip-bahaya">{nomor}</span>
      </div>
      <div className="my-2 h-px bg-teks-arsip-sekunder/35" />
      <p className="text-[12px] leading-[19px] text-teks-arsip">{isi}</p>
      {kutipan && (
        <p className="mt-2 text-[12px] leading-[19px] italic text-teks-arsip-bahaya">&ldquo;{kutipan}&rdquo;</p>
      )}
    </div>
  );
}
