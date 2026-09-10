import Link from '../../components/SafeLink';
import BrandStrip from '../../components/BrandStrip';
import HeroSlideshow from '../../components/HeroSlideshow';
import JourneyLinks from '../../components/JourneyLinks';
import { media } from '../../lib/media';

export default function Puice() {
  return <main className="about-page route-page">
    <header className="route-nav"><Link href="/kemuncak">PUiCE <span>2026</span></Link><Link href="/kemuncak">← Kemuncak</Link></header>
    <section className="route-hero">
      <HeroSlideshow images={media.about} />
      <div className="hero-slideshow-overlay hero-overlay-standard" aria-hidden="true" />
      <div className="route-hero-copy"><p className="route-eyebrow">TENTANG PUiCE 2026</p><h1>Idea bertemu.<br /><span>Inovasi bermula.</span></h1><p>Pendidikan Masa Hadapan: Teknologi Memacu, Insan Memimpin.</p></div>
    </section>
    <section className="about-content">
      <div className="about-intro"><h2>Apa itu<br /><span>PUiCE?</span></h2><p>PUiCE menghimpunkan pendidik dan murid Petaling Utama untuk berkongsi idea, meneroka inovasi, mengangkat penyelidikan serta membina penyelesaian yang membentuk masa hadapan pendidikan.</p></div>
      <div className="about-block"><p className="route-eyebrow dark">SATU EKOSISTEM</p><h2>Untuk idea yang<br /><span>memberi impak.</span></h2><div className="about-card-grid"><article><b>01 · PENDIDIK</b><h3>Inovasi.<br />Inspirasi.</h3><p>Amalan baik, penyelidikan dan inovasi PdP yang memperkasa pembelajaran.</p></article><article><b>02 · MURID</b><h3>Cipta.<br />Selesaikan.</h3><p>Projek dan penyelesaian kepada cabaran kehidupan sebenar.</p></article><article><b>03 · KOMUNITI</b><h3>Kongsi.<br />Rayakan.</h3><p>Satu pentas untuk melihat idea berkembang menjadi pengiktirafan.</p></article></div></div>
      <div className="about-block"><p className="route-eyebrow dark">PERJALANAN PUiCE 2026</p><h2>Bukan satu hari.<br /><span>Satu perjalanan.</span></h2><div className="about-timeline"><article><b>JULAI — OGOS</b><h3>Persediaan</h3><p>Pendaftaran, pembangunan idea dan persediaan penyertaan.</p></article><article><b>19 OGOS</b><h3>Pra-Acara</h3><p>CI3M dan PUiCE: Inovasi Guru memulakan perjalanan menuju Kemuncak.</p></article><article><b>10 SEPTEMBER</b><h3>Kemuncak</h3><p>Pertandingan, Champion Showcase, Results Reveal dan pengiktirafan.</p></article></div></div>
    </section>
    <section className="about-closing"><p className="route-eyebrow">PUiCE 2026</p><h2>Satu acara.<br /><span>Pelbagai idea.</span><br />Masa hadapan untuk dibina.</h2><p>10 September 2026 · Dewan Sivik MBPJ</p></section>
    <JourneyLinks title="Tujuh pertandingan. Satu ekosistem idea." primary={{ label: 'Terokai Pertandingan', href: '/pertandingan' }} secondary={{ label: 'Pergi ke Kemuncak', href: '/kemuncak' }} />
    <BrandStrip />
  </main>;
}
