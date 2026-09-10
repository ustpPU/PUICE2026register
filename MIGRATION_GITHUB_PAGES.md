# PUiCE 2026 — Pelan Migrasi GitHub Pages + Google Apps Script

Status: **disediakan, belum dilancarkan**.

## Seni bina sasaran

- Paparan awam: `https://ustppu.github.io/puice2026utama/`
- Kod dan deployment: GitHub Actions → GitHub Pages
- Data umum: Google Sheet → Google Apps Script → browser
- Kehadiran, maklum balas dan kelayakan sijil: browser → Google Apps Script → tab `Attendance`, `Feedback`, `Certificates`
- Sijil PDF: dijana pada peranti pengguna; fail tidak disimpan di GitHub, Apps Script atau Sheet.
- Laman Sites semasa dikekalkan sementara sebagai laluan rollback.

## Yang telah disediakan

- Static export untuk semua halaman dan tujuh slug pertandingan.
- Sokongan base path `/puice2026utama` untuk navigasi, gambar, PDF dan aset.
- Data peserta, keputusan, atur cara, lokasi, galeri dan tetapan borang dibaca secara langsung melalui Apps Script.
- Apps Script calon dengan allowlist medan awam, validasi, penguncian rekod, had kadar dan perlindungan formula Sheet.
- Workflow GitHub Pages serta pemeriksaan automatik sebelum deployment.
- Root GitHub Pages membuka halaman Kemuncak secara automatik.
- Reader buku program 48 halaman dan PDF web 8 MB.

## Urutan rollout selepas kelulusan

1. Simpan versi Apps Script semasa sebagai rollback.
2. Gantikan `Code.gs` dengan `integrations/google-apps-script/Code.github-pages.gs` dan kemas kini deployment Web App yang sama.
3. Uji `journey_settings`, `Participants`, `Results`, `Programme`, `Venues` dan `Gallery` pada URL `/exec`.
4. Jalankan satu rekod ujian kehadiran → carian nombor telefon → maklum balas → jana sijil; tandakan rekod sebagai ujian.
5. Merge cabang `migration/github-pages-gas` ke `main` dan push ke repo GitHub.
6. Pastikan GitHub Pages menggunakan **GitHub Actions** sebagai source.
7. Tunggu workflow hijau; uji desktop dan mobile pada URL GitHub.
8. Selepas semua ujian lulus, war-warkan URL GitHub. Kekalkan Sites sekurang-kurangnya sehingga tamat tempoh pemantauan.

## Semakan wajib sebelum pengumuman

- `/` membuka `/kemuncak/`.
- Semua pautan halaman, section dan butang kembali berfungsi.
- Hero, footer logo, floor plan, poster panduan dan 48 halaman buku program dimuatkan.
- `public_visibility = TRUE` sahaja muncul dalam Peserta.
- Keputusan hanya muncul untuk `AVAILABLE`, atau `SCHEDULED` selepas `reveal_at`.
- Penerima dalam anugerah yang sama dipaparkan tanpa ranking.
- Tetapan `test_mode`, `attendance_form_enabled`, `feedback_form_enabled`, masa buka dan `certificate_enabled` berfungsi.
- Nombor telefon yang sama boleh memulangkan beberapa nama.
- Sijil boleh dijana semula tanpa menyimpan PDF pada sistem.
- Tiada ralat JavaScript atau permintaan 404 pada desktop dan mobile.

## Rollback

Jika GitHub Pages atau Apps Script gagal, jangan ubah data Sheet. Pulihkan deployment Apps Script kepada versi sebelumnya dan gunakan semula URL Sites yang masih live. Oleh sebab kedua-dua frontend menggunakan tab Sheet yang sama, rekod kehadiran dan maklum balas tidak perlu dipindahkan.
