import { formatPara } from '../utils/formatUtils.js';
import { formatTarih, gundenYilAyGun, gunFarki } from '../utils/tarihUtils.js';
import { yuvarla2 } from '../utils/formatUtils.js';

export default function OzetDashboard({ kidem, ihbar, izin, formData }) {
  const Card = ({ title, net, brut, color }) => (
    <div className={`bg-white rounded-xl shadow-sm border-l-4 ${color} p-5`}>
      <p className="text-sm text-gray-500 mb-1">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{formatPara(net)}</p>
      {brut > 0 && <p className="text-xs text-gray-400 mt-1">Brüt: {formatPara(brut)}</p>}
    </div>
  );

  const kidemNet = kidem?.bakiye || 0;
  const ihbarNet = ihbar?.netIhbar || 0;
  const izinNet = izin?.netIzin || 0;
  const toplamNet = yuvarla2(kidemNet + ihbarNet + izinNet);

  let kidemSuresi = '';
  if (formData.iseGirisTarihi && formData.istenCikisTarihi) {
    const s = gundenYilAyGun(formData.iseGirisTarihi, formData.istenCikisTarihi, Number(formData.sayilmayanGun) || 0);
    kidemSuresi = `${s.yil} yıl, ${s.ay} ay, ${s.gun} gün`;
  }
  const fiiliGun = formData.iseGirisTarihi && formData.istenCikisTarihi
    ? gunFarki(formData.iseGirisTarihi, formData.istenCikisTarihi) - (Number(formData.sayilmayanGun) || 0) : 0;

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Özet Dashboard</h2>
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div><p className="text-gray-500">Çalışan</p><p className="font-bold text-lg">{formData.adiSoyadi}</p></div>
          <div><p className="text-gray-500">Şirket</p><p className="font-bold">{formData.sirketAdi}</p></div>
          <div><p className="text-gray-500">İşe Giriş</p><p className="font-bold">{formatTarih(formData.iseGirisTarihi)}</p></div>
          <div><p className="text-gray-500">İşten Çıkış</p><p className="font-bold">{formatTarih(formData.istenCikisTarihi)}</p></div>
          <div><p className="text-gray-500">Kıdem Süresi</p><p className="font-bold">{kidemSuresi}</p></div>
          <div><p className="text-gray-500">Fiili Çalışma</p><p className="font-bold">{fiiliGun} gün</p></div>
          <div><p className="text-gray-500">Giydirilmiş Ücret</p><p className="font-bold">{formatPara(Number(formData.giydirilmisUcret))}</p></div>
          <div><p className="text-gray-500">Çıkış Nedeni</p><p className="font-bold">{formData.istenAyrilisNedeni}</p></div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card title="Kıdem Tazminatı (Net)" net={kidemNet} brut={kidem?.brutKidem || 0} color="border-green-500" />
        <Card title="İhbar Tazminatı (Net)" net={ihbarNet} brut={ihbar?.brutIhbar || 0} color="border-orange-500" />
        <Card title="Yıllık İzin Ücreti (Net)" net={izinNet} brut={izin?.brutIzin || 0} color="border-purple-500" />
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg p-5 text-white">
          <p className="text-sm text-blue-200 mb-1">Toplam Net Alacak</p>
          <p className="text-3xl font-bold">{formatPara(toplamNet)}</p>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="min-w-full text-sm">
          <thead><tr className="bg-gray-50">
            <th className="px-4 py-3 text-left font-medium text-gray-600">Alacak Türü</th>
            <th className="px-4 py-3 text-right font-medium text-gray-600">Brüt</th>
            <th className="px-4 py-3 text-right font-medium text-gray-600">Kesinti</th>
            <th className="px-4 py-3 text-right font-medium text-gray-600">Net</th>
          </tr></thead>
          <tbody>
            <tr className="border-b hover:bg-green-50">
              <td className="px-4 py-3 font-medium">Kıdem Tazminatı</td>
              <td className="px-4 py-3 text-right">{formatPara(kidem?.brutKidem || 0)}</td>
              <td className="px-4 py-3 text-right">{formatPara(kidem?.damgaVergisi || 0)}</td>
              <td className="px-4 py-3 text-right font-bold">{formatPara(kidemNet)}</td>
            </tr>
            <tr className="border-b hover:bg-orange-50">
              <td className="px-4 py-3 font-medium">İhbar Tazminatı</td>
              <td className="px-4 py-3 text-right">{formatPara(ihbar?.brutIhbar || 0)}</td>
              <td className="px-4 py-3 text-right">{formatPara(ihbar?.kesintilerToplam || 0)}</td>
              <td className="px-4 py-3 text-right font-bold">{formatPara(ihbarNet)}</td>
            </tr>
            <tr className="border-b hover:bg-purple-50">
              <td className="px-4 py-3 font-medium">Yıllık İzin Ücreti</td>
              <td className="px-4 py-3 text-right">{formatPara(izin?.brutIzin || 0)}</td>
              <td className="px-4 py-3 text-right">{formatPara(izin?.kesintilerToplam || 0)}</td>
              <td className="px-4 py-3 text-right font-bold">{formatPara(izinNet)}</td>
            </tr>
          </tbody>
          <tfoot><tr className="bg-blue-50 font-bold">
            <td className="px-4 py-3">TOPLAM</td>
            <td className="px-4 py-3 text-right">{formatPara(yuvarla2((kidem?.brutKidem || 0) + (ihbar?.brutIhbar || 0) + (izin?.brutIzin || 0)))}</td>
            <td className="px-4 py-3 text-right">{formatPara(yuvarla2((kidem?.damgaVergisi || 0) + (ihbar?.kesintilerToplam || 0) + (izin?.kesintilerToplam || 0)))}</td>
            <td className="px-4 py-3 text-right text-lg">{formatPara(toplamNet)}</td>
          </tr></tfoot>
        </table>
      </div>
    </div>
  );
}
