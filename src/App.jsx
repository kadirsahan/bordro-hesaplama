import { useState, useMemo } from 'react';
import BilgiGirisi from './components/BilgiGirisi.jsx';
import BordroHesaplamaComp from './components/BordroHesaplama.jsx';
import KidemTazminati from './components/KidemTazminati.jsx';
import IhbarTazminati from './components/IhbarTazminati.jsx';
import IzinUcreti from './components/IzinUcreti.jsx';
import CalismaBelgesi from './components/CalismaBelgesi.jsx';
import Ibraname from './components/Ibraname.jsx';
import OzetDashboard from './components/OzetDashboard.jsx';
import { hesaplaKidem } from './utils/kidemHesaplama.js';
import { hesaplaIhbar } from './utils/ihbarHesaplama.js';
import { hesaplaIzin } from './utils/izinHesaplama.js';
import { hesaplaBordro } from './utils/bordroHesaplama.js';

const VARSAYILAN = {
  tcNo: '1234567890', adiSoyadi: 'MUSTAFA AK', babaAdi: 'CABBAR', dogumYeri: 'D',
  dogumTarihi: '1971-01-19', gorevi: 'BEKÇİ', iseGirisTarihi: '2024-09-20',
  istenCikisTarihi: '2026-03-10', sayilmayanGun: 0, istenAyrilisNedeni: 'İŞVEREN FESHİ',
  aylikBrutUcret: 105660.81, giydirilmisUcret: 105660.81, kullanilanIzin: 10,
  kidemTavani: 64948.77, birikimliMatrah: 97000, aylikGVIstisnasi: 4211.33,
  aylikDVIstisnasi: 250.70, odenenAvans: 0, banka: 'XYZ', bankaSubesi: 'ÇANKAYA',
  bankaHesapNo: '123-4598-23', sirketAdi: 'CEYLAN', isyeriSicilNo: '1234.45',
  isyeriAdiUnvani: 'BARAJ İNŞAATI', sirketAdresi: 'KULOĞLU', belgeYil: 2026, belgeSayi: 1,
  normalAylikBrut: 0, normalAylikKesinti: 0, normalAylikNet: 0,
  fazlaMesaiBrut: 0, fazlaMesaiKesinti: 0, fazlaMesaiNet: 0,
  haftaTatiliBrut: 0, haftaTatiliKesinti: 0, haftaTatiliNet: 0,
  ubgtBrut: 0, ubgtKesinti: 0, ubgtNet: 0,
  sosyalHaklarBrut: 0, sosyalHaklarKesinti: 0, sosyalHaklarNet: 0,
  ozelKesintiler: 0, bordroBrut: 120000, bordroEkOrani: 1 / 3, bordroDigerKesinti: 0,
};

const TABS = [
  { id: 'ozet', label: 'Özet' }, { id: 'bilgiGirisi', label: 'Bilgi Girişi' },
  { id: 'bordro', label: 'Bordro' }, { id: 'kidem', label: 'Kıdem Tazminatı' },
  { id: 'ihbar', label: 'İhbar Tazminatı' }, { id: 'izin', label: 'Yıllık İzin' },
  { id: 'calismaBelgesi', label: 'Çalışma Belgesi' }, { id: 'ibraname', label: 'İbraname' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('ozet');
  const [formData, setFormData] = useState(VARSAYILAN);
  const handleChange = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));

  const kidemSonuc = useMemo(() => {
    try { return hesaplaKidem({ girisTarihi: formData.iseGirisTarihi, cikisTarihi: formData.istenCikisTarihi, giydirilmisUcret: Number(formData.giydirilmisUcret), kidemTavani: Number(formData.kidemTavani), sayilmayanGun: Number(formData.sayilmayanGun), odenenAvans: Number(formData.odenenAvans) }); } catch { return null; }
  }, [formData.iseGirisTarihi, formData.istenCikisTarihi, formData.giydirilmisUcret, formData.kidemTavani, formData.sayilmayanGun, formData.odenenAvans]);

  const ihbarSonuc = useMemo(() => {
    try { return hesaplaIhbar({ girisTarihi: formData.iseGirisTarihi, cikisTarihi: formData.istenCikisTarihi, giydirilmisUcret: Number(formData.giydirilmisUcret), birikimliMatrah: Number(formData.birikimliMatrah), sayilmayanGun: Number(formData.sayilmayanGun) }); } catch { return null; }
  }, [formData.iseGirisTarihi, formData.istenCikisTarihi, formData.giydirilmisUcret, formData.birikimliMatrah, formData.sayilmayanGun]);

  const izinSonuc = useMemo(() => {
    try { return hesaplaIzin({ girisTarihi: formData.iseGirisTarihi, cikisTarihi: formData.istenCikisTarihi, dogumTarihi: formData.dogumTarihi, aylikBrutUcret: Number(formData.aylikBrutUcret), kullanilanIzin: Number(formData.kullanilanIzin), birikimliMatrah: Number(formData.birikimliMatrah), gvIstisnasi: Number(formData.aylikGVIstisnasi), dvIstisnasi: Number(formData.aylikDVIstisnasi), sayilmayanGun: Number(formData.sayilmayanGun) }); } catch { return null; }
  }, [formData.iseGirisTarihi, formData.istenCikisTarihi, formData.dogumTarihi, formData.aylikBrutUcret, formData.kullanilanIzin, formData.birikimliMatrah, formData.aylikGVIstisnasi, formData.aylikDVIstisnasi, formData.sayilmayanGun]);

  const bordroSonuc = useMemo(() => {
    try { return hesaplaBordro({ aylikBrut: Number(formData.bordroBrut), ekOdemeOrani: Number(formData.bordroEkOrani), digerKesintiler: Number(formData.bordroDigerKesinti) }); } catch { return []; }
  }, [formData.bordroBrut, formData.bordroEkOrani, formData.bordroDigerKesinti]);

  const renderTab = () => {
    switch (activeTab) {
      case 'ozet': return <OzetDashboard kidem={kidemSonuc} ihbar={ihbarSonuc} izin={izinSonuc} formData={formData} />;
      case 'bilgiGirisi': return <BilgiGirisi formData={formData} onChange={handleChange} />;
      case 'bordro': return <BordroHesaplamaComp sonuclar={bordroSonuc} formData={formData} onChange={handleChange} />;
      case 'kidem': return <KidemTazminati sonuc={kidemSonuc} formData={formData} />;
      case 'ihbar': return <IhbarTazminati sonuc={ihbarSonuc} formData={formData} />;
      case 'izin': return <IzinUcreti sonuc={izinSonuc} formData={formData} />;
      case 'calismaBelgesi': return <CalismaBelgesi formData={formData} />;
      case 'ibraname': return <Ibraname kidem={kidemSonuc} ihbar={ihbarSonuc} izin={izinSonuc} formData={formData} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Bordro ve İşçilik Alacakları Hesaplama</h1>
          <p className="text-blue-200 text-sm mt-1">2026 Yılı Parametreleri</p>
        </div>
      </header>
      <nav className="bg-white shadow-sm border-b no-print">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto">
            {TABS.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === tab.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 py-6">{renderTab()}</main>
      <footer className="bg-gray-800 text-gray-400 text-center py-3 text-xs no-print">
        Bordro ve İşçilik Alacakları Hesaplama Sistemi - 2026
      </footer>
    </div>
  );
}
