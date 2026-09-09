from pathlib import Path
import shutil
import subprocess

from PIL import Image, ImageOps
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parents[1]
SOURCE_PDF = Path(r"D:\Downloadss\PUICE_2026_Buku_Program.pdf")
SOURCE_ATTENDANCE = Path(r"D:\Downloadss\makluman aturan kehadiran tetamu.jpeg")
SOURCE_PHOTO_FLOW = Path(r"D:\Downloadss\aturan aliran reruai foto.jpeg")

MEDIA = ROOT / "public" / "media"
PAGE_OUTPUT = MEDIA / "book-program" / "pages"
TEMP_RENDER = ROOT / "tmp" / "book-program-render"
PDF_OUTPUT = ROOT / "output" / "pdf" / "PUICE_2026_Buku_Program_Optimized.pdf"
PUBLIC_PDF = MEDIA / "buku-program-puice-2026.pdf"

PAGE_OUTPUT.mkdir(parents=True, exist_ok=True)
TEMP_RENDER.mkdir(parents=True, exist_ok=True)
PDF_OUTPUT.parent.mkdir(parents=True, exist_ok=True)

for old_file in TEMP_RENDER.glob("page-*.jpg"):
    old_file.unlink()

pdftoppm = shutil.which("pdftoppm")
if not pdftoppm:
    raise RuntimeError("pdftoppm is required")

subprocess.run(
    [pdftoppm, "-jpeg", "-r", "132", "-jpegopt", "quality=80", str(SOURCE_PDF), str(TEMP_RENDER / "page")],
    check=True,
)

rendered_pages = sorted(TEMP_RENDER.glob("page-*.jpg"))
if len(rendered_pages) != 48:
    raise RuntimeError(f"Expected 48 pages, found {len(rendered_pages)}")

for index, page_path in enumerate(rendered_pages, 1):
    image = Image.open(page_path).convert("RGB")
    image.save(PAGE_OUTPUT / f"page-{index:02d}.webp", "WEBP", quality=82, method=6)

page_width, page_height = 419.25, 595.5
pdf = canvas.Canvas(str(PDF_OUTPUT), pagesize=(page_width, page_height), pageCompression=1)
for page_path in rendered_pages:
    pdf.drawImage(str(page_path), 0, 0, width=page_width, height=page_height, preserveAspectRatio=True, anchor="c")
    pdf.showPage()
pdf.save()
shutil.copy2(PDF_OUTPUT, PUBLIC_PDF)

def optimize_poster(source: Path, target_name: str) -> None:
    image = ImageOps.exif_transpose(Image.open(source)).convert("RGB")
    if image.width > 1600:
        height = round(image.height * 1600 / image.width)
        image = image.resize((1600, height), Image.Resampling.LANCZOS)
    image.save(MEDIA / target_name, "WEBP", quality=86, method=6)


optimize_poster(SOURCE_ATTENDANCE, "guest-guide-attendance.webp")
optimize_poster(SOURCE_PHOTO_FLOW, "guest-guide-photo-flow.webp")

print(f"pages={len(rendered_pages)}")
print(f"optimized_pdf={PDF_OUTPUT.stat().st_size}")
print(f"public_pdf={PUBLIC_PDF.stat().st_size}")
