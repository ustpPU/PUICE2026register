from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
source = Image.open(ROOT / "tmp" / "lokasi-hero" / "dewan-sivik.jpeg").convert("RGB")
output = ROOT / "public" / "media"

desktop = ImageOps.fit(source, (1920, 1080), method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))
desktop.save(output / "location-hero.webp", "WEBP", quality=86, method=6)

width, height = source.size
mobile_focus = source.crop((int(width * 0.035), 0, int(width * 0.57), height))
mobile = mobile_focus.resize((1080, 1350), Image.Resampling.LANCZOS)
mobile.save(output / "location-hero-mobile.webp", "WEBP", quality=86, method=6)

for name in ("location-hero.webp", "location-hero-mobile.webp"):
    path = output / name
    print(f"{name}\t{path.stat().st_size}")
