// Shared canvas helpers for the starfield / night-sky visualizations.

export type Star = {
  x: number;
  y: number;
  t: number; // 0 = brightest (always visible), 1 = faintest (only visible in dark skies)
  sz: number;
  ph: number;
  tw: number;
  gold: boolean;
};

export function makeStars(w: number, h: number, per: number): Star[] {
  const n = Math.max(24, Math.round((w * h) / per));
  const arr: Star[] = [];
  for (let i = 0; i < n; i++) {
    const t = Math.random();
    arr.push({
      x: Math.random() * w,
      y: Math.random() * h * 0.97,
      t,
      sz: 0.5 + (1 - t) * 1.8 + Math.random() * 0.4,
      ph: Math.random() * 6.2832,
      tw: 0.5 + Math.random() * 1.5,
      gold: Math.random() < 0.14,
    });
  }
  return arr;
}

export function sizeCanvas(canvas: HTMLCanvasElement) {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const w = Math.max(1, Math.round(rect.width * dpr));
  const h = Math.max(1, Math.round(rect.height * dpr));
  canvas.width = w;
  canvas.height = h;
  return { w: rect.width, h: rect.height, dpr };
}

/** Background starfield used behind the hero title. */
export function paintHero(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  dpr: number,
  stars: Star[],
  time: number
) {
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);
  for (const s of stars) {
    const tw = 0.55 + 0.45 * Math.sin(time * s.tw + s.ph);
    const a = (0.22 + (1 - s.t) * 0.6) * tw;
    if (a <= 0.02) continue;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.sz * 0.95, 0, Math.PI * 2);
    ctx.fillStyle = s.gold ? `rgba(255,222,150,${a})` : `rgba(245,245,250,${a})`;
    ctx.fill();
  }
}

/**
 * Renders a night sky whose visible star count and skyglow respond to
 * `darkness` (0 = brightly lit city sky, 1 = pristine dark sky).
 */
export function paintSky(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  dpr: number,
  stars: Star[],
  darkness: number,
  milky: boolean,
  time: number
) {
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);
  const lerp = (a: number, b: number, t: number) => Math.round(a + (b - a) * t);

  // background gradient: city haze -> deep rural black
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, `rgb(${lerp(58, 9, darkness)},${lerp(52, 9, darkness)},${lerp(80, 20, darkness)})`);
  g.addColorStop(1, `rgb(${lerp(94, 7, darkness)},${lerp(84, 7, darkness)},${lerp(114, 16, darkness)})`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  // skyglow dome rising from the horizon
  if (darkness < 0.92) {
    const dome = ctx.createRadialGradient(w / 2, h * 1.06, h * 0.08, w / 2, h * 1.06, h * 1.25);
    const ga = 0.5 * (1 - darkness);
    dome.addColorStop(0, `rgba(180,165,210,${ga})`);
    dome.addColorStop(1, "rgba(180,165,210,0)");
    ctx.fillStyle = dome;
    ctx.fillRect(0, 0, w, h);
  }

  // Milky Way band, only visible once skies are dark enough
  if (milky) {
    ctx.save();
    ctx.translate(w * 0.5, h * 0.46);
    ctx.rotate(-0.42);
    const band = ctx.createLinearGradient(0, -h * 0.2, 0, h * 0.2);
    band.addColorStop(0, "rgba(130,140,190,0)");
    band.addColorStop(0.5, "rgba(155,155,200,0.12)");
    band.addColorStop(1, "rgba(130,140,190,0)");
    ctx.fillStyle = band;
    ctx.fillRect(-w, -h * 0.2, w * 2, h * 0.4);
    ctx.restore();
  }

  for (const s of stars) {
    const vis = (darkness - s.t) / 0.12;
    if (vis <= 0) continue;
    const af = Math.min(1, vis);
    const tw = 0.7 + 0.3 * Math.sin(time * s.tw + s.ph);
    const a = af * (0.38 + (1 - s.t) * 0.62) * tw;
    if (a <= 0.02) continue;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.sz, 0, Math.PI * 2);
    ctx.fillStyle = s.gold ? `rgba(255,225,150,${a})` : `rgba(245,245,250,${a})`;
    ctx.fill();
  }
}

export function simDarkness(shielding: number, density: number, road: number, signage: number) {
  return (shielding + density + road + signage) / 400;
}

const BORTLE_DESCRIPTIONS: Record<number, string> = {
  3: "Rural sky",
  4: "Rural–suburban transition",
  5: "Suburban sky",
  6: "Bright suburban",
  7: "Suburban–urban transition",
  8: "City sky",
};

export function bortleInfo(darkness: number) {
  const b = Math.round(8 - darkness * 5);
  const descr = BORTLE_DESCRIPTIONS[b] || "City sky";
  return `Bortle ${b} — ${descr}`;
}
