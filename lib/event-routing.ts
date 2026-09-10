export const POST_EVENT_AT = '2026-09-10T20:00:00+08:00';
export const POST_EVENT_ACTIVE = true;
export const GITHUB_SITE_ORIGIN = 'https://ustppu.github.io';
export const GITHUB_SITE_BASE_PATH = '/puice2026utama';
export const LEGACY_SITE_HOST = 'puice-2026-utama.muhaiminrahim-work.chatgpt.site';

export function isPostEvent(now = Date.now()) {
  return POST_EVENT_ACTIVE || now >= new Date(POST_EVENT_AT).getTime();
}
