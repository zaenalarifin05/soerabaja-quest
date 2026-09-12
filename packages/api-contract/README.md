# @soerabaja/api-contract

Kontrak API sebagai sumber kebenaran. Tipe TypeScript dan klien Dart **dihasilkan** dari
`openapi.yaml`, tidak pernah ditulis tangan.

```bash
pnpm lint       # redocly — harus "Woohoo!"
pnpm generate   # openapi-typescript -> generated/types.ts
```

## Aturan

**Kontrak berubah lebih dulu, implementasi menyusul.** Saat kontrak berubah, TypeScript
langsung menunjukkan kode mana yang rusak — bukan ketahuan saat runtime di lapangan.

`generated/` tidak di-commit; dihasilkan ulang lewat `pnpm bootstrap` dan di CI.

## Endpoint paling kritikal

`POST /missions/{id}/verify` — seluruh integritas produk bertumpu padanya. Delapan langkah
validasi ada di deskripsi endpoint. Perlakukan seperti endpoint pembayaran: review kode
wajib dua orang, uji beban, monitoring khusus.
