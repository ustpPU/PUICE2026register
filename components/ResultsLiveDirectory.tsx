'use client';

import { useEffect, useState } from 'react';
import { competitions } from '../lib/competitions';
import { publicSheetUrl } from '../lib/runtime-paths';
import ResultsDirectory, { type ResultAward, type ResultCompetition } from './ResultsDirectory';

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

function buildGroups(sheetResults: Record<string, string>[], sheetParticipants: Record<string, string>[]) {
  const now = Date.now();
  const participantById = new Map(sheetParticipants.map(participant => [participant.participant_id, participant]));
  return competitions.map<ResultCompetition>(competition => {
    const records = sheetResults.filter(record => record.competition_id === competition.slug);
    const availableRecords = records.filter(record => record.participant_id && resultIsAvailable(record, now));
    const groupedAwards = new Map<string, typeof availableRecords>();
    for (const record of availableRecords) {
      const name = String(record.award || 'PENGIKTIRAFAN').trim().toUpperCase();
      groupedAwards.set(name, [...(groupedAwards.get(name) ?? []), record]);
    }
    const awards: ResultAward[] = [...groupedAwards.entries()]
      .sort(([a], [b]) => awardOrder(a) - awardOrder(b) || a.localeCompare(b, 'ms'))
      .map(([name, awardRecords]) => {
        const seen = new Set<string>();
        const recipients = awardRecords
          .sort((a, b) => Number(a.display_order || 9999) - Number(b.display_order || 9999))
          .filter(record => !seen.has(record.participant_id) && Boolean(seen.add(record.participant_id)))
          .map(record => {
            const participant = participantById.get(record.participant_id);
            return { id: record.result_id || `${competition.slug}-${name}-${record.participant_id}`, name: participant?.display_name || record.participant_id, school: participant?.school_name || '', citation: record.citation_bm || '' };
          });
        return { name, recipients };
      });
    return { slug: competition.slug, name: competition.officialName, audience: competition.audience, awards, lockedCount: records.filter(record => record.participant_id && !resultIsAvailable(record, now)).length };
  });
}

const emptyGroups = buildGroups([], []);

export default function ResultsLiveDirectory() {
  const [groups, setGroups] = useState(emptyGroups);
  useEffect(() => {
    Promise.all([fetch(publicSheetUrl('Results'), { cache: 'no-store' }), fetch(publicSheetUrl('Participants'), { cache: 'no-store' })])
      .then(async ([resultsResponse, participantsResponse]) => {
        const [results, participants] = await Promise.all([resultsResponse.json(), participantsResponse.json()]) as [{ rows?: Record<string, string>[] }, { rows?: Record<string, string>[] }];
        setGroups(buildGroups(results.rows ?? [], participants.rows ?? []));
      })
      .catch(() => undefined);
  }, []);
  return <ResultsDirectory groups={groups} />;
}
