import Link from '../../components/SafeLink';
import BrandStrip from '../../components/BrandStrip';
import HeroSlideshow from '../../components/HeroSlideshow';
import JourneyLinks from '../../components/JourneyLinks';
import ResultsDirectory, { type ResultAward, type ResultCompetition } from '../../components/ResultsDirectory';
import { competitions } from '../../lib/competitions';
import { readPublicSheet } from '../../lib/sheet-client';
import { media } from '../../lib/media';

export const dynamic = 'force-dynamic';

const preferredAwards = ['PLATINUM', 'EMAS', 'PERAK', 'GANGSA', 'ANUGERAH PENYERTAAN'];

function resultIsAvailable(record: Record<string, string>, now: number) {
  const state = String(record.result_state).trim().toUpperCase();
  if (state === 'AVAILABLE') return true;
  if (state !== 'SCHEDULED' || !record.reveal_at) return false;
  const revealTime = new Date(record.reveal_at).getTime();
  return Number.isFinite(revealTime) && now >= revealTime;
}

function awardOrder(name: string) {
  const position = preferredAwards.indexOf(name.toUpperCase());
  return position === -1 ? preferredAwards.length : position;
}

export default async function Results() {
  const [sheetResults, sheetParticipants] = await Promise.all([
    readPublicSheet('Results'),
    readPublicSheet('Participants'),
  ]);
  const now = new Date().getTime();
  const participantById = new Map(sheetParticipants.map(participant => [participant.participant_id, participant]));

  const displayResults: ResultCompetition[] = competitions.map(competition => {
    const records = sheetResults.filter(record => record.competition_id === competition.slug);
    const availableRecords = records.filter(record => record.participant_id && resultIsAvailable(record, now));
    const groupedAwards = new Map<string, typeof availableRecords>();

    for (const record of availableRecords) {
      const name = String(record.award || 'PENGIKTIRAFAN').trim().toUpperCase();
      groupedAwards.set(name, [...(groupedAwards.get(name) ?? []), record]);
    }

    const awards: ResultAward[] = [...groupedAwards.entries()]
      .sort(([awardA], [awardB]) => awardOrder(awardA) - awardOrder(awardB) || awardA.localeCompare(awardB, 'ms'))
      .map(([name, awardRecords]) => {
        const seen = new Set<string>();
        const recipients = awardRecords
          .sort((a, b) => Number(a.display_order || 9999) - Number(b.display_order || 9999))
          .filter(record => {
            if (seen.has(record.participant_id)) return false;
            seen.add(record.participant_id);
            return true;
          })
          .map(record => {
            const participant = participantById.get(record.participant_id);
            return {
              id: record.result_id || `${competition.slug}-${name}-${record.participant_id}`,
              name: participant?.display_name || record.participant_id,
              school: participant?.school_name || '',
              citation: record.citation_bm || '',
            };
          });
        return { name, recipients };
      });

    return {
      slug: competition.slug,
      name: competition.officialName,
      audience: competition.audience,
      awards,
      lockedCount: records.filter(record => record.participant_id && !resultIsAvailable(record, now)).length,
    };
  });

  return <main className="results-page route-page route-page-dark">
    <header className="route-nav route-nav-dark"><Link href="/kemuncak">PUiCE <span>2026</span></Link><Link href="/kemuncak">← Kemuncak</Link></header>
    <section className="route-hero">
      <HeroSlideshow images={media.results} />
      <div className="hero-slideshow-overlay hero-overlay-standard" aria-hidden="true" />
      <div className="route-hero-copy"><p className="route-eyebrow">RESULTS REVEAL</p><h1>Keputusan<br /><span>PUiCE 2026</span></h1><p>Pilih pertandingan dan kategori anugerah untuk melihat semua penerima. Tiada ranking dalam kategori yang sama.</p></div>
    </section>
    <section className="directory-content results-content">
      <ResultsDirectory groups={displayResults} />
      <div className="results-note"><b>MAKLUMAN PENTING</b>Nama penerima dipaparkan hanya selepas rekod ditetapkan sebagai <code>AVAILABLE</code>, atau apabila masa <code>SCHEDULED</code> telah tiba. Perubahan dalam Sheet akan masuk secara automatik selepas refresh.</div>
    </section>
    <JourneyLinks dark title="Simpan pencapaian ini dalam perjalanan PUiCE." primary={{ label: 'Terokai Arkib', href: '/arkib' }} secondary={{ label: 'Kembali ke Kemuncak', href: '/kemuncak' }} />
    <BrandStrip />
  </main>;
}
