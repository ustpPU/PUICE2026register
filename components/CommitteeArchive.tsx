const coreCommittee = [
  { role: 'Pengerusi', name: 'Haniza binti Mohd Jabar @ Ibrahim', detail: 'Pegawai Pendidikan Daerah · Pejabat Pendidikan Daerah Petaling Utama' },
  { role: 'Naib Pengerusi I', name: 'Badieah binti Mustakin', detail: 'Timbalan PPD · Sektor Pembelajaran' },
  { role: 'Naib Pengerusi II', name: 'Hilwana binti Ahmad Sha’ari', detail: 'Timbalan PPD · Sektor Perancangan' },
  { role: 'Naib Pengerusi III', name: 'Norhafizah binti Ishak', detail: 'Timbalan PPD · Sektor Pengurusan Sekolah' },
  { role: 'Naib Pengerusi IV', name: 'Zaihasra binti Hasan', detail: 'Timbalan PPD · Sektor Pembangunan Murid' },
  { role: 'Penyelaras 1', name: 'Alex Leong Jun Wei', detail: 'Pegawai SISC+ Bahasa Melayu' },
  { role: 'Penyelaras 2', name: 'Maria Farinna binti Zainal Abidin', detail: 'Penolong PPD USTP' },
  { role: 'Setiausaha', name: 'Najwa Izzati binti Udin', detail: 'Penolong PPD Pendidikan Khas' },
  { role: 'Penolong Setiausaha', name: 'Sathiah a/p Shammugam', detail: 'Pegawai SISC+ Sains' },
  { role: 'Bendahari', name: 'Noor Lizawati binti Ibrahim', detail: 'Penolong PPD Pendidikan Islam' },
  { role: 'Penolong Bendahari', name: 'Normasitah binti Masri', detail: 'Pegawai SISC+ TVET' },
];

const workingCommittee = [
  ['Pengurus Majlis', 'Maria Farinna binti Zainal Abidin; Yusyahrul Nizar bin Md Yusof'],
  ['Pengurus Pentas', 'Muhammad Fatarullazi bin Hanipah'],
  ['Sambutan & Protokol', 'Hilwana binti Ahmad Sha’ari; Badieah binti Mustakin; Norhafizah binti Ishak; Zaihasra binti Hasan; Azlina binti Haji Shamsuddin; Mohamad Ilham bin Hanipah; Norsilawa binti Bohari; Norwati binti Abd Wahab; Normasitah binti Masri'],
  ['Pendaftaran, Beg Cenderamata & Lanyard', 'Julilah binti Haron (K); Noraliza binti Mustafa; Siti Ainul Bariah binti Ahmad Sanusi; Norabiatul Saadiah binti Soid; Nur Hazwani binti Jamari; Noor Aini binti Aminur Rashid; Suhaian Fasha binti Muhamad'],
  ['Tajaan', 'Wan Aida Sabreena binti Che Wan Bakar (K); Dr. Azlee bin Ab Rahim @ Ahmad; Najamuddin bin Khalani; Maria Farinna binti Zainal Abidin; Nazri bin Mohamad; Norhanim binti Zainudin'],
  ['Publisiti, Media, Fotografi & Reruai Gambar', 'Mohd Sharzy bin Osman (K); Muhamad Taufik bin Mohamad Sau; Ahmad Azril Nasreen bin Ahmad Azizan; Mohamad Azril bin Mohd Azmi; Salehudin bin Kustam; Muhammad Afiq bin Shahrul Ikhsan'],
  ['Teknikal & Siar Raya', 'Maria Farinna binti Zainal Abidin (K); Mohd Idaham bin Ibrahim; Mohd Fadzli Zaman bin Othman; Izaidin bin Zainudin (SMK SAS); Mohd Khairy Izuan bin Mohd Yusof (SMK SAS); Mohd Farhan bin Rosli (SK DJ1); Mohamad Haris bin Idris (SMK(P) TP); Ahmad Muhaimin bin Abdul Rahim (SK Methodist PJ); Ikmal Fauzi bin Ismail (SK Taman Megah); Sal Sablia binti Ramlan (SK1 SAS); Nor Ain binti Husni (SK1 SAS)'],
  ['Grafik, Multimedia & Montaj', 'Maria Farinna binti Zainal Abidin (K); Mohd Syahir Zaini bin Shahimi (SK DD2); Azrul bin Ahmad (SK DD2); Iqbal Anmam bin Zainal (SMK SAS); Ikmal Fauzi bin Ismail (SK Taman Megah)'],
  ['Dashboard', 'Ahmad Muhaimin bin Abdul Rahim; Nik Nur ‘Aliyah binti Mohd Kamarolzaman'],
  ['Dokumentasi', 'Najwa Izzati binti Udin; Sathiah a/p Shammugam; Nur Assyura binti Mohamad; Nurul Hatizrah binti Rusly; Munirah binti Md Aris'],
  ['Jamuan', 'Suhaibah binti Abdul Mutalib (K); Najwa Izzati binti Udin; Hairon Nadia binti Hashim; Rosna Adawiah binti Rosdi; Nur Shafiza binti Ahmad Rozi; Nor Mazwati binti Mamat; Nur Fahizah binti Mahayuddin; Kasturi a/p Muthalib; Mazatul Asmah binti Idris; Nur Afifah binti Yahaya'],
  ['Sijil & Hadiah', 'Noor Lizawati binti Ibrahim (K); Nurhafizah binti Ismail; Fatin Najihah binti Mohd Hairi; Halima binti Latara; Siti Hasmira binti Mohd Sani; Nor Adibah binti Abdullah'],
  ['Kebersihan, Keselamatan & Tempat Letak Kenderaan', 'Muhammad Syukry bin Muhammad Sabri (K); Mohd Azalan bin Mansor; Ismail Ridzuan bin Rassman; Mohd Jamil bin Mohd Napiah'],
  ['Peralatan & Pengangkutan', 'Nazri bin Mohamad (K); Fuad bin Abdullah; Azizi Hasrunizam bin Abd Rahim; Muhammad Zulhilmi bin Zakaria; Marzuki; Mohd Hanafi bin Hamzah; Muhammad Danial Iskandar bin Suhaimi; Aziz bin Azaman; Mohd Firdaus bin Kamaruddin'],
  ['Persiapan Tempat & Pentas', 'Najamuddin bin Khalani; Mohd Shah Rizal bin Mat Isa; Zulhilmi bin Mansor; Hisham bin Hamat; Muhammad Tajudin bin Mohd Kamaron; Zalzaliana binti Zainal; Nor Nadia binti Mohd Adam; Taraqqallah bin Saleh @ Kassim; Muhammad Badrulamin bin Amaludin; Mohd Razaki bin Mohamed Razali; Muhammad Zul Aiman bin Mohd Norizan'],
  ['Pengacaraan, Ikrar & Bacaan Doa', 'Alex Leong Jun Wei; Normawati binti Jasman; Syazanirfan bin Zulkafli (SMK Taman Dato’ Harun); Maizatul Aqilah binti Nordin (SK Bandar Baru Sri Damansara); Mohamad Hezwan bin Bahari (SJKC Chung Hwa Damansara)'],
  ['Teks Ucapan & Kata Alu-aluan', 'Alex Leong Jun Wei'],
  ['Persembahan', 'Kuhanis binti Mohamad Zain (K); Mohd Shah Rizal bin Md Isa'],
  ['Buku Program', 'Nadiah binti Jahidin (K); Norhanim binti Zainudin; Winawati binti Abdul Wahab'],
  ['Pengurus Penerima', 'Afiqah binti Nooh (K); Mohamad Syzwan bin Mat Salleh; Mohd Rapindi bin Sidik; Umi Hijrahwati binti Sujono; Maizatul Azwana binti Mohd Zaki; Maria Liza binti Norizaman'],
  ['Penerbitan Jurnal PUICE', 'Dr. Azlee bin Ab Rahim @ Ahmad'],
  ['Penyelaras Pembentangan & Pertandingan', 'Mohd Shah Rizal bin Mat Isa; Suhaibah binti Abdul Mutalib (Kajian Tindakan); Christina Thevamalar a/p A. Paul Raj; Julilah binti Haron (CI3M); Noor Lizawati binti Ibrahim (Inovasi Guru dan Pegawai); Nadiah binti Jahidin (PBL-STEM); Wan Aida Sabreena binti Che Wan Bakar; Normasitah binti Masri (KmR & PBL); Maria Farinna binti Zainal Abidin (Poster Digital)'],
] as const;

export default function CommitteeArchive() {
  return <section id="penghargaan" className="committee-archive">
    <div className="committee-heading"><div><p className="route-eyebrow">PENGHARGAAN</p><h2>Di sebalik<br /><span>PUICE 2026.</span></h2></div><p>Setinggi-tinggi penghargaan kepada Jawatankuasa Induk dan Jawatankuasa Pelaksana yang menyumbangkan masa, kepakaran dan komitmen bagi menjayakan seluruh perjalanan PUICE 2026.</p></div>
    <div className="committee-core"><h3>Jawatankuasa Induk</h3><div>{coreCommittee.map((member, index) => <article className={index === 0 ? 'committee-chair' : ''} key={member.role}><small>{member.role}</small><strong>{member.name}</strong><span>{member.detail}</span></article>)}</div></div>
    <div className="committee-working"><div className="committee-working-intro"><p className="route-eyebrow">JAWATANKUASA PELAKSANA</p><h3>Ramai insan.<br />Satu kejayaan.</h3><p>Buka setiap bahagian untuk melihat ahli jawatankuasa yang terlibat.</p></div><div className="committee-accordions">{workingCommittee.map(([unit, members], index) => <details key={unit} open={index === 0}><summary><span>{String(index + 1).padStart(2, '0')}</span><strong>{unit}</strong><b>+</b></summary><p>{members}</p></details>)}</div></div>
  </section>;
}
