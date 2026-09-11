import Link from '../../../components/SafeLink';
import { notFound } from 'next/navigation';
import BrandStrip from '../../../components/BrandStrip';
import HeroSlideshow from '../../../components/HeroSlideshow';
import JourneyLinks from '../../../components/JourneyLinks';
import { competitions, getCompetition } from '../../../lib/competitions';

export function generateStaticParams() {
  return competitions.map(competition => ({ slug: competition.slug }));
}

export default async function CompetitionDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const competition = getCompetition(slug);
  if (!competition) notFound();

  return <main className="competition-detail route-page">
    <header className="route-nav route-nav-overlay"><Link href="/kemuncak">PUICE <span>2026</span></Link><Link href="/pertandingan">← Semua Pertandingan</Link></header>
    <section className="detail-photo-hero">
      <HeroSlideshow images={competition.heroImages} />
      <div className="hero-slideshow-overlay hero-overlay-standard" aria-hidden="true" />
      <div className="detail-hero-copy">
        <p className="route-eyebrow">{competition.audience} · {competition.status}</p>
        <h1>{competition.officialName}</h1>
        <p>{competition.tagline}</p>
        <div className="detail-meta"><span>PUICE 2026</span><span>•</span><span>Petaling Utama</span><span>•</span><span>{competition.phase === 'PRA_ACARA' ? 'Pra-Acara PUICE 2026' : 'Kemuncak PUICE 2026'}</span></div>
        {competition.heroImages.length > 1 && <small>{competition.heroImages.length} FOTO · BERTUKAR SETIAP 5 SAAT</small>}
      </div>
    </section>
    <section className="detail-content">
      <div className="detail-about"><h2>Tentang<br /><span>Pertandingan</span></h2><p>{competition.description}</p></div>
      <div className="detail-block"><p className="route-eyebrow dark">FORMAT PERTANDINGAN</p><h2>Bagaimana ia<br /><span>berlangsung.</span></h2><div className="detail-grid">{competition.format.map((item, index) => <article key={item}><b>0{index + 1}</b><p>{item}</p></article>)}</div></div>
      <div className="detail-block"><p className="route-eyebrow dark">PERJALANAN PERTANDINGAN</p><h2>Dari idea ke<br /><span>Kemuncak.</span></h2><div className="detail-grid">{competition.journey.map((item, index) => <article key={item}><b>0{index + 1}</b><p>{item}</p></article>)}</div></div>
      <div className="detail-summit"><p className="route-eyebrow">KEMUNCAK PUICE 2026</p><h2>Kembali ke <span>pentas.</span></h2><p>{competition.kemuncak}</p><small>🔒 Keputusan mengikut pengumuman rasmi</small></div>
    </section>
    <JourneyLinks title="Ikuti perjalanan pertandingan ini hingga pengiktirafan." primary={{ label: 'Lihat Peserta', href: '/peserta' }} secondary={{ label: 'Lihat Keputusan', href: '/keputusan' }} />
    <BrandStrip />
  </main>;
}
