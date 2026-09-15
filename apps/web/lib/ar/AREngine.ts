// Antarmuka abstrak untuk mesin AR web, sesuai rencana Dokumen 04 §A.2: lapisan
// abstraksi tipis supaya penggantian vendor (MindAR <-> 8th Wall) tidak menyentuh kode
// aplikasi. SKELETON SAJA -- belum ada implementasi kamera/tracking sungguhan. Diisi
// setelah interaksi "robek bendera" (tahap ROBEK di halaman POI Hotel Majapahit) punya
// rancangan visual yang disetujui -- lihat catatan di scenes/MajapahitFlag.ts.

export type ARSceneId = string;

export interface ARSceneConfig {
  sceneId: ARSceneId;
  /** Path ke image target terkompilasi (mis. berkas .mind untuk MindAR) */
  targetAsset?: string;
  /** Path aset 3D/tekstur scene per tier perangkat (Dokumen 01 Scene.tier_variants) */
  assetBundle?: Record<1 | 2 | 3, string>;
}

export type AREvent =
  | { type: 'ready' }
  | { type: 'target-found' }
  | { type: 'target-lost' }
  | { type: 'error'; message: string };

export interface AREngine {
  /** Cek dukungan browser (WebGL2, getUserMedia, dst.) sebelum minta izin apa pun */
  checkSupport(): Promise<boolean>;

  /** Muat scene -- HANYA dipanggil setelah izin kamera diberikan (Dokumen 04 §A.4/§A.5) */
  loadScene(config: ARSceneConfig): Promise<void>;

  /** Aktifkan kamera + tracking untuk scene yang sudah dimuat */
  start(): Promise<void>;

  /**
   * Matikan kamera sepenuhnya -- dispose(), bukan sekadar menyembunyikan elemen.
   * Wajib dipanggil setiap keluar dari Layar Aksi (Dokumen 04 §B.3b, Dokumen 07 §4).
   */
  stop(): Promise<void>;

  /** Kembalikan fungsi unsubscribe */
  onEvent(listener: (event: AREvent) => void): () => void;
}
