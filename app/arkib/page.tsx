import Link from '../../components/SafeLink';
import BrandStrip from '../../components/BrandStrip';
import HeroSlideshow from '../../components/HeroSlideshow';
import JourneyLinks from '../../components/JourneyLinks';
import LiveArchiveCollections from '../../components/LiveArchiveCollections';
import GuestRegistration from '../../components/GuestRegistration';
import ArchiveVideos from '../../components/ArchiveVideos';
import CommitteeArchive from '../../components/CommitteeArchive';
import ArchiveChapterLinks from '../../components/ArchiveChapterLinks';
import { media } from '../../lib/media';
import { sitePath } from '../../lib/runtime-paths';

export default function Archive() {
  return <main className="archive-page route-page">
    <header className="route-nav route-nav-dark"><Link href="/arkib">PUICE <span>2026</span></Link><Link href="/utama">Laman Utama PUICE →</Link></header>
    <section id="arkib-utama" className="route-hero">
      <HeroSlideshow images={media.archive} />
      <div className="hero-slideshow-overlay hero-overlay-standard" aria-hidden="true" />
      <div className="route-hero-copy"><p className="route-eyebrow">ARKIB PUICE 2026</p><h1>Cerita PUICE<br />tidak berakhir<br /><span>pada 10 September.</span></h1><p>Keputusan, projek, foto, video dan detik terbaik akan kekal sebagai rekod perjalanan PUICE 2026.</p><a className="section-step" href="#peringatan-maklum-balas">Mulakan perjalanan Arkib <span>↓</span></a></div>
    </section>
    <section id="peringatan-maklum-balas" className="archive-feedback-reminder">
      <div><p className="route-eyebrow">UNTUK TETAMU YANG TELAH MENDAFTAR KEHADIRAN</p><h2>Lengkapkan perjalanan<br /><span>PUICE 2026 anda.</span></h2></div>
      <div><p>Lengkapkan maklum balas menggunakan nombor telefon yang sama seperti semasa mendaftar kehadiran. Selepas selesai, sijil kehadiran digital boleh dijana dan dimuat turun terus ke peranti anda.</p><a className="button" href="#maklum-balas">Isi Maklum Balas &amp; Jana Sijil →</a></div>
    </section>
    <GuestRegistration variant="feedback-only" />
    <ArchiveChapterLinks previous={{ label: 'Maklum Balas', href: '#peringatan-maklum-balas' }} next={{ label: 'Galeri & Kenangan', href: '#koleksi-arkib' }} />
    <section id="koleksi-arkib" className="directory-content archive-content">
      <p className="route-eyebrow dark">PERJALANAN PUICE 2026</p><h2 className="archive-heading">Dari Pra-Acara<br />ke <span>Kemuncak.</span></h2>
      <div className="archive-journey">
        <article style={{ backgroundImage: `linear-gradient(145deg,rgba(75,25,48,.35),rgba(35,16,39,.92)),url(${sitePath(media.preEvent[0])})` }}><b>19 OGOS 2026</b><h3>Pra-Acara PUICE 2026</h3><p>CI3M dan PUICE: Inovasi Guru memulakan perjalanan idea serta inovasi menuju Kemuncak.</p></article>
        <article style={{ backgroundImage: `linear-gradient(145deg,rgba(17,39,68,.35),rgba(17,39,68,.92)),url(${sitePath(media.summit[0])})` }}><b>10 SEPTEMBER 2026</b><h3>Kemuncak PUICE 2026</h3><p>Pertandingan, Champion Showcase, Results Reveal dan penyampaian pengiktirafan.</p></article>
      </div>
      <p className="route-eyebrow dark">TEROKAI ARKIB</p><h2 className="archive-heading">Idea, pencapaian<br />dan <span>kenangan.</span></h2>
      <LiveArchiveCollections />
      <div className="archive-note"><b>ARKIB SEDANG DIBINA</b>Galeri Pra-Acara kini boleh dibuka melalui Google Photos. Foto Kemuncak, hasil pertandingan, projek, pemenang dan video akan ditambah selepas bahan rasmi diterima.</div>
      <ArchiveChapterLinks previous={{ label: 'Maklum Balas & Sijil', href: '#maklum-balas' }} next={{ label: 'Video PUICE 2026', href: '#video-arkib' }} />
    </section>
    <ArchiveVideos />
    <ArchiveChapterLinks dark previous={{ label: 'Galeri & Kenangan', href: '#koleksi-arkib' }} next={{ label: 'Jawatankuasa PUICE', href: '#penghargaan' }} />
    <CommitteeArchive />
    <ArchiveChapterLinks previous={{ label: 'Video PUICE 2026', href: '#video-arkib' }} next={{ label: 'Ucapan Terima Kasih', href: '#terima-kasih' }} />
    <section id="terima-kasih" className="archive-thank-you"><p className="route-eyebrow">TERIMA KASIH</p><h2>Kerana menjadi sebahagian<br /><span>daripada perjalanan ini.</span></h2><p>Kepada tetamu, peserta, guru pengiring, pembentang, juri, pempamer, rakan strategik, jawatankuasa dan seluruh komuniti pendidikan Petaling Utama—kejayaan PUICE 2026 ialah kejayaan kita bersama.</p><nav className="archive-closing-links" aria-label="Teruskan dari penutup Arkib"><a href="#arkib-utama">Kembali ke permulaan ↑</a><Link href="/keputusan">Lihat keputusan →</Link></nav></section>
    <JourneyLinks title="Teruskan meneroka pencapaian yang membentuk arkib ini." primary={{ label: 'Lihat Keputusan', href: '/keputusan' }} secondary={{ label: 'Kenali PUICE', href: '/puice' }} />
    <BrandStrip />
  </main>;
}
