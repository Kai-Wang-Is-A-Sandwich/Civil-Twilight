"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { makeStars, paintSky, sizeCanvas } from "@/lib/sky";

const CASES = [
  {
    eyebrow: "Since 1972",
    title: "Tucson, Arizona",
    border: "rgba(107,63,160,.35)",
    glow: "rgba(107,63,160,.08)",
    bg: "linear-gradient(180deg, rgba(45,27,78,.4), rgba(13,13,26,.3))",
    body: "Tucson adopted one of the first comprehensive outdoor lighting codes in 1972 to protect Kitt Peak National Observatory. The code requires full shielding and warm color temperatures for all new and replacement fixtures. Tucson has since grown into a metro area of over one million people while maintaining some of the darkest urban-adjacent skies in the country.",
  },
  {
    eyebrow: "First Dark Sky City · 2001",
    title: "Flagstaff, Arizona",
    border: "rgba(91,141,239,.32)",
    glow: "rgba(91,141,239,.08)",
    bg: "linear-gradient(180deg, rgba(15,26,60,.4), rgba(13,13,26,.3))",
    body: "Named the world's first International Dark Sky City in 2001. Flagstaff's lighting code covers public and private fixtures, limits total lumen output per parcel, and enforces curfews on non-essential lighting. Dark-sky tourism has become a measurable economic asset for the region.",
  },
  {
    eyebrow: "First Dark Sky Nation · 2020",
    title: "Niue",
    border: "rgba(107,63,160,.35)",
    glow: "rgba(107,63,160,.08)",
    bg: "linear-gradient(180deg, rgba(45,27,78,.4), rgba(13,13,26,.3))",
    body: "In 2020 the entire nation of Niue became the first country designated as an International Dark Sky Place. The achievement required a comprehensive lighting retrofit across all public infrastructure, coordinated at a national scale.",
  },
];

export default function WhatCanChange() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const beforeCanvasRef = useRef<HTMLCanvasElement>(null);
  const afterCanvasRef = useRef<HTMLCanvasElement>(null);
  const draggingRef = useRef(false);
  const [split, setSplit] = useState(50);

  // Draw before/after skies once
  useEffect(() => {
    const draw = (canvas: HTMLCanvasElement | null, d: number, milky: boolean, t: number) => {
      if (!canvas) return;
      const dims = sizeCanvas(canvas);
      const stars = makeStars(dims.w, dims.h, 2400);
      const ctx = canvas.getContext("2d");
      if (ctx) paintSky(ctx, dims.w, dims.h, dims.dpr, stars, d, milky, t);
    };
    const run = () => {
      draw(beforeCanvasRef.current, 0.1, false, 0.9);
      draw(afterCanvasRef.current, 0.94, true, 2.1);
    };
    run();
    window.addEventListener("resize", run);
    return () => window.removeEventListener("resize", run);
  }, []);

  const move = (clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setSplit(pct);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 28,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.from("[data-case-card]", {
        opacity: 0,
        y: 36,
        scale: 0.97,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-case-card]", start: "top 85%" },
      });

      if (wrapRef.current) {
        gsap.from(wrapRef.current, {
          opacity: 0,
          y: 28,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: wrapRef.current, start: "top 85%" },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="change"
      data-screen-label="What Can Change"
      ref={sectionRef}
      style={{ scrollMarginTop: "80px", padding: "clamp(90px,14vh,170px) clamp(20px,5vw,64px)" }}
    >
      <div className="max-w-[1120px] mx-auto">
        <div data-reveal className="font-display text-xs uppercase mb-[22px]" style={{ letterSpacing: "0.3em", color: "#5B8DEF" }}>
          What Can Change
        </div>
        <h2 data-reveal className="font-display font-medium text-white m-0 mb-10 leading-[1.04]" style={{ fontSize: "clamp(32px,5.4vw,62px)", letterSpacing: "0.005em" }}>
          This is solvable
        </h2>
        <div data-reveal className="flex flex-col gap-6 font-light text-[#E2E2EC]" style={{ maxWidth: "62ch", fontSize: "clamp(16px,1.35vw,18px)", lineHeight: 1.78 }}>
          <p className="m-0">
            Light pollution is among the most reversible forms of environmental damage. Redesign a
            fixture or turn off a light, and the sky above it recovers immediately. No remediation
            period and no cleanup. The fix is as fast as the switch.
          </p>
          <p className="m-0" style={{ color: "#F5F5F7" }}>Several cities and regions have already proved this works.</p>
        </div>

        <div className="mt-[clamp(40px,6vh,64px)] grid gap-[22px]" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))" }}>
          {CASES.map((c) => (
            <div
              key={c.title}
              data-case-card
              className="rounded-[14px] p-7"
              style={{ background: c.bg, border: `1px solid ${c.border}`, boxShadow: `0 0 40px ${c.glow}` }}
            >
              <div className="font-display text-[11px] uppercase mb-2" style={{ letterSpacing: "0.18em", color: c.border.includes("91,141,239") ? "#5B8DEF" : "#6B3FA0" }}>
                {c.eyebrow}
              </div>
              <h3 className="font-display font-medium text-white m-0 mb-3.5" style={{ fontSize: "22px" }}>{c.title}</h3>
              <p className="m-0 font-light" style={{ fontSize: "14.5px", lineHeight: 1.7, color: "#C8C8D4" }}>{c.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-[clamp(40px,6vh,72px)]">
          <div data-reveal className="font-display text-sm mb-4" style={{ letterSpacing: "0.04em", color: "#F5F5F7" }}>
            Tucson — drag to compare (illustrative)
          </div>
          <div
            ref={wrapRef}
            onPointerDown={(e) => { draggingRef.current = true; move(e.clientX); }}
            onPointerMove={(e) => { if (draggingRef.current) move(e.clientX); }}
            onPointerUp={() => { draggingRef.current = false; }}
            onPointerLeave={() => { draggingRef.current = false; }}
            style={{
              position: "relative",
              width: "100%",
              height: "clamp(240px,42vh,440px)",
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,.08)",
              touchAction: "none",
              cursor: "ew-resize",
              userSelect: "none",
            }}
          >
            <canvas ref={afterCanvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />
            <canvas
              ref={beforeCanvasRef}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                display: "block",
                clipPath: `inset(0 ${100 - split}% 0 0)`,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: `${split}%`,
                width: "2px",
                background: "rgba(255,217,102,.9)",
                boxShadow: "0 0 14px rgba(255,217,102,.6)",
                transform: "translateX(-1px)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: `${split}%`,
                transform: "translate(-50%,-50%)",
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                background: "rgba(7,7,13,.7)",
                border: "2px solid #FFD966",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(4px)",
              }}
            >
              <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
                <path d="M7 2 L3 6 L7 10 M11 2 L15 6 L11 10" stroke="#FFD966" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div
              className="font-display text-xs text-white"
              style={{ position: "absolute", top: "14px", left: "16px", letterSpacing: "0.08em", background: "rgba(7,7,13,.5)", padding: "5px 11px", borderRadius: "30px" }}
            >
              Before retrofit
            </div>
            <div
              className="font-display text-xs"
              style={{ position: "absolute", top: "14px", right: "16px", letterSpacing: "0.08em", color: "#FFD966", background: "rgba(7,7,13,.5)", padding: "5px 11px", borderRadius: "30px" }}
            >
              After retrofit
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
