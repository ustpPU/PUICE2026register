'use client';

import { useEffect, useState } from 'react';

const sections = [
  { id: 'arkib-utama', short: 'Mula', label: 'Permulaan Arkib' },
  { id: 'peringatan-maklum-balas', short: 'Maklum balas', label: 'Maklum Balas dan Sijil' },
  { id: 'koleksi-arkib', short: 'Galeri', label: 'Galeri Arkib' },
  { id: 'video-arkib', short: 'Video', label: 'Video PUICE 2026' },
  { id: 'penghargaan', short: 'Jawatankuasa', label: 'Penghargaan Jawatankuasa' },
  { id: 'terima-kasih', short: 'Terima kasih', label: 'Ucapan Terima Kasih' },
] as const;

export default function ArchiveSectionNavigator() {
  const [active, setActive] = useState<string>(sections[0].id);

  useEffect(() => {
    const targets = sections
      .map(section => document.getElementById(section.id))
      .filter((element): element is HTMLElement => Boolean(element));

    const observer = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setActive(visible.target.id);
    }, { rootMargin: '-18% 0px -58% 0px', threshold: [0, 0.15, 0.35] });

    targets.forEach(target => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return <nav className="archive-section-navigator" aria-label="Navigasi seksyen Arkib PUICE 2026">
    <span className="archive-navigator-title">ARKIB</span>
    <div>
      {sections.map((section, index) => <a
        key={section.id}
        href={`#${section.id}`}
        className={active === section.id ? 'active' : ''}
        aria-current={active === section.id ? 'location' : undefined}
        aria-label={`Pergi ke ${section.label}`}
        title={section.label}
      ><b>{String(index + 1).padStart(2, '0')}</b><span>{section.short}</span></a>)}
    </div>
  </nav>;
}
