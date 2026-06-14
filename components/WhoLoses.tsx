"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const ROWS = [
  { label: "Lowest income", width: 94, gradient: "linear-gradient(90deg,#F4C430,#FFD966)", tag: "High", tagColor: "#FFD966" },
  { label: "Second", width: 78, gradient: "linear-gradient(90deg,#caa748,#e7c45e)", tag: null },
  { label: "Middle", width: 63, gradient: "linear-gradient(90deg,#8a86a0,#9a9aaf)", tag: null },
  { label: "Fourth", width: 51, gradient: "linear-gradient(90deg,#4a6fb0,#5B8DEF)", tag: null },
  { label: "Highest income", width: 40, gradient: "linear-gradient(90deg,#3a5da0,#5B8DEF)", tag: "Low", tagColor: "#5B8DEF" },
];

export default function WhoLoses() {
  const sectionRef = useRef<HTMLDivElement>(null);

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

      gsap.utils.toArray<HTMLElement>("[data-bar]").forEach((el) => {
        gsap.from(el, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="who"
      data-screen-label="Who Loses the Sky"
      ref={sectionRef}
      style={{ scrollMarginTop: "80px", padding: "clamp(90px,14vh,170px) clamp(20px,5vw,64px)" }}
    >
      <div className="max-w-[1120px] mx-auto">
        <div data-reveal className="font-display text-xs uppercase mb-[22px] font-bold" style={{ letterSpacing: "0.3em", color: "#6B3FA0" }}>
          Equity
        </div>
        <h2 data-reveal className="font-display font-medium text-white m-0 mb-10 leading-[1.04]" style={{ fontSize: "clamp(32px,5.4vw,62px)", letterSpacing: "0.005em" }}>
          Who loses the sky?
        </h2>
        <div data-reveal className="flex flex-col gap-6 font-light text-[#E2E2EC]" style={{ maxWidth: "62ch", fontSize: "clamp(16px,1.35vw,18px)", lineHeight: 1.78 }}>
          <p className="m-0">
            Light pollution is not distributed evenly, and it does not affect all communities
            equally. Lower-income urban neighborhoods consistently carry higher light pollution
            exposure than wealthier areas within the same metro region. The disparity tracks
            alongside other environmental justice patterns—the same communities overburdened by
            highway proximity, industrial land use, and poor air quality also endure the highest
            artificial sky brightness.
          </p>
          <p className="m-0">
            The inequity runs through lighting quality as well as quantity. Wealthier suburbs have
            been early adopters of shielded, warm-spectrum fixtures, sometimes motivated as much by
            property values and neighborhood character as by environmental concern. Lower-income
            communities and communities of color are more likely to live under aging, unshielded,
            high-intensity infrastructure. They receive more light and worse light at the same
            time: higher glare, more trespass into homes, and a greater contribution to the
            regional glow.
          </p>
          <p className="m-0" style={{ color: "#F5F5F7" }}>
            Access to the night sky is rarely discussed as an equity issue. But if the sky is a
            public good, and if its erasure results from planning decisions, then its unequal loss
            is a planning failure.
          </p>
        </div>

        <figure data-reveal style={{ margin: "clamp(48px,7vh,80px) 0 0" }}>
          <div className="font-display text-sm mb-6" style={{ letterSpacing: "0.04em", color: "#F5F5F7" }}>
            Average artificial sky brightness by neighborhood income quintile
          </div>
          <div className="flex flex-col gap-[18px]">
            {ROWS.map((row) => (
              <div key={row.label} className="flex items-center gap-4">
                <span className="flex-none text-[13px] text-right" style={{ width: "130px", color: "#9A9AAF" }}>
                  {row.label}
                </span>
                <div className="flex-1 rounded-[5px] overflow-hidden" style={{ height: "22px", background: "rgba(255,255,255,.04)" }}>
                  <div
                    data-bar
                    className="h-full rounded-[5px]"
                    style={{ width: `${row.width}%`, background: row.gradient }}
                  />
                </div>
                <span className="flex-none text-[13px] font-display" style={{ width: "42px", color: row.tagColor }}>
                  {row.tag}
                </span>
              </div>
            ))}
          </div>
          <figcaption className="text-xs mt-[22px]" style={{ color: "#6E6E84" }}>
            Illustrative graphic based on published research correlating income, race, and
            artificial sky brightness in U.S. metropolitan areas.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
