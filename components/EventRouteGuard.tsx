'use client';

import { useEffect } from 'react';
import { GITHUB_SITE_BASE_PATH, GITHUB_SITE_ORIGIN, LEGACY_SITE_HOST, isPostEvent } from '../lib/event-routing';

export function LegacySiteRedirect() {
  useEffect(() => {
    if (window.location.hostname !== LEGACY_SITE_HOST) return;

    let pathname = window.location.pathname.replace(/\/+$/, '') || '/';
    if (pathname.startsWith(GITHUB_SITE_BASE_PATH)) pathname = pathname.slice(GITHUB_SITE_BASE_PATH.length) || '/';
    if (pathname === '/') pathname = isPostEvent() ? '/arkib' : '/kemuncak';

    window.location.replace(`${GITHUB_SITE_ORIGIN}${GITHUB_SITE_BASE_PATH}${pathname}${window.location.search}${window.location.hash}`);
  }, []);

  return null;
}
