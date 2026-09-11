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

const preEventVideo = {
  id: '7675682115857812757',
  eyebrow: 'SOROTAN · 19 OGOS 2026',
  title: 'Sorotan Pra-Acara PUICE 2026',
  description: 'Imbas kembali CI3M dan PUICE: Inovasi Guru yang membuka perjalanan PUICE 2026.',
  url: 'https://www.tiktok.com/@wasilahminda/video/7675682115857812757',
} as const;

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
      <article className="archive-video-card archive-video-card-tiktok">
        <div className="tiktok-frame"><iframe src={`https://www.tiktok.com/player/v1/${preEventVideo.id}?controls=1&description=1&music_info=0&rel=0`} title={preEventVideo.title} loading="lazy" allow="fullscreen; autoplay; encrypted-media; picture-in-picture" allowFullScreen /></div>
        <div><small>{preEventVideo.eyebrow}</small><h3>{preEventVideo.title}</h3><p>{preEventVideo.description}</p><a href={preEventVideo.url} target="_blank" rel="noopener noreferrer">Buka di TikTok ↗</a></div>
      </article>
      <article className="archive-video-card"><div className="video-frame"><iframe src={`https://www.youtube-nocookie.com/embed/${highlight.id}?rel=0`} title={highlight.title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div><div><small>{highlight.eyebrow}</small><h3>{highlight.title}</h3><p>{highlight.description}</p><a href={highlight.url} target="_blank" rel="noopener noreferrer">Buka di YouTube ↗</a></div></article>
    </div>
  </section>;
}
