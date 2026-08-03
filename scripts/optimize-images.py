#!/usr/bin/env python3
"""Generate display-size WebP variants for card-grid images.

Card images are displayed at ~320-380px wide (2x retina ≈ 640-760px), but the
sources are 1024x1024 JPEGs. This script produces 640x640 WebP copies that are
~3x smaller than the optimized JPEGs, saved as <name>.card.webp in src/assets/.

Only regenerate when sources change. Requires Python + Pillow.
"""
from PIL import Image
import os

SOURCES = [
    "sally_story",
    "monthly_giving",
    "hero_students",
    "ugirls_graduation",
    "clean_energy",
    "clean_water",
]
CARD_SIZE = 640
FULL_SIZE = 1024
CARD_QUALITY = 72
FULL_QUALITY = 72
ASSET_DIR = os.path.join(os.path.dirname(__file__), "..", "src", "assets")

for name in SOURCES:
    src = os.path.join(ASSET_DIR, f"{name}.jpg")
    im = Image.open(src).convert("RGB")

    # 640px WebP for card grids / story cards (displayed at ~320-460px).
    card_dst = os.path.join(ASSET_DIR, f"{name}.card.webp")
    card = im if im.size[0] <= CARD_SIZE else im.resize((CARD_SIZE, CARD_SIZE), Image.LANCZOS)
    card.save(card_dst, "WEBP", quality=CARD_QUALITY, method=6)
    print(f"{name:20s} card {os.path.getsize(card_dst) / 1024:7.1f} KB")

    # Full-size WebP for heroes / full-bleed backgrounds.
    full_dst = os.path.join(ASSET_DIR, f"{name}.full.webp")
    im.save(full_dst, "WEBP", quality=FULL_QUALITY, method=6)
    print(f"{name:20s} full {os.path.getsize(full_dst) / 1024:7.1f} KB")
