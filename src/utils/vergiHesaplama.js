import { VERGI_DILIMLERI } from '../constants/parameters2026.js';

export function vergiDilimi(matrah) {
  if (matrah <= 0) return 0;
  let vergi = 0;
  let kalan = matrah;
  let oncekiSinir = 0;
  for (const dilim of VERGI_DILIMLERI) {
    if (kalan <= 0) break;
    const dilimGenislik = dilim.sinir - oncekiSinir;
    const vergiyeTabi = Math.min(kalan, dilimGenislik);
    vergi += vergiyeTabi * dilim.oran;
    kalan -= vergiyeTabi;
    oncekiSinir = dilim.sinir;
  }
  return vergi;
}

export function hesaplaAylikGV(buAyKVM, oncekiAyKVM, gvi) {
  const buAyVergi = vergiDilimi(buAyKVM);
  const oncekiVergi = vergiDilimi(oncekiAyKVM);
  return Math.max(0, buAyVergi - oncekiVergi - gvi);
}

export function hesaplaTazminatGV(birikimliMatrah, ekTahakkuk, gvIstisnasi = 0) {
  const toplamMatrah = birikimliMatrah + ekTahakkuk;
  const gvToplam = vergiDilimi(toplamMatrah);
  const gvBirikimli = vergiDilimi(birikimliMatrah);
  return Math.max(0, gvToplam - gvBirikimli - gvIstisnasi);
}
