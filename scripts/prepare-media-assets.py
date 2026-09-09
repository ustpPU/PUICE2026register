from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "tmp" / "media-audit"
OUTPUT = ROOT / "public" / "media"
OUTPUT.mkdir(parents=True, exist_ok=True)

ASSETS = {
    "pre-event-feature.webp": ("pre_DSC02978.jpg", (1440, 900), (0.5, 0.46)),
    "pre-event-judging.webp": ("pre_DSC01882.jpg", (1080, 720), (0.5, 0.5)),
    "pre-event-venue.webp": ("pre_DSC02948.jpg", (1080, 720), (0.5, 0.48)),
    "pre-event-stage.webp": ("pre_DSC03329.jpg", (1080, 720), (0.48, 0.45)),
    "kmr-card.webp": ("kmr_DSC05733.jpg", (1080, 720), (0.45, 0.5)),
    "poster-digital-card.webp": ("ci3m_DSC01768.jpg", (1080, 720), (0.5, 0.44)),
}

for output_name, (source_name, size, centering) in ASSETS.items():
    image = Image.open(SOURCE / source_name).convert("RGB")
    image = ImageOps.fit(image, size, method=Image.Resampling.LANCZOS, centering=centering)
    output_path = OUTPUT / output_name
    image.save(output_path, "WEBP", quality=84, method=6)
    print(f"{output_path.name}\t{output_path.stat().st_size}")
