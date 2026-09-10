from pathlib import Path
import shutil

from PIL import Image
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
PAGES = ROOT / "public" / "media" / "book-program" / "pages"
TEMP = ROOT / "tmp" / "pdfs" / "book-program"
OUTPUT = ROOT / "output" / "pdf" / "PUICE_2026_Buku_Program_Optimized.pdf"
PUBLIC = ROOT / "public" / "media" / "buku-program-puice-2026.pdf"

page_files = sorted(PAGES.glob("page-*.webp"))
if len(page_files) != 48:
    raise RuntimeError(f"Expected 48 pages, found {len(page_files)}")

TEMP.mkdir(parents=True, exist_ok=True)
OUTPUT.parent.mkdir(parents=True, exist_ok=True)
for old in TEMP.glob("page-*.jpg"):
    old.unlink()

jpegs = []
for index, source in enumerate(page_files, 1):
    target = TEMP / f"page-{index:02d}.jpg"
    with Image.open(source) as image:
        image.convert("RGB").save(target, "JPEG", quality=82, optimize=True, progressive=True)
    jpegs.append(target)

page_width, page_height = A4
pdf = canvas.Canvas(str(OUTPUT), pagesize=A4, pageCompression=1)
for image in jpegs:
    pdf.drawImage(
        str(image),
        0,
        0,
        width=page_width,
        height=page_height,
        preserveAspectRatio=True,
        anchor="c",
    )
    pdf.showPage()
pdf.save()
shutil.copy2(OUTPUT, PUBLIC)

print(f"pages={len(page_files)}")
print(f"pdf_bytes={PUBLIC.stat().st_size}")
