export function formatPara(sayi, showTL = true) {
  if (sayi === null || sayi === undefined || isNaN(sayi)) return '-';
  const formatted = sayi.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return showTL ? `${formatted} TL` : formatted;
}

export function formatSayi(sayi, ondalik = 2) {
  if (sayi === null || sayi === undefined || isNaN(sayi)) return '-';
  return sayi.toLocaleString('tr-TR', { minimumFractionDigits: ondalik, maximumFractionDigits: ondalik });
}

export function yuvarla2(sayi) {
  return Math.round(sayi * 100) / 100;
}
