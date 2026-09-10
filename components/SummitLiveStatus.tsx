'use client';

import { useEffect, useState } from 'react';
import { getEventMode, siteSettings } from '../lib/site-data';

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30000);
    return () => window.clearInterval(timer);
  }, []);
  const mode = getEventMode(now);
  const eventDay = new Date(siteSettings.eventDate).toLocaleDateString('en-CA', { timeZone: 'Asia/Kuala_Lumpur' });
  const currentDay = now.toLocaleDateString('en-CA', { timeZone: 'Asia/Kuala_Lumpur' });
  const days = currentDay === eventDay ? 0 : Math.max(1, Math.ceil((new Date(siteSettings.eventDate).getTime() - now.getTime()) / 86400000));
  return { mode, days };
}

export function SummitCountdown() {
  const { mode, days } = useClock();
  return <div className="countdown-box"><strong>{mode === 'PRE_EVENT' && days === 0 ? 'HARI INI' : mode === 'PRE_EVENT' ? days : mode === 'LIVE' ? 'LIVE' : 'ARKIB'}</strong><span>{mode === 'PRE_EVENT' && days === 0 ? <>PENDAFTARAN DIBUKA<br />8.00 PAGI</> : mode === 'PRE_EVENT' ? <>HARI LAGI<br />MENUJU KEMUNCAK</> : mode === 'LIVE' ? <>SEDANG BERLANGSUNG<br />HARI INI</> : <>PUiCE 2026<br />TERUS HIDUP</>}</span></div>;
}

export function SummitNowNext() {
  const { mode, days } = useClock();
  return <div className="now-next"><article><span>SEKARANG</span><h3>{mode === 'PRE_EVENT' && days === 0 ? 'Kemuncak berlangsung hari ini' : mode === 'PRE_EVENT' ? `Kemuncak bermula dalam ${days} hari` : mode === 'LIVE' ? 'Kemuncak PUiCE 2026 sedang berlangsung' : 'Kemuncak PUiCE 2026 telah berlangsung'}</h3><p>{mode === 'ARCHIVE' ? 'Terokai keputusan, projek, foto dan rekod perjalanan PUiCE 2026.' : 'Semak jadual, lokasi dan daftar kehadiran melalui dashboard ini.'}</p></article><article><span>{mode === 'ARCHIVE' ? 'ARKIB' : 'SETERUSNYA'}</span><h3>{mode === 'ARCHIVE' ? 'Keputusan, Projek, Foto & Video' : 'Pertandingan, Showcase & Results Reveal'}</h3><p>10 September 2026 · Dewan Sivik MBPJ</p></article></div>;
}
