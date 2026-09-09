'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

export type ProgrammeEntry = {
  id: string;
  start: string;
  end: string;
  title: string;
  venue: string;
  type: string;
  details: string[];
};

type Period = 'PAGI' | 'PETANG';

function eventHour(value: string) {
  const match = value.match(/(\d{1,2})[.:](\d{2})/);
  if (!match) return 0;
  let hour = Number(match[1]);
  if (/petang/i.test(value) && hour < 12) hour += 12;
  if (/tengah hari/i.test(value) && hour < 12) hour += 12;
  return hour;
}

function eventTime(value: string) {
  const match = value.match(/(\d{1,2})[.:](\d{2})/);
  if (!match) return 0;
  const hour = eventHour(value);
  const minute = Number(match[2]);
  return new Date(`2026-09-10T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00+08:00`).getTime();
}

const isAfternoon = (item: ProgrammeEntry) => eventHour(item.start) >= 13;

export default function InteractiveProgramme({ items }: { items: ProgrammeEntry[] }) {
  const [period, setPeriod] = useState<Period>('PAGI');
  const [openId, setOpenId] = useState('');
  const [now, setNow] = useState(0);
  const initialized = useRef(false);
  const filtered = useMemo(() => items.filter((item) => period === 'PETANG' ? isAfternoon(item) : !isAfternoon(item)), [items, period]);

  useEffect(() => {
    const updateClock = () => {
      const timestamp = Date.now();
      setNow(timestamp);
      const active = items.find((item, index) => {
        const start = eventTime(item.start);
        const following = items[index + 1];
        const end = item.end ? eventTime(item.end) : following ? eventTime(following.start) : start + 60 * 60 * 1000;
        return timestamp >= start && timestamp < end;
      });
      if (active) {
        setPeriod(isAfternoon(active) ? 'PETANG' : 'PAGI');
        setOpenId(active.id);
      } else if (!initialized.current) {
        const firstStart = items[0] ? eventTime(items[0].start) : 0;
        const last = items[items.length - 1];
        if (timestamp < firstStart) {
          setPeriod('PAGI');
          setOpenId('');
        } else if (last) {
          setPeriod('PETANG');
          setOpenId(last.id);
        }
      }
      initialized.current = true;
    };
    updateClock();
    const timer = window.setInterval(updateClock, 60000);
    return () => window.clearInterval(timer);
  }, [items]);

  function choosePeriod(next: Period) {
    setPeriod(next);
    setOpenId('');
  }

  function statusFor(item: ProgrammeEntry) {
    const start = eventTime(item.start);
    const following = items[items.findIndex((entry) => entry.id === item.id) + 1];
    const end = item.end ? eventTime(item.end) : following ? eventTime(following.start) : start + 60 * 60 * 1000;
    if (now >= start && now < end) return 'LIVE';
    if (now >= end) return 'DONE';
    return 'UPCOMING';
  }

  return <div className="programme-accordion">
    <style>{`.programme-accordion{margin-top:42px}.programme-switch{display:inline-grid;grid-template-columns:1fr 1fr;padding:4px;background:#e5ddd1;border:1px solid #cfc5b7;margin-bottom:20px}.programme-switch button{min-width:130px;min-height:44px;border:0;background:transparent;color:#5b6574;font:inherit;font-size:11px;font-weight:800;letter-spacing:.1em;cursor:pointer}.programme-switch button.active{background:#132341;color:#f2c76e;box-shadow:0 6px 18px rgba(19,35,65,.18)}.programme-list-compact{border-top:1px solid #c9c0b4}.programme-row{border-bottom:1px solid #c9c0b4;background:rgba(255,255,255,.35)}.programme-row.is-live{border-left:4px solid #a74740;background:#fff}.programme-row.is-done{opacity:.58}.programme-row-button{width:100%;min-height:72px;padding:14px 17px;display:grid;grid-template-columns:145px minmax(0,1fr) auto auto;gap:20px;align-items:center;border:0;background:transparent;color:#132341;text-align:left;font:inherit;cursor:pointer}.programme-row-button:hover{background:rgba(255,255,255,.75)}.programme-row-button time{color:#a74740;font-size:13px;font-weight:800}.programme-row-title{font-size:17px;line-height:1.3;font-weight:700}.programme-badge{padding:7px 9px;background:#132341;color:#f2c76e;font-size:9px;font-weight:800;letter-spacing:.1em;white-space:nowrap}.is-live .programme-badge{background:#a74740;color:#fff}.is-done .programme-badge{background:#657081;color:#fff}.programme-toggle{width:32px;height:32px;display:grid;place-items:center;border:1px solid #aaa194;border-radius:50%;font-size:19px;font-weight:400;transition:transform .25s,background .25s}.programme-row.open .programme-toggle{transform:rotate(45deg);background:#132341;color:#f2c76e;border-color:#132341}.programme-detail{display:grid;grid-template-columns:145px minmax(0,1fr) 220px;gap:20px;padding:5px 65px 28px 17px;animation:programme-open .28s ease both}.programme-detail-spacer{min-height:1px}.programme-detail-main{border-left:2px solid #f2c76e;padding-left:20px}.programme-detail-main small{display:block;color:#8e5938;font-size:10px;font-weight:800;letter-spacing:.12em}.programme-detail-main ul{padding-left:18px;margin:13px 0 0;color:#596577;font-size:14px;line-height:1.55}.programme-detail-main li+li{margin-top:5px}.programme-location{align-self:start;padding:14px;border:1px solid #c5bcaf;background:#fff;color:#526174;font-size:12px;line-height:1.5}.programme-location b{display:block;margin-bottom:6px;color:#a74740;font-size:9px;letter-spacing:.12em}@keyframes programme-open{from{opacity:0;transform:translateY(-5px)}to{opacity:1;transform:none}}@media(max-width:760px){.programme-switch{display:grid;width:100%}.programme-switch button{min-width:0}.programme-row-button{grid-template-columns:95px minmax(0,1fr) 32px;gap:11px;padding:13px 8px}.programme-row-button time{font-size:11px}.programme-row-title{font-size:14px}.programme-badge{grid-column:2;padding:5px 7px;width:max-content}.programme-toggle{grid-column:3;grid-row:1 / span 2}.programme-detail{grid-template-columns:1fr;gap:14px;padding:2px 12px 24px 103px}.programme-detail-spacer{display:none}.programme-detail-main{padding-left:14px}.programme-location{width:100%}}@media(max-width:470px){.programme-row-button{grid-template-columns:78px minmax(0,1fr) 30px;padding-inline:4px}.programme-row-button time{line-height:1.35}.programme-detail{padding-left:82px}.programme-row-title{overflow-wrap:anywhere}}`}</style>
    <div className="programme-switch" role="tablist" aria-label="Pilih sesi atur cara">
      <button type="button" className={period === 'PAGI' ? 'active' : ''} onClick={() => choosePeriod('PAGI')} role="tab" aria-selected={period === 'PAGI'}>SESI PAGI</button>
      <button type="button" className={period === 'PETANG' ? 'active' : ''} onClick={() => choosePeriod('PETANG')} role="tab" aria-selected={period === 'PETANG'}>SESI PETANG</button>
    </div>
    <div className="programme-list-compact">
      {filtered.map((item) => {
        const isOpen = openId === item.id;
        const status = statusFor(item);
        const label = status === 'LIVE' ? 'SEDANG BERLANGSUNG' : '';
        return <article className={`programme-row ${isOpen ? 'open' : ''} is-${status.toLowerCase()}`} key={item.id}>
          <button type="button" className="programme-row-button" onClick={() => setOpenId(isOpen ? '' : item.id)} aria-expanded={isOpen} aria-controls={`programme-${item.id}`}>
            <time>{item.start}{item.end ? <><br />– {item.end}</> : null}</time>
            <span className="programme-row-title">{item.title}</span>
            {label ? <span className="programme-badge">{label}</span> : <span />}
            <span className="programme-toggle" aria-hidden="true">+</span>
          </button>
          {isOpen && <div id={`programme-${item.id}`} className="programme-detail">
            <span className="programme-detail-spacer" />
            <div className="programme-detail-main"><small>{item.type}</small>{item.details.length ? <ul>{item.details.map((detail) => <li key={detail}>{detail}</li>)}</ul> : <p>Tiada maklumat tambahan untuk acara ini.</p>}</div>
            <div className="programme-location"><b>LOKASI</b>{item.venue}</div>
          </div>}
        </article>;
      })}
    </div>
  </div>;
}
