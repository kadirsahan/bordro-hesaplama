import { formatTarih } from '../utils/tarihUtils.js';
import { usePdfExport } from '../utils/pdfExport.js';

export default function CalismaBelgesi({ formData }) {
  const { exportRef, exportPdf } = usePdfExport('Calisma_Belgesi');
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Çalışma Belgesi</h2>
        <button onClick={exportPdf} className="no-print px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">PDF İndir</button>
      </div>
      <div ref={exportRef} className="bg-white rounded-xl shadow-sm border p-8 max-w-3xl mx-auto" style={{ fontFamily: 'serif' }}>
        <div className="flex items-start mb-6">
          <img src="/sirket_logo.png" alt="Şirket Logo" width="110" height="71" />
        </div>
        <div className="flex justify-between mb-8 text-sm">
          <div><p><span className="font-medium">Tarih:</span> {formatTarih(formData.istenCikisTarihi)}</p></div>
          <div><p><span className="font-medium">Sayı:</span> {formData.belgeYil} / {formData.belgeSayi}</p></div>
        </div>
        <div className="text-center mb-8">
          <p className="font-bold text-lg mb-2">İLGİLİ MAKAMA</p>
          <p className="font-bold text-xl underline">ÇALIŞMA BELGESİ</p>
        </div>
        <div className="mb-6">
          <p className="font-bold mb-3 text-gray-700">İşçinin</p>
          <table className="text-sm ml-4"><tbody>
            <tr><td className="pr-4 py-1 font-medium text-gray-600 w-56">Adı-Soyadı</td><td className="py-1">: {formData.adiSoyadi}</td></tr>
            <tr><td className="pr-4 py-1 font-medium text-gray-600">Baba Adı</td><td className="py-1">: {formData.babaAdi}</td></tr>
            <tr><td className="pr-4 py-1 font-medium text-gray-600">Doğum Yeri ve Yılı</td><td className="py-1">: {formData.dogumYeri} / {formatTarih(formData.dogumTarihi)}</td></tr>
            <tr><td className="pr-4 py-1 font-medium text-gray-600">T.C. Kimlik No</td><td className="py-1">: {formData.tcNo}</td></tr>
          </tbody></table>
        </div>
        <div className="mb-6">
          <p className="font-bold mb-3 text-gray-700">Çalıştığı İşyerinin</p>
          <table className="text-sm ml-4"><tbody>
            <tr><td className="pr-4 py-1 font-medium text-gray-600 w-56">Ünvanı</td><td className="py-1">: {formData.bankaSubesi}</td></tr>
            <tr><td className="pr-4 py-1 font-medium text-gray-600">Adresi</td><td className="py-1">: {formData.sirketAdresi}</td></tr>
            <tr><td className="pr-4 py-1 font-medium text-gray-600">İşyeri SGK Sicil No</td><td className="py-1">: {formData.isyeriSicilNo}</td></tr>
            <tr><td className="pr-4 py-1 font-medium text-gray-600">İşyeri Unvanı</td><td className="py-1">: {formData.isyeriAdiUnvani}</td></tr>
          </tbody></table>
        </div>
        <div className="mb-8">
          <table className="text-sm ml-4"><tbody>
            <tr><td className="pr-4 py-1 font-medium text-gray-600 w-56">İşçinin Görevi</td><td className="py-1">: {formData.gorevi}</td></tr>
            <tr><td className="pr-4 py-1 font-medium text-gray-600">İşe Başlama Tarihi</td><td className="py-1">: {formatTarih(formData.iseGirisTarihi)}</td></tr>
            <tr><td className="pr-4 py-1 font-medium text-gray-600">İşten Ayrılış Tarihi</td><td className="py-1">: {formatTarih(formData.istenCikisTarihi)}</td></tr>
            <tr><td className="pr-4 py-1 font-medium text-gray-600">İşten Çıkış Nedeni</td><td className="py-1">: {formData.istenAyrilisNedeni}</td></tr>
          </tbody></table>
        </div>
        <div className="mb-10 text-sm leading-relaxed text-justify">
          <p>Yukarıda fotoğrafı, kimliği ve çalıştığı işyeri belirtilen <strong>{formData.adiSoyadi}</strong>, belirtilen tarihler arasında şirketimizde <strong>{formData.gorevi}</strong> olarak çalışmıştır.</p>
          <p className="mt-4">İş bu çalışma belgesi 4857 sayılı İş Kanunun 28. maddesine istinaden düzenlenmiş ve kendisine verilmiştir.</p>
        </div>
        <div className="text-right mt-12">
          <p className="font-medium">Saygılarımızla</p>
          <p className="mt-8 text-sm text-gray-500">_________________________</p>
          <p className="text-sm text-gray-600">{formData.sirketAdi}</p>
        </div>
      </div>
    </div>
  );
}
