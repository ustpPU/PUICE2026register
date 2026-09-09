from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "tmp" / "media-audit"
OUTPUT = SOURCE / "contact-sheets"
OUTPUT.mkdir(parents=True, exist_ok=True)

font = ImageFont.load_default(size=22)
groups = sorted({p.stem.split("_", 1)[0] for p in SOURCE.glob("*.jpg")})

for group in groups:
    files = sorted(SOURCE.glob(f"{group}_*.jpg"))
    cols = 3
    tile_w, image_h, label_h = 480, 300, 48
    rows = (len(files) + cols - 1) // cols
    canvas = Image.new("RGB", (tile_w * cols, (image_h + label_h) * rows), "#09162d")
    draw = ImageDraw.Draw(canvas)
    for index, file in enumerate(files):
        image = Image.open(file).convert("RGB")
        image = ImageOps.fit(image, (tile_w, image_h), method=Image.Resampling.LANCZOS)
        x = (index % cols) * tile_w
        y = (index // cols) * (image_h + label_h)
        canvas.paste(image, (x, y))
        label = file.stem.removeprefix(f"{group}_")
        draw.text((x + 14, y + image_h + 10), label, fill="#f4c86f", font=font)
    canvas.save(OUTPUT / f"{group}.jpg", quality=88, optimize=True)
    print(OUTPUT / f"{group}.jpg")
