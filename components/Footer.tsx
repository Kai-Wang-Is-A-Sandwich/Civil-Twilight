export default function Footer() {
  return (
    <footer style={{ padding: "clamp(70px,10vh,120px) clamp(20px,5vw,64px) clamp(50px,7vh,80px)", borderTop: "1px solid rgba(255,255,255,.05)" }}>
      <div className="max-w-[1120px] mx-auto">
        <div className="font-display font-semibold" style={{ letterSpacing: "0.32em", fontSize: "15px", color: "#9A9AAF" }}>
          CIVIL&nbsp;TWILIGHT
        </div>
        <p className="mt-[18px] mb-0 text-sm" style={{ color: "#6E6E84", maxWidth: "46ch", lineHeight: 1.7 }}>
          A project exploring light pollution and urban planning.
        </p>
        <p className="mt-7 mb-0 text-xs" style={{ color: "#6e6e84", lineHeight: 1.7 }}>
          Sources — Falchi et al. 2016, VIIRS Nighttime Light Data, DarkSky International, U.S. Census ACS.
        </p>
        <div className="flex flex-wrap gap-5 mt-[22px]">
          <span className="text-xs text-[#6e6e84]">
            ©2026 Civil Twilight. All Rights Reserved.&nbsp;
          </span>
        </div>
      </div>
    </footer>
  );
}
