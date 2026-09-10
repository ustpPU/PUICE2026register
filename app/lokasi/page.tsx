import Link from '../../components/SafeLink';
import BrandStrip from '../../components/BrandStrip';
import FloorPlanInteractive from '../../components/FloorPlanInteractive';
import HeroSlideshow from '../../components/HeroSlideshow';
import JourneyLinks from '../../components/JourneyLinks';
import { venues } from '../../lib/site-data';
import { media } from '../../lib/media';
import { sitePath } from '../../lib/runtime-paths';

const places = ['Pendaftaran', 'Pentas Utama', 'Pertandingan', 'Champion Showcase', 'Pameran', 'Makanan', 'Surau', 'Tandas'];

export default function Venue() {
  const locationHero = sitePath('/media/location-hero.webp');
  const locationHeroMobile = sitePath('/media/location-hero-mobile.webp');
  return <main className="venue-page">
    <style>{`.venue-page{min-height:100svh;background:#e3ecee;color:#11223d;font-family:Arial,Helvetica,sans-serif}.venue-page *{box-sizing:border-box}.venue-page a{text-decoration:none;color:inherit}.v-nav{height:78px;padding:0 clamp(24px,6vw,90px);display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,.22);background:#07162b;color:#fff}.brand{font-weight:bold;letter-spacing:.05em}.brand span{font-size:12px;color:#f2c76e}.venue-hero{min-height:clamp(560px,76svh,820px);padding:clamp(85px,12vw,150px) clamp(24px,9vw,135px);display:flex;flex-direction:column;justify-content:flex-end;color:#fff;background-image:linear-gradient(90deg,rgba(5,17,37,.94) 0%,rgba(5,17,37,.76) 43%,rgba(5,17,37,.22) 100%),linear-gradient(0deg,rgba(5,17,37,.58),transparent 48%),url('${locationHero}');background-position:center;background-size:cover}.eyebrow{font-size:11px;letter-spacing:.16em;color:#2e728b;margin:0 0 18px}.venue-hero .eyebrow{color:#f2c76e}.venue-hero h1{font-size:clamp(57px,9vw,130px);letter-spacing:-.1em;line-height:.78;text-transform:uppercase;margin:0;max-width:800px}.venue-hero h1 span{color:#f2c76e}.intro{max-width:550px;font-size:17px;line-height:1.6;color:#e7edf5;margin:36px 0}.quick{display:flex;flex-wrap:wrap;gap:9px;margin:0}.quick span{border:1px solid rgba(255,255,255,.42);background:rgba(5,17,37,.25);backdrop-filter:blur(5px);padding:10px 13px;font-size:12px}.v-main{padding:25px clamp(24px,9vw,135px) 100px}.info{display:grid;grid-template-columns:1fr 1.2fr;gap:70px;padding:85px 0 0}.info h2{font-size:clamp(36px,4.6vw,64px);line-height:.9;letter-spacing:-.07em;text-transform:uppercase;margin:0}.info h2 span{color:#2e728b}.info-list{border-top:1px solid rgba(17,34,61,.25)}.info-list div{padding:18px 0;border-bottom:1px solid rgba(17,34,61,.25);font-size:15px}.info-list b{display:block;color:#2e728b;font-size:10px;letter-spacing:.14em;margin-bottom:5px}@media(max-width:700px){.v-nav{padding:0 24px}.venue-hero{min-height:72svh;padding:90px 24px 56px;background-image:linear-gradient(180deg,rgba(5,17,37,.15) 0%,rgba(5,17,37,.45) 48%,rgba(5,17,37,.94) 82%),url('${locationHeroMobile}');background-position:center;background-size:cover}.venue-hero h1{font-size:clamp(52px,17vw,76px)}.venue-hero .intro{font-size:16px;margin:24px 0}.v-main{padding:10px 24px 75px}.info{grid-template-columns:1fr;gap:35px}}`}</style>
    <header className="v-nav"><Link className="brand" href="/kemuncak">PUiCE <span>2026</span></Link><Link href="/kemuncak">← Kemuncak</Link></header>
    <section className="venue-hero"><HeroSlideshow images={media.venue} /><div className="hero-slideshow-overlay hero-overlay-standard" aria-hidden="true" /><div className="hero-layer"><p className="eyebrow">LOKASI</p><h1>Dewan Sivik<br /><span>MBPJ</span></h1><p className="intro">Satu lokasi untuk pertandingan, Champion Showcase, pengumuman keputusan dan pengalaman Kemuncak PUiCE 2026.</p><div className="quick">{places.map(place => <span key={place}>{place}</span>)}</div></div></section>
    <section className="v-main"><FloorPlanInteractive /><div className="info"><div><p className="eyebrow">SEBELUM ANDA TIBA</p><h2>Cari hala<br /><span>tuju anda.</span></h2></div><div className="info-list">{venues.map((venue) => <div key={venue.name}><b>{venue.name} · {venue.location}</b>{venue.note}</div>)}<div><b>KEMUDAHAN</b>Parkir, surau, tandas dan pertolongan cemas akan ditandakan apabila maklumat rasmi diterima.</div></div></div></section>
    <JourneyLinks title="Sudah tahu lokasi? Rancang perjalanan hari anda." primary={{ label: 'Daftar Kehadiran', href: '/kemuncak#daftar' }} secondary={{ label: 'Semak Atur Cara', href: '/kemuncak#atur-cara' }} />
    <BrandStrip />
  </main>;
}
