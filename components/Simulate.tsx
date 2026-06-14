"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { bortleInfo, makeStars, paintSky, simDarkness, sizeCanvas, type Star } from "@/lib/sky";

function Slider({
  label,
  value,
  onChange,
  left,
  right,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  left: string;
  right: string;
}) {
  return (
    <div>
      <div className="font-display text-[13.5px] mb-3" style={{ letterSpacing: "0.03em", color: "#F5F5F7" }}>
        {label}
      </div>
      <input
        className="cw"
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <div className="flex justify-between mt-[9px] text-[11px]" style={{ color: "#9A9AAF" }}>
        <span>{left}</span>
        <span>{right}</span>
      </div>
    </div>
  );
}

export default function Simulate() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const simCanvasRef = useRef<HTMLCanvasElement>(null);
  const worstCanvasRef = useRef<HTMLCanvasElement>(null);
  const bestCanvasRef = useRef<HTMLCanvasElement>(null);

  const [shielding, setShielding] = useState(50);
  const [density, setDensity] = useState(50);
  const [road, setRoad] = useState(50);
  const [signage, setSignage] = useState(50);

  const darkness = simDarkness(shielding, density, road, signage);
  const label = bortleInfo(darkness);

  // Live simulation canvas
  useEffect(() => {
    const canvas = simCanvasRef.current;
    if (!canvas) return;

    let stars: Star[] = [];
    let dims = { w: 0, h: 0, dpr: 1 };
    let time = 0;
    let raf = 0;

    const resize = () => {
      dims = sizeCanvas(canvas);
      stars = makeStars(dims.w, dims.h, 2400);
    };

    const animate = () => {
      time += 0.016;
      const ctx = canvas.getContext("2d");
      const d = simDarkness(shielding, density, road, signage);
      if (ctx) paintSky(ctx, dims.w, dims.h, dims.dpr, stars, d, d > 0.62, time);
      raf = requestAnimationFrame(animate);
    };

    resize();
    raf = requestAnimationFrame(animate);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [shielding, density, road, signage]);

  // Static before/after thumbnails
  useEffect(() => {
    const draw = (canvas: HTMLCanvasElement | null, d: number, milky: boolean, t: number) => {
      if (!canvas) return;
      const dims = sizeCanvas(canvas);
      const stars = makeStars(dims.w, dims.h, 2400);
      const ctx = canvas.getContext("2d");
      if (ctx) paintSky(ctx, dims.w, dims.h, dims.dpr, stars, d, milky, t);
    };
    const run = () => {
      draw(worstCanvasRef.current, 0.04, false, 0.5);
      draw(bestCanvasRef.current, 0.96, true, 1.3);
    };
    run();
    window.addEventListener("resize", run);
    return () => window.removeEventListener("resize", run);
  }, []);

  // Entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 28,
          duration: 0.9,
          ease: "power3.out",
          delay: (i % 3) * 0.06,
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="simulate"
      data-screen-label="Simulate"
      ref={sectionRef}
      style={{ scrollMarginTop: "80px", padding: "clamp(90px,14vh,170px) clamp(20px,5vw,64px)" }}
    >
      <div className="max-w-[1120px] mx-auto">
        <div data-reveal className="font-display text-xs uppercase mb-[22px]" style={{ letterSpacing: "0.3em", color: "#5B8DEF" }}>
          Simulate
        </div>
        <h2 data-reveal className="font-display font-medium text-white m-0 mb-4 leading-[1.04]" style={{ fontSize: "clamp(32px,5.4vw,62px)", letterSpacing: "0.005em" }}>
          The sky we&apos;re designing
        </h2>
        <p data-reveal className="m-0 mb-[38px] font-light" style={{ fontSize: "clamp(16px,1.4vw,18px)", color: "#9A9AAF", maxWidth: "50ch" }}>
          Adjust the sliders below. Watch what appears overhead.
        </p>

        <div
          data-reveal
          style={{
            position: "relative",
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid rgba(91,141,239,.18)",
            boxShadow: "0 30px 80px rgba(0,0,0,.5)",
          }}
        >
          <canvas ref={simCanvasRef} style={{ display: "block", width: "100%", height: "clamp(280px,46vh,480px)" }} />
          <div
            className="absolute left-0 right-0 bottom-0 flex justify-between items-end px-[22px] py-[18px]"
            style={{ background: "linear-gradient(0deg, rgba(7,7,13,.7), rgba(7,7,13,0))" }}
          >
            <span className="text-xs" style={{ color: "#9A9AAF", letterSpacing: "0.04em" }}>Current sky</span>
            <span className="font-display font-medium" style={{ fontSize: "clamp(16px,2vw,22px)", color: "#FFD966", letterSpacing: "0.02em" }}>
              {label}
            </span>
          </div>
        </div>

        <div
          data-reveal
          className="mt-6 grid gap-[clamp(24px,4vw,52px)] p-[clamp(24px,3.5vw,40px)]"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))",
            background: "linear-gradient(180deg, rgba(15,20,42,.55), rgba(10,10,20,.4))",
            border: "1px solid rgba(255,255,255,.07)",
            borderRadius: "14px",
          }}
        >
          <div className="flex flex-col gap-[26px]">
            <Slider label="Streetlight shielding" value={shielding} onChange={setShielding} left="Unshielded" right="Fully shielded" />
            <Slider label="Building density" value={density} onChange={setDensity} left="High-rise downtown" right="Low-density residential" />
          </div>
          <div className="flex flex-col gap-[26px]">
            <Slider label="Road & highway lighting" value={road} onChange={setRoad} left="Interstate interchange" right="Rural road" />
            <Slider label="Commercial signage" value={signage} onChange={setSignage} left="Unrestricted" right="Dark-sky compliant" />
          </div>
        </div>

        <div className="mt-[34px] flex flex-wrap gap-5">
          <div data-reveal className="flex-1 basis-[260px]">
            <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,.07)" }}>
              <canvas ref={worstCanvasRef} style={{ display: "block", width: "100%", height: "150px" }} />
            </div>
            <div className="flex justify-between mt-[10px] text-xs">
              <span style={{ color: "#9A9AAF" }}>All worst settings</span>
              <span className="font-display" style={{ color: "#F5F5F7" }}>Bortle 8 — City sky</span>
            </div>
          </div>
          <div data-reveal className="flex-1 basis-[260px]">
            <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,.07)" }}>
              <canvas ref={bestCanvasRef} style={{ display: "block", width: "100%", height: "150px" }} />
            </div>
            <div className="flex justify-between mt-[10px] text-xs">
              <span style={{ color: "#9A9AAF" }}>All best settings</span>
              <span className="font-display" style={{ color: "#FFD966" }}>Bortle 3 — Rural sky</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
