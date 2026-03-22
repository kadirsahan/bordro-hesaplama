import { SGK } from '../constants/parameters2026.js';

export function hesaplaSGKMatrahi(brutToplamUcret) {
  return Math.min(brutToplamUcret, SGK.aylikKazancUstSiniri);
}

export function hesaplaSGKKesintileri(sgkMatrahi) {
  const sgkKesintisi = sgkMatrahi * SGK.isciSGKPrimi;
  const issizlik = sgkMatrahi * SGK.isciIssizlikSigortasi;
  const bes = Math.trunc(sgkMatrahi * SGK.besKesintisi);
  return { sgkKesintisi, issizlik, bes, toplam: sgkKesintisi + issizlik + bes };
}

export function hesaplaDamgaVergisi(brutToplamUcret, dvIstisnasi = 0) {
  return Math.max(0, brutToplamUcret * SGK.damgaVergisiOrani - dvIstisnasi);
}
