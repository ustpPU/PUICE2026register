'use client';

import Link from '../../components/SafeLink';
import { useEffect, useMemo, useState } from 'react';
import BrandStrip from '../../components/BrandStrip';
import HeroSlideshow from '../../components/HeroSlideshow';
import JourneyLinks from '../../components/JourneyLinks';
import { participants } from '../../lib/site-data';
import { competitions } from '../../lib/competitions';
import { media } from '../../lib/media';

export default function Participants() {
  const [query, setQuery] = useState('');
  const [audience, setAudience] = useState('SEMUA');
  const [records, setRecords] = useState(participants);

  useEffect(() => {
    fetch('/api/public-data/Participants')
      .then(async response => await response.json() as { rows?: Record<string, string>[] })
      .then(data => {
        if (!data.rows?.length) return;
        const next = data.rows
          .filter(row => String(row.public_visibility).trim().toUpperCase() === 'TRUE')
          .sort((a, b) => Number(String(b.featured).trim().toUpperCase() === 'TRUE') - Number(String(a.featured).trim().toUpperCase() === 'TRUE'))
          .map(row => ({
          id: row.participant_id,
          name: row.display_name,
          school: row.school_name,
          competition: competitions.find(item => item.slug === row.competition_id)?.officialName ?? row.competition_id,
          audience: row.audience,
        }));
        if (next.length) setRecords(next);
      })
      .catch(() => undefined);
  }, []);

  const visible = useMemo(() => records.filter(participant => {
    const haystack = `${participant.name} ${participant.school} ${participant.competition}`.toLowerCase();
    return (audience === 'SEMUA' || participant.audience === audience) && haystack.includes(query.toLowerCase());
  }), [query, audience, records]);

  return <main className="participants-page route-page">
    <header className="route-nav"><Link href="/kemuncak">PUiCE <span>2026</span></Link><Link href="/kemuncak">← Kemuncak</Link></header>
    <section className="route-hero">
      <HeroSlideshow images={media.home} />
      <div className="hero-slideshow-overlay hero-overlay-standard" aria-hidden="true" />
      <div className="route-hero-copy"><p className="route-eyebrow">PESERTA</p><h1>Mereka yang<br />membawa <span>idea</span><br />ke pentas.</h1><p>Cari peserta, pasukan, sekolah atau pertandingan dalam direktori PUiCE 2026.</p></div>
    </section>
    <section className="directory-content">
      <label className="directory-search"><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Cari nama, pasukan, sekolah atau pertandingan..." aria-label="Cari peserta" /><b>⌕</b></label>
      <div className="filter-buttons"><button type="button" className={audience === 'SEMUA' ? 'active' : ''} onClick={() => setAudience('SEMUA')}>Semua</button><button type="button" className={audience === 'GURU' ? 'active' : ''} onClick={() => setAudience('GURU')}>Guru</button><button type="button" className={audience === 'MURID' ? 'active' : ''} onClick={() => setAudience('MURID')}>Murid</button></div>
      <p className="record-count">{visible.length} REKOD DIPAPARKAN</p>
      {visible.length ? <div className="participant-grid">{visible.map(participant => <article className="participant-card" key={participant.id}><div><span>{participant.audience}</span><h2>{participant.name}</h2><p>{participant.school}</p></div><small>{participant.competition}</small></article>)}</div> : <div className="no-results"><b>TIADA PADANAN</b><p>Cuba kata carian atau kategori lain.</p></div>}
      <div className="privacy-note"><b>PRIVASI DATA</b><p>Hanya rekod dengan <code>public_visibility = TRUE</code> dipaparkan. Nombor telefon, e-mel dan data peribadi tidak dipaparkan.</p></div>
    </section>
    <JourneyLinks title="Daripada penyertaan kepada pengiktirafan." primary={{ label: 'Terokai Pertandingan', href: '/pertandingan' }} secondary={{ label: 'Lihat Keputusan', href: '/keputusan' }} />
    <BrandStrip />
  </main>;
}
