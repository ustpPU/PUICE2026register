export const media = {
  home: Array.from({ length: 8 }, (_, index) => `/media/2026/home-hero-${index + 1}.jpg`),
  about: Array.from({ length: 4 }, (_, index) => `/media/2026/about-hero-${index + 1}.jpg`),
  preEvent: Array.from({ length: 4 }, (_, index) => `/media/2026/pre-event-hero-${index + 1}.jpg`),
  competitions: {
    ci3m: Array.from({ length: 4 }, (_, index) => `/media/2026/ci3m-hero-${index + 1}.jpg`),
    'inovasi-guru': Array.from({ length: 5 }, (_, index) => `/media/2026/inovasi-guru-hero-${index + 1}.jpg`),
    'kajian-tindakan': Array.from({ length: 2 }, (_, index) => `/media/2026/kajian-tindakan-hero-${index + 1}.jpg`),
    kmr: Array.from({ length: 3 }, (_, index) => `/media/2026/kmr-hero-${index + 1}.jpg`),
    pbl: Array.from({ length: 4 }, (_, index) => `/media/2026/pbl-hero-${index + 1}.jpg`),
    'pbl-stem': Array.from({ length: 3 }, (_, index) => `/media/2026/pbl-stem-hero-${index + 1}.jpg`),
    'poster-digital': ['/media/poster-digital-card.webp'],
  },
  summit: Array.from({ length: 4 }, (_, index) => `/media/2026/kemuncak-hero-${index + 1}.jpg`),
  registration: Array.from({ length: 2 }, (_, index) => `/media/2026/pendaftaran-hero-${index + 1}.jpg`),
  venue: Array.from({ length: 3 }, (_, index) => `/media/2026/lokasi-hero-${index + 1}.jpg`),
  results: Array.from({ length: 3 }, (_, index) => `/media/2026/keputusan-hero-${index + 1}.jpg`),
  archive: Array.from({ length: 2 }, (_, index) => `/media/2026/arkib-hero-${index + 1}.jpg`),
} as const;
