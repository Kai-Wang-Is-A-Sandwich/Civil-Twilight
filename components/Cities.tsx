"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function Cities() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Generic fade-up reveals
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 28,
          duration: 0.9,
          ease: "power3.out",
          delay: (i % 2) * 0.08,
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // Draw-in any stroked paths/lines/polylines marked for it
      gsap.utils.toArray<SVGGeometryElement>("[data-draw]").forEach((el) => {
        const length = el.getTotalLength();
        gsap.set(el, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(el, {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: "power2.inOut",
          scrollTrigger: { trigger: el, start: "top 80%" },
        });
      });

      // Staggered fade-in groups (e.g. windows, light rays, dots)
      gsap.utils.toArray<SVGElement>("[data-stagger-group]").forEach((group) => {
        const children = Array.from(group.children);
        gsap.from(children, {
          opacity: 0,
          duration: 0.6,
          stagger: 0.04,
          ease: "power1.out",
          scrollTrigger: { trigger: group, start: "top 80%" },
        });
      });

      // Pulsing highway light nodes
      gsap.utils.toArray<SVGElement>("[data-pulse-group]").forEach((group) => {
        const children = Array.from(group.children);
        children.forEach((c, i) => {
          gsap.to(c, {
            opacity: 0.25,
            duration: 1 + Math.random() * 1.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.15,
            scrollTrigger: { trigger: group, start: "top 90%", once: true },
          });
        });
      });

      // Zoning glow pulse
      gsap.utils.toArray<SVGElement>("[data-glow-pulse]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0.4 },
          {
            opacity: 0.9,
            duration: 2.4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="cities"
      data-screen-label="How Cities Shape the Sky"
      ref={sectionRef}
      style={{ scrollMarginTop: "80px", padding: "clamp(80px,12vh,150px) clamp(20px,5vw,64px) clamp(40px,6vh,80px)" }}
    >
      <div className="max-w-[1120px] mx-auto">
        <h2
          data-reveal
          className="font-display font-medium text-white m-0 leading-[1.04]"
          style={{ fontSize: "clamp(32px,5.4vw,62px)", letterSpacing: "0.005em", textWrap: "balance", maxWidth: "18ch" }}
        >
          Four planning decisions that erase the stars
        </h2>
      </div>

      {/* 3A Streetlights */}
      <div className="max-w-[1120px] mx-auto mt-[clamp(56px,9vh,120px)] flex flex-wrap gap-[clamp(36px,5vw,72px)] items-center">
        <div className="flex-1 basis-[360px] min-w-[300px]" data-reveal>
          <div className="flex items-baseline gap-3.5 mb-3.5">
            <span className="font-display text-[13px]" style={{ color: "#6B3FA0", letterSpacing: "0.1em" }}>01</span>
            <span className="font-display font-medium text-white" style={{ fontSize: "clamp(22px,2.6vw,30px)" }}>Streetlights</span>
          </div>
          <p className="font-display font-light m-0 mb-[22px]" style={{ fontSize: "clamp(17px,1.7vw,21px)", color: "#5B8DEF", letterSpacing: "0.01em" }}>
            What&apos;s pointed up is wasted
          </p>
          <div className="flex flex-col gap-5 font-light text-[#E2E2EC]" style={{ fontSize: "clamp(15px,1.3vw,17px)", lineHeight: 1.78 }}>
            <p className="m-0">
              The single largest controllable source of urban light pollution is street and area
              lighting. An unshielded cobra-head fixture, the standard design on American roads
              for decades, sends 20 to 30 percent of its output above the horizontal plane,
              directly into the sky, illuminating nothing useful. A fully shielded flat-lens
              fixture directs all output downward. The difference is even visible from orbit.
            </p>
            <p className="m-0">
              Color temperature compounds the problem. Fixtures above 3000 Kelvin produce more
              blue-spectrum light, which scatters in the atmosphere at far higher rates than warm
              amber tones. A single 4000K LED streetlight generates more skyglow than a comparable
              2200K fixture at identical shielding.
            </p>
          </div>
        </div>
        <div className="flex-1 basis-[360px] min-w-[300px]" data-reveal>
          <div className="flex items-end gap-2 sm:gap-3.5 lg:gap-[18px]">
            {/* unshielded */}
            <div className="flex-1 text-center">
              <svg viewBox="0 0 130 175" style={{ width: "100%", height: "auto" }}>
                <line x1="6" y1="170" x2="124" y2="170" stroke="#2a2a3c" strokeWidth="2" />
                <line x1="28" y1="170" x2="28" y2="50" stroke="#55556e" strokeWidth="4" strokeLinecap="round" />
                <line x1="28" y1="52" x2="64" y2="52" stroke="#55556e" strokeWidth="4" strokeLinecap="round" />
                <g data-stagger-group>
                  <line x1="70" y1="52" x2="70" y2="8" stroke="#9fc2ff" strokeWidth="1.6" opacity="0.85" />
                  <line x1="70" y1="52" x2="54" y2="11" stroke="#9fc2ff" strokeWidth="1.6" opacity="0.8" />
                  <line x1="70" y1="52" x2="86" y2="11" stroke="#9fc2ff" strokeWidth="1.6" opacity="0.8" />
                  <line x1="70" y1="52" x2="38" y2="22" stroke="#9fc2ff" strokeWidth="1.6" opacity="0.7" />
                  <line x1="70" y1="52" x2="102" y2="22" stroke="#9fc2ff" strokeWidth="1.6" opacity="0.7" />
                  <line x1="70" y1="52" x2="27" y2="38" stroke="#9fc2ff" strokeWidth="1.4" opacity="0.5" />
                  <line x1="70" y1="52" x2="113" y2="38" stroke="#9fc2ff" strokeWidth="1.4" opacity="0.5" />
                  <line x1="70" y1="52" x2="70" y2="96" stroke="#FFD966" strokeWidth="1.4" opacity="0.4" />
                  <line x1="70" y1="52" x2="93" y2="90" stroke="#FFD966" strokeWidth="1.4" opacity="0.35" />
                  <line x1="70" y1="52" x2="47" y2="90" stroke="#FFD966" strokeWidth="1.4" opacity="0.35" />
                </g>
                <circle cx="70" cy="52" r="9" fill="#dce8ff" />
                <circle cx="70" cy="52" r="9" fill="none" stroke="#9fc2ff" strokeWidth="1" opacity="0.6" />
              </svg>
              <div className="text-[11.5px] leading-[1.45] mt-2" style={{ color: "#9A9AAF" }}>
                Unshielded — up to 30% of light wasted skyward.
              </div>
            </div>
            {/* semi */}
            <div className="flex-1 text-center">
              <svg viewBox="0 0 130 175" style={{ width: "100%", height: "auto" }}>
                <line x1="6" y1="170" x2="124" y2="170" stroke="#2a2a3c" strokeWidth="2" />
                <line x1="28" y1="170" x2="28" y2="50" stroke="#55556e" strokeWidth="4" strokeLinecap="round" />
                <line x1="28" y1="52" x2="60" y2="52" stroke="#55556e" strokeWidth="4" strokeLinecap="round" />
                <path d="M58 50 A12 12 0 0 1 82 50" fill="none" stroke="#7a7a96" strokeWidth="3.5" />
                <rect x="60" y="50" width="20" height="6" rx="2" fill="#dce8ff" />
                <g data-stagger-group>
                  <line x1="70" y1="56" x2="30" y2="44" stroke="#9fc2ff" strokeWidth="1.3" opacity="0.4" />
                  <line x1="70" y1="56" x2="110" y2="44" stroke="#9fc2ff" strokeWidth="1.3" opacity="0.4" />
                  <line x1="70" y1="56" x2="70" y2="100" stroke="#FFD966" strokeWidth="1.5" opacity="0.55" />
                  <line x1="70" y1="56" x2="96" y2="94" stroke="#FFD966" strokeWidth="1.5" opacity="0.5" />
                  <line x1="70" y1="56" x2="44" y2="94" stroke="#FFD966" strokeWidth="1.5" opacity="0.5" />
                  <line x1="70" y1="56" x2="112" y2="80" stroke="#FFD966" strokeWidth="1.3" opacity="0.35" />
                  <line x1="70" y1="56" x2="28" y2="80" stroke="#FFD966" strokeWidth="1.3" opacity="0.35" />
                </g>
              </svg>
              <div className="text-[11.5px] leading-[1.45] mt-2" style={{ color: "#9A9AAF" }}>
                Semi-shielded — reduced but significant upward spill.
              </div>
            </div>
            {/* full */}
            <div className="flex-1 text-center">
              <svg viewBox="0 0 130 175" style={{ width: "100%", height: "auto" }}>
                <defs>
                  <linearGradient id="goldCone" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#FFD966" stopOpacity="0.5" />
                    <stop offset="1" stopColor="#FFD966" stopOpacity="0.04" />
                  </linearGradient>
                </defs>
                <line x1="6" y1="170" x2="124" y2="170" stroke="#2a2a3c" strokeWidth="2" />
                <line x1="28" y1="170" x2="28" y2="50" stroke="#55556e" strokeWidth="4" strokeLinecap="round" />
                <line x1="28" y1="52" x2="58" y2="52" stroke="#55556e" strokeWidth="4" strokeLinecap="round" />
                <polygon points="60,57 80,57 100,150 40,150" fill="url(#goldCone)" />
                <rect x="57" y="49" width="26" height="8" rx="2" fill="#dce8ff" />
                <line x1="55" y1="49" x2="85" y2="49" stroke="#9fc2ff" strokeWidth="2" strokeLinecap="round" />
                <g data-stagger-group>
                  <line x1="70" y1="57" x2="70" y2="150" stroke="#FFD966" strokeWidth="1.4" opacity="0.6" />
                  <line x1="66" y1="57" x2="48" y2="150" stroke="#FFD966" strokeWidth="1.3" opacity="0.45" />
                  <line x1="74" y1="57" x2="92" y2="150" stroke="#FFD966" strokeWidth="1.3" opacity="0.45" />
                </g>
              </svg>
              <div className="text-[11.5px] leading-[1.45] mt-2" style={{ color: "#9A9AAF" }}>
                Fully shielded — zero direct upward light.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3B Building height */}
      <div className="max-w-[1120px] mx-auto mt-[clamp(56px,9vh,120px)] flex flex-wrap-reverse gap-[clamp(36px,5vw,72px)] items-center">
        <div className="flex-1 basis-[360px] min-w-[300px]" data-reveal>
          <svg viewBox="0 0 540 360" style={{ width: "100%", height: "auto", borderRadius: "12px" }}>
            <defs>
              <linearGradient id="bldg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#3B2063" />
                <stop offset="1" stopColor="#1a1030" />
              </linearGradient>
              <linearGradient id="haze" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#6B3FA0" stopOpacity="0" />
                <stop offset="1" stopColor="#6B3FA0" stopOpacity="0.32" />
              </linearGradient>
            </defs>
            <path d="M270 30 L265.1 43.4 L256.6 35 Z" fill="#FFD966" opacity="0.6" />
            <rect x="0" y="0" width="540" height="92" fill="url(#haze)" />
            <rect x="44" y="58" width="120" height="272" fill="url(#bldg)" stroke="#5B8DEF" strokeOpacity="0.25" />
            <rect x="376" y="92" width="120" height="238" fill="url(#bldg)" stroke="#5B8DEF" strokeOpacity="0.25" />
            <g fill="#5B8DEF" opacity="0.32" data-stagger-group>
              <rect x="58" y="76" width="14" height="18" /><rect x="84" y="76" width="14" height="18" /><rect x="110" y="76" width="14" height="18" /><rect x="136" y="76" width="14" height="18" />
              <rect x="58" y="112" width="14" height="18" /><rect x="84" y="112" width="14" height="18" /><rect x="110" y="112" width="14" height="18" /><rect x="136" y="112" width="14" height="18" />
              <rect x="58" y="148" width="14" height="18" /><rect x="110" y="148" width="14" height="18" /><rect x="136" y="148" width="14" height="18" />
              <rect x="390" y="110" width="14" height="18" /><rect x="416" y="110" width="14" height="18" /><rect x="442" y="110" width="14" height="18" /><rect x="468" y="110" width="14" height="18" />
              <rect x="390" y="146" width="14" height="18" /><rect x="442" y="146" width="14" height="18" /><rect x="468" y="146" width="14" height="18" />
            </g>
            <line x1="164" y1="330" x2="376" y2="330" stroke="#2a2a3c" strokeWidth="2" />
            <circle cx="230" cy="318" r="5" fill="#FFD966" />
            <circle cx="310" cy="318" r="5" fill="#FFD966" />
            <polyline data-draw points="230,316 200,200 164,150" fill="none" stroke="#FFD966" strokeWidth="1.6" opacity="0.7" />
            <polyline data-draw points="164,150 230,70 270,30" fill="none" stroke="#FFD966" strokeWidth="1.6" opacity="0.55" />
            <polyline data-draw points="310,316 360,210 376,150" fill="none" stroke="#FFD966" strokeWidth="1.6" opacity="0.7" />
            <polyline data-draw points="376,150 320,70 290,32" fill="none" stroke="#FFD966" strokeWidth="1.6" opacity="0.55" />
            <path d="M290 32 L302.8 38.5 L293.4 45.9 Z" fill="#FFD966" opacity="0.6" />
          </svg>
        </div>
        <div className="flex-1 basis-[360px] min-w-[300px]" data-reveal>
          <div className="flex items-baseline gap-3.5 mb-3.5">
            <span className="font-display text-[13px]" style={{ color: "#6B3FA0", letterSpacing: "0.1em" }}>02</span>
            <span className="font-display font-medium text-white" style={{ fontSize: "clamp(22px,2.6vw,30px)" }}>Building Height &amp; Density</span>
          </div>
          <p className="font-display font-light m-0 mb-[22px]" style={{ fontSize: "clamp(17px,1.7vw,21px)", color: "#5B8DEF" }}>
            The buildings themselves are the source.
          </p>
          <div className="flex flex-col gap-5 font-light text-[#E2E2EC]" style={{ fontSize: "clamp(15px,1.3vw,17px)", lineHeight: 1.78 }}>
            <p className="m-0">
              In dense urban cores, buildings are among the largest direct sources of light
              pollution. Interior lighting pours through windows all night, especially in
              glass-curtain-wall office towers where entire floors stay illuminated long after
              workers leave. Decorative facade lighting, rooftop signage, and architectural
              floodlights add to the output. A single high-rise can beam light outward and upward
              from hundreds of windows across dozens of stories.
            </p>
            <p className="m-0">
              The scale of the problem tracks with density. A downtown core concentrates thousands
              of individual light sources into a small footprint: lobby lighting, retail
              storefronts, illuminated signage, parking garages, and the windows of every occupied
              and unoccupied floor above. Each source on its own is minor. Together, they produce
              the intense skyglow domes visible over every major city.
            </p>
            <p className="m-0">
              Building design choices matter enormously here. Exterior facade lighting that washes
              a building in light sends much of that energy into the sky. Interior lighting in
              floor-to-ceiling glass facades turns every office into an outward-facing light
              source. Recessed lighting, occupancy sensors, automated blinds, and dimming
              schedules after business hours could substantially reduce a building&apos;s
              contribution to skyglow, but few cities require any of these measures.
            </p>
          </div>
        </div>
      </div>

      {/* 3C Roads & highways */}
      <div className="max-w-[1120px] mx-auto mt-[clamp(56px,9vh,120px)] flex flex-wrap gap-[clamp(36px,5vw,72px)] items-center">
        <div className="flex-1 basis-[360px] min-w-[300px]" data-reveal>
          <div className="flex items-baseline gap-3.5 mb-3.5">
            <span className="font-display text-[13px]" style={{ color: "#6B3FA0", letterSpacing: "0.1em" }}>03</span>
            <span className="font-display font-medium text-white" style={{ fontSize: "clamp(22px,2.6vw,30px)" }}>Roads &amp; Highways</span>
          </div>
          <p className="font-display font-light m-0 mb-[22px]" style={{ fontSize: "clamp(17px,1.7vw,21px)", color: "#5B8DEF" }}>
            Rivers of light
          </p>
          <div className="flex flex-col gap-5 font-light text-[#E2E2EC]" style={{ fontSize: "clamp(15px,1.3vw,17px)", lineHeight: 1.78 }}>
            <p className="m-0">
              Highway interchanges are among the most light-intensive landscapes in any metro area.
              A single cloverleaf interchange can carry dozens of high-mast poles, each mounting
              multiple lights at heights of 30 meters or more. At that elevation, even partially
              shielded fixtures scatter light for miles. From above, highways appear as bright
              arterial lines radiating outward from every city.
            </p>
            <p className="m-0">
              The effect extends beyond the road itself. Commercial development clusters around
              interchanges in the form of illuminated signage, parking lots, gas stations, and
              drive-throughs. These secondary sources often operate under no shielding requirements
              whatsoever. The decision to route a highway through a corridor shapes the light
              environment for generations before a single building permit gets filed.
            </p>
          </div>
        </div>
        <div className="flex-1 basis-[360px] min-w-[300px]" data-reveal>
          <svg viewBox="0 0 540 360" style={{ width: "100%", height: "auto" }}>
            <defs>
              <radialGradient id="hwyNode" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" stopColor="#FFD966" stopOpacity="0.35" />
                <stop offset="1" stopColor="#FFD966" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect x="0" y="0" width="540" height="360" fill="url(#hwyNode)" opacity="0.5" />
            <rect x="0" y="166" width="540" height="28" fill="#13142a" />
            <rect x="256" y="0" width="28" height="360" fill="#13142a" />
            <path data-draw d="M300 166 a30 30 0 1 1 -2 0" fill="none" stroke="#F4C430" strokeWidth="2.4" opacity="0.5" />
            <path data-draw d="M240 166 a30 30 0 1 0 2 0" fill="none" stroke="#F4C430" strokeWidth="2.4" opacity="0.5" />
            <path data-draw d="M300 194 a30 30 0 1 0 -2 0" fill="none" stroke="#F4C430" strokeWidth="2.4" opacity="0.5" />
            <path data-draw d="M240 194 a30 30 0 1 1 2 0" fill="none" stroke="#F4C430" strokeWidth="2.4" opacity="0.5" />
            <line x1="0" y1="180" x2="540" y2="180" stroke="#FFE8A0" strokeWidth="2.4" opacity="0.95" />
            <line x1="270" y1="0" x2="270" y2="360" stroke="#FFE8A0" strokeWidth="2.4" opacity="0.95" />
            <g fill="#FFD966" data-pulse-group>
              <circle cx="60" cy="158" r="2.6" opacity="0.9" /><circle cx="92" cy="152" r="2.2" opacity="0.7" /><circle cx="40" cy="200" r="2.4" opacity="0.8" /><circle cx="120" cy="206" r="2" opacity="0.6" />
              <circle cx="470" cy="158" r="2.6" opacity="0.9" /><circle cx="440" cy="150" r="2.2" opacity="0.7" /><circle cx="490" cy="202" r="2.4" opacity="0.8" /><circle cx="420" cy="208" r="2" opacity="0.6" />
              <circle cx="248" cy="46" r="2.6" opacity="0.9" /><circle cx="292" cy="40" r="2.2" opacity="0.7" /><circle cx="240" cy="86" r="2" opacity="0.6" />
              <circle cx="252" cy="312" r="2.6" opacity="0.9" /><circle cx="296" cy="320" r="2.2" opacity="0.7" /><circle cx="244" cy="280" r="2" opacity="0.6" />
            </g>
          </svg>
        </div>
      </div>

      {/* 3D Zoning */}
      <div className="max-w-[1120px] mx-auto mt-[clamp(56px,9vh,120px)] flex flex-wrap-reverse gap-[clamp(36px,5vw,72px)] items-center">
        <div className="flex-1 basis-[360px] min-w-[300px]" data-reveal>
          <svg viewBox="0 0 540 360" style={{ width: "100%", height: "auto" }}>
            <defs>
              <radialGradient id="lotGlow" cx="0.32" cy="0.5" r="0.55">
                <stop offset="0" stopColor="#FFF1C2" stopOpacity="0.5" />
                <stop offset="0.6" stopColor="#FFD966" stopOpacity="0.18" />
                <stop offset="1" stopColor="#FFD966" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect x="0" y="0" width="540" height="360" fill="#0a0a16" />
            <rect data-glow-pulse x="0" y="0" width="540" height="360" fill="url(#lotGlow)" />
            <rect x="26" y="40" width="270" height="280" fill="none" stroke="#3a3a52" strokeWidth="1.4" />
            <rect x="44" y="56" width="150" height="78" fill="#241544" stroke="#5B8DEF" strokeOpacity="0.3" />
            <text x="119" y="100" textAnchor="middle" fontFamily="IBM Plex Sans" fontSize="11" fill="#9A9AAF">BIG-BOX</text>
            <g stroke="#4a4a64" strokeWidth="1">
              <line x1="60" y1="160" x2="60" y2="300" /><line x1="100" y1="160" x2="100" y2="300" /><line x1="140" y1="160" x2="140" y2="300" /><line x1="180" y1="160" x2="180" y2="300" /><line x1="220" y1="160" x2="220" y2="300" /><line x1="260" y1="160" x2="260" y2="300" />
              <line x1="44" y1="230" x2="280" y2="230" />
            </g>
            <line x1="330" y1="20" x2="330" y2="340" stroke="#5B8DEF" strokeWidth="1.4" strokeDasharray="5 6" />
            <g stroke="#3a3a52" strokeWidth="1.2" fill="none">
              <path d="M390 150 l24 -18 l24 18 v40 h-48 z" />
              <path d="M460 220 l24 -18 l24 18 v40 h-48 z" />
            </g>
            <circle cx="414" cy="176" r="2.4" fill="#F4C430" opacity="0.5" />
            <circle cx="484" cy="246" r="2.4" fill="#F4C430" opacity="0.5" />
            <text x="348" y="300" fontFamily="IBM Plex Sans" fontSize="12" fill="#FFD966">Light trespass →</text>
            <text x="36" y="34" fontFamily="Space Grotesk" fontSize="11" fill="#9A9AAF" letterSpacing="0.1em">COMMERCIAL ZONE</text>
            <text x="436" y="34" textAnchor="middle" fontFamily="Space Grotesk" fontSize="11" fill="#6E6E84" letterSpacing="0.1em">RESIDENTIAL</text>
          </svg>
        </div>
        <div className="flex-1 basis-[360px] min-w-[300px]" data-reveal>
          <div className="flex items-baseline gap-3.5 mb-3.5">
            <span className="font-display text-[13px]" style={{ color: "#6B3FA0", letterSpacing: "0.1em" }}>04</span>
            <span className="font-display font-medium text-white" style={{ fontSize: "clamp(22px,2.6vw,30px)" }}>Zoning &amp; Land Use</span>
          </div>
          <p className="font-display font-light m-0 mb-[22px]" style={{ fontSize: "clamp(17px,1.7vw,21px)", color: "#5B8DEF" }}>
            Brightness by ordinance
          </p>
          <div className="flex flex-col gap-5 font-light text-[#E2E2EC]" style={{ fontSize: "clamp(15px,1.3vw,17px)", lineHeight: 1.78 }}>
            <p className="m-0">
              Most American zoning codes require minimum lighting levels for commercial properties
              and parking areas. They rarely set maximum levels. A big-box retail parking lot may
              be illuminated to 50 lux or more across its entire surface, maintained through the
              night by photocell, whether or not the store is open. Illuminated signage regulations
              vary enormously: some municipalities cap brightness, others regulate only size and
              placement, and many impose no limits on luminance at all.
            </p>
            <p className="m-0">
              The result is that commercial zoning in most jurisdictions functionally mandates light
              pollution. Every rezoning from residential to commercial, every variance for a larger
              sign or brighter lot, every drive-through approved at a suburban intersection
              incrementally raises the baseline light level of the surrounding area. These decisions
              happen one permit at a time, at local planning boards, and they are almost never
              evaluated for their cumulative effect on the night sky.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
