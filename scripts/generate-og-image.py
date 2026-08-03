#!/usr/bin/env python3
"""Generate public/og-image.png (1200x630) for social sharing.

Brand colors:
  primary teal  #005c7a
  accent yellow #ffc72c
"""
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
OUT = "public/og-image.png"

TEAL_TOP = (0, 92, 122)      # #005c7a
TEAL_BOTTOM = (0, 55, 74)    # darker teal for depth
YELLOW = (255, 199, 44)      # #ffc72c
WHITE = (255, 255, 255)
SOFT_WHITE = (235, 242, 245)

FONT_DIR = "C:/Windows/Fonts"
TITLE_FONT = f"{FONT_DIR}/arialbd.ttf"
BODY_FONT = f"{FONT_DIR}/arial.ttf"


def vertical_gradient(size, top, bottom):
    img = Image.new("RGB", size)
    draw = ImageDraw.Draw(img)
    for y in range(size[1]):
        t = y / size[1]
        color = tuple(round(top[i] + (bottom[i] - top[i]) * t) for i in range(3))
        draw.line([(0, y), (size[0], y)], fill=color)
    return img


def draw_icon(draw):
    """Simple mark: a yellow circle with a heart inside (bottom-right)."""
    cx, cy, r = 960, 470, 120
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=YELLOW)
    # Heart path (approximated with two circles + triangle)
    hx, hy, s = cx, cy + 6, 34
    draw.pieslice([hx - s, hy - s, hx, hy], 180, 360, fill=TEAL_TOP)
    draw.pieslice([hx, hy - s, hx + s, hy], 180, 360, fill=TEAL_TOP)
    draw.polygon([(hx - s, hy - 2), (hx + s, hy - 2), (hx, hy + s + 14)], fill=TEAL_TOP)


def main():
    img = vertical_gradient((W, H), TEAL_TOP, TEAL_BOTTOM)
    draw = ImageDraw.Draw(img)

    # Subtle background circles for depth
    draw.ellipse([-180, -220, 380, 340], outline=(255, 255, 255, 0), width=0)
    draw.ellipse([-180, -220, 380, 340], outline=(255, 255, 255, 18), width=6)
    draw.ellipse([880, 30, 1320, 470], outline=(255, 255, 255, 12), width=6)

    # Yellow accent bar above title
    draw.rounded_rectangle([120, 208, 196, 224], radius=8, fill=YELLOW)

    title_font = ImageFont.truetype(TITLE_FONT, 84)
    tagline_font = ImageFont.truetype(BODY_FONT, 40)
    small_font = ImageFont.truetype(BODY_FONT, 26)

    draw.text((120, 250), "Children for Life", font=title_font, fill=WHITE)
    draw.text((122, 376), "Every Child Deserves a Future", font=tagline_font, fill=SOFT_WHITE)
    draw.text((122, 452), "childrenforlife.com", font=small_font, fill=YELLOW)

    draw_icon(draw)

    img.save(OUT, format="PNG", optimize=True)
    print(f"wrote {OUT} ({img.size[0]}x{img.size[1]})")


if __name__ == "__main__":
    main()
