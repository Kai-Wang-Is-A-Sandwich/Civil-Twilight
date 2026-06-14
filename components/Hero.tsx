"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { makeStars, paintHero, sizeCanvas, type Star } from "@/lib/sky";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const chevronRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let stars: Star[] = [];
    let dims = { w: 0, h: 0, dpr: 1 };
    let time = 0;
    let raf = 0;

    const resize = () => {
      dims = sizeCanvas(canvas);
      stars = makeStars(dims.w, dims.h, 9200);
    };

    const animate = () => {
      time += 0.016;
      const ctx = canvas.getContext("2d");
      if (ctx) paintHero(ctx, dims.w, dims.h, dims.dpr, stars, time);
      raf = requestAnimationFrame(animate);
    };

    resize();
    raf = requestAnimationFrame(animate);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current || !bodyRef.current || !chevronRef.current) return;

    const split = new SplitText(titleRef.current, { type: "chars, words" });
    split.words.forEach((word) => {
      (word as HTMLElement).style.whiteSpace = "nowrap";
    });

    const tl = gsap.timeline({ delay: 0.3 });
    tl.from(split.chars, {
      opacity: 0,
      y: 40,
      filter: "blur(8px)",
      duration: 1,
      ease: "power3.out",
      stagger: 0.035,
    })
      .from(
        subtitleRef.current,
        { opacity: 0, y: 24, duration: 0.9, ease: "power3.out" },
        "-=0.4"
      )
      .from(
        bodyRef.current,
        { opacity: 0, y: 24, duration: 0.9, ease: "power3.out" },
        "-=0.6"
      )
      .from(
        chevronRef.current,
        { opacity: 0, duration: 0.8, ease: "power2.out" },
        "-=0.3"
      );

    return () => {
      tl.kill();
      split.revert();
    };
  }, []);

  return (
    <header
      data-screen-label="Hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
      <div className="relative z-[2] max-w-[860px]">
        <h1
          ref={titleRef}
          className="font-display font-medium text-white m-0 leading-[1]"
          style={{
            letterSpacing: "0.3em",
            fontSize: "clamp(38px, 8.5vw, 108px)",
            textIndent: "0.3em",
          }}
        >
          CIVIL TWILIGHT
        </h1>
        <p
          ref={subtitleRef}
          className="font-display font-light text-[#F5F5F7] m-0 mt-[34px] leading-[1.4]"
          style={{ fontSize: "clamp(18px, 2.8vw, 30px)", letterSpacing: "0.005em" }}
        >
          The stars have disappeared by design
        </p>
        <p
          ref={bodyRef}
          className="font-sans font-light text-[#9A9AAF] mx-auto mt-[30px]"
          style={{ fontSize: "clamp(14px, 1.5vw, 17px)", lineHeight: 1.75, maxWidth: "580px" }}
        >
          How streetlights, highways, building codes, and zoning decisions are erasing the
          night sky, and what it would take to bring it back.
        </p>
      </div>
      <a
        ref={chevronRef}
        href="#problem"
        className="absolute bottom-9 left-1/2 -translate-x-1/2 z-[2] no-underline"
      >
        <div className="chevron-pulse">
          <svg width="26" height="16" viewBox="0 0 26 16" fill="none">
            <path
              d="M2 2 L13 13 L24 2"
              stroke="#9A9AAF"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </a>
    </header>
  );
}
