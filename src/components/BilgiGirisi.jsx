import { useState, useEffect, useRef, memo } from 'react';

const DebouncedInput = memo(function DebouncedInput({ label, value, type, step, onChange }) {
  const [localValue, setLocalValue] = useState(value ?? '');
  const timerRef = useRef(null);
  const focusedRef = useRef(false);
  useEffect(() => { if (!focusedRef.current) setLocalValue(value ?? ''); }, [value]);
  useEffect(() => () => clearTimeout(timerRef.current), []);
  const handleChange = (e) => {
    const raw = e.target.value;
    setLocalValue(raw);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      onChange(type === 'number' ? (raw === '' ? 0 : parseFloat(raw) || 0) : raw);
    }, 400);
  };
  const handleBlur = () => {
    focusedRef.current = false;
    clearTimeout(timerRef.current);
    onChange(type === 'number' ? (localValue === '' ? 0 : parseFloat(localValue) || 0) : localValue);
  };
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input type={type || 'text'} value={localValue} onChange={handleChange}
        onFocus={() => { focusedRef.current = true; }} onBlur={handleBlur} step={step}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" />
    </div>
  );
});

const DebouncedTableInput = memo(function DebouncedTableInput({ value, onChange }) {
  const [localValue, setLocalValue] = useState(value ?? 0);
  const timerRef = useRef(null);
  const focusedRef = useRef(false);
  useEffect(() => { if (!focusedRef.current) setLocalValue(value ?? 0); }, [value]);
  useEffect(() => () => clearTimeout(timerRef.current), []);
  const handleChange = (e) => {
    const raw = e.target.value;
    setLocalValue(raw);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => onChange(raw === '' ? 0 : parseFloat(raw) || 0), 400);
  };
  const handleBlur = () => {
    focusedRef.current = false;
    clearTimeout(timerRef.current);
    onChange(localValue === '' ? 0 : parseFloat(localValue) || 0);
  };
  return <input type="number" step="0.01" value={localValue} onChange={handleChange}
    onFocus={() => { focusedRef.current = true; }} onBlur={handleBlur}
    className="w-full px-2 py-1 border rounded text-right text-sm" />;
});

function Section({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{children}</div>
    </div>
  );
}

const EK_ODEME = [
  { label: 'Normal Aylık Ücret', brut: 'normalAylikBrut', kesinti: 'normalAylikKesinti', net: 'normalAylikNet' },
  { label: 'Fazla Mesai Ücretleri', brut: 'fazlaMesaiBrut', kesinti: 'fazlaMesaiKesinti', net: 'fazlaMesaiNet' },
  { label: 'Hafta Tatili Ücretleri', brut: 'haftaTatiliBrut', kesinti: 'haftaTatiliKesinti', net: 'haftaTatiliNet' },
  { label: 'UBGT Ücretleri', brut: 'ubgtBrut', kesinti: 'ubgtKesinti', net: 'ubgtNet' },
  { label: 'Sosyal Haklar', brut: 'sosyalHaklarBrut', kesinti: 'sosyalHaklarKesinti', net: 'sosyalHaklarNet' },
];

export default function BilgiGirisi({ formData, onChange }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Bilgi Girişi</h2>
      <Section title="Çalışan Kimlik Bilgileri">
        <DebouncedInput label="T.C. Kimlik No" value={formData.tcNo} onChange={(v) => onChange('tcNo', v)} />
        <DebouncedInput label="Adı Soyadı" value={formData.adiSoyadi} onChange={(v) => onChange('adiSoyadi', v)} />
        <DebouncedInput label="Baba Adı" value={formData.babaAdi} onChange={(v) => onChange('babaAdi', v)} />
        <DebouncedInput label="Doğum Yeri" value={formData.dogumYeri} onChange={(v) => onChange('dogumYeri', v)} />
        <DebouncedInput label="Doğum Tarihi" value={formData.dogumTarihi} type="date" onChange={(v) => onChange('dogumTarihi', v)} />
        <DebouncedInput label="Görevi" value={formData.gorevi} onChange={(v) => onChange('gorevi', v)} />
      </Section>
      <Section title="Çalışma Bilgileri">
        <DebouncedInput label="İşe Giriş Tarihi" value={formData.iseGirisTarihi} type="date" onChange={(v) => onChange('iseGirisTarihi', v)} />
        <DebouncedInput label="İşten Çıkış Tarihi" value={formData.istenCikisTarihi} type="date" onChange={(v) => onChange('istenCikisTarihi', v)} />
        <DebouncedInput label="Kıdem Süresinden Sayılmayan (Gün)" value={formData.sayilmayanGun} type="number" onChange={(v) => onChange('sayilmayanGun', v)} />
        <DebouncedInput label="İşten Ayrılış Nedeni" value={formData.istenAyrilisNedeni} onChange={(v) => onChange('istenAyrilisNedeni', v)} />
      </Section>
      <Section title="Ücret Bilgileri">
        <DebouncedInput label="Aylık Brüt Ücret (TL)" value={formData.aylikBrutUcret} type="number" step="0.01" onChange={(v) => onChange('aylikBrutUcret', v)} />
        <DebouncedInput label="Aylık Giydirilmiş Ücret (TL)" value={formData.giydirilmisUcret} type="number" step="0.01" onChange={(v) => onChange('giydirilmisUcret', v)} />
        <DebouncedInput label="Kullanılan Yıllık İzin (Gün)" value={formData.kullanilanIzin} type="number" onChange={(v) => onChange('kullanilanIzin', v)} />
        <DebouncedInput label="Kıdem Tazminatı Tavanı (TL)" value={formData.kidemTavani} type="number" step="0.01" onChange={(v) => onChange('kidemTavani', v)} />
      </Section>
      <Section title="Vergi ve SGK Parametreleri">
        <DebouncedInput label="Birikimli Vergi Matrahı (TL)" value={formData.birikimliMatrah} type="number" step="0.01" onChange={(v) => onChange('birikimliMatrah', v)} />
        <DebouncedInput label="Aylık GV İstisnası (TL)" value={formData.aylikGVIstisnasi} type="number" step="0.01" onChange={(v) => onChange('aylikGVIstisnasi', v)} />
        <DebouncedInput label="Aylık DV İstisnası (TL)" value={formData.aylikDVIstisnasi} type="number" step="0.01" onChange={(v) => onChange('aylikDVIstisnasi', v)} />
        <DebouncedInput label="Ödenen Kıdem Tazminatı Avansı (TL)" value={formData.odenenAvans} type="number" step="0.01" onChange={(v) => onChange('odenenAvans', v)} />
      </Section>
      <Section title="İşveren / Firma Bilgileri">
        <DebouncedInput label="Şirket Adı" value={formData.sirketAdi} onChange={(v) => onChange('sirketAdi', v)} />
        <DebouncedInput label="İşyeri Sicil No" value={formData.isyeriSicilNo} onChange={(v) => onChange('isyeriSicilNo', v)} />
        <DebouncedInput label="İşyerinin Adı-Unvanı" value={formData.isyeriAdiUnvani} onChange={(v) => onChange('isyeriAdiUnvani', v)} />
        <DebouncedInput label="Şirket Adresi" value={formData.sirketAdresi} onChange={(v) => onChange('sirketAdresi', v)} />
      </Section>
      <Section title="Banka Bilgileri">
        <DebouncedInput label="Banka" value={formData.banka} onChange={(v) => onChange('banka', v)} />
        <DebouncedInput label="Banka Şubesi" value={formData.bankaSubesi} onChange={(v) => onChange('bankaSubesi', v)} />
        <DebouncedInput label="Banka Hesap No" value={formData.bankaHesapNo} onChange={(v) => onChange('bankaHesapNo', v)} />
      </Section>
      <Section title="Belge Numaralama">
        <DebouncedInput label="Yıl" value={formData.belgeYil} type="number" onChange={(v) => onChange('belgeYil', v)} />
        <DebouncedInput label="Sayı" value={formData.belgeSayi} type="number" onChange={(v) => onChange('belgeSayi', v)} />
      </Section>
      <Section title="İbraname Ek Ödemeleri">
        <div className="col-span-full overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead><tr className="bg-gray-50">
              <th className="px-3 py-2 text-left">Ödeme Türü</th>
              <th className="px-3 py-2 text-right">Brüt (TL)</th>
              <th className="px-3 py-2 text-right">Kesinti (TL)</th>
              <th className="px-3 py-2 text-right">Net (TL)</th>
            </tr></thead>
            <tbody>
              {EK_ODEME.map((row) => (
                <tr key={row.brut} className="border-b">
                  <td className="px-3 py-2">{row.label}</td>
                  <td className="px-3 py-1"><DebouncedTableInput value={formData[row.brut] ?? 0} onChange={(v) => onChange(row.brut, v)} /></td>
                  <td className="px-3 py-1"><DebouncedTableInput value={formData[row.kesinti] ?? 0} onChange={(v) => onChange(row.kesinti, v)} /></td>
                  <td className="px-3 py-1"><DebouncedTableInput value={formData[row.net] ?? 0} onChange={(v) => onChange(row.net, v)} /></td>
                </tr>
              ))}
              <tr className="border-b">
                <td className="px-3 py-2" colSpan={3}>Özel Kesintiler</td>
                <td className="px-3 py-1"><DebouncedTableInput value={formData.ozelKesintiler ?? 0} onChange={(v) => onChange('ozelKesintiler', v)} /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}
