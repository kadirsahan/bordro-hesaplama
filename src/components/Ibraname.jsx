import { formatPara, yuvarla2 } from '../utils/formatUtils.js';
import { formatTarih, tarihEkle } from '../utils/tarihUtils.js';
import { usePdfExport } from '../utils/pdfExport.js';

export default function Ibraname({ kidem, ihbar, izin, formData }) {
  const { exportRef, exportPdf } = usePdfExport('Ibraname');

  const satirlar = [
    { tur: 'Normal Aylık Ücret', brut: Number(formData.normalAylikBrut) || 0, kesinti: Number(formData.normalAylikKesinti) || 0, net: Number(formData.normalAylikNet) || 0 },
    { tur: 'Kıdem Tazminatı', brut: kidem?.brutKidem || 0, kesinti: kidem?.damgaVergisi || 0, net: kidem?.bakiye || 0 },
    { tur: 'İhbar Tazminatı', brut: ihbar?.brutIhbar || 0, kesinti: ihbar?.kesintilerToplam || 0, net: ihbar?.netIhbar || 0 },
    { tur: 'Yıllık İzin Ücreti', brut: izin?.brutIzin || 0, kesinti: izin?.kesintilerToplam || 0, net: izin?.netIzin || 0 },
    { tur: 'Fazla Mesai Ücretleri', brut: Number(formData.fazlaMesaiBrut) || 0, kesinti: Number(formData.fazlaMesaiKesinti) || 0, net: Number(formData.fazlaMesaiNet) || 0 },
    { tur: 'Hafta Tatili Ücreti', brut: Number(formData.haftaTatiliBrut) || 0, kesinti: Number(formData.haftaTatiliKesinti) || 0, net: Number(formData.haftaTatiliNet) || 0 },
    { tur: 'UBGT Ücreti', brut: Number(formData.ubgtBrut) || 0, kesinti: Number(formData.ubgtKesinti) || 0, net: Number(formData.ubgtNet) || 0 },
    { tur: 'Sosyal Haklar', brut: Number(formData.sosyalHaklarBrut) || 0, kesinti: Number(formData.sosyalHaklarKesinti) || 0, net: Number(formData.sosyalHaklarNet) || 0 },
  ];

  const araToplam = {
    brut: yuvarla2(satirlar.reduce((s, r) => s + r.brut, 0)),
    kesinti: yuvarla2(satirlar.reduce((s, r) => s + r.kesinti, 0)),
    net: yuvarla2(satirlar.reduce((s, r) => s + r.net, 0)),
  };
  const ozelKesintiler = Number(formData.ozelKesintiler) || 0;
  const netToplam = yuvarla2(araToplam.net - ozelKesintiler);
  const imzaTarihi = formData.istenCikisTarihi ? tarihEkle(formData.istenCikisTarihi, 32) : null;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">İbraname</h2>
        <button onClick={exportPdf} className="no-print px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">PDF İndir</button>
      </div>
      <div ref={exportRef} className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-start mb-6">
          <img src={`${import.meta.env.BASE_URL}sirket_logo.png`} alt="Şirket Logo" width="110" height="71" className="mr-4" />
          <div className="flex-1 text-center">
            <h3 className="text-xl font-bold">İBRANAMEDİR</h3>
          </div>
        </div>

        {/* İşveren / İşçi Bilgileri */}
        <div className="grid grid-cols-2 gap-6 mb-6 text-sm">
          <div>
            <p className="font-bold mb-2 text-gray-700">İşveren Bilgileri</p>
            <table className="text-sm"><tbody>
              <tr><td className="pr-3 py-1 text-gray-600">Şirket Adı:</td><td>{formData.sirketAdi}</td></tr>
              <tr><td className="pr-3 py-1 text-gray-600">Adres:</td><td>{formData.sirketAdresi}</td></tr>
              <tr><td className="pr-3 py-1 text-gray-600">SGK Sicil No:</td><td>{formData.isyeriSicilNo}</td></tr>
              <tr><td className="pr-3 py-1 text-gray-600">İşyeri Adı:</td><td>{formData.isyeriAdiUnvani}</td></tr>
            </tbody></table>
          </div>
          <div>
            <p className="font-bold mb-2 text-gray-700">İşçi Bilgileri</p>
            <table className="text-sm"><tbody>
              <tr><td className="pr-3 py-1 text-gray-600">Adı Soyadı:</td><td>{formData.adiSoyadi}</td></tr>
              <tr><td className="pr-3 py-1 text-gray-600">T.C. No:</td><td>{formData.tcNo}</td></tr>
              <tr><td className="pr-3 py-1 text-gray-600">Görevi:</td><td>{formData.gorevi}</td></tr>
              <tr><td className="pr-3 py-1 text-gray-600">İşe Giriş:</td><td>{formatTarih(formData.iseGirisTarihi)}</td></tr>
              <tr><td className="pr-3 py-1 text-gray-600">İşten Çıkış:</td><td>{formatTarih(formData.istenCikisTarihi)}</td></tr>
              <tr><td className="pr-3 py-1 text-gray-600">Çıkış Nedeni:</td><td>{formData.istenAyrilisNedeni}</td></tr>
            </tbody></table>
          </div>
        </div>

        {/* Paragraf 1 */}
        <div className="mb-4 text-sm leading-relaxed text-justify">
          <p>Yukarıda belirtilen tarihler arasında çalıştığım şirketinize ait işyerinden {formData.istenAyrilisNedeni ? formData.istenAyrilisNedeni.toLowerCase() : '.......................................'} nedeniyle ayrılıyorum. Ayrıldığım tarihe kadar hak etmiş olduğum bütün ücret, fazla mesai, hafta tatili ücreti, ulusal bayram ve genel tatil ücreti alacaklarımı aldım. Ücret, fazla mesai, hafta tatili ücreti, ulusal bayram ve genel tatil ücreti alacaklarımdan kalanı ile iş sözleşmemin sona ermesine bağlı olarak hak kazandığım diğer alacaklarımı da ayrıldığım esnada aşağıda gösterildiği tutarlarda banka hesabıma yatırılması suretiyle aldım. İşyerinde, iş sözleşmemden kaynaklı hiçbir ayni, nakdi ya da sosyal hak alacağım kalmamıştır.</p>
        </div>

        {/* Paragraf 2 */}
        <div className="mb-6 text-sm leading-relaxed text-justify">
          <p>Bu nedenle işyerinizden maddi ve manevi herhangi bir talepte bulunmayacağım. İşverenliğinizi iş sözleşmemin başlangıcından iş sözleşmemin sona erdiği tarihe kadar tüm haklarımı aldığımı, ibranameyi okuyup, içeriğini tam olarak anladıktan sonra hiçbir maddi veya manevi baskı altında kalmadan tamamen kendi irademle imzaladığımı, işvereni gayrikabil-i rücu ibra ettiğimi beyan ederim.</p>
        </div>

        {/* Tablo Başlığı */}
        <div className="mb-3 text-sm font-bold text-center">
          <p>İŞÇİNİN İŞYERİNDEN AYRILIŞ TARİHİ İTİBARİYLE HAK ETTİĞİ VE KENDİSİNE ÖDENEN ÜCRET VE DİĞER ÖDEMELER</p>
        </div>

        {/* Alacak Tablosu */}
        <table className="min-w-full text-sm border">
          <thead><tr className="bg-blue-700 text-white">
            <th className="px-4 py-2 text-left">Ödeme Türü</th>
            <th className="px-4 py-2 text-right">Brüt (TL)</th>
            <th className="px-4 py-2 text-right">Kesinti (TL)</th>
            <th className="px-4 py-2 text-right">Net (TL)</th>
          </tr></thead>
          <tbody>
            {satirlar.map((s, i) => (
              <tr key={i} className={`border-b ${i >= 1 && i <= 3 ? 'bg-blue-50 font-medium' : ''}`}>
                <td className="px-4 py-2">{s.tur}</td>
                <td className="px-4 py-2 text-right">{formatPara(s.brut, false)}</td>
                <td className="px-4 py-2 text-right">{formatPara(s.kesinti, false)}</td>
                <td className="px-4 py-2 text-right">{formatPara(s.net, false)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-100 font-bold border-t-2">
              <td className="px-4 py-2">Ara Toplam</td>
              <td className="px-4 py-2 text-right">{formatPara(araToplam.brut, false)}</td>
              <td className="px-4 py-2 text-right">{formatPara(araToplam.kesinti, false)}</td>
              <td className="px-4 py-2 text-right">{formatPara(araToplam.net, false)}</td>
            </tr>
            {ozelKesintiler > 0 && (
              <tr className="border-b">
                <td className="px-4 py-2" colSpan={3}>Özel Kesintiler</td>
                <td className="px-4 py-2 text-right text-red-600">- {formatPara(ozelKesintiler, false)}</td>
              </tr>
            )}
            <tr className="bg-blue-700 text-white font-bold text-lg">
              <td className="px-4 py-3" colSpan={3}>NET TOPLAM</td>
              <td className="px-4 py-3 text-right">{formatPara(netToplam)}</td>
            </tr>
          </tfoot>
        </table>

        {/* İmza Bölümü */}
        <div className="mt-8 grid grid-cols-2 gap-8 text-sm">
          <div className="text-center">
            <p className="font-medium mb-1">İşveren</p>
            <p className="mt-8 text-gray-500">_________________________</p>
            <p className="text-gray-600">{formData.sirketAdi}</p>
          </div>
          <div className="text-center">
            <p className="font-medium mb-1">İşçi</p>
            <p className="mt-4 text-sm">ADI SOYADI: {formData.adiSoyadi}</p>
            <p className="text-sm">GÖREVİ: {formData.gorevi}</p>
            <p className="mt-4 text-gray-500">_________________________</p>
            <p className="text-xs text-gray-500">İMZA</p>
          </div>
        </div>

        {imzaTarihi && (
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>İmza Tarihi: {formatTarih(imzaTarihi)}</p>
            <p className="text-xs">(İşten çıkış tarihinden 32 gün sonra — 4857/420)</p>
          </div>
        )}
      </div>
    </div>
  );
}
