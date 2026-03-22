import { AY_ISIMLERI, hesaplaGVI, hesaplaDVI } from '../constants/parameters2026.js';
import { hesaplaSGKMatrahi, hesaplaSGKKesintileri, hesaplaDamgaVergisi } from './sgkHesaplama.js';
import { vergiDilimi } from './vergiHesaplama.js';
import { yuvarla2 } from './formatUtils.js';

export function hesaplaBordro(params) {
  const { aylikBrut = 120000, ekOdemeOrani = 1 / 3, digerKesintiler = 0 } = params;
  const sonuclar = [];
  let oncekiKVM = 0;
  for (let ay = 1; ay <= 12; ay++) {
    const brut = aylikBrut;
    const ek = yuvarla2(brut * ekOdemeOrani);
    const brutToplam = brut + ek;
    const sgkMatrahi = hesaplaSGKMatrahi(brutToplam);
    const sgk = hesaplaSGKKesintileri(sgkMatrahi);
    const vergiMatrahi = yuvarla2(brutToplam - sgk.sgkKesintisi - sgk.issizlik);
    const kumulatifVM = yuvarla2(oncekiKVM + vergiMatrahi);
    const gvi = hesaplaGVI(ay);
    const gelirVergisi = yuvarla2(Math.max(0, vergiDilimi(kumulatifVM) - vergiDilimi(oncekiKVM) - gvi));
    const dvi = hesaplaDVI();
    const damgaVergisi = yuvarla2(hesaplaDamgaVergisi(brutToplam, dvi));
    const net = yuvarla2(brutToplam - sgk.sgkKesintisi - sgk.issizlik - sgk.bes - digerKesintiler - gelirVergisi - damgaVergisi);
    sonuclar.push({ ay, ayAdi: AY_ISIMLERI[ay - 1], brut, ek, brutToplam, sgkMatrahi, sgkKesintisi: yuvarla2(sgk.sgkKesintisi), issizlik: yuvarla2(sgk.issizlik), bes: sgk.bes, vergiMatrahi, kumulatifVM, gvi: yuvarla2(gvi), gelirVergisi, damgaVergisi, digerKesintiler, net });
    oncekiKVM = kumulatifVM;
  }
  return sonuclar;
}
