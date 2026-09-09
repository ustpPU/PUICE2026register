'use client';

import { useMemo, useState } from 'react';

export type ResultRecipient = {
  id: string;
  name: string;
  school: string;
  citation: string;
};

export type ResultAward = {
  name: string;
  recipients: ResultRecipient[];
};

export type ResultCompetition = {
  slug: string;
  name: string;
  audience: 'GURU' | 'MURID';
  awards: ResultAward[];
  lockedCount: number;
};

export default function ResultsDirectory({ groups }: { groups: ResultCompetition[] }) {
  const [audience, setAudience] = useState<'SEMUA' | 'GURU' | 'MURID'>('SEMUA');
  const [selectedCompetition, setSelectedCompetition] = useState(groups.find(group => group.awards.length)?.slug ?? groups[0]?.slug ?? '');
  const visibleGroups = useMemo(() => groups.filter(group => audience === 'SEMUA' || group.audience === audience), [audience, groups]);
  const selected = visibleGroups.find(group => group.slug === selectedCompetition) ?? visibleGroups[0];
  const [selectedAward, setSelectedAward] = useState('');
  const activeAward = selected?.awards.find(award => award.name === selectedAward) ?? selected?.awards[0];

  const chooseAudience = (value: 'SEMUA' | 'GURU' | 'MURID') => {
    setAudience(value);
    const first = groups.find(group => value === 'SEMUA' || group.audience === value);
    setSelectedCompetition(first?.slug ?? '');
    setSelectedAward('');
  };

  const chooseCompetition = (slug: string) => {
    setSelectedCompetition(slug);
    setSelectedAward('');
  };

  return <div className="results-directory">
    <div className="results-audience-filter" role="group" aria-label="Tapis komuniti">
      {(['SEMUA', 'GURU', 'MURID'] as const).map(value => <button key={value} className={audience === value ? 'active' : ''} onClick={() => chooseAudience(value)}>{value === 'SEMUA' ? 'Semua' : value === 'GURU' ? 'Guru' : 'Murid'}</button>)}
    </div>

    <div className="results-competition-picker" role="list" aria-label="Pilih pertandingan">
      {visibleGroups.map(group => {
        const recipientCount = group.awards.reduce((total, award) => total + award.recipients.length, 0);
        return <button role="listitem" key={group.slug} className={selected?.slug === group.slug ? 'active' : ''} onClick={() => chooseCompetition(group.slug)}>
          <span>{group.audience}</span>
          <strong>{group.name}</strong>
          <small>{recipientCount ? `${recipientCount} penerima · ${group.awards.length} anugerah` : 'Belum diumumkan'}</small>
        </button>;
      })}
    </div>

    {selected && <section className="result-stage" aria-live="polite">
      <header><div><span>{selected.audience} · KEPUTUSAN RASMI</span><h2>{selected.name}</h2></div><small>{selected.awards.reduce((total, award) => total + award.recipients.length, 0)} PENERIMA DIPAPARKAN</small></header>
      {selected.awards.length ? <>
        <div className="award-tabs" role="tablist" aria-label="Pilih anugerah">
          {selected.awards.map(award => <button role="tab" aria-selected={activeAward?.name === award.name} className={activeAward?.name === award.name ? 'active' : ''} key={award.name} onClick={() => setSelectedAward(award.name)}><span>{award.name}</span><b>{award.recipients.length}</b></button>)}
        </div>
        {activeAward && <div className="award-panel" role="tabpanel">
          <div className="award-panel-heading"><small>ANUGERAH</small><h3>{activeAward.name}</h3><p>Semua penerima disenaraikan setara tanpa kedudukan atau ranking.</p></div>
          <div className="recipient-list">{activeAward.recipients.map(recipient => <article key={recipient.id}>
            <div><h4>{recipient.name}</h4><p>{recipient.school || 'Institusi akan dikemas kini'}</p></div>
            {recipient.citation && <small>{recipient.citation}</small>}
          </article>)}</div>
        </div>}
      </> : <div className="results-empty"><b>KEPUTUSAN BELUM DIUMUMKAN</b><p>Nama penerima akan muncul di ruang ini apabila rekod dilengkapkan dan dibuka dalam Sheet.</p></div>}
      {selected.lockedCount > 0 && <p className="locked-summary">🔒 {selected.lockedCount} rekod lagi masih menunggu pengumuman rasmi.</p>}
    </section>}
  </div>;
}
