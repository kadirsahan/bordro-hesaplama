export function gunFarki(giris, cikis) {
  const g = new Date(giris);
  const c = new Date(cikis);
  const fark = Math.floor((c - g) / (1000 * 60 * 60 * 24)) + 1;
  return Math.max(0, fark);
}

export function yasHesapla(dogumTarihi, referansTarih) {
  const d = new Date(dogumTarihi);
  const r = new Date(referansTarih);
  let yas = r.getFullYear() - d.getFullYear();
  const ayFark = r.getMonth() - d.getMonth();
  if (ayFark < 0 || (ayFark === 0 && r.getDate() < d.getDate())) yas--;
  return yas;
}

export function gundenYilAyGun(giris, cikis, sayilmayanGun = 0) {
  const g = new Date(giris);
  const c = new Date(cikis);
  const baslangic = new Date(g);
  baslangic.setDate(baslangic.getDate() + sayilmayanGun);
  let yil = c.getFullYear() - baslangic.getFullYear();
  let ay = c.getMonth() - baslangic.getMonth();
  let gun = c.getDate() - baslangic.getDate() + 1;
  if (gun < 0) { ay--; const oncekiAy = new Date(c.getFullYear(), c.getMonth(), 0); gun += oncekiAy.getDate(); }
  if (ay < 0) { yil--; ay += 12; }
  return { yil: Math.max(0, yil), ay: Math.max(0, ay), gun: Math.max(0, gun) };
}

export function kidemYilHesapla(giris, cikis, sayilmayanGun = 0) {
  return gundenYilAyGun(giris, cikis, sayilmayanGun).yil;
}

export function parseTarih(tarihStr) {
  if (!tarihStr) return null;
  if (tarihStr instanceof Date) return tarihStr;
  if (tarihStr.includes('-')) return new Date(tarihStr);
  const [gun, ay, yil] = tarihStr.split('.');
  return new Date(yil, ay - 1, gun);
}

export function formatTarih(date) {
  if (!date) return '';
  const d = new Date(date);
  return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`;
}

export function tarihEkle(date, gun) {
  const d = new Date(date);
  d.setDate(d.getDate() + gun);
  return d;
}
