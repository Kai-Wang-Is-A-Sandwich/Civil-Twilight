"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function Problem() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPolylineElement>(null);
  const areaRef = useRef<SVGPolygonElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const statRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade-up reveals for headings/paragraphs
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 28,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // Line chart draw-in
      if (lineRef.current && areaRef.current) {
        const length = lineRef.current.getTotalLength();
        gsap.set(lineRef.current, { strokeDasharray: length, strokeDashoffset: length });
        gsap.set(areaRef.current, { opacity: 0 });
        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          duration: 1.8,
          ease: "power2.inOut",
          scrollTrigger: { trigger: lineRef.current, start: "top 80%" },
        });
        gsap.to(areaRef.current, {
          opacity: 1,
          duration: 1.4,
          delay: 0.6,
          scrollTrigger: { trigger: lineRef.current, start: "top 80%" },
        });
      }

      // Bortle scale bar reveal
      if (barRef.current) {
        gsap.from(barRef.current, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: { trigger: barRef.current, start: "top 85%" },
        });
      }
      if (highlightRef.current) {
        gsap.from(highlightRef.current, {
          opacity: 0,
          y: 12,
          duration: 0.8,
          delay: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: highlightRef.current, start: "top 85%" },
        });
      }

      // 99% counter
      if (statRef.current) {
        const counter = { val: 0 };
        gsap.to(counter, {
          val: 99,
          duration: 1.6,
          ease: "power1.out",
          scrollTrigger: { trigger: statRef.current, start: "top 85%" },
          onUpdate: () => {
            if (statRef.current) statRef.current.textContent = Math.round(counter.val) + "%";
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="problem"
      data-screen-label="The Problem"
      ref={sectionRef}
      className="px-5 sm:px-8 md:px-16"
      style={{ scrollMarginTop: "80px", padding: "clamp(90px,14vh,170px) clamp(20px,5vw,64px)" }}
    >
      <div className="max-w-[1120px] mx-auto">
        <div
          data-reveal
          className="font-display text-xs uppercase mb-[22px]"
          style={{ letterSpacing: "0.3em", color: "#5B8DEF" }}
        >
          The Problem
        </div>
        <h2
          data-reveal
          className="font-display font-medium text-white m-0 mb-10 leading-[1.04]"
          style={{
            fontSize: "clamp(32px,5.4vw,62px)",
            letterSpacing: "0.005em",
            textWrap: "balance",
            maxWidth: "16ch",
          }}
        >
          A sky most people have never seen
        </h2>

        <div
          data-reveal
          className="flex flex-col gap-[26px] font-light text-[#E2E2EC]"
          style={{ maxWidth: "62ch", fontSize: "clamp(16px,1.35vw,18px)", lineHeight: 1.78 }}
        >
          <p className="m-0">
            A third of humanity cannot see the Milky Way. Across the United States and Europe,
            that figure is more than 80 percent. The cause is not atmospheric, but
            infrastructural. Every streetlight, parking lot, billboard, and building lobby that
            sends light upward or outward adds to a cumulative glow called{" "}
            <span style={{ color: "#fff" }}>
              <b>skyglow</b>,
            </span>{" "}
            a dome of scattered light that washes out everything above it. The night sky that
            most urban residents experience is not natural. It is an engineered byproduct of
            decisions made by planners, zoning boards, and transportation departments, often
            decades ago, with little consideration of what would be lost overhead.
          </p>
        </div>

        {/* Viz 1 — light pollution growth */}
        <figure data-reveal style={{ margin: "clamp(48px,7vh,80px) 0", padding: 0 }}>
          <div
            style={{
              border: "1px solid rgba(91,141,239,.16)",
              borderRadius: "14px",
              padding: "clamp(20px,3vw,34px)",
              background: "linear-gradient(180deg, rgba(15,26,60,.28), rgba(7,7,13,.1))",
            }}
          >
            <div className="flex justify-between items-baseline flex-wrap gap-2 mb-[18px]">
              <span className="font-display text-sm" style={{ letterSpacing: "0.04em", color: "#F5F5F7" }}>
                Global artificial light emissions, indexed
              </span>
            </div>
            <svg viewBox="0 0 900 360" style={{ width: "100%", height: "auto", display: "block" }} preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="lineArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#FFD966" stopOpacity="0.28" />
                  <stop offset="1" stopColor="#FFD966" stopOpacity="0" />
                </linearGradient>
              </defs>
              <line x1="60" y1="60" x2="860" y2="60" stroke="#1e2b50" strokeWidth="1" />
              <line x1="60" y1="150" x2="860" y2="150" stroke="#1e2b50" strokeWidth="1" />
              <line x1="60" y1="240" x2="860" y2="240" stroke="#1e2b50" strokeWidth="1" />
              <line x1="60" y1="330" x2="860" y2="330" stroke="#33415f" strokeWidth="1.2" />
              <polygon
                ref={areaRef}
                points="60,330 60,330 160,304 260,275 360,249 460,220 560,188 660,143 760,98 860,59 860,330"
                fill="url(#lineArea)"
              />
              <polyline
                ref={lineRef}
                points="60,330 160,304 260,275 360,249 460,220 560,188 660,143 760,98 860,59"
                fill="none"
                stroke="#FFD966"
                strokeWidth="2.6"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <line x1="560" y1="70" x2="560" y2="330" stroke="#5B8DEF" strokeWidth="1.2" strokeDasharray="4 5" opacity="0.8" />
              <circle cx="560" cy="188" r="4.5" fill="#5B8DEF" />
              <text x="548" y="58" textAnchor="end" fontFamily="IBM Plex Sans, sans-serif" fontSize="13" fill="#5B8DEF">
                LED transition begins
              </text>
              <text x="60" y="352" fontFamily="IBM Plex Sans" fontSize="12" fill="#9A9AAF">1992</text>
              <text x="285" y="352" textAnchor="middle" fontFamily="IBM Plex Sans" fontSize="12" fill="#9A9AAF">2000</text>
              <text x="510" y="352" textAnchor="middle" fontFamily="IBM Plex Sans" fontSize="12" fill="#9A9AAF">2010</text>
              <text x="735" y="352" textAnchor="middle" fontFamily="IBM Plex Sans" fontSize="12" fill="#9A9AAF">2020</text>
              <text x="860" y="352" textAnchor="end" fontFamily="IBM Plex Sans" fontSize="12" fill="#9A9AAF">2024</text>
            </svg>
          </div>
          <figcaption className="text-xs mt-[14px]" style={{ color: "#6E6E84" }}>
            Satellite-measured upward radiance, illustrative trend. Source: VIIRS / Kyba et al.
          </figcaption>
        </figure>

        <div
          data-reveal
          className="font-light text-[#E2E2EC]"
          style={{ maxWidth: "62ch", fontSize: "clamp(16px,1.35vw,18px)", lineHeight: 1.78 }}
        >
          <p className="m-0">
            Light pollution is growing. Satellite measurements show global artificial light
            emissions increasing at roughly 2 percent per year. In many regions the rate is
            faster. The widespread transition to blue-rich LED streetlights over the past decade
            has made the problem measurably worse: shorter wavelengths scatter more aggressively
            in the atmosphere, producing more skyglow per lumen than the sodium lamps they
            replaced.
          </p>
        </div>

        {/* Viz 2 — Bortle scale */}
        <figure data-reveal style={{ margin: "clamp(48px,7vh,84px) 0 0", padding: 0 }}>
          <div className="flex justify-between items-baseline mb-4 flex-wrap gap-1.5">
            <span className="font-display text-sm" style={{ letterSpacing: "0.04em", color: "#F5F5F7" }}>
              The Bortle Dark-Sky Scale
            </span>
            <span className="text-xs" style={{ color: "#9A9AAF" }}>naked-eye sky brightness, class 1-9</span>
          </div>
          <div
            ref={barRef}
            style={{
              position: "relative",
              height: "48px",
              borderRadius: "8px",
              overflow: "hidden",
              background:
                "linear-gradient(90deg, #040409 0%, #0a0a16 14%, #11122a 28%, #1c1c3e 42%, #34355f 56%, #565680 68%, #8585a8 80%, #b2b0cc 90%, #ddd9ec 100%)",
              border: "1px solid rgba(255,255,255,.08)",
            }}
          />
          <div className="flex mt-[10px] gap-1">
            {[
              ["1", "Pristine dark site"],
              ["2", "Typical dark site"],
              ["3", "Rural sky"],
              ["4", "Rural–suburban"],
              ["5", "Suburban sky"],
              ["6", "Bright suburban"],
              ["7", "Suburban–urban"],
              ["8", "City sky"],
              ["9", "Inner-city sky"],
            ].map(([num, label]) => (
              <div key={num} className="flex-1 min-w-0">
                <div className="font-display text-[13px] text-white">{num}</div>
                <div className="text-[10.5px] leading-[1.3]" style={{ color: "#9A9AAF" }}>{label}</div>
              </div>
            ))}
          </div>
          <div className="relative mt-1.5" style={{ height: "38px" }}>
            <div
              ref={highlightRef}
              style={{ position: "absolute", left: "44.4%", width: "44.5%", top: 0 }}
            >
              <div style={{ borderTop: "2px solid #FFD966", height: "9px", borderLeft: "2px solid #FFD966", borderRight: "2px solid #FFD966" }} />
              <div className="text-center text-xs mt-[13px]" style={{ color: "#FFD966", letterSpacing: "0.02em" }}>
                Where most Americans live
              </div>
            </div>
          </div>
        </figure>

        {/* Viz 3 — stat */}
        <div data-reveal className="mt-[clamp(56px,8vh,96px)] flex flex-wrap items-center gap-[clamp(24px,5vw,56px)]">
          <div
            ref={statRef}
            className="font-display font-semibold leading-[.85]"
            style={{ fontSize: "clamp(96px,16vw,200px)", color: "#FFD966", letterSpacing: "-.02em" }}
          >
            0%
          </div>
          <div style={{ maxWidth: "30ch" }}>
            <p className="m-0 font-light" style={{ fontSize: "clamp(17px,1.7vw,21px)", lineHeight: 1.55, color: "#F5F5F7" }}>
              of Americans and Europeans live under skies too bright to see the Milky Way.
            </p>
            <p className="mt-[14px] mb-0 text-xs" style={{ color: "#6E6E84" }}>
              Falchi et al., <span style={{ fontStyle: "italic" }}>Science Advances</span>, 2016.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
