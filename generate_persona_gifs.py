"""Generate animated GIFs for all 7 AIRCADE score personas."""
import math, os
from PIL import Image, ImageDraw, ImageFont

SC = 3  # 480x360 output
W, H = 160 * SC, 120 * SC
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'personas')
os.makedirs(OUT, exist_ok=True)

CLOUD  = (200, 232, 245)
LIGHT  = (218, 240, 250)
LGST   = (238, 248, 255)
DARK   = (26,  26,  46)
WHITE  = (255, 255, 255)
GREEN  = (6,   214, 160)
GDARK  = (3,   168, 124)
GDKST  = (4,   74,  53)
YELLOW = (255, 190, 11)
RED    = (255, 0,   110)
CYAN   = (0,   245, 255)
ORANGE = (255, 153, 0)
REDBG  = (58,  10,  26)
BG     = (15,  15,  30)   # dark background like the game

def p(x): return int(x * SC)

def new_frame():
    img = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    return img, ImageDraw.Draw(img)

def draw_cloud(d):
    d.rounded_rectangle([p(40),p(30), p(120),p(80)], radius=p(6), fill=CLOUD)
    d.rounded_rectangle([p(28),p(42), p(132),p(72)], radius=p(6), fill=CLOUD)
    d.rounded_rectangle([p(30),p(22), p(58), p(50)], radius=p(4), fill=LIGHT)
    d.rounded_rectangle([p(55),p(12), p(91), p(48)], radius=p(4), fill=LGST)
    d.rounded_rectangle([p(88),p(22), p(116),p(50)], radius=p(4), fill=LIGHT)
    d.rounded_rectangle([p(40),p(68), p(60), p(84)], radius=p(3), fill=CLOUD)
    d.rounded_rectangle([p(100),p(68),p(120),p(84)], radius=p(3), fill=CLOUD)

def draw_eyes(d, ey=44, eh=14):
    d.rounded_rectangle([p(54),p(ey),  p(68), p(ey+eh)], radius=p(3), fill=DARK)
    d.rounded_rectangle([p(58),p(ey+3),p(62), p(ey+7)],  radius=p(1), fill=WHITE)
    d.rounded_rectangle([p(92),p(ey),  p(106),p(ey+eh)], radius=p(3), fill=DARK)
    d.rounded_rectangle([p(96),p(ey+3),p(100),p(ey+7)],  radius=p(1), fill=WHITE)

def draw_blink(d, ey=44, eh=14):
    d.rounded_rectangle([p(54),p(ey),p(68), p(ey+eh)], radius=p(3), fill=CLOUD)
    d.rounded_rectangle([p(92),p(ey),p(106),p(ey+eh)], radius=p(3), fill=CLOUD)

def draw_smile(d):
    d.arc([p(62),p(57),p(98),p(77)], 0, 180, fill=DARK, width=p(3))

def draw_bigsmile(d):
    d.arc([p(57),p(57),p(103),p(83)], 0, 180, fill=DARK, width=p(4))

def draw_leaf(d, cx, cy, angle_deg=0):
    """Draw a small leaf shape at cx,cy rotated by angle_deg."""
    leaf = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    ld = ImageDraw.Draw(leaf)
    ld.ellipse([cx-p(10), cy-p(14), cx+p(10), cy+p(14)], fill=GREEN)
    ld.ellipse([cx-p(3),  cy-p(6),  cx+p(3),  cy+p(2)],  fill=GDARK)
    rotated = leaf.rotate(-angle_deg, center=(cx, cy), resample=Image.BICUBIC)
    return rotated

def to_rgb(img):
    bg = Image.new('RGB', img.size, BG)
    bg.paste(img, mask=img.split()[3])
    return bg

def save(frames, delays, name):
    rgb = [to_rgb(f) for f in frames]
    path = os.path.join(OUT, f'{name}.gif')
    rgb[0].save(path, save_all=True, append_images=rgb[1:], duration=delays, loop=0)
    print(f'  OK  {name}.gif  ({len(frames)} frames)')


# ── 1. Grid Goblin ───────────────────────────────────────────────────
def make_grid_goblin():
    frames, delays = [], []
    for i in range(16):
        img, d = new_frame()
        draw_cloud(d)
        bright = (i % 2 == 0)
        stroke_c = RED if bright else (60, 5, 20)
        btn_c    = RED if bright else (40, 3, 12)
        d.rounded_rectangle([p(115),p(14),p(145),p(34)], radius=p(3), fill=REDBG, outline=stroke_c, width=p(2))
        d.rounded_rectangle([p(123),p(8), p(128),p(16)], radius=p(1), fill=btn_c)
        d.rounded_rectangle([p(132),p(8), p(137),p(16)], radius=p(1), fill=btn_c)
        d.rounded_rectangle([p(120),p(23),p(125),p(28)], radius=p(2), fill=btn_c)
        d.rounded_rectangle([p(135),p(23),p(140),p(28)], radius=p(2), fill=btn_c)
        if i in (13, 14):
            draw_blink(d, ey=44, eh=8)
        else:
            draw_eyes(d, ey=44, eh=8)
        d.rounded_rectangle([p(64),p(64),p(96),p(68)], radius=p(2), fill=DARK)
        frames.append(img)
        delays.append(60 if i < 12 else 100)
    save(frames, delays, 'grid-goblin')


# ── 2. Turbo Tapper ─────────────────────────────────────────────────
def make_turbo_tapper():
    frames, delays = [], []
    for i in range(8):
        img, d = new_frame()
        draw_cloud(d)
        on = (i % 2 == 0)
        yc = YELLOW if on else tuple(c // 4 for c in YELLOW)
        oc = ORANGE  if on else tuple(c // 4 for c in ORANGE)
        d.polygon([p(126),p(12),p(117),p(32),p(126),p(32),p(112),p(58),p(132),p(28),p(121),p(28),p(134),p(12)], fill=yc)
        d.polygon([p(138),p(16),p(131),p(34),p(138),p(34),p(127),p(56),p(143),p(32),p(135),p(32),p(146),p(16)], fill=oc)
        sl = YELLOW if on else tuple(c // 5 for c in YELLOW)
        d.line([p(110),p(22),p(103),p(24)], fill=sl, width=p(1))
        d.line([p(110),p(29),p(102),p(29)], fill=sl, width=p(1))
        if i in (6, 7):
            draw_blink(d, ey=40, eh=18)
        else:
            draw_eyes(d, ey=40, eh=18)
        d.rounded_rectangle([p(66),p(62),p(94),p(69)], radius=p(3), fill=DARK)
        frames.append(img)
        delays.append(70)
    save(frames, delays, 'turbo-tapper')


# ── 3. Casual Clicker ────────────────────────────────────────────────
def make_casual_clicker():
    frames, delays = [], []
    try:
        font = ImageFont.load_default(size=p(14))
    except TypeError:
        font = ImageFont.load_default()
    for i in range(20):
        img, d = new_frame()
        draw_cloud(d)
        draw_eyes(d)
        d.arc([p(64),p(57),p(96),p(70)], 0, 180, fill=DARK, width=p(3))
        # Floating wavy tilde
        offset = int(math.sin(i / 20 * 2 * math.pi) * p(3))
        pts = []
        for dx in range(p(11)):
            px = p(118) + dx
            py = p(44) + offset + int(math.sin(dx / p(11) * 2 * math.pi) * p(3))
            pts.append((px, py))
        if len(pts) >= 2:
            d.line(pts, fill=YELLOW, width=p(2))
        if i in (16, 17, 18):
            draw_blink(d)
        frames.append(img)
        delays.append(80)
    save(frames, delays, 'casual-clicker')


# ── 4. Eco Experimenter ──────────────────────────────────────────────
def make_eco_experimenter():
    frames, delays = [], []
    cx, cy, r = p(130), p(32), p(13)
    for i in range(16):
        img, d = new_frame()
        draw_cloud(d)
        draw_eyes(d)
        draw_smile(d)
        angle = math.radians(i / 16 * 360)
        d.ellipse([cx-r, cy-r, cx+r, cy+r], outline=GREEN, width=p(2))
        x1, y1 = cx + r*math.sin(angle),  cy - r*math.cos(angle)
        x2, y2 = cx - r*math.sin(angle),  cy + r*math.cos(angle)
        x3, y3 = cx + r*math.cos(angle),  cy + r*math.sin(angle)
        x4, y4 = cx - r*math.cos(angle),  cy - r*math.sin(angle)
        d.line([x1,y1,x2,y2], fill=GREEN, width=p(1))
        d.line([x3,y3,x4,y4], fill=GREEN, width=p(1))
        dot_r = p(3) + int(math.sin(i / 16 * 2 * math.pi) * p(2))
        d.ellipse([cx-dot_r, cy-p(6)-dot_r, cx+dot_r, cy-p(6)+dot_r], fill=GREEN)
        if i in (12, 13, 14):
            draw_blink(d)
        frames.append(img)
        delays.append(100)
    save(frames, delays, 'eco-experimenter')


# ── 5. Mindful Maker ─────────────────────────────────────────────────
def make_mindful_maker():
    frames, delays = [], []
    pivot_x, pivot_y = p(130), p(42)
    for i in range(16):
        img, d = new_frame()
        draw_cloud(d)
        draw_eyes(d)
        d.arc([p(60),p(58),p(100),p(80)], 0, 180, fill=DARK, width=p(3))
        angle = math.sin(i / 16 * 2 * math.pi) * 12  # ±12°
        # Stem
        rad = math.radians(angle)
        sx = pivot_x + int(math.sin(rad) * p(14))
        sy = pivot_y - int(math.cos(rad) * p(14))
        d.line([pivot_x, pivot_y, sx, sy], fill=GDARK, width=p(2))
        # Leaf image rotated around pivot
        leaf = draw_leaf(d, p(130), p(28), angle_deg=angle)
        img.alpha_composite(leaf)
        if i in (13, 14, 15):
            draw_blink(d)
        frames.append(img)
        delays.append(100)
    save(frames, delays, 'mindful-maker')


# ── 6. Green Hacker ──────────────────────────────────────────────────
def make_green_hacker():
    frames, delays = [], []
    for i in range(12):
        img, d = new_frame()
        draw_cloud(d)
        d.rounded_rectangle([p(48),p(40),p(76), p(62)], radius=p(5), fill=GREEN)
        d.rounded_rectangle([p(84),p(40),p(112),p(62)], radius=p(5), fill=GREEN)
        d.line([p(76),p(51),p(84),p(51)], fill=GREEN, width=p(3))
        d.rounded_rectangle([p(51),p(43),p(73),p(59)], radius=p(3), fill=GDKST)
        d.rounded_rectangle([p(87),p(43),p(109),p(59)], radius=p(3), fill=GDKST)
        # Lens gleam
        if i in (3, 4):
            gl_a = 200 if i == 3 else 80
            gleam = Image.new('RGBA', (W, H), (0, 0, 0, 0))
            gd = ImageDraw.Draw(gleam)
            gd.rounded_rectangle([p(53),p(45),p(60),p(49)], radius=p(2), fill=(*WHITE, gl_a))
            gd.rounded_rectangle([p(89),p(45),p(96),p(49)], radius=p(2), fill=(*WHITE, gl_a))
            img.alpha_composite(gleam)
        draw_bigsmile(d)
        # Bouncing leaf (small green diamond)
        lo = int(math.sin(i / 12 * 2 * math.pi) * p(4))
        lx, ly = p(124), p(82) + lo
        d.polygon([lx,ly-p(6), lx+p(5),ly, lx,ly+p(4), lx-p(5),ly], fill=GREEN)
        d.line([lx, ly+p(4), lx, ly+p(8)], fill=GDARK, width=p(1))
        frames.append(img)
        delays.append(150)
    save(frames, delays, 'green-hacker')


# ── 7. Sustainable Sage ──────────────────────────────────────────────
def make_sustainable_sage():
    frames, delays = [], []
    for i in range(18):
        img, d = new_frame()
        draw_cloud(d)
        d.rounded_rectangle([p(58),p(17),p(102),p(24)], radius=p(2), fill=GREEN)
        d.polygon([p(58),p(17),p(64),p(7), p(70),p(17)], fill=GREEN)
        d.polygon([p(77),p(17),p(80),p(5), p(83),p(17)], fill=GREEN)
        d.polygon([p(90),p(17),p(96),p(7),p(102),p(17)], fill=GREEN)
        # Staggered twinkling gems
        t = i / 18
        def gem_alpha(phase):
            return int((0.5 + 0.5 * math.sin(2 * math.pi * t + phase)) * 255)
        gems = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        gd = ImageDraw.Draw(gems)
        gd.ellipse([p(61),p(8),p(67),p(14)],  fill=(*CYAN,   gem_alpha(0.0)))
        gd.ellipse([p(77),p(4),p(83),p(10)],  fill=(*YELLOW, gem_alpha(2.1)))
        gd.ellipse([p(93),p(8),p(99),p(14)],  fill=(*CYAN,   gem_alpha(4.2)))
        img.alpha_composite(gems)
        draw_eyes(d)
        draw_bigsmile(d)
        if i in (15, 16, 17):
            draw_blink(d)
        frames.append(img)
        delays.append(100)
    save(frames, delays, 'sustainable-sage')


print('Generating persona GIFs...')
make_grid_goblin()
make_turbo_tapper()
make_casual_clicker()
make_eco_experimenter()
make_mindful_maker()
make_green_hacker()
make_sustainable_sage()
print(f'\nDone! Find your GIFs in: {OUT}')
