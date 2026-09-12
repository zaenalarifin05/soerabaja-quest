export default function Home() {
  return (
    <main className="relative min-h-screen bg-permukaan-arsip pb-28">
      {/* ── Kop berkas ── */}
      <div className="flex justify-between px-7 pt-16">
        <span className="font-mono text-xs tracking-wider text-teks-arsip/70">
          PERINTAH OPERASI 001
        </span>
        <span className="font-mono text-xs tracking-wider text-teks-arsip/70">
          SOERABAJA · 45
        </span>
      </div>
      <div className="mx-7 mt-3 h-px bg-teks-arsip/30" />

      {/* ── Judul & pembuka ── */}
      <div className="px-7 pt-6">
        <h1 className="font-display text-[32px] leading-[34px] tracking-[-0.01em] text-teks-arsip">
          NAPAK TILAS 45
        </h1>
        <p className="mt-4 font-ui text-[17px] leading-[27px] text-teks-arsip">
          Lima titik. Tiga jam dua puluh menit. 4,1 kilometer berjalan
          melewati tiga tanggal.
        </p>
        <p className="mt-3 font-ui text-[17px] leading-[27px] text-teks-arsip">
          Mulai jam 07.00 atau 16.00. Di luar itu, Surabaya akan
          menghukummu dengan panas.
        </p>
      </div>

      {/* ── Checklist ── */}
      <div className="mx-7 mt-6 rounded-lg bg-black/5 p-4">
        <p className="font-mono text-xs text-teks-arsip/70">
          SEBELUM BERANGKAT
        </p>
        <ul className="mt-2 space-y-1 font-mono text-[15px] leading-6 text-teks-arsip">
          <li>[ ]  Baterai di atas 70%</li>
          <li>[ ]  Earphone dibawa</li>
          <li>[ ]  Botol minum</li>
          <li>[ ]  Sepatu yang nyaman</li>
        </ul>
      </div>

      {/* ── Konten tambahan — sengaja dipanjangkan untuk uji gulir ── */}
      <div className="px-7 pt-8">
        <p className="font-mono text-xs text-teks-arsip/70">
          LATAR BELAKANG SINGKAT
        </p>
        <p className="mt-3 font-ui text-[17px] leading-[27px] text-teks-arsip">
          19 September 1945. Bendera Belanda berkibar di tiang lantai
          atas Hotel Yamato tanpa izin siapa pun. Negosiasi buntu.
          Dua pemuda nekat naik ke atap.
        </p>
        <p className="mt-3 font-ui text-[17px] leading-[27px] text-teks-arsip">
          30 Oktober 1945. Gencatan senjata gagal di Jembatan Merah.
          Sampai hari ini, siapa yang melempar granat pertama masih
          jadi misteri.
        </p>
        <p className="mt-3 font-ui text-[17px] leading-[27px] text-teks-arsip">
          10 November 1945. Ultimatum ditolak. Orasi radio membakar
          semangat kota yang menolak menyerah.
        </p>
      </div>

      {/* ── Sticky CTA — Dok 07: aturan induk Halaman Baca ── */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-teks-arsip/10 bg-permukaan-arsip/95 px-7 py-4 backdrop-blur-sm">
        <button className="h-14 w-full rounded-xl bg-aksi font-ui font-semibold text-aksi-teks">
          Siapkan Misi
        </button>
      </div>
    </main>
  );
}