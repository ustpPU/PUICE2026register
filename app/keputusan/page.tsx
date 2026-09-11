import Link from '../../components/SafeLink';
import BrandStrip from '../../components/BrandStrip';
import HeroSlideshow from '../../components/HeroSlideshow';
import JourneyLinks from '../../components/JourneyLinks';
import ResultsLiveDirectory from '../../components/ResultsLiveDirectory';
import { media } from '../../lib/media';

export default function Results() {
  return <main className="results-page route-page route-page-dark">
    <header className="route-nav route-nav-dark"><Link href="/kemuncak">PUICE <span>2026</span></Link><Link href="/kemuncak">← Kemuncak</Link></header>
    <section className="route-hero">
      <HeroSlideshow images={media.results} />
      <div className="hero-slideshow-overlay hero-overlay-standard" aria-hidden="true" />
      <div className="route-hero-copy"><p className="route-eyebrow">RESULTS REVEAL</p><h1>Keputusan<br /><span>PUICE 2026</span></h1><p>Pilih pertandingan dan kategori anugerah untuk melihat semua penerima. Tiada ranking dalam kategori yang sama.</p></div>
    </section>
    <section className="directory-content results-content">
      <ResultsLiveDirectory />
      <div className="results-note"><b>MAKLUMAN PENTING</b>Nama penerima dipaparkan hanya selepas rekod ditetapkan sebagai <code>AVAILABLE</code>, atau apabila masa <code>SCHEDULED</code> telah tiba. Perubahan dalam Sheet akan masuk secara automatik selepas refresh.</div>
    </section>
    <JourneyLinks dark title="Simpan pencapaian ini dalam perjalanan PUICE." primary={{ label: 'Terokai Arkib', href: '/arkib' }} secondary={{ label: 'Kembali ke Kemuncak', href: '/kemuncak' }} />
    <BrandStrip />
  </main>;
}
