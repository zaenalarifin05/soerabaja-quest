import StyleDictionary from 'style-dictionary';
import { fileHeader } from 'style-dictionary/utils';

const TEMA = ['gelap', 'terang', 'silau'];
const BERSAMA = ['tokens/primitif.json', 'tokens/tipografi.json', 'tokens/ukuran.json', 'tokens/gerak.json'];

/* Format Dart untuk Flutter: satu kelas per tema */
StyleDictionary.registerFormat({
  name: 'flutter/kelas-tema',
  format: async ({ dictionary, file, options }) => {
    const header = await fileHeader({ file, commentStyle: 'short' });
    const nama = options.namaKelas;
    const baris = dictionary.allTokens
      .filter(t => t.$type === 'color')
      .map(t => {
        const hex = String(t.$value).replace('#', '').toUpperCase();
        const argb = hex.length === 8 ? hex.slice(6) + hex.slice(0, 6) : 'FF' + hex;
        const key = t.path.join('_').replace(/-/g, '_');
        return `  static const Color ${key} = Color(0x${argb});`;
      });
    return `${header}import 'package:flutter/material.dart';\n\nclass ${nama} {\n  ${nama}._();\n\n${baris.join('\n')}\n}\n`;
  }
});

function konfigTema(tema) {
  return {
    source: [...BERSAMA, `tokens/semantik.${tema}.json`],
    log: { verbosity: 'default' },
    platforms: {
      css: {
        transformGroup: 'css',
        expand: true,
        buildPath: 'build/css/',
        options: { usesDtcg: true },
        files: [{
          destination: `tema-${tema}.css`,
          format: 'css/variables',
          filter: t => t.path[0] === 'semantik',
          options: { selector: tema === 'gelap' ? ':root, [data-tema="gelap"]' : `[data-tema="${tema}"]`, outputReferences: false }
        }]
      },
      js: {
        transformGroup: 'js',
        expand: true,
        buildPath: 'build/js/',
        options: { usesDtcg: true },
        files: [{ destination: `tema-${tema}.js`, format: 'javascript/esm' }]
      },
      flutter: {
        transformGroup: 'js',
        buildPath: 'build/dart/',
        options: { usesDtcg: true },
        files: [{
          destination: `tema_${tema}.dart`,
          format: 'flutter/kelas-tema',
          filter: t => t.path[0] === 'semantik',
          options: { namaKelas: 'Tema' + tema.charAt(0).toUpperCase() + tema.slice(1) }
        }]
      }
    }
  };
}

for (const tema of TEMA) {
  const sd = new StyleDictionary(konfigTema(tema));
  await sd.buildAllPlatforms();
  console.log(`✓ tema ${tema}`);
}

/* Primitif hanya diekspor sekali, untuk referensi. Bukan untuk dipakai komponen. */
const primitif = new StyleDictionary({
  source: BERSAMA,
  platforms: {
    css: {
      transformGroup: 'css', expand: true, buildPath: 'build/css/', options: { usesDtcg: true },
      files: [{ destination: 'primitif.css', format: 'css/variables', filter: t => t.path[0] !== 'semantik' }]
    }
  }
});
await primitif.buildAllPlatforms();
console.log('✓ primitif + tipografi + ukuran + gerak');
