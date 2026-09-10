import Link from '../../components/SafeLink';
import BrandStrip from '../../components/BrandStrip';
import HeroSlideshow from '../../components/HeroSlideshow';
import JourneyLinks from '../../components/JourneyLinks';
import LiveArchiveCollections from '../../components/LiveArchiveCollections';
import GuestRegistration from '../../components/GuestRegistration';
import QuickSectionNav from '../../components/QuickSectionNav';
import { media } from '../../lib/media';
import { sitePath } from '../../lib/runtime-paths';

export default function Archive() {
  return <main className="archive-page route-page">
    <header className="route-nav route-nav-dark"><Link href="/arkib">PUiCE <span>2026</span></Link><Link href="/utama">Laman Utama PUiCE →</Link></header>
    <section className="route-hero">
      <HeroSlideshow images={media.archive} />
      <div className="hero-slideshow-overlay hero-overlay-standard" aria-hidden="true" />
      <div className="route-hero-copy"><p className="route-eyebrow">ARKIB PUiCE 2026</p><h1>Cerita PUiCE<br />tidak berakhir<br /><span>pada 10 September.</span></h1><p>Keputusan, projek, foto, video dan detik terbaik akan kekal sebagai rekod perjalanan PUiCE 2026.</p></div>
    </section>
    <QuickSectionNav links={[{ label: 'Maklum Balas', href: '#peringatan-maklum-balas' }, { label: 'Jana Sijil', href: '#maklum-balas' }, { label: 'Koleksi Arkib', href: '#koleksi-arkib' }, { label: 'Keputusan', href: '/keputusan' }]} />
    <section id="peringatan-maklum-balas" className="archive-feedback-reminder">
      <div><p className="route-eyebrow">UNTUK TETAMU YANG TELAH MENDAFTAR KEHADIRAN</p><h2>Lengkapkan perjalanan<br /><span>PUiCE 2026 anda.</span></h2></div>
      <div><p>Lengkapkan maklum balas menggunakan nombor telefon yang sama seperti semasa mendaftar kehadiran. Selepas selesai, sijil kehadiran digital boleh dijana dan dimuat turun terus ke peranti anda.</p><a className="button" href="#maklum-balas">Isi Maklum Balas &amp; Jana Sijil →</a></div>
    </section>
    <GuestRegistration variant="feedback-only" />
    <section id="koleksi-arkib" className="directory-content archive-content">
      <p className="route-eyebrow dark">PERJALANAN PUiCE 2026</p><h2 className="archive-heading">Dari Pra-Acara<br />ke <span>Kemuncak.</span></h2>
      <div className="archive-journey">
        <article style={{ backgroundImage: `linear-gradient(145deg,rgba(75,25,48,.35),rgba(35,16,39,.92)),url(${sitePath(media.preEvent[0])})` }}><b>19 OGOS 2026</b><h3>Pra-Acara PUiCE 2026</h3><p>CI3M dan PUiCE: Inovasi Guru memulakan perjalanan idea serta inovasi menuju Kemuncak.</p></article>
        <article style={{ backgroundImage: `linear-gradient(145deg,rgba(17,39,68,.35),rgba(17,39,68,.92)),url(${sitePath(media.summit[0])})` }}><b>10 SEPTEMBER 2026</b><h3>Kemuncak PUiCE 2026</h3><p>Pertandingan, Champion Showcase, Results Reveal dan penyampaian pengiktirafan.</p></article>
      </div>
      <p className="route-eyebrow dark">TEROKAI ARKIB</p><h2 className="archive-heading">Idea, pencapaian<br />dan <span>kenangan.</span></h2>
      <LiveArchiveCollections />
      <div className="archive-note"><b>ARKIB SEDANG DIBINA</b>Galeri Pra-Acara kini boleh dibuka melalui Google Photos. Foto Kemuncak, hasil pertandingan, projek, pemenang dan video akan ditambah selepas bahan rasmi diterima.</div>
    </section>
    <JourneyLinks title="Lihat pencapaian yang membentuk arkib ini." primary={{ label: 'Lihat Keputusan', href: '/keputusan' }} secondary={{ label: 'Kenali PUiCE', href: '/puice' }} />
    <BrandStrip />
  </main>;
}
