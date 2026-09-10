'use client';

import Link from '../../components/SafeLink';
import { useMemo, useState } from 'react';
import BrandStrip from '../../components/BrandStrip';
import HeroSlideshow from '../../components/HeroSlideshow';
import JourneyLinks from '../../components/JourneyLinks';
import { competitions } from '../../lib/competitions';
import { sitePath } from '../../lib/runtime-paths';

const filters = [['SEMUA', 'Semua'], ['GURU', 'Guru'], ['MURID', 'Murid'], ['PRA_ACARA', 'Pra-Acara'], ['PENILAIAN', 'Dalam Penilaian'], ['KEMUNCAK', 'Kemuncak']] as const;
const competitionHeroImages = competitions.map(item => item.heroImages[0]).filter(Boolean);

export default function Competitions() {
  const [filter, setFilter] = useState('SEMUA');
  const visible = useMemo(() => competitions.filter(item => filter === 'SEMUA' || item.audience === filter || item.phase === filter), [filter]);

  return <main className="competition-directory route-page">
    <header className="route-nav"><Link href="/kemuncak">PUiCE <span>2026</span></Link><Link href="/kemuncak">← Kemuncak</Link></header>
    <section className="route-hero">
      <HeroSlideshow images={competitionHeroImages} />
      <div className="hero-slideshow-overlay hero-overlay-standard" aria-hidden="true" />
      <div className="route-hero-copy"><p className="route-eyebrow">PUiCE 2026</p><h1>7<br /><span>Pertandingan</span></h1><p>Tujuh ruang untuk idea, inovasi, penyelidikan dan penyelesaian yang membentuk masa hadapan pendidikan.</p></div>
    </section>
    <section className="directory-content">
      <div className="filter-buttons">{filters.map(([value, label]) => <button type="button" className={filter === value ? 'active' : ''} onClick={() => setFilter(value)} key={value}>{label}</button>)}</div>
      <div className="competition-card-grid">{visible.map(item => <article className="competition-photo-card" key={item.slug}>
        <img src={sitePath(item.heroImages[0])} alt="" aria-hidden="true" />
        <div className="competition-card-shade" />
        <div className="competition-card-copy"><span>{item.audience}</span><h2>{item.officialName}</h2><p>{item.tagline}</p><small>● {item.status}</small><Link href={`/pertandingan/${item.slug}`}>Terokai pertandingan →</Link></div>
      </article>)}</div>
    </section>
    <JourneyLinks title="Kenali mereka yang membawa idea ke pentas." primary={{ label: 'Lihat Peserta', href: '/peserta' }} secondary={{ label: 'Semak Atur Cara', href: '/kemuncak#atur-cara' }} />
    <BrandStrip />
  </main>;
}
