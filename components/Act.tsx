"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function Act() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-act-eyebrow]", {
        opacity: 0,
        y: 24,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-act-eyebrow]", start: "top 85%" },
      });
      gsap.from("[data-act-title]", {
        opacity: 0,
        y: 24,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-act-title]", start: "top 85%" },
      });

      gsap.utils.toArray<HTMLElement>("[data-act-item]").forEach((el) => {
        const border = el.querySelector("[data-act-border]");
        if (border) {
          gsap.from(border, {
            scaleY: 0,
            transformOrigin: "top center",
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 80%" },
          });
        }
        gsap.from(el, {
          opacity: 0,
          x: -24,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%" },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="act"
      data-screen-label="Take Action"
      ref={sectionRef}
      style={{ scrollMarginTop: "80px", padding: "clamp(90px,14vh,170px) clamp(20px,5vw,64px)" }}
    >
      <div className="max-w-[920px] mx-auto">
        <div data-act-eyebrow className="font-display text-xs uppercase mb-[22px]" style={{ letterSpacing: "0.3em", color: "#FFD966" }}>
          Act
        </div>
        <h2 data-act-title className="font-display font-medium m-0 mb-14 leading-[1.04]" style={{ fontSize: "clamp(34px,5.6vw,66px)", color: "#FFD966", letterSpacing: "0.005em" }}>
          What you can do
        </h2>

        <div className="flex flex-col gap-12">
          <div data-act-item className="relative" style={{ paddingLeft: "clamp(20px,3vw,34px)" }}>
            <div data-act-border className="absolute left-0 top-0 bottom-0" style={{ borderLeft: "2px solid rgba(255,217,102,.55)" }} />
            <div className="flex items-baseline gap-3.5 mb-3.5">
              <span className="font-display text-[13px]" style={{ color: "#FFD966" }}>01</span>
              <h3 className="font-display font-medium text-white m-0" style={{ fontSize: "clamp(22px,2.6vw,28px)" }}>Learn your sky</h3>
            </div>
            <p className="m-0 font-light" style={{ fontSize: "clamp(15px,1.4vw,18px)", lineHeight: 1.78, color: "#E2E2EC" }}>
              Find out how bright your sky is and contribute to citizen science.{" "}
              <a href="https://globeatnight.org" target="_blank" rel="noopener" style={{ color: "#FFD966", textDecoration: "none", borderBottom: "1px solid rgba(255,217,102,.4)" }}>
                Globe at Night
              </a>{" "}
              lets you measure your sky brightness in minutes with a phone.{" "}
              <a href="https://darksky.org" target="_blank" rel="noopener" style={{ color: "#FFD966", textDecoration: "none", borderBottom: "1px solid rgba(255,217,102,.4)" }}>
                DarkSky International
              </a>{" "}
              maintains a directory of dark-sky places and model lighting policies worldwide.
            </p>
          </div>

          <div data-act-item className="relative" style={{ paddingLeft: "clamp(20px,3vw,34px)" }}>
            <div data-act-border className="absolute left-0 top-0 bottom-0" style={{ borderLeft: "2px solid rgba(255,217,102,.55)" }} />
            <div className="flex items-baseline gap-3.5 mb-3.5">
              <span className="font-display text-[13px]" style={{ color: "#FFD966" }}>02</span>
              <h3 className="font-display font-medium text-white m-0" style={{ fontSize: "clamp(22px,2.6vw,28px)" }}>Advocate locally</h3>
            </div>
            <p className="m-0 mb-6 font-light" style={{ fontSize: "clamp(15px,1.4vw,18px)", lineHeight: 1.78, color: "#E2E2EC" }}>
              The most effective intervention is local lighting policy. Attend a planning board
              meeting. Request that your municipality adopt a dark-sky-compliant outdoor lighting
              ordinance. Frame it in terms your officials already care about: energy cost savings,
              reduced glare for drivers, wildlife protection, residential property values.
            </p>
            <div className="rounded-xl px-[26px] py-[22px]" style={{ border: "1px solid rgba(255,217,102,.4)", background: "rgba(255,217,102,.04)" }}>
              <p className="m-0 font-light" style={{ fontSize: "clamp(15px,1.5vw,18px)", lineHeight: 1.6, color: "#F5F5F7" }}>
                DarkSky International publishes a <span style={{ color: "#FFD966" }}>Model Lighting Ordinance</span> you can adapt and bring to your town council
              </p>
            </div>
          </div>

          <div data-act-item className="relative" style={{ paddingLeft: "clamp(20px,3vw,34px)" }}>
            <div data-act-border className="absolute left-0 top-0 bottom-0" style={{ borderLeft: "2px solid rgba(255,217,102,.55)" }} />
            <div className="flex items-baseline gap-3.5 mb-3.5">
              <span className="font-display text-[13px]" style={{ color: "#FFD966" }}>03</span>
              <h3 className="font-display font-medium text-white m-0" style={{ fontSize: "clamp(22px,2.6vw,28px)" }}>Look up</h3>
            </div>
            <p className="m-0 font-light" style={{ fontSize: "clamp(15px,1.4vw,18px)", lineHeight: 1.78, color: "#E2E2EC" }}>
              The simplest act. Step outside on a clear night. Count the stars you can see. Think
              about what that number used to be, and what planning decisions it would take to raise
              it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
