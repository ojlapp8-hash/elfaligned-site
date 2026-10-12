"""Optimize ELFALIGNED site assets to WebP and generate the OG cover.

Budget target: hero logo < 120KB (above the fold, preloaded),
team image < 200KB (below fold), OG cover exactly 1200x630.
"""
from PIL import Image
import os

IMG = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "assets", "img")


def report(label, path):
    print(f"{label:28s} {os.path.getsize(path)/1024:8.1f} KB  {path}")


# --- Hero logo: page renders it at ~380px max, 2x DPR = 760px is plenty.
logo = Image.open(os.path.join(IMG, "logo.png")).convert("RGB")
logo_w = min(logo.width, 800)
logo = logo.resize((logo_w, round(logo.height * logo_w / logo.width)), Image.LANCZOS)
logo.save(os.path.join(IMG, "logo.webp"), "WEBP", quality=88, method=6)
report("hero logo (800px q88)", os.path.join(IMG, "logo.webp"))

# --- Team image: shown at ~520px column width on desktop, 2x DPR = 1040.
team = Image.open(os.path.join(IMG, "team.png")).convert("RGB")
team_w = min(team.width, 900)
team = team.resize((team_w, round(team.height * team_w / team.width)), Image.LANCZOS)
team.save(os.path.join(IMG, "team.webp"), "WEBP", quality=82, method=6)
report("team image (900px q82)", os.path.join(IMG, "team.webp"))

# --- OG cover: 1200x630, logo centered on the brand backdrop.
cover = Image.new("RGB", (1200, 630), (10, 13, 16))
mark = Image.open(os.path.join(IMG, "logo.webp")).convert("RGBA")
target_w = 620
target_h = round(mark.height * target_w / mark.width)
mark = mark.resize((target_w, target_h), Image.LANCZOS)
# composite centered, slightly above middle
x = (1200 - target_w) // 2
y = (630 - target_h) // 2 - 20
cover.paste(mark, (x, y), mark)
cover.save(os.path.join(IMG, "og-cover.png"), "PNG", optimize=True)
report("og cover (1200x630)", os.path.join(IMG, "og-cover.png"))

# --- Also emit a 1200x630 webp fallback for OG (some platforms accept it)
cover.save(os.path.join(IMG, "og-cover.webp"), "WEBP", quality=90, method=6)
report("og cover webp", os.path.join(IMG, "og-cover.webp"))

print("\nFinal asset inventory:")
for f in sorted(os.listdir(IMG)):
    p = os.path.join(IMG, f)
    print(f"  {f:22s} {os.path.getsize(p)/1024:8.1f} KB")
