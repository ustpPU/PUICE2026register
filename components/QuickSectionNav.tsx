type QuickLink = {
  label: string;
  href: string;
};

export default function QuickSectionNav({ links }: { links: QuickLink[] }) {
  return <nav className="quick-section-nav" aria-label="Bahagian utama halaman">
    <div>{links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}</div>
  </nav>;
}
