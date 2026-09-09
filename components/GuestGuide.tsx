import Link from 'next/link';

const attendanceRules = [
  ['Sepanjang hari', 'Peserta dan guru pengiring KmR, PBL dan PBL-STEM'],
  ['Sepanjang hari', 'Pemenang Platinum CI3M'], ['Petang', 'Pemenang Emas CI3M'],
  ['Sepanjang hari', 'Pemenang Platinum Kajian Tindakan'], ['Petang', 'Semua peserta Kajian Tindakan'],
  ['Petang', 'Pemenang Platinum dan Emas PUiCE: Inovasi Guru'], ['11.30 pagi', 'Semua pemenang Poster Digital'],
];

const photoSteps = [
  ['01', 'Daftar', 'Daftar di Kaunter Pendaftaran.'],
  ['02', 'Terima token', 'Ambil slip token bernombor daripada kaunter.'],
  ['03', 'Ceraikan token', 'Simpan satu bahagian dan serahkan satu bahagian kepada petugas reruai foto.'],
  ['04', 'Tiga pose', 'Jurugambar mengambil tiga foto dalam tiga pose.'],
  ['05', 'Hantar ke editor', 'Foto dihantar ke stesen editor bersama nombor token.'],
  ['06', 'Edit jalur foto', 'Editor membuang latar hijau dan menyusun tiga pose dalam templat PUiCE.'],
  ['07', 'Cetak', 'Jalur foto dicetak dan disusun mengikut nombor token.'],
  ['08', 'Tuntut foto', 'Tunjukkan keratan token untuk mengambil jalur foto anda.'],
];

export default function GuestGuide() {
  return <section id="panduan-tetamu" className="guest-guide">
    <style>{`.guest-guide{padding:105px clamp(24px,10vw,150px);background:#09162d;color:#fff}.guide-heading{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:end;margin-bottom:45px}.guide-heading h2{font-size:clamp(42px,5.5vw,78px);line-height:.88;letter-spacing:-.075em;text-transform:uppercase;margin:0}.guide-heading h2 span{color:#f2c76e}.guide-heading>p{max-width:480px;color:#c9d3e5;font-size:16px;line-height:1.65;margin:0}.guide-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.guide-card{min-height:285px;border:1px solid rgba(255,255,255,.16);padding:28px;display:flex;flex-direction:column;justify-content:space-between;color:#fff}.guide-card.attendance{background:linear-gradient(145deg,#17386a,#112546)}.guide-card.photo{background:linear-gradient(145deg,#6b2444,#42172e)}.guide-card.book{background:linear-gradient(145deg,#125866,#0c3742)}.guide-card a{width:max-content;background:#f2c76e;color:#14213b;padding:13px 16px;font-size:12px;font-weight:800}.guide-card small{font-size:10px;letter-spacing:.14em;color:#f2c76e}.guide-card h3{font-size:29px;line-height:1;letter-spacing:-.05em;margin:9px 0}.guide-card p{font-size:13px;line-height:1.55;color:#d8e1ee;max-width:300px}.guide-detail{scroll-margin-top:88px;margin-top:70px;padding:clamp(28px,5vw,60px);background:#f6f1e7;color:#132341;border-top:5px solid #f2c76e}.guide-detail.photo-detail{background:#e9eef2}.guide-detail-header{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:24px;align-items:end;margin-bottom:34px}.guide-detail-header h2{font-size:clamp(38px,5vw,68px);line-height:.9;letter-spacing:-.065em;text-transform:uppercase;margin:0}.guide-detail-header p{margin:0;max-width:330px;color:#687286;font-size:14px;line-height:1.55}.guide-facts{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:34px}.guide-facts span{padding:10px 12px;border:1px solid #c9c2b6;background:rgba(255,255,255,.45);font-size:11px}.session-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:35px}.session{padding:24px;background:#132341;color:#fff;border-top:3px solid #f2c76e}.session.afternoon{background:#5e1e39}.session small{color:#f2c76e;font-size:10px;letter-spacing:.13em}.session h3{font-size:24px;margin:8px 0}.session p{margin:0;color:#dce4f1;line-height:1.5}.attendance-list{display:grid;gap:1px;background:#d4ccc0}.attendance-row{display:grid;grid-template-columns:145px 1fr;gap:18px;padding:15px 18px;background:#fff;font-size:14px;line-height:1.45}.attendance-row b{color:#a74740;font-size:11px;letter-spacing:.07em}.guide-note{margin-top:20px;padding:18px;background:#f2c76e;color:#132341;font-size:13px;line-height:1.5}.photo-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}.photo-step{display:grid;grid-template-columns:46px 1fr;gap:15px;padding:18px;background:#fff;border:1px solid #cbd2d8}.photo-step>strong{width:42px;height:42px;display:grid;place-items:center;background:#132341;color:#f2c76e}.photo-step h3{margin:0 0 7px;font-size:18px}.photo-step p{margin:0;color:#5d6878;font-size:13px;line-height:1.5}.original-link{display:inline-flex;margin-top:25px;color:#8e3f3b;font-size:12px;font-weight:800;border-bottom:1px solid currentColor;padding-bottom:3px}@media(max-width:780px){.guest-guide{padding:75px 18px}.guide-heading{grid-template-columns:1fr;gap:22px}.guide-grid{grid-template-columns:1fr}.guide-card{min-height:220px}.guide-detail{margin-top:38px;padding:30px 18px}.guide-detail-header{grid-template-columns:1fr;gap:14px}.session-grid,.photo-grid{grid-template-columns:1fr}.attendance-row{grid-template-columns:1fr;gap:5px}.photo-step{grid-template-columns:42px 1fr}}`}</style>
    <div className="guide-heading"><div><p className="eyebrow">PANDUAN TETAMU</p><h2>Semua yang perlu<br /><span>anda tahu.</span></h2></div><p>Maklumat penting untuk membantu tetamu bergerak, hadir pada sesi yang betul dan menikmati pengalaman Kemuncak dengan lancar.</p></div>
    <div className="guide-grid">
      <article className="guide-card attendance"><div><small>SESI PAGI &amp; PETANG</small><h3>Aturan Kehadiran</h3><p>Semak waktu dan ketetapan kehadiran mengikut peranan anda.</p></div><a href="#aturan-kehadiran">Lihat panduan ↓</a></article>
      <article className="guide-card photo"><div><small>8.00 PAGI – 4.00 PETANG</small><h3>Aliran Reruai Foto</h3><p>Lapan langkah mudah daripada pendaftaran hingga tuntutan jalur foto.</p></div><a href="#aliran-reruai-foto">Lihat aliran ↓</a></article>
      <article className="guide-card book"><div><small>48 HALAMAN</small><h3>Buku Program Rasmi</h3><p>Baca atur cara, pengisian, pembentang dan senarai peserta.</p></div><Link href="/buku-program">Baca buku program →</Link></article>
    </div>
    <article id="aturan-kehadiran" className="guide-detail attendance-detail">
      <div className="guide-detail-header"><div><p className="eyebrow">PANDUAN 01</p><h2>Aturan Kehadiran</h2></div><p>Ketetapan sesi dibuat untuk melancarkan perjalanan majlis dan memastikan keselesaan tetamu.</p></div>
      <div className="guide-facts"><span>10 SEPTEMBER 2026</span><span>DEWAN SIVIK MBPJ</span><span>PAGI · 8.00</span><span>PETANG · 1.30</span></div>
      <div className="session-grid"><section className="session"><small>SESI PAGI · 8.00 PAGI</small><h3>Penolong Kanan</h3><p>Disarankan hadir untuk Perasmian Pembukaan.</p></section><section className="session afternoon"><small>SESI PETANG · 1.30 PETANG</small><h3>Pengetua &amp; Guru Besar</h3><p>Disarankan hadir untuk memeriahkan Perasmian Penutupan.</p></section></div>
      <div className="attendance-list">{attendanceRules.map(([time, group]) => <div className="attendance-row" key={group}><b>{time}</b><span>{group}</span></div>)}</div>
      <div className="guide-note"><strong>Poster Digital:</strong> Pemenang Platinum dan Emas perlu berada di lokasi sehingga sesi petang.</div>
      <a className="original-link" href="/media/guest-guide-attendance.webp" target="_blank" rel="noopener noreferrer">Lihat poster asal ↗</a>
    </article>
    <article id="aliran-reruai-foto" className="guide-detail photo-detail">
      <div className="guide-detail-header"><div><p className="eyebrow">PANDUAN 02</p><h2>Aliran Reruai Foto</h2></div><p>Satu token, satu kenangan. Ikuti urutan ini untuk mendapatkan jalur foto anda.</p></div>
      <div className="guide-facts"><span>10 SEPTEMBER 2026</span><span>8.00 PAGI – 4.00 PETANG</span><span>LOBI · LUAR DEWAN</span></div>
      <div className="photo-grid">{photoSteps.map(([number, title, description]) => <section className="photo-step" key={number}><strong>{number}</strong><div><h3>{title}</h3><p>{description}</p></div></section>)}</div>
      <div className="guide-note"><strong>Jangan buang token.</strong> Nombor pada token digunakan untuk memadankan anda dengan jalur foto yang telah dicetak.</div>
      <a className="original-link" href="/media/guest-guide-photo-flow.webp" target="_blank" rel="noopener noreferrer">Lihat poster asal ↗</a>
    </article>
    <a className="section-step" href="#pertandingan-kemuncak">Terokai pertandingan di Kemuncak <span>↓</span></a>
  </section>;
}
