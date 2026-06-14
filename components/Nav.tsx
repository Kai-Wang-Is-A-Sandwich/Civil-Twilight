"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

const LINKS = [
  { href: "#problem", label: "The Problem" },
  { href: "#cities", label: "How Cities Shape the Sky" },
  { href: "#simulate", label: "Simulate" },
  { href: "#who", label: "Who Loses the Sky" },
  { href: "#change", label: "What Can Change" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Entrance animation
  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  // Mobile menu open/close animation
  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      gsap.set(el, { display: "flex" });
      gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" });
      gsap.fromTo(
        el.querySelectorAll("[data-menu-link]"),
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, delay: 0.1, ease: "power3.out" }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(el, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => gsap.set(el, { display: "none" }),
      });
    }
  }, [menuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed inset-x-0 top-0 z-[200] flex items-center justify-between px-5 py-4 backdrop-blur-2xl transition-[background-color,border-color] duration-[450ms] sm:px-8 md:px-12 lg:px-16"
        style={{
          backgroundColor: scrolled ? "rgba(7,7,13,0.84)" : "rgba(7,7,13,0.4)",
          borderBottom: `1px solid ${scrolled ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.04)"}`,
        }}
      >
        <a
          href="#top"
          className="font-display text-[13px] font-semibold text-[#F5F5F7] no-underline whitespace-nowrap"
          style={{ letterSpacing: "0.34em" }}
        >
          CIVIL&nbsp;TWILIGHT
        </a>

        <div className="hidden md:flex items-center gap-4 lg:gap-[30px]">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] text-[#9A9AAF] no-underline transition-colors duration-200 hover:text-white"
              style={{ letterSpacing: "0.02em" }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#act"
            className="font-medium text-[13px] no-underline rounded-full border px-4 py-[7px] transition-colors duration-200"
            style={{
              color: "#FFD966",
              letterSpacing: "0.08em",
              borderColor: "rgba(255,217,102,.4)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#FFD966";
              e.currentTarget.style.color = "#07070D";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#FFD966";
            }}
          >
            Act
          </a>
        </div>

        <button
          className="flex md:hidden flex-col gap-[5px] p-2 bg-transparent border-none cursor-pointer"
          aria-label="Menu"
          onClick={() => setMenuOpen(true)}
        >
          <span className="block w-6 h-[2px] bg-[#F5F5F7]" />
          <span className="block w-6 h-[2px] bg-[#F5F5F7]" />
          <span className="block w-6 h-[2px] bg-[#F5F5F7]" />
        </button>
      </nav>

      <div
        ref={menuRef}
        className="fixed inset-0 z-[190] hidden flex-col items-start justify-center gap-2 px-7 sm:px-16"
        style={{
          background: "rgba(7,7,13,.96)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-[22px] right-6 bg-transparent border-none text-[#9A9AAF] text-3xl cursor-pointer leading-none"
          aria-label="Close menu"
        >
          ×
        </button>
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            data-menu-link
            onClick={() => setMenuOpen(false)}
            className="font-display text-[26px] text-[#F5F5F7] no-underline py-[10px]"
            style={{ letterSpacing: "0.01em" }}
          >
            {l.label}
          </a>
        ))}
        <a
          href="#act"
          data-menu-link
          onClick={() => setMenuOpen(false)}
          className="font-display text-[26px] no-underline py-[10px]"
          style={{ color: "#FFD966" }}
        >
          Act
        </a>
      </div>
    </>
  );
}
