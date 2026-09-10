'use client';

import { useEffect, useState } from 'react';
import { galleryPlaceholders } from '../lib/site-data';
import { publicSheetUrl, sitePath } from '../lib/runtime-paths';

type GalleryItem = (typeof galleryPlaceholders)[number];

export default function LiveArchiveCollections() {
  const [gallery, setGallery] = useState<GalleryItem[]>(galleryPlaceholders);
  useEffect(() => {
    fetch(publicSheetUrl('Gallery'), { cache: 'no-store' })
      .then(async response => await response.json() as { rows?: Record<string, string>[] })
      .then(data => {
        const rows = (data.rows ?? []).filter(item => item.published === 'TRUE').map(item => ({ id: item.media_id, title: item.title_bm, category: item.category, image: item.media_url, albumUrl: item.album_url || item.external_url || '' }));
        if (rows.length) setGallery(rows);
      })
      .catch(() => undefined);
  }, []);

  return <div className="archive-collections">{gallery.map(item => item.albumUrl ? <a key={item.id} href={item.albumUrl} target="_blank" rel="noopener noreferrer" style={item.image ? { backgroundImage: `linear-gradient(145deg,rgba(35,16,39,.38),rgba(35,16,39,.88)),url(${sitePath(item.image)})` } : undefined}><span><small>{item.category}</small>{item.title}<em>Buka Google Photos ↗</em></span></a> : <article key={item.id} style={item.image ? { backgroundImage: `linear-gradient(145deg,rgba(35,16,39,.4),rgba(35,16,39,.9)),url(${sitePath(item.image)})` } : undefined}><span><small>{item.category}</small>{item.title}</span></article>)}</div>;
}
