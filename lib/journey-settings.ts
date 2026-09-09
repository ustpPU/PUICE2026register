import { readPublicSheet } from './sheet-client';

export type JourneySettings = {
  testMode: boolean;
  attendanceEnabled: boolean;
  attendanceOpenAt: string;
  feedbackEnabled: boolean;
  feedbackOpenAt: string;
  certificateEnabled: boolean;
};

export const defaultJourneySettings: JourneySettings = {
  testMode: false,
  attendanceEnabled: true,
  attendanceOpenAt: '2026-09-10T08:00:00+08:00',
  feedbackEnabled: true,
  feedbackOpenAt: '2026-09-10T11:00:00+08:00',
  certificateEnabled: true,
};

function normalizeKey(value: string) {
  return value.trim().toLowerCase().replace(/[\s-]+/g, '_');
}

function parseBoolean(value: string | undefined, fallback: boolean) {
  if (value === undefined || value.trim() === '') return fallback;
  return ['TRUE', 'YES', 'YA', '1', 'ON', 'ENABLED'].includes(value.trim().toUpperCase());
}

function validDate(value: string | undefined, fallback: string) {
  if (!value || !Number.isFinite(new Date(value).getTime())) return fallback;
  return value;
}

export async function readJourneySettings(fresh = false): Promise<JourneySettings> {
  const rows = await readPublicSheet('Settings', { fresh });
  const settings = new Map<string, string>();

  for (const row of rows) {
    const values = Object.values(row);
    const key = row.setting_key || row.key || row.setting || row.name || values[0] || '';
    const value = row.setting_value || row.value || row.value_bm || values[1] || '';
    if (key) settings.set(normalizeKey(key), String(value));
  }

  const parsed = {
    testMode: parseBoolean(settings.get('test_mode'), defaultJourneySettings.testMode),
    attendanceEnabled: parseBoolean(settings.get('attendance_form_enabled'), defaultJourneySettings.attendanceEnabled),
    attendanceOpenAt: validDate(settings.get('attendance_open_at'), defaultJourneySettings.attendanceOpenAt),
    feedbackEnabled: parseBoolean(settings.get('feedback_form_enabled'), defaultJourneySettings.feedbackEnabled),
    feedbackOpenAt: validDate(settings.get('feedback_open_at'), defaultJourneySettings.feedbackOpenAt),
    certificateEnabled: parseBoolean(settings.get('certificate_enabled'), defaultJourneySettings.certificateEnabled),
  };

  // Local QA only: never affects a production deployment or the Sheet setting.
  if (process.env.PUICE_LOCAL_QA_MODE === 'true') {
    return { ...parsed, testMode: true };
  }
  return parsed;
}

export function journeyAccess(settings: JourneySettings, now = Date.now()) {
  const attendanceTime = new Date(settings.attendanceOpenAt).getTime();
  const feedbackTime = new Date(settings.feedbackOpenAt).getTime();
  return {
    attendanceOpen: settings.testMode || (settings.attendanceEnabled && now >= attendanceTime),
    feedbackOpen: settings.testMode || (settings.feedbackEnabled && now >= feedbackTime),
    certificateOpen: settings.testMode || settings.certificateEnabled,
  };
}
