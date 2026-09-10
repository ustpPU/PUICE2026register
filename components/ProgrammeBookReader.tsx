'use client';

import { useEffect, useRef, useState } from 'react';

const BOOK_PAGES = Array.from({ length: 48 }, (_, i) => i + 1)
  .filter((page) => page !== 4);

const TOTAL_PAGES = BOOK_PAGES.length;

function pageSource(displayPage: number) {
  const actualPage = BOOK_PAGES[displayPage - 1];

  return `/media/book-program/pages/page-${String(actualPage).padStart(2, '0')}.webp`;
}

export default function ProgrammeBookReader() {
  const [page, setPage] = useState(1);
  const touchStart = useRef<number | null>(null);

  const goTo = (next: number) => setPage(Math.max(1, Math.min(TOTAL_PAGES, next)));

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') setPage((value) => Math.max(1, value - 1));
      if (event.key === 'ArrowRight') setPage((value) => Math.min(TOTAL_PAGES, value + 1));
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    [page - 1, page + 1].filter((value) => value >= 1 && value <= TOTAL_PAGES).forEach((value) => {
      const image = new Image();
      image.src = pageSource(value);
    });
  }, [page]);

  return <section id="reader-buku-program" className="programme-reader" aria-label="Pembaca Buku Program PUiCE 2026">
    <style>{`.programme-reader{scroll-margin-top:72px;padding:62px clamp(12px,4vw,54px) 90px;background:#d9d5ce;color:#132341}.programme-reader *{box-sizing:border-box}.reader-title{max-width:1040px;margin:0 auto 24px;display:flex;justify-content:space-between;align-items:end;gap:20px}.reader-title h2{font-size:clamp(32px,5vw,58px);letter-spacing:-.06em;text-transform:uppercase;margin:0}.reader-title p{font-size:11px;letter-spacing:.11em;margin:0;color:#76523f}.reader-shell{max-width:1040px;margin:auto;background:#071328;border:1px solid rgba(255,255,255,.1);box-shadow:0 22px 65px rgba(19,35,65,.22)}.reader-toolbar{min-height:66px;padding:10px 14px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:12px;color:#fff;border-bottom:1px solid rgba(255,255,255,.13)}.reader-toolbar button{min-width:44px;min-height:44px;border:1px solid rgba(255,255,255,.28);background:transparent;color:#fff;font:inherit;font-size:12px;font-weight:800;cursor:pointer}.reader-toolbar button:hover:not(:disabled){background:#f2c76e;color:#132341;border-color:#f2c76e}.reader-toolbar button:disabled{opacity:.28;cursor:not-allowed}.reader-prev{justify-self:start}.reader-next{justify-self:end}.reader-count{text-align:center;font-size:12px;letter-spacing:.08em}.reader-count strong{color:#f2c76e}.reader-stage{height:clamp(440px,76svh,850px);min-height:0;padding:18px;display:grid;place-items:center;overflow:hidden;background:radial-gradient(circle at 50% 35%,#233452,#071328 72%);touch-action:pan-y}.reader-stage img{display:block;width:100%;height:100%;max-width:100%;max-height:100%;object-fit:contain;background:transparent;filter:drop-shadow(0 16px 25px rgba(0,0,0,.5));user-select:none}.reader-progress{padding:15px 18px 18px;display:grid;grid-template-columns:auto minmax(120px,1fr) auto;align-items:center;gap:14px;color:#fff}.reader-progress button{border:0;background:transparent;color:#f2c76e;font-size:11px;font-weight:800;cursor:pointer;padding:9px}.reader-progress input{width:100%;accent-color:#f2c76e;cursor:pointer}.reader-help{text-align:center;color:#69758a;font-size:11px;line-height:1.5;margin:16px 0 0}@media(max-width:700px){.programme-reader{padding:46px 8px 65px}.reader-title{padding:0 8px}.reader-title p{display:none}.reader-toolbar{grid-template-columns:52px 1fr 52px;padding:8px}.reader-toolbar button span{display:none}.reader-stage{height:clamp(390px,68svh,650px);min-height:0;padding:8px}.reader-progress{padding:12px 8px 14px;gap:5px}.reader-progress button{padding:8px 5px}.reader-help{padding:0 18px}}`}</style>
    <div className="reader-title"><h2>Baca buku program</h2><p>SATU HALAMAN PADA SATU MASA</p></div>
    <div className="reader-shell">
      <div className="reader-toolbar">
        <button className="reader-prev" type="button" onClick={() => goTo(page - 1)} disabled={page === 1} aria-label="Halaman sebelumnya">← <span>Sebelum</span></button>
        <div className="reader-count">HALAMAN <strong>{page}</strong> / {TOTAL_PAGES}</div>
        <button className="reader-next" type="button" onClick={() => goTo(page + 1)} disabled={page === TOTAL_PAGES} aria-label="Halaman seterusnya"><span>Seterusnya</span> →</button>
      </div>
      <div className="reader-stage" onTouchStart={(event) => { touchStart.current = event.changedTouches[0].clientX; }} onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const distance = event.changedTouches[0].clientX - touchStart.current;
        if (Math.abs(distance) > 48) goTo(page + (distance < 0 ? 1 : -1));
        touchStart.current = null;
      }}>
        <img key={page} src={pageSource(page)} alt={`Buku Program PUiCE 2026, halaman ${page}`} draggable={false} />
      </div>
      <div className="reader-progress"><button type="button" onClick={() => goTo(1)} disabled={page === 1}>MULA</button><input type="range" min="1" max={TOTAL_PAGES} value={page} onChange={(event) => goTo(Number(event.target.value))} aria-label="Pilih halaman buku program" /><button type="button" onClick={() => goTo(TOTAL_PAGES)} disabled={page === TOTAL_PAGES}>AKHIR</button></div>
    </div>
    <p className="reader-help">Leret kiri atau kanan pada telefon. Di desktop, gunakan butang atau kekunci anak panah.</p>
  </section>;
}
