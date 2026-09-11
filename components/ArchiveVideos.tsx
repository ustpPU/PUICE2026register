const videos = [
  {
    id: 't_lYYYphxK0',
    eyebrow: 'VIDEO UTAMA · PUICE 2026',
    title: 'Montaj Perasmian PUICE 2026',
    description: 'Montaj rasmi yang mengiringi detik perasmian PUICE 2026.',
    url: 'https://youtu.be/t_lYYYphxK0',
    main: true,
  },
  {
    id: 'j0mP2GQCqxI',
    eyebrow: 'SOROTAN · 10 SEPTEMBER 2026',
    title: 'Sorotan PUICE 2026',
    description: 'Imbas kembali suasana, pengalaman dan detik penting sepanjang Kemuncak PUICE 2026.',
    url: 'https://youtu.be/j0mP2GQCqxI',
    main: false,
  },
] as const;

export default function ArchiveVideos() {
  const main = videos[0];
  const highlight = videos[1];
  return <section id="video-arkib" className="archive-video-section">
    <div className="archive-video-heading"><div><p className="route-eyebrow">TONTON PUICE 2026</p><h2>Detik yang boleh<br /><span>ditonton semula.</span></h2></div><p>Daripada perjalanan Pra-Acara hingga hari Kemuncak, koleksi video ini merakam semangat, idea dan insan yang menjayakan PUICE 2026.</p></div>
    <article className="archive-video-main">
      <div className="video-frame"><iframe src={`https://www.youtube-nocookie.com/embed/${main.id}?rel=0`} title={main.title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div>
      <div><small>{main.eyebrow}</small><h3>{main.title}</h3><p>{main.description}</p><a href={main.url} target="_blank" rel="noopener noreferrer">Buka di YouTube ↗</a></div>
    </article>
    <div className="archive-video-grid">
      <article className="archive-video-card video-placeholder"><div className="video-placeholder-mark">01</div><div><small>SOROTAN · 19 OGOS 2026</small><h3>Sorotan Pra-Acara PUICE 2026</h3><p>Ruang video telah disediakan. Pautan rasmi akan dimasukkan kemudian.</p><span>AKAN DATANG</span></div></article>
      <article className="archive-video-card"><div className="video-frame"><iframe src={`https://www.youtube-nocookie.com/embed/${highlight.id}?rel=0`} title={highlight.title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div><div><small>{highlight.eyebrow}</small><h3>{highlight.title}</h3><p>{highlight.description}</p><a href={highlight.url} target="_blank" rel="noopener noreferrer">Buka di YouTube ↗</a></div></article>
    </div>
  </section>;
}
