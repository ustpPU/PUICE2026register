'use client';

import { FormEvent, useEffect, useState } from 'react';
import HeroSlideshow from './HeroSlideshow';
import { media } from '../lib/media';
import type { JourneySettings } from '../lib/journey-settings';

type Rating = 1 | 2 | 3 | 4;
type Mode = 'attendance' | 'feedback';
type RequestState = 'idle' | 'loading' | 'error';

type AttendanceAnswers = {
  full_name: string;
  organisation_or_school: string;
  phone_number: string;
  category: string;
  other_category: string;
  roles: string[];
};

type AttendanceRecord = {
  attendance_id: string;
  full_name: string;
  organisation_or_school: string;
  phone_number?: string;
  attendance_status: string;
  feedback_status: string;
  certificate_status: string;
  certificate_number?: string;
  template_version?: string;
};

type FeedbackAnswers = {
  ratings: Array<Rating | null>;
  continue_future: string;
  improvement: string;
  participate_future: string;
  confirmation: boolean;
};

const PHONE_KEY = 'puice-2026-attendance-phone';
const fallbackSettings: JourneySettings = {
  testMode: false,
  attendanceEnabled: true,
  attendanceOpenAt: '2026-09-10T08:00:00+08:00',
  feedbackEnabled: true,
  feedbackOpenAt: '2026-09-10T11:00:00+08:00',
  certificateEnabled: true,
};
const emptyAttendance: AttendanceAnswers = { full_name: '', organisation_or_school: '', phone_number: '', category: '', other_category: '', roles: [] };
const emptyFeedback: FeedbackAnswers = { ratings: [null, null, null, null, null, null], continue_future: '', improvement: '', participate_future: '', confirmation: false };

const categories = ['Pegawai KPM/JPN/PPD', 'Sekolah', 'Organisasi Luar KPM/JPN/PPD', 'Lain-lain'];
const roles = ['Perasmi', 'Rakan Strategik', 'Penolong Kanan (PKP / PK HEM / PK Kokurikulum)', 'Wakil Pengetua/Guru Besar', 'Tetamu Jemputan', 'Pengucaptama/Pembentang', 'Juri Pertandingan', 'Guru Pengiring', 'Urus setia', 'Peserta Pertandingan', 'Pempamer reruai tajaan'];
const statements = [
  'Masa yang diperuntukkan bagi setiap aktiviti adalah sesuai.',
  'Tempat dan kemudahan yang disediakan adalah sesuai untuk pelaksanaan program.',
  'Pelantar yang sesuai disediakan untuk menyalurkan maklumat yang jelas dan terkini berkaitan program.',
  'Pembentangan, pameran dan pertandingan memberikan peluang untuk mendapatkan idea atau inspirasi baharu.',
  'Pelibatan dalam aktiviti PUiCE 2026 menambahkan pengalaman positif dan berimpak kepada peserta dan pengunjung.',
  'Program ini berjaya melahirkan lebih ramai warga pendidikan yang kreatif dan kritis dalam melaksanakan pedagogi serta PdP berkesan.',
];
const scale: Array<{ value: Rating; label: string }> = [
  { value: 1, label: 'Sangat tidak setuju' }, { value: 2, label: 'Tidak setuju' },
  { value: 3, label: 'Setuju' }, { value: 4, label: 'Sangat setuju' },
];

async function postJourney(payload: Record<string, unknown>) {
  const response = await fetch('/api/guest-journey', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  const result = await response.json() as { message?: string; record?: AttendanceRecord; records?: AttendanceRecord[] };
  if (!response.ok) throw new Error(result.message || 'Permintaan tidak dapat diproses.');
  return result;
}

async function loadImage(path: string) {
  const blob = await fetch(path).then(response => response.blob());
  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function downloadCertificate(record: AttendanceRecord) {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();
  doc.setFillColor(255, 255, 255); doc.rect(0, 0, width, height, 'F');
  doc.setDrawColor(242, 199, 110); doc.setLineWidth(1.15); doc.rect(10, 10, width - 20, height - 20);
  doc.setDrawColor(83, 29, 52); doc.setLineWidth(.35); doc.rect(14, 14, width - 28, height - 28);

  try {
    const logoSet = await loadImage('/brand/logo-set-puice.png');
    doc.addImage(logoSet, 'PNG', (width - 172) / 2, 19, 172, 37.6);
  } catch { /* The certificate remains valid if a browser blocks an image. */ }

  doc.setTextColor(83, 29, 52); doc.setFont('helvetica', 'bold'); doc.setFontSize(13); doc.text('PETALING UTAMA INNOVATIVE CONFERENCE ON EDUCATION', width / 2, 67, { align: 'center' });
  doc.setTextColor(19, 35, 65); doc.setFontSize(29); doc.text('SIJIL KEHADIRAN', width / 2, 84, { align: 'center' });
  doc.setFont('helvetica', 'normal'); doc.setFontSize(11); doc.text('Dengan ini diperakui bahawa', width / 2, 97, { align: 'center' });
  doc.setTextColor(167, 71, 64); doc.setFont('helvetica', 'bold'); doc.setFontSize(record.full_name.length > 45 ? 22 : 27);
  const nameLines = doc.splitTextToSize(record.full_name, 220);
  doc.text(nameLines, width / 2, 114, { align: 'center' });
  const afterName = 114 + (nameLines.length - 1) * 9;
  doc.setTextColor(19, 35, 65); doc.setFont('helvetica', 'normal'); doc.setFontSize(12);
  doc.text('telah menghadiri Kemuncak PUiCE 2026', width / 2, afterName + 14, { align: 'center' });
  doc.setFont('helvetica', 'bold'); doc.text('10 September 2026  ·  Dewan Sivik, MBPJ', width / 2, afterName + 24, { align: 'center' });
  doc.setDrawColor(210, 201, 187); doc.line(48, 158, width - 48, 158);
  doc.setTextColor(69, 79, 95); doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold'); doc.text(`No. sijil: ${record.certificate_number || record.attendance_id}`, 20, 176);
  doc.setFont('helvetica', 'normal'); doc.text('Sijil ini dijana secara digital dan disahkan melalui sistem rasmi PUiCE 2026.', width - 20, 176, { align: 'right' });
  doc.setFontSize(8); doc.text('PUiCE 2026 | Pendidikan Masa Hadapan: Teknologi Memacu, Insan Memimpin', width / 2, 190, { align: 'center' });
  const filename = record.full_name.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').slice(0, 60) || 'Peserta';
  doc.save(`Sijil-PUiCE-2026-${filename}.pdf`);
}

export default function GuestRegistration({ settings = fallbackSettings }: { settings?: JourneySettings }) {
  const [liveSettings, setLiveSettings] = useState(settings);
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [certificateOpen, setCertificateOpen] = useState(false);
  const [mode, setMode] = useState<Mode>('attendance');
  const [attendanceStep, setAttendanceStep] = useState(0);
  const [attendance, setAttendance] = useState<AttendanceAnswers>(emptyAttendance);
  const [created, setCreated] = useState<AttendanceRecord | null>(null);
  const [lookupPhone, setLookupPhone] = useState('');
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [selected, setSelected] = useState<AttendanceRecord | null>(null);
  const [feedback, setFeedback] = useState<FeedbackAnswers>(emptyFeedback);
  const [feedbackStage, setFeedbackStage] = useState<'lookup' | 'questions' | 'final' | 'success'>('lookup');
  const [ratingIndex, setRatingIndex] = useState(0);
  const [state, setState] = useState<RequestState>('idle');
  const [message, setMessage] = useState('');
  const [certificateLoading, setCertificateLoading] = useState(false);

  useEffect(() => {
    const refreshSettings = () => fetch('/api/journey-settings', { cache: 'no-store' })
      .then(async response => await response.json() as { settings?: JourneySettings })
      .then(result => { if (result.settings) setLiveSettings(result.settings); })
      .catch(() => undefined);
    const settingsTimer = window.setInterval(refreshSettings, 30000);
    return () => window.clearInterval(settingsTimer);
  }, []);

  useEffect(() => {
    const updateAccess = () => {
      const now = Date.now();
      setRegistrationOpen(liveSettings.testMode || (liveSettings.attendanceEnabled && now >= new Date(liveSettings.attendanceOpenAt).getTime()));
      setFeedbackOpen(liveSettings.testMode || (liveSettings.feedbackEnabled && now >= new Date(liveSettings.feedbackOpenAt).getTime()));
      setCertificateOpen(liveSettings.testMode || liveSettings.certificateEnabled);
    };
    updateAccess();
    const timer = window.setInterval(updateAccess, 15000);
    return () => window.clearInterval(timer);
  }, [liveSettings]);

  useEffect(() => {
    const savedPhone = localStorage.getItem(PHONE_KEY) || '';
    if (!savedPhone) return;
    const timer = window.setTimeout(() => {
      setLookupPhone(savedPhone);
      setAttendance(current => ({ ...current, phone_number: savedPhone }));
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const updateAttendance = <K extends keyof AttendanceAnswers>(key: K, value: AttendanceAnswers[K]) => { setAttendance(current => ({ ...current, [key]: value })); setMessage(''); };
  const updateFeedback = <K extends keyof FeedbackAnswers>(key: K, value: FeedbackAnswers[K]) => { setFeedback(current => ({ ...current, [key]: value })); setMessage(''); };

  function chooseMode(next: Mode) {
    setMode(next); setMessage('');
    if (next === 'feedback' && created) { setRecords([created]); setSelected(created); setFeedbackStage(created.feedback_status === 'COMPLETE' ? 'success' : 'questions'); }
  }

  function toggleRole(role: string) {
    updateAttendance('roles', attendance.roles.includes(role) ? attendance.roles.filter(item => item !== role) : [...attendance.roles, role]);
  }

  function attendanceNext() {
    if (!attendance.full_name.trim() || !attendance.organisation_or_school.trim() || attendance.phone_number.replace(/\D/g, '').length < 8 || !attendance.category || (attendance.category === 'Lain-lain' && !attendance.other_category.trim())) {
      setMessage('Lengkapkan semua maklumat sebelum meneruskan.'); return;
    }
    setAttendanceStep(1); setMessage('');
  }

  async function submitAttendance(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (attendance.roles.length === 0) { setMessage('Pilih sekurang-kurangnya satu peranan.'); return; }
    setState('loading'); setMessage('');
    try {
      const result = await postJourney({ action: 'create_attendance', ...attendance });
      if (!result.record) throw new Error('Rekod kehadiran tidak diterima.');
      localStorage.setItem(PHONE_KEY, attendance.phone_number);
      setLookupPhone(attendance.phone_number); setCreated(result.record); setRecords(current => [...current.filter(item => item.attendance_id !== result.record!.attendance_id), result.record!]);
      setMessage(result.message || 'Kehadiran berjaya direkodkan.');
    } catch (error) { setState('error'); setMessage(error instanceof Error ? error.message : 'Kehadiran tidak dapat direkodkan.'); return; }
    setState('idle');
  }

  function addAnotherPerson() {
    setAttendance({ ...emptyAttendance, phone_number: attendance.phone_number }); setAttendanceStep(0); setCreated(null); setMessage('Nombor telefon dikekalkan untuk nama seterusnya.');
  }

  async function lookup(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault(); setState('loading'); setMessage(''); setSelected(null);
    try {
      const result = await postJourney({ action: 'lookup_attendance', phone_number: lookupPhone });
      const found = result.records ?? [];
      setRecords(found); localStorage.setItem(PHONE_KEY, lookupPhone);
      if (found.length === 0) setMessage('Tiada rekod ditemui. Daftar kehadiran dahulu.');
      else if (found.length === 1) selectRecord(found[0]);
    } catch (error) { setState('error'); setMessage(error instanceof Error ? error.message : 'Carian tidak dapat dilakukan.'); return; }
    setState('idle');
  }

  function selectRecord(record: AttendanceRecord) {
    setSelected(record); setMessage(''); setRatingIndex(0); setFeedback(emptyFeedback);
    setFeedbackStage(record.feedback_status === 'COMPLETE' && record.certificate_status === 'ELIGIBLE' ? 'success' : 'questions');
  }

  function rate(value: Rating) {
    const ratings = [...feedback.ratings]; ratings[ratingIndex] = value; updateFeedback('ratings', ratings);
    if (ratingIndex < statements.length - 1) window.setTimeout(() => setRatingIndex(index => index + 1), 220);
    else window.setTimeout(() => setFeedbackStage('final'), 220);
  }

  async function submitFeedback(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected || feedback.ratings.some(value => value === null) || !feedback.continue_future || !feedback.improvement.trim() || !feedback.participate_future || !feedback.confirmation) {
      setMessage('Lengkapkan semua jawapan dan pengesahan.'); return;
    }
    setState('loading'); setMessage('');
    try {
      const result = await postJourney({ action: 'submit_feedback', attendance_id: selected.attendance_id, ...feedback });
      if (!result.record) throw new Error('Pengesahan sijil tidak diterima.');
      setSelected(result.record); setRecords(current => current.map(item => item.attendance_id === result.record!.attendance_id ? result.record! : item));
      setFeedbackStage('success'); setMessage(result.message || 'Maklum balas lengkap.');
    } catch (error) { setState('error'); setMessage(error instanceof Error ? error.message : 'Maklum balas tidak dapat dihantar.'); return; }
    setState('idle');
  }

  async function generateCertificate() {
    if (!selected || !certificateOpen) return;
    setCertificateLoading(true); setMessage('');
    try { await downloadCertificate(selected); setMessage('Sijil telah dijana dan dimuat turun ke peranti anda.'); }
    catch { setMessage('Sijil tidak dapat dijana pada peranti ini. Sila cuba browser lain.'); }
    setCertificateLoading(false);
  }

  const status = selected || created;

  return <section id="daftar" className="registration-panel journey-panel">
    <HeroSlideshow images={media.registration} className="registration-media" />
    <div className="registration-media-overlay" aria-hidden="true" />
    <style>{`.registration-gate{position:relative;width:100%;max-width:720px}.registration-gate.is-locked .registration-form-shell{filter:blur(7px);opacity:.52;pointer-events:none;user-select:none}.registration-lock{position:absolute;inset:0;z-index:5;display:grid;place-items:center;padding:24px;background:rgba(8,16,35,.3);backdrop-filter:blur(2px)}.registration-lock-card{width:min(440px,100%);padding:clamp(27px,5vw,42px);text-align:center;background:rgba(9,22,45,.96);color:#fff;border:1px solid rgba(242,199,110,.55);box-shadow:0 24px 70px rgba(0,0,0,.38)}.registration-lock-icon{width:58px;height:58px;margin:0 auto 22px;display:grid;place-items:center;border-radius:50%;background:#f2c76e;color:#132341;font-size:25px}.registration-lock-card .eyebrow{color:#f2c76e}.registration-lock-card h3{font-family:Georgia,serif;font-size:clamp(29px,4vw,42px);line-height:1.08;margin:8px 0 17px}.registration-lock-card p:not(.eyebrow){margin:0;color:#d9e1ee;font-size:14px;line-height:1.6}.registration-lock-card strong{display:block;margin-top:22px;color:#f2c76e;font-size:13px;letter-spacing:.06em}@media(max-width:780px){.registration-gate{max-width:780px}.registration-lock{padding:12px}.registration-lock-card{padding:28px 20px}.registration-lock-card h3{font-size:29px}}`}</style>
    <div className="registration-copy">
      <p className="eyebrow">KEHADIRAN · MAKLUM BALAS · SIJIL</p>
      <h2>Dua langkah.<br /><span>Satu perjalanan.</span></h2>
      <p>Lengkapkan kehadiran dahulu. Selepas maklum balas dihantar, sijil PDF boleh dijana terus tanpa disimpan dalam sistem.</p>
      <p className="feedback-time-note"><strong>Maklum balas dibuka pada 11.00 pagi, 10 September 2026.</strong> Sijil kehadiran digital boleh dijana selepas maklum balas dilengkapkan.</p>
      <div className="journey-status"><span className={status ? 'done' : ''}><b>{status ? '✓' : '1'}</b>Kehadiran</span><i /><span className={status?.feedback_status === 'COMPLETE' ? 'done' : ''}><b>{status?.feedback_status === 'COMPLETE' ? '✓' : '2'}</b>Maklum balas</span><i /><span className={status?.certificate_status === 'ELIGIBLE' ? 'done' : ''}><b>{status?.certificate_status === 'ELIGIBLE' ? '✓' : '3'}</b>Sijil</span></div>
      <div className="privacy-chip">Satu nombor boleh digunakan untuk beberapa nama</div>
      {feedbackOpen && <div className="feedback-open-banner" role="status"><strong>Maklum balas kini dibuka.</strong><span>Lengkapkan maklum balas untuk menjana sijil kehadiran digital.</span><button type="button" onClick={() => chooseMode('feedback')}>Isi sekarang →</button></div>}
    </div>

    <div className={`registration-gate${registrationOpen ? '' : ' is-locked'}`}>
    <div className="registration-form-shell journey-shell" aria-hidden={!registrationOpen} inert={registrationOpen ? undefined : true}>
      <div className="journey-tabs" role="tablist" aria-label="Kehadiran dan maklum balas">
        <button type="button" className={mode === 'attendance' ? 'active' : ''} onClick={() => chooseMode('attendance')}><span>01</span> Kehadiran</button>
        <button type="button" className={mode === 'feedback' ? 'active' : ''} onClick={() => chooseMode('feedback')}><span>02</span> Maklum Balas &amp; Sijil</button>
      </div>

      {mode === 'attendance' && (created ? <div className="form-success attendance-success" aria-live="polite">
        <div className="success-mark">✓</div><p className="eyebrow">1 DARIPADA 2 SELESAI</p><h3>Selamat datang, {created.full_name}.</h3>
        <div className="person-summary"><strong>{created.full_name}</strong><span>{created.organisation_or_school}</span><small>{created.attendance_id}</small></div>
        <p>{message} Semoga anda menikmati pengalaman sepanjang Kemuncak PUiCE 2026.</p>
        <div className="welcome-links"><a href="#panduan-tetamu">Lihat Panduan Tetamu →</a><a href="#atur-cara">Terokai Atur Cara →</a></div>
        <button type="button" className="primary-action" onClick={() => chooseMode('feedback')}>{feedbackOpen ? 'Isi Maklum Balas →' : 'Maklum Balas Dibuka 11.00 Pagi →'}</button>
        <button type="button" className="ghost-action" onClick={addAnotherPerson}>+ Daftar nama lain dengan nombor sama</button>
      </div> : <form onSubmit={submitAttendance} className="registration-form" noValidate>
        <div className="form-progress" aria-label={`Kemajuan kehadiran ${attendanceStep ? 100 : 50}%`}><span style={{ width: attendanceStep ? '100%' : '50%' }} /></div>
        <div className="form-stage-heading"><span>KEHADIRAN · LANGKAH {attendanceStep + 1} / 2</span><strong>{attendanceStep ? 'Peranan anda' : 'Maklumat untuk sijil'}</strong></div>
        {attendanceStep === 0 ? <div className="form-stage">
          <label>Nama penuh untuk sijil<input required autoComplete="name" value={attendance.full_name} onChange={event => updateAttendance('full_name', event.target.value)} placeholder="Contoh: Nur Aisyah Ahmad" /></label>
          <label>Organisasi / jabatan / sekolah<input required value={attendance.organisation_or_school} onChange={event => updateAttendance('organisation_or_school', event.target.value)} placeholder="Nama organisasi atau sekolah" /></label>
          <label>No. telefon<input required type="tel" inputMode="tel" autoComplete="tel" value={attendance.phone_number} onChange={event => updateAttendance('phone_number', event.target.value)} placeholder="Contoh: 012-345 6789" /></label>
          <fieldset className="choice-group"><legend>Kategori</legend><div className="choice-grid">{categories.map(category => <button type="button" key={category} className={attendance.category === category ? 'selected' : ''} onClick={() => updateAttendance('category', category)}>{category}</button>)}</div></fieldset>
          {attendance.category === 'Lain-lain' && <label>Nyatakan kategori<input value={attendance.other_category} onChange={event => updateAttendance('other_category', event.target.value)} /></label>}
        </div> : <div className="form-stage"><fieldset className="choice-group"><legend>Pilih semua peranan yang berkaitan</legend><p className="field-hint">Anda boleh memilih lebih daripada satu.</p><div className="role-grid">{roles.map(role => <button type="button" key={role} className={attendance.roles.includes(role) ? 'selected' : ''} onClick={() => toggleRole(role)}><span className="role-icon">{attendance.roles.includes(role) ? '✓' : '+'}</span><span className="role-label">{role}</span></button>)}</div></fieldset></div>}
        {message && <p className={`form-message ${state}`} role="alert">{message}</p>}
        <div className="form-actions">{attendanceStep > 0 && <button type="button" className="back-action" onClick={() => { setAttendanceStep(0); setMessage(''); }}>← Kembali</button>}{attendanceStep === 0 ? <button type="button" onClick={attendanceNext}>Teruskan →</button> : <button type="submit" disabled={state === 'loading'}>{state === 'loading' ? 'Merekodkan…' : 'Rekod Kehadiran →'}</button>}</div>
      </form>)}

      {mode === 'feedback' && !feedbackOpen && <div className="form-success feedback-locked-state" role="status"><div className="registration-lock-icon" aria-hidden="true">⌛</div><p className="eyebrow">MAKLUM BALAS BELUM DIBUKA</p><h3>Kembali selepas jam 11.00 pagi.</h3><p>Maklum balas dibuka pada 11.00 pagi, 10 September 2026. Sijil kehadiran digital boleh dijana selepas maklum balas dilengkapkan.</p><button type="button" className="ghost-action" onClick={() => chooseMode('attendance')}>← Kembali ke Kehadiran</button></div>}

      {mode === 'feedback' && feedbackOpen && feedbackStage === 'lookup' && <form className="registration-form lookup-form" onSubmit={lookup}>
        <div className="form-stage-heading"><span>SEMAK REKOD</span><strong>Maklum balas &amp; sijil</strong></div>
        <div className="lookup-intro"><p className="eyebrow">KEMBALI KE PUiCE</p><h3>Cari rekod kehadiran.</h3><p>Gunakan nombor telefon yang sama. Jika beberapa nama berkongsi nombor tersebut, pilih nama anda pada langkah seterusnya.</p></div>
        <label>No. telefon<input required type="tel" inputMode="tel" autoComplete="tel" value={lookupPhone} onChange={event => setLookupPhone(event.target.value)} placeholder="Contoh: 012-345 6789" /></label>
        {message && <p className={`form-message ${state}`} role="alert">{message}</p>}
        <button type="submit" className="lookup-action" disabled={state === 'loading'}>{state === 'loading' ? 'Mencari…' : 'Cari Rekod Saya →'}</button>
        {records.length > 1 && <div className="record-list"><p>Pilih nama:</p>{records.map(record => <button type="button" key={record.attendance_id} onClick={() => selectRecord(record)}><span><strong>{record.full_name}</strong><small>{record.organisation_or_school}</small></span><b>{record.feedback_status === 'COMPLETE' ? 'Sijil tersedia' : 'Isi maklum balas'} →</b></button>)}</div>}
        <button type="button" className="text-action" onClick={() => chooseMode('attendance')}>Belum daftar kehadiran?</button>
      </form>}

      {mode === 'feedback' && feedbackOpen && feedbackStage === 'questions' && selected && <form className="registration-form" onSubmit={event => event.preventDefault()}>
        <div className="form-progress"><span style={{ width: `${15 + Math.round(((ratingIndex + 1) / statements.length) * 55)}%` }} /></div>
        <div className="form-stage-heading"><span>SELAMAT KEMBALI · MAKLUM BALAS {ratingIndex + 1} / {statements.length}</span><strong>{selected.full_name}</strong></div>
        <div className="form-stage rating-stage"><div className="rating-count">PILIH SATU JAWAPAN</div><h3 className="rating-question">{statements[ratingIndex]}</h3><div className="rating-options">{scale.map(item => <button type="button" key={item.value} className={feedback.ratings[ratingIndex] === item.value ? 'selected' : ''} onClick={() => rate(item.value)}><strong>{item.value}</strong><span>{item.label}</span></button>)}</div><div className="rating-dots">{statements.map((_, index) => <span key={index} className={index === ratingIndex ? 'active' : feedback.ratings[index] ? 'answered' : ''} />)}</div></div>
        <div className="form-actions"><button type="button" className="back-action" onClick={() => ratingIndex > 0 ? setRatingIndex(index => index - 1) : setFeedbackStage('lookup')}>← Kembali</button></div>
      </form>}

      {mode === 'feedback' && feedbackOpen && feedbackStage === 'final' && selected && <form className="registration-form" onSubmit={submitFeedback}>
        <div className="form-progress"><span style={{ width: '92%' }} /></div><div className="form-stage-heading"><span>LANGKAH AKHIR</span><strong>Pandangan seterusnya</strong></div>
        <div className="form-stage final-stage">
          <fieldset className="choice-group"><legend>Adakah penganjuran PUiCE perlu diteruskan?</legend><div className="three-choices">{['Ya', 'Mungkin', 'Tidak'].map(value => <button type="button" key={value} className={feedback.continue_future === value ? 'selected' : ''} onClick={() => updateFeedback('continue_future', value)}>{value}</button>)}</div></fieldset>
          <label>Satu perkara paling penting yang perlu diperbaiki<textarea required rows={4} value={feedback.improvement} onChange={event => updateFeedback('improvement', event.target.value)} placeholder="Kongsikan cadangan yang paling bermakna…" /></label>
          <fieldset className="choice-group"><legend>Adakah anda akan menyertai PUiCE pada masa akan datang?</legend><div className="three-choices">{['Ya', 'Mungkin', 'Tidak'].map(value => <button type="button" key={value} className={feedback.participate_future === value ? 'selected' : ''} onClick={() => updateFeedback('participate_future', value)}>{value}</button>)}</div></fieldset>
          <label className="consent"><input type="checkbox" checked={feedback.confirmation} onChange={event => updateFeedback('confirmation', event.target.checked)} /><span>Saya mengesahkan semua jawapan yang diberikan adalah lengkap.</span></label>
        </div>
        {message && <p className={`form-message ${state}`} role="alert">{message}</p>}
        <div className="form-actions"><button type="button" className="back-action" onClick={() => { setRatingIndex(statements.length - 1); setFeedbackStage('questions'); }}>← Kembali</button><button type="submit" disabled={state === 'loading'}>{state === 'loading' ? 'Menghantar…' : 'Hantar Maklum Balas →'}</button></div>
      </form>}

      {mode === 'feedback' && feedbackOpen && feedbackStage === 'success' && selected && <div className="form-success certificate-success" aria-live="polite">
        <div className="success-mark">✓</div><p className="eyebrow">2 DARIPADA 2 SELESAI</p><h3>Anda layak menerima sijil.</h3>
        <div className="person-summary"><strong>{selected.full_name}</strong><span>{selected.organisation_or_school}</span><small>{selected.certificate_number}</small></div>
        <p>PDF akan dijana pada peranti anda setiap kali butang ditekan. Tiada fail sijil disimpan dalam sistem.</p>
        {certificateOpen ? <button type="button" className="primary-action certificate-action" onClick={generateCertificate} disabled={certificateLoading}>{certificateLoading ? 'Menjana PDF…' : 'Jana & Muat Turun Sijil PDF ↓'}</button> : <p className="form-message">Penjanaan sijil belum dibuka.</p>}
        {message && <p className="form-message success">{message}</p>}
        <button type="button" className="ghost-action" onClick={() => { setFeedbackStage('lookup'); setSelected(null); setMessage(''); }}>Semak nama lain</button>
      </div>}
    </div>
    {!registrationOpen && <div className="registration-lock" role="status" aria-live="polite"><div className="registration-lock-card"><div className="registration-lock-icon" aria-hidden="true">⌛</div><p className="eyebrow">PENDAFTARAN BELUM DIBUKA</p><h3>Borang kehadiran akan dibuka pada hari Kemuncak.</h3><p>Sila kembali ke bahagian ini apabila pendaftaran bermula.</p><strong>8.00 PAGI · 10 SEPTEMBER 2026</strong></div></div>}
    </div>
  </section>;
}
