// Implementasi AREngine memakai MindAR (open-source, image tracking berbasis WebGL/
// Three.js) -- dipilih sebagai jalur WebAR utama (bukan 8th Wall) karena tidak butuh
// lisensi berbayar. Lihat EightWallAdapter.ts untuk jalur cadangan yang disiapkan tapi
// tidak dipakai.
//
// SKELETON -- paket `mind-ar` belum diinstal sebagai dependency dan belum diuji di
// perangkat sungguhan. Setiap metode di bawah masih TODO; struktur method mengikuti API
// publik MindAR (`MindARThree` dari `mind-ar/dist/mindar-image-three.prod.js`) sejauh
// yang bisa dipastikan dari dokumentasinya, tapi belum divalidasi lewat instalasi nyata
// -- jangan anggap tanda tangan method ini final sebelum diverifikasi langsung.

import type { AREngine, ARSceneConfig, AREvent } from '../AREngine';

export class MindARAdapter implements AREngine {
  private listeners: Array<(event: AREvent) => void> = [];

  async checkSupport(): Promise<boolean> {
    // TODO: cek navigator.mediaDevices?.getUserMedia dan dukungan WebGL2 -- lihat alur
    // di Dokumen 04 §A.4, gagal di sini SEBELUM prompt kamera browser muncul
    throw new Error('MindARAdapter.checkSupport belum diimplementasikan');
  }

  async loadScene(_config: ARSceneConfig): Promise<void> {
    // TODO: inisialisasi MindARThree({ container, imageTargetSrc: config.targetAsset }),
    // muat aset sesuai tier (Dokumen 01 Scene.tier_variants) -- HANYA setelah izin
    // kamera diberikan (Dokumen 04 §A.5: "Pemuatan SDK AR setelah izin diberikan,
    // bukan sebelum" -- ini optimasi Time to Interactive terpenting di WebAR)
    throw new Error('MindARAdapter.loadScene belum diimplementasikan');
  }

  async start(): Promise<void> {
    // TODO: panggil start() pada instance MindARThree -- aktifkan kamera + tracking
    throw new Error('MindARAdapter.start belum diimplementasikan');
  }

  async stop(): Promise<void> {
    // TODO: panggil stop() pada instance MindARThree DAN hentikan seluruh
    // MediaStreamTrack kamera secara eksplisit -- dispose penuh, bukan sekadar
    // menyembunyikan elemen (Dokumen 04 §B.3b: soal baterai & panas, bukan kerapian kode)
    throw new Error('MindARAdapter.stop belum diimplementasikan');
  }

  onEvent(listener: (event: AREvent) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
}
