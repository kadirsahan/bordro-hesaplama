import { formatPara } from '../utils/formatUtils.js';
import { formatTarih } from '../utils/tarihUtils.js';
import { usePdfExport } from '../utils/pdfExport.js';

export default function IhbarTazminati({ sonuc, formData }) {
  const { exportRef, exportPdf } = usePdfExport('Ihbar_Tazminati_Bordrosu');
  if (!sonuc) return <p className="text-red-500">Hesaplama yapılamadı.</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">İhbar Tazminatı Bordrosu</h2>
        <button onClick={exportPdf} className="no-print px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">PDF İndir</button>
      </div>
      <div ref={exportRef} className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-start mb-6">
          <img src="/sirket_logo.png" alt="Şirket Logo" width="110" height="71" className="mr-4" />
          <div className="flex-1 text-center">
            <h3 className="text-lg font-bold">İHBAR TAZMİNATI BORDROSU</h3>
            <p className="text-sm text-gray-500">{formData.sirketAdi} - {formData.isyeriAdiUnvani}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div><span className="font-medium text-gray-600">Adı Soyadı:</span> {formData.adiSoyadi}</div>
          <div><span className="font-medium text-gray-600">T.C. No:</span> {formData.tcNo}</div>
          <div><span className="font-medium text-gray-600">İşe Giriş:</span> {formatTarih(formData.iseGirisTarihi)}</div>
          <div><span className="font-medium text-gray-600">İşten Çıkış:</span> {formatTarih(formData.istenCikisTarihi)}</div>
        </div>
        <table className="min-w-full text-sm">
          <tbody>
            <tr className="border-b"><td className="px-4 py-3 font-medium text-gray-700">Giydirilmiş Ücret (Aylık)</td><td className="px-4 py-3 text-right">{formatPara(Number(formData.giydirilmisUcret))}</td></tr>
            <tr className="border-b"><td className="px-4 py-3 font-medium text-gray-700">İhbar Esas Günlük Ücret</td><td className="px-4 py-3 text-right">{formatPara(sonuc.gunlukUcret)}</td></tr>
            <tr className="border-b"><td className="px-4 py-3 font-medium text-gray-700">Fiili Çalışma Günü</td><td className="px-4 py-3 text-right">{sonuc.fiiliGun} gün</td></tr>
            <tr className="border-b bg-yellow-50"><td className="px-4 py-3 font-medium text-gray-700">İhbar Tazminat Günü</td><td className="px-4 py-3 text-right font-bold">{sonuc.ihbarGun} gün</td></tr>
            <tr className="border-b bg-green-50"><td className="px-4 py-3 font-bold text-gray-800">Brüt İhbar Tazminatı</td><td className="px-4 py-3 text-right font-bold text-lg">{formatPara(sonuc.brutIhbar)}</td></tr>
            <tr className="border-b bg-gray-50"><td className="px-4 py-3 text-gray-500 pl-8">Birikimli Matrah (H3)</td><td className="px-4 py-3 text-right text-gray-500">{formatPara(sonuc.birikimliMatrah)}</td></tr>
            <tr className="border-b bg-gray-50"><td className="px-4 py-3 text-gray-500 pl-8">Ek Tahakkuk (H4 = Brüt İhbar)</td><td className="px-4 py-3 text-right text-gray-500">{formatPara(sonuc.brutIhbar)}</td></tr>
            <tr className="border-b bg-gray-50"><td className="px-4 py-3 text-gray-500 pl-8">Toplam Matrah (H7 = H3+H4)</td><td className="px-4 py-3 text-right text-gray-500">{formatPara(sonuc.toplamMatrah)}</td></tr>
            <tr className="border-b bg-gray-50"><td className="px-4 py-3 text-gray-500 pl-8">GV Birikimli (I3)</td><td className="px-4 py-3 text-right text-gray-500">{formatPara(sonuc.gvBirikimli)}</td></tr>
            <tr className="border-b bg-gray-50"><td className="px-4 py-3 text-gray-500 pl-8">GV Toplam (I7)</td><td className="px-4 py-3 text-right text-gray-500">{formatPara(sonuc.gvToplam)}</td></tr>
            <tr className="border-b"><td className="px-4 py-3 font-medium text-red-600">Gelir Vergisi (I4 = I7-I3)</td><td className="px-4 py-3 text-right text-red-600">- {formatPara(sonuc.gelirVergisi)}</td></tr>
            <tr className="border-b"><td className="px-4 py-3 font-medium text-red-600">Damga Vergisi (%0,759)</td><td className="px-4 py-3 text-right text-red-600">- {formatPara(sonuc.damgaVergisi)}</td></tr>
            <tr className="border-b"><td className="px-4 py-3 font-bold text-red-700">Toplam Kesintiler</td><td className="px-4 py-3 text-right font-bold text-red-700">{formatPara(sonuc.kesintilerToplam)}</td></tr>
            <tr className="bg-blue-50"><td className="px-4 py-3 font-bold text-blue-800">Net İhbar Tazminatı</td><td className="px-4 py-3 text-right font-bold text-blue-800 text-lg">{formatPara(sonuc.netIhbar)}</td></tr>
          </tbody>
        </table>
        {sonuc.ihbarGun === 0 && (
          <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg text-sm text-yellow-800">
            Çalışma süresi 60 günden az olduğu için ihbar tazminatı hesaplanmamıştır.
          </div>
        )}
        <div className="mt-6 text-xs text-gray-500">
          <p className="font-medium mb-1">4857 Sayılı İş Kanunu Md. 17 — İhbar Süreleri:</p>
          <table className="text-xs"><tbody>
            <tr><td className="pr-4">0-59 gün:</td><td>0 gün</td></tr>
            <tr><td className="pr-4">60-180 gün:</td><td>14 gün (2 hafta)</td></tr>
            <tr><td className="pr-4">181-540 gün:</td><td>28 gün (4 hafta)</td></tr>
            <tr><td className="pr-4">541-1088 gün:</td><td>42 gün (6 hafta)</td></tr>
            <tr><td className="pr-4">1089+ gün:</td><td>56 gün (8 hafta)</td></tr>
          </tbody></table>
        </div>

        {/* Beyan Metni */}
        <div className="mt-8 p-4 border rounded-lg text-sm leading-relaxed text-justify">
          <p>Şirketinizde yukarıda belirtilen tarihler arasında ve tespit edilen gün sayısı kadar çalışmış bulunmaktayım. Bu sürelere karşılık adıma tahakkuk eden ve yukarıda hesaplanmış olan İHBAR TAZMİNATI tutarını banka hesabıma yatırılması suretiyle aldım.</p>
        </div>

        {/* İmza */}
        <div className="mt-6 grid grid-cols-3 gap-4 text-sm text-center">
          <div><p className="font-medium">ADI SOYADI</p><p className="mt-1">{formData.adiSoyadi}</p></div>
          <div><p className="font-medium">TARİH</p><p className="mt-1 text-gray-400">___/___/______</p></div>
          <div><p className="font-medium">İMZA</p><p className="mt-6 text-gray-400">_____________</p></div>
        </div>

        {/* Nüsha */}
        <div className="mt-6 text-xs text-gray-600 border-t pt-4">
          <p className="font-medium mb-1">İşbu İhbar Tazminatı 3 (Üç) Nüsha düzenlenerek;</p>
          <p>1 Nüshası {formData.adiSoyadi}'ya verilmiştir.</p>
          <p>1 Nüshası Muhasebe Müdürlüğü'ne verilmiştir.</p>
          <p>1 Nüshası Personel Sicil dosyasına konmuştur.</p>
        </div>

        {/* Onay İmzaları */}
        <div className="mt-6 border-t pt-4">
          <p className="text-sm font-bold mb-3">İŞVEREN ONAY</p>
          <div className="grid grid-cols-4 gap-2 text-xs text-center">
            <div><p className="font-medium">İNSAN KAYNAKLARI</p><p className="text-gray-500 mt-1">Hazırlayan</p><p className="mt-6 text-gray-400">_____________</p></div>
            <div><p className="font-medium">&nbsp;</p><p className="text-gray-500 mt-1">İnsan Kayn. Sorumlusu</p><p className="mt-6 text-gray-400">_____________</p></div>
            <div><p className="font-medium">GENEL MÜDÜRLÜK</p><p className="text-gray-500 mt-1">Danışman</p><p className="mt-6 text-gray-400">_____________</p></div>
            <div><p className="font-medium">&nbsp;</p><p className="text-gray-500 mt-1">Şirket Müdürü</p><p className="mt-6 text-gray-400">_____________</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}
