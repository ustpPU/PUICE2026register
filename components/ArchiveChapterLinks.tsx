type ChapterLink = {
  href: string;
  label: string;
};

export default function ArchiveChapterLinks({ previous, next, dark = false }: {
  previous?: ChapterLink;
  next: ChapterLink;
  dark?: boolean;
}) {
  return <nav className={`archive-chapter-links${dark ? ' archive-chapter-links-dark' : ''}`} aria-label="Navigasi antara seksyen Arkib">
    {previous ? <a className="archive-chapter-previous" href={previous.href}><span>←</span><small>SEBELUMNYA</small><strong>{previous.label}</strong></a> : <span />}
    <a className="archive-chapter-next" href={next.href}><small>SETERUSNYA</small><strong>{next.label}</strong><span>→</span></a>
  </nav>;
}
