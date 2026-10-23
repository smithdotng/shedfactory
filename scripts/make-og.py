"""
Builds the 1200x630 share (Open Graph) images in public/og/ from real photos.

    python3 scripts/make-og.py

Needs Pillow (pip install pillow). Re-run after changing a source photo.
Product images that already come from the product's own site (Diner, Glee,
Haulage, 74 Tribe) are used as-is; Shedfactory photos get a small logo badge.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
IMG = ROOT / 'public/assets/images'
SRC = ROOT / 'scripts/og-sources'
OUT = ROOT / 'public/og'
W, H = 1200, 630
INK = (14, 13, 12)
LOGO = Image.open(IMG / 'resources/shedfactory_logo.png').convert('RGBA')


def cover(img, w=W, h=H, focus=(0.5, 0.5)):
    """Scale and crop to fill w x h, keeping the focus point in frame."""
    img = img.convert('RGB')
    scale = max(w / img.width, h / img.height)
    img = img.resize((round(img.width * scale), round(img.height * scale)), Image.LANCZOS)
    left = min(max(round(img.width * focus[0] - w / 2), 0), img.width - w)
    top = min(max(round(img.height * focus[1] - h / 2), 0), img.height - h)
    return img.crop((left, top, left + w, top + h))


def badge(img):
    """Soft bottom shade + Shedfactory wordmark, bottom-left."""
    img = img.convert('RGBA')
    shade = Image.new('L', (W, H), 0)
    d = ImageDraw.Draw(shade)
    for y in range(H // 2, H):
        d.line([(0, y), (W, y)], fill=int(170 * ((y - H / 2) / (H / 2)) ** 1.6))
    img = Image.composite(Image.new('RGBA', (W, H), INK + (255,)), img, shade)
    logo = LOGO.resize((230, round(230 * LOGO.height / LOGO.width)), Image.LANCZOS)
    img.alpha_composite(logo, (48, H - logo.height - 34))
    return img.convert('RGB')


def split(photo, focus=(0.5, 0.5)):
    """Portrait photo on the right, dark brand panel with logo on the left."""
    base = Image.new('RGB', (W, H), INK)
    base.paste(cover(photo, 660, H, focus), (W - 660, 0))
    glow = Image.new('RGB', (W, H), INK)
    ImageDraw.Draw(glow).ellipse((-260, -320, 520, 420), fill=(70, 48, 20))
    glow = glow.filter(ImageFilter.GaussianBlur(120))
    base.paste(glow.crop((0, 0, W - 660, H)), (0, 0))
    out = base.convert('RGBA')
    logo = LOGO.resize((300, round(300 * LOGO.height / LOGO.width)), Image.LANCZOS)
    out.alpha_composite(logo, ((W - 660 - 300) // 2, (H - logo.height) // 2))
    return out.convert('RGB')


def collage(paths, cols, rows, gap=8, focus=(0.5, 0.0)):
    out = Image.new('RGB', (W, H), INK)
    cw, ch = (W - gap * (cols + 1)) // cols, (H - gap * (rows + 1)) // rows
    for i, p in enumerate(paths):
        x, y = gap + (i % cols) * (cw + gap), gap + (i // cols) * (ch + gap)
        out.paste(cover(Image.open(p), cw, ch, focus), (x, y))
    return out


def careshed_phone():
    """CareShed: its logo on the phone photo, as a simple app screen."""
    photo = Image.open(IMG / 'services/ui-ux.jpg').convert('RGB')
    k = 560 / 520  # phone body is ~520px tall in the source
    photo = photo.resize((round(photo.width * k), round(photo.height * k)), Image.LANCZOS)
    px = 820 - round(304 * k)  # phone centre x in source ~304
    py = (H - round(500 * k)) // 2 - round(240 * k) + 6
    # background: the photo's own edge colour, then the photo blended in with a feathered left edge
    edge = photo.crop((0, 0, 40, photo.height)).resize((1, 1), Image.LANCZOS).getpixel((0, 0))
    canvas = Image.new('RGB', (W, H), edge)
    layer = Image.new('RGB', (W, H), edge)
    layer.paste(photo, (px, py))
    mask = Image.new('L', (W, H), 0)
    md = ImageDraw.Draw(mask)
    for x in range(W):
        right = px + photo.width
        a = 0 if x < px or x >= right else min(255, int(255 * (x - px) / 220), int(255 * (right - x) / 60))
        md.line([(x, 0), (x, H)], fill=a)
    canvas = Image.composite(layer, canvas, mask)
    out = canvas.convert('RGBA')
    d = ImageDraw.Draw(out)
    # screen content (inside the white screen: x 190-416, y 275-745 in source)
    sx0, sy0 = px + round(196 * k), py + round(282 * k)
    sw = round(214 * k)
    logo = Image.open(SRC / 'careshed-logo.png').convert('RGBA').crop((28, 28, 269, 80))
    lw = sw - 40
    lg = logo.resize((lw, round(lw * logo.height / logo.width)), Image.LANCZOS)
    out.alpha_composite(lg, (sx0 + 20, sy0 + 26))
    y = sy0 + 26 + lg.height + 30
    accents = [(240, 144, 96), (122, 120, 200), (240, 144, 96), (122, 120, 200)]
    for i, c in enumerate(accents):
        d.rounded_rectangle((sx0 + 14, y, sx0 + sw - 14, y + 70), radius=14, fill=(246, 244, 250))
        d.ellipse((sx0 + 28, y + 19, sx0 + 60, y + 51), fill=c)
        d.rounded_rectangle((sx0 + 74, y + 20, sx0 + sw - 70, y + 32), radius=6, fill=(200, 198, 214))
        d.rounded_rectangle((sx0 + 74, y + 42, sx0 + sw - 110, y + 52), radius=5, fill=(222, 220, 232))
        y += 84
    # left: logo + strapline
    big = logo.resize((400, round(400 * logo.height / logo.width)), Image.LANCZOS)
    out.alpha_composite(big, (70, 225))
    from PIL import ImageFont
    try:
        fnt = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 26)
    except OSError:
        fnt = ImageFont.load_default()
    d.text((74, 330), 'Care management software', font=fnt, fill=(60, 58, 48))
    d.text((74, 366), 'for UK care providers', font=fnt, fill=(60, 58, 48))
    return out.convert('RGB')


def save(img, name):
    img.convert('RGB').save(OUT / f'{name}.jpg', quality=86, optimize=True, progressive=True)
    print('wrote', f'public/og/{name}.jpg')


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    bg = IMG / 'backgrounds'

    # Site pages
    save(badge(cover(Image.open(bg / 'inspire-bg.jpg'), focus=(0.5, 0.45))), 'default')
    save(split(Image.open(IMG / 'about/shedfactory-team.jpg')), 'about')
    save(badge(cover(Image.open(bg / 'page-header-bg-about.jpg'), focus=(0.62, 0.4))), 'startups')
    save(badge(cover(Image.open(bg / 'main-slider-1-1.jpg'), focus=(0.6, 0.5))), 'services')
    save(badge(cover(Image.open(bg / 'page-header-bg-contact.jpg'), focus=(0.6, 0.4))), 'contact')
    save(split(Image.open(IMG / 'services/web-development.jpg')), 'blog')
    save(collage([IMG / 'portfolio/fullmoon.png', IMG / 'portfolio/motown.jpg',
                  IMG / 'portfolio/radiant.jpg', IMG / 'portfolio/serinity.jpg'], 2, 2), 'work')

    # Services
    for slug, f in [('brand-strategy', 'brand-strategy'), ('web-development', 'web-development'),
                    ('ui-ux', 'ui-ux'), ('digital-marketing', 'digital-marketing'), ('content', 'content-creation')]:
        save(split(Image.open(IMG / f'services/{f}.jpg')), f'service-{slug}')

    # Products — the product's own share artwork where it exists, otherwise a photo
    for slug, f in [('diner', 'diner.jpg'), ('glee', 'glee.jpg'), ('haulage', 'haulage.png'), ('74-tribe', '74-tribe.png')]:
        save(cover(Image.open(SRC / f)), f'product-{slug}')
    save(badge(cover(Image.open(SRC / 'found.jpg'), focus=(0.5, 0.55))), 'product-found')
    save(badge(cover(Image.open(bg / 'main-slider-1-1-b.jpg'), focus=(0.55, 0.5))), 'product-shed')
    save(careshed_phone(), 'product-careshed')
    save(collage([OUT / f'product-{s}.jpg' for s in ['shed', 'diner', 'glee', 'found', 'haulage', 'careshed']], 3, 2, focus=(0.0, 0.5)), 'products')


if __name__ == '__main__':
    main()
