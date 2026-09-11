import { sitePath } from '../lib/runtime-paths';

export default function SiteFooter() {
  return <footer className="puice-footer">
    <div className="puice-footer-logos" aria-label="Penganjur dan rakan strategik">
      <img src={sitePath('/brand/logo-set-puice.png')} alt="OUM, MBPJ, PUICE 2026, Pejabat Pendidikan Daerah Petaling Utama, MBI dan MMU" />
    </div>
    <div className="puice-footer-credit">© Unit Sumber Teknologi Pendidikan PPDPU <span>|</span> PUICE 2026</div>
  </footer>;
}
