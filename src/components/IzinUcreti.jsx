import { formatPara } from '../utils/formatUtils.js';
import { formatTarih } from '../utils/tarihUtils.js';
import { usePdfExport } from '../utils/pdfExport.js';

export default function IzinUcreti({ sonuc, formData }) {
  const { exportRef, exportPdf } = usePdfExport('Yillik_Izin_Ucreti_Bordrosu');
  if (!sonuc) return <p className="text-red-500">Hesaplama yapılamadı.</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Yıllık İzin Ücreti Bordrosu</h2>
        <button onClick={exportPdf} className="no-print px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">PDF İndir</button>
      </div>
      <div ref={exportRef} className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-start mb-6">
          <img src="/sirket_logo.png" alt="Şirket Logo" width="110" height="71" className="mr-4" />
          <div className="flex-1 text-center">
            <h3 className="text-lg font-bold">YILLIK İZİN ÜCRETİ BORDROSU</h3>
            <p className="text-sm text-gray-500">{formData.sirketAdi} - {formData.isyeriAdiUnvani}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div><span className="font-medium text-gray-600">Adı Soyadı:</span> {formData.adiSoyadi}</div>
          <div><span className="font-medium text-gray-600">T.C. No:</span> {formData.tcNo}</div>
          <div><span className="font-medium text-gray-600">Doğum Tarihi:</span> {formatTarih(formData.dogumTarihi)} (Yaş: {sonuc.yas})</div>
          <div><span className="font-medium text-gray-600">İşe Giriş:</span> {formatTarih(formData.iseGirisTarihi)}</div>
          <div><span className="font-medium text-gray-600">İşten Çıkış:</span> {formatTarih(formData.istenCikisTarihi)}</div>
        </div>
        <table className="min-w-full text-sm">
          <tbody>
            <tr className="border-b"><td className="px-4 py-3 font-medium text-gray-700">Kıdem Süresi</td><td className="px-4 py-3 text-right">{sonuc.kidemYil} yıl</td></tr>
            <tr className="border-b"><td className="px-4 py-3 font-medium text-gray-700">Yaş ({sonuc.yas > 50 ? '50 üstü - ek izin' : sonuc.yas < 18 ? '18 altı - ek izin' : 'normal'})</td><td className="px-4 py-3 text-right">{sonuc.yas}</td></tr>
            <tr className="border-b"><td className="px-4 py-3 font-medium text-gray-700">Hakedilen İzin</td><td className="px-4 py-3 text-right font-bold">{sonuc.hakedilenIzin} gün</td></tr>
            <tr className="border-b"><td className="px-4 py-3 font-medium text-gray-700">Kullanılan İzin</td><td className="px-4 py-3 text-right">{sonuc.kullanilanIzin} gün</td></tr>
            <tr className="border-b bg-yellow-50"><td className="px-4 py-3 font-bold text-gray-800">Bakiye İzin</td><td className="px-4 py-3 text-right font-bold">{sonuc.bakiyeIzin} gün</td></tr>
            <tr className="border-b"><td className="px-4 py-3 font-medium text-gray-700">Aylık Brüt Ücret</td><td className="px-4 py-3 text-right">{formatPara(Number(formData.aylikBrutUcret))}</td></tr>
            <tr className="border-b"><td className="px-4 py-3 font-medium text-gray-700">Günlük Ücret</td><td className="px-4 py-3 text-right">{formatPara(sonuc.gunlukUcret)}</td></tr>
            <tr className="border-b bg-green-50"><td className="px-4 py-3 font-bold text-gray-800">Brüt İzin Ücreti</td><td className="px-4 py-3 text-right font-bold text-lg">{formatPara(sonuc.brutIzin)}</td></tr>
            <tr className="border-b"><td className="px-4 py-3 font-medium text-red-600">SGK Primi (%15)</td><td className="px-4 py-3 text-right text-red-600">- {formatPara(sonuc.sgkPrimi)}</td></tr>
            <tr className="border-b bg-gray-50"><td className="px-4 py-3 text-gray-500 pl-8">GV Matrahı (H4)</td><td className="px-4 py-3 text-right text-gray-500">{formatPara(sonuc.gvMatrahi)}</td></tr>
            <tr className="border-b bg-gray-50"><td className="px-4 py-3 text-gray-500 pl-8">Birikimli Matrah (H3)</td><td className="px-4 py-3 text-right text-gray-500">{formatPara(sonuc.birikimliMatrah)}</td></tr>
            <tr className="border-b bg-gray-50"><td className="px-4 py-3 text-gray-500 pl-8">Toplam Matrah (H7)</td><td className="px-4 py-3 text-right text-gray-500">{formatPara(sonuc.toplamMatrah)}</td></tr>
            <tr className="border-b bg-gray-50"><td className="px-4 py-3 text-gray-500 pl-8">Ek Tahakkuk GV (I4 = I7-I3)</td><td className="px-4 py-3 text-right text-gray-500">{formatPara(sonuc.ekTahakkukGV)}</td></tr>
            <tr className="border-b bg-gray-50"><td className="px-4 py-3 text-gray-500 pl-8">GV İstisnası (L2)</td><td className="px-4 py-3 text-right text-gray-500">- {formatPara(Number(formData.aylikGVIstisnasi))}</td></tr>
            <tr className="border-b"><td className="px-4 py-3 font-medium text-red-600">Gelir Vergisi</td><td className="px-4 py-3 text-right text-red-600">- {formatPara(sonuc.gelirVergisi)}</td></tr>
            <tr className="border-b"><td className="px-4 py-3 font-medium text-red-600">Damga Vergisi</td><td className="px-4 py-3 text-right text-red-600">- {formatPara(sonuc.damgaVergisi)}</td></tr>
            <tr className="border-b"><td className="px-4 py-3 font-bold text-red-700">Toplam Kesintiler</td><td className="px-4 py-3 text-right font-bold text-red-700">{formatPara(sonuc.kesintilerToplam)}</td></tr>
            <tr className="bg-blue-50"><td className="px-4 py-3 font-bold text-blue-800">Net İzin Ücreti</td><td className="px-4 py-3 text-right font-bold text-blue-800 text-lg">{formatPara(sonuc.netIzin)}</td></tr>
          </tbody>
        </table>
        {sonuc.bakiyeIzin <= 0 && (
          <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg text-sm text-yellow-800">
            Bakiye izin günü bulunmadığı için izin ücreti hesaplanmamıştır.
          </div>
        )}

        {/* Beyan Metni */}
        <div className="mt-8 p-4 border rounded-lg text-sm leading-relaxed text-justify">
          <p>Şirketinizde yukarıda belirtilen tarihler arasında ve tespit edilen gün sayısı kadar çalışmış bulunmaktayım. Bu süreler içerisinde kullanmadığım yıllık ücretli izinlerimin karşılığı tahakkuk eden ve yukarıda hesaplanmış olan YILLIK İZİN ÜCRETİ tutarını banka hesabıma yatırılması suretiyle aldım.</p>
        </div>

        {/* İmza */}
        <div className="mt-6 grid grid-cols-3 gap-4 text-sm text-center">
          <div><p className="font-medium">ADI SOYADI</p><p className="mt-1">{formData.adiSoyadi}</p></div>
          <div><p className="font-medium">TARİH</p><p className="mt-1 text-gray-400">___/___/______</p></div>
          <div><p className="font-medium">İMZA</p><p className="mt-6 text-gray-400">_____________</p></div>
        </div>

        {/* Nüsha */}
        <div className="mt-6 text-xs text-gray-600 border-t pt-4">
          <p className="font-medium mb-1">İşbu Yıllık İzin Ücreti 3 (Üç) Nüsha düzenlenerek;</p>
          <p>1 Nüshası {formData.adiSoyadi}'ya verilmiştir.</p>
          <p>1 Nüshası Muhasebe Müdürlüğü'ne verilmiştir.</p>
          <p>1 Nüshası Personel Sicil dosyasına konmuştur.</p>
        </div>

        {/* Onay İmzaları */}
        <div className="mt-6 border-t pt-4">
          <p className="text-sm font-bold mb-3">İŞVEREN ONAY</p>
          <div className="grid grid-cols-4 gap-2 text-xs text-center">
            <div><p className="font-medium">İNSAN KAYNAKLARI</p><p className="text-gray-500 mt-1">Hazırlayan</p><p className="mt-6 text-gray-400">_____________</p></div>
            <div><p className="font-medium">&nbsp;</p><p className="text-gray-500 mt-1">İ.K. Sorumlusu</p><p className="mt-6 text-gray-400">_____________</p></div>
            <div><p className="font-medium">GENEL MÜDÜRLÜK</p><p className="text-gray-500 mt-1">Danışman</p><p className="mt-6 text-gray-400">_____________</p></div>
            <div><p className="font-medium">&nbsp;</p><p className="text-gray-500 mt-1">Genel Müdür</p><p className="mt-6 text-gray-400">_____________</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}
