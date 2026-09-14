import Link from 'next/link';
import { PoiHeader } from '@/components/PoiHeader';

// Sumber: docs/desain/09-poi-siola.html, screen "S1 · Halaman Siola — rehat, rekap, arsip"
// Beda dari tiga POI sebelumnya: Siola adalah jeda naratif, bukan AR aksi baru — jadi
// halaman ini dibangun utuh, tidak ada layar kamera/audio terkunci yang ditunda.
// Sengaja TIDAK ada stepper 4-tahap dan SafetyNotice, sesuai mock-up: "Tidak ada render
// gedung dramatis" dan "Tidak ada SafetyNotice trafik — di dalam gedung, risiko
// keselamatannya beda karakter".

const ARSIP = [
  {
    emoji: '🖼️',
    judul: 'Arsip Nyata Museum Ini',
    keterangan: 'Pindai benda asli untuk membuka ceritanya',
    aksi: '📷 PINDAI BENDA',
  },
  {
    emoji: '🕰️',
    judul: 'Foto Dulu & Sekarang',
    keterangan: 'Geser untuk bandingkan wajah kota 1945 dan hari ini',
    aksi: '🔍 BUKA GALERI GESER',
  },
  {
    emoji: '📰',
    judul: 'Berita Nyata, Berdampingan',
    keterangan: 'Koran asli 1945 dipajang di sebelah rekonstruksimu',
    aksi: '📖 LIHAT DI RUANG PAMER',
  },
];

export default function PoiMuseumSiola() {
  return (
    <main className="min-h-screen bg-permukaan-1 font-ui">
      <PoiHeader
        titik={4}
        judul="MUSEUM SIOLA"
        alamat="Jl. Tunjungan No. 1"
        badge={{ label: 'BER-AC', jarak: '10 M', varian: 'netral' }}
      />

      <div className="mx-6 mb-4 rounded-2xl bg-permukaan-arsip px-5.5 py-5">
        <p className="font-display text-[24px] leading-[26px] tracking-[-0.01em] text-teks-arsip">
          DUDUK DULU,
          <br />
          REHAT SEJENAK
        </p>
        <p className="mt-2 text-[12px] leading-[19px] text-teks-arsip-sekunder">
          Kamu baru berjalan 4 kilometer melewati tiga tanggal. Sebelum lanjut, mari rangkai
          kepingannya di sini.
        </p>
      </div>

      <div className="mx-6 mb-5 flex gap-2.5">
        <div className="flex-1 rounded-xl bg-permukaan-2/45 px-3.5 py-3.5 text-center">
          <p className="text-[18px] leading-6 font-bold text-teks-utama">3j 5m</p>
          <p className="font-mono text-[10.5px] leading-[15px] tracking-[0.03em] text-teks-redup">
            WAKTU TEMPUH
          </p>
        </div>
        <div className="flex-1 rounded-xl bg-permukaan-2/45 px-3.5 py-3.5 text-center">
          <p className="text-[18px] leading-6 font-bold text-teks-utama">4,1 km</p>
          <p className="font-mono text-[10.5px] leading-[15px] tracking-[0.03em] text-teks-redup">
            JARAK
          </p>
        </div>
        <div className="flex-1 rounded-xl bg-permukaan-2/45 px-3.5 py-3.5 text-center">
          <p className="text-[18px] leading-6 font-bold text-pencapaian">3/3</p>
          <p className="font-mono text-[10.5px] leading-[15px] tracking-[0.03em] text-teks-redup">
            LENCANA
          </p>
        </div>
      </div>

      <div className="px-6 pb-3">
        <p className="mb-2.5 font-mono text-[10.5px] leading-[15px] tracking-[0.03em] text-teks-redup">
          TIGA ARSIP · MASING-MASING FITUR TERPISAH
        </p>
        {ARSIP.map((item) => (
          <div
            key={item.judul}
            className="mb-2.5 rounded-xl border border-aksi/30 bg-aksi/10 px-4 py-3.5"
          >
            <div className="mb-2 flex items-center gap-3">
              <span aria-hidden="true" className="text-[20px]">
                {item.emoji}
              </span>
              <div className="flex-1">
                <p className="text-[15px] leading-5 font-bold text-teks-utama">{item.judul}</p>
                <p className="text-[12px] leading-[17px] font-medium text-teks-sekunder">
                  {item.keterangan}
                </p>
              </div>
            </div>
            <button
              type="button"
              // TODO: masing-masing arsip adalah fitur independen (pindai AR, galeri
              // geser, ruang pamer) — belum satu pun dibangun, menunggu prioritas
              // terpisah per fitur
              className="flex h-12 w-full items-center justify-center rounded-lg bg-aksi/16 text-[12px] font-bold text-aksi"
            >
              {item.aksi}
            </button>
          </div>
        ))}
      </div>

      <div className="mx-6 mt-2 mb-5 rounded-[14px] bg-permukaan-arsip px-4.5 py-4">
        <p className="font-mono text-[10.5px] leading-[15px] tracking-[0.03em] text-teks-arsip-sekunder">
          TULISKAN KESANMU, AREK
        </p>
        <div className="my-2 h-px bg-teks-arsip-sekunder/35" />
        {/* TODO: ganti jadi <textarea> terkontrol (maks 140 karakter) + tombol kirim di
            bawah aktif begitu ada isi — butuh state klien, belum ditambahkan */}
        <p className="text-[12px] leading-[17px] italic text-teks-arsip-sekunder/70">
          Ketik di sini… (maks 140 karakter)
        </p>
        <div className="mt-3.5 mb-2 h-px bg-teks-arsip-sekunder/20" />
        <p className="text-[12px] leading-[17px] text-teks-arsip-sekunder">
          📸 Sertakan foto AR-mu (opsional)
        </p>
      </div>

      <div className="mx-6 mb-5 flex items-start gap-2 rounded-[10px] border border-pencapaian/30 bg-pencapaian/10 px-3.5 py-2.5">
        <span aria-hidden="true" className="flex-none text-[14px]">
          ℹ️
        </span>
        <p className="text-[12px] leading-[17px] font-medium text-teks-sekunder">
          Ceritamu ditinjau dulu sebelum tayang di dinding digital lobi. Tidak instan — demi
          menjaga kualitas Wall Siola untuk semua pengunjung.
        </p>
      </div>

      <div className="px-6 pb-5">
        <button
          type="button"
          disabled
          // TODO: aktifkan begitu guestbook punya isi — butuh state klien
          className="flex h-[54px] w-full items-center justify-center gap-2 rounded-[14px] bg-teks-sekunder/15 px-3 text-center text-[14px] font-bold text-teks-redup"
        >
          ✍️ KIRIM KE DINDING SIOLA
        </button>
      </div>

      <div className="mx-6 mb-[max(2rem,env(safe-area-inset-bottom))] rounded-2xl border border-aksi/40 bg-gradient-to-br from-aksi/16 to-permukaan-2/40 px-5 py-4.5">
        {/* Gradien mock-up 160deg didekati dengan to-br, sama seperti Radar Rute di Beranda */}
        <p className="font-mono text-[10.5px] leading-[15px] tracking-[0.03em] text-aksi">
          LANGKAH TERAKHIR
        </p>
        <p className="mt-1.5 text-[18px] leading-6 font-bold text-teks-utama">
          Menuju Koridor Tunjungan
        </p>
        <p className="mt-1 text-[12px] leading-[17px] font-medium text-teks-sekunder">
          200 meter lagi. Voucher UMKM menunggu.
        </p>
        <Link
          href="/rute/koridor-tunjungan"
          className="mt-3.5 flex h-[54px] items-center justify-center gap-2 rounded-[14px] bg-aksi text-[14px] font-bold text-aksi-teks"
        >
          <span aria-hidden="true">▶</span> SELESAI KUNJUNGAN &amp; LANJUTKAN
        </Link>
      </div>
    </main>
  );
}
