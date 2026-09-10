'use client';

import Link from './SafeLink';
import { useEffect, useState } from 'react';

type Zone = {
  id: string;
  number: string;
  label: string;
  title: string;
  description: string;
  detail: string;
  href?: string;
  action?: string;
};

const zones: Zone[] = [
  { id: 'entrance', number: '01', label: 'Pintu masuk', title: 'Kemasukan & Pendaftaran', description: 'Mulakan perjalanan anda di pintu masuk sebelah kiri dewan sebelum menuju ke ruang utama.', detail: 'Daftar kehadiran terlebih dahulu pada hari Kemuncak.', href: '/kemuncak#daftar', action: 'Daftar kehadiran' },
  { id: 'stage', number: '02', label: 'Pentas utama', title: 'Pentas Utama', description: 'Lokasi Champion Showcase, pengumuman keputusan dan penyampaian hadiah PUiCE 2026.', detail: 'Terletak di bahagian hadapan dewan.' },
  { id: 'kmr', number: '03', label: 'Zon KmR', title: 'Kefahaman Melalui Reka Bentuk (KmR)', description: 'Zon pertandingan murid dengan 30 meja pameran berwarna hijau.', detail: '30 meja · Sebelah kiri dewan', href: '/pertandingan/kmr', action: 'Lihat pertandingan KmR' },
  { id: 'audience', number: '04', label: 'Ruang audiens', title: 'Ruang Audiens', description: 'Ruang tontonan utama untuk tetamu, peserta dan komuniti pendidikan.', detail: 'Anggaran ±350 kerusi · Tengah dewan' },
  { id: 'pbl', number: '05', label: 'Zon PBL', title: 'Pembelajaran Berasaskan Projek (PBL)', description: 'Zon pertandingan murid dengan 20 meja pameran berwarna jingga.', detail: '20 meja · Kanan atas', href: '/pertandingan/pbl', action: 'Lihat pertandingan PBL' },
  { id: 'pblstem', number: '06', label: 'Zon PBL-STEM', title: 'Pembelajaran Berasaskan Projek STEM (PBL-STEM)', description: 'Zon pertandingan murid dengan 20 meja pameran berwarna biru.', detail: '20 meja · Kanan bawah', href: '/pertandingan/pbl-stem', action: 'Lihat pertandingan PBL-STEM' },
  { id: 'booths', number: '07', label: 'Zon reruai', title: 'Ruang Reruai', description: 'Ruang pameran yang merangkumi 10 reruai kecil serta dua reruai besar dengan susunan L-shape.', detail: 'Bahagian belakang ruang audiens' },
  { id: 'technical', number: '08', label: 'Zon teknikal', title: 'JK Teknikal & Siar Raya', description: 'Pusat kawalan teknikal, audio visual dan penyelarasan siar raya sepanjang acara.', detail: 'Bahagian belakang tengah dewan' },
  { id: 'vip', number: '09', label: 'Ruang VIP', title: 'Ruang VIP', description: 'Dua sofa tetamu kehormat yang menghadap pentas utama.', detail: 'Hadapan ruang audiens' },
];

const hotspots = [
  { key: 'entrance', zone: 'entrance', className: 'entrance' },
  { key: 'stage', zone: 'stage', className: 'stage' },
  { key: 'kmr', zone: 'kmr', className: 'kmr' },
  { key: 'audience', zone: 'audience', className: 'audience' },
  { key: 'pbl', zone: 'pbl', className: 'pbl' },
  { key: 'pblstem', zone: 'pblstem', className: 'pblstem' },
  { key: 'booths-small', zone: 'booths', className: 'booths-small' },
  { key: 'booths-large-left', zone: 'booths', className: 'booths-large-left' },
  { key: 'booths-large-right', zone: 'booths', className: 'booths-large-right' },
  { key: 'technical', zone: 'technical', className: 'technical' },
  { key: 'vip', zone: 'vip', className: 'vip' },
];

const zoomLevels = [100, 125, 150, 175, 200];

export default function FloorPlanInteractive() {
  const [activeId, setActiveId] = useState('entrance');
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const active = zones.find((zone) => zone.id === activeId) ?? zones[0];

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsFullscreen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const changeZoom = (direction: number) => {
    const current = zoomLevels.indexOf(zoom);
    const next = Math.min(zoomLevels.length - 1, Math.max(0, current + direction));
    setZoom(zoomLevels[next]);
  };

  const renderMap = (expanded = false) => <div className={`floorplan-viewport${expanded ? ' expanded' : ''}`}>
    <div className={`floorplan-canvas zoom-${zoom}`}>
      <img src="/media/floor-plan-puice-2026.webp" alt="Pelan Dewan Kemuncak PUiCE 2026 di Dewan Sivik MBPJ" />
      {hotspots.map((hotspot) => {
        const zone = zones.find((item) => item.id === hotspot.zone)!;
        return <button
          type="button"
          key={hotspot.key}
          className={`map-hotspot ${hotspot.className}${activeId === zone.id ? ' active' : ''}`}
          aria-label={`${zone.number}. ${zone.title}`}
          aria-pressed={activeId === zone.id}
          onClick={() => setActiveId(zone.id)}
          onFocus={() => setActiveId(zone.id)}
          onPointerEnter={() => setActiveId(zone.id)}
        ><span>{zone.number}</span><b>{zone.label}</b></button>;
      })}
    </div>
  </div>;

  return <section className="floorplan-section" aria-labelledby="floorplan-heading">
    <style>{`.floorplan-section{margin-top:55px}.floorplan-kicker{font-size:11px;letter-spacing:.16em;color:#2e728b;margin:0 0 13px}.floorplan-heading-row{display:flex;justify-content:space-between;align-items:end;gap:25px;margin-bottom:24px}.floorplan-heading-row h2{font-size:clamp(34px,4.8vw,68px);line-height:.9;letter-spacing:-.07em;text-transform:uppercase;margin:0}.floorplan-heading-row h2 span{color:#2e728b}.floorplan-actions{display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end}.floorplan-actions button,.floorplan-actions a{appearance:none;border:1px solid rgba(17,34,61,.25);background:#f6f1e7;color:#11223d;padding:11px 14px;font:700 11px/1 Arial,sans-serif;letter-spacing:.04em;cursor:pointer}.floorplan-actions button:hover,.floorplan-actions button:focus-visible,.floorplan-actions a:hover,.floorplan-actions a:focus-visible{background:#11223d;color:#fff;outline:none}.zoom-readout{min-width:58px;text-align:center}.floorplan-layout{display:grid;grid-template-columns:minmax(0,1fr) 310px;background:#07162f;border:1px solid rgba(17,34,61,.18);box-shadow:0 25px 70px rgba(17,34,61,.16)}.floorplan-viewport{overflow:auto;background:#07162f;min-width:0}.floorplan-canvas{position:relative;width:100%;min-width:760px;transform-origin:top left;transition:width .25s ease}.floorplan-canvas.zoom-100{width:100%}.floorplan-canvas.zoom-125{width:125%}.floorplan-canvas.zoom-150{width:150%}.floorplan-canvas.zoom-175{width:175%}.floorplan-canvas.zoom-200{width:200%}.floorplan-canvas img{display:block;width:100%;height:auto}.map-hotspot{position:absolute;border:1px solid transparent;background:transparent;color:#fff;cursor:pointer;border-radius:4px;transition:background .2s,border-color .2s,box-shadow .2s}.map-hotspot span{position:absolute;left:8px;top:8px;display:grid;place-items:center;width:27px;height:27px;border-radius:50%;background:#07162f;color:#f2c76e;border:1px solid rgba(242,199,110,.7);font:bold 10px Arial,sans-serif;opacity:0;transform:scale(.8);transition:opacity .2s,transform .2s}.map-hotspot b{position:absolute;left:8px;bottom:8px;background:#07162f;color:#fff;padding:7px 9px;font:bold 9px Arial,sans-serif;letter-spacing:.05em;text-transform:uppercase;white-space:nowrap;opacity:0;transform:translateY(4px);transition:opacity .2s,transform .2s}.map-hotspot:hover,.map-hotspot:focus-visible,.map-hotspot.active{background:rgba(242,199,110,.13);border-color:#f2c76e;box-shadow:inset 0 0 0 2px rgba(242,199,110,.22),0 0 26px rgba(242,199,110,.2);outline:none}.map-hotspot:hover span,.map-hotspot:focus-visible span,.map-hotspot.active span,.map-hotspot:hover b,.map-hotspot:focus-visible b,.map-hotspot.active b{opacity:1;transform:none}.map-hotspot.entrance{left:1.5%;top:31%;width:14%;height:35%}.map-hotspot.stage{left:29%;top:16%;width:43%;height:18%}.map-hotspot.kmr{left:17%;top:22%;width:14%;height:44%}.map-hotspot.audience{left:31%;top:33%;width:43%;height:34%}.map-hotspot.pbl{left:77%;top:22%;width:16%;height:30%}.map-hotspot.pblstem{left:77%;top:52%;width:16%;height:27%}.map-hotspot.booths-small{left:23%;top:67%;width:61%;height:8%}.map-hotspot.booths-large-left{left:17%;top:75%;width:17%;height:14%}.map-hotspot.booths-large-right{left:70%;top:75%;width:18%;height:14%}.map-hotspot.technical{left:40%;top:75%;width:28%;height:14%}.map-hotspot.vip{left:40%;top:27%;width:23%;height:9%}.floorplan-panel{padding:28px 24px;background:#0b1d3c;color:#fff;border-left:1px solid rgba(255,255,255,.12);display:flex;flex-direction:column}.panel-number{font-size:11px;letter-spacing:.14em;color:#f2c76e}.floorplan-panel h3{font-size:28px;line-height:1.02;letter-spacing:-.05em;margin:24px 0 16px}.floorplan-panel p{font-size:14px;line-height:1.6;color:#d5deec;margin:0}.floorplan-panel .detail{margin-top:18px;padding-top:18px;border-top:1px solid rgba(255,255,255,.14);font-size:11px;letter-spacing:.06em;color:#f2c76e;text-transform:uppercase}.panel-link{display:inline-flex;margin-top:auto;padding:14px 15px;background:#f2c76e;color:#11223d!important;font-size:12px;font-weight:bold;align-items:center;justify-content:space-between;gap:12px}.zone-chips{display:flex;gap:8px;overflow-x:auto;padding:14px 0 2px;scrollbar-width:thin}.zone-chips button{flex:0 0 auto;border:1px solid rgba(17,34,61,.2);background:rgba(255,255,255,.34);color:#11223d;padding:9px 11px;font:700 10px Arial,sans-serif;cursor:pointer}.zone-chips button.active{background:#11223d;color:#f2c76e;border-color:#11223d}.floorplan-help{margin:12px 0 0;font-size:12px;color:#52677a}.fullscreen-map{position:fixed;inset:0;z-index:50;background:#07162f;padding:18px;display:flex;flex-direction:column}.fullscreen-topbar{display:flex;align-items:center;justify-content:space-between;color:#fff;padding:0 0 14px}.fullscreen-topbar strong{font-size:13px;letter-spacing:.08em}.fullscreen-topbar button{border:1px solid rgba(255,255,255,.35);background:transparent;color:#fff;padding:10px 13px;cursor:pointer}.fullscreen-map .floorplan-viewport{flex:1}.fullscreen-map .floorplan-canvas{min-width:900px}.fullscreen-map .expanded{display:flex;align-items:flex-start;justify-content:center}.fullscreen-map .expanded .floorplan-canvas.zoom-100{width:min(100%,1500px)}@media(max-width:950px){.floorplan-heading-row{align-items:flex-start;flex-direction:column}.floorplan-actions{justify-content:flex-start}.floorplan-layout{grid-template-columns:1fr}.floorplan-panel{border-left:0;border-top:1px solid rgba(255,255,255,.12);min-height:240px}.panel-link{margin-top:24px}.floorplan-canvas{min-width:680px}}@media(max-width:600px){.floorplan-section{margin-top:42px}.floorplan-actions{width:100%}.floorplan-actions button,.floorplan-actions a{flex:1;text-align:center;padding:11px 8px}.floorplan-layout{margin-left:-24px;margin-right:-24px}.floorplan-canvas{min-width:620px}.floorplan-panel{padding:24px}.floorplan-panel h3{font-size:25px}.map-hotspot b{display:none}.fullscreen-map{padding:10px}.fullscreen-map .floorplan-canvas{min-width:720px}}`}</style>
    <p className="floorplan-kicker">PELAN INTERAKTIF · KEMUNCAK PUiCE 2026</p>
    <div className="floorplan-heading-row">
      <h2 id="floorplan-heading">Terokai<br /><span>ruang acara.</span></h2>
      <div className="floorplan-actions" aria-label="Kawalan pelan">
        <button type="button" onClick={() => changeZoom(-1)} disabled={zoom === 100} aria-label="Kurangkan zum">−</button>
        <button type="button" className="zoom-readout" onClick={() => setZoom(100)} aria-label="Tetapkan semula zum">{zoom}%</button>
        <button type="button" onClick={() => changeZoom(1)} disabled={zoom === 200} aria-label="Tambah zum">+</button>
        <button type="button" onClick={() => setIsFullscreen(true)}>Skrin penuh</button>
        <a href="/media/floor-plan-puice-2026.pdf" download>Muat turun PDF</a>
      </div>
    </div>
    <div className="floorplan-layout">
      {renderMap()}
      <aside className="floorplan-panel" aria-live="polite">
        <span className="panel-number">ZON {active.number}</span>
        <h3>{active.title}</h3>
        <p>{active.description}</p>
        <p className="detail">{active.detail}</p>
        {active.href ? <Link className="panel-link" href={active.href}>{active.action}<span>→</span></Link> : null}
      </aside>
    </div>
    <div className="zone-chips" aria-label="Senarai zon pelan">
      {zones.map((zone) => <button type="button" key={zone.id} className={activeId === zone.id ? 'active' : ''} onClick={() => setActiveId(zone.id)}>{zone.number} · {zone.label}</button>)}
    </div>
    <p className="floorplan-help">Pilih zon pada pelan atau gunakan senarai di atas. Gunakan butang zum untuk melihat butiran dengan lebih dekat.</p>
    {isFullscreen ? <div className="fullscreen-map" role="dialog" aria-modal="true" aria-label="Pelan Dewan PUiCE 2026 dalam skrin penuh">
      <div className="fullscreen-topbar"><strong>PELAN DEWAN · KEMUNCAK PUiCE 2026</strong><button type="button" onClick={() => setIsFullscreen(false)}>Tutup ×</button></div>
      {renderMap(true)}
    </div> : null}
  </section>;
}
