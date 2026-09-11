import type { Metadata } from 'next';
import Link from '../../components/SafeLink';
import BrandStrip from '../../components/BrandStrip';
import ProgrammeBookReader from '../../components/ProgrammeBookReader';
import JourneyLinks from '../../components/JourneyLinks';
import { sitePath } from '../../lib/runtime-paths';

export const metadata: Metadata = {
  title: 'Buku Program Rasmi',
  description: 'Baca Buku Program Rasmi Kemuncak PUICE 2026.',
};

export default function ProgrammeBook() {
  return <main className="book-page">
    <style>{`.book-page{min-height:100svh;background:#071328;color:#fff;font-family:Arial,Helvetica,sans-serif;overflow-x:hidden}.book-page *{box-sizing:border-box}.book-page a{text-decoration:none;color:inherit}.book-nav{height:72px;position:sticky;top:0;z-index:10;padding:0 clamp(18px,5vw,70px);display:flex;align-items:center;justify-content:space-between;gap:18px;background:rgba(5,13,29,.94);backdrop-filter:blur(14px);border-bottom:1px solid rgba(255,255,255,.14)}.book-brand{font-weight:800;letter-spacing:.04em}.book-brand span{color:#f2c76e;font-size:11px}.book-actions{display:flex;align-items:center;gap:9px;font-size:11px}.book-actions a{padding:10px 12px;border:1px solid rgba(255,255,255,.3)}.book-actions .download{background:#f2c76e;color:#132341;border-color:#f2c76e;font-weight:800}.book-hero{padding:90px clamp(24px,10vw,150px);display:grid;grid-template-columns:minmax(0,1fr) minmax(260px,390px);gap:70px;align-items:center;background:radial-gradient(circle at 22% 20%,rgba(167,71,64,.38),transparent 28%),linear-gradient(135deg,#071328,#26152e)}.book-hero h1{font-size:clamp(52px,8vw,115px);line-height:.8;letter-spacing:-.075em;text-transform:uppercase;margin:0}.book-hero h1 span{color:#f2c76e}.book-hero p:not(.eyebrow){max-width:520px;color:#cdd6e5;font-size:17px;line-height:1.6;margin:30px 0}.book-meta{display:flex;flex-wrap:wrap;gap:8px}.book-meta span{border:1px solid rgba(255,255,255,.25);padding:10px 12px;font-size:10px;letter-spacing:.1em}.open-book{display:inline-flex;margin-top:18px;padding:14px 18px;background:#f2c76e;color:#132341!important;font-size:12px;font-weight:800}.book-cover{width:100%;box-shadow:0 35px 75px rgba(0,0,0,.45);transform:rotate(1.5deg)}.book-footer{padding:60px 24px;text-align:center;background:#0a1730}.book-footer p{color:#cbd5e4;line-height:1.6}.book-footer a{display:inline-flex;margin-top:12px;padding:14px 18px;background:#f2c76e;color:#132341;font-size:12px;font-weight:800}@media(max-width:760px){.book-nav{height:auto;min-height:66px;padding:10px 16px}.book-actions a:first-child{display:none}.book-actions a{padding:9px 10px}.book-hero{grid-template-columns:1fr;padding:65px 24px;gap:42px}.book-hero h1{font-size:clamp(40px,12.5vw,52px);line-height:.86;letter-spacing:-.055em}.book-cover{max-width:300px;margin:auto}.open-book{min-height:46px;align-items:center}.book-meta{gap:6px}.book-meta span{padding:9px 8px}}`}</style>
    <header className="book-nav"><Link className="book-brand" href="/kemuncak">PUICE <span>2026</span></Link><div className="book-actions"><Link href="/kemuncak">← Kemuncak</Link><a className="download" href={sitePath('/media/buku-program-puice-2026.pdf')} download>Muat turun PDF ↓</a></div></header>
    <section className="book-hero"><div><p className="eyebrow">BUKU PROGRAM RASMI</p><h1>Kemuncak<br /><span>PUICE 2026</span></h1><p>Atur cara, pengisian, pembentang, senarai peserta dan penghargaan dalam satu penerbitan rasmi.</p><div className="book-meta"><span>48 HALAMAN</span><span>FORMAT POTRET</span><span>10 SEPTEMBER 2026</span></div><a className="open-book" href="#reader-buku-program">Buka Buku Program ↓</a></div><img className="book-cover" src={sitePath('/media/book-program/pages/page-01.webp')} alt="Kulit Buku Program Rasmi PUICE 2026" /></section>
    <ProgrammeBookReader />
    <section className="book-footer"><p>Simpan buku program untuk rujukan semasa Kemuncak.</p><a href={sitePath('/media/buku-program-puice-2026.pdf')} download>Muat Turun PDF ↓</a></section>
    <JourneyLinks dark title="Daripada buku program kepada pengalaman sebenar." primary={{ label: 'Semak Atur Cara', href: '/kemuncak#atur-cara' }} secondary={{ label: 'Kembali ke Kemuncak', href: '/kemuncak' }} />
    <BrandStrip dark />
  </main>;
}
