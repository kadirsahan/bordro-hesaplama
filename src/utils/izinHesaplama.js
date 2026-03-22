import { SGK } from '../constants/parameters2026.js';
import { gunFarki, yasHesapla, kidemYilHesapla } from './tarihUtils.js';
import { vergiDilimi } from './vergiHesaplama.js';
import { yuvarla2 } from './formatUtils.js';

export function hesaplaIzinGun(yas, kidemYil) {
  if (kidemYil < 1) return 0;
  if (yas > 50 || yas < 18) {
    if (kidemYil < 15) return kidemYil * 20;
    else return (kidemYil - 14) * 26 + 250;
  } else {
    if (kidemYil <= 5) return kidemYil * 14;
    if (kidemYil <= 14) return 70 + (kidemYil - 5) * 20;
    return 250 + (kidemYil - 14) * 26;
  }
}

export function hesaplaIzin(params) {
  const { girisTarihi, cikisTarihi, dogumTarihi, aylikBrutUcret, kullanilanIzin = 0, birikimliMatrah, gvIstisnasi, dvIstisnasi, sayilmayanGun = 0 } = params;
  const yas = yasHesapla(dogumTarihi, cikisTarihi);
  const kidemYil = kidemYilHesapla(girisTarihi, cikisTarihi, sayilmayanGun);
  const fiiliGun = gunFarki(girisTarihi, cikisTarihi) - sayilmayanGun;
  const hakedilenIzin = hesaplaIzinGun(yas, kidemYil);
  const bakiyeIzin = Math.max(0, hakedilenIzin - kullanilanIzin);
  const gunlukUcret = aylikBrutUcret / 30;
  const brutIzin = yuvarla2(gunlukUcret * bakiyeIzin);
  const sgkPrimi = yuvarla2(brutIzin * 0.15);
  const gvMatrahi = yuvarla2(brutIzin - sgkPrimi);

  // Gelir vergisi — gizli satır 2-8 hesaplama zinciri (izin için GV matrahı kullanılır)
  const toplamMatrah = birikimliMatrah + gvMatrahi;
  const gvToplam = vergiDilimi(toplamMatrah);
  const gvBirikimli = vergiDilimi(birikimliMatrah);
  const ekTahakkukGV = yuvarla2(gvToplam - gvBirikimli);
  const gelirVergisi = yuvarla2(Math.max(0, ekTahakkukGV - gvIstisnasi));

  const damgaVergisi = yuvarla2(Math.max(0, brutIzin * SGK.damgaVergisiOrani - dvIstisnasi));
  const kesintilerToplam = yuvarla2(sgkPrimi + gelirVergisi + damgaVergisi);
  const netIzin = yuvarla2(brutIzin - kesintilerToplam);

  return { yas, kidemYil, fiiliGun, hakedilenIzin, kullanilanIzin, bakiyeIzin, gunlukUcret: yuvarla2(gunlukUcret), brutIzin, sgkPrimi, gvMatrahi, birikimliMatrah, toplamMatrah: yuvarla2(toplamMatrah), gvBirikimli: yuvarla2(gvBirikimli), gvToplam: yuvarla2(gvToplam), ekTahakkukGV, gelirVergisi, damgaVergisi, kesintilerToplam, netIzin };
}
