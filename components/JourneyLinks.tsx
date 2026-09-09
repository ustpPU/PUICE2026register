import Link from 'next/link';

type JourneyLink = {
  label: string;
  href: string;
};

export default function JourneyLinks({ eyebrow = 'TERUSKAN PERJALANAN', title, primary, secondary, dark = false }: {
  eyebrow?: string;
  title: string;
  primary: JourneyLink;
  secondary?: JourneyLink;
  dark?: boolean;
}) {
  return <aside className={`journey-links${dark ? ' journey-links-dark' : ''}`} aria-label="Cadangan destinasi seterusnya">
    <div><small>{eyebrow}</small><h2>{title}</h2></div>
    <nav>
      <Link className="journey-primary" href={primary.href}>{primary.label}<span>→</span></Link>
      {secondary && <Link href={secondary.href}>{secondary.label}<span>↗</span></Link>}
    </nav>
  </aside>;
}
