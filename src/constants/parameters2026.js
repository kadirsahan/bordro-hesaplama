// 2026 Yılı Sabit Parametreleri

export const VERGI_DILIMLERI = [
  { sinir: 190000, oran: 0.15 },
  { sinir: 400000, oran: 0.20 },
  { sinir: 1500000, oran: 0.27 },
  { sinir: 5300000, oran: 0.35 },
  { sinir: Infinity, oran: 0.40 },
];

export const ASGARI_UCRET = {
  ocakHaziran: { brut: 33030, net: 28075.50 },
  temmuzAralik: { brut: 33030, net: 28075.50 },
};

export const SGK = {
  gunlukKazancUstSiniri: 9909,
  aylikKazancUstSiniri: 297270,
  isciSGKPrimi: 0.14,
  isciIssizlikSigortasi: 0.01,
  besKesintisi: 0.03,
  damgaVergisiOrani: 0.00759,
};

export const IHBAR_SURELERI = [
  { minGun: 0, maxGun: 59, ihbarGun: 0 },
  { minGun: 60, maxGun: 180, ihbarGun: 14 },
  { minGun: 181, maxGun: 540, ihbarGun: 28 },
  { minGun: 541, maxGun: 1088, ihbarGun: 42 },
  { minGun: 1089, maxGun: Infinity, ihbarGun: 56 },
];

export const IZIN_SURELERI = {
  normal: [
    { minYil: 1, maxYil: 5, gunPerYil: 14 },
    { minYil: 6, maxYil: 14, gunPerYil: 20 },
    { minYil: 15, maxYil: Infinity, gunPerYil: 26 },
  ],
  yasEkGun: 6,
};

export function hesaplaGVI(ay) {
  const brut = ay <= 6 ? ASGARI_UCRET.ocakHaziran.brut : ASGARI_UCRET.temmuzAralik.brut;
  if (ay <= 6) {
    return brut * 0.85 * 0.15;
  } else if (ay === 7) {
    const asgari1 = ASGARI_UCRET.ocakHaziran.brut;
    const asgari2 = ASGARI_UCRET.temmuzAralik.brut;
    const kumulatif6 = asgari1 * 6 * 0.85;
    const kumulatif7 = (asgari1 * 6 + asgari2 * 1) * 0.85;
    const gvi = (190000 - kumulatif6) * 0.15 + (kumulatif7 - 190000) * 0.20;
    return gvi;
  } else {
    return brut * 0.85 * 0.20;
  }
}

export function hesaplaDVI() {
  return ASGARI_UCRET.ocakHaziran.brut * SGK.damgaVergisiOrani;
}

export const AY_ISIMLERI = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
];
