import { formatSayi } from '../utils/formatUtils.js';

export default function BordroHesaplamaComp({ sonuclar, formData, onChange }) {
  if (!sonuclar || sonuclar.length === 0) return <p>Hesaplama yapılamadı.</p>;
  const toplam = sonuclar.reduce((acc, s) => ({
    brut: acc.brut + s.brut, ek: acc.ek + s.ek, sgkKesintisi: acc.sgkKesintisi + s.sgkKesintisi,
    issizlik: acc.issizlik + s.issizlik, bes: acc.bes + s.bes, vergiMatrahi: acc.vergiMatrahi + s.vergiMatrahi,
    gelirVergisi: acc.gelirVergisi + s.gelirVergisi, damgaVergisi: acc.damgaVergisi + s.damgaVergisi, net: acc.net + s.net,
  }), { brut: 0, ek: 0, sgkKesintisi: 0, issizlik: 0, bes: 0, vergiMatrahi: 0, gelirVergisi: 0, damgaVergisi: 0, net: 0 });

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Aylık Bordro Hesaplama</h2>
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Bordro Parametreleri</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Aylık Brüt Ücret (TL)</label>
            <input type="number" step="0.01" value={formData.bordroBrut}
              onChange={(e) => onChange('bordroBrut', parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ek Ödeme Oranı</label>
            <input type="number" step="0.01" value={formData.bordroEkOrani}
              onChange={(e) => onChange('bordroEkOrani', parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Diğer Kesintiler (TL)</label>
            <input type="number" step="0.01" value={formData.bordroDigerKesinti}
              onChange={(e) => onChange('bordroDigerKesinti', parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-sm" />
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead><tr className="bg-blue-700 text-white">
            <th className="px-3 py-2 text-left">Ay</th><th className="px-3 py-2 text-right">Brüt</th>
            <th className="px-3 py-2 text-right">Ek Ödeme</th><th className="px-3 py-2 text-right">SGK Matrahı</th>
            <th className="px-3 py-2 text-right">SGK Kes.</th><th className="px-3 py-2 text-right">İşsizlik</th>
            <th className="px-3 py-2 text-right">BES</th><th className="px-3 py-2 text-right">Vergi Matrahı</th>
            <th className="px-3 py-2 text-right">KVM</th><th className="px-3 py-2 text-right">Gelir V.</th>
            <th className="px-3 py-2 text-right">Damga V.</th><th className="px-3 py-2 text-right font-bold">Net</th>
          </tr></thead>
          <tbody>{sonuclar.map((s) => (
            <tr key={s.ay} className="border-b hover:bg-blue-50">
              <td className="px-3 py-2 font-medium">{s.ayAdi}</td>
              <td className="px-3 py-2 text-right">{formatSayi(s.brut)}</td>
              <td className="px-3 py-2 text-right">{formatSayi(s.ek)}</td>
              <td className="px-3 py-2 text-right">{formatSayi(s.sgkMatrahi)}</td>
              <td className="px-3 py-2 text-right">{formatSayi(s.sgkKesintisi)}</td>
              <td className="px-3 py-2 text-right">{formatSayi(s.issizlik)}</td>
              <td className="px-3 py-2 text-right">{formatSayi(s.bes)}</td>
              <td className="px-3 py-2 text-right">{formatSayi(s.vergiMatrahi)}</td>
              <td className="px-3 py-2 text-right">{formatSayi(s.kumulatifVM)}</td>
              <td className="px-3 py-2 text-right">{formatSayi(s.gelirVergisi)}</td>
              <td className="px-3 py-2 text-right">{formatSayi(s.damgaVergisi)}</td>
              <td className="px-3 py-2 text-right font-bold">{formatSayi(s.net)}</td>
            </tr>
          ))}</tbody>
          <tfoot><tr className="bg-blue-50 font-bold border-t-2">
            <td className="px-3 py-2">TOPLAM</td>
            <td className="px-3 py-2 text-right">{formatSayi(toplam.brut)}</td>
            <td className="px-3 py-2 text-right">{formatSayi(toplam.ek)}</td>
            <td className="px-3 py-2 text-right">-</td>
            <td className="px-3 py-2 text-right">{formatSayi(toplam.sgkKesintisi)}</td>
            <td className="px-3 py-2 text-right">{formatSayi(toplam.issizlik)}</td>
            <td className="px-3 py-2 text-right">{formatSayi(toplam.bes)}</td>
            <td className="px-3 py-2 text-right">{formatSayi(toplam.vergiMatrahi)}</td>
            <td className="px-3 py-2 text-right">-</td>
            <td className="px-3 py-2 text-right">{formatSayi(toplam.gelirVergisi)}</td>
            <td className="px-3 py-2 text-right">{formatSayi(toplam.damgaVergisi)}</td>
            <td className="px-3 py-2 text-right">{formatSayi(toplam.net)}</td>
          </tr></tfoot>
        </table>
      </div>
    </div>
  );
}
