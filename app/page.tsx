import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Cities from "@/components/Cities";
import Simulate from "@/components/Simulate";
import WhoLoses from "@/components/WhoLoses";
import WhatCanChange from "@/components/WhatCanChange";
import Act from "@/components/Act";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div
      id="top"
      className="relative text-[#E8E8F0]"
      style={{
        background:
          "linear-gradient(180deg, #07070D 0%, #08080F 5%, #0C1430 13%, #0F1A3C 19%, #181140 28%, #241544 35%, #2a1750 40%, #1c1338 46%, #0A0A14 51%, #07070D 54%, #0c0a1c 60%, #1d1340 65%, #211546 70%, #161a44 76%, #0F1A3C 81%, #0a0a1a 89%, #08080F 95%, #050509 100%)",
      }}
    >
      <Nav />
      <Hero />
      <Problem />
      <Cities />
      <Simulate />
      <WhoLoses />
      <WhatCanChange />
      <Act />
      <Footer />
    </div>
  );
}
