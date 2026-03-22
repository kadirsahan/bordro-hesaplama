import { SGK } from '../constants/parameters2026.js';
import { gunFarki } from './tarihUtils.js';
import { yuvarla2 } from './formatUtils.js';

export function hesaplaKidem(params) {
  const { girisTarihi, cikisTarihi, giydirilmisUcret, kidemTavani, sayilmayanGun = 0, odenenAvans = 0 } = params;
  const esasUcret = giydirilmisUcret > kidemTavani ? kidemTavani : giydirilmisUcret;
  const gunlukUcret = esasUcret / 365;
  const toplamGun = gunFarki(girisTarihi, cikisTarihi);
  const kidemGun = toplamGun - sayilmayanGun;
  const brutKidem = kidemGun >= 365 ? yuvarla2(gunlukUcret * kidemGun) : 0;
  const damgaVergisi = yuvarla2(brutKidem * SGK.damgaVergisiOrani);
  const netKidem = yuvarla2(brutKidem - damgaVergisi);
  const bakiye = yuvarla2(netKidem - odenenAvans);
  return { esasUcret: yuvarla2(esasUcret), gunlukUcret: yuvarla2(gunlukUcret * 100) / 100, toplamGun, kidemGun, brutKidem, damgaVergisi, netKidem, odenenAvans, bakiye, tavanUygulandi: giydirilmisUcret > kidemTavani };
}
