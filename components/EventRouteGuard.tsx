'use client';

import { useEffect } from 'react';
import { GITHUB_SITE_BASE_PATH, GITHUB_SITE_ORIGIN, LEGACY_SITE_HOST, POST_EVENT_AT, isPostEvent } from '../lib/event-routing';
import { sitePath } from '../lib/runtime-paths';

function runAtCutoff(callback: () => void) {
  callback();
  const delay = Math.max(0, new Date(POST_EVENT_AT).getTime() - Date.now());
  if (delay > 2_147_000_000) return undefined;
  return window.setTimeout(callback, delay + 250);
}

export function KemuncakArchiveGuard() {
  useEffect(() => {
    const redirect = () => {
      if (isPostEvent()) window.location.replace(sitePath('/arkib'));
    };
    const timer = runAtCutoff(redirect);
    return () => { if (timer !== undefined) window.clearTimeout(timer); };
  }, []);

  return null;
}

export function LegacySiteRedirect() {
  useEffect(() => {
    if (window.location.hostname !== LEGACY_SITE_HOST) return;

    let pathname = window.location.pathname.replace(/\/+$/, '') || '/';
    if (pathname.startsWith(GITHUB_SITE_BASE_PATH)) pathname = pathname.slice(GITHUB_SITE_BASE_PATH.length) || '/';
    if (pathname === '/' || (isPostEvent() && pathname === '/kemuncak')) pathname = isPostEvent() ? '/arkib' : '/kemuncak';

    window.location.replace(`${GITHUB_SITE_ORIGIN}${GITHUB_SITE_BASE_PATH}${pathname}${window.location.search}${window.location.hash}`);
  }, []);

  return null;
}
