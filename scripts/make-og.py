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
    save(collage([OUT / f'product-{s}.jpg' for s in ['shed', 'diner', 'glee', 'found', 'haulage', '74-tribe']], 3, 2, focus=(0.0, 0.5)), 'products')


if __name__ == '__main__':
    main()
