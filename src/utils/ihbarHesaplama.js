import { IHBAR_SURELERI, SGK } from '../constants/parameters2026.js';
import { gunFarki } from './tarihUtils.js';
import { vergiDilimi } from './vergiHesaplama.js';
import { yuvarla2 } from './formatUtils.js';

export function ihbarSuresiBelirle(fiiliGun) {
  for (const sure of IHBAR_SURELERI) {
    if (fiiliGun >= sure.minGun && fiiliGun <= sure.maxGun) return sure.ihbarGun;
  }
  return 0;
}

export function hesaplaIhbar(params) {
  const { girisTarihi, cikisTarihi, giydirilmisUcret, birikimliMatrah, sayilmayanGun = 0 } = params;
  const gunlukUcret = giydirilmisUcret / 30;
  const toplamGun = gunFarki(girisTarihi, cikisTarihi);
  const fiiliGun = toplamGun - sayilmayanGun;
  const ihbarGun = ihbarSuresiBelirle(fiiliGun);
  const brutIhbar = yuvarla2(gunlukUcret * ihbarGun);

  // Gelir vergisi — gizli satır 2-8 hesaplama zinciri
  const toplamMatrah = birikimliMatrah + brutIhbar;
  const gvToplam = vergiDilimi(toplamMatrah);
  const gvBirikimli = vergiDilimi(birikimliMatrah);
  const gelirVergisi = yuvarla2(gvToplam - gvBirikimli);

  const damgaVergisi = yuvarla2(brutIhbar * SGK.damgaVergisiOrani);
  const kesintilerToplam = yuvarla2(gelirVergisi + damgaVergisi);
  const netIhbar = yuvarla2(brutIhbar - kesintilerToplam);

  return { gunlukUcret: yuvarla2(gunlukUcret), toplamGun, fiiliGun, ihbarGun, brutIhbar, birikimliMatrah, toplamMatrah: yuvarla2(toplamMatrah), gvBirikimli: yuvarla2(gvBirikimli), gvToplam: yuvarla2(gvToplam), gelirVergisi, damgaVergisi, kesintilerToplam, netIhbar };
}
