import type { Metadata } from 'next';
import Link from '../../components/SafeLink';
import BrandStrip from '../../components/BrandStrip';

export const metadata: Metadata = {
  title: 'Buku Program Sedang Dikemas Kini',
  description: 'Buku Program PUiCE 2026 sedang dikemas kini.',
};

export default function ProgrammeBookUnavailable() {
  return <main style={{minHeight:'100svh',background:'#071328',color:'#fff',fontFamily:'Arial,Helvetica,sans-serif'}}>
    <header className="book-nav"><Link className="book-brand" href="/kemuncak">PUiCE <span>2026</span></Link><Link href="/kemuncak">← Kemuncak</Link></header>
    <section style={{minHeight:'72svh',padding:'clamp(130px,18vw,210px) clamp(24px,10vw,150px) 90px',background:'radial-gradient(circle at 75% 25%,rgba(167,71,64,.38),transparent 28%),linear-gradient(135deg,#071328,#26152e)'}}>
      <p className="eyebrow">MAKLUMAN</p>
      <h1 style={{maxWidth:900,fontSize:'clamp(48px,8vw,110px)',lineHeight:.88,letterSpacing:'-.075em',textTransform:'uppercase',margin:'0 0 28px'}}>Buku Program<br /><span style={{color:'#f2c76e'}}>Sedang Dikemas Kini</span></h1>
      <p style={{maxWidth:600,color:'#d4dceb',fontSize:17,lineHeight:1.65}}>Akses Buku Program ditutup sementara. Sila gunakan Atur Cara Kemuncak untuk maklumat acara yang terkini.</p>
      <Link className="button primary" href="/kemuncak#atur-cara">Lihat Atur Cara →</Link>
    </section>
    <BrandStrip dark />
  </main>;
}
