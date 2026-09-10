'use client';

import { useEffect, useState } from 'react';
import { programme } from '../lib/site-data';
import { publicSheetUrl } from '../lib/runtime-paths';
import InteractiveProgramme from './InteractiveProgramme';

type ProgrammeItem = (typeof programme)[number];

export default function LiveProgramme() {
  const [items, setItems] = useState<ProgrammeItem[]>(programme);
  useEffect(() => {
    Promise.all([fetch(publicSheetUrl('Programme'), { cache: 'no-store' }), fetch(publicSheetUrl('Venues'), { cache: 'no-store' })])
      .then(async ([programmeResponse, venuesResponse]) => {
        const [programmeData, venuesData] = await Promise.all([programmeResponse.json(), venuesResponse.json()]) as [{ rows?: Record<string, string>[] }, { rows?: Record<string, string>[] }];
        const rows = programmeData.rows ?? [];
        if (!rows.length) return;
        const venueNames = new Map((venuesData.rows ?? []).map(venue => [venue.venue_id, [venue.name_bm, venue.zone].filter(Boolean).join(' · ')]));
        setItems(rows.filter(item => item.published === 'TRUE').map(item => ({
          id: item.programme_id,
          start: item.start_time,
          end: item.end_time,
          title: item.title_bm,
          titleEn: item.title_en,
          venue: venueNames.get(item.venue_id) ?? item.venue_id,
          type: item.programme_type,
          details: (item.details_bm ?? '').split(' | ').filter(Boolean),
        })));
      })
      .catch(() => undefined);
  }, []);
  return <InteractiveProgramme items={items} />;
}
