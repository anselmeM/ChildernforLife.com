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
QUALITY = 72
ASSET_DIR = os.path.join(os.path.dirname(__file__), "..", "src", "assets")

for name in SOURCES:
    src = os.path.join(ASSET_DIR, f"{name}.jpg")
    dst = os.path.join(ASSET_DIR, f"{name}.card.webp")
    im = Image.open(src).convert("RGB")
    # Sources are square 1024x1024; the resize below is a safe downscale.
    # If a non-square source is ever added, crop to a centered square first
    # instead of stretching.
    if im.size[0] > CARD_SIZE or im.size[1] > CARD_SIZE:
        im = im.resize((CARD_SIZE, CARD_SIZE), Image.LANCZOS)
    im.save(dst, "WEBP", quality=QUALITY, method=6)
    print(f"{name:20s} {os.path.getsize(dst) / 1024:7.1f} KB  -> {os.path.basename(dst)}")
