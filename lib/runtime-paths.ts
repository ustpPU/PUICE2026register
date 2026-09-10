const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const publicApiUrl = process.env.NEXT_PUBLIC_PUICE_API_URL ?? '';

export function sitePath(path: string) {
  if (!path.startsWith('/') || path.startsWith('//') || !basePath || path === basePath || path.startsWith(`${basePath}/`)) return path;
  return `${basePath}${path}`;
}

export function publicSheetUrl(tab: string) {
  return publicApiUrl
    ? `${publicApiUrl}?tab=${encodeURIComponent(tab)}`
    : sitePath(`/api/public-data/${encodeURIComponent(tab)}`);
}
