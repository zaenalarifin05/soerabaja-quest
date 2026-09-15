// Jalur cadangan -- DISIAPKAN, TIDAK DIPAKAI di v1. Keputusan vendor WebAR jatuh ke
// MindAR (lihat MindARAdapter.ts) karena tidak butuh lisensi berbayar. Berkas ini
// sengaja dibiarkan tidak terimplementasi sebagai placeholder kalau MindAR ternyata
// tidak cukup (tracking terlalu goyah di cahaya rendah, dst. -- lihat perbandingan
// vendor di Dokumen 04 §A.2) dan tim perlu pindah ke 8th Wall.

import type { AREngine, ARSceneConfig, AREvent } from '../AREngine';

export class EightWallAdapter implements AREngine {
  async checkSupport(): Promise<boolean> {
    throw new Error('EightWallAdapter belum diimplementasikan -- lihat catatan di atas berkas ini');
  }

  async loadScene(_config: ARSceneConfig): Promise<void> {
    throw new Error('EightWallAdapter belum diimplementasikan -- lihat catatan di atas berkas ini');
  }

  async start(): Promise<void> {
    throw new Error('EightWallAdapter belum diimplementasikan -- lihat catatan di atas berkas ini');
  }

  async stop(): Promise<void> {
    throw new Error('EightWallAdapter belum diimplementasikan -- lihat catatan di atas berkas ini');
  }

  onEvent(_listener: (event: AREvent) => void): () => void {
    throw new Error('EightWallAdapter belum diimplementasikan -- lihat catatan di atas berkas ini');
  }
}
