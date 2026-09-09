export type EventMode = 'PRE_EVENT' | 'LIVE' | 'ARCHIVE';

export const siteSettings = {
  eventMode: 'PRE_EVENT' as EventMode,
  eventDate: '2026-09-10T08:00:00+08:00',
  eventEnd: '2026-09-10T17:00:00+08:00',
  venue: 'Dewan Sivik MBPJ',
  guestRegistrationEnabled: true,
  guestRegistrationLiveOnly: false,
  sheetId: '1adKb-ItpTjaa0e3zFIOQ8OippWMY6F6qMuEpgD_Qk5k',
  mediaDriveFolder: 'https://drive.google.com/drive/folders/1VnSttDE2QDk8PpwEg9bc34U_ArTTcH3B',
  preEventGalleryUrl: 'https://photos.app.goo.gl/XBYjoFezpjdV4mSb8',
};

export const programme = [
  { id: 'PR-001', start: '8.00 pagi', end: '', title: 'Pendaftaran dan Ketibaan Peserta', titleEn: 'Participant Registration and Arrival', venue: 'Lobi / Dewan Utama', type: 'REGISTRATION', details: ['Peserta dan pembentang melapor diri', 'Peserta mendaftar dan mengambil tempat', 'Tetamu undangan khas dan VIP dibawa ke ruang menunggu'] },
  { id: 'PR-002', start: '8.45 pagi', end: '', title: 'Ketibaan Tetamu Kehormat', titleEn: 'Arrival of Guests of Honour', venue: 'Lobi / Dewan Utama / Holding Room', type: 'ARRIVAL', details: ['Datuk Bandar atau Timbalan Datuk Bandar', 'Wakil atau Pengarah JPN Selangor', 'Wakil MBPJ, KPPD, empat Timbalan PPD, penyampai ucaptama dan SIP+'] },
  { id: 'PR-003', start: '8.55 pagi', end: '', title: 'Persediaan Akhir Majlis Pembukaan Rasmi', titleEn: 'Final Preparation for the Official Opening Ceremony', venue: 'Dewan Utama', type: 'CEREMONY', details: ['Hadirin mengambil tempat', 'Pengumuman persediaan majlis', 'Persediaan ketibaan tetamu kehormat, nyanyian lagu dan bacaan ikrar'] },
  { id: 'PR-004', start: '9.00 pagi', end: '', title: 'Majlis Perasmian Pembukaan', titleEn: 'Official Opening Ceremony', venue: 'Dewan Utama', type: 'CEREMONY', details: ['Perarakan masuk tetamu kehormat', 'Lagu Negaraku dan Lagu Negeri Selangor', 'Ikrar Rukun Negara, bacaan doa dan persembahan', 'Ucapan alu-aluan KPPD', 'Ucapan perasmian oleh YBhg. Dato’ Mohd Yazid bin Sairi, D.S.I.S., Datuk Bandar Petaling Jaya', 'Penyampaian cenderamata kepada perasmi', 'Penjurian KmR, PBL dan PBL-STEM bermula selepas ucapan perasmian, kira-kira 10.00 pagi'] },
  { id: 'PR-005', start: '10.00 pagi', end: '', title: 'Ucaptama', titleEn: 'Keynote Address', venue: 'Pentas Utama / Dewan', type: 'KEYNOTE', details: ['Oleh Profesor Dr. Salinah binti Ja’afar, Universiti Malaya', 'Penyampaian cenderamata kepada penyampai ucaptama oleh KPPD'] },
  { id: 'PR-006', start: '10.45 pagi', end: '', title: 'Pembentangan Pemenang Platinum Pertandingan Inovasi Kategori Pegawai', titleEn: 'Platinum Winner Presentation for the Officer Innovation Competition', venue: 'Pentas Utama / Dewan', type: 'SHOWCASE', details: [] },
  { id: 'PR-007', start: '11.00 pagi', end: '', title: 'Pembentangan Lima Pemenang Platinum Cetusan Inspirasi Tiga Minit', titleEn: 'Presentations by Five Platinum Winners of Cetusan Inspirasi Tiga Minit', venue: 'Pentas Utama / Dewan', type: 'SHOWCASE', details: [] },
  { id: 'PR-008', start: '11.20 pagi', end: '', title: 'Pembentangan Pemenang Platinum Pembentangan Kajian Tindakan', titleEn: 'Platinum Winner Presentation for Action Research', venue: 'Pentas Utama / Dewan', type: 'SHOWCASE', details: ['Penerima anugerah Poster Digital melapor diri'] },
  { id: 'PR-009', start: '11.35 pagi', end: '', title: 'Lawatan ke Reruai Pameran', titleEn: 'Exhibition Booth Visit', venue: 'Reruai / Ruang Pameran', type: 'EXHIBITION', details: ['Lawatan tetamu kehormat', 'Penerangan oleh peserta dan pempamer'] },
  { id: 'PR-010', start: '12.00 tengah hari', end: '1.00 petang', title: 'Pembentangan Amalan Terbaik Kepimpinan', titleEn: 'Leadership Best Practice Presentations', venue: 'Pentas Utama / Dewan', type: 'PRESENTATION', details: ['Kepimpinan Pengetua', 'Kepimpinan Guru Besar', 'Penyampaian cenderamata'] },
  { id: 'PR-011', start: '1.00 petang', end: '2.00 petang', title: 'Rehat, Jamuan dan Persediaan Majlis Penutupan Rasmi', titleEn: 'Break, Refreshments and Preparation for the Official Closing Ceremony', venue: 'Ruang Jamuan / Dewan', type: 'BREAK', details: [] },
  { id: 'PR-012', start: '2.00 petang', end: '', title: 'Ketibaan Tetamu Kehormat Majlis Penutupan Rasmi', titleEn: 'Arrival of the Guest of Honour for the Official Closing Ceremony', venue: 'Lobi / Dewan Utama', type: 'ARRIVAL', details: [] },
  { id: 'PR-013', start: '2.15 petang', end: '', title: 'Majlis Penutupan Rasmi', titleEn: 'Official Closing Ceremony', venue: 'Pentas Utama / Dewan', type: 'CEREMONY', details: ['Perarakan masuk tetamu kehormat, Tuan Ahmad Azri bin Zainal Nor, A.M.S., diiringi dif-dif kehormat', 'Persembahan', 'Ucapan perasmian penutupan oleh Tuan Ahmad Azri bin Zainal Nor, A.M.S.', 'Tayangan montaj PUiCE 2026'] },
  { id: 'PR-014', start: '3.00 petang', end: '', title: 'Upacara Penyampaian Hadiah', titleEn: 'Prize-Giving Ceremony', venue: 'Pentas Utama / Dewan', type: 'RESULTS', details: ['Sesi fotografi beramai-ramai bersama perasmi'] },
  { id: 'PR-015', start: '4.30 petang', end: '', title: 'Bersurai dan Pengurusan Selepas Majlis', titleEn: 'Dismissal and Post-Event Management', venue: 'Dewan Utama / Lobi', type: 'CLOSING', details: ['Tetamu dan peserta bersurai', 'Pengurusan reruai dan peralatan', 'Semakan akhir ruang program'] },
];

export const participants = [
  { id: 'P-001', name: 'Cikgu Nurul Izzati', school: 'SK Petaling Jaya', competition: 'PUiCE: Cetusan Inspirasi Tiga Minit (CI3M)', audience: 'GURU' },
  { id: 'P-002', name: 'Cikgu Aina Rahman', school: 'SK Damansara Utama', competition: 'PUiCE: Inovasi Guru', audience: 'GURU' },
  { id: 'P-003', name: 'Pasukan Inovasi Hijau', school: 'SMK Taman Tun Dr Ismail', competition: 'Pembelajaran Berasaskan Projek (PBL)', audience: 'MURID' },
  { id: 'P-004', name: 'STEM Explorers', school: 'SK Bukit Gasing', competition: 'Pembelajaran Berasaskan Projek STEM (PBL-STEM)', audience: 'MURID' },
  { id: 'P-005', name: 'Cikgu Siti Mariam', school: 'SK Sri Petaling', competition: 'Poster Digital', audience: 'GURU' },
  { id: 'P-006', name: 'Pasukan EcoNova', school: 'SMK Seksyen 4 Kota Damansara', competition: 'Pembelajaran Berasaskan Projek STEM (PBL-STEM)', audience: 'MURID' },
  { id: 'P-007', name: 'Cikgu Muhammad Farhan', school: 'SK Taman Megah', competition: 'Pembentangan Kajian Tindakan', audience: 'GURU' },
  { id: 'P-008', name: 'Pasukan Reka Cipta Muda', school: 'SK Kelana Jaya 1', competition: 'Kefahaman Melalui Reka Bentuk (KmR)', audience: 'MURID' },
  { id: 'P-009', name: 'Cikgu Kavitha Devi', school: 'SJK(T) Vivekananda', competition: 'PUiCE: Cetusan Inspirasi Tiga Minit (CI3M)', audience: 'GURU' },
  { id: 'P-010', name: 'Pasukan AquaSense', school: 'SMK Damansara Jaya', competition: 'Pembelajaran Berasaskan Projek (PBL)', audience: 'MURID' },
  { id: 'P-011', name: 'Cikgu Lee Wen Qi', school: 'SJK(C) Yuk Chai', competition: 'Poster Digital', audience: 'GURU' },
  { id: 'P-012', name: 'Pasukan Future Makers', school: 'SMK Bandar Utama Damansara 3', competition: 'Kefahaman Melalui Reka Bentuk (KmR)', audience: 'MURID' },
];

export const resultGroups = [
  { competition: 'PUiCE: Cetusan Inspirasi Tiga Minit (CI3M)', audience: 'GURU', visible: 'Gangsa & Perak telah diumumkan', locked: 'Emas & Platinum · Kemuncak' },
  { competition: 'PUiCE: Inovasi Guru', audience: 'GURU', visible: 'Gangsa & Perak telah diumumkan', locked: 'Emas & Platinum · Kemuncak' },
  { competition: 'Poster Digital', audience: 'GURU', visible: 'Dalam penilaian', locked: 'Semua anugerah · Kemuncak' },
  { competition: 'Pembentangan Kajian Tindakan', audience: 'GURU', visible: 'Menunggu pertandingan', locked: 'Semua anugerah · Kemuncak' },
  { competition: 'Kefahaman Melalui Reka Bentuk (KmR)', audience: 'MURID', visible: 'Berlangsung 10 September', locked: 'Selepas penilaian rasmi' },
  { competition: 'Pembelajaran Berasaskan Projek (PBL)', audience: 'MURID', visible: 'Berlangsung 10 September', locked: 'Selepas penilaian rasmi' },
  { competition: 'Pembelajaran Berasaskan Projek STEM (PBL-STEM)', audience: 'MURID', visible: 'Berlangsung 10 September', locked: 'Selepas penilaian rasmi' },
];

export const venues = [
  { name: 'Pendaftaran', location: 'Foyer utama', note: 'Daftar kehadiran dan dapatkan panduan acara.' },
  { name: 'Pentas Utama', location: 'Dewan Utama', note: 'Pembukaan, Champion Showcase, Results Reveal dan penutup.' },
  { name: 'Zon Pertandingan A', location: 'Zon A', note: 'KmR dan PBL.' },
  { name: 'Zon Pertandingan B', location: 'Zon B', note: 'Kajian Tindakan dan PBL-STEM.' },
  { name: 'Zon Pameran', location: 'Zon C', note: 'Inovasi, poster dan projek terpilih.' },
  { name: 'Ruang Rehat', location: 'Ruang Sampingan', note: 'Makanan, minuman dan ruang menunggu.' },
];

export const galleryPlaceholders = [
  { id: 'GA-001', title: 'Galeri Pra-Acara PUiCE 2026', category: '19 Ogos · CI3M & PUiCE: Inovasi Guru', image: '/media/pre-event-feature.webp', albumUrl: 'https://photos.app.goo.gl/XBYjoFezpjdV4mSb8' },
  { id: 'GA-002', title: 'Sorotan Penjurian', category: 'Pra-Acara · 19 Ogos', image: '/media/pre-event-judging.webp', albumUrl: 'https://photos.app.goo.gl/XBYjoFezpjdV4mSb8' },
  { id: 'GA-003', title: 'Pentas CI3M', category: 'Pra-Acara · 19 Ogos', image: '/media/pre-event-stage.webp', albumUrl: 'https://photos.app.goo.gl/XBYjoFezpjdV4mSb8' },
  { id: 'GA-004', title: 'Ruang Idea & Inovasi', category: 'Pra-Acara · 19 Ogos', image: '/media/pre-event-venue.webp', albumUrl: 'https://photos.app.goo.gl/XBYjoFezpjdV4mSb8' },
  { id: 'GA-005', title: 'Pemenang & Pengiktirafan', category: 'Kemuncak', image: '', albumUrl: '' },
  { id: 'GA-006', title: 'Foto & Video Rasmi', category: 'Arkib', image: '', albumUrl: '' },
];

export function getEventMode(now = new Date()): EventMode {
  const start = new Date(siteSettings.eventDate);
  const end = new Date(siteSettings.eventEnd);
  if (now >= end) return 'ARCHIVE';
  if (now >= start) return 'LIVE';
  return siteSettings.eventMode;
}

export const publicSheetTabs = ['Settings', 'Competitions', 'Participants', 'Results', 'Programme', 'Venues', 'Gallery', 'Highlights'];
