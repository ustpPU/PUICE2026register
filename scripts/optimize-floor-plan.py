from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
source = Image.open(ROOT / "public" / "media" / "floor-plan-puice-2026.png").convert("RGB")
target = ROOT / "public" / "media" / "floor-plan-puice-2026.webp"
source.save(target, "WEBP", quality=90, method=6)
print(f"{target.name}\t{target.stat().st_size}")
