// Konfigurasi scene AR "robek bendera" di Hotel Majapahit -- POI pilot terpilih
// (Dokumen 10 §4: dipilih ketimbang Tugu Pahlawan karena tidak butuh lisensi rekaman
// orasi, jalur lisensinya lebih pendek). BELUM ada rancangan visual/interaksi yang
// disetujui untuk tahap ROBEK -- mock-up docs/desain/06-poi-yamato.html cuma sampai Y3
// (fallback mikrofon), tidak ada layar untuk gestur robek bendera itu sendiri.
// Nilai di bawah adalah placeholder struktural supaya bentuk ARSceneConfig terpakai
// nyata di satu tempat, bukan aset atau nilai final.

import type { ARSceneConfig } from '../AREngine';

export const MAJAPAHIT_FLAG_SCENE: ARSceneConfig = {
  sceneId: 'majapahit-robek-bendera',
  targetAsset: undefined, // TODO: path .mind hasil kompilasi target standee Yamato
  assetBundle: undefined, // TODO: isi setelah aset 3D bendera (Dokumen 03 §7.3, <=4000 tris) siap
};
